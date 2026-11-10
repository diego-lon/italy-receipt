import type { Dictionary } from "./en";

const it: Dictionary = {
  meta: {
    homeTitle: "Ricevuta prestazione occasionale: crea PDF gratis | ItalyReceipt",
    homeDescription:
      "Crea in pochi minuti la ricevuta per prestazione occasionale: ritenuta d'acconto 20%, INPS oltre € 5.000, marca da bollo da € 2, PDF bilingue. Gratis e privato.",
    guidesTitle: "Guide alla prestazione occasionale senza Partita IVA",
    guidesDescription:
      "Guide chiare e aggiornate sulla prestazione occasionale: ricevuta, ritenuta d'acconto, soglia INPS di € 5.000, marca da bollo e regole per gli stranieri.",
    notFoundTitle: "Pagina non trovata",
    ogAlt: "ItalyReceipt — Ricevute per prestazione occasionale fatte come si deve",
  },
  common: {
    skipToContent: "Vai al contenuto",
    language: "Lingua",
    openMenu: "Apri il menu",
    close: "Chiudi",
    home: "Home",
    menu: "Menu",
    mainNav: "Navigazione principale",
    breadcrumb: "Percorso di navigazione",
  },
  nav: {
    generator: "Generatore",
    guides: "Guide",
    faq: "FAQ",
    privacy: "Privacy e cookie",
    cookieSettings: "Impostazioni cookie",
    support: "Offrimi un caffè",
    cta: "Crea ricevuta",
  },
  hero: {
    badge: "Aggiornato alle regole 2026",
    title: "Ricevute per prestazione occasionale, *fatte come si deve*",
    subtitle:
      "Crea in pochi minuti una *ricevuta per prestazione occasionale* pronta da firmare. Ritenuta d'acconto, INPS e marca da bollo vengono calcolati in automatico: gratis, senza registrazione, e i tuoi dati non lasciano mai il browser.",
    cta: "Crea la tua ricevuta",
    secondaryCta: "Leggi le guide",
    trust: ["100% gratis", "Senza registrazione", "Dati solo sul tuo dispositivo", "PDF bilingue"],
  },
  generator: {
    title: "Generatore di ricevute",
    subtitle: "Compila i campi: imposte e contributi si calcolano mentre scrivi.",
    privacyNote:
      "Tutto resta in questo browser. I tuoi dati vengono salvati in locale, così non devi inserirli di nuovo.",
    clearData: "Cancella dati salvati",
    clearConfirmTitle: "Eliminare i dati salvati?",
    clearConfirmText:
      "Verranno rimossi tutti i dati salvati in questo browser (i tuoi, quelli del committente, gli importi e i dati di pagamento).",
    clearConfirmButton: "Elimina tutto",
    cancel: "Annulla",
    cleared: "Dati salvati eliminati",
    newReceipt: "Nuova ricevuta",
    newReceiptDone: "Nuova ricevuta pronta: i tuoi dati sono stati mantenuti e il numero è passato al successivo.",
    optional: "facoltativo",
    sections: {
      provider: { title: "I tuoi dati", description: "Chi ha svolto il lavoro ed emette la ricevuta." },
      client: { title: "Il committente", description: "Chi ti paga." },
      work: { title: "Lavoro e importi", description: "Descrivi il lavoro e indica l'importo lordo di ogni riga." },
      taxes: {
        title: "Imposte e contributi",
        description: "Applicati in automatico in base al tipo di committente. Modifica solo ciò che ti riguarda.",
      },
      payment: { title: "Pagamento e note", description: "Come deve pagarti il committente." },
    },
    fields: {
      fullName: "Nome e cognome",
      fullNamePlaceholder: "Mario Rossi",
      taxCode: "Codice fiscale",
      taxCodePlaceholder: "RSSMRA80A01H501U",
      taxCodeHelp: "Il tuo codice fiscale di 16 caratteri. Se sei straniero, puoi richiederlo all'Agenzia delle Entrate.",
      address: "Indirizzo",
      addressPlaceholder: "Via Roma 1\n20121 Milano (MI)",
      nonResident: "Non sono fiscalmente residente in Italia",
      nonResidentHelp:
        "Ai non residenti le aziende italiane trattengono il 30% a titolo d'imposta, salvo convenzione contro le doppie imposizioni.",
      clientType: "Tipo di committente",
      clientTypes: {
        "it-business": {
          label: "Azienda italiana",
          description: "Società, associazione o professionista con Partita IVA. Applica la ritenuta.",
        },
        "it-private": {
          label: "Privato",
          description: "Una persona, oppure un'attività in regime forfettario che non applica la ritenuta.",
        },
        foreign: {
          label: "Cliente estero",
          description: "Ha sede all'estero e nessuna presenza fiscale in Italia.",
        },
      },
      clientName: "Nome o ragione sociale",
      clientNamePlaceholder: "Rossi Design S.r.l.",
      clientTaxCode: "Codice fiscale o Partita IVA",
      clientTaxCodeForeign: "ID fiscale o partita IVA estera",
      clientTaxCodePlaceholder: "IT01234567890",
      clientAddress: "Indirizzo",
      clientAddressPlaceholder: "Corso Italia 10\n00198 Roma (RM)",
      receiptNumber: "N. ricevuta",
      receiptNumberPlaceholder: "1/2026",
      date: "Data",
      place: "Luogo",
      placePlaceholder: "Milano",
      itemDescription: "Descrizione",
      itemDescriptionPlaceholder: "Realizzazione del logo per la campagna di primavera",
      itemAmount: "Importo lordo",
      addItem: "Aggiungi riga",
      removeItem: "Rimuovi riga",
      priorYearGross: "Già incassato quest'anno da lavoro occasionale",
      priorYearGrossHelp:
        "Totale lordo da tutti i committenti dal 1° gennaio, esclusa questa ricevuta. Serve per la soglia INPS di € 5.000.",
      inpsReduced: "Sono in pensione o ho già un'altra previdenza obbligatoria",
      inpsReducedHelp: "Aliquota INPS del 24% invece del 33,72% (ad es. se sei anche lavoratore dipendente).",
      stampCharged: "Addebita il bollo da € 2 al committente",
      stampChargedHelp: "L'importo si aggiunge al totale e non è soggetto a ritenuta.",
      stampId: "Identificativo marca da bollo",
      stampIdPlaceholder: "14 cifre stampate sulla marca da bollo",
      customRate: "Ritenuta personalizzata (%)",
      customRatePlaceholder: "Automatica",
      customRateHelp:
        "Solo se ti si applica un'aliquota diversa (ad es. 0% per i non residenti in base a una convenzione contro le doppie imposizioni). Lascia vuoto per l'aliquota automatica.",
      paymentMethod: "Modalità di pagamento",
      paymentMethods: { bank: "Bonifico bancario", cash: "Contanti", paypal: "PayPal", other: "Altro" },
      paymentDetails: "Dati per il pagamento",
      paymentDetailsPlaceholders: {
        bank: "IBAN IT60 X054 2811 1010 0000 0123 456",
        cash: "",
        paypal: "nome@example.com",
        other: "ad es. Satispay, assegno…",
      },
      notes: "Note",
      notesPlaceholder: "Altro da stampare sulla ricevuta",
      pdfLanguage: "Lingua del PDF",
    },
    advanced: "Opzioni avanzate",
    summary: {
      title: "Riepilogo",
      gross: "Compenso lordo",
      withholding: "Ritenuta d'acconto {rate}",
      withholdingFinal: "Ritenuta a titolo d'imposta {rate}",
      noWithholding: "Ritenuta",
      none: "nessuna",
      inpsWorker: "INPS a tuo carico (1/3)",
      stamp: "Bollo addebitato al committente",
      net: "Ricevi",
      clientCost: "Costo totale per il committente",
      clientInps: "di cui {amount} di INPS a carico del committente",
      reasons: {
        "business-resident":
          "Il committente trattiene il 20% come ritenuta d'acconto e lo versa allo Stato per conto tuo.",
        "business-non-resident":
          "Come non residente subisci una ritenuta del 30% a titolo d'imposta, salvo convenzione contro le doppie imposizioni.",
        "private-client":
          "I privati non applicano la ritenuta: ricevi l'intero importo e lo indichi nella dichiarazione dei redditi.",
        "foreign-client":
          "I committenti esteri non applicano la ritenuta italiana: se sei residente in Italia, indica il reddito nella dichiarazione dei redditi.",
        "custom-rate": "Viene applicata la ritenuta personalizzata impostata nelle opzioni avanzate.",
      },
      inpsBelow: "Quest'anno mancano {amount} alla soglia INPS dei 5.000 euro.",
      inpsAbove:
        "Quest'anno hai superato i 5.000 euro: INPS al {rate} su {base}. Iscriviti alla Gestione Separata INPS e avvisa il committente.",
      inpsAboveOtherClient:
        "Quest'anno hai superato i 5.000 euro: potrebbero essere dovuti contributi INPS. Verifica con un CAF o un commercialista.",
      stampRequired: "Serve il bollo da € 2: applica la marca da bollo sull'originale.",
      stampNotRequired: "Bollo non dovuto (fino a € 77,47).",
    },
    reverse: {
      trigger: "Parti dal netto",
      title: "Calcola il lordo dal netto",
      description: "Inserisci quanto vuoi ricevere e calcoliamo il lordo da indicare in ricevuta.",
      target: "Netto desiderato",
      result: "Lordo in ricevuta",
      inexact: "Il più vicino possibile: {net} netti.",
      apply: "Usa questo importo",
      applied: "Importo lordo aggiornato",
    },
    actions: {
      download: "Scarica PDF",
      preview: "Anteprima",
      generating: "Generazione…",
    },
    validation: {
      title: "Mancano alcuni dati",
      providerName: "Inserisci nome e cognome",
      clientName: "Inserisci il nome del committente",
      items: "Aggiungi almeno una riga con un importo valido",
      amount: "Inserisci un importo valido, ad es. 1250,00",
      percent: "Inserisci una percentuale tra 0 e 100",
      description: "Descrivi il lavoro svolto",
    },
    toasts: {
      ready: "Il tuo PDF è pronto",
      error: "Impossibile generare il PDF. Riprova.",
      popupBlocked: "Il browser ha bloccato l'anteprima. Consenti i pop-up o usa Scarica PDF.",
    },
    mobileBar: { net: "Ricevi", cta: "Scarica PDF" },
  },
  pdfLanguages: {
    it: "Italiano",
    en: "Inglese",
    es: "Spagnolo",
    fr: "Francese",
    de: "Tedesco",
    "it+en": "Italiano + inglese",
    "it+es": "Italiano + spagnolo",
    "it+fr": "Italiano + francese",
    "it+de": "Italiano + tedesco",
  },
  support: {
    title: "ItalyReceipt ti ha fatto risparmiare tempo?",
    text: "È gratis e si sostiene con la pubblicità. Se ti è stato utile, puoi offrirmi un caffè.",
    button: "Offrimi un caffè",
  },
  howItWorks: {
    title: "Come funziona",
    subtitle: "Dal foglio bianco alla ricevuta firmata in tre passaggi.",
    steps: [
      {
        title: "Inserisci i dati",
        text: "I tuoi, quelli del committente e il lavoro svolto. Tutto viene salvato solo nel tuo browser.",
      },
      {
        title: "Controlla i conti",
        text: "Ritenuta d'acconto, INPS oltre € 5.000 e marca da bollo calcolati in tempo reale con le regole 2026.",
      },
      {
        title: "Scarica il PDF",
        text: "Pronto da firmare e inviare, in italiano o bilingue, con tutte le diciture obbligatorie.",
      },
    ],
  },
  personas: {
    title: "Pensato per",
    subtitle: "Chiunque venga pagato per un lavoro occasionale senza Partita IVA.",
    items: [
      {
        title: "Freelance e creativi",
        text: "Designer, traduttori, fotografi e sviluppatori che svolgono un incarico occasionale.",
      },
      {
        title: "Studenti e lavoretti",
        text: "Ripetizioni, eventi, accoglienza, piccoli lavori: fatti pagare in regola fin dal primo incarico.",
      },
      {
        title: "Stranieri e non residenti",
        text: "PDF bilingui e regole chiare per lavoratori stranieri e committenti esteri.",
      },
      {
        title: "Aziende e associazioni",
        text: "Ti serve un collaboratore occasionale? Mandalo qui per una ricevuta con la ritenuta giusta.",
      },
    ],
  },
  guidesSection: {
    title: "Guide",
    subtitle: "Risposte chiare alle domande che si fanno tutti.",
    readGuide: "Leggi la guida",
    allGuides: "Tutte le guide",
  },
  faq: {
    title: "Domande frequenti",
    items: [
      {
        q: "Che cos'è la ricevuta per prestazione occasionale?",
        a: "È il documento che rilasci quando vieni pagato per un lavoro autonomo occasionale senza Partita IVA. Indica chi ha svolto il lavoro, per chi, il compenso lordo, l'eventuale ritenuta d'acconto e il netto a pagare.",
      },
      {
        q: "C'è un limite di € 5.000 per la prestazione occasionale?",
        a: "Non come tetto ai compensi: quella di € 5.000 è la soglia INPS. Se la superi nello stesso anno solare, sommando tutti i committenti, i contributi sono dovuti sulla parte eccedente. A rendere occasionale un lavoro è la sua natura (non abituale, non continuativo), non l'importo.",
      },
      {
        q: "Quale ritenuta si applica?",
        a: "Il 20% (ritenuta d'acconto) se il committente è un'azienda, un'associazione o un professionista italiano. Nessuna ritenuta se il committente è un privato o un'azienda estera. Ai non residenti pagati da un'azienda italiana si applica il 30% a titolo d'imposta, salvo convenzione contro le doppie imposizioni.",
      },
      {
        q: "Quando serve la marca da bollo da € 2?",
        a: "Quando la ricevuta supera € 77,47. Applica una marca da bollo da € 2 sull'originale (puoi riportarne il numero identificativo sulla ricevuta). I € 2 puoi addebitarli al committente.",
      },
      {
        q: "Mi serve la Partita IVA?",
        a: "Non per il lavoro occasionale. Ti serve quando l'attività diventa abituale, continuativa o organizzata, indipendentemente da quanto guadagni.",
      },
      {
        q: "Gli stranieri possono usare ItalyReceipt?",
        a: "Sì, serve un codice fiscale italiano. Il generatore gestisce lavoratori non residenti e committenti esteri e crea PDF bilingui (italiano + inglese, spagnolo, francese o tedesco).",
      },
      {
        q: "I miei dati sono al sicuro?",
        a: "I tuoi dati non lasciano mai il dispositivo: il PDF viene creato nel browser e i dati sono salvati solo nella sua memoria locale. Puoi cancellarli in qualsiasi momento con “Cancella dati salvati”.",
      },
      {
        q: "Devo firmare la ricevuta?",
        a: "Sì. Stampala e firmala, oppure firma il PDF digitalmente, poi inviala al committente. Conservane una copia per almeno cinque anni.",
      },
    ],
  },
  guidePage: {
    updated: "Aggiornato",
    minRead: "{min} min di lettura",
    related: "Continua a leggere",
    onThisPage: "In questa pagina",
    endCtaTitle: "Vuoi creare la tua ricevuta?",
    endCtaText: "Ritenuta, INPS e marca da bollo calcolati per te. Gratis, privato e con PDF bilingue.",
    endCtaButton: "Apri il generatore",
    inlineCtaTitle: "Niente calcoli a mano",
    inlineCtaText: "Il nostro generatore gratuito applica queste regole al posto tuo e crea un PDF pronto da firmare.",
    inlineCtaButton: "Crea la mia ricevuta",
    callouts: { info: "Buono a sapersi", tip: "Consiglio", warning: "Attenzione", example: "Esempio" },
  },
  guidesIndex: {
    title: "Guide per lavorare senza Partita IVA",
    subtitle: "Tutto sulla prestazione occasionale, spiegato in modo semplice e sempre aggiornato.",
  },
  consent: {
    title: "Cookie, solo se sei d'accordo",
    text: "Vorremmo usare cookie di statistica (Google Analytics) e pubblicitari (Google AdSense), che permettono a ItalyReceipt di restare gratuito. Il generatore funziona anche senza, e puoi cambiare la tua scelta in qualsiasi momento da “Impostazioni cookie”.",
    accept: "Accetta tutti",
    reject: "Rifiuta tutti",
    customize: "Personalizza",
    save: "Salva le scelte",
    settingsTitle: "Impostazioni cookie",
    alwaysOn: "Sempre attivi",
    categories: {
      necessary: {
        title: "Strettamente necessari",
        text: "Ricordano la tua scelta sul consenso e i dati che inserisci nel generatore, salvati solo nel tuo browser.",
      },
      analytics: {
        title: "Statistiche",
        text: "Google Analytics ci dice quali pagine sono utili. Nulla di ciò che scrivi nel generatore viene mai inviato.",
      },
      ads: {
        title: "Pubblicità",
        text: "Google AdSense mostra gli annunci che mantengono gratuito il sito. Con il tuo consenso, gli annunci possono essere personalizzati.",
      },
    },
    privacyLink: "Leggi l'informativa privacy",
  },
  footer: {
    tagline: "Ricevute gratuite per prestazioni occasionali in Italia.",
    disclaimer:
      "ItalyReceipt offre informazioni generali e un generatore di documenti. Non è una consulenza fiscale o legale: verifica la tua situazione con un commercialista o un CAF.",
    product: "Prodotto",
    resources: "Guide",
    legal: "Note legali",
    rulesReviewed: "Regole fiscali verificate il {date}",
    rights: "© {year} ItalyReceipt",
  },
  notFound: {
    title: "Pagina non trovata",
    text: "La pagina che cerchi non esiste o è stata spostata.",
    back: "Torna al generatore",
  },
};

export default it;
