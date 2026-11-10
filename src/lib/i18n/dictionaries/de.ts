import type { Dictionary } from "./en";

const de: Dictionary = {
  meta: {
    homeTitle: "Quittung für Prestazione occasionale: Gratis-PDF | ItalyReceipt",
    homeDescription:
      "Quittung für Prestazione occasionale in Minuten erstellen: 20 % Quellensteuer, INPS über 5.000 €, 2 € Stempelsteuer, zweisprachiges PDF. Kostenlos und privat.",
    guidesTitle: "Ratgeber: In Italien arbeiten ohne Partita IVA",
    guidesDescription:
      "Verständliche, aktuelle Ratgeber zur Prestazione occasionale: Quittungen, Quellensteuer, die INPS-Schwelle von 5.000 €, Stempelsteuer und Regeln für Ausländer.",
    notFoundTitle: "Seite nicht gefunden",
    ogAlt: "ItalyReceipt – Quittungen für Gelegenheitsarbeit in Italien, aber richtig",
  },
  common: {
    skipToContent: "Zum Inhalt springen",
    language: "Sprache",
    openMenu: "Menü öffnen",
    close: "Schließen",
    home: "Startseite",
    menu: "Menü",
    mainNav: "Hauptnavigation",
    breadcrumb: "Brotkrümelnavigation",
  },
  nav: {
    generator: "Generator",
    guides: "Ratgeber",
    faq: "FAQ",
    privacy: "Datenschutz & Cookies",
    cookieSettings: "Cookie-Einstellungen",
    support: "Kaffee spendieren",
    cta: "Quittung erstellen",
  },
  hero: {
    badge: "Aktualisiert für 2026",
    title: "Quittungen für Gelegenheitsarbeit in Italien – *aber richtig*",
    subtitle:
      "Erstelle in wenigen Minuten eine unterschriftsreife *ricevuta per prestazione occasionale*. Quellensteuer, INPS und Stempelsteuer werden für dich berechnet – kostenlos, ohne Anmeldung, und deine Daten verlassen nie deinen Browser.",
    cta: "Jetzt Quittung erstellen",
    secondaryCta: "Zu den Ratgebern",
    trust: ["100 % kostenlos", "Ohne Anmeldung", "Daten bleiben auf deinem Gerät", "Zweisprachiges PDF"],
  },
  generator: {
    title: "Quittungsgenerator",
    subtitle: "Füll die Angaben aus – die Steuern werden direkt beim Tippen berechnet.",
    privacyNote:
      "Alles bleibt in diesem Browser. Deine Angaben werden lokal gespeichert, damit du sie nicht noch einmal eingeben musst.",
    clearData: "Gespeicherte Daten löschen",
    clearConfirmTitle: "Gespeicherte Daten löschen?",
    clearConfirmText:
      "Damit werden alle in diesem Browser gespeicherten Angaben entfernt (deine Daten, Auftraggeber, Beträge und Zahlungsdaten).",
    clearConfirmButton: "Alles löschen",
    cancel: "Abbrechen",
    cleared: "Gespeicherte Daten gelöscht",
    newReceipt: "Neue Quittung",
    newReceiptDone: "Bereit für eine neue Quittung: Deine Angaben bleiben erhalten, die Nummer wurde hochgezählt.",
    optional: "optional",
    sections: {
      provider: {
        title: "Deine Daten",
        description: "Die Person, die die Leistung erbracht hat und die Quittung ausstellt.",
      },
      client: { title: "Dein Auftraggeber", description: "Wer dich bezahlt." },
      work: {
        title: "Leistung und Beträge",
        description: "Beschreibe die Leistung und gib für jede Zeile den Bruttobetrag an.",
      },
      taxes: {
        title: "Steuern und Beiträge",
        description:
          "Werden automatisch je nach Art des Auftraggebers angewendet. Passe nur an, was auf dich zutrifft.",
      },
      payment: { title: "Zahlung und Hinweise", description: "Wie dich dein Auftraggeber bezahlen soll." },
    },
    fields: {
      fullName: "Vor- und Nachname",
      fullNamePlaceholder: "Mario Rossi",
      taxCode: "Codice fiscale",
      taxCodePlaceholder: "RSSMRA80A01H501U",
      taxCodeHelp:
        "Deine 16-stellige italienische Steuernummer. Ausländer können sie bei der Agenzia delle Entrate beantragen.",
      address: "Adresse",
      addressPlaceholder: "Via Roma 1\n20121 Milano (MI)",
      nonResident: "Ich bin nicht in Italien steuerlich ansässig",
      nonResidentHelp:
        "Italienische Unternehmen behalten bei Nichtansässigen 30 % als abgeltende Quellensteuer ein, sofern kein Doppelbesteuerungsabkommen greift.",
      clientType: "Art des Auftraggebers",
      clientTypes: {
        "it-business": {
          label: "Unternehmen in Italien",
          description: "Gesellschaft, Verein oder Freiberufler mit USt-IdNr. Behält Steuer ein.",
        },
        "it-private": {
          label: "Privatperson",
          description: "Eine Person oder ein Betrieb mit Pauschalregelung (forfettario), der nichts einbehält.",
        },
        foreign: {
          label: "Auftraggeber im Ausland",
          description: "Sitz außerhalb Italiens, ohne steuerliche Präsenz in Italien.",
        },
      },
      clientName: "Name oder Firma",
      clientNamePlaceholder: "Rossi Design S.r.l.",
      clientTaxCode: "Codice fiscale oder USt-IdNr.",
      clientTaxCodeForeign: "Steuernummer oder USt-IdNr.",
      clientTaxCodePlaceholder: "IT01234567890",
      clientAddress: "Adresse",
      clientAddressPlaceholder: "Corso Italia 10\n00198 Roma (RM)",
      receiptNumber: "Quittungsnr.",
      receiptNumberPlaceholder: "1/2026",
      date: "Datum",
      place: "Ort",
      placePlaceholder: "Milano",
      itemDescription: "Beschreibung",
      itemDescriptionPlaceholder: "Logodesign für die Frühjahrskampagne",
      itemAmount: "Bruttobetrag",
      addItem: "Zeile hinzufügen",
      removeItem: "Zeile entfernen",
      priorYearGross: "Dieses Jahr bereits aus Gelegenheitsarbeit erhalten",
      priorYearGrossHelp:
        "Bruttosumme von allen Auftraggebern seit dem 1. Januar, ohne diese Quittung. Nötig für die INPS-Schwelle von 5.000 €.",
      inpsReduced: "Ich bin in Rente oder schon anderweitig pflichtversichert",
      inpsReducedHelp: "INPS-Satz 24 % statt 33,72 % (z. B. wenn du auch angestellt bist).",
      stampCharged: "2 € Stempelsteuer dem Auftraggeber berechnen",
      stampChargedHelp: "Der Betrag kommt zur Summe hinzu und unterliegt nicht der Quellensteuer.",
      stampId: "Nummer der Stempelmarke",
      stampIdPlaceholder: "14 Ziffern auf der Marca da bollo",
      customRate: "Eigener Quellensteuersatz (%)",
      customRatePlaceholder: "Automatisch",
      customRateHelp:
        "Nur wenn für dich ein anderer Satz gilt (z. B. 0 % nach einem Doppelbesteuerungsabkommen für Nichtansässige). Leer lassen für den automatischen Satz.",
      paymentMethod: "Zahlungsart",
      paymentMethods: { bank: "Banküberweisung", cash: "Barzahlung", paypal: "PayPal", other: "Sonstiges" },
      paymentDetails: "Zahlungsdaten",
      paymentDetailsPlaceholders: {
        bank: "IBAN IT60 X054 2811 1010 0000 0123 456",
        cash: "",
        paypal: "name@example.com",
        other: "z. B. Satispay, Scheck…",
      },
      notes: "Hinweise",
      notesPlaceholder: "Alles, was sonst noch auf der Quittung stehen soll",
      pdfLanguage: "PDF-Sprache",
    },
    advanced: "Erweiterte Optionen",
    summary: {
      title: "Übersicht",
      gross: "Bruttobetrag",
      withholding: "Quellensteuer {rate}",
      withholdingFinal: "Abgeltende Quellensteuer {rate}",
      noWithholding: "Quellensteuer",
      none: "keine",
      inpsWorker: "INPS, dein Anteil (1/3)",
      stamp: "Weiterberechnete Stempelsteuer",
      net: "Du erhältst",
      clientCost: "Gesamtkosten für den Auftraggeber",
      clientInps: "inkl. {amount} INPS-Anteil des Auftraggebers",
      reasons: {
        "business-resident":
          "Dein Auftraggeber behält 20 % Quellensteuer ein (Ritenuta d'acconto) und führt sie für dich an den Staat ab.",
        "business-non-resident":
          "Da du nicht in Italien ansässig bist, werden 30 % als abgeltende Quellensteuer einbehalten, sofern kein Doppelbesteuerungsabkommen greift.",
        "private-client":
          "Privatpersonen behalten keine Steuer ein: Du erhältst den vollen Betrag und gibst ihn in deiner Steuererklärung an.",
        "foreign-client":
          "Ausländische Auftraggeber behalten keine italienische Steuer ein: Bist du in Italien ansässig, gib die Einkünfte in deiner Steuererklärung an.",
        "custom-rate": "Es gilt der eigene Quellensteuersatz aus den erweiterten Optionen.",
      },
      inpsBelow: "Noch {amount} bis zur INPS-Schwelle von 5.000 € in diesem Jahr.",
      inpsAbove:
        "Über 5.000 € in diesem Jahr: INPS {rate} auf {base}. Melde dich bei der INPS Gestione Separata an und informiere deinen Auftraggeber.",
      inpsAboveOtherClient:
        "Über 5.000 € in diesem Jahr: Es können INPS-Beiträge anfallen. Frag bei einem CAF oder Commercialista nach.",
      stampRequired: "2 € Stempelsteuer fällig: Klebe eine Marca da bollo auf das Original.",
      stampNotRequired: "Keine Stempelsteuer nötig (bis 77,47 €).",
    },
    reverse: {
      trigger: "Vom Nettobetrag ausgehen",
      title: "Vom Netto zurückrechnen",
      description:
        "Gib den Betrag ein, den du erhalten möchtest, und wir berechnen den Bruttobetrag für die Quittung.",
      target: "Gewünschter Nettobetrag",
      result: "Brutto für die Quittung",
      inexact: "Nächstmöglicher Wert: {net} netto.",
      apply: "Betrag übernehmen",
      applied: "Bruttobetrag aktualisiert",
    },
    actions: {
      download: "PDF herunterladen",
      preview: "Vorschau",
      generating: "Wird erstellt…",
    },
    validation: {
      title: "Ein paar Angaben fehlen noch",
      providerName: "Gib deinen vollständigen Namen ein",
      clientName: "Gib den Namen des Auftraggebers ein",
      items: "Füge mindestens eine Zeile mit gültigem Betrag hinzu",
      amount: "Gib einen gültigen Betrag ein, z. B. 1250,00",
      percent: "Gib einen Prozentsatz zwischen 0 und 100 ein",
      description: "Beschreibe die erbrachte Leistung",
    },
    toasts: {
      ready: "Dein PDF ist fertig",
      error: "Das PDF konnte nicht erstellt werden. Bitte versuch es noch einmal.",
      popupBlocked: "Dein Browser hat die Vorschau blockiert. Erlaube Pop-ups oder lade das PDF direkt herunter.",
    },
    mobileBar: { net: "Du erhältst", cta: "PDF laden" },
  },
  pdfLanguages: {
    it: "Italienisch",
    en: "Englisch",
    es: "Spanisch",
    fr: "Französisch",
    de: "Deutsch",
    "it+en": "Italienisch + Englisch",
    "it+es": "Italienisch + Spanisch",
    "it+fr": "Italienisch + Französisch",
    "it+de": "Italienisch + Deutsch",
  },
  support: {
    title: "Hat dir ItalyReceipt Zeit gespart?",
    text: "Es ist kostenlos und werbefinanziert. Wenn es dir geholfen hat, kannst du mir einen Kaffee spendieren.",
    button: "Kaffee spendieren",
  },
  howItWorks: {
    title: "So funktioniert's",
    subtitle: "Vom leeren Blatt zur unterschriebenen Quittung in drei Schritten.",
    steps: [
      {
        title: "Angaben ausfüllen",
        text: "Du, dein Auftraggeber und die Leistung. Alles wird nur in deinem Browser gespeichert.",
      },
      {
        title: "Zahlen prüfen",
        text: "Quellensteuer, INPS über 5.000 € und Stempelsteuer werden live nach den Regeln für 2026 berechnet.",
      },
      {
        title: "PDF herunterladen",
        text: "Bereit zum Unterschreiben und Versenden, auf Italienisch oder zweisprachig, mit allen Pflichtangaben.",
      },
    ],
  },
  personas: {
    title: "Gemacht für",
    subtitle: "Alle, die in Italien ohne USt-IdNr. für gelegentliche Arbeit bezahlt werden.",
    items: [
      {
        title: "Freelancer und Kreative",
        text: "Designer, Übersetzer, Fotografen und Entwickler, die einen gelegentlichen Auftrag annehmen.",
      },
      {
        title: "Studierende und Nebenjobs",
        text: "Nachhilfe, Events, Messejobs, kleine Aufträge: Werde vom ersten Job an korrekt bezahlt.",
      },
      {
        title: "Expats und Nichtansässige",
        text: "Zweisprachige PDFs und klare Regeln für Ausländer und Auftraggeber im Ausland.",
      },
      {
        title: "Unternehmen und Vereine",
        text: "Du beauftragst eine Gelegenheitskraft? Schick sie hierher – für eine Quittung mit der richtigen Quellensteuer.",
      },
    ],
  },
  guidesSection: {
    title: "Ratgeber",
    subtitle: "Verständliche Antworten auf die Fragen, die sich alle stellen.",
    readGuide: "Ratgeber lesen",
    allGuides: "Alle Ratgeber",
  },
  faq: {
    title: "Häufige Fragen",
    items: [
      {
        q: "Was ist eine Quittung für Prestazione occasionale?",
        a: "Das ist der Beleg, den du ausstellst, wenn du in Italien ohne Partita IVA (italienische USt-IdNr.) für eine gelegentliche selbstständige Tätigkeit bezahlt wirst. Darauf steht, wer die Leistung für wen erbracht hat, der Bruttobetrag, eine eventuelle Quellensteuer und der auszuzahlende Nettobetrag.",
      },
      {
        q: "Gibt es eine 5.000-Euro-Grenze für Gelegenheitsarbeit?",
        a: "Nicht als Einkommensobergrenze. 5.000 € sind die INPS-Schwelle: Darüber fallen im selben Kalenderjahr, über alle Auftraggeber zusammengerechnet, Sozialversicherungsbeiträge auf den übersteigenden Betrag an. Ob eine Tätigkeit gelegentlich ist, hängt von ihrer Art ab (nicht regelmäßig, nicht dauerhaft), nicht vom Betrag.",
      },
      {
        q: "Wie viel Steuer wird einbehalten?",
        a: "20 % (Ritenuta d'acconto), wenn dein Auftraggeber ein italienisches Unternehmen, ein Verein oder ein Freiberufler ist. Kein Einbehalt, wenn er eine Privatperson oder ein ausländisches Unternehmen ist. Nichtansässigen, die von einem italienischen Unternehmen bezahlt werden, werden 30 % als abgeltende Quellensteuer einbehalten, sofern kein Doppelbesteuerungsabkommen greift.",
      },
      {
        q: "Wann brauche ich die Stempelmarke zu 2 €?",
        a: "Wenn die Quittung über 77,47 € liegt. Klebe eine Marca da bollo zu 2 € auf das Original (ihre Seriennummer kannst du auf der Quittung angeben). Die 2 € kannst du dem Auftraggeber berechnen.",
      },
      {
        q: "Brauche ich eine Partita IVA (USt-IdNr.)?",
        a: "Nicht für gelegentliche Arbeit. Du brauchst sie, sobald die Tätigkeit regelmäßig, dauerhaft oder organisiert wird – egal, wie viel du verdienst.",
      },
      {
        q: "Können Ausländer ItalyReceipt nutzen?",
        a: "Ja. Du brauchst einen italienischen Codice fiscale. Der Generator berücksichtigt Nichtansässige und ausländische Auftraggeber und erstellt zweisprachige PDFs (Italienisch + Englisch, Spanisch, Französisch oder Deutsch).",
      },
      {
        q: "Sind meine Daten sicher?",
        a: "Deine Daten verlassen nie dein Gerät: Das PDF wird in deinem Browser erstellt, und die Angaben werden nur in dessen lokalem Speicher abgelegt. Du kannst sie jederzeit über „Gespeicherte Daten löschen“ entfernen.",
      },
      {
        q: "Muss ich die Quittung unterschreiben?",
        a: "Ja. Druck sie aus und unterschreib sie oder unterschreib das PDF digital und schick es dann an deinen Auftraggeber. Bewahre eine Kopie mindestens fünf Jahre auf.",
      },
    ],
  },
  guidePage: {
    updated: "Aktualisiert",
    minRead: "{min} Min. Lesezeit",
    related: "Weiterlesen",
    onThisPage: "Auf dieser Seite",
    endCtaTitle: "Bereit für deine Quittung?",
    endCtaText: "Quellensteuer, INPS und Stempelsteuer werden für dich berechnet. Kostenlos, privat, zweisprachiges PDF.",
    endCtaButton: "Zum Generator",
    inlineCtaTitle: "Spar dir die Rechnerei",
    inlineCtaText: "Unser kostenloser Generator wendet diese Regeln für dich an und erstellt ein unterschriftsreifes PDF.",
    inlineCtaButton: "Meine Quittung erstellen",
    callouts: { info: "Gut zu wissen", tip: "Tipp", warning: "Achtung", example: "Beispiel" },
  },
  guidesIndex: {
    title: "Ratgeber: In Italien arbeiten ohne Partita IVA",
    subtitle: "Alles zur Prestazione occasionale – einfach erklärt und immer aktuell.",
  },
  consent: {
    title: "Cookies nur mit deiner Zustimmung",
    text: "Wir würden gern Cookies für Statistik (Google Analytics) und Werbung (Google AdSense) verwenden, die ItalyReceipt kostenlos halten. Der Generator funktioniert auch ohne sie, und du kannst deine Auswahl jederzeit unter „Cookie-Einstellungen“ ändern.",
    accept: "Alle akzeptieren",
    reject: "Alle ablehnen",
    customize: "Anpassen",
    save: "Auswahl speichern",
    settingsTitle: "Cookie-Einstellungen",
    alwaysOn: "Immer aktiv",
    categories: {
      necessary: {
        title: "Unbedingt erforderlich",
        text: "Merken sich deine Cookie-Auswahl und deine Eingaben im Generator, gespeichert nur in deinem Browser.",
      },
      analytics: {
        title: "Statistik",
        text: "Google Analytics zeigt uns, welche Seiten hilfreich sind. Deine Eingaben im Generator werden dabei nie übertragen.",
      },
      ads: {
        title: "Werbung",
        text: "Google AdSense zeigt Werbung, die die Seite kostenlos hält. Mit deiner Einwilligung kann sie personalisiert sein.",
      },
    },
    privacyLink: "Zur Datenschutzerklärung",
  },
  footer: {
    tagline: "Kostenlose Quittungen für Gelegenheitsarbeit in Italien.",
    disclaimer:
      "ItalyReceipt bietet allgemeine Informationen und einen Dokumentengenerator. Das ist keine Steuer- oder Rechtsberatung: Lass deine Situation von einem Commercialista oder CAF prüfen.",
    product: "Produkt",
    resources: "Ratgeber",
    legal: "Rechtliches",
    rulesReviewed: "Steuerregeln geprüft am {date}",
    rights: "© {year} ItalyReceipt",
  },
  notFound: {
    title: "Seite nicht gefunden",
    text: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    back: "Zurück zum Generator",
  },
};

export default de;
