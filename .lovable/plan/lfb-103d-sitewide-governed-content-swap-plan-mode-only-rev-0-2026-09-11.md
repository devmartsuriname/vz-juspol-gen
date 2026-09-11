# LFB-103D — Sitewide Governed Content Swap (Plan Mode only, rev. 002)

**Baseline commit:** `289016ef9d918dbb7826d06e559137a6c873d000`
**Visual baselines accepted:** LFB-103A (homepage Act 1), LFB-103C (Act 1B, eight routes).
**This document releases nothing.** Status: `PLANNED / NOT RELEASED`.

Plan Mode permits writing only `.lovable/plan.md`, so the whole plan is kept here. On release a copy goes to `docs/vz-juspol-gen/execution-evidence/LFB-103D/`.

## 1. Inputs and precedence

| # | Input | Role |
|---|---|---|
| 1 | Project Knowledge | Highest |
| 2 | VZ-CONTENT-SOURCE-AND-AUTHORITY-AUDIT-001 | Source hierarchy, binding geometry rule |
| 3 | Delroy release of 2026-09-11 (identity/contact; BCF-03; BCF-04; privacy/disclaimer) | Binding new-project decisions |
| 4 | SERVICE-CONTENT-MIGRATION-MATRIX.md | Catalogue: 15 services, 18 document groups, 9 wizard branches, 17 form records |
| 5 | VZ-CONTENT-BLOCKERS-AND-OPEN-DECISIONS-001 | Blocker register |
| 6 | VZ-HOMEPAGE / VZ-MULTI-PAGE content-fit matrices | Per-slot copy |
| 7 | VZ-NAVIGATION-CTA-AND-MICROCOPY-DECK-001 | Nav/CTA/microcopy |
| 8 | VZ-SEO-COPY-DECK-001 | Titles/meta/OG |
| 9 | `https://www.vz2.juspol.sr` (old public site) | Historical publication-pattern reference only — lowest precedence |

Geometry always outranks copy: if a string does not fit, use the documented shorter fallback. No font-size, line-height, container-width or card-height change is ever a fit remedy.

## 2. Old-site evidence boundary

The old site evidences that these public surfaces historically existed: Documenten Lijsten, Veel Gestelde Vragen, Asiel, Instructies, Type Aanvragen, Aanvraag Indienen, Bekendmakingen, Verleende Verblijfsvergunningen. Its certificate is invalid/untrusted and retrieval is unreliable; nothing on it is treated as current authority.

**Rejected outright and added to the forbidden-value scan:** `Ministerie van Justitie en Politie` as current sub-line, `INFO@N-REMOTE.COM`, extensions `3610`–`3612`, hosting/vendor credits, and any wording implying the new portal submits an official application (`Aanvraag indienen`, `Dien uw aanvraag in`, `Aanvragen`).

## 3. Resolved blockers

- **BCF-01 resolved.** `Vreemdelingenzaken` + sub-line `Ministerie van Justitie en Veiligheid`.
- **BCF-02 resolved.** `Afgifte Unit, oud Parket Gebouw`; `Henck Arronstraat no. 1, Paramaribo`; `+597 427-197`; `info@vz.juspol.sr`; `Maandag t/m donderdag 07:30–13:30`; `Vrijdag gesloten`.
- **BCF-03 resolved for planning/UI population.** 15 source-backed service records and the public categories `Verblijf`, `Vestiging`, `Naturalisatie`, `Ingezetenschap`, `Asiel`, `Overig`. Only individual unresolved fields stay blocked. No "Dienstinformatie wordt bevestigd" placeholder at catalogue level.
- **BCF-04 resolved** for the 17 registered, provenance-checked, byte-identical institutional PDFs only.

## 4. Remaining blockers

| ID | Slot | Behaviour |
|---|---|---|
| BCF-05 | SRV-005 fee | `Kosten worden bevestigd.` |
| BCF-05 | Missing legal bases (SRV-011/012, SRV-015 recheck) | Field omitted entirely — never estimated |
| BCF-06 | FAQ answers | Truthful empty state unless a citeable governed source exists |
| BCF-06 | News/notices | `Er zijn nu geen mededelingen.`; no republication of old Bekendmakingen |
| BCF-07 | Images | Liviza demo images retained, each recorded in an image register as `TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER` |

Evidence needed to unblock FAQ: question + answer text with named institutional source and approval date. For news: title, publication date, issuing authority, and confirmation of current relevance per item.

## 5. Route scope of the future batch

Thirteen routes. Nine existing Liviza-backed patterns — `/`, `/over-ons`, `/diensten`, `/diensten/$categorie`, `/diensten/$categorie/$slug`, `/veelgestelde-vragen`, `/nieuws`, `/nieuws/$slug`, `/contact` — plus four new real routes: `/documentenlijsten`, `/instanties`, `/privacy`, `/disclaimer`. These four become real links only after their route files exist in the same batch. `/aanvraaghulp` remains separate custom work and stays a non-linking label; it may never imply official submission.

## 6. Per-route slot tables

### 6.1 `/`

| Slot | Action / exact copy |
|---|---|
| Pre-header | `Henck Arronstraat no. 1, Paramaribo` · `+597 427-197` · `info@vz.juspol.sr` |
| Header identity | `Vreemdelingenzaken` + `Ministerie van Justitie en Veiligheid` |
| Nav | `Diensten` · `Documentenlijsten` · `Veelgestelde vragen` · `Nieuws` · `Contact` |
| Header CTA | `Aanvraaghulp` (non-link label) |
| Hero eyebrow / title / body | `Informatie en voorbereiding` / `Voorbereid naar Vreemdelingenzaken` / `Vind informatie over diensten, documenten en voorbereiding.` (fallbacks per matrix) |
| Hero CTAs | `Start aanvraaghulp` (+ body line `Dit is geen aanvraag.`) · `Bekijk diensten` |
| Hero slider | One static composition; documented accessibility deviation |
| Quick cards | `Diensten bekijken` → `/diensten` · `Aanvraaghulp gebruiken` (non-link) · `Documentenlijsten` → `/documentenlijsten` |
| Intro | `Waarmee kunnen wij u helpen?` / `U krijgt uitleg over stappen, documenten en waar u terechtkunt.`; claims, signature, experience badge REMOVE |
| Dark service band | Heading `Diensten`; cards populated from the 15 governed service records (category-grouped); autoplay off, controls keyboard-reachable |
| Guidance panel | `Weet u niet welke dienst past?` + `Start aanvraaghulp` + caption `De aanvraaghulp geeft informatie en helpt u voorbereiden. U dient hier niets in.` |
| Country chooser ("Immigration — Choose your country") | REPURPOSE → stakeholder section. Liviza geometry, card styling, typography, spacing, responsive behaviour and section rhythm retained 1:1. Eyebrow `SAMENWERKENDE INSTANTIES`; heading `Belangrijke instanties voor uw aanvraag`; intro `Bekijk welke overheidsinstanties betrokken kunnen zijn bij uw aanvraag of procedure.`; six cards from the governed roster — `Vreemdelingendienst`, `Immigratiedienst`, `Dienst Werkvergunningen`, `Consulaire Zaken`, `Centraal Bureau voor Burgerzaken`, `Afdeling Bedrijfsvergunningen` — each showing only the institution name, a concise role/relationship line and `Meer informatie` → `/instanties`. Flags, country names, country-sales copy and country navigation REMOVE. World-map background may remain temporarily as a template placeholder, recorded in the image register for later replacement by a restrained Suriname/government visual; no redesign in this batch. Names and departmental attribution remain subject to the governed authority register. The six service categories are NOT duplicated here — service discovery stays in the dark service band, the three quick-action cards and `/diensten`. |
| Testimonials, counters | REMOVE |
| News block | `Nieuws en mededelingen` + `Er zijn nu geen mededelingen.` in one card-height block |
| Footer | Col 1 identity + sub-line; col 2 quick links (incl. `Documentenlijsten`); col 3 unit/address/phone/e-mail; col 4 opening hours; bottom bar `Privacy` · `Disclaimer` as real links |
| Newsletter, social, brand strip | REMOVE |

### 6.2 Other existing routes

| Route | Slots |
|---|---|
| `/over-ons` | `Over ons`; intro `Vreemdelingenzaken is onderdeel van het Ministerie van Justitie en Veiligheid.`; further mandate detail GOVERNED EMPTY STATE `Aanvullende informatie over de organisatie wordt bevestigd.`; counters/team/testimonials REMOVE; CTA `Bekijk de aanvraaghulp` |
| `/diensten` | `Diensten`; six category cards (`Verblijf`…`Overig`) with service counts from the matrix; process band `Bereid uw bezoek goed voor.`; counters/pricing REMOVE |
| `/diensten/$categorie` | Title = category label; grid of that category's governed services; sidebar = category switcher + link to `/documentenlijsten`; demo CTAs/downloads REMOVE |
| `/diensten/$categorie/$slug` | Official service name (≤55 chars) + source-backed description; requirements/document groups rendered as information with provenance/verification status; fee = source value, or `Kosten worden bevestigd.` for SRV-005; missing legal bases omitted; document note `Documenten en formulieren zijn verkrijgbaar via het kantoor van Vreemdelingenzaken.` plus links to registered PDFs where one exists; pricing/counters REMOVE |
| `/veelgestelde-vragen` | `Veelgestelde vragen`; intro `Antwoorden worden per onderwerp weergegeven.`; accordion geometry kept with `Veelgestelde vragen worden bevestigd.`; sidebar promos REMOVE |
| `/nieuws` | `Nieuws en mededelingen`; `Er zijn nu geen mededelingen.`; pagination/tags/search/share/categories REMOVE |
| `/nieuws/$slug` | `Deze mededeling is niet beschikbaar.`; author/comments/share/related REMOVE |
| `/contact` | `Contact`; cards with unit, address, telephone, e-mail, hours; form REMOVE; map embed REMOVE, replaced by static `Hoe u ons bereikt` panel of identical block dimensions |

### 6.3 `/documentenlijsten` (new)

Liviza services/inner-page geometry reused. Title `Documentenlijsten`; intro `Officiële documenten en formulieren van Vreemdelingenzaken.`; note `Deze documenten zijn de officiële brondocumenten.` Grouped list of the 18 document groups; each registered PDF row shows a human-readable title, the linked service, and metadata (registered filename, size, SHA-256 short form, verification status) rendered as text separate from the binary, plus a download control `Document openen`.

PDF handling during released execution only: copy byte-identically to a dedicated public path (`public/vz-public/documenten/`), keep registered filenames, never edit/rename/compress/watermark/regenerate, verify all 17 SHA-256 hashes and `%PDF-` headers after placement, expose no duplicates or other evidence files. PDFs are attached only at build release; until then this route is planned, not built.

### 6.4 `/instanties` (new)

Approved Liviza inner-page/grid geometry reused 1:1. Title `Instanties`; intro `Overheidsinstanties die betrokken kunnen zijn bij uw aanvraag of procedure.` One card per roster entry: `Vreemdelingendienst`, `Immigratiedienst`, `Dienst Werkvergunningen`, `Consulaire Zaken`, `Centraal Bureau voor Burgerzaken`, `Afdeling Bedrijfsvergunningen`.

Each card shows the institution name and a concise role/relationship line. Further detail (address, telephone, hours, departmental attribution) appears only where independently current-verified. Any old-site or screenshot-derived detail that is not current-verified is rendered with the label `VERIFY BEFORE PUBLICATION` and never presented as a confirmed current fact; where nothing is verified, the detail block shows `Gegevens worden bevestigd.` in unchanged card geometry. No third-party logos, links or embeds.

### 6.5 `/privacy` (new) — exact copy

Title `Privacyverklaring`. Sections:
- `Deze website is een informatieve website van Vreemdelingenzaken. U kunt hier informatie lezen en uw bezoek voorbereiden.`
- `Er is geen publiek account en geen inlogmogelijkheid.`
- `U kunt via deze website geen officiële aanvraag indienen.`
- `De aanvraaghulp verwerkt geen vrije tekst en vraagt niet om persoonsgegevens.`
- `Er wordt standaard geen analyse- of volgsoftware gebruikt.`
- `Er is geen nieuwsbrief, marketingtracking of sociale-mediawidget.`
- `Er is geen contactformulier waarmee persoonsgegevens worden verzonden.`
- `Wilt u contact opnemen, gebruik dan de gegevens op de pagina Contact.`
- `Deze verklaring wordt aangepast voordat inloggen, formulieren, statistieken of transacties worden toegevoegd.`

No server-log, cookie-inventory or retention claim is made.

### 6.6 `/disclaimer` (new) — exact copy

Title `Disclaimer`. Sections:
- `Deze website geeft informatie en ondersteunt uw voorbereiding.`
- `De aanvraaghulp is geen aanvraag, geen indiening en geen beslissing over uw situatie.`
- `Controleer de actuele vereisten altijd bij Vreemdelingenzaken.`
- `De gepubliceerde documenten zijn de officiële brondocumenten van Vreemdelingenzaken.`
- `Waar kosten of wettelijke grondslagen nog niet zijn bevestigd, worden deze niet weergegeven en niet geschat.`

## 7. Source module / file impact (future batch)

Edited: `src/lib/public/template/liviza-{home,about,services,category,service-detail,faq,news,news-detail,contact}.html.ts`; matching route files' `head()`; `src/lib/public/routes-map.ts` (nav labels + four new available routes).
New: `src/routes/documentenlijsten.tsx`, `src/routes/instanties.tsx`, `src/routes/privacy.tsx`, `src/routes/disclaimer.tsx`, four matching HTML modules, `src/content/` catalogue records for services/categories/document groups and the stakeholder roster, and (at release) `public/vz-public/documenten/**`.
Untouched: `LivizaTemplatePage.tsx` behaviour, `public/vz-public/liviza/assets/**`, `src/styles.css`, `src/routes/__root.tsx`, everything under `/admin`.

## 8. Removal checklist and forbidden-value scan

Removed: `Liviza`, demo names, testimonials, counters, pricing packages, newsletter, social icons, comments, author boxes, share bars, PHP/mail form markup, Google Maps iframe, flag/country sales blocks, commercial claims, `lorem`, `.html` demo links, `#` dead CTAs, demo `tel:`/`mailto:`.

Scan on release must return zero visible-text hits for: `liviza|lorem|testimonial|newsletter|subscribe|consult|Justitie en Politie|N-REMOTE|3610|3611|3612|Aanvraag indienen|Dien uw aanvraag`.

## 9. Fit method

Per slot: UTF-16 count against the matrix maximum; over-length → documented fallback. After swap: screenshots at 1440/1280/992/768/375 for all thirteen routes, DOM checks for `scrollWidth > clientWidth` and clipped text in every card/button. No CSS change as a fit remedy.

## 10. Metadata

Per the SEO deck, with `Vreemdelingenzaken` as the suffix once identity is applied; new routes: `Documentenlijsten — Vreemdelingenzaken` / `Officiële documenten en formulieren.`; `Privacyverklaring — Vreemdelingenzaken` / `Hoe deze informatieve website met uw gegevens omgaat.`; `Disclaimer — Vreemdelingenzaken` / `Informatie en voorbereiding, geen aanvraag of beslissing.` `noindex, follow` retained while content is provisional.

## 11. Acceptance evidence

Before/after screenshots at five widths for all thirteen routes; overflow, console, HTTP/404; PDF hash + header verification table for all 17 files; keyboard nav (menu, accordion, carousel), skip link, heading order, alt text; SPA navigation script integrity; forbidden-value scan output; `/admin/*` 200 with zero diff; typecheck; build. Evidence → `docs/vz-juspol-gen/execution-evidence/LFB-103D/` (`REPORT.md`, `MANIFEST.md`, `screenshots/`, `pdf-verification.md`, `image-register.md`).

## 12. Execution shape

One combined Build Mode batch covering all thirteen routes plus PDF placement, then at most one material correction round. No microbatches. Requires separate explicit release; PDFs supplied at that time.

## 13. Risk record

- **Weak assumption:** old-site public availability proves a historical publication pattern, not that every statement remains current; likewise, old-site stakeholder details are assumed current without evidence.
- **Missing constraint:** a future operational owner must maintain FAQ, news and legal content and review dates; each stakeholder entry needs a named verification owner, source and date.
- **Material failure risk:** stale old-site claims could appear current and authoritative inside the polished new interface, including obsolete third-party contact or ministry information on `/instanties`.

## 14. MTB planning status

LFB-103D — sitewide content swap + `/documentenlijsten`, `/instanties`, `/privacy`, `/disclaimer`: `PLANNED / NOT RELEASED`. LFB-101, LFB-102, LFB-103A, LFB-103C complete. Image swap (incl. world-map background), `/aanvraaghulp` wizard, FAQ/news population, stakeholder detail verification: separately planned, not in this batch.

**Verdict:** PLAN COMPLETE WITH BLOCKED FAQ/NEWS FIELDS
