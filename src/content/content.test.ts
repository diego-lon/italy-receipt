import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createElement, Fragment, type ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { evaluate } from "@mdx-js/mdx";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { describe, expect, it } from "vitest";
import type { ContentMeta } from "@/lib/content";
import { locales, type Locale } from "@/lib/i18n/config";
import { guideIds, pathFor, slugPagesFor } from "@/lib/routes";
import { extractToc } from "@/lib/toc";

const contentDir = fileURLToPath(new URL(".", import.meta.url));

const documents = [...guideIds.map((id) => `guides/${id}`), "legal/privacy"];

const calloutTypes = new Set(["info", "tip", "warning", "example"]);

/** Stand-ins for the real MDX components that also validate their props. */
const components = {
  Callout({ type, title, children }: { type?: string; title?: string; children: ReactNode }) {
    if (type !== undefined && !calloutTypes.has(type)) throw new Error(`Unknown Callout type "${type}"`);
    if (title !== undefined && !title.trim()) throw new Error("Empty Callout title");
    return createElement("aside", null, children);
  },
  GeneratorCta(props: Record<string, unknown>) {
    if (Object.keys(props).length > 0) throw new Error("GeneratorCta takes no props");
    return createElement(Fragment);
  },
};

function internalPaths(locale: Locale) {
  const home = pathFor(locale, { type: "home" });
  return new Set([
    home,
    `${home}#generator`,
    `${home}#faq`,
    ...slugPagesFor(locale).map(({ page }) => pathFor(locale, page)),
  ]);
}

describe.each(locales)("%s content", (locale) => {
  const allowed = internalPaths(locale);

  it.each(documents)(`%s/${locale}.mdx`, async (document) => {
    const source = readFileSync(`${contentDir}${document}/${locale}.mdx`, "utf8");
    const mod = await evaluate(source, { ...runtime, remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] });
    const meta = mod.meta as ContentMeta;

    expect(meta.title.length, "meta.title length").toBeGreaterThanOrEqual(10);
    expect(meta.title.length, "meta.title length").toBeLessThanOrEqual(70);
    expect(meta.description.length, "meta.description length").toBeGreaterThanOrEqual(110);
    expect(meta.description.length, "meta.description length").toBeLessThanOrEqual(170);
    expect(meta.updated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(meta.readingMinutes).toBeGreaterThan(0);

    const html = renderToStaticMarkup(createElement(mod.default, { components }));
    expect(html, "the page template renders the H1").not.toContain("<h1");
    expect(html).toContain("<h2");

    const h2Ids = [...html.matchAll(/<h2 id="([^"]+)"/g)].map((match) => match[1]);
    expect(extractToc(source).map((entry) => entry.id), "table of contents ids").toEqual(h2Ids);

    const ids = new Set([...html.matchAll(/ id="([^"]+)"/g)].map((match) => match[1]));
    const anchors = [...html.matchAll(/href="#([^"]*)"/g)].map((match) => match[1]);
    expect(anchors.filter((id) => !ids.has(decodeURIComponent(id))), "in-page anchors").toEqual([]);

    const links = [...html.matchAll(/href="([^"]*)"/g)].map((match) => match[1].replaceAll("&amp;", "&"));
    const broken = links.filter((href) => {
      if (/^(https?:|mailto:)/.test(href)) return false;
      const path = href.includes("#") && !allowed.has(href) ? href.slice(0, href.indexOf("#")) : href;
      return !allowed.has(path);
    });
    expect(broken, `internal links must be existing /${locale} pages with a trailing slash`).toEqual([]);
  });
});
