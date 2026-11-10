import { localeInfo, type Locale } from "./i18n/config";

/** Long localized date ("10 November 2026") from an ISO yyyy-mm-dd string, independent of the build machine's time zone. */
export function formatLongDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeInfo[locale].intl, { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
