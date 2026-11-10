import type { Dictionary } from "./en";

const fr: Dictionary = {
  meta: {
    homeTitle: "Reçu prestazione occasionale : générateur gratuit | ItalyReceipt",
    homeDescription:
      "Créez en quelques minutes un reçu de prestazione occasionale pour l'Italie : retenue de 20 %, INPS au-delà de 5 000 €, timbre de 2 €, PDF bilingue. Gratuit et privé.",
    guidesTitle: "Guides pour travailler en Italie sans Partita IVA",
    guidesDescription:
      "Des guides clairs et à jour sur la prestazione occasionale : reçus, retenue à la source, seuil INPS de 5 000 €, droit de timbre et règles pour les étrangers.",
    notFoundTitle: "Page introuvable",
    ogAlt: "ItalyReceipt — vos reçus de travail occasionnel en Italie, dans les règles",
  },
  common: {
    skipToContent: "Aller au contenu",
    language: "Langue",
    openMenu: "Ouvrir le menu",
    close: "Fermer",
    home: "Accueil",
    menu: "Menu",
    mainNav: "Navigation principale",
    breadcrumb: "Fil d'Ariane",
  },
  nav: {
    generator: "Générateur",
    guides: "Guides",
    faq: "FAQ",
    privacy: "Confidentialité et cookies",
    cookieSettings: "Paramètres des cookies",
    support: "Offrez-moi un café",
    cta: "Créer un reçu",
  },
  hero: {
    badge: "À jour des règles 2026",
    title: "Vos reçus de travail occasionnel en Italie, *dans les règles*",
    subtitle:
      "Créez en quelques minutes une *ricevuta per prestazione occasionale* prête à signer. Retenue à la source, INPS et droit de timbre sont calculés pour vous : c'est gratuit, sans inscription, et vos données ne quittent jamais votre navigateur.",
    cta: "Créer mon reçu",
    secondaryCta: "Lire les guides",
    trust: ["100 % gratuit", "Sans inscription", "Données sur votre appareil", "PDF bilingue"],
  },
  generator: {
    title: "Générateur de reçu",
    subtitle: "Remplissez les champs : les montants se calculent au fil de la saisie.",
    privacyNote:
      "Tout reste dans ce navigateur. Vos informations sont enregistrées localement pour vous éviter de les ressaisir.",
    clearData: "Effacer les données",
    clearConfirmTitle: "Supprimer les données enregistrées ?",
    clearConfirmText:
      "Cette action supprime toutes les informations enregistrées dans ce navigateur (vous, votre client, les montants et les coordonnées de paiement).",
    clearConfirmButton: "Tout supprimer",
    cancel: "Annuler",
    cleared: "Données supprimées",
    newReceipt: "Nouveau reçu",
    newReceiptDone: "Prêt pour un nouveau reçu : vos informations ont été conservées et le numéro est passé au suivant.",
    optional: "facultatif",
    sections: {
      provider: { title: "Vous", description: "La personne qui a réalisé le travail et émet le reçu." },
      client: { title: "Votre client", description: "Qui vous paie." },
      work: { title: "Travail et montants", description: "Décrivez le travail et indiquez le montant brut de chaque ligne." },
      taxes: {
        title: "Impôts et cotisations",
        description: "Appliqués automatiquement selon le type de client. Ne modifiez que ce qui vous concerne.",
      },
      payment: { title: "Paiement et notes", description: "Comment le client doit vous payer." },
    },
    fields: {
      fullName: "Nom et prénom",
      fullNamePlaceholder: "Mario Rossi",
      taxCode: "Codice fiscale",
      taxCodePlaceholder: "RSSMRA80A01H501U",
      taxCodeHelp:
        "Votre code fiscal italien à 16 caractères. Les étrangers peuvent le demander à l'Agenzia delle Entrate.",
      address: "Adresse",
      addressPlaceholder: "Via Roma 1\n20121 Milano (MI)",
      nonResident: "Je n'ai pas ma résidence fiscale en Italie",
      nonResidentHelp:
        "Les entreprises italiennes appliquent aux non-résidents une retenue libératoire de 30 %, sauf convention fiscale.",
      clientType: "Type de client",
      clientTypes: {
        "it-business": {
          label: "Entreprise italienne",
          description: "Société, association ou professionnel avec numéro de TVA. Applique la retenue.",
        },
        "it-private": {
          label: "Particulier",
          description: "Une personne, ou une entreprise au régime forfaitaire (forfettario) sans retenue.",
        },
        foreign: {
          label: "Client étranger",
          description: "Établi hors d'Italie, sans présence fiscale en Italie.",
        },
      },
      clientName: "Nom ou raison sociale",
      clientNamePlaceholder: "Rossi Design S.r.l.",
      clientTaxCode: "Codice fiscale ou n° de TVA",
      clientTaxCodeForeign: "Identifiant fiscal ou n° de TVA",
      clientTaxCodePlaceholder: "IT01234567890",
      clientAddress: "Adresse",
      clientAddressPlaceholder: "Corso Italia 10\n00198 Roma (RM)",
      receiptNumber: "N° de reçu",
      receiptNumberPlaceholder: "1/2026",
      date: "Date",
      place: "Lieu",
      placePlaceholder: "Milano",
      itemDescription: "Description",
      itemDescriptionPlaceholder: "Création d'un logo pour la campagne de printemps",
      itemAmount: "Montant brut",
      addItem: "Ajouter une ligne",
      removeItem: "Supprimer la ligne",
      priorYearGross: "Déjà perçu cette année pour du travail occasionnel",
      priorYearGrossHelp:
        "Total brut de tous vos clients depuis le 1er janvier, hors ce reçu. Nécessaire pour le seuil INPS de 5 000 €.",
      inpsReduced: "Je suis à la retraite ou j'ai déjà une autre couverture retraite obligatoire",
      inpsReducedHelp: "Taux INPS de 24 % au lieu de 33,72 % (par exemple si vous avez aussi un emploi salarié).",
      stampCharged: "Refacturer le timbre de 2 € au client",
      stampChargedHelp: "Le montant s'ajoute au total et n'est pas soumis à la retenue.",
      stampId: "N° de série du timbre",
      stampIdPlaceholder: "14 chiffres imprimés sur la marca da bollo",
      customRate: "Taux de retenue personnalisé (%)",
      customRatePlaceholder: "Automatique",
      customRateHelp:
        "Uniquement si un autre taux s'applique à vous (par exemple 0 % grâce à une convention fiscale pour les non-résidents). Laissez vide pour le taux automatique.",
      paymentMethod: "Mode de paiement",
      paymentMethods: { bank: "Virement bancaire", cash: "Espèces", paypal: "PayPal", other: "Autre" },
      paymentDetails: "Coordonnées de paiement",
      paymentDetailsPlaceholders: {
        bank: "IBAN IT60 X054 2811 1010 0000 0123 456",
        cash: "",
        paypal: "nom@exemple.com",
        other: "par ex. Satispay, chèque…",
      },
      notes: "Notes",
      notesPlaceholder: "Toute autre information à faire figurer sur le reçu",
      pdfLanguage: "Langue du PDF",
    },
    advanced: "Options avancées",
    summary: {
      title: "Récapitulatif",
      gross: "Montant brut",
      withholding: "Retenue à la source {rate}",
      withholdingFinal: "Retenue libératoire {rate}",
      noWithholding: "Retenue à la source",
      none: "aucune",
      inpsWorker: "INPS, votre part (1/3)",
      stamp: "Timbre refacturé au client",
      net: "Vous recevez",
      clientCost: "Coût total pour le client",
      clientInps: "dont {amount} d'INPS à la charge du client",
      reasons: {
        "business-resident":
          "Votre client retient 20 % (ritenuta d'acconto) et les reverse à l'État pour votre compte.",
        "business-non-resident":
          "En tant que non-résident, vous subissez une retenue libératoire de 30 %, sauf convention fiscale applicable.",
        "private-client":
          "Les particuliers ne pratiquent pas de retenue : vous recevez la totalité du montant et l'indiquez dans votre déclaration de revenus.",
        "foreign-client":
          "Les clients étrangers n'appliquent pas de retenue italienne : si vous êtes résident fiscal en Italie, déclarez ce revenu dans votre déclaration de revenus.",
        "custom-rate": "Taux de retenue personnalisé défini dans les options avancées.",
      },
      inpsBelow: "Encore {amount} avant le seuil INPS de 5 000 € cette année.",
      inpsAbove:
        "Au-delà de 5 000 € cette année : INPS {rate} sur {base}. Inscrivez-vous à la Gestione Separata de l'INPS et prévenez votre client.",
      inpsAboveOtherClient:
        "Au-delà de 5 000 € cette année : des cotisations INPS peuvent être dues. Renseignez-vous auprès d'un CAF ou d'un commercialista.",
      stampRequired: "Timbre de 2 € obligatoire : apposez une marca da bollo sur l'original.",
      stampNotRequired: "Pas de droit de timbre (jusqu'à 77,47 €).",
    },
    reverse: {
      trigger: "Partir du montant net",
      title: "Calculer le brut à partir du net",
      description: "Saisissez le montant que vous voulez recevoir : nous calculons le brut à indiquer sur le reçu.",
      target: "Montant net souhaité",
      result: "Brut à facturer",
      inexact: "Valeur la plus proche : {net} net.",
      apply: "Utiliser ce montant",
      applied: "Montant brut mis à jour",
    },
    actions: {
      download: "Télécharger le PDF",
      preview: "Aperçu",
      generating: "Génération…",
    },
    validation: {
      title: "Il manque quelques informations",
      providerName: "Indiquez vos nom et prénom",
      clientName: "Indiquez le nom du client",
      items: "Ajoutez au moins une ligne avec un montant valide",
      amount: "Saisissez un montant valide, par ex. 1250,00",
      percent: "Saisissez un pourcentage entre 0 et 100",
      description: "Décrivez le travail effectué",
    },
    toasts: {
      ready: "Votre PDF est prêt",
      error: "Impossible de générer le PDF. Veuillez réessayer.",
      popupBlocked: "Votre navigateur a bloqué l'aperçu. Autorisez les pop-ups ou utilisez « Télécharger le PDF ».",
    },
    mobileBar: { net: "Vous recevez", cta: "Télécharger" },
  },
  pdfLanguages: {
    it: "Italien",
    en: "Anglais",
    es: "Espagnol",
    fr: "Français",
    de: "Allemand",
    "it+en": "Italien + anglais",
    "it+es": "Italien + espagnol",
    "it+fr": "Italien + français",
    "it+de": "Italien + allemand",
  },
  support: {
    title: "ItalyReceipt vous a fait gagner du temps ?",
    text: "Le site est gratuit et financé par la publicité. S'il vous a été utile, vous pouvez m'offrir un café.",
    button: "Offrez-moi un café",
  },
  howItWorks: {
    title: "Comment ça marche",
    subtitle: "De la page blanche au reçu signé en trois étapes.",
    steps: [
      {
        title: "Remplissez les champs",
        text: "Vous, votre client et le travail. Tout est enregistré uniquement dans votre navigateur.",
      },
      {
        title: "Vérifiez les montants",
        text: "Retenue à la source, INPS au-delà de 5 000 € et droit de timbre sont calculés en direct selon les règles 2026.",
      },
      {
        title: "Téléchargez le PDF",
        text: "Prêt à signer et à envoyer, en italien ou bilingue, avec toutes les mentions obligatoires.",
      },
    ],
  },
  personas: {
    title: "Conçu pour",
    subtitle: "Toute personne payée pour un travail occasionnel en Italie sans Partita IVA.",
    items: [
      {
        title: "Freelances et créatifs",
        text: "Graphistes, traducteurs, photographes et développeurs qui acceptent une mission ponctuelle.",
      },
      {
        title: "Étudiants et petits boulots",
        text: "Cours particuliers, événementiel, accueil, petits travaux : soyez payé dans les règles dès votre première mission.",
      },
      {
        title: "Expatriés et non-résidents",
        text: "Des PDF bilingues et des règles claires pour les travailleurs et les clients étrangers.",
      },
      {
        title: "Entreprises et associations",
        text: "Vous faites appel à un travailleur occasionnel ? Envoyez-le ici pour un reçu avec la bonne retenue.",
      },
    ],
  },
  guidesSection: {
    title: "Guides",
    subtitle: "Des réponses claires aux questions que tout le monde se pose.",
    readGuide: "Lire le guide",
    allGuides: "Tous les guides",
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        q: "Qu'est-ce qu'un reçu de prestazione occasionale ?",
        a: "C'est le document que vous émettez lorsque vous êtes payé pour un travail indépendant occasionnel en Italie sans numéro de TVA (Partita IVA). Il indique qui a réalisé le travail, pour qui, le montant brut, l'éventuelle retenue à la source et le montant net à payer.",
      },
      {
        q: "Existe-t-il un plafond de 5 000 € pour le travail occasionnel ?",
        a: "Pas un plafond de revenus. 5 000 € est le seuil INPS : au-delà, sur une même année civile et tous clients confondus, des cotisations sociales sont dues sur la part qui dépasse. Ce qui rend un travail occasionnel, c'est sa nature (ni habituel, ni continu), pas le montant.",
      },
      {
        q: "Quelle retenue à la source est appliquée ?",
        a: "20 % (ritenuta d'acconto) lorsque le client est une entreprise, une association ou un professionnel italien. Aucune retenue lorsque le client est un particulier ou une société étrangère. Les non-résidents payés par une entreprise italienne subissent une retenue libératoire de 30 %, sauf convention fiscale applicable.",
      },
      {
        q: "Quand faut-il le timbre de 2 € ?",
        a: "Lorsque le reçu dépasse 77,47 €. Collez une marca da bollo de 2 € sur l'original (vous pouvez reporter son numéro de série sur le reçu). Vous pouvez refacturer les 2 € au client.",
      },
      {
        q: "Ai-je besoin d'un numéro de TVA (Partita IVA) ?",
        a: "Pas pour un travail occasionnel. Il vous en faut un lorsque l'activité devient habituelle, continue ou organisée, quel que soit le montant de vos revenus.",
      },
      {
        q: "Les étrangers peuvent-ils utiliser ItalyReceipt ?",
        a: "Oui. Il vous faut un codice fiscale italien. Le générateur gère les travailleurs non résidents et les clients étrangers, et crée des PDF bilingues (italien + anglais, espagnol, français ou allemand).",
      },
      {
        q: "Mes données sont-elles en sécurité ?",
        a: "Vos données ne quittent jamais votre appareil : le PDF est créé dans votre navigateur et les informations sont enregistrées uniquement dans son stockage local. Vous pouvez les supprimer à tout moment avec « Effacer les données ».",
      },
      {
        q: "Dois-je signer le reçu ?",
        a: "Oui. Imprimez-le et signez-le, ou signez le PDF électroniquement, puis envoyez-le à votre client. Conservez-en une copie pendant au moins cinq ans.",
      },
    ],
  },
  guidePage: {
    updated: "Mis à jour le",
    minRead: "{min} min de lecture",
    related: "À lire aussi",
    onThisPage: "Sur cette page",
    endCtaTitle: "Prêt à créer votre reçu ?",
    endCtaText: "Retenue, INPS et droit de timbre calculés pour vous. Gratuit, privé, PDF bilingue.",
    endCtaButton: "Ouvrir le générateur",
    inlineCtaTitle: "Évitez les calculs",
    inlineCtaText: "Notre générateur gratuit applique ces règles pour vous et crée un PDF prêt à signer.",
    inlineCtaButton: "Créer mon reçu",
    callouts: { info: "Bon à savoir", tip: "Astuce", warning: "Attention", example: "Exemple" },
  },
  guidesIndex: {
    title: "Guides pour travailler en Italie sans Partita IVA",
    subtitle: "Tout sur la prestazione occasionale, expliqué simplement et tenu à jour.",
  },
  consent: {
    title: "Des cookies, seulement avec votre accord",
    text: "Nous aimerions utiliser des cookies de mesure d'audience (Google Analytics) et de publicité (Google AdSense), qui permettent à ItalyReceipt de rester gratuit. Le générateur fonctionne sans eux, et vous pouvez modifier votre choix à tout moment via « Paramètres des cookies ».",
    accept: "Tout accepter",
    reject: "Tout refuser",
    customize: "Personnaliser",
    save: "Enregistrer mes choix",
    settingsTitle: "Paramètres des cookies",
    alwaysOn: "Toujours actifs",
    categories: {
      necessary: {
        title: "Strictement nécessaires",
        text: "Mémorisent votre choix de consentement et les informations saisies dans le générateur, stockées uniquement dans votre navigateur.",
      },
      analytics: {
        title: "Mesure d'audience",
        text: "Google Analytics nous indique quelles pages sont utiles. Rien de ce que vous saisissez dans le générateur n'est jamais envoyé.",
      },
      ads: {
        title: "Publicité",
        text: "Google AdSense affiche des annonces qui permettent au site de rester gratuit. Avec votre consentement, les annonces peuvent être personnalisées.",
      },
    },
    privacyLink: "Lire la politique de confidentialité",
  },
  footer: {
    tagline: "Des reçus gratuits pour le travail occasionnel en Italie.",
    disclaimer:
      "ItalyReceipt fournit des informations générales et un générateur de documents. Ce n'est pas un conseil fiscal ou juridique : faites vérifier votre situation par un commercialista ou un CAF.",
    product: "Produit",
    resources: "Guides",
    legal: "Informations légales",
    rulesReviewed: "Règles fiscales vérifiées le {date}",
    rights: "© {year} ItalyReceipt",
  },
  notFound: {
    title: "Page introuvable",
    text: "La page que vous cherchez n'existe pas ou a été déplacée.",
    back: "Retour au générateur",
  },
};

export default fr;
