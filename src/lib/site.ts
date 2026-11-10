export const site = {
  name: "ItalyReceipt",
  url: "https://italyreceipt.com",
  gaMeasurementId: "G-GL6LW6PV31",
  adsenseClientId: "ca-pub-8915017764609053",
  buyMeACoffeeUrl: "https://www.buymeacoffee.com/diegoalzh",
  /**
   * "google-cmp": the Google certified CMP (AdSense › Privacy & messaging) shows the consent message.
   * "custom": our own banner drives Consent Mode v2. Switch to "google-cmp" once the GDPR message is published.
   */
  consentProvider: "custom" as "custom" | "google-cmp",
  controller: {
    name: "Diego Longo",
    email: "dev.diego.longo@gmail.com",
  },
  storageKeys: {
    draft: "italyreceipt:draft:v1",
    consent: "italyreceipt:consent:v1",
  },
  /** Date the tax rules shown on the site were last reviewed. */
  rulesReviewed: "2026-11-10",
} as const;
