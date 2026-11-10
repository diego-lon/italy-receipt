import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { loadGuideMetas } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { GuideCards } from "./guide-cards";

export async function GuidesIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const guides = await loadGuideMetas(locale);
  const home = pathFor(locale, { type: "home" });
  const path = pathFor(locale, { type: "guides" });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              name: dict.meta.guidesTitle,
              description: dict.meta.guidesDescription,
              url: absoluteUrl(path),
              inLanguage: locale,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: guides.map(({ id, meta }, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: meta.title,
                  url: absoluteUrl(pathFor(locale, { type: "guide", id })),
                })),
              },
            },
            breadcrumbJsonLd([
              { name: dict.common.home, url: absoluteUrl(home) },
              { name: dict.nav.guides, url: absoluteUrl(path) },
            ]),
          ],
        }}
      />
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-24 sm:px-6 lg:pt-12">
        <Breadcrumbs
          label={dict.common.breadcrumb}
          items={[{ label: dict.common.home, href: home }, { label: dict.nav.guides }]}
        />
        <header className="mt-8 max-w-3xl">
          <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {dict.guidesIndex.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{dict.guidesIndex.subtitle}</p>
        </header>
        <GuideCards
          locale={locale}
          guides={guides}
          headingLevel="h2"
          labels={{ readGuide: dict.guidesSection.readGuide, minRead: dict.guidePage.minRead }}
          className="mt-12"
        />
      </div>
    </>
  );
}
