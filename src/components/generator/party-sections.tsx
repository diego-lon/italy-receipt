"use client";

import { Building2, Globe2, UserRound, type LucideIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useDraft } from "@/lib/draft";
import type { ClientType } from "@/lib/tax/engine";
import { Field, Section, useErrorText, useGenerator } from "./generator-context";

const clientTypeIcons: Record<ClientType, LucideIcon> = {
  "it-business": Building2,
  "it-private": UserRound,
  foreign: Globe2,
};

export function ProviderSection() {
  const { t, errors } = useGenerator();
  const provider = useDraft((state) => state.provider);
  const update = useDraft((state) => state.update);
  const nameError = useErrorText(errors.providerName);
  const f = t.fields;

  return (
    <Section id="provider" step={1} title={t.sections.provider.title} description={t.sections.provider.description}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="provider-name" label={f.fullName} error={nameError}>
          {(control) => (
            <Input
              {...control}
              autoComplete="name"
              placeholder={f.fullNamePlaceholder}
              value={provider.name}
              onChange={(event) => update("provider", { name: event.target.value })}
            />
          )}
        </Field>
        <Field id="provider-tax-code" label={f.taxCode} help={f.taxCodeHelp}>
          {(control) => (
            <Input
              {...control}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder={f.taxCodePlaceholder}
              className="uppercase placeholder:normal-case"
              value={provider.taxCode}
              onChange={(event) => update("provider", { taxCode: event.target.value })}
            />
          )}
        </Field>
      </div>
      <Field id="provider-address" label={f.address} optional>
        {(control) => (
          <Textarea
            {...control}
            rows={2}
            autoComplete="street-address"
            placeholder={f.addressPlaceholder}
            value={provider.address}
            onChange={(event) => update("provider", { address: event.target.value })}
          />
        )}
      </Field>
      <div className="flex items-start gap-3">
        <Checkbox
          id="provider-non-resident"
          checked={provider.nonResident}
          onCheckedChange={(checked) => update("provider", { nonResident: checked === true })}
          aria-describedby="provider-non-resident-help"
          className="mt-0.5"
        />
        <div className="grid gap-1">
          <Label htmlFor="provider-non-resident" className="leading-snug">
            {f.nonResident}
          </Label>
          <p id="provider-non-resident-help" className="text-xs leading-relaxed text-muted-foreground">
            {f.nonResidentHelp}
          </p>
        </div>
      </div>
    </Section>
  );
}

export function ClientSection() {
  const { t, errors } = useGenerator();
  const client = useDraft((state) => state.client);
  const update = useDraft((state) => state.update);
  const nameError = useErrorText(errors.clientName);
  const f = t.fields;
  const types = Object.keys(f.clientTypes) as ClientType[];

  return (
    <Section id="client" step={2} title={t.sections.client.title} description={t.sections.client.description}>
      <div className="grid gap-2">
        <p id="client-type-label" className="text-sm font-medium">
          {f.clientType}
        </p>
        <RadioGroup
          aria-labelledby="client-type-label"
          value={client.type}
          onValueChange={(value) => update("client", { type: value as ClientType })}
          className="grid gap-2 sm:grid-cols-3"
        >
          {types.map((type) => {
            const Icon = clientTypeIcons[type];
            return (
              <Label
                key={type}
                htmlFor={`client-type-${type}`}
                className="relative flex cursor-pointer flex-col items-start gap-1.5 rounded-xl border bg-card p-3.5 leading-normal font-normal transition-colors hover:border-primary/40 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
              >
                <span className="flex w-full items-center justify-between gap-2">
                  <Icon aria-hidden className="size-5 text-primary" />
                  <RadioGroupItem id={`client-type-${type}`} value={type} />
                </span>
                <span className="font-semibold">{f.clientTypes[type].label}</span>
                <span className="text-xs text-muted-foreground">{f.clientTypes[type].description}</span>
              </Label>
            );
          })}
        </RadioGroup>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="client-name" label={f.clientName} error={nameError}>
          {(control) => (
            <Input
              {...control}
              autoComplete="organization"
              placeholder={f.clientNamePlaceholder}
              value={client.name}
              onChange={(event) => update("client", { name: event.target.value })}
            />
          )}
        </Field>
        <Field
          id="client-tax-code"
          label={client.type === "foreign" ? f.clientTaxCodeForeign : f.clientTaxCode}
          optional={client.type !== "it-business"}
        >
          {(control) => (
            <Input
              {...control}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder={f.clientTaxCodePlaceholder}
              className="uppercase placeholder:normal-case"
              value={client.taxCode}
              onChange={(event) => update("client", { taxCode: event.target.value })}
            />
          )}
        </Field>
      </div>
      <Field id="client-address" label={f.clientAddress} optional>
        {(control) => (
          <Textarea
            {...control}
            rows={2}
            placeholder={f.clientAddressPlaceholder}
            value={client.address}
            onChange={(event) => update("client", { address: event.target.value })}
          />
        )}
      </Field>
    </Section>
  );
}
