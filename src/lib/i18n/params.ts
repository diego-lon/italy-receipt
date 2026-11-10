import { notFound } from "next/navigation";
import { defaultLocale, isLocale, type NonDefaultLocale } from "./config";

/** Locale of a `[locale]` route (English lives at the root, so `en` is not a valid value here). */
export async function localeFromParams(params: Promise<{ locale: string }>): Promise<NonDefaultLocale> {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return locale;
}
