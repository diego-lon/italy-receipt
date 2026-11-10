import type { Metadata } from "next";
import { SlugPage, slugMetadata, slugStaticParams } from "@/components/pages/slug-page";
import { isLocale } from "@/lib/i18n/config";
import { localeFromParams } from "@/lib/i18n/params";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return isLocale(params.locale) ? slugStaticParams(params.locale) : [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return slugMetadata(await localeFromParams(params), (await params).slug);
}

export default async function LocaleSlugPage({ params }: Props) {
  return <SlugPage locale={await localeFromParams(params)} slug={(await params).slug} />;
}
