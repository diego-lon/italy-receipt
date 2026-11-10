import "@/app/globals.css";
import { ConsentManager } from "@/components/consent/consent-manager";
import { Toaster } from "@/components/ui/sonner";
import { consentBootstrapScript } from "@/lib/consent";
import { jakarta, jakartaItalic } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { pathFor } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/** Document chrome shared by the English root layout and the localized one. */
export function SiteShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);
  return (
    <html lang={locale} data-scroll-behavior="smooth" className={cn(jakarta.variable, jakartaItalic.variable)}>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout markup, rendered from a shared component. */}
      <head>
        {/* Consent Mode defaults must exist before any Google tag can load. */}
        <script dangerouslySetInnerHTML={{ __html: consentBootstrapScript() }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-100 -translate-y-20 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
        >
          {dict.common.skipToContent}
        </a>
        <ConsentManager t={dict.consent} closeLabel={dict.common.close} privacyHref={pathFor(locale, { type: "privacy" })} />
        <SiteHeader locale={locale} dict={dict} />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
