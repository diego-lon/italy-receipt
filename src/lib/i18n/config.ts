export const locales = ["en", "it", "es", "fr", "de"] as const;

export type Locale = (typeof locales)[number];
export type NonDefaultLocale = Exclude<Locale, "en">;

export const defaultLocale = "en" satisfies Locale;

export const nonDefaultLocales = locales.filter(
  (l): l is NonDefaultLocale => l !== defaultLocale,
);

export const localeInfo: Record<
  Locale,
  { nativeName: string; intl: string; ogLocale: string; short: string }
> = {
  en: { nativeName: "English", intl: "en-IE", ogLocale: "en_US", short: "EN" },
  it: { nativeName: "Italiano", intl: "it-IT", ogLocale: "it_IT", short: "IT" },
  es: { nativeName: "Español", intl: "es-ES", ogLocale: "es_ES", short: "ES" },
  fr: { nativeName: "Français", intl: "fr-FR", ogLocale: "fr_FR", short: "FR" },
  de: { nativeName: "Deutsch", intl: "de-DE", ogLocale: "de_DE", short: "DE" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
