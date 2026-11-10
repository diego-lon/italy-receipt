"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Locale } from "@/lib/i18n/config";
import { LanguageLinks } from "./language-switcher";

export interface NavLink {
  href: string;
  label: string;
}

export function MobileNav({
  locale,
  links,
  cta,
  labels,
}: {
  locale: Locale;
  links: NavLink[];
  cta: NavLink;
  labels: { openMenu: string; close: string; menu: string; mainNav: string; language: string };
}) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={labels.openMenu}>
          <Menu aria-hidden className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" closeLabel={labels.close} aria-describedby={undefined} className="w-[85vw]">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="text-base font-semibold">{labels.menu}</SheetTitle>
        </SheetHeader>
        <nav aria-label={labels.mainNav} className="px-3">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    className="flex rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <SheetFooter className="gap-5 border-t px-5 py-5">
          <div className="text-sm text-muted-foreground">
            <p className="mb-2 font-medium text-foreground">{labels.language}</p>
            <LanguageLinks locale={locale} label={labels.language} />
          </div>
          <SheetClose asChild>
            <Button asChild size="lg" className="h-11 w-full text-base">
              <Link href={cta.href}>
                {cta.label}
                <ArrowRight data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
