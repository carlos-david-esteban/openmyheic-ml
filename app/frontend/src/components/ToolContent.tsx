import { useLanguage } from "@/i18n/LanguageContext";

interface Section {
  h2: string;
  p: string[];
}

/**
 * Renders the enriched on-page content block for a tool page (jpg, png, pdf,
 * webp, gif, bmp, viewer, batch). Reads t.toolContent[format] from i18n.
 * Mirrors the static HTML produced by seo-scripts/prerender.js (toolContentHtml).
 */
export default function ToolContent({ format }: { format: string }) {
  const { t } = useLanguage();
  const tc = (t as { toolContent?: Record<string, { sections: Section[] }> }).toolContent;
  const block = tc?.[format];
  if (!block?.sections?.length) return null;

  return (
    <section className="max-w-3xl mx-auto mb-12">
      {block.sections.map((s, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{s.h2}</h2>
          {s.p.map((para, j) => (
            <p key={j} className="text-gray-600 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      ))}
    </section>
  );
}
