# Devmart SEO & GSO Guide

Reference for every project remixed from this Devmart baseline. Covers
traditional search engines (Google, Bing) **and** generative search
(ChatGPT Search, Perplexity, Google AI Overviews, Claude web).

Read this before publishing any frontend built on this stack.

---

## 1. Why this stack is SEO-strong

This baseline runs **TanStack Start v1** on **Nitro** (React 19 + Vite 7).
Every route is server-side rendered to real HTML before React hydrates.

| Stack | SEO strength | Why |
| --- | --- | --- |
| Pure Vite + React (SPA, CRA) | ❌ Weak | Empty `<div id="root">` at first byte; crawlers see nothing |
| Next.js App Router | ✅ Strong | Full SSR/SSG |
| **This stack (TanStack Start + Nitro)** | ✅ **Strong** | Full SSR, per-route `head()`, real `<a>` links |
| Astro / 11ty static | ✅ Strongest | Zero JS by default |

Concrete wins baked in:

- **Real HTML at first byte** — Googlebot, Bingbot, and AI crawlers get
  fully rendered content, no JS required.
- **Per-route `head()`** — unique `<title>`, description, OG, canonical
  per URL.
- **Real `<a>` tags** — TanStack `<Link>` renders proper `<a href>` so
  crawlers follow links normally.
- **Semantic HTML preserved** — H1/H2 hierarchy from source templates
  survives the port.
- **Sitemap/robots convention** — dynamic sitemap via
  `src/routes/sitemap[.]xml.ts`, static `public/robots.txt`.
- **Host parity** — Cloudflare Workers and Hostinger Node deploys both
  emit identical SSR HTML (see `HOSTINGER_DEPLOY_NOTES.md`).

---

## 2. Per-route `head()` — the mandatory fields

Every shareable content route must define these in its `head()`. Set
them in the leaf route file (`createFileRoute("/services")({ head: ...})`),
never in `__root.tsx`.

```tsx
head: () => ({
  meta: [
    { title: "Services — Acme Studio" },              // <60 chars, includes keyword
    { name: "description", content: "..." },          // <160 chars, unique per route
    { property: "og:title", content: "Services — Acme Studio" },
    { property: "og:description", content: "..." },
    { property: "og:type", content: "website" },      // "article" on blog posts
    { property: "og:url", content: "/services" },     // relative — resolves to current host
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [
    { rel: "canonical", href: "/services" },          // self-reference, leaf only
  ],
});
```

**Hard rules** (from head-meta knowledge):

- Title lives **inside** the `meta` array, not at the top level.
- `canonical` lives in `links`, **leaf routes only** — never in
  `__root.tsx` (TanStack concatenates `links`, so a root canonical +
  leaf canonical emits both, which is invalid).
- `og:image` and `twitter:image` **only at the leaf**, never on
  `__root.tsx` or a layout — a root `og:image` overrides every child.
- Use **relative** URLs for `canonical` and `og:url` until a real
  domain is set. Crawlers resolve them against the request host.
- Never ship `"Lovable App"` as a title or `"Lovable Generated Project"`
  as a description — both are default placeholders that fail SEO audits.

---

## 3. Sitemap & robots

**Sitemap.** Use the server route pattern at
`src/routes/sitemap[.]xml.ts` (the `[.]` escapes the dot so the route
resolves to `/sitemap.xml`). The `entries` array must reflect every
public route in `src/routeTree.gen.ts`. For dynamic content, mirror the
route's loader — same source, same filters (`published = true`, etc.).

Keep `BASE_URL = ""` and the TODO comment until a real project URL
(name or custom domain) is set. Relative paths resolve against the
request host, so the sitemap stays correct without a placeholder.

**robots.txt.** Ship a minimal `public/robots.txt`:

```
User-agent: *
Allow: /
```

Add a `Sitemap:` directive only when a real domain is set. Never bake
`Disallow: /` unless the user explicitly asks — that hides the whole
site from every crawler.

---

## 4. GSO — Generative Search Optimization

GSO = getting cited by AI search (ChatGPT Search, Perplexity, Google
AI Overviews, Claude web, Copilot). AI crawlers weigh different
signals than Google:

| Signal | Traditional SEO | GSO |
| --- | --- | --- |
| SSR HTML at first byte | ✅ Critical | ✅ Critical |
| Structured data (JSON-LD) | ✅ Helpful | ✅ **Very high weight** |
| Semantic HTML (H1 unique, real `<article>`, `<section>`) | ✅ | ✅ **Very high weight** |
| Backlinks & authority | ✅ Critical | ⚠ Lower weight |
| Keyword density | ✅ | ⚠ Lower weight |
| `llms.txt` / `llms-full.txt` | — | ✅ Emerging standard |
| Content freshness (lastmod) | ✅ | ✅ Higher weight |
| Fast TTFB, no JS-blocking | ✅ | ✅ |
| Direct-answer content (Q→A, definitions, lists) | ⚠ | ✅ **Very high** |

**Actionable GSO principles for every project:**

1. **JSON-LD on every content-typed route.** See snippet library in
   section 5.
2. **Ship `public/llms.txt`.** Section 6.
3. **One unique `<h1>` per route.** Never zero, never two.
4. **Answer questions in prose.** Use short definitional paragraphs and
   Q→A blocks — AI models retrieve those verbatim.
5. **Fresh timestamps** on articles and product pages (`datePublished`,
   `dateModified` in JSON-LD).
6. **Absolute URLs in JSON-LD** — build them server-side from the
   request origin, don't hardcode.

---

## 5. JSON-LD patterns

Inject via `head().scripts`. `children` must be a **string** (the
`JSON.stringify` result), not an object.

**Organization (sitewide, in `__root.tsx`):**

```tsx
scripts: [{
  type: "application/ld+json",
  children: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Acme Studio",
    url: "https://acme.example",
    logo: "https://acme.example/logo.png",
    sameAs: ["https://twitter.com/acme", "https://linkedin.com/company/acme"],
  }),
}]
```

**Article (blog post leaf route, built from loader data):**

```tsx
head: ({ loaderData }) => ({
  scripts: [{
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: loaderData.title,
      description: loaderData.excerpt,
      image: loaderData.coverImage,        // absolute URL
      datePublished: loaderData.publishedAt,
      dateModified: loaderData.updatedAt,
      author: { "@type": "Person", name: loaderData.author },
    }),
  }],
})
```

**Product, FAQPage, BreadcrumbList** — full snippets in
`.agents/skills/html-template-to-tanstack/assets/jsonld-snippets.md`
once the skill runs. Schemas stack: a blog post can carry both
`Article` and `BreadcrumbList`.

---

## 6. `llms.txt` — the AI crawler manifest

Emerging convention (llmstxt.org) for AI crawlers, analogous to
`robots.txt` for search engines. Place at `public/llms.txt`:

```
# Acme Studio

> One-sentence description of what this site does.

## Core pages

- [Home](/): value proposition and product overview
- [Services](/services): what we offer
- [Pricing](/pricing): plans and cost
- [About](/about): team and mission
- [Contact](/contact): get in touch

## Content

- [Blog](/blog): recent articles on {topic}
- [Case studies](/cases): customer stories

## Notes

- Audience: {who this is for}
- Not for: {who this is not for}
```

Optional `public/llms-full.txt` includes full markdown bodies for the
listed pages — heavier, but AI crawlers can index it directly.

---

## 7. Pre-publish audit — 10 checks

Run this checklist before publish on every project.

1. ☐ Every route has a **unique** `title` and `description` (no
   defaults, no repeats).
2. ☐ Every content image has meaningful `alt` text.
3. ☐ Descriptions are **<160 chars**.
4. ☐ `canonical` is present on every leaf and **self-references** the
   route.
5. ☐ JSON-LD validates at
   [schema.org validator](https://validator.schema.org/).
6. ☐ `sitemap.xml` returns 200 and lists every public route.
7. ☐ `robots.txt` does **not** contain `Disallow: /`.
8. ☐ `og:image` (when present) is an **absolute** HTTPS URL.
9. ☐ Every route has exactly **one** `<h1>`.
10. ☐ `llms.txt` present and reflects current site structure.

---

## 8. Hostinger deploy context

See `HOSTINGER_DEPLOY_NOTES.md` for full deploy flow. Short version:
**Nitro's Node preset emits the same SSR HTML as the Cloudflare
Worker preset**, so SEO/GSO parity is 100% between Lovable's
publish and Hostinger's GitHub auto-deploy. No SEO regressions on
host switch. Sitemap, robots, JSON-LD, and `llms.txt` all work
identically on both.

---

## Related docs

- `docs/DEVMART_FRONTEND_REMIX_NOTE.md` — index/CSS replacement on remix
- `docs/HOSTINGER_DEPLOY_NOTES.md` — deploy flow, DB/auth choices
- `docs/DEVMART_ADMIN_CSS_ISOLATION.md` — admin CSS containment
- `.agents/skills/html-template-to-tanstack/references/09-seo-gso.md`
  — how the frontend skill implements this guide during template ports