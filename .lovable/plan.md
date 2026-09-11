# LFB-103D — Sitewide Governed Content Swap (Plan Mode only)

**Baseline commit:** `289016ef9d918dbb7826d06e559137a6c873d000`
**Visual baselines accepted:** LFB-103A (homepage Act 1), LFB-103C (Act 1B, eight routes).
**This document releases nothing.** Status: `PLANNED / NOT RELEASED`.

Note on paths: in Plan Mode only `.lovable/plan.md` may be written, so the full plan is kept in this single file. On release, a copy is written to `docs/vz-juspol-gen/execution-evidence/LFB-103D/`.

## 1. Attachment inventory and precedence

| # | Document | Role |
|---|---|---|
| 1 | VZ-CONTENT-SOURCE-AND-AUTHORITY-AUDIT-001 | Source hierarchy and binding geometry rule (highest precedence) |
| 2 | VZ-CONTENT-BLOCKERS-AND-OPEN-DECISIONS-001 | Blocker register BCF-01…BCF-07 |
| 3 | VZ-HOMEPAGE-CONTENT-FIT-MATRIX-001 | Exact `/` slot copy + fallbacks |
| 4 | VZ-MULTI-PAGE-CONTENT-FIT-MATRIX-001 | Exact copy/actions for eight routes |
| 5 | VZ-NAVIGATION-CTA-AND-MICROCOPY-DECK-001 | Nav/CTA/microcopy strings |
| 6 | VZ-SEO-COPY-DECK-001 | Title/meta/OG/breadcrumb/intro drafts |

Precedence: Project Knowledge > audit 001 > blockers 001 > per-route matrices > microcopy deck > SEO deck. Geometry always wins over copy: if a string does not fit, use the documented shorter fallback — never change type size, line-height, container width or card height.

## 2. Resolved blockers (this authority)

- **BCF-01 resolved.** Public display name `Vreemdelingenzaken`; sub-line `Ministerie van Justitie en Veiligheid`. Used in header identity, footer identity, `/over-ons` intro, meta suffix.
- **BCF-02 resolved.** Contact unit `Afgifte Unit, oud Parket Gebouw`; address `Henck Arronstraat no. 1, Paramaribo`; telephone `+597 427-197`; e-mail `info@vz.juspol.sr`; hours `Maandag t/m donderdag 07:30–13:30` and `Vrijdag gesloten`. Used in pre-header, footer contact column and `/contact`.

Nothing beyond these seven facts is inferred: no extra departments, extensions, mandate wording, legal authority, fees or submission capability.

## 3. Remaining blockers (truthful empty state or omission)

| ID | Slot area | Planned behaviour |
|---|---|---|
| BCF-03 | Service catalogue / category wording | Journey + category cards keep geometry, show `Dienstinformatie wordt bevestigd.` |
| BCF-04 | Documents / PDF publication | Requirement lists only; no download link, no file claim |
| BCF-05 | Fees, legal bases | `Kosten worden bevestigd.` in the fee block |
| BCF-06 | FAQ answers, notices, privacy/disclaimer | `Veelgestelde vragen worden bevestigd.`, `Er zijn nu geen mededelingen.`, legal routes not created |
| BCF-07 | Imagery | Liviza demo images retained, each tagged `TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER` in an image register; no generation, no swap |

## 4. Per-route slot tables

### 4.1 `/` (src/lib/public/template/liviza-home.html.ts)

| Slot | Action / exact copy |
|---|---|
| Pre-header left | `Henck Arronstraat no. 1, Paramaribo` |
| Pre-header right | `+597 427-197` · `info@vz.juspol.sr` (fallback: phone only at ≤992px, as in source) |
| Header identity | `Vreemdelingenzaken` + sub-line `Ministerie van Justitie en Veiligheid` (sub-line only where the source variant has a second line; otherwise omitted) |
| Main nav | `Diensten` · `Veelgestelde vragen` · `Nieuws` · `Contact` |
| Header CTA | `Aanvraaghulp` (no route yet → renders as non-link label until `/aanvraaghulp` exists) |
| Hero eyebrow | `Informatie en voorbereiding` (fallback `Voorbereiding`) |
| Hero title | `Voorbereid naar Vreemdelingenzaken` (fallback `Goed voorbereid op weg`) |
| Hero description | `Vind informatie over diensten, documenten en voorbereiding.` (fallback `Informatie over diensten en documenten.`) |
| Hero primary CTA | `Start aanvraaghulp` + nearby body line `Dit is geen aanvraag.` |
| Hero secondary CTA | `Bekijk diensten` → `/diensten` |
| Hero slider | One static composition retained; documented accessibility deviation |
| Quick cards 1–3 | `Diensten bekijken`, `Aanvraaghulp gebruiken`, `Documentenlijsten` |
| Intro heading / body | `Waarmee kunnen wij u helpen?` / `U krijgt uitleg over stappen, documenten en waar u terechtkunt.` |
| Intro commercial claims, signature, experience badge | REMOVE |
| Dark service band heading | `Diensten`; cards → GOVERNED EMPTY STATE `Dienstinformatie wordt bevestigd.` (BCF-03); autoplay off, controls keyboard-reachable |
| Guidance/assessment panel | `Weet u niet welke dienst past?` + CTA `Start aanvraaghulp` + caption `De aanvraaghulp geeft informatie en helpt u voorbereiden. U dient hier niets in.` |
| Country/portfolio chooser | REPURPOSE → `Waarmee kunnen wij u helpen?` journey cards: `Verblijf`, `Vestiging`, `Naturalisatie`, `Ingezetenschap`, `Asiel`, `Overig`; flags removed, card geometry unchanged; cards non-linking until catalogue accepted |
| Testimonials, counters/statistics | REMOVE (section deleted, following section spacing preserved) |
| News block | Heading `Nieuws en mededelingen`; cards replaced by empty state `Er zijn nu geen mededelingen.` in one card-height block |
| Footer col 1 | `Vreemdelingenzaken` / `Ministerie van Justitie en Veiligheid` |
| Footer col 2 | Quick links: `Diensten`, `Veelgestelde vragen`, `Nieuws`, `Contact` |
| Footer col 3 | `Afgifte Unit, oud Parket Gebouw`, `Henck Arronstraat no. 1, Paramaribo`, `+597 427-197`, `info@vz.juspol.sr` |
| Footer col 4 | `Maandag t/m donderdag 07:30–13:30`, `Vrijdag gesloten` |
| Footer bottom | `Privacy` · `Disclaimer` as plain text references (routes not created) |
| Newsletter, social row, payment/brand strip | REMOVE |

### 4.2–4.9 Other routes (per multi-page matrix)

| Route | Slot actions |
|---|---|
| `/over-ons` | Title/breadcrumb `Over ons`; intro `Vreemdelingenzaken is onderdeel van het Ministerie van Justitie en Veiligheid.`; mandate detail GOVERNED EMPTY STATE `Aanvullende informatie over de organisatie wordt bevestigd.`; counters/team/testimonials REMOVE; CTA `Bekijk de aanvraaghulp` |
| `/diensten` | Title `Diensten`; category cards GOVERNED EMPTY STATE (BCF-03); process band `Bereid uw bezoek goed voor.`; counter band REMOVE; pricing REMOVE |
| `/diensten/$categorie` | Title/breadcrumb from category record → BLOCKED, empty state `Dienstinformatie wordt bevestigd.`; card grid + sidebar geometry kept; demo CTA/downloads REMOVE |
| `/diensten/$categorie/$slug` | Title/body from governed record → BLOCKED empty state; requirements/documents block geometry kept, `Documenten en formulieren zijn verkrijgbaar via het kantoor van Vreemdelingenzaken.`; fee block `Kosten worden bevestigd.`; pricing/counters/brochure download REMOVE |
| `/veelgestelde-vragen` | Title `Veelgestelde vragen`; intro `Antwoorden worden per onderwerp weergegeven.`; accordion geometry kept with `Veelgestelde vragen worden bevestigd.`; sidebar promo/contact-sales REMOVE |
| `/nieuws` | Title `Nieuws en mededelingen`; grid replaced by `Er zijn nu geen mededelingen.`; pagination, tags, search, share, categories REMOVE |
| `/nieuws/$slug` | GOVERNED EMPTY STATE `Deze mededeling is niet beschikbaar.`; author box, comments, share, related REMOVE |
| `/contact` | Title `Contact`; cards → approved unit/address/phone/e-mail/hours; form REMOVE; map embed REMOVE, replaced by static panel `Hoe u ons bereikt` with the address text in the same block dimensions |

## 5. Source module / file impact (future batch)

Content edits only inside the nine HTML modules and their route `head()`:

- `src/lib/public/template/liviza-{home,about,services,category,service-detail,faq,news,news-detail,contact}.html.ts`
- `src/routes/{index,over-ons,diensten.index,diensten.$categorie.index,diensten.$categorie.$slug,veelgestelde-vragen,nieuws.index,nieuws.$slug,contact}.tsx` (meta only)
- Possibly `src/lib/public/routes-map.ts` (nav labels only)

Not touched: `LivizaTemplatePage.tsx` behaviour, `public/vz-public/liviza/assets/**`, `src/styles.css`, `src/routes/__root.tsx`, anything under `/admin`.

## 6. Removal checklist and demo-copy eradication

Removed everywhere: `Liviza`, demo person names, testimonials, counters, pricing packages, newsletter, social icons, comments, author boxes, share bars, PHP/mail form markup, Google Maps iframe, country/flag sales blocks, commercial consultancy claims, `lorem`, `demo`, `.html` demo links, `#` dead CTAs, `tel:`/`mailto:` demo values.

Eradication check on release: `rg -in "liviza|lorem|testimonial|newsletter|subscribe|\\bvisa\\b|consult|\\+1[- ]|example\\.com|\\.html\"" src/lib/public/template/` must return only asset paths, plus a manual read of each module's visible text.

## 7. Fit method

Per slot: UTF-16 character count against the matrix maximum; if over, use the documented fallback. After the swap, automated screenshots at 1440/1280/992/768/375 plus a DOM check for `scrollWidth > clientWidth` and for text clipping in every card/button. No CSS change is permitted as a fit remedy.

## 8. Internal links and metadata

Links only to existing routes: `/`, `/over-ons`, `/diensten`, `/diensten/$categorie`, `/diensten/$categorie/$slug`, `/veelgestelde-vragen`, `/nieuws`, `/nieuws/$slug`, `/contact`. `Aanvraaghulp`, `Documentenlijsten`, `Privacy`, `Disclaimer` stay non-linking labels. Titles/descriptions/OG per the SEO deck; `noindex, follow` retained while content is provisional.

## 9. Verification (future batch)

Before/after screenshots at the five widths for all nine routes; overflow, console, HTTP/404; keyboard nav for menu, accordion and carousel; skip link; heading order; alt text on retained images; SPA navigation script integrity; `/admin/*` returns 200 with zero diff; typecheck; build. Evidence → `docs/vz-juspol-gen/execution-evidence/LFB-103D/` (`REPORT.md`, `MANIFEST.md`, `screenshots/`, `image-register.md`).

## 10. Execution shape

One combined Build Mode batch for all nine routes, then at most one material correction round. No microbatches. Requires a separate explicit release from Delroy.

## 11. MTB status

LFB-103D — Sitewide governed content swap: `PLANNED / NOT RELEASED`. LFB-101, LFB-102, LFB-103A, LFB-103C complete. Image swap, wizard `/aanvraaghulp`, legal routes, catalogue adoption: not planned here.

**Verdict:** PLAN COMPLETE WITH BLOCKED CONTENT FIELDS
