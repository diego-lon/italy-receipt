"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { loadAdsense, loadGoogleAnalytics, useConsent, type ConsentChoice } from "@/lib/consent";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";

type ConsentStrings = Dictionary["consent"];

interface ConsentManagerProps {
  t: ConsentStrings;
  closeLabel: string;
  privacyHref: string;
}

const none: ConsentChoice = { analytics: false, ads: false };
const all: ConsentChoice = { analytics: true, ads: true };

/** Shows the consent banner/dialog and loads Google tags only for the categories the visitor allowed. */
export function ConsentManager(props: ConsentManagerProps) {
  const choice = useConsent((state) => state.choice);
  const init = useConsent((state) => state.init);

  useEffect(() => {
    if (site.consentProvider === "google-cmp") {
      // Google's certified CMP collects consent and updates Consent Mode itself.
      loadGoogleAnalytics();
      loadAdsense();
      return;
    }
    init();
  }, [init]);

  useEffect(() => {
    if (site.consentProvider !== "custom") return;
    if (choice?.analytics) loadGoogleAnalytics();
    if (choice?.ads) loadAdsense();
  }, [choice]);

  if (site.consentProvider !== "custom") return null;
  return (
    <>
      {choice === null && <ConsentBanner {...props} />}
      <ConsentSettings {...props} />
    </>
  );
}

function ConsentBanner({ t, privacyHref }: ConsentManagerProps) {
  const save = useConsent((state) => state.save);
  const setSettingsOpen = useConsent((state) => state.setSettingsOpen);
  const titleId = useId();
  const textId = useId();

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={textId}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border bg-background p-5 shadow-2xl shadow-slate-900/15 sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <div className="flex gap-4">
        <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
          <Cookie aria-hidden className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={titleId} className="text-base font-semibold text-foreground">
            {t.title}
          </h2>
          <p id={textId} className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {t.text}{" "}
            <Link href={privacyHref} className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
              {t.privacyLink}
            </Link>
          </p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
            <Button variant="ghost" onClick={() => setSettingsOpen(true)} className="sm:mr-auto">
              {t.customize}
            </Button>
            <Button onClick={() => save(none)} className="sm:min-w-32">
              {t.reject}
            </Button>
            <Button onClick={() => save(all)} className="sm:min-w-32">
              {t.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsentSettings({ t, closeLabel, privacyHref }: ConsentManagerProps) {
  const open = useConsent((state) => state.settingsOpen);
  const setSettingsOpen = useConsent((state) => state.setSettingsOpen);

  return (
    <Dialog open={open} onOpenChange={setSettingsOpen}>
      <DialogContent closeLabel={closeLabel} className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{t.settingsTitle}</DialogTitle>
          <DialogDescription className="leading-relaxed">
            {t.text}{" "}
            <Link
              href={privacyHref}
              onClick={() => setSettingsOpen(false)}
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
            >
              {t.privacyLink}
            </Link>
          </DialogDescription>
        </DialogHeader>
        {/* Mounted only while open, so the switches always start from the saved choice. */}
        <SettingsForm t={t} />
      </DialogContent>
    </Dialog>
  );
}

function SettingsForm({ t }: { t: ConsentStrings }) {
  const saved = useConsent((state) => state.choice);
  const save = useConsent((state) => state.save);
  const [draft, setDraft] = useState<ConsentChoice>(saved ?? none);

  return (
    <>
      <ul className="divide-y rounded-xl border">
        <CategoryRow title={t.categories.necessary.title} text={t.categories.necessary.text}>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium whitespace-nowrap text-muted-foreground">
            {t.alwaysOn}
          </span>
        </CategoryRow>
        {(["analytics", "ads"] as const).map((key) => (
          <CategoryRow key={key} title={t.categories[key].title} text={t.categories[key].text}>
            {(ids) => (
              <Switch
                checked={draft[key]}
                onCheckedChange={(checked) => setDraft((current) => ({ ...current, [key]: checked }))}
                aria-labelledby={ids.title}
                aria-describedby={ids.text}
              />
            )}
          </CategoryRow>
        ))}
      </ul>
      <DialogFooter className="gap-2 sm:justify-between">
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button variant="outline" onClick={() => save(none)}>
            {t.reject}
          </Button>
          <Button variant="outline" onClick={() => save(all)}>
            {t.accept}
          </Button>
        </div>
        <Button onClick={() => save(draft)}>{t.save}</Button>
      </DialogFooter>
    </>
  );
}

function CategoryRow({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children: React.ReactNode | ((ids: { title: string; text: string }) => React.ReactNode);
}) {
  const ids = { title: useId(), text: useId() };
  return (
    <li className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <p id={ids.title} className="text-sm font-semibold text-foreground">
          {title}
        </p>
        <p id={ids.text} className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {text}
        </p>
      </div>
      <div className="pt-0.5">{typeof children === "function" ? children(ids) : children}</div>
    </li>
  );
}
