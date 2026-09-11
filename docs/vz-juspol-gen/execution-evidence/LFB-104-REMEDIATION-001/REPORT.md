# LFB-104 REMEDIATION 001 — Executor report

Rollback point: `bfabff6d291ba15ce62b3000e343b896d1b8ec74`
Scope: bounded visual remediation A–E of the approved remediation plan.
This is executor self-check evidence only. No independent validation was performed.

## A. Footer background stacking — fixed

Root cause: LFB-104 added
`.site-footer .pbmit-footer-widget-area { background-image: url(vz-footer-pattern.svg) }`
in `public/vz-public/css/vz-polish.css`, while Liviza already paints its own
footer decoration through `.site-footer:before` (`shortcode.css:1688-1702`).
Two decorations stacked.

Change: the added rule was removed; a comment records why. The original Liviza
footer composition is used unchanged; no footer content was altered.

Verification: computed `background-image` of `.pbmit-footer-widget-area` is
`none` on every audited route and viewport.

## B. Inner page-top / breadcrumb — rebuilt from the services band

Root cause: `vz-page-top.svg` was a busy illustration with a light wedge behind
the navigation.

Change: `.pbmit-title-bar-wrapper` now uses the homepage
"Diensten van Vreemdelingenzaken" language — the blackish base colour
(`var(--pbmit-blackish-color)`) with the two restrained Liviza corner patterns
`bg-pattarn.png` (474×448, bottom right at 100px) and `bg-pattarn-left.png`
(309×448, top left), plus a flat `rgba(8,20,40,.25)` veil. Corner art is
suppressed below 992px because it is fixed-height desktop decoration. The
1920×650 slot geometry, title and breadcrumb markup are unchanged.

Contrast gate: title, breadcrumb and the absolute white header menu sit on the
blackish base (#1a1a1a-class token) at all widths; measured computed background
confirms the pattern pair on desktop and the flat base on mobile. Long titles
still wrap (`overflow-wrap: break-word` retained).

## C. Homepage hero controls — removed, accessibility preserved

Change (`src/lib/public/template/chrome.ts`): hero slider now carries
`data-autoplay="false" data-loop="false" data-dots="false" data-arrows="false"`,
so Liviza's own initialiser never appends arrows or pagination. A
`.vz-hero-controls` block adds two visually hidden but focusable buttons
(Vorige dia / Volgende dia) and a polite `Dia X van 3` status.
`public/vz-public/js/vz-polish.js` binds those buttons to the initialised
Swiper instance and updates the status on `slideChange`.
`vz-polish.css` additionally forces any arrow/pagination node to
`display: none` as a defensive rule and reveals the hidden buttons on
`:focus-visible` only.

Verification: 0 visible pagination and 0 visible arrow nodes on the homepage at
all seven audited widths. No autoplay attribute remains.

## D. Header navigation — Contact moved to the original CTA slot

Change: Contact was returned to the Liviza top-right pre-header CTA position
(`li.pbmit-header-button.vz-header-cta`, label "Contact", target `/contact`),
and the ordinary menu item is hidden from ≥1200px via `li.vz-nav-contact`.
Below 1200px the CTA is hidden and Contact appears exactly once inside the
mobile menu. Aanvraaghulp stays an ordinary menu item; the opening-hours block
is preserved.

Verification per viewport on `/contact`:

| Width | Menu Contact visible | Pre-header CTA visible |
| --- | --- | --- |
| 1440 | 0 | 1 |
| 1280 | 0 | 1 |
| 992 | 1 | 0 |
| 768 | 1 | 0 |
| 390 | 1 | 0 |
| 375 | 1 | 0 |
| 320 | 1 | 0 |

No desktop navigation wrapping was observed at 1440 or 1280.

## E. Category sidebar — removed

`src/lib/public/template/liviza-category.html.ts` no longer emits the
"Categorieën" / "Documenten" right column; the service card grid now uses the
full-width Liviza row. Measured: 0 `.service-section .col-lg-4 .widget` nodes on
all six category routes and all 15 service-detail routes, at all seven widths.
The accepted no-sidebar service-detail layout was not changed.

## Full audit

224 measurements: 32 routes (home, 10 static, 6 categories, 15 service details)
× 7 widths (1440, 1280, 992, 768, 390, 375, 320).

- Broken/zero-width images: 0.
- HTTP responses ≥400: 0.
- Console errors other than the inherited hydration attribute warning on
  template-backed routes: 0.
- Horizontal overflow: inherited 30px at 1440 on every route (pre-existing,
  documented in LFB-103D POLISH 001 CORRECTION and unchanged by this round);
  5px on `/` and 1px on `/over-ons` at 320px; 16px on
  `/diensten/vestiging/omzetten-toelatingsbeschikking` at 320px (long
  unbreakable document title). All other route/width combinations: 0.
- All 17 PDFs under `public/vz-public/documenten/` untouched.
- `/admin/*` untouched: no admin file was read for write or modified.

Typecheck passed (`tsgo --noEmit`).

## Files changed

- `public/vz-public/css/vz-polish.css`
- `public/vz-public/js/vz-polish.js`
- `src/lib/public/template/chrome.ts`
- `src/lib/public/template/liviza-category.html.ts`
- this evidence directory

## Disclosed residuals

1. Inherited hydration attribute warning on template-backed routes.
2. Inherited 30px horizontal overflow at 1440 and the three small 320px cases
   listed above.
3. Imagery in hero and content slots remains the LFB-104 generated set.
