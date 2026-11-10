import "./globals.css";
import Link from "next/link";
import type { Metadata, Viewport } from "next";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { jakarta } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";
import { localeInfo, locales } from "@/lib/i18n/config";
import { viewport as sharedViewport } from "@/lib/metadata";
import { generatorPath, pathFor } from "@/lib/routes";
import { site } from "@/lib/site";

const en = getDictionary("en");

export const metadata: Metadata = {
  title: `${en.notFound.title} | ${site.name}`,
  robots: { index: false },
  icons: { icon: [{ url: "/favicon.ico", sizes: "48x48" }, { url: "/icon.svg", type: "image/svg+xml" }] },
};
export const viewport: Viewport = sharedViewport;

/** Served by GitHub Pages as 404.html for every unknown URL, whatever its language. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="flex min-h-dvh flex-col items-center justify-center px-4 py-16 text-center">
        <Link href="/" className="rounded-lg p-1">
          <Logo />
        </Link>
        <p className="mt-12 text-7xl font-extrabold tracking-tight text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{en.notFound.title}</h1>
        <p className="mt-3 max-w-md text-muted-foreground">{en.notFound.text}</p>
        <Link
          href={generatorPath("en")}
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
        >
          {en.notFound.back}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {locales
            .filter((locale) => locale !== "en")
            .map((locale) => (
              <li key={locale} lang={locale}>
                <Link href={pathFor(locale, { type: "home" })} hrefLang={locale} className="underline-offset-4 hover:text-foreground hover:underline">
                  {localeInfo[locale].nativeName}: {getDictionary(locale).notFound.back}
                </Link>
              </li>
            ))}
        </ul>
      </body>
    </html>
  );
}
