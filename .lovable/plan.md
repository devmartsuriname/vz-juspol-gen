# LFB-104 VISUAL REMEDIATION PLAN 001

Status: PLANNED / NOT RELEASED. Plan Mode only — no application file, CSS, asset,
report or evidence was written in this turn.

Baseline / rollback point: commit `bfabff6d291ba15ce62b3000e343b896d1b8ec74`
(final LFB-104 state). Any remediation batch reverts to this commit on STOP.

---

## 1. Root cause per confirmed defect

### A. Footer — duplicate decoration stacking

FACT. `public/vz-public/liviza/assets/css/shortcode.css:1688-1702` already gives the
original Liviza footer its complete composition:

```
.site-footer { background-color:#1a2d39; position:relative }
.site-footer:before { background: url(../images/footer-pattern.png) no-repeat 0 0; top:0; left:30px; width:100%; height:100% }
```

LFB-104 added a **second** decorative layer in
`public/vz-public/css/vz-polish.css:264-266`:

```
.site-footer .pbmit-footer-widget-area { background-image: url("/vz-public/images/pattern/vz-footer-pattern.svg"); }
```

Two overlapping patterns (source PNG pattern + new SVG wedge/diagonals) stack over
the same area, producing the rejected look.

Fix: delete only that one rule block from `vz-polish.css`. The original Liviza
`:before` composition is then restored untouched. `vz-footer-pattern.svg` becomes
unreferenced; it stays on disk (no asset deletion in this batch) and is recorded as
retired in the image register. No footer markup or content in
`src/lib/public/template/chrome.ts` changes.

### B. Inner page-top too busy

FACT. `vz-polish.css:179-191` sets `.pbmit-title-bar-wrapper` to
`url(/vz-public/images/pattern/vz-page-top.svg)` — a 1920×650 illustration with an
off-white plane, multiple facets and a light wedge that lands behind the absolute
header menu (`shortcode.css:1397-1403`: `.header-style-1 .site-header-menu` is
`position:absolute` over the title bar).

Approved visual source: the homepage services band
`section.section-lgx.service-one-bg.pbmit-bg-color-blackish`
(`liviza-home.html.ts:255`), whose language is
(`style.css:105-128`): solid blackish base + two restrained corner patterns
(`bg-pattarn.png` 474×448 bottom-right at `right:100px`, `bg-pattarn-left.png`
309×448 top-left) + `p { color:#9faebe }`.

Fix (CSS-only, no markup duplication), in `vz-polish.css`:

- `.pbmit-title-bar-wrapper` → `background-color: var(--pbmit-blackish-color)`,
  `background-image: none` (drop the SVG entirely).
- Add the two Liviza corner patterns as the only decoration, using the existing
  ported source assets
  `/vz-public/liviza/assets/images/homepage-1/bg/bg-pattarn.png` (bottom-right) and
  `bg-pattarn-left.png` (top-left), via two multiple-background layers on the
  wrapper (not new pseudo-elements — `:before` is already used and must remain the
  click-through overlay from POLISH-001-CORRECTION).
- Keep the existing `pointer-events:none` and `position:relative` containment rules.
- Overlay `:before` becomes a flat, very light darkening only
  (`rgba(8,20,40,0.25)`) — no gradient wedge, so the navigation zone is dark by base
  colour rather than by illustration.
- Title, breadcrumb and header menu stay `#ffffff`; breadcrumb separators/inactive
  links may use `#9faebe` to match the services band.
- Keep the existing long-title wrapping rules (`overflow-wrap`, `word-break`).
- Below 992px, hide the two corner patterns (they are 448px tall fixed art) so the
  mobile page-top is a clean blackish field.

Contrast gate: measured white-on-base contrast must be ≥ 7:1 for the h1 and ≥ 4.5:1
for breadcrumb/menu text at every tested viewport, sampled at the darkest and
lightest pixel under the text bounding boxes. `#1a2d39`/blackish vs `#ffffff`
exceeds 12:1, so the gate is expected to pass with margin; it is still measured and
recorded per route.

### C. Homepage hero navigation controls

FACT. `chrome.ts:228` sets `data-dots="true" data-arrows="true"`; Liviza
`scripts.js` then injects the pagination bullets and the prev/next buttons whose
icon glyphs render as the reported cross/X shapes over the hero.

Fix: `data-dots="false" data-arrows="false"` on the hero `.swiper-slider` only
(the services and stakeholder carousels keep their own settings). Autoplay stays
`false`, `data-loop` becomes `false` so drag has real start/end bounds and no
duplicate DOM slides. Swiper drag/swipe remains enabled by default → the carousel is
pointer/touch draggable and keyboard-reachable through the slide links.

Accessibility: keep `aria-roledescription="carrousel"` and the label on the
container; add `aria-live="polite"` plus a visually hidden
"Dia X van 3" status line updated on `slideChange` from
`public/vz-public/js/vz-polish.js` (existing isolated script, no new dependency).
Add defensive `vz-polish.css` rules hiding `.pbmit-slider-one .swiper-button-next/prev`
and `.pbmit-slider-one .swiper-pagination` in case the plugin still appends them.

### D. Header wrapping / CTA

FACT. `navItems()` in `chrome.ts:49-63` renders 7 top-level items
(Home, Over ons, Diensten, Aanvraaghulp, Documentenlijsten, Nieuws, Contact) next to
branding and the phone block; at ≥1200px the row exceeds the available width and
Contact wraps.

Fix, binding solution:

- Remove the `Contact` item from `navItems()` (6 items remain).
- Restore the original Liviza top-right CTA slot inside `.pbmit-right-side`,
  after the phone block, using the source markup
  `<div class="pbmit-header-button"><a class="pbmit-btn" href="/contact">…</a></div>`
  — styled by the existing `shortcode.css:1387-1396` rules
  (`padding:0 40px 0 30px; height:64px`), so it is the original slot, not a new one.
- CTA label: `Contact`, target `/contact`, `aria-current` handled by the active
  class logic.
- `Aanvraaghulp` stays an ordinary menu item.
- Mobile: `.pbmit-header-button` is hidden in the Liviza mobile header, so the
  mobile menu must gain exactly one `Contact` entry. Implementation: keep the
  Contact `<li>` in the navigation list but hide it at `xl` and up via
  `vz-polish.css` (`@media (min-width:1200px){ .main-menu li.vz-nav-contact{display:none} }`),
  and hide `.pbmit-header-button` below 1200px. Contact then appears exactly once at
  every viewport and never disappears.
- Phone/"Heeft u vragen?" block and all mobile toggle behaviour unchanged.

### E. Category page sidebar

FACT. `src/lib/public/template/liviza-category.html.ts:71-97` still renders
`col-lg-8` content plus a `col-lg-4` right column with the "Categorieën" and
"Documenten" widgets.

Fix: drop the sidebar column, make the content column `col-12`, and re-grid the
service cards to the full-width Liviza grid `col-md-6 col-lg-4` (unchanged card
markup, now three per row on desktop instead of two). Intro paragraph keeps its
`pb-2` rhythm. Category switching remains available through the header Diensten
dropdown and the footer Diensten column, so no navigation is lost;
`/documentenlijsten` remains reachable from header and footer.

Service detail (`liviza-service-detail.html.ts`) is **not** touched; the audit
separately confirms all 15 `/diensten/$categorie/$slug` routes are sidebar-free.

---

## 2. Exact files and selectors

| File | Change |
|---|---|
| `public/vz-public/css/vz-polish.css` | remove footer-pattern rule; replace page-top block with blackish + two Liviza corner patterns + flat overlay + <992px simplification; add hero control hide rules; add nav Contact visibility media queries |
| `src/lib/public/template/chrome.ts` | hero `data-dots/arrows/loop=false`; remove Contact from desktop nav ordering (class `vz-nav-contact`); add `pbmit-header-button` CTA in `.pbmit-right-side`; hero live-region span |
| `public/vz-public/js/vz-polish.js` | add hero `slideChange` → update visually hidden "Dia X van 3" status |
| `src/lib/public/template/liviza-category.html.ts` | remove right sidebar, `col-12` content, `col-md-6 col-lg-4` cards |
| `docs/vz-juspol-gen/execution-evidence/LFB-104-REMEDIATION-001/**` | REPORT.md, MANIFEST.md, `screenshots/` with route/viewport index |

No other file is touched. `vz-page-top.svg` and `vz-footer-pattern.svg` remain on
disk but unreferenced (recorded as retired).

---

## 3. Before / after behaviour

| Area | Before | After |
|---|---|---|
| Footer | two stacked patterns | original Liviza `:before` pattern only, content identical |
| Page-top | busy multi-facet illustration, light wedge behind menu | calm blackish field with the two restrained Liviza corner patterns; white title/breadcrumb/menu |
| Hero | 3 slides + arrows (X glyphs) + dots, loop duplicates | 3 slides, no visible controls, no autoplay, drag/swipe + SR status |
| Header | 7 items, Contact wraps to 2nd line | 6 items + top-right `Contact` CTA in the original Liviza slot; Contact once on mobile |
| Category pages | content + right sidebar, 2 cards/row | full-width 3 cards/row, no sidebar |

---

## 4. Audit + test matrix (executed in the remediation batch)

Routes: `/`, `/over-ons`, `/diensten`, 6 × `/diensten/$categorie`, 15 ×
`/diensten/$categorie/$slug`, `/aanvraaghulp` (step 1, step 2, 15 terminal
outcomes), `/documentenlijsten` (all category tabs), `/veelgestelde-vragen`,
`/nieuws`, `/instanties`, `/contact`, `/privacy`, `/disclaimer` — 32 renderable
pages plus wizard states.

Viewports: 1440, 1280, 992, 768, 390, 375, 320.

Checks per route/viewport: header wrapping/overlap/contrast; page-top calmness,
title wrapping and measured contrast; hero crop, text safe area, zero visible
controls; section spacing; equal card heights; absence of category/detail sidebars;
footer single-pattern composition; missing images/icons (404 sweep); horizontal
overflow (`scrollWidth - clientWidth`); mobile menu open/close and single Contact;
tabs keyboard + pointer with exactly one visible panel; carousels drag-only;
wizard full path and restart; all 17 PDF links resolve `200` + `%PDF-`;
console/runtime errors (the known hydration warning is disclosed, not newly
introduced).

Screenshots saved durably under
`docs/vz-juspol-gen/execution-evidence/LFB-104-REMEDIATION-001/screenshots/`
as `<route-slug>@<width>.png`, indexed in `MANIFEST.md`. This is executor
self-check evidence only; no independent validation is claimed.

Known inherited item, not in scope unless it is proven to come from A–E: the 30px
horizontal overflow observed at 1440 on `/`, `/aanvraaghulp`, `/instanties`,
`/diensten`. The audit re-measures it; if the cause turns out to be the page-top or
hero decoration being replaced here, it is fixed in this batch and reported,
otherwise it is reported as still open.

---

## 5. STOP conditions

Stop and report `STOPPED — BLOCKER` on: any need to change `/admin/*`, a PDF, a
dependency, config, backend/Cloud/auth; any required governed content invention;
inability to reach the contrast gate without a new illustration; a Liviza source
asset missing from the ported tree; a route/typecheck/build failure not resolvable
inside the listed files; or any scope expansion beyond A–E plus the audit.

---

## 6. Disclosures

- Weak assumption: that hiding the header CTA below 1200px and the nav Contact item
  above 1200px lands exactly on the Liviza mobile-menu breakpoint
  (`navbar-expand-xl`). If the ported responsive CSS switches at a different width,
  the media-query value is adjusted during execution and reported.
- Missing constraint: no approved rule states whether the category pages may keep a
  visible category switcher elsewhere on the page after the sidebar is removed. This
  plan relies on the header dropdown and footer only.
- Material failure risk: the page-top rebuild uses Liviza raster corner patterns
  designed for a 448px-tall band inside a 650px slot; at wide viewports they may
  read as too small or mis-anchored, requiring one bounded CSS position/size
  correction round after visual review.

---

## 7. Proposed Build Mode release text for Delroy

> FOR ACT-LOVABLE — LFB-104 REMEDIATION 001 EXECUTION
> Delroy releases exactly one bounded Build Mode batch implementing LFB-104
> Visual Remediation Plan 001 items A–E, the full route/viewport audit, and durable
> evidence under `docs/vz-juspol-gen/execution-evidence/LFB-104-REMEDIATION-001/`.
> Permitted files: `public/vz-public/css/vz-polish.css`,
> `public/vz-public/js/vz-polish.js`, `src/lib/public/template/chrome.ts`,
> `src/lib/public/template/liviza-category.html.ts`, and the evidence directory.
> Rollback point `bfabff6d291ba15ce62b3000e343b896d1b8ec74`.
> Forbidden: backend, database, Supabase/Cloud, auth, personal data, uploads,
> payments, email, `/admin/*`, PDF modification, dependencies, publication or
> deployment, visibility changes, GitHub actions, old-site deletion, content-policy
> changes and new image generation. Stop after the report.

---

REMEDIATION PLAN COMPLETE — AWAITING DELROY APPROVAL
