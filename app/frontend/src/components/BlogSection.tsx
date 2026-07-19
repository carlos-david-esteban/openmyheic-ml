import { useLanguage } from "@/i18n/LanguageContext";
import { blogManifest } from "@/lib/blogManifest.generated";

const MAX_POSTS = 6;

/**
 * "From the blog" section shown at the bottom of every home page (all 11
 * languages). Shows the most recent posts localized to the current language
 * if any exist (seo/content/<lang>/*.md), otherwise falls back to the
 * English posts (seo/content/*.md).
 *
 * Data comes from src/lib/blogManifest.generated.ts, generated at build time
 * by seo-scripts/generate-blog-manifest.js from the same markdown frontmatter
 * that seo-scripts/convert-blog-to-html.js turns into the real blog pages.
 * seo-scripts/prerender.js renders the same list server-side (blogSectionHtml)
 * so the prerendered HTML and this hydrated component always match.
 */
export default function BlogSection() {
  const { t, lang } = useLanguage();

  const localized = lang !== "en" ? blogManifest[lang] || [] : blogManifest.en || [];
  const usingFallback = lang !== "en" && localized.length === 0;
  const posts = usingFallback ? blogManifest.en || [] : localized;
  if (!posts.length) return null;

  const indexHref = usingFallback ? "/blog/" : lang === "en" ? "/blog/" : `/${lang}/blog/`;
  const top = posts.slice(0, MAX_POSTS);

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{t.blog.sectionTitle}</h2>
        <a href={indexHref} className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
          {t.blog.viewAllArticles} →
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top.map((post) => (
          <a
            key={post.path}
            href={post.path}
            className="block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-emerald-300 transition-all duration-200"
          >
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
            {post.date && (
              <p className="text-xs text-gray-400 mb-2">
                {new Date(`${post.date}T12:00:00Z`).toLocaleDateString(lang, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            {post.description && (
              <p className="text-sm text-gray-500 line-clamp-2">{post.description}</p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
