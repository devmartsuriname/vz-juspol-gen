# LFB-103D POLISH 001 CORRECTION — changed-file manifest

Baseline commit: 80e38b6a8579ccd31c40882b65d007721972c645.

## Modified

- `public/vz-public/css/vz-polish.css` — title-bar overlay containment (new section 4b);
  section 5 tab styles re-scoped to Bootstrap `.nav-link.vz-tab` / `.tab-pane`.
- `public/vz-public/js/vz-polish.js` — custom delegated tab controller removed; retains
  only Home/End support for Bootstrap tablists.
- `src/lib/public/template/liviza-documenten.html.ts` — Bootstrap 5 native tab markup
  (`ul.nav.nav-tabs`, `data-bs-toggle="tab"`, `.tab-content > .tab-pane`); all 17 PDF
  records, titles, metadata and links unchanged.
- `src/lib/public/template/liviza-service-detail.html.ts` — right sidebar removed;
  full-width column; document block, related-services card row and single combined
  preparation/contact callout.
- `src/lib/public/template/LivizaTemplatePage.tsx` — comment update for the reduced
  polish script role (load order otherwise unchanged).

## Added

- `docs/vz-juspol-gen/execution-evidence/LFB-103D-POLISH-001-CORRECTION/REPORT.md`
- `docs/vz-juspol-gen/execution-evidence/LFB-103D-POLISH-001-CORRECTION/MANIFEST.md`
- `docs/vz-juspol-gen/execution-evidence/LFB-103D-POLISH-001-CORRECTION/screenshots/` —
  9 PNGs (documenten 1440/375 with two different tabs selected; service detail at
  1440/992/768/375/320).

## Untouched (verified)

- `src/routes/admin.tsx`, `src/routes/admin/**`, `src/lib/admin/**`, `public/admin/**`.
- `public/vz-public/documenten/**` — 17 PDFs, 8,848,320 bytes, hashes and headers identical.
- `public/vz-public/liviza/assets/**` — ported source assets unchanged.
- All other public templates and routes (home, contact, over-ons, diensten overview,
  category, faq, nieuws, privacy, disclaimer, instanties).
- `package.json`, lockfile, `vite.config.ts`, `tsconfig.json` — unchanged; no dependency added.
- No backend, API, auth, database, Cloud, Supabase, secrets, GitHub, deployment or
  publication change.
