# LFB-103D POLISH 001 — changed-file manifest

## Added

- `public/vz-public/css/vz-polish.css` — isolated public polish stylesheet (loaded last, after the ported Liviza CSS).
- `public/vz-public/js/vz-polish.js` — isolated public tab behaviour (delegated, idempotent).
- `docs/vz-juspol-gen/execution-evidence/LFB-103D-POLISH-001/REPORT.md`
- `docs/vz-juspol-gen/execution-evidence/LFB-103D-POLISH-001/MANIFEST.md`
- `docs/vz-juspol-gen/execution-evidence/LFB-103D-POLISH-001/pdf-verification.md`
- `docs/vz-juspol-gen/execution-evidence/LFB-103D-POLISH-001/image-register.md`
- `docs/vz-juspol-gen/execution-evidence/LFB-103D-POLISH-001/screenshots/` — 78 PNGs (13 routes × 1440/1280/992/768/375/320).

## Modified

- `src/lib/public/template/LivizaTemplatePage.tsx` — appends the polish stylesheet and script to the existing Liviza CSS/JS order.
- `src/lib/public/template/chrome.ts` — brand, hero lead and footer identity inline styles replaced by classes.
- `src/lib/public/template/liviza-home.html.ts` — stakeholder grid converted to the Liviza carousel with `portfoliobox-style-2` cards; equal-height class on both carousels.
- `src/lib/public/template/liviza-documenten.html.ts` — accessible category tabs.
- `src/lib/public/template/liviza-service-detail.html.ts` — `visa-details.html` hierarchy, fact cards, sidebar widgets, preparation callout.
- `src/lib/public/template/liviza-instanties.html.ts` — `countries.html` card pattern.
- `src/lib/public/template/liviza-contact.html.ts` — `contacts.html` info-box pattern for hours and visit.
- `src/lib/public/template/liviza-legal.html.ts` — `blog-single-view.html` article + sidebar.
- `src/lib/public/template/liviza-news-detail.html.ts` — `blog-single-view.html` article + sidebar.
- `src/lib/public/template/liviza-faq.html.ts` — inline style removed.

## Untouched (verified)

- `src/routes/admin.tsx`, `src/routes/admin/**`, `src/lib/admin/**`, `public/admin/**` — no diff.
- `public/vz-public/documenten/**` — 17 PDFs byte-identical (see `pdf-verification.md`).
- `public/vz-public/liviza/assets/**` — ported source assets unchanged.
- `package.json`, lockfile, `vite.config.ts`, `tsconfig.json` and all other configuration — unchanged; no dependency added.
- No backend, API, auth, database, Cloud, Supabase, secrets, GitHub, deployment or publication change.
