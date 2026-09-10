---
name: html-template-to-tanstack
description: Port an uploaded HTML/CSS/JS theme (ZIP or folder) into a Lovable React app — TanStack Start by default, Vite-React fallback — keeping the template 1:1 (markup, CSS, JS, fonts, animations) and then running freeform brand/content swap rounds. Triggers on "port HTML theme", "convert theme ZIP", "import HTML template", "1:1 template port", "make this HTML into my app".
---

# HTML Template → React (TanStack Start / Vite-React)

Two acts. Act one ports the theme **byte-identical** to a Lovable React app so the user sees the demo running on their own stack. Act two runs freeform **brand/content swap rounds**, each one plan → approve → execute.

Both acts are phase-gated. Do not advance a phase until its gate passes. Never invent content, colors, or images the user did not ask for.

## Stack selection (Phase 0)

Detect the project's stack before touching files:

- TanStack Start present → `src/routes/__root.tsx` + `src/router.tsx` exist. Default path.
- Vite-React fallback → `src/main.tsx` + `src/App.tsx`, no `src/routes/`. Use React Router DOM.
- Anything else → stop and ask.

The porting workflow is identical; only the route-file shape differs. Both route templates ship in `assets/`.

## Phases

| # | Phase | Reference | Gate |
| - | ----- | --------- | ---- |
| 1 | Intake — unzip, inventory pages/css/js/svg/fonts/images, detect framework (Bootstrap, Swiper, AOS, GSAP, jQuery) | `references/01-intake.md` | Inventory written; user shown page list + missing-image count |
| 2 | Scaffold routes 1:1 from each HTML page using the stack's route template | `references/02-port-routes.md` | Every HTML page has a matching route file; typecheck clean |
| 3 | Assets & CSS — copy `css/ js/ fonts/ svg/ img/` into `public/`; disable Tailwind preflight; use `display:contents` wrapper | `references/03-assets-and-css.md` | No 404s for css/font/svg in network panel |
| 4 | JS rehydration — per-route script loader so vanilla JS re-inits on SPA nav | `references/04-js-rehydration.md` | Sliders, menus, modals work after client-side nav |
| 5 | Real imagery — if user provides a live demo URL, scrape `/img/**` + missing `*.min.css`/`*.min.js`; otherwise generate or leave placeholders | `references/05-demo-scrape.md` | All `<img>` and `url(/img/...)` references resolve |
| 6 | Smoke + pixel-diff — Playwright over every route vs demo (or vs itself if no demo); fix double-header, JS-404s-served-as-HTML, missing CTA backgrounds | `references/06-pixel-diff-smoke.md` | All routes load with zero console errors and zero 404s |
| 7 | Brand & content swap rounds (freeform, repeatable) — each round: PLAN → approve → execute | `references/07-content-swap-rounds.md` | User approves each round before edits |
| 8 | Hand-off — per-route SEO, sitemap, robots, publish checklist | included in `02-port-routes.md` | All routes have unique `<title>` and meta description |
| 9 | SEO & GSO baseline — per-route `head()` audit, sitemap server route, robots.txt, JSON-LD on content routes, `llms.txt` for AI crawlers | `references/09-seo-gso.md` | All routes have unique title + description; `sitemap.xml`, `robots.txt`, `llms.txt` present; JSON-LD on home + content-typed routes |

Always-watch pitfalls live in `references/08-common-pitfalls.md`. Read it before phase 3 and again before phase 6 — most loops the agent gets stuck in are in there.

## Bundled scripts

Copy then run:

| Script | Purpose |
| ------ | ------- |
| `scripts/extract_body.py` | Extract `<body>` HTML + `<head>` meta from each source HTML page; absolute-path assets; escape JSX-hostile chars |
| `scripts/scrape_demo_assets.py` | Crawl a live demo URL; download `/img/**`, missing `*.min.css`, `*.min.js` |
| `scripts/port_template.py` | Orchestrator: unzip → inventory → copy public assets → run extractor → emit route files from `assets/route.tanstack.template.tsx` or `assets/route.vite.template.tsx` |
| `scripts/pixel_diff.py` | Playwright route-by-route screenshot diff (vs live demo if provided, otherwise self-snapshot baseline) |

All scripts accept CLI flags; none reference any specific project. Run with `python /tmp/<script>.py --help` after copying.

## Bundled assets

| File | Purpose |
| ---- | ------- |
| `assets/route.tanstack.template.tsx` | Canonical TanStack route: `BODY_HTML` constant, `head()` with css links + deferred scripts, `useEffect` script re-loader, `display:contents` wrapper |
| `assets/route.vite.template.tsx` | Same pattern for Vite-React + React Router DOM |
| `assets/root.tanstack.template.tsx` | `__root.tsx` with Tailwind preflight import disabled and the rationale comment |
| `assets/checklist.md` | Per-project phase-gate checklist the agent fills out as it advances |
| `assets/llms.txt.template` | `public/llms.txt` scaffold — AI-crawler manifest generated from route inventory in Phase 9 |
| `assets/jsonld-snippets.md` | Copy-paste JSON-LD patterns (Organization, Article, Product, FAQPage, BreadcrumbList) for `head().scripts` |

## Activation rules

- Skill is **stack-aware**: pick TanStack or Vite-React based on the project, not assumption.
- Skill is **project-agnostic**: never reference any prior brand, palette, copy, or domain. Brand decisions come from the user in phase 7, not from this skill.
- Skill is **freeform on brand**: do NOT impose a fixed 3-round structure. Each round is whatever the user asks for, presented as a plan first.
- Skill is **demo-optional**: phase 5 scraping runs only when the user supplies a demo URL.
