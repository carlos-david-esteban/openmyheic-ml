import Layout from "@/components/Layout";
import { SITE_URL } from "@/lib/seo";
import { Link } from "react-router-dom";

/**
 * About page — English only (single URL /about, linked from the footer of
 * every language). Establishes who is behind the site (E-E-A-T).
 */
export default function About() {
  return (
    <Layout
      format="home"
      customSEO={{
        title: "About OpenMyHEIC — Who We Are & How This Site Works",
        description:
          "OpenMyHEIC is an independent, privacy-first HEIC converter built in Spain. Learn who runs it, how in-browser conversion works, and how we keep our guides accurate.",
        canonical: `${SITE_URL}/about`,
      }}
      showSchemaFAQ={false}
      showSchemaWebApp={false}
    >
      <div className="max-w-3xl mx-auto py-8 text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About OpenMyHEIC</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">What this site is</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            OpenMyHEIC is a free set of browser-based tools for working with HEIC photos — the
            format iPhones and iPads use by default since iOS 11. You can convert HEIC to JPG,
            PNG, PDF, WebP, GIF or BMP, convert whole batches at once, or simply view HEIC files
            that your computer refuses to open.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            What makes it different is <strong>where</strong> the conversion happens: entirely on
            your own device. Your photos are decoded and converted by code running inside your
            browser tab (JavaScript and WebAssembly, based on the open-source libheif project).
            Nothing is uploaded, so there is no server storing your pictures, no upload wait, and
            no privacy trade-off. You can load the page, go offline, and it still works.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Who is behind it</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            OpenMyHEIC is an independent project built and maintained by{" "}
            <strong>Carlos Esteban</strong>, a web developer and publisher based in Spain, together
            with a small editorial team. It is not owned by a software corporation and has no app
            to sell you — the site is sustained by unobtrusive advertising, which is why every
            tool is free and unlimited.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            The project started at home: Carlos's girlfriend shoots everything on her iPhone,
            while he is an Android user. Every batch of photos she shared arrived as HEIC files
            that his phone and his PC refused to open. The online fixes he found all meant
            uploading their personal photos to some unknown server — so he built a converter that
            never sees your files at all. That principle still drives every tool on this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How we keep content accurate</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The guides in our <a href="/blog/" className="text-emerald-600 hover:underline">blog</a>{" "}
            and resource pages are written and reviewed by the OpenMyHEIC editorial team. Steps are
            verified on real devices (Windows 10 and 11, macOS, iOS and Android), and articles show
            the date they were last updated. When Apple or Microsoft change how HEIC behaves, we
            update the affected guides rather than leaving stale instructions online.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            If you spot an error or something that no longer works, please tell us — corrections
            ship quickly because the site is small and independent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Questions, feedback or business inquiries:{" "}
            <a href="mailto:contact@openmyheic.com" className="text-emerald-600 hover:underline">
              contact@openmyheic.com
            </a>
            . You can also use the details on our{" "}
            <Link to="/contact" className="text-emerald-600 hover:underline">
              contact page
            </Link>
            . We usually reply within a couple of business days.
          </p>
        </section>
      </div>
    </Layout>
  );
}
