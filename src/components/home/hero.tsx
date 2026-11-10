import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Emphasis } from "@/components/site/emphasis";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { generatorPath, pathFor } from "@/lib/routes";
import { ReceiptMock } from "./receipt-mock";

export function Hero({ locale, t }: { locale: Locale; t: Dictionary["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[34rem] bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklab,var(--primary)_14%,transparent),transparent)]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:pt-20 lg:pb-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3 py-1 text-sm font-medium text-primary shadow-xs">
            <BadgeCheck aria-hidden className="size-4" />
            {t.badge}
          </p>
          <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            <Emphasis text={t.title} className="text-primary" />
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            <Emphasis text={t.subtitle} className="font-semibold text-foreground" />
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6 text-base shadow-lg shadow-primary/25">
              <Link href={generatorPath(locale)}>
                {t.cta}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 bg-white/70 px-6 text-base">
              <Link href={pathFor(locale, { type: "guides" })}>
                <BookOpen data-icon="inline-start" aria-hidden />
                {t.secondaryCta}
              </Link>
            </Button>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm font-medium text-foreground sm:flex sm:flex-wrap">
            {t.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check aria-hidden className="size-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ReceiptMock className="hidden lg:block" />
      </div>
    </section>
  );
}
