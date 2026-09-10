# Phase 2 — Scaffold routes 1:1

Goal: every HTML page becomes a route file that renders the original `<body>` markup byte-for-byte, with the original CSS and JS loaded in `<head>`.

## Filename mapping

| Source HTML | TanStack route | Vite-React route |
| ----------- | -------------- | ---------------- |
| `index.html` | `src/routes/index.tsx` | `/` in `App.tsx` |
| `about.html` | `src/routes/about.tsx` | `/about` |
| `services.html` | `src/routes/services.tsx` | `/services` |
| `services2.html` (or similar variant) | `src/routes/services-alt.tsx` | `/services-alt` |
| `post.html` / `blog-single.html` | `src/routes/post.tsx` | `/post` |
| `404.html` | wire to `notFoundComponent` in `__root.tsx` | wildcard route |

Slugify defensively: lowercase, hyphenate, drop `.html`.

## Route template

Both `assets/route.tanstack.template.tsx` and `assets/route.vite.template.tsx` follow the same shape:

1. `const BODY_HTML = '...'` — the source page's `<body>` inner HTML, asset paths rewritten to absolute `/...`.
2. `const PAGE_SCRIPTS = ['/js/common.min.js', '/js/<page>.min.js']`.
3. Head links to the page-specific css bundles.
4. Component returns a single wrapper with `style={{display:"contents"}}` + `dangerouslySetInnerHTML`.
5. `useEffect` appends each script tag fresh on mount and removes them on unmount, so vanilla JS re-inits on SPA navigation.

Run `scripts/extract_body.py` to generate the `BODY_HTML` string and meta from a source HTML file. The script handles:

- unquoted attributes (`<div class=container>`) → fine, the browser parses them, but escape backslashes and the chosen string quote
- absolute-pathing every `src=`, `href=`, `url(...)` to `/img/...`, `/css/...`, `/js/...`, `/fonts/...`, `/svg/...`
- escaping JSX-hostile chars in the string literal

## SEO per route

Each route's `head()` (TanStack) or `<Helmet>` (Vite) sets:

- unique `<title>`
- unique `description`
- unique `og:title`, `og:description`
- `og:image` only at leaf routes that have a hero image

Pull these from the source HTML `<head>` where present; otherwise leave a TODO comment for phase 7.

## Gate

Typecheck clean. Every source HTML page has a route file. Visiting each route in the preview renders something (even if styling is broken — CSS comes in phase 3).
