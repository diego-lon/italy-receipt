"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/toc";
import { cn } from "@/lib/utils";

/** Id of the last heading scrolled past the sticky header. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(" ");

  useEffect(() => {
    const headings = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.25;
      let current: string | null = null;
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > threshold) break;
        current = heading.id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return active;
}

export function TocLinks({ entries, className }: { entries: TocEntry[]; className?: string }) {
  const active = useActiveHeading(entries.map((entry) => entry.id));
  return (
    <ol className={cn("border-l border-border", className)}>
      {entries.map((entry) => (
        <li key={entry.id}>
          <a
            href={`#${entry.id}`}
            aria-current={active === entry.id ? "location" : undefined}
            className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors hover:border-slate-300 hover:text-foreground aria-[current]:border-primary aria-[current]:font-medium aria-[current]:text-primary"
          >
            {entry.text}
          </a>
        </li>
      ))}
    </ol>
  );
}
