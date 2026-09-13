# LFB-105 FINAL FRONTEND CORRECTION PLAN 003 (rev.001)

Actor: ACT-LOVABLE. Mode: PLAN MODE ONLY. No execution released.

## 1. Document-reading proof (all eight, complete)

Each file was opened and read end to end this turn (full-file reads, not
searches or partial ranges).

| # | Filename | Lines | Bytes | Complete read | Document-specific finding used in this plan |
|---|---|---:|---:|---|---|
| 1 | `CODEX-LFB-105-FINAL-FRONTEND-GATE-001.md` | 69 | 6,609 | Yes (1-69) | D-007 causal selector/property: `overflow-wrap: break-word` at polish line 318 and again at 508-518; D-008 causal rule `max-width: 991px` hiding `.swiper-pagination-bullets` while the VZ override only covers `max-width: 767px` |
| 2 | `DEFECT-REGISTER-2.md` | 16 | 1,567 | Yes (1-16) | Correction boundaries: D-007 "title word-wrap behaviour only"; D-008 "approved hero pagination at missing breakpoint only"; D-001..D-005 must not be reopened |
| 3 | `ROUTE-VIEWPORT-RESULT-MATRIX-2.md` | 20 | 2,019 | Yes (1-20) | Only `/` fails (D-007 at 1024/1440, D-008 at 768); 320/375 are `L` limitations, so fresh small-viewport evidence is mandatory; 32-route accounting confirmed |
| 4 | `FRONTEND-COMPLETENESS-MATRIX.md` | 14 | 1,321 | Yes (1-14) | Only the homepage and the vendor/debug surface are blocking; temporary hero and institution imagery stay handover obligations, not part of this correction |
| 5 | `CMS-READINESS-MATRIX.md` | 20 | 2,484 | Yes (1-20) | `heroSlides` in `chrome.ts` is the hero record boundary; a soft-hyphen edit there stays inside the future CMS adapter boundary and needs no template restructuring |
| 6 | `DEPLOYMENT-READINESS-ASSESSMENT.md` | 15 | 1,393 | Yes (1-15) | Rollback reference is `054958b4…` or the later accepted corrective commit; no deployment/visibility action is authorised by this plan |
| 7 | `EVIDENCE-MANIFEST-2.md` | 16 | 1,542 | Yes (1-16) | E-005/E-006 isolate D-007 and D-008; the stated limitation (no sub-768px viewport, no real touch) sets the new evidence obligation |
| 8 | `SCREENSHOT-INDEX-2.md` | 15 | 766 | Yes (1-15) | Evidence must keep a route-to-file index with reconciled counts; new captures go in a separate final-correction folder, leaving the 115 existing files untouched |

## 2. Baseline verification

- Current application commit: `054958b481f5e1cda8957068d222b228b18012ed` — matches the inspected commit.
- Project remains private and unpublished; no database/Cloud connection.
- No STOP condition triggered.

## 3. D-007 — hero title arbitrary-character break (HIGH)

Root cause (verified in source): `public/vz-public/css/vz-polish.css` applies
`overflow-wrap: break-word` to `.pbmit-slider-one .pbmit-slider-content .pbmit-title`
(line 318) and again to the hero title plus its nested `em`/`span` in the
LFB-105 block (lines ~508-518). `break-word` authorises an emergency break at
any character once the preceding words fill the first line, producing
`Vreemdelingenzake` / `n`. `word-break: normal` and `hyphens: auto` do not
suppress an emergency break.

Bounded correction:

1. In `vz-polish.css`, set the hero title (and its `em`/`span`) to
   `overflow-wrap: normal` at the widths where the word fits its own line
   (>= 768px; measured 671px text column at 1440px). Font sizes, line heights,
   overlay, imagery, CTAs and responsive composition unchanged.
2. In `src/lib/public/template/chrome.ts`, add one soft hyphen inside the
   compound (`Vreemdelingen&shy;zaken`) so narrow widths have an intentional,
   typographically correct break opportunity. Wording is unchanged; a soft
   hyphen is invisible unless a break actually occurs.
3. No truncation, no `overflow-x: hidden`, no change to the D-001 service-band
   clipping rule.

D-007 validation must explicitly prove that the soft hyphen:

- appears only when a line break is necessary;
- shows no visible hyphen at any width where the word fits on one line;
- never leaves an isolated fragment (single letter or sub-syllable);
- introduces no document-level horizontal overflow at any tested width.

## 4. D-008 — hero pagination absent at 768-991px (HIGH)

Root cause: Liviza responsive CSS hides
`.pbmit-slider-area .swiper-horizontal > .swiper-pagination-bullets` at
`max-width: 991px`; the VZ override restores it only inside
`@media (max-width: 767px)` (polish lines 443-458), so 768-991px keeps a
hidden, zero-sized pagination container.

Bounded correction: extend that existing override's media condition to
`max-width: 991px` so the homepage hero pagination is shown and positioned
(bottom-centre horizontal strip, the already approved narrow-width pattern)
across the missing band. The desktop right-edge rotated column above 991px is
untouched. Selectors stay scoped to `.pbmit-slider-one` / `.pbmit-slider-area`
hero pagination; no other carousel is affected; no arrows are restored and the
rejected cross-like navigation stays removed.

Preserved unchanged: three native dots, ~44x44px transparent hit areas with
15px spacing, contrast treatment, `:focus-visible` outline, pointer/touch/
keyboard operation, active-dot / active-slide / `realIndex` / "Dia X van 3"
synchronisation, hidden focusable Vorige/Volgende buttons,
`data-autoplay="false"`, `data-loop="false"`, `data-arrows="false"`.

## 5. D-009 — classification only, out of execution scope

Diagnosis performed this turn:

- Case-insensitive repository search for `edit with lovable`, `lovable-badge`,
  `gpteng` (excluding `node_modules` and the lockfile): zero matches in
  application source, templates, CSS or `public/`.
- The HTML document served by the application contains no occurrence of
  `lovable` at all.

Classification: **environment/platform-injected, not application-controlled.**
D-009 is therefore removed from the execution scope and from the allowlist. No
CSS or DOM hiding will be added, and no platform setting is changed by this
task. It is recorded solely as a future deployment/environment condition, to be
decided separately before any stakeholder hosting.

## 6. Future execution allowlist (exhaustive)

| File | Purpose |
|---|---|
| `public/vz-public/css/vz-polish.css` | D-007 wrap rules; D-008 768-991px hero pagination restoration |
| `src/lib/public/template/chrome.ts` | D-007 only: soft hyphen inside the hero compound |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-FINAL-CORRECTION-001/**` | New evidence only: `REPORT.md`, `MANIFEST.md`, `screenshots/` |

Nothing else. Any additional file requires stopping and requesting separate
approval.

## 7. Acceptance matrix (post-correction validation)

Viewports: 320, 375, 430, 768, 1024, 1440.

| Check | Requirement |
|---|---|
| Hero title | No arbitrary-character break, no isolated fragment, no unnecessary visible hyphen, wording unchanged; captured at every width |
| Document overflow | `scrollWidth <= clientWidth` on all 32 public routes at every width |
| Hero dots | Visible and operable at every width including 768-991; three dots; no arrows; autoplay/loop off |
| Interaction | Pointer, keyboard (Enter/Space, focus-visible) and genuine touch emulation at mobile widths |
| Sync | Active dot, active slide, `realIndex` and "Dia X van 3" agree after each activation |
| Console | Zero errors and zero hydration warnings, direct load and SPA navigation |
| D-001..D-006 | No regression: service-band clipping, long detail title, related-grid/panel flow, post-mount scripts, equal-height cards, approved hero composition |
| Routes | All 32 public routes smoke-tested, direct load and in-app navigation |
| Documents | 6 tabs, 17 PDF links, all PDFs byte-unchanged (SHA-256 + `%PDF-` header) |
| Wizard | 15 outcomes, Back/Restart, 24-hour categorical persistence, no personal data/upload/submit |
| Protected | `/admin/*` diff empty |
| Evidence | Fresh screenshots at all six widths, route/viewport index, counts and byte totals; existing 115 LFB-105 captures untouched |

If 320/375/430 evidence cannot be produced reliably, execution stops and
reports rather than reusing prior captures. Independent ACT-CODEX
post-correction validation follows execution.

## 8. Protected surfaces (unchanged)

`/admin/*` and all admin assets, the 17 registered PDFs, governed content and
`src/content/**`, the Liviza transport archive, dependencies, lockfile and
configuration, project knowledge, database/Cloud/Supabase (absent), GitHub,
project settings, visibility, publication and deployment.

## 9. STOP conditions

- Commit drift from `054958b4…`, or the project no longer private/unpublished.
- A required document unreadable.
- D-007 would require overflow clipping or content truncation.
- D-008 would require changing unrelated carousels or restoring arrows.
- A correction would require a file outside the allowlist.
- 320/375/430 evidence cannot be produced reliably.
- Secrets, credentials or external authority required.
- Any action would publish, deploy, change visibility or start backend work.
- **STOP if execution attempts to modify application code for D-009 without
  new evidence and separate Delroy approval.**

## 10. This turn's record

- Plan file changed: `.lovable/plan.md` only.
- No application file changed: no source, CSS, content, asset, PDF, admin,
  backend, database, configuration, project-setting change.
- Nothing published, deployed or made visible; project remains private.
- Planning commit SHA: assigned when this plan artifact is saved; application
  baseline remains `054958b481f5e1cda8957068d222b228b18012ed`.
- Remaining Delroy decision: the D-009 badge is a separate hosting /
  platform-setting decision to be taken before stakeholder deployment; it does
  not block D-007/D-008 execution.

PLAN STATUS: READY FOR DELROY APPROVAL / BUILD NOT RELEASED
NEXT ACTOR: ACT-CHATGPT
FINAL APPROVAL AUTHORITY: DELROY
NO APPLICATION EXECUTION RELEASED
NO BACKEND IMPLEMENTATION RELEASED
NO PUBLICATION OR DEPLOYMENT RELEASED
AWAIT FURTHER INSTRUCTIONS
