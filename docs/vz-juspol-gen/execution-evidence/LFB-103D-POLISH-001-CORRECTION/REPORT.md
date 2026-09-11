# LFB-103D POLISH 001 — TARGETED CORRECTION ROUND

Baseline commit: 80e38b6a8579ccd31c40882b65d007721972c645.
Scope: exactly the two rejected areas (Documentenlijsten tabs, service-detail sidebar).

## Correction A — Documentenlijsten tabs

### Root-cause diagnosis (why `vz-polish.js` appeared to fail)

The custom delegated tab script was not the failing part. The ported Liviza rule

```css
.pbmit-title-bar-wrapper:before { position: absolute; top:0; left:0; width:100%; height:100%; }
```

has no positioned ancestor in the ported markup, because `.pbmit-title-bar-wrapper`
itself is `position: static`. The decorative overlay therefore resolved against the
initial containing block and stretched over the **entire page**, intercepting every
pointer event below the title bar on all inner routes. Playwright confirmed this:
clicking a tab reported `<div class="pbmit-title-bar-wrapper"> intercepts pointer
events`, and `document.elementFromPoint()` at the tab coordinates returned the title
bar wrapper. This matches Delroy's real-preview finding exactly.

### Fix

1. `public/vz-public/css/vz-polish.css` — restore the containing block
   (`.pbmit-title-bar-wrapper { position: relative }`) and make the purely decorative
   `:before` overlay `pointer-events: none`. No visual geometry changes.
2. `src/lib/public/template/liviza-documenten.html.ts` — the category switcher now uses
   the **bundled Bootstrap 5.2 tab component** already shipped with Liviza
   (`ul.nav.nav-tabs` + `button[data-bs-toggle="tab"][data-bs-target]` +
   `.tab-content > .tab-pane`). No dependency added.
3. `public/vz-public/js/vz-polish.js` — the custom delegated tab controller was removed.
   Bootstrap 5.2 does not implement `Home`/`End` for tablists, so the file now contains
   only that single, delegated addition (activates first/last tab).
4. `public/vz-public/css/vz-polish.css` section 5 was re-scoped to `.nav-link.vz-tab`
   so the accepted compact Liviza appearance is preserved on the Bootstrap markup.

### Verification (Playwright, dev preview)

| Check | Result |
| --- | --- |
| Tab count | 6 (Verblijf, Vestiging, Naturalisatie, Ingezetenschap, Asiel, Overig) |
| Click each tab (direct load, 1440) | all six switch; exactly 1 visible panel each time |
| Keyboard ArrowRight ×2 | focus + panel move Vestiging → Naturalisatie |
| Keyboard End | focus + panel = Overig |
| Keyboard Home | focus + panel = Verblijf |
| Exactly one panel active | true for every interaction (`.tab-pane.active.show` count = 1) |
| SPA navigation (home → link → /documentenlijsten) | tab 3 click switches to `panel-naturalisatie` |
| Mobile 375 | tab 2 click switches to `panel-vestiging` |
| PDF links in DOM | 17 |
| HTTP responses ≥400 | none |

Screenshots: `screenshots/documenten-1440-verblijf.png`, `documenten-1440-overig.png`,
`documenten-375-verblijf.png`, `documenten-375-vestiging.png`.

## Correction B — Service-detail sidebar removed

`src/lib/public/template/liviza-service-detail.html.ts` now renders a single
full-width Liviza column (`.container > .row > .col-md-12`). The right column
(`.pbmit-sidebar.vz-sidebar`) and all its widgets are gone.

Relocated content, existing Liviza patterns only:

| Former sidebar item | New placement |
| --- | --- |
| Official PDF widget | `assessment-one` download block directly below the Documenten section |
| Related services list | `pbminfotech-servicebox-style-2` card row below the document block, max 3 on desktop (`col-md-6 col-lg-4`), natural responsive collapse |
| Contact widget | merged into the single bottom `assessment-one` callout (Documentenlijsten + Naar contact), no duplicate callout |
| Service code box | removed (not required publicly) |
| Category | breadcrumb + one concise inline category link |
| Fee / legal basis / processing | unchanged `pbminfotech-ihbox-style-2` fact cards above the checklist, governed values only |

### Verification

- All 15 service-detail routes crawled: HTTP 200, `.vz-sidebar/.pbmit-sidebar` count = 0,
  official-document link present on each, no responses ≥400.
- Widths 1440 / 992 / 768 / 375 / 320 on two routes: no horizontal overflow at
  992/768/375/320 (`scrollWidth === clientWidth`). At 1440 `scrollWidth` is 1470 vs
  1440 — an inherited Liviza header/container condition present sitewide before this
  correction round; not introduced here.
- No stranded sidebar spacing (single full-width column, no empty grid cell).
- Screenshots: `screenshots/service-detail-{1440,992,768,375,320}.png`.

## Global checks

- `bunx tsgo --noEmit`: clean. `bun run build`: exit 0.
- Console: only the pre-existing hydration-attribute warning from the
  `dangerouslySetInnerHTML` template wrapper. No new errors. No 404s.
- 17 PDFs re-verified: 17 files, 8,848,320 bytes total, every file starts with `%PDF-`,
  aggregate checksum `75c0ad96a9b58a146afe60427fc4cd8b5ccb071f3a5732ef93873212251f8a9d`
  (unchanged, binaries untouched).
- `/admin/` still responds (307 auth redirect, unchanged); no file under `src/routes/admin/**`,
  `src/lib/admin/**` or `public/admin/**` was written.
- No dependency, config, backend, database, Cloud, secret, GitHub, deploy or publish change.
- No image or logo generation.
- Accepted areas untouched: homepage, stakeholder carousel, contact, /over-ons,
  /diensten overview, FAQ, news, privacy, disclaimer. The only shared change is the
  title-bar overlay containment fix, which was strictly necessary to make any inner-page
  interaction work.

## Verdict

TARGETED CORRECTION COMPLETE — READY FOR VISUAL REVIEW
