import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLangFromPath, buildLocalizedPath, LANGUAGES, DEFAULT_LANG, type LanguageConfig } from "./config";
import { getTranslations, type TranslationData } from "./index";

interface LanguageContextType {
  lang: string;
  langConfig: LanguageConfig;
  t: TranslationData;
  languages: LanguageConfig[];
  localizedPath: (path: string) => string;
  switchLanguage: (langCode: string) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const lang = getLangFromPath(location.pathname);

  const value = useMemo(() => {
    const langConfig = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];
    const t = getTranslations(lang);

    const localizedPath = (path: string) => buildLocalizedPath(path, lang);

    const switchLanguage = (langCode: string) => {
      const currentPathWithoutLang = getPathWithoutLangFromLocation(location.pathname, lang);
      const newPath = buildLocalizedPath(currentPathWithoutLang, langCode);
      navigate(newPath || "/");
    };

    return { lang, langConfig, t, languages: LANGUAGES, localizedPath, switchLanguage };
  }, [lang, location.pathname, navigate]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

function getPathWithoutLangFromLocation(pathname: string, currentLang: string): string {
  if (currentLang === DEFAULT_LANG) return pathname;
  const prefix = `/${currentLang}`;
  if (pathname === prefix || pathname === `${prefix}/`) return "/";
  if (pathname.startsWith(prefix + "/")) return pathname.slice(prefix.length);
  return pathname;
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}