import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/guides/guide-page";
import { GuidesIndexPage } from "@/components/guides/guides-index-page";
import { PrivacyPage } from "@/components/guides/privacy-page";
import { loadGuide, loadPrivacy } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { resolveSlug, slugPagesFor } from "@/lib/routes";

/** Params for every `[slug]` page of a locale (guides index, privacy and each guide). */
export function slugStaticParams(locale: Locale) {
  return slugPagesFor(locale).map(({ slug }) => ({ slug }));
}

export async function slugMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const page = resolveSlug(locale, slug);
  if (!page) return {};
  if (page.type === "guides") {
    const { meta } = getDictionary(locale);
    return pageMetadata({ locale, page, title: meta.guidesTitle, description: meta.guidesDescription });
  }
  const { meta } = page.type === "guide" ? await loadGuide(page.id, locale) : await loadPrivacy(locale);
  return pageMetadata({
    locale,
    page,
    title: meta.title,
    description: meta.description,
    ...(page.type === "guide" && { article: { modifiedTime: meta.updated } }),
  });
}

export function SlugPage({ locale, slug }: { locale: Locale; slug: string }) {
  const page = resolveSlug(locale, slug);
  if (!page) notFound();
  switch (page.type) {
    case "guides":
      return <GuidesIndexPage locale={locale} />;
    case "privacy":
      return <PrivacyPage locale={locale} />;
    case "guide":
      return <GuidePage locale={locale} id={page.id} />;
  }
}
