# LFB-105 STRUCTURAL REMEDIATION 001 — EXECUTION REPORT

ACTOR: ACT-LOVABLE
BATCH: LFB-105 STRUCTURAL REMEDIATION 001
BASELINE / ROLLBACK REFERENCE: `0bcec76dc5638ca457e4057a05dd8ea5f3706196`
PLAN: `.lovable/plan/lfb-105-structural-remediation-plan-001-rev-002-2026-09-13.md`
EVIDENCE PATH: `docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/`

## 1. Defect dispositions

### D-001 — Document overflow at 320px (homepage) — RESOLVED
Two independent causes were measured and corrected:
1. Long Dutch compound headings (`Vreemdelingenzaken`, 303px at 30px) exceeded the
   298px line box. Corrected with word-safe wrapping on `.pbmit-title` and a single
   smaller heading step (26px/34px) below 480px. No mid-word character breaking.
2. Sitewide 30px overflow caused by the source footer decoration
   `.site-footer:before { left: 30px; width: 100% }` (shortcode.css:1694), which
   extends 30px past the viewport on every route. The pattern is a left-anchored,
   non-repeating image, so the box was constrained to `calc(100% - 30px)`; the
   original composition is unchanged.

### D-002 — `/diensten/vestiging/omzetten-toelatingsbeschikking` at 320px — RESOLVED
`.assessment-one-img` held a fixed padding/min-height box (300px) inside a 277px
column. Below 992px the panel now uses `padding: 0; min-height: 0; aspect-ratio: 16/9`,
content padding `30px 20px`, and both `.pbmit-btn` buttons become full-width blocks
with a 12px gap when they cannot sit side by side.

### D-003 — Related-service grid colliding with "Uw bezoek voorbereiden" — RESOLVED
The related grid is wrapped in `.vz-related-grid` (`display: flow-root`), so the
floated/flex card row is fully contained and the following panel starts after the
computed grid height. `.vz-detail-panel` uses `margin-top: 0; clear: both` with a
40px separation rule. No negative margins, no absolute positioning, no fixed heights.
Verified on all 15 service-detail routes at every audited width: zero overlaps.

### D-004 — Hydration mismatch at `LivizaTemplatePage.tsx:113` — RESOLVED
Diagnosis: the server and client markup strings were byte-identical (44,444 chars,
zero differences), so the mismatch was DOM-level. `livizaHead()` emitted the Liviza
scripts as deferred `<script>` tags, which executed and mutated the server markup
before React hydrated. Fix: `livizaHead()` now returns only `links`; the existing
post-mount `useEffect` is the single script execution path, so scripts run after
hydration and never rewrite the DOM React is about to adopt. No suppression, no
`suppressHydrationWarning`, no public-template boundary crossing.
Result: 0 console errors and 0 hydration messages across 96 page loads and SPA
navigation.

### D-005 — Inconsistent card dimensions — RESOLVED
`.vz-equal-cards` applied to the `/diensten` category row, all six category grids
and the related-service rows: stretch alignment, flex column chains through
`.pbminfotech-*` wrappers, intrinsic content growth and `margin-top: auto` on the
link row. 3/2/1 column progression retained from the Liviza source. Measured equal
heights per row (e.g. `/diensten` @1440: 567/567/567, 540/540/540;
`/diensten/vestiging` @1440: 634/634/634). No clipping (`overflow: visible`).

## 2. Files changed

- `src/lib/public/template/LivizaTemplatePage.tsx` — removed deferred `scripts` from `livizaHead()`.
- `src/lib/public/template/liviza-service-detail.html.ts` — `.vz-detail-panel`, `.vz-related-grid`, `.vz-equal-cards`.
- `src/lib/public/template/liviza-category.html.ts` — `.vz-equal-cards` on the card row.
- `src/lib/public/template/liviza-services.html.ts` — `.vz-equal-cards` on the category row.
- `public/vz-public/css/vz-polish.css` — appended structural rules (wrap safety, mobile detail panel, panel clearance, related grid containment, equal-height cards, footer decoration containment, sub-480px heading step).
- `docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/**` — this report, manifest and 96 screenshots.

No other application file was modified.

## 3. Verification

| Check | Result |
| --- | --- |
| Overflow audit — 34 route entries × 9 widths (320/375/390/430/768/992/1024/1280/1440) | 0 documents with `scrollWidth > clientWidth` |
| Related-grid / preparation-panel overlap, all 15 detail routes, all widths | 0 overlaps |
| Console errors + warnings over 96 loads and SPA navigation | 0 (hydration warning gone) |
| Equal-height rows, `/diensten` + 6 categories + related grids | equal per row, no clipping |
| Tabs `/documentenlijsten` — pointer and keyboard (ArrowRight) | exactly 1 visible panel, 1 selected tab |
| Registered source documents | 17 links, 17 HTTP 200, files byte-unchanged from baseline |
| Aanvraaghulp | 6 categories, 15 terminal outcomes reachable, Back returns step 2 then step 1, Restart clears storage |
| Preparation-only boundary | 0 inputs/textareas/selects/forms, 0 non-GET requests, only categorical keys in `vz-aanvraaghulp` |
| Header / page-top / hero / footer / mobile menu | no regression observed in the screenshot set |
| `/admin/*` | HTTP 200, zero diff against baseline |
| Typecheck (`tsgo --noEmit`) | pass |

## 4. Residuals and disclosures

- The pre-existing inherited 30px overflow at 1440px is now resolved as part of D-001.
- Placeholder/temporary imagery from earlier batches is unchanged by this batch.
- No content, PDF, `/admin/*`, Cloud/Database, auth, storage, deployment or
  publication action was taken.

STATUS: LFB-105 STRUCTURAL REMEDIATION 001 COMPLETE — READY FOR ACT-CHATGPT REVIEW
NEXT ACTOR: ACT-CHATGPT
NO PUBLICATION OR DEPLOYMENT PERFORMED
