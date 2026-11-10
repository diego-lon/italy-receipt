import { Plus } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

/** Native <details> keeps every answer in the static HTML (crawlable, works without JavaScript). */
export function Faq({ t }: { t: Dictionary["faq"] }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <SectionHeading id="faq-title" title={t.title} className="mx-auto text-center" />
      <div className="mt-10 divide-y rounded-2xl border bg-card shadow-xs">
        {t.items.map((item) => (
          <details key={item.q} name="faq" className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold text-foreground outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3>{item.q}</h3>
              <Plus
                aria-hidden
                className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45 motion-reduce:transition-none"
              />
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-muted-foreground sm:px-6">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function faqJsonLd(t: Dictionary["faq"]) {
  return {
    "@type": "FAQPage",
    mainEntity: t.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
