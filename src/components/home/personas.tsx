import { Building2, GraduationCap, Palette, Plane } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { SectionHeading } from "./section-heading";

const icons = [Palette, GraduationCap, Plane, Building2];

export function Personas({ t }: { t: Dictionary["personas"] }) {
  return (
    <section aria-labelledby="personas-title" className="border-y bg-white/70">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading id="personas-title" title={t.title} subtitle={t.subtitle} />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, index) => {
            const Icon = icons[index] ?? Palette;
            return (
              <li key={item.title}>
                <Icon aria-hidden className="size-6 text-primary" />
                <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
