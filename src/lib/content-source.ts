import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n/config";
import type { GuideId } from "./routes";
import { extractToc } from "./toc";

const contentRoot = path.join(process.cwd(), "src", "content");

/** Table of contents of a guide, read from its MDX source at build time (same English fallback as `loadGuide`). */
export function guideToc(id: GuideId, locale: Locale) {
  const localized = path.join(contentRoot, "guides", id, `${locale}.mdx`);
  const file = existsSync(localized) ? localized : path.join(contentRoot, "guides", id, "en.mdx");
  return extractToc(readFileSync(file, "utf8"));
}
