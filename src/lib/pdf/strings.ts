import type { Locale } from "../i18n/config";

export type PdfSingleLanguage = Locale;
export type PdfLanguage = PdfSingleLanguage | "it+en" | "it+es" | "it+fr" | "it+de";

export const pdfLanguages: PdfLanguage[] = ["it", "it+en", "it+es", "it+fr", "it+de", "en", "es", "fr", "de"];

export function defaultPdfLanguage(uiLocale: Locale): PdfLanguage {
  return uiLocale === "it" ? "it" : (`it+${uiLocale}` as PdfLanguage);
}

export function splitPdfLanguage(language: PdfLanguage): [PdfSingleLanguage, PdfSingleLanguage | null] {
  const [primary, secondary] = language.split("+") as [PdfSingleLanguage, PdfSingleLanguage | undefined];
  return [primary, secondary ?? null];
}

export interface PdfStrings {
  intl: string;
  fileName: string;
  title: string;
  number: string;
  date: string;
  provider: string;
  client: string;
  taxCode: string;
  clientTaxCode: string;
  declaration: string;
  declarationNoTaxCode: string;
  description: string;
  amount: string;
  gross: string;
  withholdingAcconto: string;
  withholdingImposta: string;
  inpsWorker: string;
  stampCharged: string;
  net: string;
  notes: string;
  vatNote: string;
  noWithholdingPrivate: string;
  noWithholdingForeign: string;
  noWithholdingTreaty: string;
  inpsBelow: string;
  inpsAbove: string;
  stampPaid: string;
  stampPaidCharged: string;
  stampSerial: string;
  payment: string;
  paymentMethods: Record<"bank" | "cash" | "paypal" | "other", string>;
  placeDate: string;
  signature: string;
  page: string;
}

const it: PdfStrings = {
  intl: "it-IT",
  fileName: "ricevuta",
  title: "Ricevuta per prestazione di lavoro autonomo occasionale",
  number: "Ricevuta n.",
  date: "Data",
  provider: "Prestatore",
  client: "Committente",
  taxCode: "C.F.",
  clientTaxCode: "C.F./P. IVA",
  declaration:
    "Il/La sottoscritto/a {provider}, codice fiscale {taxCode}, dichiara di aver svolto in favore di {client} la seguente prestazione di lavoro autonomo occasionale, senza vincolo di subordinazione e in assenza di abitualità, continuità e coordinamento (art. 2222 c.c.; art. 67, comma 1, lett. l), D.P.R. 917/1986), e di ricevere il relativo compenso come di seguito indicato.",
  declarationNoTaxCode:
    "Il/La sottoscritto/a {provider} dichiara di aver svolto in favore di {client} la seguente prestazione di lavoro autonomo occasionale, senza vincolo di subordinazione e in assenza di abitualità, continuità e coordinamento (art. 2222 c.c.; art. 67, comma 1, lett. l), D.P.R. 917/1986), e di ricevere il relativo compenso come di seguito indicato.",
  description: "Descrizione",
  amount: "Importo",
  gross: "Compenso lordo",
  withholdingAcconto: "Ritenuta d'acconto {rate} (art. 25 D.P.R. 600/1973)",
  withholdingImposta: "Ritenuta a titolo d'imposta {rate} (art. 25, c. 2, D.P.R. 600/1973)",
  inpsWorker: "Contributo INPS Gestione Separata a carico del prestatore (1/3)",
  stampCharged: "Rimborso imposta di bollo",
  net: "Netto a pagare",
  notes: "Note",
  vatNote:
    "Operazione esclusa dal campo di applicazione dell'IVA ai sensi dell'art. 5 del D.P.R. 633/1972, per mancanza del requisito dell'abitualità.",
  noWithholdingPrivate:
    "Compenso non soggetto a ritenuta d'acconto: il committente non riveste la qualifica di sostituto d'imposta.",
  noWithholdingForeign:
    "Compenso non soggetto a ritenuta d'acconto: committente non residente privo di stabile organizzazione in Italia.",
  noWithholdingTreaty:
    "Ritenuta non applicata in base alla convenzione contro le doppie imposizioni tra l'Italia e lo Stato di residenza del prestatore.",
  inpsBelow:
    "Il prestatore dichiara che, nell'anno solare in corso, i compensi percepiti per prestazioni di lavoro autonomo occasionale, compreso il presente, non superano € 5.000,00 e che pertanto non sussiste l'obbligo contributivo alla Gestione Separata INPS (art. 44, comma 2, D.L. 269/2003).",
  inpsAbove:
    "Il prestatore dichiara che, nell'anno solare in corso, i compensi percepiti per prestazioni di lavoro autonomo occasionale hanno superato € 5.000,00 (totale, compreso il presente: {yearTotal}). Sulla quota eccedente di {base} è dovuto il contributo alla Gestione Separata INPS nella misura del {rate} (art. 44, comma 2, D.L. 269/2003), per 1/3 a carico del prestatore ({worker}) e per 2/3 a carico del committente ({client}).",
  stampPaid: "Imposta di bollo di € 2,00 assolta sull'originale.",
  stampPaidCharged: "Imposta di bollo di € 2,00 assolta sull'originale e addebitata al committente.",
  stampSerial: "Identificativo marca da bollo: {id}",
  payment: "Modalità di pagamento",
  paymentMethods: { bank: "Bonifico bancario", cash: "Contanti", paypal: "PayPal", other: "Altro" },
  placeDate: "Luogo e data",
  signature: "Firma del prestatore",
  page: "Pagina",
};

const en: PdfStrings = {
  intl: "en-IE",
  fileName: "receipt",
  title: "Receipt for occasional self-employed work",
  number: "Receipt no.",
  date: "Date",
  provider: "Provider",
  client: "Client",
  taxCode: "Tax code",
  clientTaxCode: "Tax code/VAT no.",
  declaration:
    "I, the undersigned {provider}, tax code {taxCode}, declare that I performed the following occasional self-employed work for {client}, without subordination and without habituality, continuity or coordination (art. 2222 Italian Civil Code; art. 67(1)(l) Presidential Decree 917/1986), and that I receive the related compensation as detailed below.",
  declarationNoTaxCode:
    "I, the undersigned {provider}, declare that I performed the following occasional self-employed work for {client}, without subordination and without habituality, continuity or coordination (art. 2222 Italian Civil Code; art. 67(1)(l) Presidential Decree 917/1986), and that I receive the related compensation as detailed below.",
  description: "Description",
  amount: "Amount",
  gross: "Gross compensation",
  withholdingAcconto: "Withholding tax {rate} (art. 25 Presidential Decree 600/1973)",
  withholdingImposta: "Final withholding tax {rate} (art. 25(2) Presidential Decree 600/1973)",
  inpsWorker: "INPS Gestione Separata contribution, provider's share (1/3)",
  stampCharged: "Stamp duty reimbursement",
  net: "Net amount payable",
  notes: "Notes",
  vatNote: "Outside the scope of VAT under art. 5 of Presidential Decree 633/1972 (no habitual activity).",
  noWithholdingPrivate: "No withholding tax: the client is not a withholding agent (sostituto d'imposta).",
  noWithholdingForeign: "No withholding tax: non-resident client without a permanent establishment in Italy.",
  noWithholdingTreaty:
    "No withholding applied under the double tax treaty between Italy and the provider's country of residence.",
  inpsBelow:
    "The provider declares that, in the current calendar year, compensation received for occasional self-employed work, including this receipt, does not exceed €5,000.00, so no INPS Gestione Separata contributions are due (art. 44(2) Decree-Law 269/2003).",
  inpsAbove:
    "The provider declares that, in the current calendar year, compensation received for occasional self-employed work has exceeded €5,000.00 (total including this receipt: {yearTotal}). INPS Gestione Separata contributions at {rate} are due on the excess of {base} (art. 44(2) Decree-Law 269/2003): 1/3 paid by the provider ({worker}) and 2/3 by the client ({client}).",
  stampPaid: "€2.00 stamp duty paid on the original.",
  stampPaidCharged: "€2.00 stamp duty paid on the original and charged to the client.",
  stampSerial: "Revenue stamp serial no.: {id}",
  payment: "Payment method",
  paymentMethods: { bank: "Bank transfer", cash: "Cash", paypal: "PayPal", other: "Other" },
  placeDate: "Place and date",
  signature: "Provider's signature",
  page: "Page",
};

const es: PdfStrings = {
  intl: "es-ES",
  fileName: "recibo",
  title: "Recibo por prestación de trabajo autónomo ocasional",
  number: "Recibo n.º",
  date: "Fecha",
  provider: "Prestador",
  client: "Cliente",
  taxCode: "C.F.",
  clientTaxCode: "C.F./NIF-IVA",
  declaration:
    "El/La abajo firmante {provider}, código fiscal {taxCode}, declara haber realizado para {client} la siguiente prestación de trabajo autónomo ocasional, sin vínculo de subordinación y sin habitualidad, continuidad ni coordinación (art. 2222 del Código Civil italiano; art. 67, apdo. 1, letra l), D.P.R. 917/1986), y recibir la remuneración correspondiente según se detalla a continuación.",
  declarationNoTaxCode:
    "El/La abajo firmante {provider} declara haber realizado para {client} la siguiente prestación de trabajo autónomo ocasional, sin vínculo de subordinación y sin habitualidad, continuidad ni coordinación (art. 2222 del Código Civil italiano; art. 67, apdo. 1, letra l), D.P.R. 917/1986), y recibir la remuneración correspondiente según se detalla a continuación.",
  description: "Descripción",
  amount: "Importe",
  gross: "Remuneración bruta",
  withholdingAcconto: "Retención a cuenta {rate} (art. 25 D.P.R. 600/1973)",
  withholdingImposta: "Retención a título de impuesto {rate} (art. 25, apdo. 2, D.P.R. 600/1973)",
  inpsWorker: "Cotización INPS Gestione Separata a cargo del prestador (1/3)",
  stampCharged: "Reembolso del impuesto de timbre",
  net: "Importe neto a pagar",
  notes: "Notas",
  vatNote:
    "Operación excluida del ámbito de aplicación del IVA según el art. 5 del D.P.R. 633/1972, por falta de habitualidad.",
  noWithholdingPrivate:
    "Remuneración no sujeta a retención: el cliente no actúa como agente de retención (sostituto d'imposta).",
  noWithholdingForeign:
    "Remuneración no sujeta a retención: cliente no residente sin establecimiento permanente en Italia.",
  noWithholdingTreaty:
    "Retención no aplicada en virtud del convenio para evitar la doble imposición entre Italia y el país de residencia del prestador.",
  inpsBelow:
    "El prestador declara que, en el año natural en curso, las remuneraciones percibidas por trabajo autónomo ocasional, incluida la presente, no superan 5.000,00 € y que, por tanto, no existe obligación de cotizar a la Gestione Separata del INPS (art. 44, apdo. 2, D.L. 269/2003).",
  inpsAbove:
    "El prestador declara que, en el año natural en curso, las remuneraciones percibidas por trabajo autónomo ocasional han superado 5.000,00 € (total, incluida la presente: {yearTotal}). Sobre el exceso de {base} se debe la cotización a la Gestione Separata del INPS del {rate} (art. 44, apdo. 2, D.L. 269/2003): 1/3 a cargo del prestador ({worker}) y 2/3 a cargo del cliente ({client}).",
  stampPaid: "Impuesto de timbre de 2,00 € abonado en el original.",
  stampPaidCharged: "Impuesto de timbre de 2,00 € abonado en el original y repercutido al cliente.",
  stampSerial: "N.º de la marca da bollo: {id}",
  payment: "Forma de pago",
  paymentMethods: { bank: "Transferencia bancaria", cash: "Efectivo", paypal: "PayPal", other: "Otro" },
  placeDate: "Lugar y fecha",
  signature: "Firma del prestador",
  page: "Página",
};

const fr: PdfStrings = {
  intl: "fr-FR",
  fileName: "recu",
  title: "Reçu pour prestation de travail indépendant occasionnel",
  number: "Reçu n°",
  date: "Date",
  provider: "Prestataire",
  client: "Client",
  taxCode: "C.F.",
  clientTaxCode: "C.F./N° TVA",
  declaration:
    "Je soussigné(e) {provider}, code fiscal {taxCode}, déclare avoir effectué pour {client} la prestation de travail indépendant occasionnel suivante, sans lien de subordination et sans caractère habituel, continu ni coordonné (art. 2222 du Code civil italien ; art. 67, al. 1, let. l), D.P.R. 917/1986), et recevoir la rémunération correspondante détaillée ci-dessous.",
  declarationNoTaxCode:
    "Je soussigné(e) {provider} déclare avoir effectué pour {client} la prestation de travail indépendant occasionnel suivante, sans lien de subordination et sans caractère habituel, continu ni coordonné (art. 2222 du Code civil italien ; art. 67, al. 1, let. l), D.P.R. 917/1986), et recevoir la rémunération correspondante détaillée ci-dessous.",
  description: "Description",
  amount: "Montant",
  gross: "Rémunération brute",
  withholdingAcconto: "Retenue à la source (acompte) {rate} (art. 25 D.P.R. 600/1973)",
  withholdingImposta: "Retenue à la source libératoire {rate} (art. 25, al. 2, D.P.R. 600/1973)",
  inpsWorker: "Cotisation INPS Gestione Separata à la charge du prestataire (1/3)",
  stampCharged: "Remboursement du droit de timbre",
  net: "Montant net à payer",
  notes: "Notes",
  vatNote:
    "Opération hors du champ d'application de la TVA conformément à l'art. 5 du D.P.R. 633/1972 (absence de caractère habituel).",
  noWithholdingPrivate:
    "Rémunération non soumise à retenue : le client n'a pas la qualité d'agent de retenue (sostituto d'imposta).",
  noWithholdingForeign:
    "Rémunération non soumise à retenue : client non résident sans établissement stable en Italie.",
  noWithholdingTreaty:
    "Retenue non appliquée en vertu de la convention fiscale entre l'Italie et le pays de résidence du prestataire.",
  inpsBelow:
    "Le prestataire déclare que, pour l'année civile en cours, les rémunérations perçues au titre de prestations occasionnelles, y compris la présente, ne dépassent pas 5 000,00 € et qu'aucune cotisation à la Gestione Separata de l'INPS n'est donc due (art. 44, al. 2, D.L. 269/2003).",
  inpsAbove:
    "Le prestataire déclare que, pour l'année civile en cours, les rémunérations perçues au titre de prestations occasionnelles ont dépassé 5 000,00 € (total, y compris la présente : {yearTotal}). Sur la part excédentaire de {base}, la cotisation à la Gestione Separata de l'INPS est due au taux de {rate} (art. 44, al. 2, D.L. 269/2003) : 1/3 à la charge du prestataire ({worker}) et 2/3 à la charge du client ({client}).",
  stampPaid: "Droit de timbre de 2,00 € acquitté sur l'original.",
  stampPaidCharged: "Droit de timbre de 2,00 € acquitté sur l'original et refacturé au client.",
  stampSerial: "N° de la marca da bollo : {id}",
  payment: "Mode de paiement",
  paymentMethods: { bank: "Virement bancaire", cash: "Espèces", paypal: "PayPal", other: "Autre" },
  placeDate: "Lieu et date",
  signature: "Signature du prestataire",
  page: "Page",
};

const de: PdfStrings = {
  intl: "de-DE",
  fileName: "quittung",
  title: "Quittung für gelegentliche selbstständige Tätigkeit",
  number: "Quittung Nr.",
  date: "Datum",
  provider: "Leistungserbringer",
  client: "Auftraggeber",
  taxCode: "C.F.",
  clientTaxCode: "C.F./USt-IdNr.",
  declaration:
    "Der/Die Unterzeichnende {provider}, Steuernummer (Codice fiscale) {taxCode}, erklärt, für {client} die folgende gelegentliche selbstständige Tätigkeit ohne Weisungsgebundenheit sowie ohne Regelmäßigkeit, Kontinuität und Koordinierung erbracht zu haben (Art. 2222 ital. Zivilgesetzbuch; Art. 67 Abs. 1 Buchst. l D.P.R. 917/1986), und die entsprechende Vergütung wie nachstehend aufgeführt zu erhalten.",
  declarationNoTaxCode:
    "Der/Die Unterzeichnende {provider} erklärt, für {client} die folgende gelegentliche selbstständige Tätigkeit ohne Weisungsgebundenheit sowie ohne Regelmäßigkeit, Kontinuität und Koordinierung erbracht zu haben (Art. 2222 ital. Zivilgesetzbuch; Art. 67 Abs. 1 Buchst. l D.P.R. 917/1986), und die entsprechende Vergütung wie nachstehend aufgeführt zu erhalten.",
  description: "Beschreibung",
  amount: "Betrag",
  gross: "Bruttovergütung",
  withholdingAcconto: "Quellensteuer (Vorauszahlung) {rate} (Art. 25 D.P.R. 600/1973)",
  withholdingImposta: "Abgeltende Quellensteuer {rate} (Art. 25 Abs. 2 D.P.R. 600/1973)",
  inpsWorker: "INPS-Beitrag Gestione Separata zulasten des Leistungserbringers (1/3)",
  stampCharged: "Erstattung der Stempelsteuer",
  net: "Auszuzahlender Nettobetrag",
  notes: "Hinweise",
  vatNote:
    "Umsatz außerhalb des Anwendungsbereichs der Mehrwertsteuer gemäß Art. 5 D.P.R. 633/1972 (mangels Regelmäßigkeit der Tätigkeit).",
  noWithholdingPrivate:
    "Kein Quellensteuerabzug: Der Auftraggeber ist kein Steuerabzugsverpflichteter (sostituto d'imposta).",
  noWithholdingForeign:
    "Kein Quellensteuerabzug: im Ausland ansässiger Auftraggeber ohne Betriebsstätte in Italien.",
  noWithholdingTreaty:
    "Kein Quellensteuerabzug aufgrund des Doppelbesteuerungsabkommens zwischen Italien und dem Ansässigkeitsstaat des Leistungserbringers.",
  inpsBelow:
    "Der Leistungserbringer erklärt, dass seine Vergütungen aus gelegentlicher selbstständiger Tätigkeit im laufenden Kalenderjahr einschließlich dieser Quittung 5.000,00 € nicht übersteigen und daher keine Beitragspflicht zur INPS Gestione Separata besteht (Art. 44 Abs. 2 D.L. 269/2003).",
  inpsAbove:
    "Der Leistungserbringer erklärt, dass seine Vergütungen aus gelegentlicher selbstständiger Tätigkeit im laufenden Kalenderjahr 5.000,00 € überschritten haben (Gesamtbetrag einschließlich dieser Quittung: {yearTotal}). Auf den übersteigenden Betrag von {base} ist der Beitrag zur INPS Gestione Separata in Höhe von {rate} geschuldet (Art. 44 Abs. 2 D.L. 269/2003): 1/3 zulasten des Leistungserbringers ({worker}) und 2/3 zulasten des Auftraggebers ({client}).",
  stampPaid: "Stempelsteuer von 2,00 € auf dem Original entrichtet.",
  stampPaidCharged: "Stempelsteuer von 2,00 € auf dem Original entrichtet und dem Auftraggeber in Rechnung gestellt.",
  stampSerial: "Nummer der Marca da bollo: {id}",
  payment: "Zahlungsweise",
  paymentMethods: { bank: "Banküberweisung", cash: "Bar", paypal: "PayPal", other: "Sonstiges" },
  placeDate: "Ort und Datum",
  signature: "Unterschrift des Leistungserbringers",
  page: "Seite",
};

export const pdfStrings: Record<PdfSingleLanguage, PdfStrings> = { it, en, es, fr, de };
