"use client";

import { Eraser, FilePlus2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trackEvent } from "@/lib/consent";
import { migrateLegacyStorage, useDraft } from "@/lib/draft";
import { localeInfo, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import {
  downloadBlob,
  openPreviewWindow,
  preloadPdfRenderer,
  receiptFileName,
  renderReceiptPdf,
  showBlobInWindow,
} from "@/lib/pdf/generate";
import { defaultPdfLanguage } from "@/lib/pdf/strings";
import { buildPdfData, deriveReceipt, todayIso, validateForPdf, type FieldErrors } from "@/lib/receipt";
import { site } from "@/lib/site";
import { GeneratorProvider, type GenerateAction, type GeneratorContextValue } from "./generator-context";
import { MobileBar } from "./mobile-bar";
import { ClientSection, ProviderSection } from "./party-sections";
import { PaymentSection } from "./payment-section";
import { SummaryPanel } from "./summary-panel";
import { TaxSection } from "./tax-section";
import { WorkSection } from "./work-section";

const noErrors: FieldErrors = { itemAmounts: {}, itemDescriptions: {} };

export interface GeneratorProps {
  locale: Locale;
  t: Dictionary["generator"];
  pdfLanguageLabels: Dictionary["pdfLanguages"];
  support: Dictionary["support"];
}

export function Generator({ locale, t, pdfLanguageLabels, support }: GeneratorProps) {
  const intl = localeInfo[locale].intl;
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState<GenerateAction | null>(null);
  const [focusRequest, setFocusRequest] = useState(0);
  const [clearOpen, setClearOpen] = useState(false);
  const busyRef = useRef(false);

  const provider = useDraft((state) => state.provider);
  const client = useDraft((state) => state.client);
  const items = useDraft((state) => state.items);
  const tax = useDraft((state) => state.tax);
  const pdfLanguage = useDraft((state) => state.pdfLanguage) ?? defaultPdfLanguage(locale);

  const derived = useMemo(() => deriveReceipt({ provider, client, items, tax }), [provider, client, items, tax]);
  // Before the first attempt only malformed values are flagged; afterwards missing fields too, live.
  const errors = useMemo(
    () => (submitted ? (validateForPdf({ provider, client }, derived) ?? noErrors) : derived.formatErrors),
    [submitted, provider, client, derived],
  );

  useEffect(() => {
    migrateLegacyStorage();
    let cancelled = false;
    void Promise.resolve(useDraft.persist.rehydrate()).finally(() => {
      if (!cancelled) useDraft.getState().fillDefaults(todayIso());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const hasAmount = derived.tax.grossCents > 0;
  useEffect(() => {
    if (!hasAmount) return;
    const timer = setTimeout(() => void preloadPdfRenderer(), 1500);
    return () => clearTimeout(timer);
  }, [hasAmount]);

  useEffect(() => {
    if (focusRequest === 0) return;
    const target = document.querySelector<HTMLElement>('#generator-form [aria-invalid="true"]');
    if (!target) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
  }, [focusRequest]);

  const generate = useCallback(
    async (action: GenerateAction) => {
      if (busyRef.current) return;
      const draft = useDraft.getState();
      const current = deriveReceipt(draft);
      setSubmitted(true);
      if (validateForPdf(draft, current)) {
        toast.error(t.validation.title);
        setFocusRequest((count) => count + 1);
        return;
      }

      // Must open synchronously within the click, before any await, or it will be blocked.
      const preview = action === "preview" ? openPreviewWindow(t.actions.generating) : null;
      if (action === "preview" && !preview) {
        toast.error(t.toasts.popupBlocked);
        return;
      }

      busyRef.current = true;
      setBusy(action);
      try {
        const language = draft.pdfLanguage ?? defaultPdfLanguage(locale);
        const data = buildPdfData(draft, current, language);
        const blob = await renderReceiptPdf(data);
        if (preview) showBlobInWindow(preview, blob);
        else downloadBlob(blob, receiptFileName(data));
        trackEvent("generate_pdf", {
          action,
          pdf_language: language,
          client_type: draft.client.type,
          items: data.items.length,
          has_inps: current.tax.inps.totalCents > 0,
          stamp: current.tax.stamp.required,
        });
        toast.success(t.toasts.ready, {
          description: support.text,
          duration: 10_000,
          action: {
            label: support.button,
            onClick: () => {
              trackEvent("support_click", { placement: "toast" });
              window.open(site.buyMeACoffeeUrl, "_blank", "noopener,noreferrer");
            },
          },
        });
      } catch (error) {
        console.error(error);
        preview?.close();
        toast.error(t.toasts.error);
      } finally {
        busyRef.current = false;
        setBusy(null);
      }
    },
    [locale, t, support],
  );

  const startNewReceipt = () => {
    const today = todayIso();
    useDraft.getState().newReceipt(today);
    useDraft.getState().fillDefaults(today);
    setSubmitted(false);
    toast.success(t.newReceiptDone);
  };

  const clearAll = () => {
    useDraft.getState().clearAll();
    useDraft.getState().fillDefaults(todayIso());
    setSubmitted(false);
    setClearOpen(false);
    toast.success(t.cleared);
  };

  const value = useMemo<GeneratorContextValue>(
    () => ({
      locale,
      intl,
      t,
      pdfLanguageLabels,
      derived,
      errors,
      pdfLanguage,
      generate: (action) => void generate(action),
      busy,
    }),
    [locale, intl, t, pdfLanguageLabels, derived, errors, pdfLanguage, generate, busy],
  );

  return (
    <GeneratorProvider value={value}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-1">
          <h2 id="generator-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t.title}
          </h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" size="sm" onClick={startNewReceipt}>
            <FilePlus2 data-icon="inline-start" />
            {t.newReceipt}
          </Button>
          <Dialog open={clearOpen} onOpenChange={setClearOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="ghost" size="sm" className="text-muted-foreground">
                <Eraser data-icon="inline-start" />
                {t.clearData}
              </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>{t.clearConfirmTitle}</DialogTitle>
                <DialogDescription>{t.clearConfirmText}</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    {t.cancel}
                  </Button>
                </DialogClose>
                <Button
                  type="button"
                  className="bg-destructive text-white hover:bg-destructive/90"
                  onClick={clearAll}
                >
                  {t.clearConfirmButton}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
        <form id="generator-form" noValidate onSubmit={(event) => event.preventDefault()} className="grid gap-5">
          <ProviderSection />
          <ClientSection />
          <WorkSection />
          <TaxSection />
          <PaymentSection />
        </form>
        <SummaryPanel />
      </div>
      <MobileBar />
    </GeneratorProvider>
  );
}
