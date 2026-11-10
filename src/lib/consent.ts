import { create } from "zustand";
import { site } from "./site";

export interface ConsentChoice {
  analytics: boolean;
  ads: boolean;
}

interface StoredConsent extends ConsentChoice {
  updatedAt: number;
}

/** Choices are asked again after six months, as recommended by the Italian DPA (Garante). */
export const CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

const EEA_UK_CH = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IS", "IT", "LV", "LI",
  "LT", "LU", "MT", "NL", "NO", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "CH",
];

export const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`;
export const adsenseSrc = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClientId}`;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    googlefc?: { callbackQueue?: unknown[]; showRevocationMessage?: () => void };
  }
}

/**
 * Inline script for <head>: sets Consent Mode v2 defaults before any Google tag runs,
 * then restores the visitor's saved choice (custom banner only).
 * `gtag('config')` is queued later by `loadGoogleAnalytics`, after any consent update.
 */
export function consentBootstrapScript() {
  const denied = "{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'";
  const defaults =
    site.consentProvider === "google-cmp"
      ? `gtag('consent','default',${denied},region:${JSON.stringify(EEA_UK_CH)},wait_for_update:500});` +
        "gtag('consent','default',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});"
      : `gtag('consent','default',${denied}});` +
        `try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(site.storageKeys.consent)}));` +
        `if(c&&Date.now()-c.updatedAt<${CONSENT_MAX_AGE_MS}){var a=c.ads?'granted':'denied';` +
        "gtag('consent','update',{analytics_storage:c.analytics?'granted':'denied',ad_storage:a,ad_user_data:a,ad_personalization:a});}}catch(e){}";
  return (
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;" +
    defaults +
    "gtag('set','ads_data_redaction',true);"
  );
}

/** Third-party tags only run on the real domain, never on localhost or preview builds. */
function isProductionHost() {
  const host = new URL(site.url).hostname;
  return location.hostname === host || location.hostname === `www.${host}`;
}

function injectScript(id: string, src: string, attributes: Record<string, string> = {}) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  for (const [name, value] of Object.entries(attributes)) script.setAttribute(name, value);
  document.head.appendChild(script);
}

let analyticsConfigured = false;

export function loadGoogleAnalytics() {
  if (!isProductionHost() || analyticsConfigured || typeof window.gtag !== "function") return;
  analyticsConfigured = true;
  window.gtag("js", new Date());
  window.gtag("config", site.gaMeasurementId);
  injectScript("ga4", gtagSrc);
}

export function loadAdsense() {
  if (!isProductionHost()) return;
  injectScript("adsense", adsenseSrc, { crossorigin: "anonymous" });
}

function readStoredConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(site.storageKeys.consent);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<StoredConsent>;
    if (typeof stored.updatedAt !== "number" || Date.now() - stored.updatedAt > CONSENT_MAX_AGE_MS) return null;
    return { analytics: stored.analytics === true, ads: stored.ads === true };
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !/^_ga/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

interface ConsentStore {
  /** `undefined` until read from storage, `null` when the visitor hasn't chosen yet. */
  choice: ConsentChoice | null | undefined;
  settingsOpen: boolean;
  init: () => void;
  save: (choice: ConsentChoice) => void;
  setSettingsOpen: (open: boolean) => void;
}

export const useConsent = create<ConsentStore>()((set, get) => ({
  choice: undefined,
  settingsOpen: false,
  init: () => {
    if (get().choice === undefined) set({ choice: readStoredConsent() });
  },
  save: (choice) => {
    const previous = get().choice;
    try {
      localStorage.setItem(site.storageKeys.consent, JSON.stringify({ ...choice, updatedAt: Date.now() }));
    } catch {
      // Storage blocked: the choice still applies to this visit.
    }
    const ads = choice.ads ? "granted" : "denied";
    window.gtag?.("consent", "update", {
      analytics_storage: choice.analytics ? "granted" : "denied",
      ad_storage: ads,
      ad_user_data: ads,
      ad_personalization: ads,
    });
    set({ choice, settingsOpen: false });
    // Scripts already running can't be unloaded: clean up and reload so nothing keeps tracking.
    const revoked = (previous?.analytics && !choice.analytics) || (previous?.ads && !choice.ads);
    if (revoked) {
      clearAnalyticsCookies();
      location.reload();
    }
  },
  setSettingsOpen: (settingsOpen) => set({ settingsOpen }),
}));

/** Opens the right consent UI: our dialog, or the Google CMP revocation message. */
export function openConsentSettings() {
  if (site.consentProvider === "google-cmp") {
    window.googlefc = window.googlefc || {};
    window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
    window.googlefc.callbackQueue.push(() => window.googlefc?.showRevocationMessage?.());
    return;
  }
  useConsent.getState().setSettingsOpen(true);
}

/** Sends a GA4 event, only when analytics is allowed. Never include personal data in params. */
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (site.consentProvider === "custom" && !useConsent.getState().choice?.analytics) return;
  window.gtag("event", name, params);
}
