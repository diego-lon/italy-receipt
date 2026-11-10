import { describe, expect, it } from "vitest";
import { locales } from "./i18n/config";
import { languageAlternates, pageFromPath, pathFor, slugPagesFor } from "./routes";

describe("routes", () => {
  it("round-trips every page path in every locale", () => {
    for (const locale of locales) {
      const pages = [{ type: "home" as const }, ...slugPagesFor(locale).map(({ page }) => page)];
      for (const page of pages) {
        const path = pathFor(locale, page);
        expect(path).toMatch(/^\/.*\/$|^\/$/);
        expect(pageFromPath(path)).toEqual({ locale, page });
        expect(pageFromPath(path.replace(/\/$/, "") || "/")).toEqual({ locale, page });
      }
    }
  });

  it("keeps slugs unique within a locale", () => {
    for (const locale of locales) {
      const slugs = slugPagesFor(locale).map(({ slug }) => slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it("serves English at the root and rejects unknown paths", () => {
    expect(pathFor("en", { type: "home" })).toBe("/");
    expect(pathFor("it", { type: "home" })).toBe("/it/");
    expect(pageFromPath("/en/")).toEqual({ locale: "en", page: { type: "home" } });
    expect(pageFromPath("/it/guide/#faq")).toEqual({ locale: "it", page: { type: "guides" } });
    expect(pageFromPath("/fr/unknown/")).toBeNull();
    expect(pageFromPath("/xx/")).toBeNull();
    expect(pageFromPath("/it/guide/extra/")).toBeNull();
  });

  it("lists every locale plus x-default as alternates", () => {
    const alternates = languageAlternates({ type: "guide", id: "limit-5000" });
    expect(Object.keys(alternates).sort()).toEqual([...locales, "x-default"].sort());
    expect(alternates["x-default"]).toBe(alternates.en);
    expect(alternates.it).toBe("/it/limite-5000-euro-prestazione-occasionale/");
  });
});
