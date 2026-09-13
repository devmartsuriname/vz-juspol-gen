# LFB-105 FINAL FRONTEND CORRECTION PLAN 003

Actor: ACT-LOVABLE. Mode: PLAN MODE ONLY. No execution released.

## 1. Documents read (complete, this turn)

All eight Codex documents supplied with this instruction were read in full:

1. `CODEX-LFB-105-FINAL-FRONTEND-GATE-001.md` (69 lines) — read completely.
2. `DEFECT-REGISTER-2.md` (16) — read completely.
3. `ROUTE-VIEWPORT-RESULT-MATRIX-2.md` (20) — read completely.
4. `FRONTEND-COMPLETENESS-MATRIX.md` (14) — read completely.
5. `CMS-READINESS-MATRIX.md` (20) — read completely.
6. `DEPLOYMENT-READINESS-ASSESSMENT.md` (15) — read completely.
7. `EVIDENCE-MANIFEST-2.md` (16) — read completely.
8. `SCREENSHOT-INDEX-2.md` (15) — read completely.

## 2. Baseline verification

- Current application commit: `054958b481f5e1cda8957068d222b228b18012ed` — matches the inspected commit named in the instruction.
- Project remains private and unpublished; no database/Cloud connection.
- No STOP condition triggered by baseline checks.

## 3. D-007 — hero title arbitrary-character break (HIGH)

Root cause (verified in source): `public/vz-public/css/vz-polish.css` applies
`overflow-wrap: break-word` to `.pbmit-slider-one .pbmit-slider-content .pbmit-title`
(line 318) and again to the hero title plus its nested `em`/`span` in the
LFB-105 block (lines ~508-518). `break-word` authorises an emergency break at
any character once the preceding words have consumed the first line, so
`Vreemdelingenzaken` splits as `Vreemdelingenzake` / `n`. `word-break: normal`
and `hyphens: auto` do not suppress an emergency break.

Bounded correction:

1. In `vz-polish.css`, restrict the hero title (and its `em`/`span`) to
   `overflow-wrap: normal` at the widths where the word fits its own line
   (>= 768px measured column 671px at 1440px). Remaining title rules, font
   sizes, line heights, overlay and composition unchanged.
2. Keep a safe break opportunity for narrow widths by adding a soft hyphen
   inside the compound in `src/lib/public/template/chrome.ts`
   (`Vreemdelingen&shy;zaken`). A soft hyphen is a rendering hint only: the
   visible wording, three slides, imagery, CTAs and copy semantics are
   unchanged, and where the word fits it renders exactly as today. This is the
   allowlisted chrome.ts use and is preferred over leaving `break-word` active.
3. Below 768px, if the hyphenated fragments still exceed the column, the
   existing narrow-width type scale handles it; no truncation, no
   `overflow-x: hidden`, no change to the D-001 service-band clipping rule.

Rejected approaches: text truncation, global overflow clipping, shortening the
approved wording, re-enabling any document-level overflow suppression.

## 4. D-008 — hero pagination absent at 768-991px (HIGH)

Root cause: Liviza responsive CSS hides
`.pbmit-slider-area .swiper-horizontal > .swiper-pagination-bullets` at
`max-width: 991px`. The VZ override in `vz-polish.css` restores it only inside
`@media (max-width: 767px)` (lines 443-458), leaving 768-991px with a hidden,
zero-sized pagination container.

Bounded correction: extend the existing restoration to the missing band only —
change the override's media condition so the homepage hero pagination is shown
and positioned across `max-width: 991px` (bottom-centre horizontal strip, the
same pattern already approved below 768px), while the desktop right-edge
rotated column stays untouched above 991px. Scope is the
`.pbmit-slider-one` hero only; no other carousel selector is touched.

Preserved unchanged: three native Liviza dots, ~44x44px transparent hit areas
with 15px spacing, contrast treatment, `:focus-visible` outline, pointer/touch/
keyboard operation, active-dot / active-slide / `realIndex` / "Dia X van 3"
live-status synchronisation, hidden focusable Vorige/Volgende buttons,
`data-autoplay="false"`, `data-loop="false"`, `data-arrows="false"`, and the
removal of the rejected cross-like navigation.

## 5. D-009 — "Edit with Lovable" badge: origin classification

Diagnosis performed this turn:

- Repository-wide case-insensitive search for `edit with lovable`,
  `lovable-badge`, `gpteng` (excluding `node_modules` and the lockfile):
  **zero matches** in application source, templates, CSS or `public/`.
- The rendered home document served by the app contains **no** occurrence of
  `lovable` at all.

Classification: **environment-injected, not application-controlled.** The badge
is added by the Lovable preview/hosting layer and is governed by the platform's
badge-visibility setting, not by repository code.

Consequence under the release rules: condition 1 (application-controlled) is
not met, so **no application change is planned for D-009**. It is recorded as a
deployment/environment condition: before any restricted stakeholder
environment is used, the platform badge must be switched off in project
settings (a Delroy-authorised settings action, not a code change), or the
stakeholder environment must be hosted where the badge is not injected. No
CSS or DOM hiding will be added.

## 6. Future execution allowlist (exhaustive)

| File | Purpose |
|---|---|
| `public/vz-public/css/vz-polish.css` | D-007 wrap rules; D-008 768-991px hero pagination restoration |
| `src/lib/public/template/chrome.ts` | D-007 only: soft hyphen inside the hero compound |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-FINAL-CORRECTION-001/**` | New evidence folder: `REPORT.md`, `MANIFEST.md`, `screenshots/` |

Nothing else. Any additional file requires stopping and requesting separate
approval.

## 7. Acceptance matrix (post-correction validation)

Viewports: 320, 375, 430, 768, 1024, 1440.

| Check | Requirement |
|---|---|
| Hero title | No arbitrary-character break; no isolated final letter; wording unchanged; every width captured |
| Document overflow | `scrollWidth <= clientWidth` on all 32 public routes at every width |
| Hero dots | Visible and operable at every width, including 768-991; three dots; no arrows; autoplay/loop off |
| Interaction | Pointer, keyboard (Enter/Space, focus-visible) and genuine touch emulation at mobile widths |
| Sync | Active dot, active slide, `realIndex` and "Dia X van 3" agree after each activation |
| Console | Zero errors and zero hydration warnings, direct load and SPA navigation |
| D-001..D-006 | No regression: service-band clipping, long detail title, related-grid/panel flow, post-mount scripts, equal-height cards, approved hero composition |
| Routes | All 32 public routes smoke-tested, direct load and in-app navigation |
| Documents | 6 tabs, 17 PDF links, all PDFs byte-unchanged (SHA-256 + `%PDF-` header) |
| Wizard | 15 outcomes, Back/Restart, 24-hour categorical persistence, no personal data/upload/submit |
| Protected | `/admin/*` diff empty |
| Evidence | Fresh screenshots at all six widths, route/viewport index, counts and byte totals in the manifest |

If 320/375/430 evidence cannot be produced reliably, execution stops and reports
rather than substituting prior captures. Independent ACT-CODEX post-correction
validation follows execution.

## 8. Protected surfaces (unchanged)

`/admin/*` and all admin assets, the 17 registered PDFs, governed content and
`src/content/**`, the Liviza transport archive, dependencies, lockfile and
configuration, project knowledge, database/Cloud/Supabase (absent), GitHub,
visibility, publication and deployment.

## 9. STOP conditions

Commit drift; project no longer private/unpublished; a required document
unreadable; D-007 needing overflow clipping or truncation; D-008 needing
changes to unrelated carousels or arrow restoration; a file outside the
allowlist; unreliable 320/375/430 evidence; any need for secrets or external
authority; any action that would publish, deploy or start backend work.

## 10. This turn's record

- Plan file changed: `.lovable/plan.md` only.
- No application file changed. No image, content, PDF, dependency,
  configuration, knowledge, database or `/admin/*` change.
- Nothing published, deployed or made visible; project remains private.
- Remaining Delroy decision: D-009 requires a platform badge-visibility /
  hosting decision outside application code; confirm before any stakeholder
  environment is shared.
- Planning commit SHA: assigned on save of this plan artifact (reported after
  the write; application baseline stays `054958b4`).

PLAN STATUS: READY FOR DELROY REVIEW / BUILD NOT RELEASED
NEXT ACTOR: ACT-CHATGPT
FINAL APPROVAL AUTHORITY: DELROY
NO APPLICATION EXECUTION RELEASED
NO BACKEND IMPLEMENTATION RELEASED
NO PUBLICATION OR DEPLOYMENT RELEASED
AWAIT FURTHER INSTRUCTIONS
