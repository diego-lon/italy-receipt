"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { useDraft } from "@/lib/draft";
import { AmountInput, SwitchRow } from "./controls";
import { Field, Section, useErrorText, useGenerator } from "./generator-context";

export function TaxSection() {
  const { t, errors, derived } = useGenerator();
  const tax = useDraft((state) => state.tax);
  const clientType = useDraft((state) => state.client.type);
  const update = useDraft((state) => state.update);
  const priorError = useErrorText(errors.priorYearGross);
  const rateError = useErrorText(errors.customRate);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const f = t.fields;
  const { inps, stamp } = derived.tax;
  // An active override stays visible so it can't be forgotten.
  const advancedVisible = advancedOpen || tax.customRate.trim() !== "";

  return (
    <Section id="taxes" step={4} title={t.sections.taxes.title} description={t.sections.taxes.description}>
      <Field id="tax-prior" label={f.priorYearGross} help={f.priorYearGrossHelp} error={priorError} optional>
        {(control) => (
          <AmountInput
            {...control}
            placeholder="0,00"
            className="sm:max-w-56"
            value={tax.priorYearGross}
            onValueChange={(priorYearGross) => update("tax", { priorYearGross })}
          />
        )}
      </Field>

      {inps.applies && inps.thresholdExceeded ? (
        <SwitchRow
          id="tax-inps-reduced"
          label={f.inpsReduced}
          help={f.inpsReducedHelp}
          checked={tax.inpsReduced}
          onCheckedChange={(inpsReduced) => update("tax", { inpsReduced })}
        />
      ) : null}

      {stamp.required ? (
        <div className="grid gap-4">
          <SwitchRow
            id="tax-stamp-charged"
            label={f.stampCharged}
            help={f.stampChargedHelp}
            checked={tax.stampCharged}
            onCheckedChange={(stampCharged) => update("tax", { stampCharged })}
          />
          <Field id="tax-stamp-id" label={f.stampId} optional>
            {(control) => (
              <Input
                {...control}
                inputMode="numeric"
                autoComplete="off"
                className="sm:max-w-72"
                placeholder={f.stampIdPlaceholder}
                value={tax.stampId}
                onChange={(event) => update("tax", { stampId: event.target.value })}
              />
            )}
          </Field>
        </div>
      ) : null}

      {clientType === "it-business" ? (
        <Collapsible open={advancedVisible} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="ghost" size="sm" className="group/advanced -ml-2 text-muted-foreground">
              <ChevronRight
                data-icon="inline-start"
                className="transition-transform group-aria-expanded/advanced:rotate-90"
              />
              {t.advanced}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <Field id="tax-custom-rate" label={f.customRate} help={f.customRateHelp} error={rateError}>
              {(control) => (
                <Input
                  {...control}
                  inputMode="decimal"
                  autoComplete="off"
                  className="sm:max-w-40"
                  placeholder={f.customRatePlaceholder}
                  value={tax.customRate}
                  onChange={(event) => update("tax", { customRate: event.target.value })}
                />
              )}
            </Field>
          </CollapsibleContent>
        </Collapsible>
      ) : null}
    </Section>
  );
}
