import en from "./locales/en.json";
import de from "./locales/de.json";
import ja from "./locales/ja.json";
import fr from "./locales/fr.json";
import pt from "./locales/pt.json";
import es from "./locales/es.json";
import ko from "./locales/ko.json";
import nl from "./locales/nl.json";
import sv from "./locales/sv.json";
import no from "./locales/no.json";
import da from "./locales/da.json";

export type TranslationData = typeof en;

const translations: Record<string, TranslationData> = {
  en,
  de,
  ja,
  fr,
  pt,
  es,
  ko,
  nl,
  sv,
  no,
  da,
};

export function getTranslations(lang: string): TranslationData {
  return translations[lang] || translations.en;
}

export { translations };