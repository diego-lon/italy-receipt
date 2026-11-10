import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, Clock, ListTree } from "lucide-react";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/breadcrumbs";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { proseClassName } from "@/components/mdx/prose";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { loadGuide, loadGuideMetas } from "@/lib/content";
import { guideToc } from "@/lib/content-source";
import { formatLongDate } from "@/lib/dates";
import { getDictionary, interpolate, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { ogImageFile } from "@/lib/metadata";
import { absoluteUrl, generatorPath, guideIds, pathFor, type GuideId } from "@/lib/routes";
import { site } from "@/lib/site";
import { GuideCards } from "./guide-cards";
import { TocLinks } from "./toc";

function EndCta({ locale, t }: { locale: Locale; t: Dictionary["guidePage"] }) {
  return (
    <aside className="relative mt-14 overflow-hidden rounded-3xl bg-primary px-6 py-9 text-primary-foreground shadow-xl shadow-primary/20 sm:px-10">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-64 rounded-full bg-white/10 blur-2xl"
      />
      <h2 className="relative text-2xl font-bold tracking-tight">{t.endCtaTitle}</h2>
      <p className="relative mt-2 max-w-xl text-primary-foreground/85">{t.endCtaText}</p>
      <Button asChild size="lg" variant="secondary" className="relative mt-6 h-11 px-5 text-base">
        <Link href={generatorPath(locale)}>
          {t.endCtaButton}
          <ArrowRight data-icon="inline-end" aria-hidden />
        </Link>
      </Button>
    </aside>
  );
}

export async function GuidePage({ locale, id }: { locale: Locale; id: GuideId }) {
  const dict = getDictionary(locale);
  const t = dict.guidePage;
  const [{ default: Content, meta }, metas] = await Promise.all([loadGuide(id, locale), loadGuideMetas(locale)]);
  const toc = guideToc(id, locale);

  const position = guideIds.indexOf(id);
  const related = [1, 2, 3].map((offset) => metas[(position + offset) % metas.length]);

  const home = pathFor(locale, { type: "home" });
  const guides = pathFor(locale, { type: "guides" });
  const path = pathFor(locale, { type: "guide", id });
  const publisher = {
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/icon-512.png") },
  };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Article",
              headline: meta.title,
              description: meta.description,
              inLanguage: locale,
              url: absoluteUrl(path),
              mainEntityOfPage: absoluteUrl(path),
              image: absoluteUrl(`/og/${ogImageFile(locale, { type: "guide", id })}`),
              dateModified: meta.updated,
              author: publisher,
              publisher,
            },
            breadcrumbJsonLd([
              { name: dict.common.home, url: absoluteUrl(home) },
              { name: dict.nav.guides, url: absoluteUrl(guides) },
              { name: meta.title, url: absoluteUrl(path) },
            ]),
          ],
        }}
      />
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 lg:pt-12">
        <Breadcrumbs
          label={dict.common.breadcrumb}
          items={[
            { label: dict.common.home, href: home },
            { label: dict.nav.guides, href: guides },
            { label: meta.title },
          ]}
        />
        <header className="mt-8 max-w-3xl">
          <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {meta.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{meta.description}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays aria-hidden className="size-4" />
              {t.updated} <time dateTime={meta.updated}>{formatLongDate(meta.updated, locale)}</time>
            </span>
            {meta.readingMinutes && (
              <span className="flex items-center gap-1.5">
                <Clock aria-hidden className="size-4" />
                {interpolate(t.minRead, { min: meta.readingMinutes })}
              </span>
            )}
          </p>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] xl:gap-16">
          <div className="min-w-0 max-w-3xl">
            {toc.length > 1 && (
              <details className="group mb-10 rounded-xl border bg-card shadow-xs lg:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-foreground outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 [&::-webkit-details-marker]:hidden">
                  <ListTree aria-hidden className="size-4 text-primary" />
                  {t.onThisPage}
                  <ChevronDown aria-hidden className="ml-auto size-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <nav aria-label={t.onThisPage} className="px-4 pb-4">
                  <TocLinks entries={toc} />
                </nav>
              </details>
            )}
            <article className={proseClassName}>
              <Content components={mdxComponents(locale, dict)} />
            </article>
            <EndCta locale={locale} t={t} />
          </div>
          {toc.length > 1 && (
            <aside className="hidden lg:block">
              <nav aria-label={t.onThisPage} className="sticky top-24">
                <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">{t.onThisPage}</p>
                <TocLinks entries={toc} className="mt-4" />
              </nav>
            </aside>
          )}
        </div>
      </div>

      <section aria-labelledby="related-title" className="border-t bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 id="related-title" className="text-2xl font-bold tracking-tight text-foreground">
            {t.related}
          </h2>
          <GuideCards
            locale={locale}
            guides={related}
            labels={{ readGuide: dict.guidesSection.readGuide, minRead: t.minRead }}
            className="mt-8"
          />
        </div>
      </section>
    </>
  );
}
