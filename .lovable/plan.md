# VZ Juspol Gen — Frontend Completion Master Plan 001 (Plan Mode only)

Baseline commit: `a3345ca888828c020e44f6e631233ba79ec4419a` ("Fixed tabs and service layout"), 11 Sep 2026. (FACT)
Reference project inspected read-only: `vz-portal-niotech` (`438764f3-e6e9-4438-9264-d73d4963c64c`), snapshot commit `cb506522`. (FACT)
No application file is changed by this document.

---

## 1. Route inventory

| Route | File | Status |
|---|---|---|
| `/` | `routes/index.tsx` + `liviza-home.html.ts` | Complete, hero is one static slide (needs 3-slide restore) |
| `/over-ons` | `over-ons.tsx` | Complete, placeholder image |
| `/diensten` | `diensten.index.tsx` | Complete, placeholder card images |
| `/diensten/$categorie` | `diensten.$categorie.index.tsx` | Complete, placeholder card images |
| `/diensten/$categorie/$slug` | `diensten.$categorie.$slug.tsx` | Complete (full-width, no sidebar) |
| `/documentenlijsten` | `documentenlijsten.tsx` | Complete (Bootstrap tabs, 17 PDFs) |
| `/instanties` | `instanties.tsx` | Complete, placeholder card images |
| `/contact` | `contact.tsx` | Complete |
| `/privacy`, `/disclaimer` | `privacy.tsx`, `disclaimer.tsx` | Complete |
| `/veelgestelde-vragen` | `veelgestelde-vragen.tsx` | Governed empty state — BLOCKED on approved Q&A |
| `/nieuws`, `/nieuws/$slug` | `nieuws.index.tsx`, `nieuws.$slug.tsx` | Governed empty state — blocked pending news disposition (§7) |
| `/aanvraaghulp` | — | MISSING — built in Batch D |

All page-top areas use the ported Liviza `.pbmit-title-bar-wrapper`, background `images/homepage-1/title-bg.jpg`, measured **1920 × 650**, content box height 650px, `padding-top: 135px`, title 45/55px white, breadcrumb white. (FACT, `shortcode.css` §10)

## 2. Liviza source-pattern mapping (unchanged, confirmation only)

home→`index.html`; over-ons→`about-us.html`; diensten→`our-services.html`; categorie→`visa.html`; service detail→`visa-details.html`; documentenlijsten→`visa.html` tabs; instanties→`countries.html`/team card; nieuws→`blog-grid-view.html`; nieuws detail + privacy/disclaimer→`blog-single-view.html`; faq→`faq.html`; contact→`contacts.html`; **aanvraaghulp→`faq.html` accordion + `visa-details.html` detail column + `our-services.html` card grid** (no new visual language).

## 3. Image inventory (exact measured slots)

| Slot | Current file | Source px / ratio | Proposed subject | Crop | Output | Responsive | Alt intent |
|---|---|---|---|---|---|---|---|
| Inner page-top (all 12 inner routes) | `homepage-1/title-bg.jpg` | 1920×650 (2.954:1) | Calm abstract: off-white field, institutional-blue geometric planes, dark-blue upper band | anchor top band, right-bottom fill (matches `background-position: right bottom`) | **SVG** primary, WebP fallback | single SVG scales; WebP 1920/1280/768 | decorative — `role="presentation"` (CSS background, no alt needed) |
| Home hero A/B/C | `banner-slider-img/slider-01-a|b|c.jpg` | 1920×900 (2.133:1) | 3 real photos: (A) public service counter/queue-free reception, (B) person preparing documents at desk, (C) exterior civic/office architecture, Suriname-appropriate, no text baked in | centre-left safe zone (text sits in `col-md-7`) | WebP + JPG fallback | 1920 / 1280 / 768 / 480 | descriptive Dutch alt on each slide |
| Over ons | `homepage-1/service/about-01.jpg` | 530×540 (0.981:1) | reception/desk detail | centre | WebP | 530 / 265 | descriptive |
| Home about | `img-01.jpg` 470×470, `img-02.jpg` 370×275 | 1:1 / 1.345:1 | document preparation detail; counter detail | centre | WebP | 2 widths each | descriptive |
| Service cards (`/diensten`, `/diensten/$categorie`) | `service/service-01…09.jpg` | 800×535 (1.495:1) | 6 category-neutral document/service motifs | centre | WebP | 800 / 400 | category label alt |
| Instanties cards | `portfolio/portfolio-0N.jpg` | 800×650 (1.231:1) | neutral institutional building/desk motifs ×4–6 | centre | WebP | 800 / 400 | institution name alt |
| Home stakeholder carousel | same portfolio set | 800×650 | as above (shared set) | centre | WebP | shared | shared |
| World map behind stakeholder band | template asset | as ported | **remove or replace with abstract blue field** | — | SVG | — | decorative |

Status of every row: **NOT GENERATED — generation not released.** Every replacement keeps the exact source pixel ratio; no CSS geometry is touched. (OPEN DECISION: whether generated imagery is acceptable at all for handover, or whether photography must be supplied by VZ — see §12.)

## 4. Homepage three-slide hero specification

Restore the template's `swiper-slider` with `data-autoplay="false"`, `data-loop="true"`, `data-dots="true"`, `data-arrows="true"`, fade effect — i.e. the original Liviza behaviour minus autoplay (reduced-motion and accessibility). Three slides, slot 1920×900, existing `pbmit-slider-content` markup reused verbatim:

| # | Eyebrow | Title | Lead | CTA |
|---|---|---|---|---|
| 1 | Informatie en voorbereiding | Voorbereid naar **Vreemdelingenzaken** | Vind informatie over diensten, documenten en voorbereiding. Dit is geen aanvraag. | Bekijk diensten → `/diensten` |
| 2 | Documenten | Weet welke **documenten** u nodig heeft | Officiële documentenlijsten per categorie. | Documentenlijsten → `/documentenlijsten` |
| 3 | Aanvraaghulp | Bereid uw **bezoek** voor | Beantwoord enkele vragen en zie welke dienst en documenten van toepassing zijn. | Start Aanvraaghulp → `/aanvraaghulp` |

No invented claim, no fee, no submission wording. Slider arrows keyboard-focusable; `prefers-reduced-motion` disables the fade transition.

## 5. Inner-page background + contrast acceptance

One background family, one file, all inner routes (single `.pbmit-title-bar-wrapper` rule already shared). Composition top→bottom: solid institutional dark blue band covering the full header + navigation zone (≥ 240px at 1920 scale, i.e. beyond the 135px header offset), then a controlled gradient into a light off-white geometric field carrying the title/breadcrumb zone. If the title/breadcrumb (white, 45/55px) lands over the light field, a fixed dark scrim (`rgba(15,35,70,.55)`) is applied through isolated public CSS on the wrapper `:after`, never by changing header markup.

Acceptance method: measured WCAG contrast (axe/manual sampling of rendered pixels behind each element) at 1440/1280/992/768/390/320 for: menu items, active menu item, logo wordmark, pre-header address/phone/e-mail/opening hours, "Heeft u vragen?" phone block, page title, breadcrumb links and current crumb. Pass = ≥ 4.5:1 for body-size text, ≥ 3:1 for ≥24px text. Any failure → adjust the background/scrim, never the header. STOP if not achievable without header change.

## 6. Sidebar matrix

| Route | Sidebar | Rationale |
|---|---|---|
| `/`, `/over-ons`, `/diensten`, `/diensten/$categorie`, `/documentenlijsten`, `/instanties`, `/contact` | none | full-width Liviza patterns already accepted |
| `/diensten/$categorie/$slug` | none | Delroy rejected it; no superior source pattern identified — keep full-width |
| `/nieuws`, `/nieuws/$slug`, `/privacy`, `/disclaimer` | right column (existing `blog-single-view.html` widget cards) | already implemented and accepted |
| `/aanvraaghulp` result view | right column, `blog-single-view.html` widget cards: relevante dienst, officiële documenten, contact | materially aids navigation to the governed destination |

Tablet/mobile (<992px): every sidebar stacks below main content, full width, no sticky, no overlap.

## 7. Aanvraaghulp (preparation-only wizard)

Routes: `/aanvraaghulp` (intro + questions + result in one route, step state in URL search param `?stap=`), no sub-routes needed; deep-linkable and back-button safe.

Flow: intro card with non-binding notice → question cards (single-select radio group, Liviza accordion/radio styling) → derived likely service → result view listing that service's governed conditions and its official document checklist, with links to `/diensten/$categorie/$slug`, `/documentenlijsten` and `/contact`.

Decision tree (drafted from the 6 governed categories and 15 governed service records only):
1. Wat wilt u regelen? (verblijf / vestiging / naturalisatie / ingezetenschap / asiel / overig)
2. Branch question per category (e.g. Surinaamse origine ja/nee; eerste aanvraag of verlenging; art. 5 / art. 12 / verklaring)
3. Terminal → one `ServiceRecord`, or "meerdere mogelijk" → show the 2–3 candidate service cards.

Boundaries: no personal data, no free-text, no upload, no payment, no account, no submission, no eligibility determination, no backend/database/Supabase/Edge Function/e-mail. Persistence: optional `localStorage` of *answers only* (category/branch choices, no personal data), 24-hour expiry, cleared by Restart — mirrors the reference concept without its submission phases. (OPEN DECISION: allow localStorage at all, or keep the wizard fully stateless.)

Controls: Vorige (Back), Opnieuw beginnen (Restart), progress indicator "Vraag n van m". Accessibility: `fieldset`/`legend` per question, radio group arrow-key navigation, focus moved to the new question heading, `aria-live="polite"` progress, visible focus ring, reduced-motion respected.

Disclaimer text on intro and result: "Aanvraaghulp is uitsluitend informatie en voorbereiding. Dit is geen aanvraag en geen beslissing over uw situatie. Aan deze uitkomst kunnen geen rechten worden ontleend."

Source dependencies requiring verification against current authoritative VZ documentation before build (each is a STOP if unverified): exact branch questions per category, Dutch wording of each question and answer option, the mapping answer→service for every one of the 15 services, whether "overig" needs its own branch, and whether the condition/checklist text already in `vz-content.ts` is the current authoritative version. Reference-project wizard rules live in a Supabase `wizard_rules` table and are **not** reusable content — concept only. (FACT)

## 8. News disposition (6 legacy candidates)

| # | Title | Status | Reason |
|---|---|---|---|
| 1 | Nieuwe richtlijnen voor verblijfsvergunningen (2024) | HOLD | policy claim + 2024 date unverifiable against governed sources |
| 2 | Wijzigingen in naturalisatieprocedure | HOLD | procedural change claim unverified |
| 3 | Feestdagen: aangepaste openingstijden | REWRITE FROM GOVERNED SOURCE | pattern acceptable; needs current governed dates/hours |
| 4 | Digitale indiening nu beschikbaar | **REJECT** | directly conflicts with the preparation-only / no-submission scope |
| 5 | Verlenging van verblijfsvergunningen | HOLD | "nieuwe richtlijnen", deadlines unverified |
| 6 | Asielprocedure versneld | HOLD | procedural claim unverified |

Nothing is REUSE AS-IS. Zero items are publishable today, so `/nieuws` keeps its governed empty state until a separate release supplies verified copy. Legacy images are `picsum.photos` placeholders — not transferable. No replacement article is written in any batch of this plan.

## 9. Implementation batches (ordered, credit-efficient)

**Batch A — Shared page-top background + contrast** (needs image release)
Files: `public/vz-public/images/*` (new), `public/vz-public/css/vz-polish.css`. Tests: contrast matrix §5, 6 widths, no overflow. Rollback: revert the one CSS rule + delete new asset. STOP: contrast unachievable. Accept: all §5 elements pass at all widths.

**Batch B — Homepage hero (3 slides) + all remaining image replacements**
Files: `src/lib/public/template/chrome.ts`, `liviza-home.html.ts`, `liviza-about.html.ts`, `liviza-services.html.ts`, `liviza-category.html.ts`, `liviza-instanties.html.ts`, new assets. Tests: slider next/prev/dots, keyboard, reduced motion, image ratios unchanged vs baseline screenshots, no layout drift, no 404. Rollback: restore static hero + template asset paths. STOP: a slot ratio cannot be matched. Accept: zero geometry delta vs baseline screenshots except intended imagery.

**Batch C — Sidebar/responsive conformance sweep** (small; only if A/B reveal drift)
Files: `vz-polish.css` only.

**Batch D — Aanvraaghulp**
Files: `src/routes/aanvraaghulp.tsx`, `src/lib/public/template/liviza-aanvraaghulp.html.ts` or a scoped React component inside `.vz-public`, `src/content/vz-wizard.ts` (governed question tree), `routes-map.ts`, `seo.ts`, `chrome.ts` nav entry. Tests: full tree traversal, Back, Restart, deep link, result routing to all 15 services, keyboard, focus, `aria-live`, no personal-data field present, no network call. STOP: any question/mapping unverified. Accept: every path terminates in a governed service or candidate list.

**Batch E — News migration** (only if a separate release supplies verified copy)

**Batch F — Final sitewide responsive QA + smoke tests + handover documentation**

Each batch: one execution + at most one correction round. Rollback point = the commit preceding the batch.

## 10. Final test matrices

Widths: 1440, 1280, 1024/992, 768, 390/375, 320 — for all 14 routes (13 current + `/aanvraaghulp`).
Smoke: primary/mobile navigation, document tabs, service + stakeholder carousels, hero slider, all 17 PDF links (hash + header re-verified, bytes unchanged), wizard Back/Restart/result routing, every CTA link, full keyboard traversal, visible focus, `prefers-reduced-motion`, no horizontal overflow (documenting the inherited 1440 `scrollWidth` 1470 Liviza artefact), zero console errors, zero 404, zero `/admin/*` diff.

## 11. Evidence and handover

Per batch: `docs/vz-juspol-gen/execution-evidence/LFB-104-<BATCH>/` containing `REPORT.md`, `MANIFEST.md`, `screenshots/`, plus `contrast-validation.md` (A), `image-register.md` (B), `wizard-validation.md` (D), `pdf-verification.md` and `protected-surface-validation.md` (F). Final handover: `docs/vz-juspol-gen/FRONTEND-COMPLETION-HANDOVER.md` summarising routes, patterns, image provenance, open blockers.

## 12. Labels, assumptions, risks

- **FACT**: baseline commit; 1920×650 title slot; 1920×900 hero slot; all other measured slot sizes; reference wizard is Supabase-backed with submission/personal-data/upload phases; reference blog.json holds exactly 6 items with picsum images.
- **INFERENCE**: the wizard question tree can be derived entirely from the 6 categories and 15 governed service records without new legal content.
- **OPEN DECISION**: (a) generated imagery vs VZ-supplied photography; (b) localStorage answer persistence vs stateless wizard; (c) whether FAQ content will ever be released.
- **One weak assumption**: that a single shared page-top background can satisfy contrast on all 12 inner routes without any per-route variant.
- **One missing constraint**: no approved image-provenance/licensing rule for generated public imagery has been issued, so §3 cannot leave "NOT GENERATED".
- **One material failure risk**: replacing the hero with three real photos and simultaneously restoring slider behaviour is the highest-risk change; a mis-sized or text-baked image, or re-enabled autoplay, breaks both 1:1 fidelity and accessibility. Mitigated by exact-ratio enforcement, autoplay off, and baseline screenshot diffing.

## 13. Proposed implementation release statement (not executed)

> "Delroy releases Batch A and Batch B of Frontend Completion Master Plan 001, including generation of the shared inner-page background and the three homepage hero images plus the listed replacement images, at the exact measured slot ratios. Batches C–F remain NOT RELEASED."

**PLAN COMPLETE — AWAITING DELROY APPROVAL**
