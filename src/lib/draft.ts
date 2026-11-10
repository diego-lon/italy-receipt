import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ClientType } from "./tax/engine";
import type { PdfLanguage } from "./pdf/strings";
import { site } from "./site";

export type PaymentMethod = "bank" | "cash" | "paypal" | "other";

export interface LineItem {
  id: string;
  description: string;
  amount: string;
}

export interface Draft {
  provider: { name: string; taxCode: string; address: string; nonResident: boolean };
  client: { type: ClientType; name: string; taxCode: string; address: string };
  receipt: { number: string; date: string; place: string };
  items: LineItem[];
  tax: {
    priorYearGross: string;
    inpsReduced: boolean;
    stampCharged: boolean;
    stampId: string;
    customRate: string;
  };
  payment: { method: PaymentMethod; details: string };
  notes: string;
  /** `null` follows the interface language. */
  pdfLanguage: PdfLanguage | null;
}

type Section = "provider" | "client" | "receipt" | "tax" | "payment";

interface DraftActions {
  update: <S extends Section>(section: S, patch: Partial<Draft[S]>) => void;
  setNotes: (notes: string) => void;
  setPdfLanguage: (language: PdfLanguage) => void;
  addItem: () => void;
  updateItem: (id: string, patch: Partial<Omit<LineItem, "id">>) => void;
  removeItem: (id: string) => void;
  /** Replaces all lines with a single amount, keeping the first description. */
  setSingleAmount: (amount: string) => void;
  /** Keeps you, the client and payment details; clears the work and bumps the receipt number. */
  newReceipt: (todayIso: string) => void;
  /** Fills the date and number when they are still empty (done on the client to avoid hydration mismatches). */
  fillDefaults: (todayIso: string) => void;
  clearAll: () => void;
}

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export function createEmptyDraft(): Draft {
  return {
    provider: { name: "", taxCode: "", address: "", nonResident: false },
    client: { type: "it-business", name: "", taxCode: "", address: "" },
    receipt: { number: "", date: "", place: "" },
    items: [{ id: "item-1", description: "", amount: "" }],
    tax: { priorYearGross: "", inpsReduced: false, stampCharged: false, stampId: "", customRate: "" },
    payment: { method: "bank", details: "" },
    notes: "",
    pdfLanguage: null,
  };
}

/** "3/2026" → "4/2026", "2026-07" → "2026-08", "A12" → "A13". */
export function incrementReceiptNumber(value: string) {
  const match = /^(\D*)(\d+)(.*)$/.exec(value.trim());
  if (!match) return value;
  const [, prefix, digits, suffix] = match;
  if (/^\/?\d{4}$/.test(suffix) || suffix === "" || !/^\d{4}$/.test(digits)) {
    const next = String(Number(digits) + 1).padStart(digits.length, "0");
    return `${prefix}${next}${suffix}`;
  }
  // Year first ("2026-07"): bump the trailing number instead.
  const tail = /^(.*?)(\d+)(\D*)$/.exec(value.trim());
  if (!tail) return value;
  const next = String(Number(tail[2]) + 1).padStart(tail[2].length, "0");
  return `${tail[1]}${next}${tail[3]}`;
}

export const useDraft = create<Draft & DraftActions>()(
  persist(
    (set) => ({
      ...createEmptyDraft(),
      update: (section, patch) => set((state) => ({ [section]: { ...state[section], ...patch } }) as Partial<Draft>),
      setNotes: (notes) => set({ notes }),
      setPdfLanguage: (pdfLanguage) => set({ pdfLanguage }),
      addItem: () =>
        set((state) => ({ items: [...state.items, { id: newId(), description: "", amount: "" }] })),
      updateItem: (id, patch) =>
        set((state) => ({ items: state.items.map((item) => (item.id === id ? { ...item, ...patch } : item)) })),
      removeItem: (id) =>
        set((state) => {
          const items = state.items.filter((item) => item.id !== id);
          return { items: items.length ? items : [{ id: newId(), description: "", amount: "" }] };
        }),
      setSingleAmount: (amount) =>
        set((state) => ({
          items: [{ id: state.items[0]?.id ?? newId(), description: state.items[0]?.description ?? "", amount }],
        })),
      newReceipt: (todayIso) =>
        set((state) => ({
          receipt: {
            ...state.receipt,
            number: state.receipt.number ? incrementReceiptNumber(state.receipt.number) : "",
            date: todayIso,
          },
          items: [{ id: newId(), description: "", amount: "" }],
          tax: { ...state.tax, stampId: "" },
          notes: "",
        })),
      fillDefaults: (todayIso) =>
        set((state) => ({
          receipt: {
            ...state.receipt,
            date: state.receipt.date || todayIso,
            number: state.receipt.number || `1/${todayIso.slice(0, 4)}`,
          },
        })),
      clearAll: () => set(createEmptyDraft()),
    }),
    {
      name: site.storageKeys.draft,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      // The date is not saved: every visit starts from today's date.
      partialize: ({ provider, client, receipt, items, tax, payment, notes, pdfLanguage }) => ({
        provider,
        client,
        receipt: { ...receipt, date: "" },
        items,
        tax,
        payment,
        notes,
        pdfLanguage,
      }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<Draft>;
        return {
          ...current,
          ...saved,
          provider: { ...current.provider, ...saved.provider },
          client: { ...current.client, ...saved.client },
          receipt: { ...current.receipt, ...saved.receipt },
          tax: { ...current.tax, ...saved.tax },
          payment: { ...current.payment, ...saved.payment },
          items: saved.items?.length ? saved.items : current.items,
        };
      },
    },
  ),
);

const LEGACY_KEYS = {
  provider: "italyReceipt_mittente",
  client: "italyReceipt_destinatario",
  payment: "italyReceipt_metodoPagamento",
  consent: "cookie_consent",
} as const;

const TAX_CODE = /\b[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]\b/i;
const VAT_NUMBER = /\b(?:IT)?\d{11}\b/i;
const TAX_LABEL = /\b(?:c\.?\s?f\.?|cod(?:ice)?\.?\s?fisc(?:ale)?\.?|p\.?\s?iva|partita\s+iva|tax\s*id|vat)\s*[:.]?\s*/gi;

/** Splits the old free-text "Name - Address - Tax ID" fields into structured parts. */
export function parseLegacyParty(raw: string) {
  let rest = raw.trim();
  let taxCode = "";
  const code = TAX_CODE.exec(rest) ?? VAT_NUMBER.exec(rest);
  if (code) {
    taxCode = code[0].toUpperCase();
    rest = rest.replace(code[0], "");
  }
  rest = rest.replace(TAX_LABEL, "");
  const parts = rest
    .split(/\r?\n|\s+[-–|]\s+/)
    .map((part) => part.trim().replace(/^[,;-]+|[,;-]+$/g, "").trim())
    .filter(Boolean);
  return { name: parts[0] ?? "", address: parts.slice(1).join("\n"), taxCode };
}

/** One-time import of data saved by the previous version of the site. */
export function migrateLegacyStorage() {
  try {
    const provider = localStorage.getItem(LEGACY_KEYS.provider);
    const client = localStorage.getItem(LEGACY_KEYS.client);
    const payment = localStorage.getItem(LEGACY_KEYS.payment);
    if (!localStorage.getItem(site.storageKeys.draft) && (provider || client || payment)) {
      const draft = createEmptyDraft();
      if (provider) Object.assign(draft.provider, parseLegacyParty(provider));
      if (client) Object.assign(draft.client, parseLegacyParty(client));
      if (payment) {
        draft.payment = {
          method: /iban|bonifico|transfer|\bIT\d{2}/i.test(payment) ? "bank" : "other",
          details: payment.trim(),
        };
      }
      localStorage.setItem(site.storageKeys.draft, JSON.stringify({ state: draft, version: 1 }));
    }
    Object.values(LEGACY_KEYS).forEach((key) => localStorage.removeItem(key));
  } catch {
    // Storage unavailable (private mode, blocked): nothing to migrate.
  }
}
