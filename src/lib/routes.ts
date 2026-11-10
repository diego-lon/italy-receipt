import { site } from "./site";
import { defaultLocale, isLocale, locales, type Locale } from "./i18n/config";

export const guideIds = [
  "freelance-without-vat",
  "how-to-invoice",
  "limit-5000",
  "receipt-template",
  "foreigners",
] as const;

export type GuideId = (typeof guideIds)[number];

export const guideSlugs: Record<GuideId, Record<Locale, string>> = {
  "freelance-without-vat": {
    en: "freelance-italy-without-vat",
    it: "lavorare-senza-partita-iva",
    es: "trabajar-en-italia-sin-partita-iva",
    fr: "travailler-en-italie-sans-partita-iva",
    de: "in-italien-arbeiten-ohne-partita-iva",
  },
  "how-to-invoice": {
    en: "how-to-invoice-without-vat-in-italy",
    it: "come-fare-ricevuta-prestazione-occasionale",
    es: "como-facturar-en-italia-sin-iva",
    fr: "comment-facturer-en-italie-sans-tva",
    de: "rechnung-in-italien-ohne-ust-id",
  },
  "limit-5000": {
    en: "5000-euro-limit-italy",
    it: "limite-5000-euro-prestazione-occasionale",
    es: "limite-5000-euros-italia",
    fr: "plafond-5000-euros-italie",
    de: "5000-euro-grenze-italien",
  },
  "receipt-template": {
    en: "invoice-template-italy",
    it: "fac-simile-ricevuta-prestazione-occasionale",
    es: "plantilla-recibo-italia",
    fr: "modele-recu-italie",
    de: "quittung-vorlage-italien",
  },
  foreigners: {
    en: "prestazione-occasionale-foreigners",
    it: "prestazione-occasionale-stranieri-non-residenti",
    es: "prestazione-occasionale-extranjeros",
    fr: "prestazione-occasionale-etrangers",
    de: "prestazione-occasionale-auslaender",
  },
};

const pageSlugs = {
  guides: { en: "guides", it: "guide", es: "guias", fr: "guides", de: "ratgeber" },
  privacy: {
    en: "privacy",
    it: "privacy",
    es: "privacidad",
    fr: "confidentialite",
    de: "datenschutz",
  },
} satisfies Record<string, Record<Locale, string>>;

export type PageKey =
  | { type: "home" }
  | { type: "guides" }
  | { type: "privacy" }
  | { type: "guide"; id: GuideId };

export function slugFor(locale: Locale, page: Exclude<PageKey, { type: "home" }>) {
  return page.type === "guide" ? guideSlugs[page.id][locale] : pageSlugs[page.type][locale];
}

/** Site-relative path, always with a trailing slash (matches `trailingSlash: true`). */
export function pathFor(locale: Locale, page: PageKey): string {
  if (page.type === "home") return locale === defaultLocale ? "/" : `/${locale}/`;
  return `/${locale}/${slugFor(locale, page)}/`;
}

export function generatorPath(locale: Locale) {
  return `${pathFor(locale, { type: "home" })}#generator`;
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

/** hreflang map for `metadata.alternates.languages`, including x-default. */
export function languageAlternates(page: PageKey) {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = pathFor(locale, page);
  languages["x-default"] = pathFor(defaultLocale, page);
  return languages;
}

/** Every `[slug]` page that exists for a locale. */
export function slugPagesFor(locale: Locale): Array<{ slug: string; page: Exclude<PageKey, { type: "home" }> }> {
  const pages: Exclude<PageKey, { type: "home" }>[] = [
    { type: "guides" },
    { type: "privacy" },
    ...guideIds.map((id) => ({ type: "guide" as const, id })),
  ];
  return pages.map((page) => ({ slug: slugFor(locale, page), page }));
}

export function resolveSlug(locale: Locale, slug: string) {
  return slugPagesFor(locale).find((entry) => entry.slug === slug)?.page ?? null;
}

/** Parses a site path (with or without trailing slash) back to its locale and page. */
export function pageFromPath(pathname: string): { locale: Locale; page: PageKey } | null {
  const [first, slug, ...rest] = pathname.split(/[?#]/)[0].split("/").filter(Boolean);
  if (!first) return { locale: defaultLocale, page: { type: "home" } };
  if (!isLocale(first) || rest.length > 0) return null;
  if (!slug) return { locale: first, page: { type: "home" } };
  const page = resolveSlug(first, decodeURIComponent(slug));
  return page ? { locale: first, page } : null;
}
