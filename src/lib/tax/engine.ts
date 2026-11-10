/**
 * Tax engine for Italian occasional self-employment receipts (prestazione occasionale).
 * Pure functions, integer euro cents, rates in basis points (2000 = 20%).
 */

export type ClientType = "it-business" | "it-private" | "foreign";

export interface TaxInput {
  grossCents: number;
  clientType: ClientType;
  /** Worker is an Italian tax resident. */
  providerResident: boolean;
  /** Custom withholding rate in basis points; only used for Italian business clients. `null` = automatic. */
  withholdingOverrideBp: number | null;
  /** Occasional-work compensation already received this calendar year from all clients, excluding this receipt. */
  priorYearGrossCents: number;
  /** 24% rate (pensioner or other mandatory pension coverage) instead of 33.72%. */
  inpsReducedRate: boolean;
  stampChargedToClient: boolean;
}

export const RULES = {
  withholdingResidentBp: 2000,
  withholdingNonResidentBp: 3000,
  inpsFullBp: 3372,
  inpsReducedBp: 2400,
  inpsThresholdCents: 500_000,
  stampThresholdCents: 7_747,
  stampCents: 200,
} as const;

export type WithholdingKind = "acconto" | "imposta" | "none";

export type WithholdingReason =
  | "business-resident"
  | "business-non-resident"
  | "private-client"
  | "foreign-client"
  | "custom-rate";

export interface TaxResult {
  grossCents: number;
  withholding: {
    kind: WithholdingKind;
    reason: WithholdingReason;
    rateBp: number;
    amountCents: number;
  };
  inps: {
    /** The client is a withholding agent and the worker is resident, so INPS rules are handled on the receipt. */
    applies: boolean;
    /** Prior + this receipt goes beyond €5,000. */
    thresholdExceeded: boolean;
    yearTotalCents: number;
    baseCents: number;
    rateBp: number;
    totalCents: number;
    workerCents: number;
    clientCents: number;
  };
  stamp: {
    required: boolean;
    chargedToClient: boolean;
    chargedCents: number;
  };
  /** Amount the client pays to the worker. */
  netCents: number;
  /** Total cost for the client: gross + client INPS share + stamp charged. */
  clientCostCents: number;
}

const applyRate = (cents: number, rateBp: number) => Math.round((cents * rateBp) / 10_000);

const nonNegativeInt = (value: number) => (Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0);

export function computeTaxes(input: TaxInput): TaxResult {
  const grossCents = nonNegativeInt(input.grossCents);
  const priorCents = nonNegativeInt(input.priorYearGrossCents);
  const isBusinessClient = input.clientType === "it-business";

  let reason: WithholdingReason;
  let rateBp: number;
  if (!isBusinessClient) {
    reason = input.clientType === "it-private" ? "private-client" : "foreign-client";
    rateBp = 0;
  } else if (input.withholdingOverrideBp !== null && Number.isFinite(input.withholdingOverrideBp)) {
    reason = "custom-rate";
    rateBp = Math.min(10_000, nonNegativeInt(input.withholdingOverrideBp));
  } else if (input.providerResident) {
    reason = "business-resident";
    rateBp = RULES.withholdingResidentBp;
  } else {
    reason = "business-non-resident";
    rateBp = RULES.withholdingNonResidentBp;
  }
  const kind: WithholdingKind =
    rateBp === 0 ? "none" : input.providerResident ? "acconto" : "imposta";
  const withholdingCents = applyRate(grossCents, rateBp);

  const inpsApplies = isBusinessClient && input.providerResident;
  const yearTotalCents = priorCents + grossCents;
  const threshold = RULES.inpsThresholdCents;
  const baseCents = inpsApplies
    ? Math.max(0, yearTotalCents - threshold) - Math.max(0, priorCents - threshold)
    : 0;
  const inpsRateBp = input.inpsReducedRate ? RULES.inpsReducedBp : RULES.inpsFullBp;
  const inpsTotalCents = applyRate(baseCents, inpsRateBp);
  const inpsWorkerCents = Math.round(inpsTotalCents / 3);
  const inpsClientCents = inpsTotalCents - inpsWorkerCents;

  const stampRequired = grossCents > RULES.stampThresholdCents;
  const stampChargedCents = stampRequired && input.stampChargedToClient ? RULES.stampCents : 0;

  return {
    grossCents,
    withholding: { kind, reason, rateBp, amountCents: withholdingCents },
    inps: {
      applies: inpsApplies,
      thresholdExceeded: yearTotalCents > threshold,
      yearTotalCents,
      baseCents,
      rateBp: inpsRateBp,
      totalCents: inpsTotalCents,
      workerCents: inpsWorkerCents,
      clientCents: inpsClientCents,
    },
    stamp: {
      required: stampRequired,
      chargedToClient: stampRequired && input.stampChargedToClient,
      chargedCents: stampChargedCents,
    },
    netCents: grossCents - withholdingCents - inpsWorkerCents + stampChargedCents,
    clientCostCents: grossCents + inpsClientCents + stampChargedCents,
  };
}

export interface GrossForNetResult {
  grossCents: number;
  netCents: number;
  /** False when no gross amount produces exactly the target (rounding or the €2 stamp step). */
  exact: boolean;
}

/** Smallest gross amount whose net is at least `targetNetCents`. */
export function grossForNet(
  targetNetCents: number,
  input: Omit<TaxInput, "grossCents">,
): GrossForNetResult {
  const target = nonNegativeInt(targetNetCents);
  const netOf = (grossCents: number) => computeTaxes({ ...input, grossCents }).netCents;
  if (target === 0) return { grossCents: 0, netCents: 0, exact: true };

  let hi = Math.max(1, target * 2);
  while (netOf(hi) < target) hi *= 2;
  let lo = 0;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (netOf(mid) >= target) hi = mid;
    else lo = mid + 1;
  }
  // Rounding can make net non-monotonic by a cent: look a few cents back for a smaller valid gross.
  let best = lo;
  for (let g = lo - 1; g >= Math.max(0, lo - 5); g--) {
    if (netOf(g) >= target) best = g;
  }
  const netCents = netOf(best);
  return { grossCents: best, netCents, exact: netCents === target };
}
