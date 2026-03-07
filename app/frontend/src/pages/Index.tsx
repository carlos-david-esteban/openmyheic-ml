import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import HeicConverter from "@/components/HeicConverter";
import { generateWebAppSchema, generateFAQSchema, SITE_NAME } from "@/lib/seo";
import {
  Shield,
  Zap,
  DollarSign,
  SlidersHorizontal,
  FileImage,
  Image as ImageIcon,
  FileText,
  Globe,
  Film,
  Layers,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

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

export default function HomePage() {
  const { t, localizedPath } = useLanguage();
  const faqs = t.faq.items;

  const formatCards = [
    {
      href: localizedPath("/heic-to-png"),
      icon: ImageIcon,
      label: t.formats.heicToPng,
      desc: t.formats.heicToPngDesc,
      color: "bg-blue-50 text-blue-600",
    },
    {
      href: localizedPath("/heic-to-pdf"),
      icon: FileText,
      label: t.formats.heicToPdf,
      desc: t.formats.heicToPdfDesc,
      color: "bg-red-50 text-red-600",
    },
    {
      href: localizedPath("/heic-to-webp"),
      icon: Globe,
      label: t.formats.heicToWebp,
      desc: t.formats.heicToWebpDesc,
      color: "bg-purple-50 text-purple-600",
    },
    {
      href: localizedPath("/heic-to-gif"),
      icon: Film,
      label: t.formats.heicToGif,
      desc: t.formats.heicToGifDesc,
      color: "bg-orange-50 text-orange-600",
    },
    {
      href: localizedPath("/heic-to-bmp"),
      icon: Layers,
      label: t.formats.heicToBmp,
      desc: t.formats.heicToBmpDesc,
      color: "bg-gray-100 text-gray-600",
    },
    {
      href: localizedPath("/batch-convert"),
      icon: FileImage,
      label: t.formats.batchConvert,
      desc: t.formats.batchConvertDesc,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const whyCards = [
    {
      icon: Shield,
      title: t.why.privateTitle,
      desc: t.why.privateDesc,
      color: "text-emerald-600",
    },
    {
      icon: Zap,
      title: t.why.speedTitle,
      desc: t.why.speedDesc,
      color: "text-yellow-500",
    },
    {
      icon: DollarSign,
      title: t.why.freeTitle,
      desc: t.why.freeDesc,
      color: "text-blue-600",
    },
    {
      icon: SlidersHorizontal,
      title: t.why.qualityTitle,
      desc: t.why.qualityDesc,
      color: "text-purple-600",
    },
  ];

  return (
    <Layout format="home" showSchemaWebApp={false}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateWebAppSchema("jpg"))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema(faqs))}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t.hero.title} <span className="text-emerald-600">{t.hero.titleHighlight}</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          {t.hero.subtitle}
        </p>
      </div>

      {/* Intro Paragraph */}
      <div className="mb-8 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {t.intro.home}
        </p>
      </div>

      {/* Main Converter */}
      <div className="mb-16">
        <HeicConverter format="jpg" />
      </div>

      {/* Format Cards Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {t.formats.moreFormats}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {formatCards.map((card) => (
            <Link
              key={card.href}
              to={card.href}
              className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-emerald-300 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                {card.label}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Use Our Converter */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {t.why.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {whyCards.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow"
            >
              <card.icon className={`w-8 h-8 ${card.color} mb-3`} />
              <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          {t.faq.title}
        </h2>
        <FAQSection faqs={faqs} />
      </section>
    </Layout>
  );
}