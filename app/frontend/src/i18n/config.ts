export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  prefix: string; // URL prefix, empty for English
}

export const LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", prefix: "" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪", prefix: "/de" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", prefix: "/ja" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", prefix: "/fr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇧🇷", prefix: "/pt" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", prefix: "/es" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", prefix: "/ko" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱", prefix: "/nl" },
  { code: "sv", name: "Swedish", nativeName: "Svenska", flag: "🇸🇪", prefix: "/sv" },
  { code: "no", name: "Norwegian", nativeName: "Norsk", flag: "🇳🇴", prefix: "/no" },
  { code: "da", name: "Danish", nativeName: "Dansk", flag: "🇩🇰", prefix: "/da" },
];

export const DEFAULT_LANG = "en";

export const LANGUAGE_MAP = new Map(LANGUAGES.map((l) => [l.code, l]));

export const PREFIX_TO_LANG = new Map(
  LANGUAGES.map((l) => [l.prefix || "/", l.code])
);

export function getLangFromPath(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    const firstSeg = segments[0];
    const lang = LANGUAGES.find((l) => l.code === firstSeg && l.code !== "en");
    if (lang) return lang.code;
  }
  return DEFAULT_LANG;
}

export function getPathWithoutLang(pathname: string): string {
  const lang = getLangFromPath(pathname);
  if (lang === DEFAULT_LANG) return pathname;
  const prefix = `/${lang}`;
  if (pathname === prefix || pathname === `${prefix}/`) return "/";
  return pathname.slice(prefix.length) || "/";
}

export function buildLocalizedPath(path: string, langCode: string): string {
  const lang = LANGUAGE_MAP.get(langCode);
  if (!lang || langCode === DEFAULT_LANG) return path;
  if (path === "/") return lang.prefix;
  return `${lang.prefix}${path}`;
}

export function detectBrowserLanguage(): string {
  const browserLangs = navigator.languages || [navigator.language];
  for (const bl of browserLangs) {
    const code = bl.split("-")[0].toLowerCase();
    if (LANGUAGE_MAP.has(code)) return code;
  }
  return DEFAULT_LANG;
}