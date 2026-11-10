"use client";

import { Plus, Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDraft } from "@/lib/draft";
import { AmountInput } from "./controls";
import { Field, Section, useGenerator } from "./generator-context";

export function WorkSection() {
  const { t, errors } = useGenerator();
  const receipt = useDraft((state) => state.receipt);
  const items = useDraft((state) => state.items);
  const update = useDraft((state) => state.update);
  const updateItem = useDraft((state) => state.updateItem);
  const addItem = useDraft((state) => state.addItem);
  const removeItem = useDraft((state) => state.removeItem);
  const f = t.fields;
  const focusNewItem = useRef(false);

  useEffect(() => {
    if (!focusNewItem.current) return;
    focusNewItem.current = false;
    document.getElementById(`item-${items[items.length - 1]?.id}-description`)?.focus();
  }, [items]);

  return (
    <Section id="work" step={3} title={t.sections.work.title} description={t.sections.work.description}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field id="receipt-number" label={f.receiptNumber}>
          {(control) => (
            <Input
              {...control}
              autoComplete="off"
              placeholder={f.receiptNumberPlaceholder}
              value={receipt.number}
              onChange={(event) => update("receipt", { number: event.target.value })}
            />
          )}
        </Field>
        <Field id="receipt-date" label={f.date}>
          {(control) => (
            <Input
              {...control}
              type="date"
              value={receipt.date}
              onChange={(event) => update("receipt", { date: event.target.value })}
            />
          )}
        </Field>
        <Field id="receipt-place" label={f.place} optional>
          {(control) => (
            <Input
              {...control}
              autoComplete="address-level2"
              placeholder={f.placePlaceholder}
              value={receipt.place}
              onChange={(event) => update("receipt", { place: event.target.value })}
            />
          )}
        </Field>
      </div>

      <div className="grid gap-3" role="group" aria-labelledby="work-title">
        {items.map((item, index) => {
          const descriptionKey = errors.itemDescriptions[item.id];
          const amountKey = errors.itemAmounts[item.id] ?? (index === 0 ? errors.items : undefined);
          return (
            <div
              key={item.id}
              className="grid items-start gap-3 rounded-xl border bg-muted/30 p-3 sm:grid-cols-[1fr_11rem_auto] sm:border-0 sm:bg-transparent sm:p-0"
            >
              <Field
                id={`item-${item.id}-description`}
                label={f.itemDescription}
                error={descriptionKey ? t.validation[descriptionKey] : undefined}
              >
                {(control) => (
                  <Input
                    {...control}
                    autoComplete="off"
                    placeholder={f.itemDescriptionPlaceholder}
                    value={item.description}
                    onChange={(event) => updateItem(item.id, { description: event.target.value })}
                  />
                )}
              </Field>
              <Field
                id={`item-${item.id}-amount`}
                label={f.itemAmount}
                error={amountKey ? t.validation[amountKey] : undefined}
              >
                {(control) => (
                  <AmountInput
                    {...control}
                    placeholder="0,00"
                    value={item.amount}
                    onValueChange={(amount) => updateItem(item.id, { amount })}
                  />
                )}
              </Field>
              {items.length > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="justify-self-end text-muted-foreground hover:text-destructive sm:mt-6"
                  onClick={() => removeItem(item.id)}
                  aria-label={`${f.removeItem} ${index + 1}`}
                >
                  <Trash2 />
                </Button>
              ) : (
                <span className="hidden w-9 sm:block" aria-hidden />
              )}
            </div>
          );
        })}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="justify-self-start"
          onClick={() => {
            focusNewItem.current = true;
            addItem();
          }}
        >
          <Plus data-icon="inline-start" />
          {f.addItem}
        </Button>
      </div>
    </Section>
  );
}
