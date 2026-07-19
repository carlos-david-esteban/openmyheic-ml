/**
 * prerender.js — Static prerender (SSG) for openmyheic.com
 *
 * Runs AFTER `vite build`. Takes dist/index.html as template and generates
 * one static HTML file per route × language (14 routes × 11 languages = 154 URLs),
 * each with unique <title>, meta description, canonical, hreflang, OG tags,
 * JSON-LD (WebApplication + FAQPage / HowTo) and real localized content inside
 * <div id="root"> so crawlers (especially bingbot) see full HTML without JS.
 *
 * The React SPA takes over on load (createRoot().render() replaces the static
 * content with the identical client-rendered UI — same i18n strings).
 *
 * URLs are kept EXACTLY as the current router paths (no renames, no trailing slash).
 * Cloudflare Pages serves dist/<path>/index.html at /<path>.
 *
 * Usage: node seo-scripts/prerender.js   (cwd = app/frontend)
 */

import fs from "fs";
import path from "path";
import os from "os";
import { fileURLToPath, pathToFileURL } from "url";
import { buildSync } from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const SITE_URL = "https://openmyheic.com";
const OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;

// ---------------------------------------------------------------------------
// Load data
// ---------------------------------------------------------------------------

// Languages — MUST mirror src/i18n/config.ts
const LANGUAGES = [
  { code: "en", prefix: "", hreflang: "en" },
  { code: "de", prefix: "/de", hreflang: "de" },
  { code: "ja", prefix: "/ja", hreflang: "ja" },
  { code: "fr", prefix: "/fr", hreflang: "fr" },
  { code: "pt", prefix: "/pt", hreflang: "pt-BR" },
  { code: "es", prefix: "/es", hreflang: "es" },
  { code: "ko", prefix: "/ko", hreflang: "ko" },
  { code: "nl", prefix: "/nl", hreflang: "nl" },
  { code: "sv", prefix: "/sv", hreflang: "sv" },
  { code: "no", prefix: "/no", hreflang: "no" },
  { code: "da", prefix: "/da", hreflang: "da" },
];

const locales = {};
for (const l of LANGUAGES) {
  locales[l.code] = JSON.parse(
    fs.readFileSync(path.join(root, "src/i18n/locales", `${l.code}.json`), "utf-8")
  );
}

// blogPosts + generateHowToSchema live in src/lib/seo.ts (TypeScript, self-contained).
// Bundle it with esbuild to a temp ESM file and import it.
const tmpSeo = path.join(os.tmpdir(), `omh-seo-${Date.now()}.mjs`);
buildSync({
  entryPoints: [path.join(root, "src/lib/seo.ts")],
  outfile: tmpSeo,
  bundle: true,
  format: "esm",
  platform: "neutral",
});
const seoLib = await import(pathToFileURL(tmpSeo).href);
fs.unlinkSync(tmpSeo);
const { blogPosts, generateHowToSchema } = seoLib;

// Localized guide content (DE/JA/ES/FR/PT) lives in src/content/guides/<lang>.ts.
// Same esbuild trick as seo.ts ("import type" is stripped, so no alias needed).
const GUIDE_LANGS = ["de", "ja", "es", "fr", "pt"];
const localizedGuides = {};
for (const glang of GUIDE_LANGS) {
  const tmpGuide = path.join(os.tmpdir(), `omh-guides-${glang}-${Date.now()}.mjs`);
  buildSync({
    entryPoints: [path.join(root, "src/content/guides", `${glang}.ts`)],
    outfile: tmpGuide,
    bundle: true,
    format: "esm",
    platform: "neutral",
  });
  localizedGuides[glang] = (await import(pathToFileURL(tmpGuide).href)).default;
  fs.unlinkSync(tmpGuide);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escText = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function localizedPath(routePath, lang) {
  const l = LANGUAGES.find((x) => x.code === lang);
  if (!l || !l.prefix) return routePath;
  if (routePath === "/") return l.prefix;
  return `${l.prefix}${routePath}`;
}

function hreflangLinks(routePath) {
  const lines = LANGUAGES.map((l) => {
    const href = `${SITE_URL}${localizedPath(routePath, l.code) || "/"}`;
    return `    <link rel="alternate" hreflang="${l.hreflang}" href="${href}" />`;
  });
  lines.push(
    `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}${routePath === "/" ? "/" : routePath}" />`
  );
  return lines.join("\n");
}

// Guides form their own hreflang cluster: EN + the 5 localized languages only
// (the remaining languages serve EN content with canonical -> EN, so they are
// NOT alternates).
function guideHreflangLinks(routePath) {
  const cluster = LANGUAGES.filter((l) => l.code === "en" || GUIDE_LANGS.includes(l.code));
  const lines = cluster.map((l) => {
    const href = `${SITE_URL}${localizedPath(routePath, l.code) || "/"}`;
    return `    <link rel="alternate" hreflang="${l.hreflang}" href="${href}" />`;
  });
  lines.push(
    `    <link rel="alternate" hreflang="x-default" href="${SITE_URL}${routePath}" />`
  );
  return lines.join("\n");
}

// Very small markdown → HTML for blog content (mirrors BlogPage renderMarkdown closely enough for crawlers)
function md(content) {
  let html = String(content);
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>');
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-800 mt-8 mb-3">$1</h3>');
  html = html.replace(/^#### (.+)$/gm, '<h4 class="text-lg font-semibold text-gray-800 mt-6 mb-2">$1</h4>');
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-emerald-600 underline">$1</a>');
  html = html.replace(/^\|(.+)\|$/gm, (match) => {
    const cells = match.split("|").filter(Boolean).map((c) => c.trim());
    if (cells.every((c) => /^[-:]+$/.test(c))) return "";
    return `<tr>${cells.map((c) => `<td class="border border-gray-200 px-4 py-2 text-sm">${c}</td>`).join("")}</tr>`;
  });
  html = html.replace(/(<tr>[\s\S]*?<\/tr>\n?)+/g, '<table class="w-full border-collapse my-6">$&</table>');
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, '<ul class="list-disc pl-6 my-4 space-y-1 text-gray-600">$&</ul>');
  html = html.replace(/^(?!<[hduptla\-!])(.*\S.*)$/gm, '<p class="text-gray-600 leading-relaxed mb-4">$1</p>');
  return html;
}

// ---------------------------------------------------------------------------
// Static body builders (localized, reuse tailwind classes already in the CSS bundle)
// ---------------------------------------------------------------------------

function navHeader(lang) {
  const t = locales[lang];
  const links = [
    ["/heic-to-jpg", t.nav.heicToJpg],
    ["/heic-to-png", t.nav.png],
    ["/heic-to-webp", t.nav.webp],
    ["/heic-to-pdf", t.nav.pdf],
    ["/heic-to-gif", t.nav.gif],
    ["/heic-to-bmp", t.nav.bmp],
    ["/batch-convert", t.nav.batch],
    ["/heic-viewer", t.nav.viewer],
  ];
  return `<header class="border-b border-gray-200 bg-white"><div class="max-w-6xl mx-auto px-4"><div class="flex items-center justify-between h-16">
<a href="${localizedPath("/", lang) || "/"}" class="flex items-center gap-2 font-bold text-gray-900">OpenMyHEIC</a>
<nav class="hidden md:flex items-center gap-1">${links
    .map(([p, label]) => `<a href="${localizedPath(p, lang) || "/"}" class="px-3 py-2 text-sm text-gray-600">${escText(label)}</a>`)
    .join("")}</nav>
</div></div></header>`;
}

function footerHtml(lang) {
  const t = locales[lang];
  const tools = [
    ["/heic-to-jpg", t.nav.heicToJpg],
    ["/heic-to-png", `HEIC ${t.nav.png}`],
    ["/heic-to-webp", `HEIC ${t.nav.webp}`],
    ["/heic-to-pdf", `HEIC ${t.nav.pdf}`],
    ["/heic-to-gif", `HEIC ${t.nav.gif}`],
    ["/heic-to-bmp", `HEIC ${t.nav.bmp}`],
    ["/batch-convert", t.nav.batch],
    ["/heic-viewer", t.footer.heicViewer],
  ];
  const resources = [
    ["/what-is-heic", t.footer.whatIsHeic],
    ["/how-to-convert-heic-to-jpg-windows", t.footer.convertOnWindows],
    ["/how-to-convert-heic-to-jpg-mac", t.footer.convertOnMac],
  ];
  // Link to the localized blog index when that language has posts (seo/content/<lang>/)
  const localizedBlogDir = path.resolve(root, "seo", "content", lang);
  const hasLocalizedBlog = lang !== "en" && fs.existsSync(localizedBlogDir) &&
    fs.readdirSync(localizedBlogDir).some((f) => f.endsWith(".md"));
  const blogHref = hasLocalizedBlog ? `/${lang}/blog/` : "/blog/";
  const blogLink = `<li><a href="${blogHref}" class="text-sm text-gray-500">${escText(t.footer.blog || "Blog")}</a></li>`;
  const legal = [
    ["/privacy-policy", t.footer.privacyPolicy],
    ["/terms-of-use", t.footer.termsOfUse],
    ["/contact", t.footer.contact],
  ];
  const list = (items) =>
    items.map(([p, label]) => `<li><a href="${localizedPath(p, lang)}" class="text-sm text-gray-500">${escText(label)}</a></li>`).join("");
  const aboutLink = `<li><a href="/about" class="text-sm text-gray-500">About</a></li>`;
  return `<footer class="border-t border-gray-200 bg-gray-50 mt-16"><div class="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
<div><p class="font-bold text-gray-900 mb-2">OpenMyHEIC</p><p class="text-sm text-gray-500">${escText(t.footer.tagline || "")}</p></div>
<div><p class="font-semibold text-gray-900 mb-3">${escText(t.footer.conversionTools || "Tools")}</p><ul class="space-y-2">${list(tools)}</ul></div>
<div><p class="font-semibold text-gray-900 mb-3">${escText(t.footer.resources || "Resources")}</p><ul class="space-y-2">${list(resources)}${blogLink}${aboutLink}${list(legal)}</ul></div>
</div></footer>`;
}

function toolContentHtml(lang, key) {
  const t = locales[lang];
  const block = t.toolContent && t.toolContent[key];
  if (!block || !block.sections || !block.sections.length) return "";
  const renderSection = (sec) => {
    let out = `<div class="mb-8"><h2 class="text-2xl font-bold text-gray-900 mb-4">${escText(sec.h2)}</h2>`;
    out += (sec.p || []).map((para) => `<p class="text-gray-600 leading-relaxed mb-4">${escText(para)}</p>`).join("");
    if (sec.table && sec.table.headers && sec.table.rows) {
      out += `<div class="overflow-x-auto my-6">`;
      if (sec.table.caption) out += `<p class="text-sm font-medium text-gray-700 mb-2">${escText(sec.table.caption)}</p>`;
      out += `<table class="w-full border-collapse text-sm"><thead><tr>${sec.table.headers
        .map((h) => `<th class="border border-gray-200 bg-gray-50 px-3 py-2 text-left font-semibold text-gray-900">${escText(h)}</th>`)
        .join("")}</tr></thead><tbody>${sec.table.rows
        .map((row) => `<tr>${row.map((cell) => `<td class="border border-gray-200 px-3 py-2 text-gray-600 align-top">${escText(cell)}</td>`).join("")}</tr>`)
        .join("")}</tbody></table></div>`;
    }
    if (sec.list && sec.list.length) {
      out += `<ul class="list-disc pl-6 my-4 space-y-1 text-gray-600">${sec.list.map((it) => `<li>${escText(it)}</li>`).join("")}</ul>`;
    }
    out += (sec.pAfter || []).map((para) => `<p class="text-gray-600 leading-relaxed mb-4">${escText(para)}</p>`).join("");
    return out + `</div>`;
  };
  return `<section class="max-w-3xl mx-auto px-4 mt-12">${block.sections.map(renderSection).join("")}</section>`;
}

function faqHtml(lang, pageKey) {
  const t = locales[lang];
  const items = (t.faq.pages && t.faq.pages[pageKey]) || t.faq.items || [];
  if (!items.length) return "";
  return `<section class="max-w-3xl mx-auto px-4 mt-12"><h2 class="text-2xl font-bold text-gray-900 mb-6">${escText(t.faq.title)}</h2>
${items
    .map(
      (f) => `<div class="border border-gray-200 rounded-xl p-4 mb-3"><h3 class="font-medium text-gray-900 mb-2">${escText(f.question)}</h3><p class="text-gray-600 text-sm leading-relaxed">${escText(f.answer)}</p></div>`
    )
    .join("\n")}</section>`;
}

function formatsHtml(lang, excludeFormat) {
  const t = locales[lang];
  const f = t.formats || {};
  const entries = [
    ["jpg", "/heic-to-jpg", t.nav.heicToJpg, ""],
    ["png", "/heic-to-png", f.heicToPng, f.heicToPngDesc],
    ["pdf", "/heic-to-pdf", f.heicToPdf, f.heicToPdfDesc],
    ["webp", "/heic-to-webp", f.heicToWebp, f.heicToWebpDesc],
    ["gif", "/heic-to-gif", f.heicToGif, f.heicToGifDesc],
    ["bmp", "/heic-to-bmp", f.heicToBmp, f.heicToBmpDesc],
    ["batch", "/batch-convert", f.batchConvert, f.batchConvertDesc],
  ].filter(([key]) => key !== excludeFormat);
  return `<section class="max-w-4xl mx-auto px-4 mt-12"><h2 class="text-2xl font-bold text-gray-900 mb-6">${escText(f.moreFormats || "More formats")}</h2>
<ul class="grid md:grid-cols-3 gap-4">${entries
    .map(
      ([, p, label, desc]) =>
        `<li class="border border-gray-200 rounded-xl p-4"><a href="${localizedPath(p, lang)}" class="font-medium text-gray-900">${escText(label || p)}</a>${desc ? `<p class="text-sm text-gray-500 mt-1">${escText(desc)}</p>` : ""}</li>`
    )
    .join("")}</ul></section>`;
}

function legalBodyHtml(route, data) {
  const parts = [];
  if (data.lastUpdated) parts.push(`<p class="text-sm text-gray-500 mb-6">${escText(data.lastUpdated)}</p>`);
  if (data.introText && !data.introTitle) parts.push(`<p class="text-gray-600 leading-relaxed mb-4">${escText(data.introText)}</p>`);
  for (const k of Object.keys(data)) {
    if (k.endsWith("Title")) {
      const textKey = k.slice(0, -5) + "Text";
      if (data[textKey]) {
        parts.push(`<section class="mb-6"><h2 class="text-xl font-semibold text-gray-900 mb-2">${escText(data[k])}</h2><p class="text-gray-600 leading-relaxed">${escText(data[textKey])}</p></section>`);
      }
    }
  }
  if (route === "/contact") parts.push(`<p class="text-gray-600 mb-4"><a href="mailto:contact@openmyheic.com">contact@openmyheic.com</a></p>`);
  return `<div class="max-w-3xl mx-auto text-left">${parts.join("\n")}</div>`;
}

const LAST_UPDATED = "2026-07-19";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "OpenMyHEIC",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  email: "contact@openmyheic.com",
  founder: { "@type": "Person", name: "Carlos Esteban" },
};

function bylineHtml(lang) {
  const t = locales[lang];
  const c = t.common || {};
  const l = LANGUAGES.find((x) => x.code === lang) || LANGUAGES[0];
  const d = new Date(`${LAST_UPDATED}T12:00:00Z`).toLocaleDateString(l.hreflang, { year: "numeric", month: "long", day: "numeric" });
  return `<p class="text-xs text-gray-400 mt-3">${escText(c.byline || "By the OpenMyHEIC Editorial Team")} · ${escText(c.lastUpdated || "Last updated")}: ${escText(d)}</p>`;
}

function pageBody(lang, { h1, intro, extra = "", showFaq = true, excludeFormat = null, showFormats = true, pageKey = "home" }) {
  return `${navHeader(lang)}
<main class="max-w-6xl mx-auto px-4 py-10">
<div class="text-center mb-8"><h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">${escText(h1)}</h1>
<p class="text-gray-500 max-w-xl mx-auto">${escText(intro)}</p>
${showFormats ? bylineHtml(lang) : ""}</div>
${extra}
${showFormats ? formatsHtml(lang, excludeFormat) : ""}
${showFaq ? faqHtml(lang, pageKey) : ""}
</main>
${footerHtml(lang)}`;
}

// ---------------------------------------------------------------------------
// Route definitions
// ---------------------------------------------------------------------------

const FORMATS = ["jpg", "png", "webp", "bmp", "gif", "pdf"];
const BLOG_SLUGS = ["what-is-heic", "how-to-convert-heic-to-jpg-windows", "how-to-convert-heic-to-jpg-mac"];

function buildPages() {
  const pages = [];
  for (const l of LANGUAGES) {
    const lang = l.code;
    const t = locales[lang];

    // Home
    pages.push({
      route: "/",
      lang,
      title: t.meta.home.title,
      description: t.meta.home.description,
      canonical: `${SITE_URL}${localizedPath("/", lang) || "/"}`,
      hreflang: hreflangLinks("/"),
      schemas: [webAppSchema(lang, t.meta.home.description, `${SITE_URL}${localizedPath("/", lang) || "/"}`), faqSchema(lang, "home")],
      body: pageBody(lang, {
        h1: `${t.hero.title} ${t.hero.titleHighlight}`,
        intro: t.hero.subtitle,
        extra: `<div class="max-w-3xl mx-auto"><p class="text-gray-600 leading-relaxed mb-4">${escText(t.intro?.home || "")}</p><p class="text-gray-600 text-sm">${escText(t.converter?.privacyBadge || "")}</p></div>`,
      }),
    });

    // Format pages
    for (const fmt of FORMATS) {
      const route = `/heic-to-${fmt}`;
      const canonical = `${SITE_URL}${localizedPath(route, lang)}`;
      pages.push({
        route,
        lang,
        title: t.meta[fmt].title,
        description: t.meta[fmt].description,
        canonical,
        hreflang: hreflangLinks(route),
        schemas: [webAppSchema(lang, t.meta[fmt].description, canonical), faqSchema(lang, fmt)],
        body: pageBody(lang, {
          h1: t.convert.h1[fmt],
          intro: `${t.convert.formatDesc[fmt]} ${t.convert.freePrivateInstant || ""}`,
          extra: `<div class="max-w-3xl mx-auto"><p class="text-gray-600 text-sm">${escText(t.converter?.privacyBadge || "")}</p></div>${toolContentHtml(lang, fmt)}`,
          excludeFormat: fmt,
          pageKey: fmt,
        }),
      });
    }

    // Batch
    {
      const route = "/batch-convert";
      const canonical = `${SITE_URL}${localizedPath(route, lang)}`;
      pages.push({
        route,
        lang,
        title: t.meta.batch.title,
        description: t.meta.batch.description,
        canonical,
        hreflang: hreflangLinks(route),
        schemas: [webAppSchema(lang, t.meta.batch.description, canonical), faqSchema(lang, "batch")],
        body: pageBody(lang, { h1: t.batch.title, intro: t.batch.subtitle, extra: toolContentHtml(lang, "batch"), excludeFormat: "batch", pageKey: "batch" }),
      });
    }

    // HEIC Viewer
    {
      const route = "/heic-viewer";
      const canonical = `${SITE_URL}${localizedPath(route, lang)}`;
      pages.push({
        route,
        lang,
        title: t.meta.viewer.title,
        description: t.meta.viewer.description,
        canonical,
        hreflang: hreflangLinks(route),
        schemas: [webAppSchema(lang, t.meta.viewer.description, canonical), faqSchema(lang, "viewer")],
        body: pageBody(lang, {
          h1: t.viewer.h1,
          intro: `${t.viewer.intro} ${t.convert.freePrivateInstant || ""}`,
          extra: `<div class="max-w-3xl mx-auto"><h2 class="text-2xl font-bold text-gray-900 mb-4">${escText(t.viewer.aboutTitle)}</h2><p class="text-gray-600 leading-relaxed mb-4">${escText(t.viewer.aboutText1)}</p><p class="text-gray-600 leading-relaxed">${escText(t.viewer.aboutText2)}</p></div>${toolContentHtml(lang, "viewer")}`,
          pageKey: "viewer",
        }),
      });
    }

    // Guides: localized content + self-canonical for EN/DE/JA/ES/FR/PT;
    // the other languages keep EN content with canonical -> EN (mirrors the SPA).
    for (const slug of BLOG_SLUGS) {
      const localized = localizedGuides[lang] ? localizedGuides[lang][slug] : null;
      const post = localized || blogPosts[slug];
      if (!post) continue;
      const route = `/${slug}`;
      const selfCanonical = localized || lang === "en";
      pages.push({
        route,
        lang,
        title: post.title,
        description: post.description,
        canonical: selfCanonical ? `${SITE_URL}${localizedPath(route, lang)}` : `${SITE_URL}/${slug}`,
        hreflang: guideHreflangLinks(route),
        schemas: post.schemaSteps ? [generateHowToSchema(post.h1, post.schemaSteps)] : [],
        body: `${navHeader(lang)}
<main class="max-w-3xl mx-auto px-4 py-10"><article>
<h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">${escText(post.h1)}</h1>
${bylineHtml(lang)}
${md(post.content)}
</article></main>
${footerHtml(lang)}`,
      });
    }

    // Legal pages
    const legalDefs = [
      ["/privacy-policy", t.privacy],
      ["/terms-of-use", t.terms],
      ["/contact", t.contact],
    ];
    // About page (English only, linked from every footer)
    if (lang === "en") {
      const aboutBody = `${navHeader("en")}
<main class="max-w-3xl mx-auto px-4 py-10 text-left">
<h1 class="text-3xl font-bold text-gray-900 mb-6">About OpenMyHEIC</h1>
<section class="mb-8"><h2 class="text-xl font-semibold text-gray-900 mb-3">What this site is</h2>
<p class="text-gray-600 leading-relaxed mb-4">OpenMyHEIC is a free set of browser-based tools for working with HEIC photos — the format iPhones and iPads use by default since iOS 11. You can convert HEIC to JPG, PNG, PDF, WebP, GIF or BMP, convert whole batches at once, or simply view HEIC files that your computer refuses to open.</p>
<p class="text-gray-600 leading-relaxed mb-4">What makes it different is <strong>where</strong> the conversion happens: entirely on your own device. Your photos are decoded and converted by code running inside your browser tab (JavaScript and WebAssembly, based on the open-source libheif project). Nothing is uploaded, so there is no server storing your pictures, no upload wait, and no privacy trade-off. You can load the page, go offline, and it still works.</p></section>
<section class="mb-8"><h2 class="text-xl font-semibold text-gray-900 mb-3">Who is behind it</h2>
<p class="text-gray-600 leading-relaxed mb-4">OpenMyHEIC is an independent project built and maintained by <strong>Carlos Esteban</strong>, a web developer and publisher based in Spain, together with a small editorial team. It is not owned by a software corporation and has no app to sell you — the site is sustained by unobtrusive advertising, which is why every tool is free and unlimited.</p>
<p class="text-gray-600 leading-relaxed mb-4">The project started at home: Carlos&#39;s girlfriend shoots everything on her iPhone, while he is an Android user. Every batch of photos she shared arrived as HEIC files that his phone and his PC refused to open. The online fixes he found all meant uploading their personal photos to some unknown server — so he built a converter that never sees your files at all. That principle still drives every tool on this site.</p></section>
<section class="mb-8"><h2 class="text-xl font-semibold text-gray-900 mb-3">How we keep content accurate</h2>
<p class="text-gray-600 leading-relaxed mb-4">The guides in our <a href="/blog/" class="text-emerald-600">blog</a> and resource pages are written and reviewed by the OpenMyHEIC editorial team. Steps are verified on real devices (Windows 10 and 11, macOS, iOS and Android), and articles show the date they were last updated. When Apple or Microsoft change how HEIC behaves, we update the affected guides rather than leaving stale instructions online.</p>
<p class="text-gray-600 leading-relaxed mb-4">If you spot an error or something that no longer works, please tell us — corrections ship quickly because the site is small and independent.</p></section>
<section class="mb-8"><h2 class="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
<p class="text-gray-600 leading-relaxed mb-4">Questions, feedback or business inquiries: <a href="mailto:contact@openmyheic.com" class="text-emerald-600">contact@openmyheic.com</a>. You can also use the details on our <a href="/contact" class="text-emerald-600">contact page</a>. We usually reply within a couple of business days.</p></section>
</main>
${footerHtml("en")}`;
      pages.push({
        route: "/about",
        lang: "en",
        title: "About OpenMyHEIC — Who We Are & How This Site Works",
        description: "OpenMyHEIC is an independent, privacy-first HEIC converter built in Spain. Learn who runs it, how in-browser conversion works, and how we keep our guides accurate.",
        canonical: `${SITE_URL}/about`,
        hreflang: "",
        schemas: [{ "@context": "https://schema.org", "@type": "AboutPage", name: "About OpenMyHEIC", url: `${SITE_URL}/about` }],
        body: aboutBody,
      });
    }

    for (const [route, data] of legalDefs) {
      if (!data) continue;
      const canonical = `${SITE_URL}${localizedPath(route, lang)}`;
      pages.push({
        route,
        lang,
        title: data.metaTitle,
        description: data.metaDescription,
        canonical,
        hreflang: hreflangLinks(route),
        schemas: [],
        body: pageBody(lang, {
          h1: data.title,
          intro: data.metaDescription,
          extra: legalBodyHtml(route, data),
          showFaq: false,
          showFormats: false,
        }),
      });
    }
  }
  return pages;
}

function webAppSchema(lang, description, url) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "OpenMyHEIC",
    url,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    inLanguage: lang,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

function faqSchema(lang, pageKey) {
  const items = (locales[lang].faq?.pages && locales[lang].faq.pages[pageKey]) || locales[lang].faq?.items || [];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

// ---------------------------------------------------------------------------
// Template injection
// ---------------------------------------------------------------------------

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
if (!template.includes('<div id="root"></div>')) {
  console.error("✗ prerender: could not find <div id=\"root\"></div> in dist/index.html — aborting.");
  process.exit(1);
}

function renderPage(p) {
  let html = template;

  // <html lang>
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${p.lang}"`);

  // title + description
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escText(p.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${esc(p.description)}" />`
  );

  // OG / twitter
  html = html
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${esc(p.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${esc(p.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${esc(p.canonical)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${esc(p.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${esc(p.description)}" />`);

  // canonical + hreflang + JSON-LD before </head>
  const schemaTags = [...p.schemas, ORG_SCHEMA]
    .map((s) => `    <script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join("\n");
  const headExtra = `    <link rel="canonical" href="${esc(p.canonical)}" />\n${p.hreflang}\n${schemaTags}\n  </head>`;
  html = html.replace(/<\/head>/, headExtra);

  // Static content inside #root
  html = html.replace('<div id="root"></div>', `<div id="root">${p.body}</div>`);

  return html;
}

// ---------------------------------------------------------------------------
// Write files
// ---------------------------------------------------------------------------

// IMPORTANT: flat .html files (dist/fr/heic-to-jpg.html), NOT dir/index.html.
// Cloudflare Pages serves foo.html at /foo with HTTP 200; dir/index.html would
// 308-redirect /foo -> /foo/ and break the existing (indexed) URLs.
const pages = buildPages();
let count = 0;
for (const p of pages) {
  const urlPath = localizedPath(p.route, p.lang) || "/";
  const outFile =
    urlPath === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, `${urlPath.replace(/^\//, "")}.html`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, renderPage(p), "utf-8");
  count++;
}

// ---------------------------------------------------------------------------
// Real 404 page. Its presence at dist/404.html makes Cloudflare Pages return
// HTTP 404 for unmatched paths instead of the SPA index fallback (soft-404 fix).
// ---------------------------------------------------------------------------
{
  const body = `${navHeader("en")}
<main class="max-w-3xl mx-auto px-4 py-16 text-center">
<h1 class="text-4xl font-bold text-gray-900 mb-4">404 — Page not found</h1>
<p class="text-gray-600 mb-8">The page you are looking for does not exist or has moved. Try one of our tools instead:</p>
<ul class="space-y-2 mb-8"><li><a href="/heic-to-jpg" class="text-emerald-600">Convert HEIC to JPG</a></li><li><a href="/heic-to-png" class="text-emerald-600">Convert HEIC to PNG</a></li><li><a href="/heic-to-pdf" class="text-emerald-600">Convert HEIC to PDF</a></li><li><a href="/batch-convert" class="text-emerald-600">Batch convert HEIC files</a></li><li><a href="/heic-viewer" class="text-emerald-600">HEIC Viewer</a></li></ul>
<p class="text-gray-500"><a href="/" class="text-emerald-600">← Back to the home page</a></p>
</main>
${footerHtml("en")}`;
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>Page not found — OpenMyHEIC</title>`);
  html = html.replace(/<\/head>/, `    <meta name="robots" content="noindex" />\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  fs.writeFileSync(path.join(distDir, "404.html"), html, "utf-8");
  console.log("✓ prerender: 404.html written");
}

console.log(`✓ prerender: ${count} static pages written to dist/ (${LANGUAGES.length} languages)`);
