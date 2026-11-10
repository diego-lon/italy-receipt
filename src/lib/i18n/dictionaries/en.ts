const en = {
  meta: {
    homeTitle: "Prestazione Occasionale Receipt Generator — Free PDF | ItalyReceipt",
    homeDescription:
      "Create an Italian occasional work receipt (prestazione occasionale) in minutes: 20% withholding, INPS above €5,000, €2 stamp duty, bilingual PDF. Free and private.",
    guidesTitle: "Guides to Working in Italy Without a VAT Number",
    guidesDescription:
      "Clear, up-to-date guides on prestazione occasionale: receipts, withholding tax, the €5,000 INPS threshold, stamp duty and rules for foreigners.",
    notFoundTitle: "Page not found",
    ogAlt: "ItalyReceipt — Italian occasional work receipts, done right",
  },
  common: {
    skipToContent: "Skip to content",
    language: "Language",
    openMenu: "Open menu",
    close: "Close",
    home: "Home",
    menu: "Menu",
    mainNav: "Main navigation",
    breadcrumb: "Breadcrumb",
  },
  nav: {
    generator: "Generator",
    guides: "Guides",
    faq: "FAQ",
    privacy: "Privacy & cookies",
    cookieSettings: "Cookie settings",
    support: "Buy me a coffee",
    cta: "Create receipt",
  },
  hero: {
    badge: "Updated for 2026 rules",
    title: "Italian occasional work receipts, *done right*",
    subtitle:
      "Create a ready-to-sign *ricevuta per prestazione occasionale* in minutes. Withholding tax, INPS and stamp duty are calculated for you — free, no sign-up, and your data never leaves your browser.",
    cta: "Create your receipt",
    secondaryCta: "Read the guides",
    trust: ["100% free", "No sign-up", "Data stays on your device", "Bilingual PDF"],
  },
  generator: {
    title: "Receipt generator",
    subtitle: "Fill in the details: taxes are calculated as you type.",
    privacyNote:
      "Everything stays in this browser. Your details are saved locally so you don't have to type them again.",
    clearData: "Clear saved data",
    clearConfirmTitle: "Delete saved data?",
    clearConfirmText:
      "This removes all the details saved in this browser (you, your client, amounts and payment details).",
    clearConfirmButton: "Delete everything",
    cancel: "Cancel",
    cleared: "Saved data deleted",
    newReceipt: "New receipt",
    newReceiptDone: "Ready for a new receipt: your details were kept and the number was increased.",
    optional: "optional",
    sections: {
      provider: { title: "You", description: "The person who did the work and issues the receipt." },
      client: { title: "Your client", description: "Who pays you." },
      work: { title: "Work and amounts", description: "Describe the work and the gross amount for each line." },
      taxes: {
        title: "Taxes and contributions",
        description: "Applied automatically from the client type. Adjust only what applies to you.",
      },
      payment: { title: "Payment and notes", description: "How the client should pay you." },
    },
    fields: {
      fullName: "Full name",
      fullNamePlaceholder: "Mario Rossi",
      taxCode: "Codice fiscale",
      taxCodePlaceholder: "RSSMRA80A01H501U",
      taxCodeHelp: "Your 16-character Italian tax code. Foreigners can request one from the Agenzia delle Entrate.",
      address: "Address",
      addressPlaceholder: "Via Roma 1\n20121 Milano (MI)",
      nonResident: "I am not an Italian tax resident",
      nonResidentHelp: "Italian businesses withhold 30% as a final tax from non-residents, unless a tax treaty applies.",
      clientType: "Client type",
      clientTypes: {
        "it-business": {
          label: "Italian business",
          description: "Company, association or professional with a VAT number. Withholds tax.",
        },
        "it-private": {
          label: "Private individual",
          description: "A person, or a flat-rate (forfettario) business that doesn't withhold.",
        },
        foreign: {
          label: "Foreign client",
          description: "Based outside Italy, with no Italian tax presence.",
        },
      },
      clientName: "Name or company",
      clientNamePlaceholder: "Rossi Design S.r.l.",
      clientTaxCode: "Codice fiscale or VAT number",
      clientTaxCodeForeign: "Tax ID or VAT number",
      clientTaxCodePlaceholder: "IT01234567890",
      clientAddress: "Address",
      clientAddressPlaceholder: "Corso Italia 10\n00198 Roma (RM)",
      receiptNumber: "Receipt no.",
      receiptNumberPlaceholder: "1/2026",
      date: "Date",
      place: "Place",
      placePlaceholder: "Milano",
      itemDescription: "Description",
      itemDescriptionPlaceholder: "Logo design for the spring campaign",
      itemAmount: "Gross amount",
      addItem: "Add line",
      removeItem: "Remove line",
      priorYearGross: "Already received this year from occasional work",
      priorYearGrossHelp:
        "Gross total from all clients since 1 January, excluding this receipt. Needed for the €5,000 INPS threshold.",
      inpsReduced: "I'm a pensioner or already have other mandatory pension coverage",
      inpsReducedHelp: "INPS rate 24% instead of 33.72% (e.g. you are also an employee).",
      stampCharged: "Charge the €2 stamp duty to the client",
      stampChargedHelp: "The amount is added to the total and is not subject to withholding.",
      stampId: "Stamp serial number",
      stampIdPlaceholder: "14 digits printed on the marca da bollo",
      customRate: "Custom withholding rate (%)",
      customRatePlaceholder: "Automatic",
      customRateHelp:
        "Only if a different rate applies to you (e.g. 0% under a tax treaty for non-residents). Leave empty for the automatic rate.",
      paymentMethod: "Payment method",
      paymentMethods: { bank: "Bank transfer", cash: "Cash", paypal: "PayPal", other: "Other" },
      paymentDetails: "Payment details",
      paymentDetailsPlaceholders: {
        bank: "IBAN IT60 X054 2811 1010 0000 0123 456",
        cash: "",
        paypal: "name@example.com",
        other: "e.g. Satispay, cheque…",
      },
      notes: "Notes",
      notesPlaceholder: "Anything else to print on the receipt",
      pdfLanguage: "PDF language",
    },
    advanced: "Advanced options",
    summary: {
      title: "Summary",
      gross: "Gross amount",
      withholding: "Withholding tax {rate}",
      withholdingFinal: "Final withholding tax {rate}",
      noWithholding: "Withholding tax",
      none: "none",
      inpsWorker: "INPS, your share (1/3)",
      stamp: "Stamp duty charged to client",
      net: "You receive",
      clientCost: "Total cost for the client",
      clientInps: "includes {amount} INPS paid by the client",
      reasons: {
        "business-resident":
          "Your client withholds 20% (ritenuta d'acconto) and pays it to the State on your behalf.",
        "business-non-resident":
          "As a non-resident you have 30% withheld as a final tax, unless a tax treaty applies.",
        "private-client":
          "Private individuals don't withhold tax: you receive the full amount and declare it in your tax return.",
        "foreign-client":
          "Foreign clients don't apply Italian withholding: if you are an Italian resident, declare the income in your tax return.",
        "custom-rate": "Using the custom withholding rate from the advanced options.",
      },
      inpsBelow: "{amount} left before the €5,000 INPS threshold this year.",
      inpsAbove:
        "Above €5,000 this year: INPS {rate} on {base}. Register with the INPS Gestione Separata and tell your client.",
      inpsAboveOtherClient:
        "Above €5,000 this year: INPS contributions may apply. Check with a CAF or commercialista.",
      stampRequired: "€2 stamp duty required: put a marca da bollo on the original.",
      stampNotRequired: "No stamp duty needed (up to €77.47).",
    },
    reverse: {
      trigger: "Start from the net amount",
      title: "Work backwards from the net",
      description: "Enter the amount you want to receive and we'll calculate the gross to put on the receipt.",
      target: "Net amount you want",
      result: "Gross to invoice",
      inexact: "Closest possible: {net} net.",
      apply: "Use this amount",
      applied: "Gross amount updated",
    },
    actions: {
      download: "Download PDF",
      preview: "Preview",
      generating: "Generating…",
    },
    validation: {
      title: "A few details are missing",
      providerName: "Enter your full name",
      clientName: "Enter the client's name",
      items: "Add at least one line with a valid amount",
      amount: "Enter a valid amount, e.g. 1250,00",
      percent: "Enter a percentage between 0 and 100",
      description: "Describe the work done",
    },
    toasts: {
      ready: "Your PDF is ready",
      error: "Couldn't generate the PDF. Please try again.",
      popupBlocked: "Your browser blocked the preview. Allow pop-ups or use Download.",
    },
    mobileBar: { net: "You receive", cta: "Get PDF" },
  },
  pdfLanguages: {
    it: "Italian",
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    "it+en": "Italian + English",
    "it+es": "Italian + Spanish",
    "it+fr": "Italian + French",
    "it+de": "Italian + German",
  },
  support: {
    title: "Did ItalyReceipt save you time?",
    text: "It's free and ad-supported. If it helped, you can buy me a coffee.",
    button: "Buy me a coffee",
  },
  howItWorks: {
    title: "How it works",
    subtitle: "From blank page to signed receipt in three steps.",
    steps: [
      {
        title: "Fill in the details",
        text: "You, your client and the work. Everything is saved only in your browser.",
      },
      {
        title: "Check the numbers",
        text: "Withholding tax, INPS above €5,000 and stamp duty are calculated live with the 2026 rules.",
      },
      {
        title: "Download the PDF",
        text: "Ready to sign and send, in Italian or bilingual, with all the mandatory wording.",
      },
    ],
  },
  personas: {
    title: "Made for",
    subtitle: "Anyone paid for occasional work in Italy without a VAT number.",
    items: [
      {
        title: "Freelancers and creatives",
        text: "Designers, translators, photographers and developers taking on an occasional job.",
      },
      {
        title: "Students and side gigs",
        text: "Tutoring, events, hosting, small jobs: get paid correctly from your first gig.",
      },
      {
        title: "Expats and non-residents",
        text: "Bilingual PDFs and clear rules for foreign workers and foreign clients.",
      },
      {
        title: "Businesses and associations",
        text: "Hiring an occasional worker? Send them here for a receipt with the right withholding.",
      },
    ],
  },
  guidesSection: {
    title: "Guides",
    subtitle: "Plain-language answers to the questions everybody asks.",
    readGuide: "Read guide",
    allGuides: "All guides",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "What is a prestazione occasionale receipt?",
        a: "It's the document you issue when you're paid for occasional self-employed work in Italy without a VAT number (Partita IVA). It states who did the work, for whom, the gross amount, any withholding tax and the net amount to be paid.",
      },
      {
        q: "Is there a €5,000 limit for occasional work?",
        a: "Not as an income cap. €5,000 is the INPS threshold: above it, in the same calendar year and across all clients, social security contributions are due on the excess. What makes work occasional is its nature (not habitual, not continuous), not the amount.",
      },
      {
        q: "How much tax is withheld?",
        a: "20% (ritenuta d'acconto) when the client is an Italian business, association or professional. No withholding when the client is a private individual or a foreign company. Non-residents paid by an Italian business have 30% withheld as a final tax, unless a tax treaty applies.",
      },
      {
        q: "When do I need the €2 stamp?",
        a: "When the receipt is above €77.47. Put a €2 marca da bollo on the original (you can write its serial number on the receipt). You can charge the €2 to the client.",
      },
      {
        q: "Do I need a VAT number (Partita IVA)?",
        a: "Not for occasional work. You need one when the activity becomes habitual, continuous or organised — regardless of how much you earn.",
      },
      {
        q: "Can foreigners use ItalyReceipt?",
        a: "Yes. You need an Italian codice fiscale. The generator handles non-resident workers and foreign clients, and creates bilingual PDFs (Italian + English, Spanish, French or German).",
      },
      {
        q: "Is my data safe?",
        a: "Your data never leaves your device: the PDF is created in your browser and the details are saved only in its local storage. You can delete them at any time with “Clear saved data”.",
      },
      {
        q: "Do I need to sign the receipt?",
        a: "Yes. Print and sign it, or sign the PDF digitally, then send it to your client. Keep a copy for at least five years.",
      },
    ],
  },
  guidePage: {
    updated: "Updated",
    minRead: "{min} min read",
    related: "Keep reading",
    onThisPage: "On this page",
    endCtaTitle: "Ready to create your receipt?",
    endCtaText: "Withholding, INPS and stamp duty calculated for you. Free, private, bilingual PDF.",
    endCtaButton: "Open the generator",
    inlineCtaTitle: "Skip the maths",
    inlineCtaText: "Our free generator applies these rules for you and creates a ready-to-sign PDF.",
    inlineCtaButton: "Create my receipt",
    callouts: { info: "Good to know", tip: "Tip", warning: "Watch out", example: "Example" },
  },
  guidesIndex: {
    title: "Guides to working in Italy without a VAT number",
    subtitle: "Everything about prestazione occasionale, explained simply and kept up to date.",
  },
  consent: {
    title: "Cookies, only if you agree",
    text: "We'd like to use cookies for analytics (Google Analytics) and ads (Google AdSense) that keep ItalyReceipt free. The generator works without them, and you can change your choice at any time from “Cookie settings”.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customize",
    save: "Save choices",
    settingsTitle: "Cookie settings",
    alwaysOn: "Always on",
    categories: {
      necessary: {
        title: "Strictly necessary",
        text: "Remember your consent choice and the details you type in the generator, stored only in your browser.",
      },
      analytics: {
        title: "Analytics",
        text: "Google Analytics tells us which pages are useful. Nothing you type in the generator is ever sent.",
      },
      ads: {
        title: "Advertising",
        text: "Google AdSense shows ads that keep the site free. With consent, ads may be personalised.",
      },
    },
    privacyLink: "Read the privacy policy",
  },
  footer: {
    tagline: "Free receipts for occasional work in Italy.",
    disclaimer:
      "ItalyReceipt provides general information and a document generator. It is not tax or legal advice: check your situation with a commercialista or CAF.",
    product: "Product",
    resources: "Guides",
    legal: "Legal",
    rulesReviewed: "Tax rules reviewed on {date}",
    rights: "© {year} ItalyReceipt",
  },
  notFound: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved.",
    back: "Back to the generator",
  },
};

export default en;

type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? Widen<U>[]
    : T extends object
      ? { [K in keyof T]: Widen<T[K]> }
      : T;

export type Dictionary = Widen<typeof en>;
