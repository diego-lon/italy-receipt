import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { loadGuideMetas } from "@/lib/content";
import { formatLongDate } from "@/lib/dates";
import { interpolate, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { generatorPath, pathFor } from "@/lib/routes";
import { site } from "@/lib/site";
import { CookieSettingsButton } from "./cookie-settings-button";
import { LanguageLinks } from "./language-switcher";
import { Logo } from "./logo";

const linkClass =
  "rounded-sm underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50";

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

export async function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const guides = await loadGuideMetas(locale);
  const home = pathFor(locale, { type: "home" });

  return (
    <footer className="border-t bg-muted/40 text-sm text-muted-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.4fr_1fr]">
        <div className="max-w-sm">
          <Link href={home} className="inline-flex rounded-lg text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            <Logo />
          </Link>
          <p className="mt-4 font-medium text-foreground">{dict.footer.tagline}</p>
          <p className="mt-3 leading-relaxed">{dict.footer.disclaimer}</p>
        </div>
        <FooterColumn title={dict.footer.product}>
          <li>
            <Link href={generatorPath(locale)} className={linkClass}>
              {dict.nav.generator}
            </Link>
          </li>
          <li>
            <Link href={`${home}#faq`} className={linkClass}>
              {dict.nav.faq}
            </Link>
          </li>
          <li>
            <a href={site.buyMeACoffeeUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1.5`}>
              {dict.nav.support}
              <ExternalLink aria-hidden className="size-3.5" />
            </a>
          </li>
        </FooterColumn>
        <FooterColumn title={dict.footer.resources}>
          {guides.map(({ id, meta }) => (
            <li key={id}>
              <Link href={pathFor(locale, { type: "guide", id })} className={linkClass}>
                {meta.title}
              </Link>
            </li>
          ))}
          <li>
            <Link href={pathFor(locale, { type: "guides" })} className={`${linkClass} font-medium text-foreground`}>
              {dict.guidesSection.allGuides}
            </Link>
          </li>
        </FooterColumn>
        <FooterColumn title={dict.footer.legal}>
          <li>
            <Link href={pathFor(locale, { type: "privacy" })} className={linkClass}>
              {dict.nav.privacy}
            </Link>
          </li>
          <li>
            <CookieSettingsButton label={dict.nav.cookieSettings} className={linkClass} />
          </li>
        </FooterColumn>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between">
          <LanguageLinks locale={locale} label={dict.common.language} />
          <p className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <span>{interpolate(dict.footer.rulesReviewed, { date: formatLongDate(site.rulesReviewed, locale) })}</span>
            <span>{interpolate(dict.footer.rights, { year: new Date().getFullYear() })}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
