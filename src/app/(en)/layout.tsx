import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/site/site-shell";
import { rootMetadata, viewport as sharedViewport } from "@/lib/metadata";

export const metadata: Metadata = rootMetadata("en");
export const viewport: Viewport = sharedViewport;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>;
}
