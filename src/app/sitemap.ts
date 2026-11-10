import type { MetadataRoute } from "next";
import { loadGuide, loadPrivacy } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n/config";
import { absoluteUrl, languageAlternates, pathFor, slugPagesFor, type PageKey } from "@/lib/routes";
import { site } from "@/lib/site";

export const dynamic = "force-static";

async function lastModified(locale: Locale, page: PageKey) {
  if (page.type === "guide") return (await loadGuide(page.id, locale)).meta.updated;
  if (page.type === "privacy") return (await loadPrivacy(locale)).meta.updated;
  return site.rulesReviewed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: PageKey[] = [{ type: "home" }, ...slugPagesFor("en").map(({ page }) => page)];
  return Promise.all(
    pages.flatMap((page) => {
      const languages = Object.fromEntries(
        Object.entries(languageAlternates(page)).map(([language, path]) => [language, absoluteUrl(path)]),
      );
      return locales.map(async (locale) => ({
        url: absoluteUrl(pathFor(locale, page)),
        lastModified: await lastModified(locale, page),
        alternates: { languages },
      }));
    }),
  );
}
