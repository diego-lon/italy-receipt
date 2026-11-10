import { CalendarDays } from "lucide-react";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { proseClassName } from "@/components/mdx/prose";
import { loadPrivacy } from "@/lib/content";
import { formatLongDate } from "@/lib/dates";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { pathFor } from "@/lib/routes";

export async function PrivacyPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { default: Content, meta } = await loadPrivacy(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-24 sm:px-6 lg:pt-12">
      <Breadcrumbs
        label={dict.common.breadcrumb}
        items={[{ label: dict.common.home, href: pathFor(locale, { type: "home" }) }, { label: meta.title }]}
      />
      <header className="mt-8">
        <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-foreground sm:text-4xl">{meta.title}</h1>
        <p className="mt-5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays aria-hidden className="size-4" />
          {dict.guidePage.updated} <time dateTime={meta.updated}>{formatLongDate(meta.updated, locale)}</time>
        </p>
      </header>
      <article className={`${proseClassName} mt-10`}>
        <Content components={mdxComponents(locale, dict)} />
      </article>
    </div>
  );
}
