# LFB-105 — Structural Remediation Plan 001

PLAN MODE ONLY. No application file was changed in this turn.

## 0. Baseline and input check

- Commit verified: `0bcec76dc5638ca457e4057a05dd8ea5f3706196` (matches the required baseline). Project private, unpublished.
- Liviza source package present (`visa.html`, `visa-details.html`, `our-services.html` inside the supplied ZIP), plus the isolated runtime tree under `public/vz-public/liviza/assets/**`.
- **Input gap (not a stop):** the folder `docs/vz-juspol-gen/validation-evidence/LFB-105-CODEX-SITEWIDE-VISUAL-VALIDATION-001/` does not exist in the project, and the six named LFB-105 documents were not found in the repository or in the supplied uploads. To avoid blocking, every defect D-001 to D-005 was re-measured independently against the running baseline in this turn; the measurements below reproduce the reported symptoms. If the validation package is required as the binding source for execution, it must be supplied before release.

## 1. Confirmed root causes (measured this turn)

| Defect | Measured | Confirmed root cause |
| --- | --- | --- |
| D-001 homepage overflow at 320px | document scrollWidth 325 vs clientWidth 320; single offending node: `<em>`/`<span>` inside `h2.pbmit-title` in hero slide 1, width 303px, right edge 325px | the long unbreakable Dutch word "Vreemdelingenzaken" in the hero heading; Liviza hero typography has no wrapping/hyphenation safety at 320px |
| D-002 service-detail overflow at 320px | scrollWidth 336 vs 320; offending node `.assessment-one-img`, width 300px inside a 277px column | Liviza `style.css` sets `.assessment-one-img { padding: 127px }`, raised to `150px` by the responsive sheet; with `border-box` the padding alone forces a 300px minimum width. The long title also breaks mid-word because no safe wrap rule is applied to `.pbmit-title-bar-wrapper h1` |
| D-003 related-grid / preparation-panel collision | reproduced on the detail routes | Liviza `style.css` `.assessment-one { margin-top: -150px; position: relative; z-index: 1 }` — a homepage-only overlap device. On service details the panel follows a normal grid, so the negative margin pulls it 150px up into the related-service cards |
| D-004 hydration mismatch | React warning on every template route, pointing at `LivizaTemplatePage.tsx:113` | the markup string is byte-identical server vs client (verified by diffing the SSR response against the module export, 44 444 chars, zero differences). The mismatch is therefore DOM-level: the Liviza scripts are emitted as deferred `<script>` tags by `livizaHead()`, so jQuery/Swiper/Bootstrap run at DOMContentLoaded — before React hydrates — and mutate the server markup (Swiper clones/classes, wrappers, inline styles). React then compares its prop against an already-mutated DOM |
| D-005 card inconsistency on `/diensten` and category grids | card heights differ within a row | the service cards are placed in a plain Bootstrap `row`/`col` grid without the Liviza equal-height mechanism; content is centred per card rather than aligned as a row |

## 2. Files to change (exhaustive)

| File | Change |
| --- | --- |
| `public/vz-public/css/vz-polish.css` | all layout corrections: hero title wrap safety, page-top title wrap safety, `.assessment-one` flow reset on detail routes (scoped), `.assessment-one-img` intrinsic mobile sizing, equal-height service-card rules, button stacking at narrow widths |
| `src/lib/public/template/LivizaTemplatePage.tsx` | stop emitting the template scripts from `livizaHead()`; keep the existing post-mount script rehydration as the single execution path (already implemented in the component) |
| `src/lib/public/template/liviza-service-detail.html.ts` | scoping hook class on the preparation panel and the related-service block; correct Liviza card family classes for related services; no content change |
| `src/lib/public/template/liviza-category.html.ts` | equal-height grid wrapper class on the card row; no content change |
| `src/lib/public/template/liviza-services.html.ts` | same equal-height wrapper on the six category cards |
| `docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/**` | report, manifest, before/after screenshots |

No other file is touched. Governed Dutch copy, the 17 PDFs, `/admin/*`, dependencies, configuration and project settings stay untouched.

## 3. Mobile-first service-detail structure (all 15 routes)

Single natural column at 320–767px, in this order, all in normal document flow:

```text
1  page title + breadcrumb        .pbmit-title-bar-wrapper
2  intro + category link          .pbmit-entry-content
3  fact cards (only verified)     .pbminfotech-ihbox-style-2   1 / 2 / 3 per row
4  important conditions           .list-group-borderless
5  document info + document CTA   .assessment-one (flow-reset variant)
6  related services grid          .pbminfotech-servicebox-style-2  1 / 2 / 3 per row
7  visit preparation + contact    .assessment-one (flow-reset variant)
8  footer
```

Binding rules applied: no negative margins, no absolute positioning for substantive content, no fixed content heights, intrinsic fact-card height, safe word-boundary wrapping for long Dutch titles and filenames, image/text panels stack below 768px, buttons become full width when they cannot sit side by side. No sidebar, no new design system — every class above already exists in `visa-details.html`.

## 4. `/diensten` and the six category routes

- `/diensten`: keep the `our-services.html` hierarchy and all six governed categories; add the equal-height row mechanism so cards in a row share height while text keeps intrinsic flow (min-height on the card, never fixed height, never `overflow: hidden` on text); CTA pinned to the card bottom via auto margin; 3 / 2 / 1 progression preserved.
- `/diensten/$categorie`: `visa.html` pattern, full-width grid retained, sidebar stays removed, category intro and footer spacing preserved, same equal-height treatment, intrinsic mobile heights, 3 / 2 / 1 verified.

## 5. Hydration correction (D-004)

- Affected route types: all nine template-backed route patterns (home, over-ons, diensten, category, service detail, faq, nieuws list/detail, contact, wizard, legal) — every consumer of `LivizaTemplatePage`.
- Lifecycle today: `head()` emits the ten Liviza scripts with `defer`; they execute before hydration and mutate the DOM. The same scripts are then re-added in the component's `useEffect`, so head emission is redundant as well as harmful.
- Fix: remove the `scripts` array from `livizaHead()`, keep the CSS links there (styles do not mutate the DOM), and let the existing mount effect be the only place the scripts run. React then hydrates untouched server markup, and plugins initialise afterwards exactly as they already do on client-side navigation.
- No visible DOM replacement: markup is byte-identical server/client (verified), so hydration is a no-op; only plugin enhancement timing shifts by one frame.
- No suppression of any kind is used.
- Acceptance: zero React hydration warnings and zero errors in the console on all 32 public routes, on direct load and after SPA navigation, with carousels, tabs, mobile menu and the wizard still functional.

## 6. Route impact

32 public routes: home, 9 static inner routes, `/aanvraaghulp`, 6 category routes, 15 service details. All 15 details and all 6 categories change layout; every template route is affected by the hydration fix; home is affected by the hero wrap fix only.

## 7. Sequence, checkpoints, rollback

Rollback point: `0bcec76dc5638ca457e4057a05dd8ea5f3706196`.

1. CP1 hydration fix — verify clean console on 5 sample routes.
2. CP2 320px overflow fixes (hero title, title-bar wrap, `.assessment-one-img`) — verify scrollWidth equals clientWidth.
3. CP3 service-detail flow restructure (negative-margin removal, panel order, related grid) — verify 0/1/2/3-card variants.
4. CP4 `/diensten` + category equal-height grids.
5. CP5 full route × viewport sweep and evidence capture.

Each checkpoint is verified before the next; a failing checkpoint is reverted individually rather than carried forward.

## 8. Test matrix

- 32 routes at 1440, 1280, 992, 768, 390, 375, 320; shared-shell and problem routes additionally at 1024 and 430.
- All 15 service details visually; 0/1/2/3 related-card variants; all six categories.
- Zero document-level horizontal overflow from 320px upward.
- Clean console on every public route.
- Six document tabs by pointer and keyboard; 17 PDF links resolve in the authenticated preview.
- All 15 Aanvraaghulp outcomes, Back, Restart, 24-hour categorical persistence; no personal data, upload, payment, account, submission or network transmission.
- No regression to header, page-top, hero, footer, mobile menu.

## 9. Evidence

`docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/` with `REPORT.md`, `MANIFEST.md` and `screenshots/`: before/after pairs for every corrected HIGH defect plus representative desktop/tablet/mobile passing states, with a route/viewport index, file count and byte total. Executor self-check only; no independent-validation claim.

## 10. Exclusions

No backend, database, Supabase/Cloud, auth, storage, uploads, payments, e-mail, secrets, GitHub, deployment, publication, visibility change, image generation, PDF modification, governed-content change, `/admin/*` change, dependency change, new design system, sidebar reintroduction, or wizard behavioural/visual expansion.

## 11. STOP conditions

Stop and report if: the baseline commit or private state differs; a correction needs a forbidden surface; the hydration fix cannot be contained inside the public-template boundary; the layout cannot be corrected without a broader redesign; any step would publish, deploy or change visibility; or the LFB-105 validation package is declared binding and is still unavailable.

## 12. Expected result

Zero horizontal overflow from 320px, no collision between related services and the preparation panel on any of the 15 detail routes, consistent card rhythm on `/diensten` and the six category routes, and a clean console on every public route — with Liviza geometry, governed content and all protected surfaces unchanged.

---

PLAN STATUS: PLANNED / NOT RELEASED
NEXT ACTOR: ACT-CHATGPT
NO APPLICATION EXECUTION RELEASED
NO PUBLICATION OR DEPLOYMENT RELEASED
