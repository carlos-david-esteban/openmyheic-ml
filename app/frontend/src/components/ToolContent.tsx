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
const LAST_UPDATED = "2026-07-19";

export default function ToolContent({ format }: { format: string }) {
  const { t, lang } = useLanguage();
  const common = (t as { common?: { lastUpdated?: string; byline?: string } }).common;
  const updatedStr = new Date(LAST_UPDATED + "T12:00:00Z").toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric" });
  const tc = (t as { toolContent?: Record<string, { sections: Section[] }> }).toolContent;
  const block = tc?.[format];
  if (!block?.sections?.length) return null;

  return (
    <section className="max-w-3xl mx-auto mb-12">
      <p className="text-xs text-gray-400 mb-6">
        {common?.byline || "By the OpenMyHEIC Editorial Team"} · {common?.lastUpdated || "Last updated"}: {updatedStr}
      </p>
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
