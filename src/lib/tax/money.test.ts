import { describe, expect, it } from "vitest";
import { formatEuro, parseAmountToCents, parsePercentToBp } from "./money";

describe("parseAmountToCents", () => {
  it.each([
    ["1000", 100_000],
    ["1.000", 100_000],
    ["1,000", 100_000],
    ["1.234,56", 123_456],
    ["1,234.56", 123_456],
    ["1234,5", 123_450],
    ["1234.56", 123_456],
    ["1 234,56 €", 123_456],
    ["€ 80", 8_000],
    ["0,99", 99],
    ["1.000.000", 100_000_000],
  ])("parses %s", (input, expected) => {
    expect(parseAmountToCents(input)).toBe(expected);
  });

  it.each(["", "abc", "-5", "1,2,3", "12.34.56", "1.234.5", "1,234,56.7.8", "0.125"])(
    "rejects %s",
    (input) => {
      expect(parseAmountToCents(input)).toBeNull();
    },
  );
});

describe("parsePercentToBp", () => {
  it("parses common inputs", () => {
    expect(parsePercentToBp("20")).toBe(2000);
    expect(parsePercentToBp("12,5")).toBe(1250);
    expect(parsePercentToBp("0")).toBe(0);
    expect(parsePercentToBp("33.72%")).toBe(3372);
    expect(parsePercentToBp("101")).toBeNull();
    expect(parsePercentToBp("x")).toBeNull();
  });
});

describe("formatEuro", () => {
  it("formats per locale", () => {
    expect(formatEuro(123_456, "en-IE")).toBe("€1,234.56");
    expect(formatEuro(123_456, "it-IT").replace(/\s/g, " ")).toBe("1.234,56 €");
  });
});
