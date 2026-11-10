/**
 * Parses amounts typed by users in any common European/English format into integer cents.
 * "1.234,56", "1,234.56", "1234,5", "1 234,56 €", "1000" → cents. Returns null when invalid.
 */
export function parseAmountToCents(raw: string): number | null {
  const cleaned = raw.replace(/[\s\u00a0\u202f€]/g, "").replace(/^\+/, "");
  if (cleaned === "") return null;
  if (!/^\d[\d.,]*$/.test(cleaned)) return null;

  const lastDot = cleaned.lastIndexOf(".");
  const lastComma = cleaned.lastIndexOf(",");
  let integerPart = cleaned;
  let decimalPart = "";

  if (lastDot !== -1 && lastComma !== -1) {
    const decimalSep = lastDot > lastComma ? "." : ",";
    const thousandsSep = decimalSep === "." ? "," : ".";
    const idx = cleaned.lastIndexOf(decimalSep);
    integerPart = cleaned.slice(0, idx).split(thousandsSep).join("");
    decimalPart = cleaned.slice(idx + 1);
    if (integerPart.includes(decimalSep)) return null;
  } else if (lastDot !== -1 || lastComma !== -1) {
    const sep = lastDot !== -1 ? "." : ",";
    const parts = cleaned.split(sep);
    const tail = parts[parts.length - 1];
    if (parts.length === 2 && tail.length !== 3) {
      [integerPart, decimalPart] = parts;
    } else if (parts[0] !== "0" && parts.slice(1).every((p) => p.length === 3)) {
      // Thousands separators only: "1.000", "1,000,000".
      integerPart = parts.join("");
    } else {
      return null;
    }
  }

  if (!/^\d+$/.test(integerPart) || !/^\d{0,2}$/.test(decimalPart)) return null;
  const cents = Number(integerPart) * 100 + Number(decimalPart.padEnd(2, "0") || "0");
  return Number.isSafeInteger(cents) ? cents : null;
}

const formatters = new Map<string, Intl.NumberFormat>();

export function formatEuro(cents: number, intlLocale: string) {
  let formatter = formatters.get(intlLocale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(intlLocale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: "always",
    });
    formatters.set(intlLocale, formatter);
  }
  return formatter.format(cents / 100);
}

/** Plain number with 2 decimals, for pre-filling inputs ("1234,56" in Italian, "1234.56" in English). */
export function centsToInput(cents: number, intlLocale: string) {
  return new Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(cents / 100);
}

export function formatPercent(bp: number, intlLocale: string) {
  return new Intl.NumberFormat(intlLocale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(bp / 10_000);
}

/** Parses a percentage like "20", "12,5" or "12.5%" into basis points. */
export function parsePercentToBp(raw: string): number | null {
  const cleaned = raw.replace(/[\s%]/g, "").replace(",", ".");
  if (!/^\d{1,3}(\.\d{1,2})?$/.test(cleaned)) return null;
  const bp = Math.round(Number(cleaned) * 100);
  return bp <= 10_000 ? bp : null;
}
