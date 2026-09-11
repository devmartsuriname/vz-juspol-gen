# Liviza Homepage — Two-Act 1:1 Template Port (Tripple R Pro method)

Plan only. Nothing is implemented in this turn. Each Act needs its own explicit
release from Delroy.

The previous LFB-103H plan (selective CSS extraction, hand-translated Bootstrap
grid, runtime removed before parity, newly authored React header/footer) is
withdrawn and replaced by the workflow in
`.agents/skills/html-template-to-tanstack` — the same sequence used in Tripple R
Pro.

## 0. Method comparison

| Tripple R Pro step | Applied here |
|---|---|
| Intake: unzip, inventory pages/css/js/fonts/images | Liviza ZIP inventoried in place (§1) |
| Port full page body 1:1 via `extract_body.py` | Full `index.html` body, no fragment selection |
| Copy whole runtime asset tree to `public/`, relative paths preserved | `public/vz-public/liviza/**` (§2) |
| Original CSS links, original order | §3 |
| `TemplatePage`-style route wrapper, `display:contents`, path normalisation | `LivizaTemplatePage.tsx` (§5) |
| Keep template JS, idempotent rehydration on SPA nav | §4 |
| Tailwind preflight disabled for the template | §6 |
| Pixel-diff at matched viewports, then sign-off | Act 1 gate (§7) |
| Freeform brand/content swap rounds afterwards | Act 2 (§9) |

Rejected here vs. previous plan: no CSS extraction, no Bootstrap re-authoring,
no section removal, no VZ branding before the Act 1 gate.

## 1. Source inventory (ZIP read in place, never extracted into the project)

`Liviza HTML Package/Liviza HTML Files/` contains: 18 HTML pages, `css/` 13,
`js/` 140, `fonts/` 17, `images/` 152 (2.01 MB), plus `phpmailer/` 61 and
`revolution/` 19. Homepage `index.html` = 57,638 bytes.

CSS link order in `index.html`: `bootstrap.min.css`, `fontawesome.css`,
`flaticon.css`, `pbminfotech-base-icons.css`, `swiper.min.css`,
`magnific-popup.css`, `shortcode.css`, `base.css`, `style.css`,
`responsive.css`.

JS order in `index.html`: `jquery.min.js`, `popper.min.js`, `bootstrap.min.js`,
`jquery.waypoints.min.js`, `jquery.appear.js`, `numinate.min.js`,
`swiper.min.js`, `jquery.magnific-popup.min.js`, `circle-progress.js`,
`scripts.js` (plus any Slider Revolution tags the extractor finds in the head/
body — kept if `index.html` references them).

Fonts: `css/base.css` lines 15–17 `@import` Google Fonts for Mulish, Roboto,
Oswald; tokens `--pbmit-body-typography-font-family:"Mulish"` and
`--pbmit-heading-typography-font-family:"Roboto"`.

Section order confirmed for Act 2: pre-header → `site-header header-style-1` →
`.pbmit-slider-area.pbmit-slider-one` (3 slides) → `.iconbox-section-one` →
`section.section-md` about → `.service-one-bg.pbmit-bg-color-blackish` →
assessment CTA → portfolio/country → `.testimonial-one-bg` → `.counter-one` →
blog `section.section-lg` (3 cards) → `footer.site-footer`
(`.pbmit-footer-widget-area-top` / `.pbmit-footer-widget-area` /
`.pbmit-footer-bottom`).

## 2. Asset copy — full runtime tree, relative paths preserved

Destination root: `public/vz-public/liviza/assets/` mirroring the source tree,
so `css/…url(../images/…)` and `@font-face` references resolve unchanged.

Copied in full: `css/`, `js/`, `fonts/`, `images/`, `revolution/`.
Excluded: `phpmailer/` (61 files, server-side mail), any `.php`, `.scss`,
`Liviza Documentation/`, and the ZIP itself (never committed).

No image trimming before the Act 1 gate — trimming risks broken CSS references.
Unused images are pruned in Act 2 once parity is signed off, and every surviving
template image is tracked as
`TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER`.

Total added ≈ the css/js/fonts/images/revolution subtree of one HTML template.

## 3. CSS loading

The homepage route's `head().links` lists the ten stylesheets in the exact
source order, rewritten only in path prefix:
`/vz-public/liviza/assets/css/<file>`. No stylesheet content is edited,
extracted or re-scoped in Act 1.

## 4. JS loading and rehydration

Same order as §1, prefixed to `/vz-public/liviza/assets/js/…`.

- `head().scripts` (deferred) handles first paint / SSR.
- A `useEffect` in the wrapper appends the same scripts with `async = false` on
  mount and removes them on unmount, so plugins re-init after SPA navigation.
- Idempotence: scripts are keyed by src, existing tags are removed before
  re-adding; jQuery plugin handlers are namespaced-off where `scripts.js`
  binds to `document`.
- Neutralised: any `<form action="*.php">` submit (prevented, no network), and
  any external tracking/embed request. No other behavioural change in Act 1.
- Any script that 404s is dropped from the list (Vite would serve HTML and
  throw `Unexpected token '<'`).

## 5. Route and wrapper files

- `src/lib/public/template/LivizaTemplatePage.tsx` — the `TemplatePage`
  equivalent: renders extracted body HTML via `dangerouslySetInnerHTML` inside
  `<div style={{display:"contents"}}>`, normalises asset paths, converts
  internal `*.html` links to router navigation (or inert when the target page is
  not ported), and runs the script rehydration effect.
- `src/lib/public/template/liviza-home.html.ts` — the extracted `<body>` markup
  of `index.html` as a string constant, produced by the skill's
  `extract_body.py`, JSX-escaped, asset paths absolutised.
- `src/routes/index.tsx` — becomes the Liviza homepage route: `head()` with the
  CSS links, font links and deferred scripts; renders `LivizaTemplatePage`.

## 6. Tailwind preflight and admin isolation

Preflight resets `<header>`, `<ul>`, etc. and visibly breaks Bootstrap themes.
Plan: remove the global `appCss` stylesheet link from `src/routes/__root.tsx`
(with the skill's rationale comment) so the template route receives no Tailwind
reset. `/admin/*` is unaffected — `src/routes/admin.tsx` declares its own
Darkone CSS in its own `head().links` and never used `styles.css`.

Isolation tests (all must pass):
- `curl -sSL /admin | grep -c vz-public` → 0
- `curl -sS / | grep -c 'admin/assets'` → 0
- `git diff --stat` shows zero lines under `src/routes/admin*`,
  `src/lib/admin/**`, `public/admin/**`
- `/admin` and `/admin/auth-signin` render unchanged, screenshots compared.

## 7. Fonts

Act 1 uses Liviza's own linkage: Google Fonts `<link>` tags for Mulish, Roboto
and Oswald in the route `head()` (the stack forbids a remote `@import` in CSS,
so the `base.css` imports are mirrored as links). No system fallback.

Recorded for a later production decision: keep Google hosting, or self-host the
OFL binaries under `public/vz-public/liviza/assets/fonts/`. That decision is not
part of Act 1 acceptance.

## 8. Act 1 gate — parity acceptance

Method: serve the untouched source `index.html` from a temp sandbox directory
(outside the project) and run the skill's `pixel_diff.py` against the local
route at 1440, 1280, 992, 768, 375.

Recorded per viewport: full page height delta, section boundary offsets, broken
assets, console errors, non-2xx requests, side-by-side and diff images.

Thresholds:
- Zero console errors, zero 404/non-2xx for css/js/fonts/images.
- Page height delta ≤ 2% per viewport.
- Section order and count identical to source.
- Per-section pixel mismatch ≤ 3% ignoring text antialiasing; any region above
  that is either fixed or recorded as a justified deviation.
- Fonts computed as Mulish/Roboto (verified via `getComputedStyle`).

Evidence: `docs/vz-juspol-gen/execution-evidence/LFB-103A/` with `REPORT.md`,
`MANIFEST.md` (SHA-256 + bytes of changed files) and the diff artefacts.

Act 1 STOPs on: any `/admin/*` impact, a required new npm dependency, a needed
path outside the approved write list, or unresolved material parity defects.

## 9. Act 2 — governed VZ swap (released separately, after the Act 1 gate)

| Source section | Act 2 treatment |
|---|---|
| Pre-header | Keep geometry; contact set replaces demo contact; social + CTA removed |
| `site-header header-style-1` | Keep exactly; wordmark `Vreemdelingenzaken` + sub-line `Ministerie van Justitie en Veiligheid`; nav → VZ routes |
| Hero slider | Keep layout, one static composition; deviation recorded if motion removed |
| Icon-box row | Keep overlap/geometry; VZ quick links |
| About/introduction | Keep two-column geometry; governed VZ purpose text |
| Dark services band | Keep geometry; accessible static grid may replace autoplay, deviation recorded |
| Assessment CTA | Keep panel; guidance-only Aanvraaghulp wording, never an application/submission claim |
| Portfolio/country | REMOVE |
| Testimonials | REMOVE |
| Counters/statistics | REMOVE |
| Blog three-card | Keep; VZ nieuws en mededelingen, truthful empty state when no notices |
| Footer | Keep four-column geometry and bottom bar; newsletter input, social links and invented details removed; governed contact set when released |

Content pending the content-swap release (documented, not implemented now):
public display name `Vreemdelingenzaken`; sub-line
`Ministerie van Justitie en Veiligheid`; contact set Afgifte Unit, oud Parket
Gebouw, Henck Arronstraat no. 1, Paramaribo, +597 427-197, info@vz.juspol.sr,
maandag–donderdag 07:30–13:30, vrijdag gesloten.

Image swap follows the Tripple R method: approved images written into the same
slots at the same dimensions and aspect ratios; no layout redesign. Temporary
template imagery stays tracked and must not survive handover.

Act 2 evidence: `docs/vz-juspol-gen/execution-evidence/LFB-103B/`, including a
before/after screenshot set at the same five viewports proving surviving
sections were not redesigned.

## 10. Disposition of LFB-101 / LFB-102 code

| Item | Disposition |
|---|---|
| `src/styles.css` (VZ tokens, `.vz-public` base) | RETAINED on disk, no longer linked globally; re-linkable for non-template routes later |
| `src/content/**` | RETAINED unchanged, read-only in both Acts |
| `src/lib/public/{content,format,seo}.ts` | RETAINED |
| `src/lib/public/routes-map.ts` | RETAINED; used for Act 2 nav mapping |
| `src/components/public/layout/**` (LFB-102 shell) | SUPERSEDED for the homepage; left in place, unused, until the remaining routes are ported, then removed with evidence |
| `src/routes/index.tsx` LFB-101 empty state | REPLACED by the ported homepage |
| LFB-101/102 evidence docs | RETAINED; superseded note added |

## 11. Files created / modified

Act 1 create: `public/vz-public/liviza/assets/**`;
`src/lib/public/template/{LivizaTemplatePage.tsx,liviza-home.html.ts}`;
`docs/vz-juspol-gen/execution-evidence/LFB-103A/**`.
Act 1 modify: `src/routes/index.tsx`; `src/routes/__root.tsx` (preflight link
removal + rationale). Generated `src/routeTree.gen.ts` only if unavoidable and
never hand-edited.

Act 2 modify: `src/lib/public/template/liviza-home.html.ts` (content swap),
`LivizaTemplatePage.tsx` if needed, swapped image files, plus
`docs/vz-juspol-gen/execution-evidence/LFB-103B/**`.

Untouched throughout: `/admin/*` routes, `src/lib/admin/**`, `public/admin/**`,
`package.json`, lockfiles, Project Knowledge, skills files.

## 12. Credit-efficient execution

One build turn for Act 1 (port + assets + parity run + evidence). At most one
material parity correction turn. Then, after a separate release, one build turn
for the complete Act 2 swap, and at most one material correction turn. No
microbatches; cosmetic nits are logged, not re-run.

## 13. Untouched systems

No Lovable Cloud, Database, Supabase, backend, API, authentication, secrets,
GitHub, deployment or publication. No new npm dependency. No invented
institutional content. The ZIP is never committed.

---

**Verdict: REVISED TWO-ACT LIVIZA HOMEPAGE PLAN READY FOR DELROY APPROVAL**
