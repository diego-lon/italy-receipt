import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { generatorPath } from "@/lib/routes";
import { Callout, type CalloutType } from "./callout";

function GeneratorCta({ locale, t }: { locale: Locale; t: Dictionary["guidePage"] }) {
  return (
    <div className="not-prose my-8 flex flex-col gap-4 rounded-2xl border border-primary/20 bg-linear-to-br from-primary/10 to-primary/3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <p className="font-semibold text-foreground">{t.inlineCtaTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.inlineCtaText}</p>
      </div>
      <Button asChild size="lg" className="px-4">
        <Link href={generatorPath(locale)}>
          {t.inlineCtaButton}
          <ArrowRight data-icon="inline-end" aria-hidden />
        </Link>
      </Button>
    </div>
  );
}

function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} {...props}>
      {children}
    </a>
  );
}

/** Components available inside guide and legal MDX, bound to the page locale. */
export function mdxComponents(locale: Locale, dict: Dictionary): MDXComponents {
  const t = dict.guidePage;
  return {
    a: MdxLink,
    table: (props) => (
      <div className="my-7 overflow-x-auto">
        <table {...props} className="my-0" />
      </div>
    ),
    Callout: ({ type, title, children }: { type?: CalloutType; title?: string; children: ReactNode }) => (
      <Callout type={type} title={title} label={t.callouts[type ?? "info"]}>
        {children}
      </Callout>
    ),
    GeneratorCta: () => <GeneratorCta locale={locale} t={t} />,
  };
}
