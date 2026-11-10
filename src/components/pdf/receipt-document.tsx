import type { ComponentProps } from "react";
import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { interpolate } from "@/lib/i18n/interpolate";
import { pdfStrings, splitPdfLanguage, type PdfStrings } from "@/lib/pdf/strings";
import { formatDocumentDate, type ReceiptPdfData } from "@/lib/receipt";
import { formatEuro, formatPercent } from "@/lib/tax/money";

const FAMILY = "Jakarta";
let fontsRegistered = false;

/** `baseUrl` points to the folder holding the Plus Jakarta Sans TTF files (a URL in the browser, a path in Node). */
export function registerPdfFonts(baseUrl: string) {
  if (fontsRegistered) return;
  Font.register({
    family: FAMILY,
    fonts: [
      { src: `${baseUrl}/PlusJakartaSans-Regular.ttf`, fontWeight: 400 },
      { src: `${baseUrl}/PlusJakartaSans-Italic.ttf`, fontWeight: 400, fontStyle: "italic" },
      { src: `${baseUrl}/PlusJakartaSans-SemiBold.ttf`, fontWeight: 600 },
      { src: `${baseUrl}/PlusJakartaSans-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  fontsRegistered = true;
}

const ink = "#0f172a";
const muted = "#64748b";
const line = "#cbd5e1";
const soft = "#f1f5f9";

const caps = { fontSize: 7.5, color: muted, textTransform: "uppercase", letterSpacing: 0.6 } as const;

const styles = StyleSheet.create({
  page: {
    fontFamily: FAMILY,
    fontSize: 9,
    lineHeight: 1.4,
    color: ink,
    paddingTop: 40,
    paddingBottom: 54,
    paddingHorizontal: 48,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: 24 },
  headerText: { flex: 1 },
  title: { fontSize: 14, fontWeight: 700, lineHeight: 1.25 },
  titleTranslation: { fontSize: 9.5, lineHeight: 1.3, fontStyle: "italic", color: muted, marginTop: 2 },
  meta: { flexDirection: "row", gap: 28, marginTop: 10 },
  metaLabel: caps,
  metaValue: { fontSize: 11, fontWeight: 600, marginTop: 1 },
  stamp: {
    width: 76,
    height: 84,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: muted,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  stampText: { fontSize: 7.5, color: muted, textAlign: "center", lineHeight: 1.3 },
  parties: { flexDirection: "row", gap: 14, marginTop: 18 },
  party: { flex: 1, borderWidth: 1, borderColor: line, borderRadius: 4, paddingVertical: 9, paddingHorizontal: 11 },
  partyLabel: { ...caps, marginBottom: 4 },
  partyName: { fontSize: 10.5, fontWeight: 700, marginBottom: 1 },
  partyDetail: { color: muted },
  declaration: { marginTop: 14 },
  table: { marginTop: 14 },
  tableHead: { ...caps, flexDirection: "row", gap: 16, borderBottomWidth: 1, borderBottomColor: ink, paddingBottom: 4 },
  row: { flexDirection: "row", gap: 16, borderBottomWidth: 0.75, borderBottomColor: line, paddingVertical: 5 },
  cellDescription: { flex: 1 },
  cellAmount: { width: 96, textAlign: "right" },
  totals: { marginTop: 8, marginLeft: "auto", width: "70%" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", gap: 16, paddingVertical: 2.5 },
  totalLabel: { flex: 1 },
  totalTranslation: { fontSize: 7, lineHeight: 1.3, fontStyle: "italic", fontWeight: 400, color: muted },
  totalAmount: { width: 96, textAlign: "right" },
  netRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    marginTop: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: soft,
    borderRadius: 4,
  },
  netLabel: { flex: 1, fontWeight: 700, fontSize: 10.5 },
  netAmount: { width: 110, textAlign: "right", fontWeight: 700, fontSize: 12.5 },
  section: { marginTop: 14 },
  sectionTitle: { ...caps, marginBottom: 5 },
  note: { marginBottom: 5, fontSize: 8, lineHeight: 1.4 },
  translation: { fontStyle: "italic", color: muted, fontSize: 7.5, lineHeight: 1.35, marginTop: 1 },
  strong: { fontWeight: 600 },
  closing: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginTop: 22, gap: 32 },
  closingBlock: { width: "42%" },
  closingValue: { fontWeight: 600, minHeight: 13 },
  signatureLine: { borderTopWidth: 0.75, borderTopColor: ink, marginTop: 30, paddingTop: 4 },
  smallLabel: { fontSize: 7.5, color: muted },
  // `bottom` is resolved against the whole content height in wrapping pages, so anchor from the top (A4 = 841.89pt).
  footer: { position: "absolute", top: 806, left: 48, right: 48, fontSize: 7.5, color: muted, textAlign: "right" },
});

/** Plus Jakarta Sans has no U+202F (narrow no-break space), which French number formatting uses. */
const clean = (text: string) => text.replace(/\u202f/g, "\u00a0");

type StringPicker = (strings: PdfStrings) => string;
type Pair = readonly [primary: string, secondary: string | null];

function Bilingual({ text: [primary, secondary], style }: { text: Pair; style?: ComponentProps<typeof View>["style"] }) {
  return (
    <View style={style} wrap={false}>
      <Text>{clean(primary)}</Text>
      {secondary ? <Text style={styles.translation}>{clean(secondary)}</Text> : null}
    </View>
  );
}

function TotalRow({ label: [primary, secondary], amount }: { label: Pair; amount: string }) {
  return (
    <View style={styles.totalRow} wrap={false}>
      <View style={styles.totalLabel}>
        <Text>{clean(primary)}</Text>
        {secondary ? <Text style={styles.totalTranslation}>{clean(secondary)}</Text> : null}
      </View>
      <Text style={styles.totalAmount}>{clean(amount)}</Text>
    </View>
  );
}

export function ReceiptDocument({ data }: { data: ReceiptPdfData }) {
  const [primaryLanguage, secondaryLanguage] = splitPdfLanguage(data.language);
  const p = pdfStrings[primaryLanguage];
  const s = secondaryLanguage ? pdfStrings[secondaryLanguage] : null;
  const { tax } = data;

  const both = (pick: StringPicker): Pair => [pick(p), s ? pick(s) : null];
  const label = (pick: StringPicker) => (s ? `${pick(p)} / ${pick(s)}` : pick(p));
  const money = (cents: number) => formatEuro(cents, p.intl);
  const date = formatDocumentDate(data.date);

  const declaration = both((t) =>
    interpolate(data.provider.taxCode ? t.declaration : t.declarationNoTaxCode, {
      provider: data.provider.name,
      taxCode: data.provider.taxCode,
      client: data.client.name,
    }),
  );

  const withholdingLabel = both((t) =>
    interpolate(tax.withholding.kind === "imposta" ? t.withholdingImposta : t.withholdingAcconto, {
      rate: formatPercent(tax.withholding.rateBp, t.intl),
    }),
  );

  const notes: Pair[] = [both((t) => t.vatNote)];

  if (tax.withholding.kind === "none") {
    const { reason } = tax.withholding;
    if (reason === "foreign-client") notes.push(both((t) => t.noWithholdingForeign));
    else if (reason === "custom-rate" && data.provider.nonResident) notes.push(both((t) => t.noWithholdingTreaty));
    // Private clients, or a business client that is not a withholding agent (custom 0%).
    else notes.push(both((t) => t.noWithholdingPrivate));
  }

  if (tax.inps.applies) {
    notes.push(
      tax.inps.thresholdExceeded
        ? both((t) =>
            interpolate(t.inpsAbove, {
              yearTotal: formatEuro(tax.inps.yearTotalCents, t.intl),
              base: formatEuro(tax.inps.baseCents, t.intl),
              rate: formatPercent(tax.inps.rateBp, t.intl),
              worker: formatEuro(tax.inps.workerCents, t.intl),
              client: formatEuro(tax.inps.clientCents, t.intl),
            }),
          )
        : both((t) => t.inpsBelow),
    );
  }

  if (tax.stamp.required) {
    notes.push(both((t) => (tax.stamp.chargedToClient ? t.stampPaidCharged : t.stampPaid)));
    if (data.stampId) notes.push(both((t) => interpolate(t.stampSerial, { id: data.stampId })));
  }

  const [title, titleTranslation] = both((t) => t.title);
  const parties = [
    { heading: label((t) => t.provider), party: data.provider, taxLabel: label((t) => t.taxCode) },
    { heading: label((t) => t.client), party: data.client, taxLabel: label((t) => t.clientTaxCode) },
  ];

  return (
    <Document
      title={`${p.number} ${data.number}${data.provider.name ? ` – ${data.provider.name}` : ""}`}
      author={data.provider.name}
      subject={title}
      language={p.intl}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{title}</Text>
            {titleTranslation ? <Text style={styles.titleTranslation}>{titleTranslation}</Text> : null}
            <View style={styles.meta}>
              <View>
                <Text style={styles.metaLabel}>{label((t) => t.number)}</Text>
                <Text style={styles.metaValue}>{data.number || "—"}</Text>
              </View>
              <View>
                <Text style={styles.metaLabel}>{label((t) => t.date)}</Text>
                <Text style={styles.metaValue}>{date || "—"}</Text>
              </View>
            </View>
          </View>
          {tax.stamp.required ? (
            <View style={styles.stamp}>
              <Text style={styles.stampText}>{"Marca da bollo\n€ 2,00"}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.parties}>
          {parties.map(({ heading, party, taxLabel }) => (
            <View key={heading} style={styles.party} wrap={false}>
              <Text style={styles.partyLabel}>{heading}</Text>
              <Text style={styles.partyName}>{party.name}</Text>
              {party.taxCode ? (
                <Text style={styles.partyDetail}>
                  {`${taxLabel}: `}
                  <Text style={{ color: ink }}>{party.taxCode}</Text>
                </Text>
              ) : null}
              {party.address ? <Text>{party.address}</Text> : null}
            </View>
          ))}
        </View>

        <Bilingual style={styles.declaration} text={declaration} />

        <View style={styles.table}>
          <View style={styles.tableHead}>
            <Text style={styles.cellDescription}>{label((t) => t.description)}</Text>
            <Text style={styles.cellAmount}>{label((t) => t.amount)}</Text>
          </View>
          {data.items.map((item, index) => (
            <View key={index} style={styles.row} wrap={false}>
              <Text style={styles.cellDescription}>{item.description}</Text>
              <Text style={styles.cellAmount}>{clean(money(item.amountCents))}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals} wrap={false}>
          <TotalRow label={both((t) => t.gross)} amount={money(tax.grossCents)} />
          {tax.withholding.amountCents > 0 ? (
            <TotalRow label={withholdingLabel} amount={`− ${money(tax.withholding.amountCents)}`} />
          ) : null}
          {tax.inps.workerCents > 0 ? (
            <TotalRow label={both((t) => t.inpsWorker)} amount={`− ${money(tax.inps.workerCents)}`} />
          ) : null}
          {tax.stamp.chargedCents > 0 ? (
            <TotalRow label={both((t) => t.stampCharged)} amount={`+ ${money(tax.stamp.chargedCents)}`} />
          ) : null}
          <View style={styles.netRow}>
            <View style={styles.netLabel}>
              <Text>{p.net}</Text>
              {s ? <Text style={styles.totalTranslation}>{s.net}</Text> : null}
            </View>
            <Text style={styles.netAmount}>{clean(money(tax.netCents))}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={40}>
            {label((t) => t.notes)}
          </Text>
          {notes.map((note, index) => (
            <Bilingual key={index} style={styles.note} text={note} />
          ))}
          {data.notes ? <Text style={styles.note}>{data.notes}</Text> : null}
        </View>

        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>{label((t) => t.payment)}</Text>
          <Text style={styles.strong}>{label((t) => t.paymentMethods[data.payment.method])}</Text>
          {data.payment.details ? <Text>{data.payment.details}</Text> : null}
        </View>

        <View style={styles.closing} wrap={false}>
          <View style={styles.closingBlock}>
            <Text style={styles.smallLabel}>{label((t) => t.placeDate)}</Text>
            <Text style={styles.closingValue}>{[data.place, date].filter(Boolean).join(", ")}</Text>
          </View>
          <View style={styles.closingBlock}>
            <View style={styles.signatureLine}>
              <Text style={styles.smallLabel}>{label((t) => t.signature)}</Text>
              <Text style={styles.strong}>{data.provider.name}</Text>
            </View>
          </View>
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            totalPages > 1 ? `${p.number} ${data.number} · ${label((t) => t.page)} ${pageNumber}/${totalPages}` : ""
          }
        />
      </Page>
    </Document>
  );
}
