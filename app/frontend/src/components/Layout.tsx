import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Shield, Menu, X, FileImage } from "lucide-react";
import { useState } from "react";
import SharedHead from "@/components/SharedHead";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE_NAME, SITE_URL, OG_IMAGE } from "@/lib/seo";
import { generateWebAppSchema, generateFAQSchema } from "@/lib/seo";

interface LayoutProps {
  children: ReactNode;
  format?: string;
  customSEO?: {
    title: string;
    description: string;
    canonical: string;
  };
  showSchemaWebApp?: boolean;
  showSchemaFAQ?: boolean;
}

export default function Layout({
  children,
  format = "home",
  customSEO,
  showSchemaWebApp = true,
  showSchemaFAQ = true,
}: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, lang, localizedPath } = useLanguage();

  // Use i18n meta for SEO
  const metaKey = format === "home" ? "home" : format;
  const metaData = (t.meta as Record<string, { title: string; description: string }>)[metaKey] || t.meta.home;
  const seo = customSEO || {
    title: metaData.title,
    description: metaData.description,
    canonical: `${SITE_URL}${localizedPath(format === "home" ? "/" : format === "batch" ? "/batch-convert" : format === "viewer" ? "/heic-viewer" : `/heic-to-${format}`)}`,
  };

  // FAQ from translations (per-page override with generic fallback)
  const faqPages = (t.faq as { pages?: Record<string, { question: string; answer: string }[]> }).pages;
  const faqs = faqPages?.[metaKey] || t.faq.items;

  const navLinks = [
    { href: localizedPath("/"), label: t.nav.heicToJpg },
    { href: localizedPath("/heic-to-png"), label: t.nav.png },
    { href: localizedPath("/heic-to-webp"), label: t.nav.webp },
    { href: localizedPath("/heic-to-pdf"), label: t.nav.pdf },
    { href: localizedPath("/heic-to-gif"), label: t.nav.gif },
    { href: localizedPath("/heic-to-bmp"), label: t.nav.bmp },
    { href: localizedPath("/batch-convert"), label: t.nav.batch },
    { href: localizedPath("/heic-viewer"), label: t.nav.viewer },
  ];

  const footerTools = [
    { href: localizedPath("/heic-to-jpg"), label: `${t.nav.heicToJpg}` },
    { href: localizedPath("/heic-to-png"), label: `HEIC ${t.nav.png}` },
    { href: localizedPath("/heic-to-webp"), label: `HEIC ${t.nav.webp}` },
    { href: localizedPath("/heic-to-pdf"), label: `HEIC ${t.nav.pdf}` },
    { href: localizedPath("/heic-to-gif"), label: `HEIC ${t.nav.gif}` },
    { href: localizedPath("/heic-to-bmp"), label: `HEIC ${t.nav.bmp}` },
    { href: localizedPath("/batch-convert"), label: t.nav.batch },
    { href: localizedPath("/heic-viewer"), label: t.footer.heicViewer },
  ];

  const footerResources = [
    { href: localizedPath("/what-is-heic"), label: t.footer.whatIsHeic },
    { href: localizedPath("/how-to-convert-heic-to-jpg-windows"), label: t.footer.convertOnWindows },
    { href: localizedPath("/how-to-convert-heic-to-jpg-mac"), label: t.footer.convertOnMac },
  ];

  const isActive = (href: string) => {
    return location.pathname === href || (href !== localizedPath("/") && location.pathname === href + "/");
  };

  return (
    <>
      <SharedHead />
      <Helmet>
        <html lang={lang} />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={seo.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={OG_IMAGE} />
        {showSchemaWebApp && format !== "home" && (
          <script type="application/ld+json">
            {JSON.stringify(generateWebAppSchema(format))}
          </script>
        )}
        {showSchemaFAQ && faqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(generateFAQSchema(faqs))}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen flex flex-col bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to={localizedPath("/")} className="flex items-center gap-2 text-emerald-600 font-bold text-xl">
                <FileImage className="w-6 h-6" />
                <span>{SITE_NAME}</span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <LanguageSwitcher />
              </nav>

              {/* Mobile: Language + Menu */}
              <div className="md:hidden flex items-center gap-1">
                <LanguageSwitcher />
                <button
                  className="p-2 text-gray-600"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
              <nav className="md:hidden pb-4 border-t border-gray-100 pt-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive(link.href)
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="max-w-[900px] mx-auto w-full">
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div>
                <Link to={localizedPath("/")} className="flex items-center gap-2 text-emerald-600 font-bold text-lg mb-3">
                  <FileImage className="w-5 h-5" />
                  <span>{SITE_NAME}</span>
                </Link>
                <p className="text-sm text-gray-500 mb-3">
                  {t.footer.tagline}
                </p>
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Shield className="w-4 h-4" />
                  <span>{t.footer.browserBased}</span>
                </div>
              </div>

              {/* Tools */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t.footer.conversionTools}</h3>
                <ul className="space-y-2">
                  {footerTools.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">{t.footer.resources}</h3>
                <ul className="space-y-2">
                  {footerResources.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href="/blog/"
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      {t.footer.blog}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to={localizedPath("/privacy-policy")}
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      {t.footer.privacyPolicy}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={localizedPath("/terms-of-use")}
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      {t.footer.termsOfUse}
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={localizedPath("/contact")}
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
                    >
                      {t.footer.contact}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>{t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
              <p className="mt-1">
                {t.footer.privacyNote}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}