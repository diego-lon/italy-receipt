import type { Metadata, Viewport } from "next";
import { getDictionary } from "./i18n";
import { localeInfo, locales, type Locale } from "./i18n/config";
import { languageAlternates, pathFor, type PageKey } from "./routes";
import { site } from "./site";

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  colorScheme: "light",
};

/** File name of the Open Graph image generated for a page (privacy reuses the home image). */
export function ogImageFile(locale: Locale, page: PageKey) {
  if (page.type === "guide") return `${locale}-${page.id}.png`;
  if (page.type === "guides") return `${locale}-guides.png`;
  return `${locale}-home.png`;
}

/** Defaults shared by every page of a root layout. */
export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.homeTitle, template: `%s | ${site.name}` },
    description: dict.meta.homeDescription,
    applicationName: site.name,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    formatDetection: { telephone: false, email: false, address: false },
    other: { "google-adsense-account": site.adsenseClientId },
  };
}

interface PageMetadataInput {
  locale: Locale;
  page: PageKey;
  title: string;
  description: string;
  /** Use the title as-is instead of appending the site name. */
  absoluteTitle?: boolean;
  article?: { modifiedTime: string };
}

/** Canonical URL, hreflang alternates, Open Graph and Twitter cards for one page. */
export function pageMetadata({ locale, page, title, description, absoluteTitle, article }: PageMetadataInput): Metadata {
  const path = pathFor(locale, page);
  const image = {
    url: `/og/${ogImageFile(locale, page)}`,
    width: 1200,
    height: 630,
    alt: getDictionary(locale).meta.ogAlt,
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, languages: languageAlternates(page) },
    openGraph: {
      type: article ? "article" : "website",
      siteName: site.name,
      locale: localeInfo[locale].ogLocale,
      alternateLocale: locales.filter((other) => other !== locale).map((other) => localeInfo[other].ogLocale),
      url: path,
      title,
      description,
      images: [image],
      ...(article && { modifiedTime: article.modifiedTime }),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
