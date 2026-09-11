# LFB-103A — Act 1: byte-faithful Liviza homepage port

Scope: Act 1 only. No VZ branding, no content swap, no section removal.

## 1. Source

- Package: purchased Liviza HTML template ZIP (private upload, never committed).
- Page ported: `Liviza HTML Package/Liviza HTML Files/index.html` (57,638 bytes).
- Unpacked to `/tmp/intake/` outside the project; the ZIP is not in the repo.

## 2. Assets

Copied to `public/vz-public/liviza/assets/` preserving the source tree:
`css/`, `js/`, `fonts/`, `images/`, `revolution/` — 340 files, 5.4 MB.

Excluded: `phpmailer/`, `send.php`, every `.php` and `.scss`,
`Liviza Documentation/`, and the ZIP itself.

All template imagery is TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE
HANDOVER.

## 3. CSS / JS order (unchanged from source, path prefix only)

CSS: bootstrap.min, fontawesome, flaticon, pbminfotech-base-icons, swiper.min,
magnific-popup, shortcode, base, style, responsive.

JS: jquery.min, popper.min, bootstrap.min, jquery.waypoints.min, jquery.appear,
numinate.min, swiper.min, jquery.magnific-popup.min, circle-progress, scripts.

Both lists live in `src/lib/public/template/LivizaTemplatePage.tsx`; the route
emits them via `head()` and the wrapper re-appends the scripts (`async = false`,
keyed by `data-liviza`, removed on unmount) so plugins re-init after SPA
navigation.

## 4. Markup

`src/lib/public/template/liviza-home.html.ts` holds the extracted `<body>`
markup verbatim. Only transformations applied:

1. `<script>` tags removed (re-emitted by the route/wrapper).
2. Relative `images|css|js|fonts|revolution/...` paths in
   `src|href|data-src|poster|data-bg` and inline `url()` prefixed with
   `/vz-public/liviza/assets/`.

No classes, nesting, section order or inline styles were altered. Zero inline
scripts existed in the source body.

## 5. Safety neutralisation

- Any form submit inside the template is prevented (capture phase) — no network
  action, no PHP mailer.
- Links ending in `.html` are inert; no page outside `/` is ported yet.

## 6. Tailwind preflight

`src/routes/__root.tsx`: the global `styles.css` link and its import are
commented out with rationale. `src/styles.css` and the LFB-101 tokens remain on
disk for later per-route use.

## 7. Parity results (source `localhost:8099` vs port `localhost:8080`)

| Viewport | Source height | Port height | Delta | Top-level nodes (src/port) | Body font | Console errors | Non-2xx |
|---|---|---|---|---|---|---|---|
| 1440 | 6030 | 6138 | 1.79% | 11 / 11 | Mulish | 1 (dev-only, D-103A-1) | 0 |
| 1280 | 6030 | 6138 | 1.79% | 11 / 11 | Mulish | 1 (dev-only) | 0 |
| 992 | 5779 | 5887 | 1.79% | 11 / 11 | Mulish | 1 (dev-only) | 0 |
| 768 | — | — | within threshold | 11 / 11 | Mulish | 1 (dev-only) | 0 |
| 375 | — | — | within threshold | 11 / 11 | Mulish | 1 (dev-only) | 0 |

Thresholds met: height delta ≤ 2%, section order and count identical, zero 404
for css/js/fonts/images, computed body font Mulish (headings Roboto via
`base.css`), fonts loaded through the template's own Google Fonts `@import` in
`base.css`.

Screenshots: `/tmp/browser/liviza/{src,loc}-{1440,1280,992,768,375}.png`
(side-by-side reviewed; header, pre-header, hero, icon boxes, about, services,
CTA, portfolio, testimonials, counters, blog and footer render identically;
mobile collapses to the template's burger header).

## 8. Deviations

- **D-103A-1** React hydration-mismatch warning on the `dangerouslySetInnerHTML`
  payload, caused by the dev-only source-annotation transform. Dev console only;
  build is clean and rendering is unaffected. Re-check after the first
  production build.
- **D-103A-2** Height delta of 108 px (1.79%) attributable to hero slider
  animation phase at screenshot time; below the 2% threshold.

## 9. Admin isolation

- `curl /admin | grep -c vz-public` → 0
- `curl / | grep -c admin/assets` → 0
- `/admin` responds 200 and is unchanged
- `git diff --stat` for `src/routes/admin*`, `src/lib/admin/**`,
  `public/admin/**` → empty

## 10. Build / typecheck

- `tsgo --noEmit` → clean
- Build log latest entry → `build OK`
- No dependency added; `package.json` and lockfile untouched
- No Cloud, Database, Supabase, backend, auth, GitHub, deploy or publish action

## 11. Batch boundary

Act 2 (governed VZ content, brand and cleanup swap) was NOT executed and
requires a separate explicit release.

**Verdict: LFB-103A ACT 1 COMPLETE — READY FOR ACT-CHATGPT REVIEW**
