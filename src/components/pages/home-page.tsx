import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Generator } from "@/components/generator/generator";
import { GuideCards } from "@/components/guides/guide-cards";
import { Faq, faqJsonLd } from "@/components/home/faq";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Personas } from "@/components/home/personas";
import { SectionHeading } from "@/components/home/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { loadGuideMetas } from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl, pathFor } from "@/lib/routes";
import { site } from "@/lib/site";

export function homeMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    page: { type: "home" },
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    absoluteTitle: true,
  });
}

export async function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const guides = await loadGuideMetas(locale);
  const url = absoluteUrl(pathFor(locale, { type: "home" }));
  const websiteId = `${absoluteUrl("/")}#website`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", "@id": websiteId, name: site.name, url: absoluteUrl("/") },
            {
              "@type": "WebApplication",
              name: site.name,
              url,
              description: dict.meta.homeDescription,
              inLanguage: locale,
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript",
              isAccessibleForFree: true,
              offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
              isPartOf: { "@id": websiteId },
            },
            faqJsonLd(dict.faq),
          ],
        }}
      />
      <Hero locale={locale} t={dict.hero} />

      <section id="generator" aria-labelledby="generator-title" className="border-y bg-white/75">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-16">
          <Generator locale={locale} t={dict.generator} pdfLanguageLabels={dict.pdfLanguages} support={dict.support} />
        </div>
      </section>

      <HowItWorks t={dict.howItWorks} />
      <Personas t={dict.personas} />

      <section id="guides" aria-labelledby="guides-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading id="guides-title" title={dict.guidesSection.title} subtitle={dict.guidesSection.subtitle} />
          <Link
            href={pathFor(locale, { type: "guides" })}
            className="flex items-center gap-1.5 rounded-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {dict.guidesSection.allGuides}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <GuideCards
          locale={locale}
          guides={guides}
          labels={{ readGuide: dict.guidesSection.readGuide, minRead: dict.guidePage.minRead }}
          className="mt-12"
        />
      </section>

      <div className="border-t bg-white/70">
        <Faq t={dict.faq} />
      </div>
    </>
  );
}
