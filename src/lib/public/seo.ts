/**
 * Public SEO helpers (LFB-101).
 *
 * Builds head() meta from supplied values only. No institutional name,
 * claim or URL is invented here; the site name is passed in by the caller
 * once governed identity exists.
 */

interface MetaInput {
  title: string;
  description: string;
  siteName?: string;
  canonical?: string;
  ogImage?: string;
}

export function buildMeta({
  title,
  description,
  siteName,
  canonical,
  ogImage,
}: MetaInput) {
  const fullTitle = siteName ? `${title} — ${siteName}` : title;

  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "nl_NL" },
    { name: "twitter:card", content: "summary_large_image" },
  ];

  if (ogImage) {
    meta.push({ property: "og:image", content: ogImage });
    meta.push({ name: "twitter:image", content: ogImage });
  }

  const links = canonical ? [{ rel: "canonical", href: canonical }] : [];

  return { meta, links };
}
