# LFB-105 POST-VALIDATION REMEDIATION PLAN 002

PLAN MODE ONLY. No application file changed in this turn.

## 0. Authority, attachments and baseline

Each of the seven attached ACT-CODEX documents was opened separately and read in full this turn
(no combined command, no `head`, no truncation). Per-file proof:

| Attachment | Lines | Bytes | Read completely |
| --- | ---: | ---: | --- |
| `CODEX-LFB-105-POST-EXECUTION-VALIDATION-001.md` | 54 | 4193 | yes (1–54) |
| `DEFECT-DISPOSITION-REGISTER.md` | 12 | 1708 | yes (1–12) |
| `ROUTE-VIEWPORT-RESULT-MATRIX.md` | 46 | 3262 | yes (1–46) |
| `RESIDUAL-RISK-AND-RECOMMENDATIONS.md` | 12 | 1303 | yes (1–12) |
| `LOVABLE-LFB-105-POST-VALIDATION-CORRECTION-CONTRACT-DRAFT-001.md` | 27 | 1644 | yes (1–27) |
| `CODEX-LFB-105-POST-VALIDATION-EVIDENCE-MANIFEST.md` | 16 | 1888 | yes (1–16) |
| `SCREENSHOT-INDEX.md` | 21 | 1528 | yes (1–21) |

Where the earlier Lovable self-validation conflicts with this package, the Codex evidence governs.

Baseline verified read-only this turn:

- Current application HEAD: `6572576695ecc1285dc6e1cc75c1df744c8f88e0` ("Fixed LFB-105 overflow issues") — matches the validated commit. No later application-code delta. No STOP condition triggered.
- Project remains private and unpublished; database remains disabled.

Defect identifiers, corrected as instructed: **D-001 OPEN**, **D-002/D-003/D-004/D-005 RESOLVED**
(D-004 is the hydration/deferred-script defect and is not reopened), **D-006 OPEN** (hero
previous/next controls), **E-001 OPEN** (evidence accounting).

## 1. D-006 — hero previous/next controls

### 1.1 Measured facts

- The only hero controls in the markup are two visually hidden buttons
  `button.vz-sr-button[data-vz-hero="prev"|"next"]` plus a live status
  `p.vz-sr-status` inside `.vz-hero-controls` (`chrome.ts:243-246`).
- The hero carousel is declared `data-dots="false" data-arrows="false"` (`chrome.ts:238`), and
  `vz-polish.css:396-401` additionally forces `.swiper-button-next`, `.swiper-button-prev`,
  `.swiper-buttons` and `.swiper-pagination` to `display: none !important` on the hero. This is the
  approved LFB-104 outcome: the intrusive cross-like navigation was deliberately removed.
- Computed geometry of the hidden buttons at 320 px: `position: absolute`, **x = -1 px**, 1 × 1 px,
  `clip: rect(0,0,0,0)` — outside the viewport box, so a real pointer activation is refused
  ("Element is outside of the viewport"), which reproduces the Codex observation.
- The JavaScript binding is **not** at fault: a programmatic activation advances the hero correctly
  (`realIndex` 0 → 1, status "Dia 1 van 3" → "Dia 2 van 3", active slide changes).
- The hero uses `data-effect="fade"`, which animates opacity and never translates
  `.swiper-wrapper`; the transform stays `matrix(1,0,0,1,0,0)` by design. Slide state must be
  asserted on `realIndex` / active slide / live status, never on the wrapper transform.

### 1.2 A — visible pointer/touch path: NO APPROVED CONTROL EXISTS — DELROY DECISION REQUIRED

Inventory result: after the approved LFB-104 removal of the cross-like navigation, the hero has
**no visible pointer or touch control at all** — no arrows, no dots, no thumbnails, no visible
"volgende" affordance. Drag/swipe on the hero is also not an approved substitute for a fade slider
and is not assumed here.

This is stated as a user-experience constraint, not solved by invention: a mouse or touch visitor
currently cannot advance the hero by any intentional means. No new navigation design is proposed in
this plan. Delroy must choose one of:

- **Option 1 — accept as designed:** the hero stays advance-by-keyboard/assistive-technology only;
  D-006 is then closed for the pointer path by decision, and only the keyboard path is corrected.
- **Option 2 — restrained Liviza dots:** re-enable the hero's own
  `.swiper-pagination`/`swiper-pagination-bullet` pattern already present in the Liviza source and
  used elsewhere on the homepage (`swiper-btn-right-dots`), styled with the existing template
  appearance only — small bullets, no arrows, no overlay cross. Implementation would be
  `data-dots="true"` on the hero plus removal of the hero-only `display: none` for
  `.swiper-pagination`, keeping the arrow suppression intact.
- **Option 3 — no hero rotation:** reduce the hero to a single static slide, removing the control
  question entirely.

Execution of the pointer path does not start until Delroy names the option. Nothing visible is
changed without that decision.

### 1.3 B — keyboard/accessibility path (correctable now)

The two hidden buttons keep an in-viewport visually-hidden pattern: `left: 0` instead of the current
off-viewport `-1px` offset, 1 × 1 px, `clip-path: inset(50%)`, `white-space: nowrap`, with the
existing `:focus-visible` reveal (visible outlined button at the top-left of the hero) untouched.
They must be reachable with Tab, activate with Enter and Space, change the active slide, and update
the live status. CSS only; `vz-polish.js` is not modified and `livizaHead()` keeps emitting no
scripts.

### 1.4 C — acceptance distinction

- Visible arrows/dots: tested with genuine pointer and touch activation **only if** Delroy releases
  Option 2; not applicable under Option 1 or 3.
- Hidden accessibility controls: tested with keyboard focus plus Enter and Space — never with a
  pointer click against a hidden 1 × 1 target.
- Screen-reader labels ("Vorige dia", "Volgende dia") and the `role="status"` live region are
  verified separately.
- Assertions use Swiper `realIndex`, the active slide element and the status text; the wrapper
  transform is explicitly not used.
- Three slides and autoplay-off are preserved; no scripts are reintroduced into `livizaHead()`.


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
- D-006 keyboard path: Tab to "Vorige dia" / "Volgende dia", activate with Enter and Space at desktop and mobile widths, asserting `realIndex`, active slide and the live status text ("Dia 1 van 3" → "Dia 2 van 3" → "Dia 3 van 3"), plus the focus-visible reveal; no pointer click is asserted against a hidden control and the wrapper transform is not used as an assertion.
- D-006 pointer/touch path: only if Delroy releases Option 2 (restrained Liviza dots) — genuine pointer and touch activation with the same `realIndex` / active-slide / status assertions.
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
external actions are required. **Already triggered:** the hero has no approved visible pointer/touch
control, so the D-006 pointer path is halted pending Delroy's choice between Option 1, 2 and 3 in
section 1.2. No new navigation design is invented.

## 9. Residual assumptions

- D-001 is assumed reproducible under a 305 px content box; if it is not reproducible at execution
  time, the finding is recorded with measurements rather than "fixed" by a speculative rule.
- D-006 keyboard path is assumed to be solely the off-viewport control geometry; it is re-verified
  with genuine keyboard focus and Enter/Space after the change.
- D-006 pointer path remains blocked on the Delroy decision above.

---

PLAN STATUS: PLAN UPDATED / BUILD NOT RELEASED
NEXT ACTOR: ACT-CHATGPT
NO LOVABLE BUILD EXECUTION RELEASED
NO PUBLICATION OR DEPLOYMENT RELEASED
