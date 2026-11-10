import type { ReactNode } from "react";
import { Calculator, Info, Lightbulb, TriangleAlert, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalloutType = "info" | "tip" | "warning" | "example";

const styles: Record<CalloutType, { icon: LucideIcon; box: string; title: string }> = {
  info: { icon: Info, box: "border-blue-200 bg-blue-50/70", title: "text-blue-700" },
  tip: { icon: Lightbulb, box: "border-emerald-200 bg-emerald-50/70", title: "text-emerald-800" },
  warning: { icon: TriangleAlert, box: "border-amber-200 bg-amber-50/80", title: "text-amber-800" },
  example: { icon: Calculator, box: "border-slate-200 bg-slate-50", title: "text-slate-800" },
};

export function Callout({
  type = "info",
  title,
  label,
  children,
}: {
  type?: CalloutType;
  title?: string;
  /** Fallback heading when the content doesn't set a title. */
  label: string;
  children: ReactNode;
}) {
  const style = styles[type] ?? styles.info;
  const Icon = style.icon;
  return (
    <aside role="note" className={cn("my-7 rounded-xl border px-5 py-4 text-[0.95em]", style.box)}>
      <p className={cn("not-prose mb-2 flex items-center gap-2 text-sm font-semibold", style.title)}>
        <Icon className="size-4 shrink-0" aria-hidden />
        {title ?? label}
      </p>
      <div className="*:first:mt-0 *:last:mb-0">{children}</div>
    </aside>
  );
}
