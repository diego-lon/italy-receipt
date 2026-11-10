"use client";

import { Banknote, Landmark, Wallet, WalletCards, type LucideIcon } from "lucide-react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDraft, type PaymentMethod } from "@/lib/draft";
import { Field, Section, useGenerator } from "./generator-context";

const methodIcons: Record<PaymentMethod, LucideIcon> = {
  bank: Landmark,
  cash: Banknote,
  paypal: Wallet,
  other: WalletCards,
};

export function PaymentSection() {
  const { t } = useGenerator();
  const payment = useDraft((state) => state.payment);
  const notes = useDraft((state) => state.notes);
  const update = useDraft((state) => state.update);
  const setNotes = useDraft((state) => state.setNotes);
  const f = t.fields;
  const methods = Object.keys(f.paymentMethods) as PaymentMethod[];

  return (
    <Section id="payment" step={5} title={t.sections.payment.title} description={t.sections.payment.description}>
      <div className="grid gap-2">
        <p id="payment-method-label" className="text-sm font-medium">
          {f.paymentMethod}
        </p>
        <RadioGroupPrimitive.Root
          aria-labelledby="payment-method-label"
          value={payment.method}
          onValueChange={(value) => update("payment", { method: value as PaymentMethod })}
          className="flex flex-wrap gap-2"
        >
          {methods.map((method) => {
            const Icon = methodIcons[method];
            return (
              <RadioGroupPrimitive.Item
                key={method}
                value={method}
                className="inline-flex h-9 items-center gap-2 rounded-full border bg-card px-3.5 text-sm font-medium text-muted-foreground transition-colors outline-none hover:border-primary/40 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=checked]:border-primary data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
              >
                <Icon aria-hidden className="size-4" />
                {f.paymentMethods[method]}
              </RadioGroupPrimitive.Item>
            );
          })}
        </RadioGroupPrimitive.Root>
      </div>

      {payment.method !== "cash" ? (
        <Field id="payment-details" label={f.paymentDetails} optional>
          {(control) => (
            <Input
              {...control}
              autoComplete="off"
              spellCheck={false}
              placeholder={f.paymentDetailsPlaceholders[payment.method]}
              value={payment.details}
              onChange={(event) => update("payment", { details: event.target.value })}
            />
          )}
        </Field>
      ) : null}

      <Field id="notes" label={f.notes} optional>
        {(control) => (
          <Textarea
            {...control}
            rows={3}
            placeholder={f.notesPlaceholder}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        )}
      </Field>
    </Section>
  );
}
