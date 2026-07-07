import fs from "fs";
import path from "path";

const baseUrl = "https://openmyheic.com";
const distDir = "./dist";
const outFile = "./dist/sitemap.xml";
const contentDir = "./seo/content";

function collectHtmlFiles(dir, basePath = "") {
  const results = [];

  if (!fs.existsSync(dir)) {
    return results;
  }

  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat && stat.isDirectory()) {
      const subPath = path.join(basePath, file);
      results.push(...collectHtmlFiles(full, subPath));
    } else if (file.endsWith('.html')) {
      const relativePath = path.join(basePath, file).replace(/\\/g, '/');
      let url = `${baseUrl}${relativePath.startsWith('/') ? '' : '/'}${relativePath}`;

      // If it's index.html, remove filename and keep directory path (ending with /)
      if (file === 'index.html') {
        url = url.replace(/\/index\.html$/, '/');
      }

      let lastmod = stat.mtime.toISOString();

      // Use markdown file's mtime for blog posts (HTML is regenerated each build)
      if (basePath.includes('/blog') && file === 'index.html') {
        const pathParts = relativePath.split('/');
        const slug = pathParts[pathParts.length - 2];

        if (slug && slug !== 'blog') {
          const mdPath = path.join(contentDir, `${slug}.md`);
          if (fs.existsSync(mdPath)) {
            const mdStat = fs.statSync(mdPath);
            lastmod = mdStat.mtime.toISOString();
          }
        }
      }

      results.push({ url, lastmod });
    }
  });

  return results;
}

// Collect all HTML files
const urls = [];

// Collect HTML files in blog directory
const blogDir = path.join(distDir, "blog");
if (fs.existsSync(blogDir)) {
  const blogUrls = collectHtmlFiles(blogDir, "/blog");
  urls.push(...blogUrls);
}

// Collect HTML files in other directories (if any)
const seoDir = path.join(distDir, "seo");
if (fs.existsSync(seoDir)) {
  const seoUrls = collectHtmlFiles(seoDir, "/seo");
  urls.push(...seoUrls);
}

// Base: the hand-maintained static sitemap (public/sitemap.xml) with all app
// routes + hreflang. We only APPEND blog/seo URLs generated at build time.
const staticSitemapPath = "./public/sitemap.xml";
let xml;

if (fs.existsSync(staticSitemapPath)) {
  const staticXml = fs.readFileSync(staticSitemapPath, "utf-8");
  let blogXml = "";
  urls.forEach(item => {
    blogXml += `  <url>\n`;
    blogXml += `    <loc>${item.url}</loc>\n`;
    blogXml += `    <lastmod>${item.lastmod}</lastmod>\n`;
    blogXml += `  </url>\n`;
  });
  xml = staticXml.replace(/<\/urlset>\s*$/, blogXml + "</urlset>");
} else {
  // Fallback: generate from scratch (home + blog)
  if (fs.existsSync(path.join(distDir, "index.html"))) {
    const stat = fs.statSync(path.join(distDir, "index.html"));
    urls.unshift({ url: baseUrl + "/", lastmod: stat.mtime.toISOString() });
  }
  xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  urls.forEach(item => {
    xml += `  <url>\n    <loc>${item.url}</loc>\n    <lastmod>${item.lastmod}</lastmod>\n  </url>\n`;
  });
  xml += `</urlset>`;
}

fs.writeFileSync(outFile, xml, "utf-8");

console.log(`\u2713 sitemap.xml generated (static routes + ${urls.length} blog/seo URL(s))`);
