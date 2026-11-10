import type { MDXContent } from "mdx/types";
import type { Locale } from "./i18n/config";
import { guideIds, type GuideId } from "./routes";

export interface ContentMeta {
  title: string;
  description: string;
  /** ISO date (yyyy-mm-dd) of the last content review. */
  updated: string;
  readingMinutes?: number;
}

export interface ContentModule {
  default: MDXContent;
  meta: ContentMeta;
}

type Loader = () => Promise<ContentModule>;

// `@types/mdx` only types the default export; every content file also exports `meta`.
const mdx = (loader: () => Promise<unknown>) => loader as Loader;

// Explicit import map so the bundler sees every file at build time.
const guides: Record<GuideId, Partial<Record<Locale, Loader>>> = {
  "freelance-without-vat": {
    en: mdx(() => import("@/content/guides/freelance-without-vat/en.mdx")),
  },
  "how-to-invoice": {
    en: mdx(() => import("@/content/guides/how-to-invoice/en.mdx")),
  },
  "limit-5000": {
    en: mdx(() => import("@/content/guides/limit-5000/en.mdx")),
  },
  "receipt-template": {
    en: mdx(() => import("@/content/guides/receipt-template/en.mdx")),
  },
  foreigners: {
    en: mdx(() => import("@/content/guides/foreigners/en.mdx")),
  },
};

const privacy: Partial<Record<Locale, Loader>> = {
  en: mdx(() => import("@/content/legal/privacy/en.mdx")),
};

function pick(loaders: Partial<Record<Locale, Loader>>, locale: Locale) {
  const loader = loaders[locale] ?? loaders.en;
  if (!loader) throw new Error(`Missing content for ${locale}`);
  return loader();
}

export function loadGuide(id: GuideId, locale: Locale) {
  return pick(guides[id], locale);
}

export function loadPrivacy(locale: Locale) {
  return pick(privacy, locale);
}

export async function loadGuideMetas(locale: Locale) {
  return Promise.all(guideIds.map(async (id) => ({ id, meta: (await loadGuide(id, locale)).meta })));
}
