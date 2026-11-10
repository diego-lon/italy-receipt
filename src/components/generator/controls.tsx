"use client";

import type { ComponentProps, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { centsToInput, parseAmountToCents } from "@/lib/tax/money";
import { cn } from "@/lib/utils";
import { useGenerator } from "./generator-context";

type AmountInputProps = Omit<ComponentProps<typeof Input>, "value" | "onChange" | "type"> & {
  value: string;
  onValueChange: (value: string) => void;
};

/** Free-text amount field: accepts "1.250,50", "1250.5"… and normalises the value on blur. */
export function AmountInput({ value, onValueChange, className, onBlur, ...props }: AmountInputProps) {
  const { intl } = useGenerator();
  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground"
      >
        €
      </span>
      <Input
        {...props}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        className={cn("pl-7 text-right tabular", className)}
        onChange={(event) => onValueChange(event.target.value)}
        onBlur={(event) => {
          const cents = parseAmountToCents(value);
          if (cents !== null) onValueChange(centsToInput(cents, intl));
          onBlur?.(event);
        }}
      />
    </div>
  );
}

export function SwitchRow({
  id,
  label,
  help,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: ReactNode;
  help?: ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border bg-muted/50 p-3.5">
      <div className="grid gap-1">
        <Label htmlFor={id} className="leading-snug">
          {label}
        </Label>
        {help ? (
          <p id={`${id}-help`} className="text-xs leading-relaxed text-muted-foreground">
            {help}
          </p>
        ) : null}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-describedby={help ? `${id}-help` : undefined}
        className="mt-0.5"
      />
    </div>
  );
}
