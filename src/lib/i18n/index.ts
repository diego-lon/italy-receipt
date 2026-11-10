import type { Locale } from "./config";
import en, { type Dictionary } from "./dictionaries/en";
import it from "./dictionaries/it";
import es from "./dictionaries/es";
import fr from "./dictionaries/fr";
import de from "./dictionaries/de";

const dictionaries: Record<Locale, Dictionary> = { en, it, es, fr, de };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export { interpolate } from "./interpolate";
