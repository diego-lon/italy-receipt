import type { Metadata } from "next";
import { SlugPage, slugMetadata, slugStaticParams } from "@/components/pages/slug-page";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return slugStaticParams("en");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return slugMetadata("en", (await params).slug);
}

export default async function EnglishSlugPage({ params }: Props) {
  return <SlugPage locale="en" slug={(await params).slug} />;
}
