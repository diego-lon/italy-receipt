"use client";

import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatEuro } from "@/lib/tax/money";
import { cn } from "@/lib/utils";
import { useGenerator } from "./generator-context";

/** Sticky "net + Get PDF" bar for small screens, shown while the form is on screen but the summary isn't. */
export function MobileBar() {
  const { t, intl, derived, generate, busy } = useGenerator();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const form = document.getElementById("generator-form");
    const summary = document.getElementById("summary");
    if (!form || !summary) return;
    let formVisible = false;
    let summaryVisible = false;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === form) formVisible = entry.isIntersecting;
        if (entry.target === summary) summaryVisible = entry.isIntersecting;
      }
      setVisible(formVisible && !summaryVisible);
    });
    observer.observe(form);
    observer.observe(summary);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgb(15_23_42/0.25)] backdrop-blur transition-transform duration-200 motion-reduce:transition-none lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{t.mobileBar.net}</p>
          <p className="truncate text-xl font-extrabold tracking-tight tabular">
            {formatEuro(derived.tax.netCents, intl)}
          </p>
        </div>
        <Button
          type="button"
          size="lg"
          className="h-11 px-5 font-semibold"
          disabled={busy !== null}
          onClick={() => generate("download")}
        >
          {busy ? <Loader2 className="animate-spin" /> : <Download />}
          {t.mobileBar.cta}
        </Button>
      </div>
    </div>
  );
}
