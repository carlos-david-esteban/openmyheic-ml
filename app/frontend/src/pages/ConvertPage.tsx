import { useLocation, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import HeicConverter from "@/components/HeicConverter";
import ToolContent from "@/components/ToolContent";
import { formatInfo } from "@/lib/seo";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getPathWithoutLang } from "@/i18n/config";

function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const pathToFormat: Record<string, string> = {
  "/heic-to-jpg": "jpg",
  "/heic-to-png": "png",
  "/heic-to-webp": "webp",
  "/heic-to-bmp": "bmp",
  "/heic-to-gif": "gif",
  "/heic-to-pdf": "pdf",
};

export default function ConvertPage() {
  const location = useLocation();
  const { t, localizedPath } = useLanguage();

  const cleanPath = getPathWithoutLang(location.pathname);
  const format = pathToFormat[cleanPath] || "jpg";
  const isMultiFile = format === "pdf";

  const h1 = (t.convert.h1 as Record<string, string>)[format] || t.convert.h1.jpg;
  const formatDesc = (t.convert.formatDesc as Record<string, string>)[format] || t.convert.formatDesc.jpg;
  const faqPages = (t.faq as { pages?: Record<string, { question: string; answer: string }[]> }).pages;
  const faqs = faqPages?.[format] || t.faq.items;

  const otherFormats = Object.entries(formatInfo)
    .filter(([key]) => key !== format)
    .map(([key, val]) => ({
      href: localizedPath(`/heic-to-${key}`),
      label: `HEIC → ${val.label}`,
    }));

  return (
    <Layout format={format}>
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          {h1}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {formatDesc} {t.convert.freePrivateInstant}
        </p>
      </div>

      {/* Converter */}
      <div className="mb-12">
        <HeicConverter format={format} allowMultiple={isMultiFile} />
      </div>

      {/* Enriched content */}
      <ToolContent format={format} />

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          {t.faq.title}
        </h2>
        <FAQSection faqs={faqs} />
      </section>

      {/* Internal Links */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {t.formats.otherTools}
        </h2>
        <div className="flex flex-wrap gap-2">
          {otherFormats.map((f) => (
            <Link
              key={f.href}
              to={f.href}
              className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm text-gray-600 transition-colors"
            >
              {f.label}
            </Link>
          ))}
          <Link
            to={localizedPath("/batch-convert")}
            className="px-4 py-2 bg-gray-100 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm text-gray-600 transition-colors"
          >
            {t.formats.batchConvert}
          </Link>
        </div>
      </section>
    </Layout>
  );
}