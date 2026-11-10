import { describe, expect, it } from "vitest";
import { computeTaxes, grossForNet, RULES, type TaxInput } from "./engine";

const base: Omit<TaxInput, "grossCents"> = {
  clientType: "it-business",
  providerResident: true,
  withholdingOverrideBp: null,
  priorYearGrossCents: 0,
  inpsReducedRate: false,
  stampChargedToClient: false,
};

const calc = (grossCents: number, overrides: Partial<TaxInput> = {}) =>
  computeTaxes({ ...base, grossCents, ...overrides });

describe("withholding", () => {
  it("applies 20% ritenuta d'acconto for an Italian business client and a resident worker", () => {
    const r = calc(100_000);
    expect(r.withholding).toEqual({
      kind: "acconto",
      reason: "business-resident",
      rateBp: 2000,
      amountCents: 20_000,
    });
    expect(r.netCents).toBe(80_000);
  });

  it("applies 30% final withholding for a non-resident worker", () => {
    const r = calc(100_000, { providerResident: false });
    expect(r.withholding.kind).toBe("imposta");
    expect(r.withholding.amountCents).toBe(30_000);
    expect(r.netCents).toBe(70_000);
    expect(r.inps.applies).toBe(false);
  });

  it("applies no withholding for private or foreign clients", () => {
    for (const clientType of ["it-private", "foreign"] as const) {
      const r = calc(50_000, { clientType, withholdingOverrideBp: 2000 });
      expect(r.withholding.kind).toBe("none");
      expect(r.withholding.amountCents).toBe(0);
      expect(r.netCents).toBe(50_000);
      expect(r.inps.applies).toBe(false);
    }
  });

  it("honours a custom rate for business clients, including 0% (treaty exemption)", () => {
    expect(calc(100_000, { withholdingOverrideBp: 1000 }).withholding.amountCents).toBe(10_000);
    const treaty = calc(100_000, { providerResident: false, withholdingOverrideBp: 0 });
    expect(treaty.withholding).toMatchObject({ kind: "none", reason: "custom-rate", amountCents: 0 });
  });

  it("rounds half up to the cent", () => {
    // 20% of 0.03 = 0.006 → 0.01
    expect(calc(3).withholding.amountCents).toBe(1);
    expect(calc(12_345).withholding.amountCents).toBe(2_469);
  });
});

describe("INPS Gestione Separata", () => {
  it("is not due up to €5,000 in the year", () => {
    const r = calc(200_000, { priorYearGrossCents: 300_000 });
    expect(r.inps.thresholdExceeded).toBe(false);
    expect(r.inps.totalCents).toBe(0);
  });

  it("matches the INPS 2026 example: €3,000 already received + €4,000 now", () => {
    const r = calc(400_000, { priorYearGrossCents: 300_000 });
    expect(r.inps).toMatchObject({
      thresholdExceeded: true,
      baseCents: 200_000,
      rateBp: 3372,
      totalCents: 67_440,
      workerCents: 22_480,
      clientCents: 44_960,
    });
    expect(r.withholding.amountCents).toBe(80_000);
    expect(r.netCents).toBe(297_520);
    expect(r.clientCostCents).toBe(444_960);
  });

  it("uses 24% for pensioners or workers with other coverage", () => {
    const r = calc(400_000, { priorYearGrossCents: 300_000, inpsReducedRate: true });
    expect(r.inps).toMatchObject({ totalCents: 48_000, workerCents: 16_000, clientCents: 32_000 });
    expect(r.netCents).toBe(304_000);
  });

  it("only charges the part of this receipt above the threshold", () => {
    expect(calc(100_000, { priorYearGrossCents: 600_000 }).inps.baseCents).toBe(100_000);
    expect(calc(100_000, { priorYearGrossCents: 450_000 }).inps.baseCents).toBe(50_000);
    expect(calc(600_000).inps.baseCents).toBe(100_000);
  });

  it("does not apply to private clients even above the threshold", () => {
    const r = calc(600_000, { clientType: "it-private" });
    expect(r.inps.thresholdExceeded).toBe(true);
    expect(r.inps.applies).toBe(false);
    expect(r.inps.totalCents).toBe(0);
  });
});

describe("stamp duty", () => {
  it("is required only above €77.47", () => {
    expect(calc(7_747).stamp.required).toBe(false);
    expect(calc(7_748).stamp.required).toBe(true);
  });

  it("adds €2 to net and client cost when charged to the client, without withholding on it", () => {
    const r = calc(100_000, { stampChargedToClient: true });
    expect(r.stamp.chargedCents).toBe(RULES.stampCents);
    expect(r.withholding.amountCents).toBe(20_000);
    expect(r.netCents).toBe(80_200);
    expect(r.clientCostCents).toBe(100_200);
  });

  it("is not charged when not required", () => {
    expect(calc(5_000, { stampChargedToClient: true }).stamp.chargedCents).toBe(0);
  });
});

describe("grossForNet", () => {
  it("finds the gross for a target net with 20% withholding", () => {
    expect(grossForNet(80_000, base)).toEqual({ grossCents: 100_000, netCents: 80_000, exact: true });
  });

  it("handles INPS above the threshold", () => {
    const r = grossForNet(297_520, { ...base, priorYearGrossCents: 300_000 });
    expect(r.grossCents).toBe(400_000);
    expect(r.exact).toBe(true);
  });

  it("returns the smallest gross reaching the target", () => {
    for (const target of [1, 99, 6_197, 6_198, 123_457, 1_000_001]) {
      for (const input of [
        base,
        { ...base, stampChargedToClient: true },
        { ...base, providerResident: false },
        { ...base, priorYearGrossCents: 480_000 },
        { ...base, clientType: "it-private" as const },
      ]) {
        const r = grossForNet(target, input);
        expect(computeTaxes({ ...input, grossCents: r.grossCents }).netCents).toBeGreaterThanOrEqual(target);
        expect(computeTaxes({ ...input, grossCents: r.grossCents - 1 }).netCents).toBeLessThan(target);
      }
    }
  });

  it("flags targets that fall in the €2 stamp step", () => {
    // Net just above the stamp threshold jumps by €2 when the stamp is charged to the client.
    const r = grossForNet(6_199, { ...base, stampChargedToClient: true });
    expect(r.exact).toBe(false);
    expect(r.grossCents).toBe(7_748);
  });

  it("returns zero for a zero target", () => {
    expect(grossForNet(0, base)).toEqual({ grossCents: 0, netCents: 0, exact: true });
  });
});
