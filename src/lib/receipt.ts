import type { Draft } from "./draft";
import { computeTaxes, type TaxInput, type TaxResult } from "./tax/engine";
import { parseAmountToCents, parsePercentToBp } from "./tax/money";
import type { PdfLanguage } from "./pdf/strings";

export type ValidationKey = "providerName" | "clientName" | "items" | "amount" | "percent" | "description";

export interface FieldErrors {
  providerName?: ValidationKey;
  clientName?: ValidationKey;
  items?: ValidationKey;
  itemAmounts: Record<string, ValidationKey>;
  itemDescriptions: Record<string, ValidationKey>;
  priorYearGross?: ValidationKey;
  customRate?: ValidationKey;
}

export interface DerivedReceipt {
  items: Array<{ id: string; description: string; amountCents: number | null }>;
  taxInput: TaxInput;
  tax: TaxResult;
  /** Errors on fields whose current value is malformed (shown while typing). */
  formatErrors: FieldErrors;
}

const isBlank = (value: string) => value.trim() === "";

export function deriveReceipt(draft: Pick<Draft, "items" | "client" | "provider" | "tax">): DerivedReceipt {
  const formatErrors: FieldErrors = { itemAmounts: {}, itemDescriptions: {} };

  const items = draft.items.map((item) => {
    const amountCents = isBlank(item.amount) ? null : parseAmountToCents(item.amount);
    if (!isBlank(item.amount) && amountCents === null) formatErrors.itemAmounts[item.id] = "amount";
    return { id: item.id, description: item.description, amountCents };
  });

  const prior = isBlank(draft.tax.priorYearGross) ? 0 : parseAmountToCents(draft.tax.priorYearGross);
  if (prior === null) formatErrors.priorYearGross = "amount";

  // The custom rate only exists for Italian business clients; elsewhere the field is hidden and ignored.
  const usesCustomRate = draft.client.type === "it-business" && !isBlank(draft.tax.customRate);
  const customRate = usesCustomRate ? parsePercentToBp(draft.tax.customRate) : null;
  if (usesCustomRate && customRate === null) formatErrors.customRate = "percent";

  const taxInput: TaxInput = {
    grossCents: items.reduce((sum, item) => sum + (item.amountCents ?? 0), 0),
    clientType: draft.client.type,
    providerResident: !draft.provider.nonResident,
    withholdingOverrideBp: customRate,
    priorYearGrossCents: prior ?? 0,
    inpsReducedRate: draft.tax.inpsReduced,
    stampChargedToClient: draft.tax.stampCharged,
  };

  return { items, taxInput, tax: computeTaxes(taxInput), formatErrors };
}

/** Full validation, run when the user asks for the PDF. */
export function validateForPdf(draft: Pick<Draft, "provider" | "client">, derived: DerivedReceipt): FieldErrors | null {
  const errors: FieldErrors = {
    ...derived.formatErrors,
    itemAmounts: { ...derived.formatErrors.itemAmounts },
    itemDescriptions: {},
  };
  if (isBlank(draft.provider.name)) errors.providerName = "providerName";
  if (isBlank(draft.client.name)) errors.clientName = "clientName";

  const filled = derived.items.filter((item) => (item.amountCents ?? 0) > 0);
  if (filled.length === 0) errors.items = "items";
  for (const item of filled) {
    if (isBlank(item.description)) errors.itemDescriptions[item.id] = "description";
  }

  const hasErrors =
    errors.providerName ||
    errors.clientName ||
    errors.items ||
    errors.priorYearGross ||
    errors.customRate ||
    Object.keys(errors.itemAmounts).length > 0 ||
    Object.keys(errors.itemDescriptions).length > 0;
  return hasErrors ? errors : null;
}

export interface ReceiptPdfData {
  language: PdfLanguage;
  provider: Draft["provider"];
  client: Draft["client"];
  number: string;
  /** ISO yyyy-mm-dd */
  date: string;
  place: string;
  items: Array<{ description: string; amountCents: number }>;
  tax: TaxResult;
  stampId: string;
  payment: Draft["payment"];
  notes: string;
}

export function buildPdfData(draft: Draft, derived: DerivedReceipt, language: PdfLanguage): ReceiptPdfData {
  const trim = (value: string) => value.trim();
  return {
    language,
    provider: {
      ...draft.provider,
      name: trim(draft.provider.name),
      taxCode: trim(draft.provider.taxCode).toUpperCase(),
      address: trim(draft.provider.address),
    },
    client: {
      ...draft.client,
      name: trim(draft.client.name),
      taxCode: trim(draft.client.taxCode).toUpperCase(),
      address: trim(draft.client.address),
    },
    number: trim(draft.receipt.number),
    date: draft.receipt.date || todayIso(),
    place: trim(draft.receipt.place),
    items: derived.items
      .filter((item) => (item.amountCents ?? 0) > 0)
      .map((item) => ({ description: trim(item.description), amountCents: item.amountCents ?? 0 })),
    tax: derived.tax,
    stampId: derived.tax.stamp.required ? trim(draft.tax.stampId) : "",
    payment: { method: draft.payment.method, details: trim(draft.payment.details) },
    notes: trim(draft.notes),
  };
}

/** Local calendar date as yyyy-mm-dd. */
export function todayIso(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/** dd/mm/yyyy, the standard format on Italian documents. */
export function formatDocumentDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : iso;
}
