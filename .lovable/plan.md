# VZ Juspol Gen — Frontend Completion Master Plan 001 — rev.001 (Plan Mode only)

Baseline reconfirmed: `21c5637b77c6585fdf73d7b1cc2b3325ab3e0331` (11 Sep 2026, "Update plan"); last application-code commit `a3345ca888828c020e44f6e631233ba79ec4419a`. (FACT)
Reference read-only: `vz-portal-niotech` (`438764f3-e6e9-4438-9264-d73d4963c64c`, snapshot `cb506522`) — concept only, no content authority. (FACT)
No application file is changed by this document. Liviza-pattern-first, contrast gate, preparation-only Aanvraaghulp, blog conflict classification, sidebar policy, evidence structure and the responsive/smoke matrix are retained from rev.000.

---

## 1. Decisions now closed

- **Generated imagery is APPROVED in principle** for this completion: professional, VZ-appropriate, rights-safe, no baked-in text, exact slot geometry preserved, WebP-first (SVG for the abstract page-top pattern). No identifiable government building, office, seal or documentary depiction may be generated; institutional imagery stays clearly neutral and non-documentary. No longer an open decision.
- **Wizard persistence APPROVED**: 24-hour `localStorage` of categorical answers only (category/branch choices). Restart clears it. No names, identifiers, free text, uploads, analytics payload or backend sync. No longer an open decision.
- **FAQ**: remains a governed empty state. No FAQ copy is authored in the released batch. It is filled only if authoritative Q&A already exists in the approved current VZ documents; none is present in project content today. (FACT)

## 2. Exact route and fixture counts

Static routes today: `/`, `/over-ons`, `/diensten`, `/documentenlijsten`, `/instanties`, `/contact`, `/privacy`, `/disclaimer`, `/veelgestelde-vragen`, `/nieuws` = **10**. Plus `/aanvraaghulp` after the batch = **11**.
Dynamic fixtures: **6** categories (`verblijf`, `vestiging`, `naturalisatie`, `ingezetenschap`, `asiel`, `overig`), **15** service details (SRV-001…SRV-015), **0** news detail fixtures (empty state).
Total renderable pages after the batch: **11 + 6 + 15 = 32**. PDFs: **17** (8,848,320 bytes, unchanged). Shared-header consumers: all 32 pages (`chrome.ts` header + title bar).
Status: complete = 8 static + 21 dynamic; empty-state (governed) = `/veelgestelde-vragen`, `/nieuws`, `/nieuws/$slug`; missing = `/aanvraaghulp`.

## 3. Complete image register (measured, exact)

`A = public/vz-public/liviza/assets/images`. Every replacement keeps the source pixel ratio; no CSS geometry changes.

| # | Slot | Current path | px | Ratio | Assets needed | Route consumers | Subject brief | Focal safe area | Format | Alt treatment |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Inner page-top background | `A/homepage-1/title-bg.jpg` (CSS `.pbmit-title-bar-wrapper`) | 1920×650 | 2.954:1 | 1 SVG (+1 WebP fallback) | all 12 inner static routes + 6 category + 15 detail = **31 pages** | continuous abstract: deep institutional blue at top flowing into off-white geometric planes | top 0–260px must stay dark; title/breadcrumb band left 60% | SVG, WebP 1920 | decorative (CSS background) |
| 2 | Home hero slide 1 | `A/banner-slider-img/slider-01-a.jpg` | 1920×900 | 2.133:1 | 1 (×4 widths) | `/` | neutral public-service reception/counter, no identifiable building or signage | right 40% (text in `col-md-7`) | WebP + JPG, 1920/1280/768/480 | descriptive NL alt |
| 3 | Home hero slide 2 | new (`slider-01-b` slot) | 1920×900 | 2.133:1 | 1 (×4) | `/` | documents being prepared on a desk, hands only | right 40% | as #2 | descriptive |
| 4 | Home hero slide 3 | new (`slider-01-c` slot) | 1920×900 | 2.133:1 | 1 (×4) | `/` | calm modern civic interior, generic, non-documentary | right 40% | as #2 | descriptive |
| 5 | Home about image 1 | `A/homepage-1/img-01.jpg` | 470×470 | 1:1 | 1 (×2) | `/` | document-preparation detail | centre | WebP 470/235 | descriptive |
| 6 | Home about image 2 | `A/homepage-1/img-02.jpg` | 370×275 | 1.345:1 | 1 (×2) | `/` | information-desk detail | centre | WebP 370/185 | descriptive |
| 7 | Home CTA band image | `.assessment-one-img` → `A/homepage-1/bg/img-01.jpg` | 500×280 | 1.786:1 | 1 (×2) | `/` | abstract blue/off-white pattern (block is padded, heavily cropped) | centre | WebP 1000/500 | decorative |
| 8 | Service-detail document block | same `.assessment-one-img` (500×280) | 500×280 | 1.786:1 | shares #7 | **15** service detail pages, block 1 (document/PDF panel) | as #7 | centre | shared | decorative |
| 9 | Service-detail preparation callout | same `.assessment-one-img` | 500×280 | 1.786:1 | shares #7 | **15** service detail pages, block 2 | as #7 | centre | shared | decorative |
| 10 | Service cards | `A/homepage-1/service/service-01…09.jpg` | 800×535 | 1.495:1 | **6** (one per governed category) | `/diensten` (15 cards, mapped by category), `/diensten/$categorie` (6 pages) | one neutral motif per category: Verblijf, Vestiging, Naturalisatie, Ingezetenschap, Asiel, Overig | centre | WebP 800/400 | category-label alt |
| 11 | About page image | `A/homepage-1/service/about-01.jpg` | 530×540 | 0.981:1 | 1 (×2) | `/over-ons` | neutral service-counter interior | centre | WebP 530/265 | descriptive |
| 12 | Stakeholder cards | `A/homepage-1/portfolio/portfolio-01…04.jpg` | 800×650 | 1.231:1 | **6** (one per governed stakeholder record) | `/` carousel + `/instanties` (same 6 records) | neutral abstract institutional motifs, no logos, no buildings | centre | WebP 800/400 | institution-name alt |
| 13 | Stakeholder band map | `A/homepage-1/bg/map.png` | 1170×619 | 1.890:1 | 1 SVG | `/` | replace with abstract blue field (no world map) | centre | SVG | decorative |
| 14 | Section pattern (right) | `A/homepage-1/bg/bg-pattarn.png` | 474×448 | 1.058:1 | 1 SVG | `/`, `/over-ons` | recolour to VZ blue, keep shape | — | SVG | decorative |
| 15 | Section pattern (left) | `A/homepage-1/bg/bg-pattarn-left.png` | 309×448 | 0.690:1 | 1 SVG | `/`, `/over-ons` | as #14 | — | SVG | decorative |
| 16 | Border pattern | `A/homepage-1/bg/border-pattarn.png` | 68×135 | 0.504:1 | 1 SVG | `/` | as #14 | — | SVG | decorative |
| 17 | Section bg image 2 | `A/homepage-1/bg/img-02.jpg` | 930×630 | 1.476:1 | 1 | `/` service band | abstract blue/off-white | centre | WebP 930/465 | decorative |
| 18 | Footer pattern | `A/footer-pattern.png` | 1772×480 | 3.692:1 | 1 SVG | all 32 pages | recolour to VZ blue | bottom | SVG | decorative |
| 19 | News list card image | template blog slot (`blogbox-style-2`) | 800×535 | 1.495:1 | **0 now** | `/nieuws` | not produced — news held (§7) | — | — | — |
| 20 | News detail hero | `blog-single-view` slot | 1170×619 | 1.890:1 | **0 now** | `/nieuws/$slug` | not produced — news held | — | — | — |
| 21 | Aanvraaghulp page-top | shares #1 | 1920×650 | 2.954:1 | 0 extra | `/aanvraaghulp` | shares #1 | — | — | decorative |
| 22 | Favicon | `public/favicon.ico` (256×256) + `A/favicon.png` (300×300) | — | 1:1 | see §4 | all pages | VZ mark | — | ICO + PNG + SVG | — |
| 23 | Header/footer wordmark | `A/logo-white.png` (521×157) present but **unused**; header renders text wordmark | 521×157 | 3.318:1 | see §4 | all 32 pages | see §4 | — | SVG/PNG | `alt="Vreemdelingenzaken"` |

Total new assets in the released batch: **1 page-top SVG (+1 WebP) + 3 hero photos + 3 photo details (#5, #6, #11) + 1 CTA texture (#7) + 6 category images + 6 stakeholder images + 6 recoloured decorative SVGs (#13–#18) + logo/favicon set per §4**. Status of all: NOT GENERATED (generation happens inside the released batch, not in this Plan turn).

## 4. Logo rule (audit result)

Audit (FACT): the header renders the text wordmark "Vreemdelingenzaken / Juspol Gen" from `chrome.ts`; no VZ logo image file exists in `public/`; the only logo asset present is the template's `logo-white.png` (Liviza brand — must not be used); `public/favicon.ico` is the generic 256×256 default.
Therefore, and only therefore: the current readable wordmark is **retained**, and the batch adds a restrained "VZ" monogram mark — no seal, no coat of arms, no invented emblem:

| Asset | Size/format | Contrast state |
|---|---|---|
| `vz-mark.svg` | vector, 1:1 | source of all raster variants |
| `favicon.ico` | 16/32/48 multi-size | on light and dark browser chrome |
| `apple-touch-icon.png` | 180×180 | on light |
| `vz-wordmark-light.svg` | height 40px, ~3.3:1 | dark header/page-top → white/off-white mark, ≥4.5:1 |
| `vz-wordmark-dark.svg` | height 40px | light backgrounds/print → blue mark on white, ≥4.5:1 |
| `og-image.png` | 1200×630 | social preview, no baked claims |

Creation happens inside the released batch, not in this turn.

## 5. Page-top system and contrast gate

**One continuous composition**, not a band-on-image: a single 1920×650 SVG whose gradient runs from deep institutional blue (`#0f2346`-family) at the top edge, through a mid blue with restrained geometric planes, into an off-white lower-right field — the same quiet abstract direction Delroy approved. The upper navigation zone (0 → ~230px, covering pre-header + 105px nav row + the 135px title offset) is dark by composition, not by a pasted rectangle: the gradient stop keeps luminance low there while remaining visually continuous. Where the title/breadcrumb (white 45/55px) would otherwise sit over lighter tones, an **integrated** gradient scrim `linear-gradient(180deg, rgba(15,35,70,.72) 0%, rgba(15,35,70,.38) 55%, rgba(15,35,70,.20) 100%)` is applied on `.pbmit-title-bar-wrapper:after` in isolated public CSS — tuned visually, never a flat block, and never a change to the approved header markup.

Contrast gate (all must pass before the batch is reported complete): menu items, active menu item, wordmark, pre-header address/phone/e-mail/opening hours, "Heeft u vragen?" phone block, page title, breadcrumb links, current crumb — measured at 1440, 1280, 992, 768, 390/375, 320, in default and **open mobile-menu** state, and with a **long title** fixture (the longest governed page title, e.g. "Omzetten toelatingsbeschikking naar vestigingsvergunning" wrapping to two lines). Pass = ≥4.5:1 body text, ≥3:1 for ≥24px text. Failure → adjust composition/scrim only. STOP if unachievable without header change.

## 6. Aanvraaghulp — source-of-truth mapping (all 15 outcomes)

Route: `/aanvraaghulp`, step state in `?stap=`; intro → questions → result. Q1 "Wat wilt u regelen?" (6 governed categories) → Q2 branch per category → terminal service.

| Path (Q1 → Q2) | Category | Service slug | ID | PDF record | Result CTA | Status |
|---|---|---|---|---|---|---|
| Verblijf → Surinaamse origine | verblijf | `verblijf-surinaamse-origine` | SRV-001 | ✔ | dienst + PDF + contact | OK |
| Verblijf → overige vreemdeling | verblijf | `verblijf-overige` | SRV-002 | ✔ | idem | OK |
| Verblijf → verlenging | verblijf | `verlenging-verblijf` | SRV-003 | ✔ | idem | OK |
| Vestiging → overige | vestiging | `vestiging-overige` | SRV-004 | ✔ | idem | OK |
| Vestiging → omzetten toelatingsbeschikking | vestiging | `omzetten-toelatingsbeschikking` | SRV-005 | ✘ | dienst + contact | OK, PDF link omitted (no governed record) |
| Vestiging → Surinaamse origine | vestiging | `vestiging-surinaamse-origine` | SRV-014 | ✔ | dienst + PDF + contact | OK |
| Naturalisatie → Surinaamse origine | naturalisatie | `naturalisatie-surinaamse-origine` | SRV-006 | ✘ | dienst + contact | OK, PDF omitted |
| Naturalisatie → overige vreemdelingen | naturalisatie | `naturalisatie-overige-vreemdelingen` | SRV-007 | ✘ | dienst + contact | OK, PDF omitted |
| Naturalisatie → optie Art. 5 | naturalisatie | `optie-art-5` | SRV-008 | ✘ | dienst + contact | OK, PDF omitted |
| Naturalisatie → optie Art. 12 | naturalisatie | `optie-art-12` | SRV-009 | ✘ | dienst + contact | OK, PDF omitted |
| Naturalisatie → verklaring van naturalisatie | naturalisatie | `verklaring-van-naturalisatie` | SRV-011 | ✔ | dienst + PDF + contact | OK |
| Ingezetenschap → Art. 21 WNI | ingezetenschap | `ingezetenschap-art-21` | SRV-010 | ✘ | dienst + contact | OK, PDF omitted |
| Asiel → asiel/vluchteling | asiel | `asiel-vluchteling` | SRV-015 | ✔ | dienst + PDF + contact | OK |
| Overig → duplicaat | overig | `duplicaat` | SRV-012 | ✔ | dienst + PDF + contact | OK |
| Overig → garantstelling | overig | `garantstelling` | SRV-013 | ✔ | dienst + PDF + contact | OK |

All 15 outcomes are mappable from current project content; **no branch is BLOCKED**. Six outcomes have no governed PDF record and therefore show no document link — an omission, never a substitute. Q2 wording is derived from the governed service titles only; no rule, question or answer is imported from the reference project's Supabase `wizard_rules`. (FACT: that table is the reference's only rule source and carries submission/personal-data phases — excluded.)

Boundaries and accessibility unchanged: no personal data, free text, upload, payment, account, submission, eligibility judgment, backend, database or e-mail. `fieldset`/`legend` per question, radio arrow-key navigation, focus moved to the new question heading, `aria-live="polite"` progress, visible focus, reduced-motion respected, Vorige / Opnieuw beginnen. Disclaimer on intro and result: "Aanvraaghulp is uitsluitend informatie en voorbereiding. Dit is geen aanvraag en geen beslissing over uw situatie. Aan deze uitkomst kunnen geen rechten worden ontleend."

## 7. News disposition (unchanged)

| # | Title | Status |
|---|---|---|
| 1 | Nieuwe richtlijnen voor verblijfsvergunningen (2024) | HOLD — unverified policy claim/date |
| 2 | Wijzigingen in naturalisatieprocedure | HOLD |
| 3 | Feestdagen: aangepaste openingstijden | REWRITE FROM GOVERNED SOURCE (not in this batch) |
| 4 | Digitale indiening nu beschikbaar | **REJECT** — conflicts with preparation-only scope |
| 5 | Verlenging van verblijfsvergunningen | HOLD |
| 6 | Asielprocedure versneld | HOLD |

Zero items are publishable, so news implementation is excluded from the released batch and `/nieuws` keeps its governed empty state.

## 8. Sidebar matrix (unchanged)

None on `/`, `/over-ons`, `/diensten`, `/diensten/$categorie`, `/documentenlijsten`, `/instanties`, `/contact`; **none on `/diensten/$categorie/$slug`** (no superior source pattern identified — the rejection stands); right column on `/nieuws`, `/nieuws/$slug`, `/privacy`, `/disclaimer`; right column on the `/aanvraaghulp` result view (relevante dienst, officieel document, contact) using `blog-single-view.html` widget cards. Below 992px every sidebar stacks below main content, full width, non-sticky.

## 9. One consolidated execution batch — LFB-104

Single released batch containing, in this internal order: (1) page-top system + contrast gate; (2) logo/compact mark + favicon set; (3) all image generation and replacement per §3; (4) three-slide homepage hero; (5) Aanvraaghulp; (6) responsive corrections; (7) full smoke/regression tests; (8) evidence. FAQ and news content excluded.

**Why one batch is technically safe.** The work is layered, not entangled: page-top and decorative assets touch only `vz-polish.css` and new files under `public/vz-public/images/`; image swaps touch only `src` attributes and CSS `url()`s at unchanged ratios; the hero touches only the `homeHeader()` slider block in `chrome.ts`; the wizard is an entirely new route plus a new content module and two navigation entries. No step rewrites another step's output, and every step has an independent revert.

**Partial-failure isolation inside the one batch.** Seven internal checkpoints, each an evidence gate and a rollback commit: CP1 page-top + contrast pass, CP2 logo/favicon, CP3 images replaced (ratio diff clean), CP4 hero (3 slides, keyboard, reduced motion), CP5 wizard (all 15 paths), CP6 responsive sweep, CP7 full smoke + PDFs. A failing checkpoint is reverted to its own commit and reported as a bounded defect while the passed checkpoints stay; the batch is never abandoned wholesale and no extra release turn is consumed. A single correction round is permitted only if Delroy's post-batch visual review finds bounded defects.

Allowed files: `public/vz-public/images/**` (new), `public/vz-public/css/vz-polish.css`, `public/favicon.ico`, `public/apple-touch-icon.png`, `src/lib/public/template/*.html.ts`, `chrome.ts`, `LivizaTemplatePage.tsx`, `src/routes/aanvraaghulp.tsx` (new), `src/content/vz-wizard.ts` (new), `src/lib/public/routes-map.ts`, `src/lib/public/seo.ts`, `docs/vz-juspol-gen/execution-evidence/LFB-104/**`.

STOP conditions: contrast unachievable without header change; a slot ratio unmatchable; a wizard branch unmappable; any need for personal data, upload, backend, dependency, database or config change; any protected-surface impact; any PDF byte change; any request to author FAQ/news copy.

## 10. Test inventory and evidence

Widths 1440, 1280, 1024/992, 768, 390/375, 320 across all 32 pages. Coverage: 6 categories, all 15 service details, all 17 PDF links (hash + `%PDF-` header re-verified, bytes unchanged), all 15 wizard terminal paths, all 32 shared-header consumers.
Smoke: primary + mobile navigation, document tabs, service and stakeholder carousels, hero slider (next/prev/dots/keyboard/no autoplay), every CTA link, wizard Vorige/Opnieuw/result routing/deep link/localStorage expiry+clear, full keyboard traversal, visible focus, `prefers-reduced-motion`, no horizontal overflow (documenting the inherited 1440 `scrollWidth` 1470 Liviza artefact), zero console errors, zero 404, zero `/admin/*` diff, zero dependency/config change.
Evidence: `docs/vz-juspol-gen/execution-evidence/LFB-104/` with `REPORT.md`, `MANIFEST.md`, `contrast-validation.md`, `image-register.md`, `logo-register.md`, `wizard-validation.md`, `responsive-validation.md`, `pdf-verification.md`, `protected-surface-validation.md`, `screenshots/`, plus `docs/vz-juspol-gen/FRONTEND-COMPLETION-HANDOVER.md`.

## 11. Labels, assumption, missing constraint, risk

- **FACT**: baseline commit; every measured dimension in §3; no VZ logo asset exists and the header wordmark is text; 15 services / 6 categories / 17 PDFs; 6 services carry no PDF record; the reference wizard is Supabase-backed with submission phases.
- **INFERENCE**: the Q2 branch set derivable from the governed service titles is sufficient for all 15 terminal outcomes.
- **OPEN DECISION**: none remaining for imagery, persistence or FAQ. Remaining open only: whether category images (#10) may share one visual family or must be visually distinct per category.
- **Weak assumption**: one shared page-top composition satisfies contrast on all 31 inner pages without a per-route variant.
- **Missing constraint**: no approved provenance/licensing record format for generated public imagery has been issued, so `image-register.md` will record generation prompts and model as provisional provenance.
- **Material failure risk**: the consolidated batch's largest risk is the hero — three real photos plus restored slider behaviour; a mis-sized or text-bearing image, or re-enabled autoplay, breaks fidelity and accessibility at once. Mitigated by exact-ratio enforcement, autoplay off, CP4 gating and baseline screenshot diffing.

## 12. Proposed consolidated release statement (not executed)

> "Delroy releases exactly one consolidated Build Mode batch, LFB-104 FRONTEND COMPLETION, covering: the shared inner-page-top background system and contrast gate; the restrained VZ monogram, wordmark variants and favicon set; generation and replacement of every image listed in the register at the exact measured slot ratios; the three-slide homepage hero without autoplay; the preparation-only Aanvraaghulp at `/aanvraaghulp` with 24-hour categorical localStorage; responsive corrections; full smoke testing; and evidence under `docs/vz-juspol-gen/execution-evidence/LFB-104/`. Internal checkpoints CP1–CP7 act as rollback points; one correction round is permitted after visual review. FAQ and news content remain excluded. Forbidden and unreleased: database, Supabase/Lovable Cloud, authentication, personal-data intake, uploads, payments, e-mail, `/admin/*` and admin assets, publication or deployment, PDF modification, dependency changes, GitHub actions, and deletion of the old external VZ sites."

**REVISED PLAN COMPLETE — AWAITING DELROY APPROVAL**
