import { Calculator, FileDown, PencilLine } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

const icons = [PencilLine, Calculator, FileDown];

export function HowItWorks({ t }: { t: Dictionary["howItWorks"] }) {
  return (
    <section id="how-it-works" aria-labelledby="how-it-works-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading id="how-it-works-title" title={t.title} subtitle={t.subtitle} />
      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {t.steps.map((step, index) => {
          const Icon = icons[index] ?? PencilLine;
          return (
            <li key={step.title} className="relative rounded-2xl border bg-card p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon aria-hidden className="size-5" />
                </span>
                <span aria-hidden className="text-5xl leading-none font-extrabold text-slate-100">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
