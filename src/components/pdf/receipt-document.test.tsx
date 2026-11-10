import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { describe, expect, it } from "vitest";
import { pdfLanguages, type PdfLanguage } from "@/lib/pdf/strings";
import type { ReceiptPdfData } from "@/lib/receipt";
import { computeTaxes, type TaxInput } from "@/lib/tax/engine";
import { ReceiptDocument, registerPdfFonts } from "./receipt-document";

registerPdfFonts(join(process.cwd(), "public/fonts"));

/** Set PDF_OUT=/some/dir to write the rendered files for a visual check. */
const outDir = process.env.PDF_OUT;

const base: Omit<TaxInput, "grossCents"> = {
  clientType: "it-business",
  providerResident: true,
  withholdingOverrideBp: null,
  priorYearGrossCents: 0,
  inpsReducedRate: false,
  stampChargedToClient: false,
};

function receipt(
  language: PdfLanguage,
  items: Array<[string, number]>,
  tax: Partial<TaxInput> = {},
  extra: Partial<ReceiptPdfData> = {},
): ReceiptPdfData {
  const grossCents = items.reduce((sum, [, cents]) => sum + cents, 0);
  return {
    language,
    provider: { name: "Giulia Bianchi", taxCode: "BNCGLI90A41F205X", address: "Via Roma 10\n20121 Milano (MI)", nonResident: !(tax.providerResident ?? true) },
    client: { type: tax.clientType ?? "it-business", name: "Studio Esempio S.r.l.", taxCode: "IT01234567890", address: "Corso Italia 5, 00100 Roma (RM)" },
    number: "3/2026",
    date: "2026-11-10",
    place: "Milano",
    items: items.map(([description, amountCents]) => ({ description, amountCents })),
    tax: computeTaxes({ ...base, ...tax, grossCents }),
    stampId: "01234567890123",
    payment: { method: "bank", details: "IBAN IT60 X054 2811 1010 0000 0123 456" },
    notes: "",
    ...extra,
  };
}

const scenarios: Record<string, ReceiptPdfData> = {
  "business-inps-above-it+en": receipt(
    "it+en",
    [["Traduzione di un manuale tecnico (40 pagine)", 300000], ["Revisione e impaginazione", 100000]],
    { priorYearGrossCents: 300000, stampChargedToClient: true },
    { notes: "Prestazione svolta tra il 1° e il 31 ottobre 2026." },
  ),
  "private-en": receipt("en", [["Private English lessons (10 hours)", 30000]], { clientType: "it-private" }),
  "foreign-fr": receipt("fr", [["Conception graphique d’un logo", 125050]], { clientType: "foreign" }),
  "non-resident-de": receipt("de", [["Übersetzung Website", 80000]], { providerResident: false }),
  "treaty-it+es": receipt("it+es", [["Diseño de una página web", 50000]], {
    providerResident: false,
    withholdingOverrideBp: 0,
  }),
  "long-it": receipt(
    "it",
    Array.from({ length: 28 }, (_, i): [string, number] => [`Giornata di consulenza n. ${i + 1} – analisi e reportistica`, 15000]),
    { priorYearGrossCents: 120000, inpsReducedRate: true },
  ),
  "no-tax-code-it": receipt("it", [["Lezione", 5000]], { clientType: "it-private" }, {
    provider: { name: "Ana Pérez", taxCode: "", address: "", nonResident: false },
    place: "",
  }),
};

describe("ReceiptDocument", () => {
  if (outDir) mkdirSync(outDir, { recursive: true });

  for (const [name, data] of Object.entries(scenarios)) {
    it(`renders ${name}`, async () => {
      const buffer = await renderToBuffer(<ReceiptDocument data={data} />);
      expect(buffer.subarray(0, 5).toString()).toBe("%PDF-");
      if (outDir) writeFileSync(join(outDir, `${name}.pdf`), buffer);
    });
  }

  it("renders every PDF language", async () => {
    for (const language of pdfLanguages) {
      const buffer = await renderToBuffer(<ReceiptDocument data={receipt(language, [["Test", 100000]])} />);
      expect(buffer.length).toBeGreaterThan(1000);
    }
  });
});
