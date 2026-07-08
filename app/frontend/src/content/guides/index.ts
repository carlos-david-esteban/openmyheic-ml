import type { BlogPost } from "@/lib/seo";

/** Languages with fully localized guide content. All other languages fall back to EN. */
export const GUIDE_LANGS = ["de", "ja", "es", "fr", "pt"] as const;

export const guideLoaders: Record<string, () => Promise<{ default: Record<string, BlogPost> }>> = {
  de: () => import("./de"),
  ja: () => import("./ja"),
  es: () => import("./es"),
  fr: () => import("./fr"),
  pt: () => import("./pt"),
};

export function isGuideLocalized(lang: string): boolean {
  return Object.prototype.hasOwnProperty.call(guideLoaders, lang);
}
