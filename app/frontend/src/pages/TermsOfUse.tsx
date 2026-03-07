import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE_URL } from "@/lib/seo";

export default function TermsOfUse() {
  const { t, lang, localizedPath } = useLanguage();
  const terms = t.terms;

  return (
    <Layout
      format="home"
      customSEO={{
        title: terms.metaTitle,
        description: terms.metaDescription,
        canonical: `${SITE_URL}${localizedPath("/terms-of-use")}`,
      }}
      showSchemaFAQ={false}
    >
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{terms.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{terms.lastUpdated}</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{terms.acceptanceTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{terms.acceptanceText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{terms.serviceTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{terms.serviceText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{terms.usageTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{terms.usageText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{terms.intellectualPropertyTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{terms.intellectualPropertyText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{terms.limitationTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{terms.limitationText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{terms.disclaimerTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{terms.disclaimerText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{terms.changesTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{terms.changesText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{terms.governingLawTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{terms.governingLawText}</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}