import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { blogPosts, generateHowToSchema, SITE_NAME } from "@/lib/seo";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getPathWithoutLang } from "@/i18n/config";

const pathToSlug: Record<string, string> = {
  "/what-is-heic": "what-is-heic",
  "/how-to-convert-heic-to-jpg-windows": "how-to-convert-heic-to-jpg-windows",
  "/how-to-convert-heic-to-jpg-mac": "how-to-convert-heic-to-jpg-mac",
};

function renderMarkdown(content: string): string {
  let html = content;

  html = html.replace(
    /```(\w+)?\n([\s\S]*?)```/g,
    '<pre class="bg-gray-900 text-green-400 rounded-lg p-4 overflow-x-auto my-4 text-sm"><code>$2</code></pre>'
  );

  html = html.replace(
    /`(.+?)`/g,
    '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm">$1</code>'
  );

  html = html.replace(
    /^## (.+)$/gm,
    '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>'
  );
  html = html.replace(
    /^### (.+)$/gm,
    '<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">$1</h3>'
  );
  html = html.replace(
    /^#### (.+)$/gm,
    '<h4 class="text-lg font-semibold text-gray-800 mt-6 mb-2">$1</h4>'
  );

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  html = html.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" class="text-emerald-600 hover:text-emerald-700 underline">$1</a>'
  );

  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match
      .split("|")
      .filter(Boolean)
      .map((c) => c.trim());
    if (cells.every((c) => /^[-:]+$/.test(c))) return "<!-- separator -->";
    const cellsHtml = cells
      .map(
        (c) =>
          `<td class="border border-gray-200 px-4 py-2 text-sm">${c}</td>`
      )
      .join("");
    return `<tr>${cellsHtml}</tr>`;
  });
  html = html.replace(/<!-- separator -->\n?/g, "");
  html = html.replace(
    /(<tr>[\s\S]*?<\/tr>\n?)+/g,
    '<div class="overflow-x-auto my-6"><table class="w-full border-collapse border border-gray-200 rounded-lg">$&</table></div>'
  );

  html = html.replace(/^- (.+)$/gm, '<li class="mb-1">$1</li>');
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="mb-1">$1</li>');
  html = html.replace(
    /(<li[\s\S]*?<\/li>\n?)+/g,
    '<ul class="list-disc pl-6 my-4 space-y-1 text-gray-600">$&</ul>'
  );

  html = html.replace(
    /^(?!<[hduptla\-!])(.*\S.*)$/gm,
    '<p class="text-gray-600 leading-relaxed mb-4">$1</p>'
  );

  return html;
}

export default function BlogPage() {
  const location = useLocation();
  const { t, localizedPath } = useLanguage();

  const cleanPath = getPathWithoutLang(location.pathname);
  const slug = pathToSlug[cleanPath] || "";
  const post = blogPosts[slug];

  if (!post) {
    return (
      <Layout
        customSEO={{
          title: `${t.blog.pageNotFound} | ${SITE_NAME}`,
          description: t.blog.pageNotFoundDesc,
          canonical: "",
        }}
        showSchemaWebApp={false}
        showSchemaFAQ={false}
      >
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.blog.pageNotFound}</h1>
          <p className="text-gray-500 mb-8">
            {t.blog.pageNotFoundDesc}
          </p>
          <Link
            to={localizedPath("/")}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.blog.backToHome}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      customSEO={{
        title: post.title,
        description: post.description,
        canonical: `https://openmyheic.com/${post.slug}`,
      }}
      showSchemaWebApp={false}
      showSchemaFAQ={false}
    >
      {post.schemaSteps && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(generateHowToSchema(post.h1, post.schemaSteps))}
          </script>
        </Helmet>
      )}

      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          to={localizedPath("/")}
          className="inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-700"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.blog.backToConverter}
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {post.h1}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{t.blog.updated}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{t.blog.readTime}</span>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* CTA */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {t.blog.readyToConvert}
          </h2>
          <p className="text-gray-600 mb-4">
            {t.blog.readyToConvertDesc}
          </p>
          <Link
            to={localizedPath("/")}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            {t.blog.openConverter}
          </Link>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {t.blog.relatedArticles}
          </h2>
          <div className="grid gap-3">
            {Object.values(blogPosts)
              .filter((p) => p.slug !== post.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={localizedPath(`/${p.slug}`)}
                  className="block p-4 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-colors"
                >
                  <p className="font-medium text-gray-900">{p.h1}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </Layout>
  );
}