import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE_URL } from "@/lib/seo";

export default function PrivacyPolicy() {
  const { t, lang, localizedPath } = useLanguage();
  const p = t.privacy;

  return (
    <Layout
      format="home"
      customSEO={{
        title: p.metaTitle,
        description: p.metaDescription,
        canonical: `${SITE_URL}${localizedPath("/privacy-policy")}`,
      }}
      showSchemaFAQ={false}
    >
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{p.title}</h1>
        <p className="text-sm text-gray-500 mb-8">{p.lastUpdated}</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{p.introTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{p.introText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{p.dataCollectionTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{p.dataCollectionText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{p.cookiesTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{p.cookiesText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{p.thirdPartyTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{p.thirdPartyText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{p.userRightsTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{p.userRightsText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{p.changesTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{p.changesText}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{p.contactTitle}</h2>
            <p className="text-gray-600 leading-relaxed">{p.contactText}</p>
          </section>
        </div>
      </div>
    </Layout>
  );
}