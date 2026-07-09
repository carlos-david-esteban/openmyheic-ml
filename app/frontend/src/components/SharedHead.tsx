import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { LANGUAGES, buildLocalizedPath, getPathWithoutLang } from "@/i18n/config";

const SITE_URL = "https://openmyheic.com";

export default function SharedHead() {
  const location = useLocation();
  const pathWithoutLang = getPathWithoutLang(location.pathname);

  return (
    <Helmet>
      {/* hreflang tags for all language versions */}
      {LANGUAGES.map((lang) => {
        const localizedPath = buildLocalizedPath(pathWithoutLang, lang.code);
        const href = `${SITE_URL}${localizedPath || "/"}`;
        return (
          <link
            key={lang.code}
            rel="alternate"
            hrefLang={lang.code === "pt" ? "pt-BR" : lang.code}
            href={href}
          />
        );
      })}
      {/* x-default points to English version */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}${pathWithoutLang}`}
      />
    </Helmet>
  );
}