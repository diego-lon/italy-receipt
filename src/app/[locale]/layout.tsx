import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { nonDefaultLocales } from "@/lib/i18n/config";
import { localeFromParams } from "@/lib/i18n/params";
import { rootMetadata, viewport as sharedViewport } from "@/lib/metadata";

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export const dynamicParams = false;
export const viewport: Viewport = sharedViewport;

export function generateStaticParams() {
  return nonDefaultLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  return rootMetadata(await localeFromParams(params));
}

export default async function LocaleLayout({ children, params }: Props) {
  return <SiteShell locale={await localeFromParams(params)}>{children}</SiteShell>;
}
