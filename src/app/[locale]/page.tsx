import type { Metadata } from "next";
import { HomePage, homeMetadata } from "@/components/pages/home-page";
import { localeFromParams } from "@/lib/i18n/params";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return homeMetadata(await localeFromParams(params));
}

export default async function LocaleHome({ params }: Props) {
  return <HomePage locale={await localeFromParams(params)} />;
}
