"use client";

import { createContext, useContext, type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { PdfLanguage } from "@/lib/pdf/strings";
import type { DerivedReceipt, FieldErrors, ValidationKey } from "@/lib/receipt";
import { cn } from "@/lib/utils";

export type GenerateAction = "download" | "preview";

export interface GeneratorContextValue {
  locale: Locale;
  intl: string;
  t: Dictionary["generator"];
  pdfLanguageLabels: Dictionary["pdfLanguages"];
  derived: DerivedReceipt;
  errors: FieldErrors;
  pdfLanguage: PdfLanguage;
  generate: (action: GenerateAction) => void;
  /** The action currently rendering a PDF, if any. */
  busy: GenerateAction | null;
}

const GeneratorContext = createContext<GeneratorContextValue | null>(null);

export const GeneratorProvider = GeneratorContext.Provider;

export function useGenerator() {
  const value = useContext(GeneratorContext);
  if (!value) throw new Error("useGenerator must be used inside <GeneratorProvider>");
  return value;
}

export function useErrorText(key: ValidationKey | undefined) {
  const { t } = useGenerator();
  return key ? t.validation[key] : undefined;
}

export interface ControlProps {
  id: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
}

export function Field({
  id,
  label,
  optional,
  help,
  error,
  className,
  children,
}: {
  id: string;
  label: ReactNode;
  optional?: boolean;
  help?: ReactNode;
  error?: string;
  className?: string;
  children: (control: ControlProps) => ReactNode;
}) {
  const { t } = useGenerator();
  const messageId = error ? `${id}-error` : help ? `${id}-help` : undefined;
  return (
    <div className={cn("grid content-start gap-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional ? <span className="font-normal text-muted-foreground">({t.optional})</span> : null}
      </Label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": messageId })}
      {error ? (
        <p id={messageId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : help ? (
        <p id={messageId} className="text-xs leading-relaxed text-muted-foreground">
          {help}
        </p>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  step,
  title,
  description,
  children,
}: {
  id: string;
  step: number;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="rounded-2xl border bg-card p-5 shadow-xs sm:p-6"
    >
      <div className="mb-5 flex items-start gap-3">
        <span
          aria-hidden
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
        >
          {step}
        </span>
        <div className="grid gap-0.5">
          <h3 id={`${id}-title`} className="text-base font-semibold leading-snug">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}
