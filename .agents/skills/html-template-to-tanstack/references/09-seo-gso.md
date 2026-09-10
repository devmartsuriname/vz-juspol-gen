# Phase 9 — SEO & GSO baseline

Runs after Phase 8 hand-off. Makes every ported route SEO-ready and
GSO-ready (Generative Search Optimization — ChatGPT Search, Perplexity,
Google AI Overviews, Claude web).

Read the project-level guide first when it's present:
`docs/DEVMART_SEO_GSO_GUIDE.md` on Devmart-baseline projects.

## Gate for this phase

- Every route has a **unique** `title` and `description` in `head()`.
- `og:title` and `og:description` on every content route.
- `canonical` on every leaf route, self-referencing.
- `sitemap.xml` server route exists and lists every public route.
- `public/robots.txt` exists with `Allow: /`.
- `public/llms.txt` exists and reflects the route inventory.
- JSON-LD present on the home route and every content-typed route
  (Article for posts, Product for products, FAQPage for FAQs).

## Step 1 — Extract source `<head>` per page

`scripts/extract_body.py` already captures `<title>` and
`<meta name="description">` from each source HTML page's `<head>` and
writes them to the per-route body/meta bundle used in Phase 2. Reuse
those values as the route's `head()` seed instead of inventing new
copy — the source template is the user's brand voice.

If a page's source `<title>` is a generic placeholder like `"Home"`
or the template's demo brand name, replace it with the pattern
`"{Page name} — {Site name}"` and confirm the site name with the user
once (do NOT invent one).

## Step 2 — Populate `head()` in every route file

For each `src/routes/**/*.tsx` from Phase 2, ensure the `head()`
includes:

```tsx
head: () => ({
  meta: [
    { title: "…" },
    { name: "description", content: "…" },        // < 160 chars
    { property: "og:title", content: "…" },
    { property: "og:description", content: "…" },
    { property: "og:type", content: "website" },  // "article" on blog posts
    { property: "og:url", content: "/route-path" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [
    { rel: "canonical", href: "/route-path" },    // leaf routes only
  ],
}),
```

**Non-negotiable rules** (see `tanstack-ssr-head` and head-meta
knowledge):

- Title lives inside the `meta` array, not at the top level of the
  return object.
- `canonical` on leaf routes only — never in `__root.tsx`.
- `og:image` and `twitter:image` on leaf routes only, and only when
  the route renders a meaningful hero/cover as an absolute HTTPS URL.
  Never on `__root.tsx` or a layout.
- Use relative URLs (`/services`) for `canonical` and `og:url` until a
  real domain is set. Crawlers resolve them against the request host.
- Never ship `"Lovable App"` as a title or `"Lovable Generated
  Project"` as a description.

## Step 3 — Sitemap server route

Create `src/routes/sitemap[.]xml.ts` (the `[.]` escapes the dot). Use
the exact template in the `sitemap-robots` knowledge — it ships with
`BASE_URL = ""` and a TODO comment; keep the empty string until a
real project URL is set. Populate `entries` from `FileRoutesByTo` in
`src/routeTree.gen.ts`:

- Include every public route.
- Omit `/not-found`, `/lovable/**`, splat/`$`, and layout-only paths.
- For dynamic routes (`$slug`), mirror the route's loader query but
  fetch **all** rows (same source, same filters — `published = true`
  etc.).

If the project already has `public/sitemap.xml` (legacy static file),
confirm with the user before migrating to the server route.

## Step 4 — `robots.txt`

Create `public/robots.txt` if missing:

```
User-agent: *
Allow: /
```

Add a `Sitemap:` line only when a real domain is set. Never bake
`Disallow: /` unless the user explicitly asks.

## Step 5 — `llms.txt`

Copy `assets/llms.txt.template` to `public/llms.txt` and fill it from
the route inventory built in Phase 1. Structure: site description,
core pages with 1-line purpose each, content sections, audience notes.
See the template for the exact shape.

## Step 6 — JSON-LD on content routes

Copy patterns from `assets/jsonld-snippets.md`. Inject via
`head().scripts` with `type: "application/ld+json"` and
`children: JSON.stringify(...)`.

Route → schema mapping:

| Route type | Schema |
| --- | --- |
| `__root.tsx` (sitewide) | `Organization` (or `WebSite`) |
| Home `/` | `WebSite` + optional `Organization` if not on root |
| Blog post `/blog/$slug` | `Article` |
| Product `/products/$slug` | `Product` |
| FAQ `/faq` | `FAQPage` |
| Any deep route | append `BreadcrumbList` |

Schemas stack: a blog post can carry both `Article` and
`BreadcrumbList` in the same `scripts` array.

For dynamic content, build absolute URLs (for `image`, `url`) from
the request origin via a `getRequestOrigin` server fn — do NOT
hardcode a host or read `window.location` during SSR. See
`tanstack-ssr-head` for the pattern.

## Step 7 — Semantic HTML audit

For each ported route, confirm:

- Exactly one `<h1>` per page — never zero, never two.
- Heading hierarchy is monotonic (H1 → H2 → H3, no skips).
- Content images have meaningful `alt` (not `alt=""` unless
  decorative, not `alt="image"`).
- Nav links use real `<a href>` / TanStack `<Link>`, not clickable
  divs.
- Q→A content uses actual `<h*>` questions + `<p>` answers so AI
  crawlers retrieve them cleanly.

## Step 8 — Verify

- `curl -sI localhost:8080/sitemap.xml | head -1` → `200 OK`.
- `curl -s localhost:8080/robots.txt` → shows `Allow: /`.
- `curl -s localhost:8080/llms.txt` → shows filled template.
- View source on 3 different routes → different `<title>`, different
  `<meta name="description">`.
- Paste one JSON-LD block into
  [schema.org validator](https://validator.schema.org/) → passes.

## Common pitfalls

- **`og:image` on `__root.tsx`** — every child inherits it. Never do
  this. Leaf routes only.
- **`canonical` in `__root.tsx`** — TanStack concatenates `links`;
  the leaf's canonical + root's canonical both emit, which is
  invalid. Leaf only.
- **Same title on every route** — the #1 audit failure. Every route
  gets its own copy.
- **Absolute URLs hardcoded** — breaks on host change. Build from
  request origin server-side.
- **JSON-LD `children` as an object** — must be a string
  (`JSON.stringify(...)`).
- **`Disallow: /` in robots** — hides the whole site. Only ship this
  when the user explicitly asks.