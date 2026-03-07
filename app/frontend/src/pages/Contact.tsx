import Layout from "@/components/Layout";
import { useLanguage } from "@/i18n/LanguageContext";
import { SITE_URL } from "@/lib/seo";
import { Mail, MessageSquare, Shield } from "lucide-react";

export default function Contact() {
  const { t, lang, localizedPath } = useLanguage();
  const c = t.contact;

  return (
    <Layout
      format="home"
      customSEO={{
        title: c.metaTitle,
        description: c.metaDescription,
        canonical: `${SITE_URL}${localizedPath("/contact")}`,
      }}
      showSchemaFAQ={false}
    >
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{c.title}</h1>
        <p className="text-gray-600 leading-relaxed mb-8">{c.introText}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">{c.emailTitle}</h2>
            </div>
            <p className="text-gray-600 text-sm mb-2">{c.emailText}</p>
            <a
              href="mailto:contact@openmyheic.com"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
            >
              contact@openmyheic.com
            </a>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900">{c.feedbackTitle}</h2>
            </div>
            <p className="text-gray-600 text-sm">{c.feedbackText}</p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-900">{c.privacyReminderTitle}</h2>
          </div>
          <p className="text-gray-600 text-sm">{c.privacyReminderText}</p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{c.responseTimeTitle}</h2>
          <p className="text-gray-600 leading-relaxed">{c.responseTimeText}</p>
        </div>
      </div>
    </Layout>
  );
}