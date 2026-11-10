import { describe, expect, it } from "vitest";
import { getDictionary } from ".";
import { locales } from "./config";
import en from "./dictionaries/en";

const placeholders = (text: string) => (text.match(/\{[a-zA-Z]+\}/g) ?? []).sort().join(" ");
const emphasis = (text: string) => (text.match(/\*/g) ?? []).length;

/** Lists every difference in shape, placeholders and emphasis markers compared with the English dictionary. */
function compare(reference: unknown, value: unknown, path: string, issues: string[]) {
  if (typeof reference === "string") {
    if (typeof value !== "string") return void issues.push(`${path}: expected a string`);
    if (!value.trim() && reference.trim()) issues.push(`${path}: empty`);
    if (placeholders(reference) !== placeholders(value)) issues.push(`${path}: placeholders differ`);
    if (emphasis(reference) !== emphasis(value)) issues.push(`${path}: *emphasis* markers differ`);
    return;
  }
  if (Array.isArray(reference)) {
    if (!Array.isArray(value) || value.length !== reference.length) {
      return void issues.push(`${path}: expected ${reference.length} items`);
    }
    reference.forEach((item, index) => compare(item, value[index], `${path}[${index}]`, issues));
    return;
  }
  if (reference && typeof reference === "object") {
    if (!value || typeof value !== "object") return void issues.push(`${path}: expected an object`);
    for (const key of Object.keys(value)) if (!(key in reference)) issues.push(`${path}.${key}: unknown key`);
    for (const [key, item] of Object.entries(reference)) {
      compare(item, (value as Record<string, unknown>)[key], `${path}.${key}`, issues);
    }
  }
}

describe.each(locales.filter((locale) => locale !== "en"))("%s dictionary", (locale) => {
  const dictionary = getDictionary(locale);

  it("matches the English structure, placeholders and emphasis", () => {
    const issues: string[] = [];
    compare(en, dictionary, locale, issues);
    expect(issues).toEqual([]);
  });

  it("is translated", () => {
    expect(dictionary).not.toBe(en);
    expect(dictionary.hero.title).not.toBe(en.hero.title);
    expect(dictionary.generator.title).not.toBe(en.generator.title);
  });
});
