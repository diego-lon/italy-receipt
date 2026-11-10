"use client";

import { Calculator, ChevronRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useDraft } from "@/lib/draft";
import { interpolate } from "@/lib/i18n/interpolate";
import { grossForNet } from "@/lib/tax/engine";
import { centsToInput, formatEuro, parseAmountToCents } from "@/lib/tax/money";
import { AmountInput } from "./controls";
import { Field, useGenerator } from "./generator-context";

export function ReverseCalculator() {
  const { t, intl, derived } = useGenerator();
  const setSingleAmount = useDraft((state) => state.setSingleAmount);
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState("");
  const r = t.reverse;

  const targetCents = target.trim() === "" ? null : parseAmountToCents(target);
  const invalid = target.trim() !== "" && targetCents === null;
  const result = targetCents ? grossForNet(targetCents, derived.taxInput) : null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="rounded-xl border border-dashed">
      <CollapsibleTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="group/reverse h-auto w-full justify-start gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium"
        >
          <Calculator data-icon="inline-start" className="text-primary" />
          {r.trigger}
          <ChevronRight className="ml-auto text-muted-foreground transition-transform group-aria-expanded/reverse:rotate-90" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="grid gap-3 px-3.5 pb-3.5">
        <p className="text-xs leading-relaxed text-muted-foreground">{r.description}</p>
        <Field id="reverse-target" label={r.target} error={invalid ? t.validation.amount : undefined}>
          {(control) => <AmountInput {...control} placeholder="0,00" value={target} onValueChange={setTarget} />}
        </Field>
        {result && result.grossCents > 0 ? (
          <div className="grid gap-2 rounded-lg bg-accent/60 p-3" aria-live="polite">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm">{r.result}</span>
              <span className="text-lg font-bold tabular">{formatEuro(result.grossCents, intl)}</span>
            </div>
            {!result.exact ? (
              <p className="text-xs text-muted-foreground">
                {interpolate(r.inexact, { net: formatEuro(result.netCents, intl) })}
              </p>
            ) : null}
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => {
                setSingleAmount(centsToInput(result.grossCents, intl));
                toast.success(r.applied);
              }}
            >
              {r.apply}
            </Button>
          </div>
        ) : null}
      </CollapsibleContent>
    </Collapsible>
  );
}
