"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { localeInfo, locales, type Locale } from "@/lib/i18n/config";
import { pageFromPath, pathFor } from "@/lib/routes";
import { cn } from "@/lib/utils";

/** The same page in every language (falls back to each home page when the path is unknown). */
function useAlternatePaths() {
  const page = pageFromPath(usePathname())?.page ?? { type: "home" as const };
  return locales.map((locale) => ({ locale, href: pathFor(locale, page) }));
}

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const alternates = useAlternatePaths();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={`${label}: ${localeInfo[locale].nativeName}`}>
          <Globe aria-hidden />
          {localeInfo[locale].short}
          <ChevronDown aria-hidden className="size-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {alternates.map(({ locale: option, href }) => (
          <DropdownMenuItem key={option} asChild>
            <Link href={href} hrefLang={option} lang={option} aria-current={option === locale ? "true" : undefined}>
              {localeInfo[option].nativeName}
              {option === locale && <Check aria-hidden className="ml-auto text-primary" />}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Plain links to every translation of the current page (crawlable, unlike the dropdown). */
export function LanguageLinks({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const alternates = useAlternatePaths();
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {alternates.map(({ locale: option, href }) => (
          <li key={option}>
            <Link
              href={href}
              hrefLang={option}
              lang={option}
              aria-current={option === locale ? "true" : undefined}
              className={cn(
                "rounded-sm underline-offset-4 hover:text-foreground hover:underline",
                option === locale && "font-semibold text-foreground",
              )}
            >
              {localeInfo[option].nativeName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
