import type { Metadata } from "next";
import { HomePage, homeMetadata } from "@/components/pages/home-page";

export const metadata: Metadata = homeMetadata("en");

export default function EnglishHome() {
  return <HomePage locale="en" />;
}
