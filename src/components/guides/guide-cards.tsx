import Link from "next/link";
import { ArrowRight, Briefcase, Clock, Earth, Gauge, LayoutTemplate, ReceiptText, type LucideIcon } from "lucide-react";
import type { ContentMeta } from "@/lib/content";
import { interpolate } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { pathFor, type GuideId } from "@/lib/routes";
import { cn } from "@/lib/utils";

const guideIcons: Record<GuideId, LucideIcon> = {
  "freelance-without-vat": Briefcase,
  "how-to-invoice": ReceiptText,
  "limit-5000": Gauge,
  "receipt-template": LayoutTemplate,
  foreigners: Earth,
};

export interface GuideSummary {
  id: GuideId;
  meta: ContentMeta;
}

/** Cards linking to guides; the whole card is clickable through the title link. */
export function GuideCards({
  locale,
  guides,
  labels,
  headingLevel: Heading = "h3",
  className,
}: {
  locale: Locale;
  guides: GuideSummary[];
  labels: { readGuide: string; minRead: string };
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {guides.map(({ id, meta }) => {
        const Icon = guideIcons[id];
        return (
          <li
            key={id}
            className="group relative flex flex-col rounded-2xl border bg-card p-6 shadow-xs transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md has-focus-visible:ring-3 has-focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon aria-hidden className="size-5" />
            </span>
            <Heading className="mt-5 text-lg leading-snug font-semibold text-foreground">
              <Link
                href={pathFor(locale, { type: "guide", id })}
                className="outline-none after:absolute after:inset-0 after:rounded-2xl group-hover:text-primary"
              >
                {meta.title}
              </Link>
            </Heading>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{meta.description}</p>
            <div className="mt-5 flex items-center justify-between text-sm">
              {meta.readingMinutes ? (
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock aria-hidden className="size-4" />
                  {interpolate(labels.minRead, { min: meta.readingMinutes })}
                </span>
              ) : (
                <span />
              )}
              <span aria-hidden className="flex items-center gap-1 font-medium text-primary">
                {labels.readGuide}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
