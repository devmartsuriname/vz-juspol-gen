# LFB-105 — Structural Remediation Plan 001 (rev.002)

PLAN MODE ONLY. No application file changed in this turn.

## 0. Authority, inputs and baseline control

Binding inputs, all six read completely in this planning turn and treated as the authoritative evidence and acceptance contract:

1. `CODEX-LFB-105-SITEWIDE-VISUAL-VALIDATION-001.md` — verdict FAIL — STRUCTURAL LOVABLE REMEDIATION REQUIRED.
2. `ROUTE-VIEWPORT-MATRIX.md` — per-route / per-viewport accounting (MO / VI / FI / FAIL / INCONCLUSIVE).
3. `DEFECT-REGISTER.md` — D-001…D-005 plus observation O-001, with FACT / INFERENCE discipline.
4. `LIVIZA-SERVICE-PATTERN-MAPPING.md` — implementation-ready component mapping, TEMPLATE PATTERN FIRST.
5. `EVIDENCE-MANIFEST.md` — evidence classes E-001…E-011, manual reproduction steps, screenshot limitation.
6. `LOVABLE-LFB-105-STRUCTURAL-REMEDIATION-CONTRACT-DRAFT-001.md` — DRAFT / NOT RELEASED correction contract.

The earlier statement that these inputs were missing is removed; the package is present and binding.

Baseline control:

- Confirmed application baseline and rollback reference: `0bcec76dc5638ca457e4057a05dd8ea5f3706196`.
- Current technical HEAD: `da7c7043d97f36fbfda5ef8f0f029a8789b56ba4`.
- Delta `0bcec76 → HEAD` verified this turn: `.lovable/plan.md` only (112 insertions), i.e. planning/documentation only. No application-code delta. Condition satisfied.
- A later released execution starts from the then-current verified HEAD. No reset or discard of accepted planning records.

## 1. Confirmed defects, root causes and fixes

Evidence status is carried over from the register: the rendered facts are FACT; the exact CSS declarations below were measured independently against the baseline and are the proposed correction targets, to be re-confirmed at execution.

| Defect | Evidence (register / matrix) | Root cause (measured) | Fix |
| --- | --- | --- | --- |
| D-001 HIGH — `/` 320px overflow | 324/305px | `<em>`/`<span>` inside `h2.pbmit-title` in hero slide 1, 303px wide, right edge 325px; unbreakable Dutch compound with no wrap safety | word-safe wrapping (`overflow-wrap: break-word`, `hyphens: auto` with Dutch lang, no character-level forcing) on hero title at ≤430px; never `overflow-x: hidden` |
| D-002 HIGH — `/diensten/vestiging/omzetten-toelatingsbeschikking` 320px overflow + unsafe title break | 336/305px | `.assessment-one-img` padding `127px` (responsive sheet `150px`) forces a 300px minimum inside a 277px column; title-bar heading has no safe wrap rule | intrinsic mobile sizing for the image/callout panel (padding reduced to content-safe values below 768px); safe word-boundary wrap for `.pbmit-title-bar-wrapper h1` and long filenames |
| D-003 HIGH — related-card / visit-panel collision on 13 detail routes | direct rectangle overlap, 1440 & 320 for all 13; six representatives also 1280/1024/992/768/430/390/375 | `.assessment-one { margin-top: -150px; position: relative; z-index: 1 }` — a homepage-only overlap device inherited on detail routes, where the panel follows a normal grid | scoped flow-reset variant on service-detail routes: no negative margin, no absolute placement; related grid is a closed wrapper whose computed bottom precedes the panel |
| D-004 HIGH — hydration mismatch at `LivizaTemplatePage.tsx:113` | 12 repeated console errors on fresh `/diensten` | markup string is byte-identical SSR vs client (44 444 chars, zero diff), so the mismatch is DOM-level: `livizaHead()` emits the Liviza scripts as deferred tags, so jQuery/Swiper/Bootstrap mutate server markup before React hydrates | remove the `scripts` array from `livizaHead()`, keep the CSS links, let the existing post-mount effect be the single script execution path; no suppression |
| D-005 MEDIUM — inconsistent card heights on `/diensten` and category grids | `/diensten` rows 542/515px; Vestiging 514/609/514px; Naturalisatie 575/548/541/541/514px; Overig unequal at tablet | plain Bootstrap `row`/`col` grid without the Liviza equal-height mechanism; existing polish equalises carousel slides only | Liviza-compatible equal-height row treatment (`min-height`/stretch, never fixed height, never `overflow: hidden` on text), CTA pinned by auto margin, 3/2/1 retained |

Also carried: `ingezetenschap-art-21` and `asiel-vluchteling` are INCONCLUSIVE (0 related cards); their fact-card / visit-panel stack is reviewed in the same shared reconstruction. O-001 (legacy wizard presentation) stays out of scope.

## 2. Scope binding

- Remediation is bound to **every consumer of the shared public template** and is verified across **all 32 public routes** in the route/viewport matrix: `/`, the 9 static inner routes (`/over-ons`, `/nieuws`, `/instanties`, `/veelgestelde-vragen`, `/contact`, `/privacy`, `/disclaimer`, `/documentenlijsten`, plus `/diensten`), `/aanvraaghulp`, 6 category routes and 15 service details.
- Service-detail work uses the mapping document for **13 FAIL detail routes** plus the 2 INCONCLUSIVE ones, i.e. one shared composition applied to all 15.
- The prior "nine route patterns" phrasing is removed; counts and terminology follow the matrix.

## 3. Service-detail composition (Liviza mapping, no sidebar)

The existing custom/unprofessional sidebar treatment is not reinstated anywhere; the mapped Liviza composition replaces it. Mobile-first single column at 320–767px, natural document flow, in this order:

```text
1  title + breadcrumb          .pbmit-title-bar-wrapper  (word-safe wrap)
2  intro                       .pbmit-service-single-content / .pbmit-entry-content
3  category metadata           .service-page-infobox + semantic category link
4  verified fact cards         .pbminfotech-ihbox-style-2  1 / 2 / 3 per row, intrinsic height
5  important conditions        .list-group.list-group-borderless
6  official document info+CTA  .assessment-one (flow-reset variant) + .pbmit-btn
7  related services grid       .pbminfotech-servicebox-style-2 in a closed wrapper, 1 / 2 / 3
8  visit preparation + contact .assessment-one (flow-reset variant) + .pbmit-btn
9  footer transition           .section-lg → footer()
```

Rules: only facts that exist are rendered; no fixed content heights, no negative margins, no absolute positioning for normal content; image/text panels stack below 768px; buttons go full width when they cannot sit side by side; long Dutch titles, document names and metadata wrap at safe word boundaries only.

## 4. `/diensten` and the six category routes

- `/diensten`: retain `our-services.html` hierarchy, title, six governed categories and preparation section; apply the text-safe equal-height treatment; 3/2/1 preserved.
- Categories: retain `visa.html` full-width `col-12` grid, category intro and source footer spacing; no sidebar; same equal-height treatment; intrinsic mobile heights; 3/2/1 verified at 1440/768/320.

## 5. Hydration-safe deferred script handling (D-004)

- Affected: every route that renders `LivizaTemplatePage` — all 32 public routes.
- Today: `head()` emits the Liviza scripts with `defer`; they execute at DOMContentLoaded and mutate the DOM (Swiper clones/classes, wrappers, inline styles) before hydration. The same scripts are re-added in the mount effect, so head emission is both redundant and harmful.
- Fix: drop the `scripts` array from `livizaHead()`; keep the CSS links (styles do not mutate the DOM); the mount effect becomes the single execution path.
- No visible DOM replacement expected: server/client markup is byte-identical, so hydration is a no-op and only plugin-enhancement timing shifts by one frame.
- Acceptance: zero hydration warnings and zero new console errors on all 32 routes, on direct load and after SPA navigation, with carousels, tabs, mobile menu, hero controls and the wizard still functional.

## 6. Also in scope from the register

Header/navigation fit (Contact CTA in the pre-header slot, no wrapping at 1440/1280/992), footer cleanliness (no duplicate decoration reintroduced), hero overflow correction (D-001) with controls and no-autoplay behaviour preserved, document tabs by pointer and keyboard, icon and spacing rhythm in the mapped patterns, and overlap checks on every corrected section.

## 7. Files to change (exhaustive)

| File | Change |
| --- | --- |
| `public/vz-public/css/vz-polish.css` | hero and title-bar wrap safety; scoped `.assessment-one` flow reset; `.assessment-one-img` intrinsic mobile sizing; equal-height grid rules; narrow-width button stacking |
| `src/lib/public/template/LivizaTemplatePage.tsx` | remove script emission from `livizaHead()`; single post-mount execution path |
| `src/lib/public/template/liviza-service-detail.html.ts` | scoping hooks, closed related-grid wrapper, mapped Liviza classes and section order; no content change |
| `src/lib/public/template/liviza-category.html.ts` | equal-height wrapper on the card row |
| `src/lib/public/template/liviza-services.html.ts` | equal-height wrapper on the six category cards |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/**` | report, manifest, screenshots |

Governed Dutch copy, the 17 registered PDFs, `/admin/*`, dependencies, configuration and project settings stay untouched. Preparation-only wizard boundaries are unchanged.

## 8. Sequence, checkpoints, rollback

Rollback reference `0bcec76dc5638ca457e4057a05dd8ea5f3706196`; execution starts from the then-current verified HEAD.

1. CP1 hydration fix — clean console on five sample routes.
2. CP2 320px overflow fixes — `scrollWidth ≤ clientWidth` on `/` and the long detail.
3. CP3 shared service-detail flow reconstruction — 0/1/2/3-card variants verified.
4. CP4 `/diensten` + six category equal-height grids.
5. CP5 sitewide route × viewport sweep and evidence capture.

Each checkpoint is verified before the next; a failing checkpoint is reverted individually.

## 9. Acceptance evidence and final smoke test

- Mobile-first explicit coverage at **320, 375, 768, 1024 and 1440 px**, plus the matrix widths 1280, 992, 430 and 390 for the routes the matrix names.
- Route-by-route acceptance: each of the 32 routes gets a recorded result line (route, viewport set, overflow measurement, console state, screenshot reference). All 13 D-003 routes plus the 2 INCONCLUSIVE details get before/after pairs; `/` and the long Vestiging detail get before/after at 320.
- Zero document-level horizontal overflow from 320px upward, on every route.
- Six document tabs by pointer and keyboard; all 17 PDF links resolved inside the authenticated preview with route/status recorded.
- All 15 wizard outcomes, Back, Restart and 24-hour categorical persistence; no personal data, free text, upload, payment, account, submission or network transmission.
- No regression to header, page-top, hero, footer or mobile menu.
- Final sitewide visual smoke test after implementation: 32 routes at 1440/768/320 in one pass, plus the representative set at 1024 and 430, recorded as a single pass/fail sheet.
- Evidence path: `docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/` with `REPORT.md`, `MANIFEST.md`, `screenshots/`, resulting commit and diff scope, and an explicit statement that no forbidden surface changed. Executor self-check only; ACT-CODEX performs independent validation later.

## 10. Exclusions

No backend, database, Supabase/Cloud, auth, storage, uploads, payments, e-mail, secrets, GitHub, deployment, publication, visibility change, image generation, PDF modification, governed-content change, old-project change, `/admin/*` change, dependency change, new design system, sidebar reintroduction, or wizard behavioural/visual expansion.

## 11. STOP conditions

Stop and report if: the starting commit or private/unpublished state differs; an unapproved application-code delta exists after the baseline; a correction needs a forbidden surface; Liviza sources are unavailable; a fix would require fabricated content or assets; the hydration root crosses the public-template boundary; the layout cannot be corrected without a broader redesign; or any step would publish, deploy or change visibility.

## 12. Expected result

Zero horizontal overflow from 320px, no related-service/visit-panel collision on any detail route, consistent card rhythm on `/diensten` and the six categories, a clean console on all 32 routes, and the mapped Liviza composition in place — with governed content, registered documents and all protected surfaces unchanged.

## 13. Open items

- Screenshot durability: the validation package could not write durable images; the execution batch must produce them under the evidence path.
- The exact CSS declarations behind D-003/D-005 remain INFERENCE per the register until confirmed during execution.

---

PLAN STATUS: PLANNED / NOT RELEASED
NEXT ACTOR: ACT-CHATGPT
NO APPLICATION EXECUTION RELEASED
NO PUBLICATION OR DEPLOYMENT RELEASED
