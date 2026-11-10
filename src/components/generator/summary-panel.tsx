"use client";

import { CircleAlert, Download, Eye, Info, Loader2, LockKeyhole, Stamp, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useDraft } from "@/lib/draft";
import { interpolate } from "@/lib/i18n/interpolate";
import { pdfLanguages, type PdfLanguage } from "@/lib/pdf/strings";
import { RULES } from "@/lib/tax/engine";
import { formatEuro, formatPercent } from "@/lib/tax/money";
import { cn } from "@/lib/utils";
import { useGenerator } from "./generator-context";
import { ReverseCalculator } from "./reverse-calculator";

function Row({ label, value, muted }: { label: ReactNode; value: ReactNode; muted?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("font-medium tabular whitespace-nowrap", muted && "text-muted-foreground")}>{value}</dd>
    </div>
  );
}

function Note({ icon, tone = "info", children }: { icon: ReactNode; tone?: "info" | "warning"; children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span
        aria-hidden
        className={cn(
          "mt-px shrink-0 [&_svg]:size-4",
          tone === "warning" ? "text-warning" : "text-primary",
        )}
      >
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}

export function SummaryPanel() {
  const { t, intl, derived, pdfLanguage, pdfLanguageLabels, generate, busy } = useGenerator();
  const setPdfLanguage = useDraft((state) => state.setPdfLanguage);
  const nonResident = useDraft((state) => state.provider.nonResident);
  const { tax } = derived;
  const s = t.summary;
  const euro = (cents: number) => formatEuro(cents, intl);
  const minus = (cents: number) => `−${euro(cents)}`;

  const withholdingLabel =
    tax.withholding.kind === "none"
      ? s.noWithholding
      : interpolate(tax.withholding.kind === "imposta" ? s.withholdingFinal : s.withholding, {
          rate: formatPercent(tax.withholding.rateBp, intl),
        });

  const hasAmount = tax.grossCents > 0;
  let inpsNote: ReactNode = null;
  if (hasAmount && !nonResident) {
    if (!tax.inps.thresholdExceeded) {
      inpsNote = (
        <Note icon={<TrendingUp />}>
          {interpolate(s.inpsBelow, { amount: euro(RULES.inpsThresholdCents - tax.inps.yearTotalCents) })}
        </Note>
      );
    } else {
      inpsNote = (
        <Note icon={<CircleAlert />} tone="warning">
          {tax.inps.applies
            ? interpolate(s.inpsAbove, { rate: formatPercent(tax.inps.rateBp, intl), base: euro(tax.inps.baseCents) })
            : s.inpsAboveOtherClient}
        </Note>
      );
    }
  }

  return (
    <aside
      id="summary"
      aria-labelledby="summary-title"
      className="grid gap-5 rounded-2xl border bg-card p-5 shadow-sm sm:p-6 lg:sticky lg:top-24"
    >
      <h3 id="summary-title" className="text-base font-semibold">
        {s.title}
      </h3>

      <dl className="grid gap-2.5 text-sm">
        <Row label={s.gross} value={euro(tax.grossCents)} />
        <Row
          label={withholdingLabel}
          value={tax.withholding.kind === "none" ? s.none : minus(tax.withholding.amountCents)}
          muted={tax.withholding.kind === "none"}
        />
        {tax.inps.workerCents > 0 ? <Row label={s.inpsWorker} value={minus(tax.inps.workerCents)} /> : null}
        {tax.stamp.chargedCents > 0 ? <Row label={s.stamp} value={`+${euro(tax.stamp.chargedCents)}`} /> : null}
      </dl>

      <div className="rounded-xl bg-primary px-4 py-3.5 text-primary-foreground">
        <p className="text-sm font-medium text-primary-foreground/85">{s.net}</p>
        <p className="text-3xl font-extrabold tracking-tight tabular">{euro(tax.netCents)}</p>
      </div>

      <div className="grid gap-1 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-muted-foreground">{s.clientCost}</span>
          <span className="font-semibold tabular whitespace-nowrap">{euro(tax.clientCostCents)}</span>
        </div>
        {tax.inps.clientCents > 0 ? (
          <p className="text-xs text-muted-foreground">
            {interpolate(s.clientInps, { amount: euro(tax.inps.clientCents) })}
          </p>
        ) : null}
      </div>

      <Separator />

      <ul className="grid gap-2.5 text-xs leading-relaxed text-muted-foreground">
        <Note icon={<Info />}>{s.reasons[tax.withholding.reason]}</Note>
        {inpsNote}
        {hasAmount ? (
          <Note icon={<Stamp />} tone={tax.stamp.required ? "warning" : "info"}>
            {tax.stamp.required ? s.stampRequired : s.stampNotRequired}
          </Note>
        ) : null}
      </ul>

      <ReverseCalculator />

      <div className="grid gap-1.5">
        <Label htmlFor="pdf-language">{t.fields.pdfLanguage}</Label>
        <Select value={pdfLanguage} onValueChange={(value) => setPdfLanguage(value as PdfLanguage)}>
          <SelectTrigger id="pdf-language" className="w-full">
            <SelectValue>{pdfLanguageLabels[pdfLanguage]}</SelectValue>
          </SelectTrigger>
          <SelectContent position="popper">
            {pdfLanguages.map((language) => (
              <SelectItem key={language} value={language}>
                {pdfLanguageLabels[language]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Button
          type="button"
          size="lg"
          className="h-12 text-base font-semibold shadow-sm"
          disabled={busy !== null}
          onClick={() => generate("download")}
        >
          {busy === "download" ? <Loader2 className="animate-spin" /> : <Download />}
          {busy === "download" ? t.actions.generating : t.actions.download}
        </Button>
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="h-11"
          disabled={busy !== null}
          onClick={() => generate("preview")}
        >
          {busy === "preview" ? <Loader2 className="animate-spin" /> : <Eye />}
          {busy === "preview" ? t.actions.generating : t.actions.preview}
        </Button>
      </div>

      <p className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
        <LockKeyhole aria-hidden className="mt-px size-3.5 shrink-0" />
        {t.privacyNote}
      </p>
    </aside>
  );
}
