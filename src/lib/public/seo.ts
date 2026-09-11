/**
 * Dutch head metadata helper for the public routes (LFB-103D).
 * `noindex, follow` is retained while content is provisional.
 */

export const SITE_NAME = "Vreemdelingenzaken";

export function publicHead(title: string, description: string) {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_NL" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
