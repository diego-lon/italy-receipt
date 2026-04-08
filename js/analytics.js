/**
 * ITALYRECEIPT - Analytics & Consent Logic (2026)
 */

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

// 1. DEFAULT CONSENT
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  wait_for_update: 500,
});

// 2. CARICAMENTO SCRIPT GA4
const GA_MEASUREMENT_ID = "G-GL6LW6PV31";
const gaScript = document.createElement("script");
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.appendChild(gaScript);

gtag("js", new Date());
gtag("config", GA_MEASUREMENT_ID, {
  anonymize_ip: true,
  cookie_flags: "SameSite=None;Secure",
});

/**
 * ESPOSIZIONE FUNZIONI GLOBALI (Risolve il ReferenceError)
 */

window.handleConsent = function (choice) {
  localStorage.setItem("cookie_consent", choice);
  const banner = document.getElementById("cookieBanner");
  if (banner) banner.classList.add("hidden");

  if (choice === "accepted") {
    gtag("consent", "update", {
      analytics_storage: "granted",
    });
    console.log("Consent granted: Analytics enabled.");
  } else {
    console.log("Consent denied: Analytics restricted.");
  }
};

window.trackPDFDownload = function (value) {
  if (typeof gtag === "function") {
    gtag("event", "generate_pdf", {
      currency: "EUR",
      value: parseFloat(value) || 0,
      transport_type: "beacon",
    });
    console.log("Event tracked: generate_pdf", value);
  }
};

// 3. INIT
document.addEventListener("DOMContentLoaded", () => {
  const savedConsent = localStorage.getItem("cookie_consent");
  if (savedConsent === "accepted") {
    gtag("consent", "update", { analytics_storage: "granted" });
  } else if (!savedConsent) {
    setTimeout(() => {
      const banner = document.getElementById("cookieBanner");
      if (banner) banner.classList.remove("hidden");
    }, 1000);
  }
});

window.updateConsent = function (status) {
  gtag("consent", "update", {
    analytics_storage: status,
  });
};
