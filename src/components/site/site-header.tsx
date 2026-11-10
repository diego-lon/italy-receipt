import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { generatorPath, pathFor } from "@/lib/routes";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";
import { MobileNav, type NavLink } from "./mobile-nav";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = pathFor(locale, { type: "home" });
  const links: NavLink[] = [
    { href: generatorPath(locale), label: dict.nav.generator },
    { href: pathFor(locale, { type: "guides" }), label: dict.nav.guides },
    { href: `${home}#faq`, label: dict.nav.faq },
  ];
  const cta = { href: generatorPath(locale), label: dict.nav.cta };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:px-6">
        <Link href={home} className="-ml-1 rounded-lg p-1 outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          <Logo />
        </Link>
        <nav aria-label={dict.common.mainNav} className="ml-8 hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher locale={locale} label={dict.common.language} />
          <Button asChild className="hidden px-3.5 sm:inline-flex">
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
          <MobileNav
            locale={locale}
            links={links}
            cta={cta}
            labels={{
              openMenu: dict.common.openMenu,
              close: dict.common.close,
              menu: dict.common.menu,
              mainNav: dict.common.mainNav,
              language: dict.common.language,
            }}
          />
        </div>
      </div>
    </header>
  );
}
