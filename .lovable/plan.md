# LFB-105 POST-VALIDATION REMEDIATION PLAN 002

PLAN MODE ONLY. No application file changed in this turn.

## 0. Authority, attachments and baseline

All seven attached ACT-CODEX documents were read completely and are treated as the binding
acceptance evidence: post-execution validation 001, defect-disposition register,
route × viewport result matrix, residual risk and recommendations, correction contract draft 001,
post-validation evidence manifest, screenshot index. Where the earlier Lovable self-validation
conflicts with this package, the Codex evidence governs.

Baseline verified read-only this turn:

- Current application HEAD: `6572576695ecc1285dc6e1cc75c1df744c8f88e0` ("Fixed LFB-105 overflow issues") — matches the commit under remediation. No later application-code delta. No STOP condition triggered.
- Project remains private and unpublished; database remains disabled.

Defect identifiers, corrected as instructed: **D-001 OPEN**, **D-002/D-003/D-004/D-005 RESOLVED**
(D-004 is the hydration/deferred-script defect and is not reopened), **D-006 OPEN** (hero
previous/next controls), **E-001 OPEN** (evidence accounting).

## 1. D-006 — hero previous/next controls (causal diagnosis CONFIRMED)

Measured this turn at 320 px on the running preview:

- The controls are rendered as `button.vz-sr-button[data-vz-hero]` inside `.vz-hero-carousel`.
- Computed geometry: `position: absolute`, **x = -1 px**, 1 × 1 px, `clip: rect(0,0,0,0)`.
  A real pointer activation is refused — Playwright reports "Element is outside of the viewport" —
  which reproduces the Codex observation that a forced user-visible click does not advance the hero.
- The JavaScript binding is **not** the fault: a programmatic activation advances the hero
  correctly (`realIndex` 0 → 1, status "Dia 1 van 3" → "Dia 2 van 3", active slide changes).
- The wrapper transform Codex measured stays `matrix(1,0,0,1,0,0)` by design: the hero uses
  `data-effect="fade"`, which animates opacity and never translates the wrapper. Slide state must
  be asserted on `realIndex` / active slide / live status, not on the wrapper transform.

Fix (smallest causal change, CSS only): replace the off-viewport `left: -1px` offset in the
`.vz-sr-button` / `.vz-sr-status` rule with the standard in-viewport visually-hidden pattern
(`left: 0`, 1 × 1 px, `clip-path: inset(50%)`, `white-space: nowrap`), keeping the existing
`:focus-visible` reveal untouched. The buttons stay invisible, no visible slider navigation is
added, three slides and autoplay-off stay as approved, `livizaHead()` keeps emitting no scripts,
and `vz-polish.js` is not modified.

## 2. D-001 — homepage document overflow at 320 px (diagnosis UNCONFIRMED — measure first)

Codex measured `scrollWidth` 309 against `clientWidth` 305 at 320 px, with the excess reaching the
home service-carousel section. Reproduction attempts this turn under headless Chromium returned
`scrollWidth` 320 / `clientWidth` 320 at both 320 and 375 px, i.e. **no scrollbar was present**, so
the failing condition (a 15 px classic scrollbar reducing the content box to 305 px) was not
reproduced locally. Every element measured past the viewport edge lies inside a `.swiper-wrapper`
whose `.swiper-slider` ancestor already has `overflow: hidden`, so those slides are not the cause in
the no-scrollbar condition.

Therefore the first execution step is diagnosis, not a fix:

1. Reproduce the 305 px content-box condition (forced classic scrollbar, or an explicit 305 px
   content width) and record `documentElement.scrollWidth` / `clientWidth`.
2. Walk the DOM for the deepest elements whose right edge exceeds the content box and are not
   clipped by an ancestor, recording tag, class, computed width/margins/position and section.
3. Only then correct the identified content geometry in the smallest causal rule.

Constraints: no new or widened `overflow-x: hidden` on `html`, `body`, `#root` or any wrapper;
the pre-existing Liviza `body { overflow-x: hidden }` (`base.css:60`, `responsive.css:9`) is source
styling, is not relied on as the fix, and is not extended. The carousel, Liviza styling, copy,
images and CTA behaviour are preserved, and 375/768/1024/1440 must not regress.

Quality challenge accepted: more than one contributor is possible. Every element identified in
step 2 is corrected or explicitly recorded as clipped/benign; the carousel is not assumed to be
the sole cause without measured geometry.

## 3. E-001 — evidence-accounting correction

The LFB-105 execution manifest states "34 entries × 9 widths" while the screenshot set is
32 routes × 3 widths = 96 files. The correction re-derives the audited entry list from an explicit
enumeration of the 32 governed public routes and either (a) names the two additional entries with
their route paths and widths, or (b) deletes the unsupported aggregate and replaces it with the
verified "32 routes × 9 widths" statement plus a complete route-entry-to-width mapping. No guessing:
if the two extra entries cannot be identified from the re-run enumeration, the claim is deleted
rather than rationalised. Accepted ACT-CODEX documents are not edited.

## 4. Exact files proposed for the future execution batch

| File | Change |
| --- | --- |
| `public/vz-public/css/vz-polish.css` | D-006: in-viewport visually-hidden geometry for `.vz-sr-button` / `.vz-sr-status`. D-001: the single causal geometry rule identified by measurement (scoped to the causal selector, no global overflow clipping). |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/REPORT.md` | E-001 accounting correction only. |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/MANIFEST.md` | E-001 accounting correction only. |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-POST-VALIDATION-CORRECTION-001/REPORT.md` | New correction report. |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-POST-VALIDATION-CORRECTION-001/MANIFEST.md` | New evidence manifest with complete route-entry-to-viewport index. |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-POST-VALIDATION-CORRECTION-001/screenshots/` | Before/after captures for D-001 and D-006 plus the regression sweep. |

If measurement shows the D-001 cause sits in template markup rather than CSS, the affected file
(`src/lib/public/template/liviza-home.html.ts` or `src/lib/public/template/chrome.ts`) is named and
approved before it is written; it is not changed silently. `vz-polish.js`, `LivizaTemplatePage.tsx`
and all other application files stay untouched.

## 5. Protected / preserved

D-002 responsive long-title and document-panel behaviour; D-003 clean flow on all 15 service-detail
routes; D-004 hydration fix, single post-mount script path and clean console; D-005 equal-height
cards; the Liviza service-detail composition without the old sidebar; mobile menu, SPA navigation,
document tabs and Aanvraaghulp; all governed Dutch content; all 17 registered PDFs; all approved
images and aspect ratios; `/admin/*` isolation; private and unpublished state.

## 6. Forbidden

No `/admin/*`, PDF or document-content change, no service/category content change, no image or logo
work, no backend, database, Cloud, auth or storage, no dependency, lockfile, environment or
configuration change, no project-knowledge change, no GitHub, deployment, publication or visibility
change, no unrelated styling or redesign, no edit to accepted ACT-CODEX documents.

## 7. Validation required after the future execution

- D-001: before/after `documentElement.scrollWidth` vs `clientWidth` at 320 and 375 px, with the causal element named and its measured geometry recorded.
- D-006: hero previous and next at desktop and mobile — real pointer activation and keyboard activation, asserting `realIndex`, active slide and the live status text ("Dia 1 van 3" → "Dia 2 van 3" → "Dia 3 van 3"), plus focus-visible reveal; wrapper transform is explicitly not used as the assertion.
- Console clean on direct load and after SPA navigation, including zero hydration messages.
- Regression sweep at 320, 375, 768, 1024 and 1440 px across all 32 governed public routes.
- Preservation checks for D-002 through D-005, tabs, mobile menu and Aanvraaghulp.
- `/admin/*` byte-diff zero; 17 PDFs byte-unchanged.
- Independent ACT-CODEX post-correction validation afterwards.

## 8. STOP conditions

Stop and report if: HEAD differs from `6572576695ecc1285dc6e1cc75c1df744c8f88e0` at execution time;
D-001 cannot be tied to a specific causal element and property; a hero fix would require restoring
pre-hydration script execution; any fix would require global overflow hiding; a protected surface
must change; the evidence counts cannot be reconciled without guessing; or new authority, secrets or
external actions are required.

## 9. Residual assumptions

- D-001 is assumed reproducible under a 305 px content box; if it is not reproducible at execution
  time, the finding is recorded with measurements rather than "fixed" by a speculative rule.
- D-006 is assumed to be solely the off-viewport control geometry; the click-path is re-verified
  with a genuine pointer event after the change.

---

PLAN STATUS: PLAN UPDATED / BUILD NOT RELEASED
NEXT ACTOR: ACT-CHATGPT
NO LOVABLE BUILD EXECUTION RELEASED
NO PUBLICATION OR DEPLOYMENT RELEASED
