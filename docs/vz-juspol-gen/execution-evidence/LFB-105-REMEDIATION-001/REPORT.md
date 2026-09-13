# LFB-105 STRUCTURAL REMEDIATION 001 — EXECUTION REPORT

Actor: ACT-LOVABLE
Scope: public frontend only. No `/admin/*`, no Cloud/Database/Supabase, no auth,
no storage, uploads, payments, email, secrets, GitHub, deployment or publication.
Governed content, the 17 registered institutional PDFs and the Liviza transport
archive are unchanged.

## 1. Defects and resolutions

### D-001 — Homepage overflow at narrow widths
Root cause: the Liviza services band paints a fixed 309px decoration through
`.service-one-bg:after`. On a content box narrower than 309px (a 320px viewport
with a classic 15px scrollbar = 305px) that decoration alone extended the
document. Liviza itself clips this at `<=280px`.
Fix: the same template mechanism (`overflow: hidden` on `.service-one-bg`) is
extended to `<=400px` in `public/vz-public/css/vz-polish.css`. Word-safe
wrapping (`overflow-wrap: break-word; hyphens: auto`) on hero and heading text;
no `overflow-x: hidden` on the document, no truncation.

### D-002 — `/diensten/vestiging/omzetten-toelatingsbeschikking` overflow
Root cause: `.pbmit-title-bar-content` is `display: table; width: 100%`. A table
box can never be narrower than its longest unbreakable word
("toelatingsbeschikking"), so at 305px the title zone forced a 298px box inside
a 266px content area.
Fix: below 400px the title zone falls back to normal block flow
(`.pbmit-title-bar-content` / `-inner` → `display: block`) and the nested
`.pbmit-tbar-inner.container` is constrained to 100%. The existing word-safe
wrapping then applies. Title-zone height is unchanged (650px measured at 305,
320, 375 and 768).

### D-003 — Related-service grid colliding with the preparation panel
Fix: the related-service block is wrapped in `.vz-related-grid`
(`display: flow-root`) and the preparation/document panels carry
`.vz-detail-panel` (`margin-top: 0; clear: both`, 40px separation after the
grid). No negative margins, no absolute positioning, no fixed heights.
Measured collision count after the fix: 0 on all 15 detail routes at all tested
widths.

### D-004 — Hydration mismatch at `LivizaTemplatePage.tsx:113`
Root cause: the ported Liviza scripts were emitted as deferred `<script>` tags
through `livizaHead()`. They executed against the server-rendered DOM before
React hydrated and mutated it (Swiper wrappers, appended pagination), so the
client tree no longer matched.
Fix: `livizaHead()` returns links only; all Liviza scripts are now appended to
`document.body` in a post-mount `useEffect` (single execution path, tagged with
`data-liviza`, cleaned up on unmount). No suppression, no `suppressHydration`.
Result: 0 console errors across 32 routes × 6 widths.

### D-005 — Inconsistent card dimensions
Fix: `.vz-equal-cards` on the `/diensten`, category and related-service rows
makes columns and card internals flex columns with `margin-top: auto` on the
link row, so cards in a row share height intrinsically (3 / 2 / 1 progression
retained, no fixed heights, no clipping).

### D-006 — Hero slide navigation (approved correction)
Visible navigation is restored using the template's own slider-one pagination
dots (right-edge rotated column on desktop; horizontal bottom-centre below
768px, where Liviza hides the strip altogether and it is the only visible
control). No arrows, no autoplay, three slides, loop off. Each dot has a
transparent ~44×44px hit area with 15px spacing so targets cannot overlap;
inactive dots were raised to 75% white with a soft shadow so all three remain
legible over bright photography. The hidden focusable "Vorige dia" /
"Volgende dia" buttons and the `Dia X van 3` live status remain and are
revealed on `:focus-visible`.

Verified: pointer at 1280 (dot 0/1/2 → slide 1/2/3), touch at 375 (same),
keyboard Enter/Space on the hidden buttons, status text updating, autoplay off,
0 visible arrows, 0 console errors.

## 2. Files changed

- `src/lib/public/template/LivizaTemplatePage.tsx` — script execution moved to a post-mount effect.
- `src/lib/public/template/liviza-service-detail.html.ts` — `.vz-related-grid`, `.vz-detail-panel`, `.vz-equal-cards`.
- `src/lib/public/template/liviza-category.html.ts` — `.vz-equal-cards`.
- `src/lib/public/template/liviza-services.html.ts` — `.vz-equal-cards`.
- `src/lib/public/template/chrome.ts` — hero slider `data-dots="true"` (arrows and autoplay stay off).
- `public/vz-public/css/vz-polish.css` — all styling for D-001, D-002, D-003, D-005, D-006.

No other application file was modified.

## 3. Test results

- Route/viewport matrix: 32 public routes × 6 widths (1440, 1024, 768, 430, 320, 305) = 192 measurements.
- Document-level overflow (`scrollWidth > clientWidth`): **0** at every width, including the 305px content box.
- Console errors (including page errors): **0** on every route and width.
- Related-grid / preparation-panel overlap: **0** on all 15 service-detail routes.
- Documentenlijsten tabs: 6 tabs, exactly one visible panel per activation, pointer and keyboard (ArrowRight, End, Home) verified; 17 PDF links present on the page.
- PDFs: 17 files, every file starts with `%PDF-`, none modified.
- Typecheck: clean. Build: OK.
- `/admin/*`: untouched; no admin file is in the change set.

## 4. Residuals

- Hero imagery and the page-top composition remain the previously approved temporary generated assets.
- FAQ and news remain governed empty states.
