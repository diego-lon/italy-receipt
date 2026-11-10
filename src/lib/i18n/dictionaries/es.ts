import type { Dictionary } from "./en";

const es: Dictionary = {
  meta: {
    homeTitle: "Recibo prestazione occasionale: generador gratis | ItalyReceipt",
    homeDescription:
      "Crea en minutos tu recibo de prestazione occasionale para Italia: retención del 20 %, INPS por encima de 5.000 €, timbre de 2 €, PDF bilingüe. Gratis y privado.",
    guidesTitle: "Guías para trabajar en Italia sin Partita IVA",
    guidesDescription:
      "Guías claras y actualizadas sobre la prestazione occasionale: recibos, retención a cuenta, umbral INPS de 5.000 €, impuesto de timbre y normas para extranjeros.",
    notFoundTitle: "Página no encontrada",
    ogAlt: "ItalyReceipt — Recibos de trabajo ocasional en Italia, en regla",
  },
  common: {
    skipToContent: "Saltar al contenido",
    language: "Idioma",
    openMenu: "Abrir menú",
    close: "Cerrar",
    home: "Inicio",
    menu: "Menú",
    mainNav: "Navegación principal",
    breadcrumb: "Ruta de navegación",
  },
  nav: {
    generator: "Generador",
    guides: "Guías",
    faq: "Preguntas",
    privacy: "Privacidad y cookies",
    cookieSettings: "Ajustes de cookies",
    support: "Invítame a un café",
    cta: "Crear recibo",
  },
  hero: {
    badge: "Actualizado para 2026",
    title: "Recibos de trabajo ocasional en Italia, *en regla*",
    subtitle:
      "Crea en minutos una *ricevuta per prestazione occasionale* lista para firmar. La retención, el INPS y el impuesto de timbre se calculan automáticamente: gratis, sin registro y sin que tus datos salgan de tu navegador.",
    cta: "Crea tu recibo",
    secondaryCta: "Lee las guías",
    trust: ["100 % gratis", "Sin registro", "Datos solo en tu dispositivo", "PDF bilingüe"],
  },
  generator: {
    title: "Generador de recibos",
    subtitle: "Rellena los datos: los impuestos se calculan mientras escribes.",
    privacyNote:
      "Todo se queda en este navegador. Tus datos se guardan localmente para que no tengas que volver a escribirlos.",
    clearData: "Borrar datos guardados",
    clearConfirmTitle: "¿Borrar los datos guardados?",
    clearConfirmText:
      "Se borrarán todos los datos guardados en este navegador (tus datos, tu cliente, los importes y los datos de pago).",
    clearConfirmButton: "Borrar todo",
    cancel: "Cancelar",
    cleared: "Datos guardados borrados",
    newReceipt: "Nuevo recibo",
    newReceiptDone: "Todo listo para un nuevo recibo: hemos conservado tus datos y aumentado el número.",
    optional: "opcional",
    sections: {
      provider: { title: "Tus datos", description: "Quien ha hecho el trabajo y emite el recibo." },
      client: { title: "Tu cliente", description: "Quién te paga." },
      work: { title: "Trabajo e importes", description: "Describe el trabajo y el importe bruto de cada línea." },
      taxes: {
        title: "Impuestos y cotizaciones",
        description: "Se aplican automáticamente según el tipo de cliente. Ajusta solo lo que te afecte.",
      },
      payment: { title: "Pago y notas", description: "Cómo debe pagarte el cliente." },
    },
    fields: {
      fullName: "Nombre y apellidos",
      fullNamePlaceholder: "Mario Rossi",
      taxCode: "Codice fiscale",
      taxCodePlaceholder: "RSSMRA80A01H501U",
      taxCodeHelp:
        "Tu código fiscal italiano de 16 caracteres. Si eres extranjero, puedes pedirlo en la Agenzia delle Entrate.",
      address: "Dirección",
      addressPlaceholder: "Via Roma 1\n20121 Milano (MI)",
      nonResident: "No soy residente fiscal en Italia",
      nonResidentHelp:
        "Las empresas italianas retienen a los no residentes un 30 % como impuesto definitivo, salvo que se aplique un convenio de doble imposición.",
      clientType: "Tipo de cliente",
      clientTypes: {
        "it-business": {
          label: "Empresa italiana",
          description: "Sociedad, asociación o profesional con Partita IVA. Aplica retención.",
        },
        "it-private": {
          label: "Particular",
          description: "Una persona, o un negocio en régimen forfettario que no retiene.",
        },
        foreign: {
          label: "Cliente extranjero",
          description: "Con sede fuera de Italia y sin presencia fiscal en Italia.",
        },
      },
      clientName: "Nombre o empresa",
      clientNamePlaceholder: "Rossi Design S.r.l.",
      clientTaxCode: "Codice fiscale o Partita IVA",
      clientTaxCodeForeign: "N.º fiscal o de IVA",
      clientTaxCodePlaceholder: "IT01234567890",
      clientAddress: "Dirección",
      clientAddressPlaceholder: "Corso Italia 10\n00198 Roma (RM)",
      receiptNumber: "N.º de recibo",
      receiptNumberPlaceholder: "1/2026",
      date: "Fecha",
      place: "Lugar",
      placePlaceholder: "Milano",
      itemDescription: "Descripción",
      itemDescriptionPlaceholder: "Diseño del logo para la campaña de primavera",
      itemAmount: "Importe bruto",
      addItem: "Añadir línea",
      removeItem: "Quitar línea",
      priorYearGross: "Ya cobrado este año por trabajo ocasional",
      priorYearGrossHelp:
        "Total bruto de todos tus clientes desde el 1 de enero, sin contar este recibo. Sirve para el umbral INPS de 5.000 €.",
      inpsReduced: "Soy pensionista o ya tengo otra cobertura de pensiones obligatoria",
      inpsReducedHelp: "Tipo INPS del 24 % en lugar del 33,72 % (p. ej., si además eres asalariado).",
      stampCharged: "Cobrar al cliente el timbre de 2 €",
      stampChargedHelp: "El importe se suma al total y no está sujeto a retención.",
      stampId: "N.º de serie del timbre",
      stampIdPlaceholder: "14 dígitos impresos en la marca da bollo",
      customRate: "Retención personalizada (%)",
      customRatePlaceholder: "Automática",
      customRateHelp:
        "Solo si te corresponde otro tipo (p. ej., 0 % por un convenio de doble imposición, si no eres residente). Déjalo vacío para usar el tipo automático.",
      paymentMethod: "Forma de pago",
      paymentMethods: { bank: "Transferencia", cash: "Efectivo", paypal: "PayPal", other: "Otro" },
      paymentDetails: "Datos de pago",
      paymentDetailsPlaceholders: {
        bank: "IBAN IT60 X054 2811 1010 0000 0123 456",
        cash: "",
        paypal: "nombre@example.com",
        other: "p. ej., Satispay, cheque…",
      },
      notes: "Notas",
      notesPlaceholder: "Cualquier otra cosa que deba figurar en el recibo",
      pdfLanguage: "Idioma del PDF",
    },
    advanced: "Opciones avanzadas",
    summary: {
      title: "Resumen",
      gross: "Importe bruto",
      withholding: "Retención del {rate}",
      withholdingFinal: "Retención definitiva del {rate}",
      noWithholding: "Retención",
      none: "ninguna",
      inpsWorker: "INPS, tu parte (1/3)",
      stamp: "Timbre a cargo del cliente",
      net: "Recibes",
      clientCost: "Coste total para el cliente",
      clientInps: "incluye {amount} de INPS a cargo del cliente",
      reasons: {
        "business-resident":
          "Tu cliente te retiene el 20 % (ritenuta d'acconto) y lo ingresa al Estado en tu nombre.",
        "business-non-resident":
          "Como no residente, se te retiene un 30 % como impuesto definitivo, salvo que se aplique un convenio de doble imposición.",
        "private-client":
          "Los particulares no practican retención: recibes el importe íntegro y lo declaras en tu declaración de la renta.",
        "foreign-client":
          "Los clientes extranjeros no aplican la retención italiana: si eres residente en Italia, declara estos ingresos en tu declaración de la renta.",
        "custom-rate": "Se aplica la retención personalizada de las opciones avanzadas.",
      },
      inpsBelow: "Te quedan {amount} antes del umbral INPS de 5.000 € este año.",
      inpsAbove:
        "Más de 5.000 € este año: INPS del {rate} sobre {base}. Inscríbete en la Gestione Separata del INPS y avisa a tu cliente.",
      inpsAboveOtherClient:
        "Más de 5.000 € este año: puede que debas cotizar al INPS. Consúltalo con un CAF o un commercialista.",
      stampRequired: "Timbre de 2 € obligatorio: pega una marca da bollo en el original.",
      stampNotRequired: "No hace falta timbre (hasta 77,47 €).",
    },
    reverse: {
      trigger: "Calcular desde el neto",
      title: "Calcula el bruto a partir del neto",
      description: "Introduce el importe que quieres cobrar y calcularemos el bruto que debes poner en el recibo.",
      target: "Neto que quieres cobrar",
      result: "Bruto para el recibo",
      inexact: "Lo más aproximado: {net} netos.",
      apply: "Usar este importe",
      applied: "Importe bruto actualizado",
    },
    actions: {
      download: "Descargar PDF",
      preview: "Vista previa",
      generating: "Generando…",
    },
    validation: {
      title: "Faltan algunos datos",
      providerName: "Escribe tu nombre y apellidos",
      clientName: "Escribe el nombre del cliente",
      items: "Añade al menos una línea con un importe válido",
      amount: "Introduce un importe válido, p. ej., 1250,00",
      percent: "Introduce un porcentaje entre 0 y 100",
      description: "Describe el trabajo realizado",
    },
    toasts: {
      ready: "Tu PDF está listo",
      error: "No se ha podido generar el PDF. Inténtalo de nuevo.",
      popupBlocked: "Tu navegador ha bloqueado la vista previa. Permite las ventanas emergentes o usa Descargar.",
    },
    mobileBar: { net: "Recibes", cta: "Obtener PDF" },
  },
  pdfLanguages: {
    it: "Italiano",
    en: "Inglés",
    es: "Español",
    fr: "Francés",
    de: "Alemán",
    "it+en": "Italiano + inglés",
    "it+es": "Italiano + español",
    "it+fr": "Italiano + francés",
    "it+de": "Italiano + alemán",
  },
  support: {
    title: "¿ItalyReceipt te ha ahorrado tiempo?",
    text: "Es gratis y se mantiene con publicidad. Si te ha sido útil, puedes invitarme a un café.",
    button: "Invítame a un café",
  },
  howItWorks: {
    title: "Cómo funciona",
    subtitle: "De la página en blanco al recibo firmado en tres pasos.",
    steps: [
      {
        title: "Rellena los datos",
        text: "Tú, tu cliente y el trabajo. Todo se guarda solo en tu navegador.",
      },
      {
        title: "Revisa las cifras",
        text: "La retención, el INPS por encima de 5.000 € y el impuesto de timbre se calculan al momento con las normas de 2026.",
      },
      {
        title: "Descarga el PDF",
        text: "Listo para firmar y enviar, en italiano o bilingüe, con todas las menciones obligatorias.",
      },
    ],
  },
  personas: {
    title: "Pensado para",
    subtitle: "Cualquiera que cobre por un trabajo ocasional en Italia sin Partita IVA.",
    items: [
      {
        title: "Freelance y creativos",
        text: "Diseñadores, traductores, fotógrafos y desarrolladores que aceptan un encargo ocasional.",
      },
      {
        title: "Estudiantes y trabajos puntuales",
        text: "Clases particulares, eventos y ferias, pequeños encargos: cobra bien desde tu primer trabajo.",
      },
      {
        title: "Expatriados y no residentes",
        text: "PDF bilingües y normas claras para trabajadores extranjeros y clientes extranjeros.",
      },
      {
        title: "Empresas y asociaciones",
        text: "¿Contratas a un trabajador ocasional? Pásale este enlace para un recibo con la retención correcta.",
      },
    ],
  },
  guidesSection: {
    title: "Guías",
    subtitle: "Respuestas claras a las preguntas que todo el mundo se hace.",
    readGuide: "Leer la guía",
    allGuides: "Todas las guías",
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        q: "¿Qué es un recibo de prestazione occasionale?",
        a: "Es el documento que emites cuando te pagan por un trabajo autónomo ocasional en Italia sin número de IVA (Partita IVA). Indica quién hizo el trabajo, para quién, el importe bruto, la retención si la hay y el importe neto que se debe pagar.",
      },
      {
        q: "¿Hay un límite de 5.000 € para el trabajo ocasional?",
        a: "No como tope de ingresos. 5.000 € es el umbral del INPS: por encima de esa cifra, en el mismo año natural y sumando todos los clientes, se pagan cotizaciones sociales sobre el exceso. Lo que hace ocasional un trabajo es su naturaleza (no habitual, no continuado), no el importe.",
      },
      {
        q: "¿Cuánto se retiene?",
        a: "Un 20 % (ritenuta d'acconto) cuando el cliente es una empresa, asociación o profesional italiano. No hay retención si el cliente es un particular o una empresa extranjera. A los no residentes que cobran de una empresa italiana se les retiene un 30 % como impuesto definitivo, salvo que se aplique un convenio de doble imposición.",
      },
      {
        q: "¿Cuándo necesito el timbre de 2 €?",
        a: "Cuando el recibo supera los 77,47 €. Pega una marca da bollo de 2 € en el original (puedes anotar su número de serie en el recibo). Puedes cobrarle los 2 € al cliente.",
      },
      {
        q: "¿Necesito número de IVA (Partita IVA)?",
        a: "No para un trabajo ocasional. Lo necesitas cuando la actividad se vuelve habitual, continuada u organizada, ganes lo que ganes.",
      },
      {
        q: "¿Pueden usar ItalyReceipt los extranjeros?",
        a: "Sí. Necesitas un codice fiscale italiano. El generador contempla a trabajadores no residentes y clientes extranjeros, y crea PDF bilingües (italiano + inglés, español, francés o alemán).",
      },
      {
        q: "¿Están seguros mis datos?",
        a: "Tus datos nunca salen de tu dispositivo: el PDF se crea en tu navegador y los datos se guardan solo en su almacenamiento local. Puedes borrarlos cuando quieras con «Borrar datos guardados».",
      },
      {
        q: "¿Tengo que firmar el recibo?",
        a: "Sí. Imprímelo y fírmalo, o firma el PDF digitalmente, y después envíaselo a tu cliente. Guarda una copia durante al menos cinco años.",
      },
    ],
  },
  guidePage: {
    updated: "Actualizado",
    minRead: "{min} min de lectura",
    related: "Sigue leyendo",
    onThisPage: "En esta página",
    endCtaTitle: "¿Todo listo para crear tu recibo?",
    endCtaText: "Retención, INPS e impuesto de timbre calculados por ti. Gratis, privado y con PDF bilingüe.",
    endCtaButton: "Abrir el generador",
    inlineCtaTitle: "Ahórrate los cálculos",
    inlineCtaText: "Nuestro generador gratuito aplica estas reglas por ti y crea un PDF listo para firmar.",
    inlineCtaButton: "Crear mi recibo",
    callouts: { info: "A tener en cuenta", tip: "Consejo", warning: "Atención", example: "Ejemplo" },
  },
  guidesIndex: {
    title: "Guías para trabajar en Italia sin Partita IVA",
    subtitle: "Todo sobre la prestazione occasionale, explicado de forma sencilla y siempre actualizado.",
  },
  consent: {
    title: "Cookies, solo si aceptas",
    text: "Nos gustaría usar cookies de analítica (Google Analytics) y de publicidad (Google AdSense), que mantienen ItalyReceipt gratis. El generador funciona sin ellas y puedes cambiar tu elección en cualquier momento desde «Ajustes de cookies».",
    accept: "Aceptar todas",
    reject: "Rechazar todas",
    customize: "Personalizar",
    save: "Guardar selección",
    settingsTitle: "Ajustes de cookies",
    alwaysOn: "Siempre activas",
    categories: {
      necessary: {
        title: "Estrictamente necesarias",
        text: "Recuerdan tu elección sobre las cookies y los datos que escribes en el generador, guardados solo en tu navegador.",
      },
      analytics: {
        title: "Analítica",
        text: "Google Analytics nos dice qué páginas resultan útiles. Nunca se envía nada de lo que escribes en el generador.",
      },
      ads: {
        title: "Publicidad",
        text: "Google AdSense muestra anuncios que mantienen el sitio gratis. Con tu consentimiento, los anuncios pueden ser personalizados.",
      },
    },
    privacyLink: "Leer la política de privacidad",
  },
  footer: {
    tagline: "Recibos gratis para trabajos ocasionales en Italia.",
    disclaimer:
      "ItalyReceipt ofrece información general y un generador de documentos. No es asesoramiento fiscal ni jurídico: consulta tu caso con un commercialista o un CAF.",
    product: "Producto",
    resources: "Guías",
    legal: "Legal",
    rulesReviewed: "Normas fiscales revisadas el {date}",
    rights: "© {year} ItalyReceipt",
  },
  notFound: {
    title: "Página no encontrada",
    text: "La página que buscas no existe o se ha movido.",
    back: "Volver al generador",
  },
};

export default es;
