# LFB-103C — Multi-page Liviza source-port master plan (Act 1B) + Act 2 sitewide swap register

Plan only. Nothing is implemented in this turn. Act 1B and Act 2 each need a
separate explicit release from Delroy.

## 1. Baseline

- Current commit: `cf389b1` ("Corrected plan per Tripple R").
- Accepted baseline: LFB-103A Act 1, homepage `index.html` ported byte-faithfully
  to `/`, evidence in `docs/vz-juspol-gen/execution-evidence/LFB-103A/`
  (parity at 1440/1280/992/768/375, height delta 1.79%, zero asset 404s,
  zero admin impact, one recorded deviation D-103A-1).
- Existing port machinery reused unchanged: `src/lib/public/template/LivizaTemplatePage.tsx`
  (CSS/JS lists, script rehydration, form/link neutralisation) and
  `src/lib/public/template/liviza-home.html.ts`.
- Source availability verified in this turn: all eight pages exist in the
  supplied package and reference exactly the same ten stylesheets and ten
  scripts as `index.html`. No source or route conflict found.

## 2. Act 1B scope — eight pages, one batch

| Source file | Bytes | Target route | Route file | HTML module |
|---|---|---|---|---|
| `about-us.html` | 47 374 | `/over-ons` | `src/routes/over-ons.tsx` | `liviza-about.html.ts` |
| `our-services.html` | 43 997 | `/diensten` | `src/routes/diensten.index.tsx` | `liviza-services.html.ts` |
| `visa.html` | 26 847 | `/diensten/$categorie` | `src/routes/diensten.$categorie.index.tsx` | `liviza-category.html.ts` |
| `visa-details.html` | 33 041 | `/diensten/$categorie/$slug` | `src/routes/diensten.$categorie.$slug.tsx` | `liviza-service-detail.html.ts` |
| `faq.html` | 25 291 | `/veelgestelde-vragen` | `src/routes/veelgestelde-vragen.tsx` | `liviza-faq.html.ts` |
| `blog-grid-view.html` | 34 497 | `/nieuws` | `src/routes/nieuws.index.tsx` | `liviza-news.html.ts` |
| `blog-single-view.html` | 29 369 | `/nieuws/$slug` | `src/routes/nieuws.$slug.tsx` | `liviza-news-detail.html.ts` |
| `contacts.html` | 20 693 | `/contact` | `src/routes/contact.tsx` | `liviza-contact.html.ts` |

Plus `src/routes/diensten.tsx` and `src/routes/nieuws.tsx` as pass-through
layout routes returning `<Outlet />` only (required by the dynamic children).

HTML modules all live in `src/lib/public/template/`. `/aanvraaghulp` is custom
product work and is out of scope here.

Route strings match the canonical map in `src/lib/public/routes-map.ts`
(`/veelgestelde-vragen`, `/diensten/$categorie/$slug`). No conflict.

## 3. Assets — reuse, no recopy

`public/vz-public/liviza/assets/**` (340 files, 5.4 MB) already contains the
complete `css/ js/ fonts/ images/ revolution/` tree of the package, so every
image, icon font and stylesheet referenced by the eight pages already resolves.
The batch copies **zero** new asset files. Proof recorded in evidence:
`git status --porcelain public/vz-public` shows no additions, and a link-audit
script resolves every `src=`/`href=`/`url()` reference of the eight extracted
bodies against the existing tree, failing the batch on any miss.

CSS and JS lists stay exactly as in `LivizaTemplatePage.tsx` — verified
identical across all nine pages — so `livizaHead()` is reused unchanged by every
route.

## 4. Scripts across SPA navigation

Unchanged mechanism, extended in one place only: the existing mount effect
removes any `script[data-liviza=...]` before re-adding, so navigating between
template routes never stacks duplicates. Additions in this batch:

- On unmount, also unbind `scripts.js` document-level handlers by namespace
  (`$(document).off('.pbmit')` where the source binds namespaced; otherwise the
  script tags are removed and re-added, which re-registers a single handler set).
- Swiper/magnific/waypoints instances are re-initialised by the re-executed
  `scripts.js`; any instance attached to a removed DOM node dies with it.
- Verification: navigate `/ → /diensten → /nieuws → /` twice and assert the
  count of `script[data-liviza]` tags stays at 10 and console stays clean.

## 5. Internal-link normalisation (all nine template-backed routes)

Extracted markup keeps original `*.html` hrefs. The wrapper gains a single
mapping table `index.html → /`, `about-us.html → /over-ons`,
`our-services.html → /diensten`, `visa.html → /diensten/verblijf`,
`visa-details.html → /diensten/verblijf/voorbeeld`, `faq.html →
/veelgestelde-vragen`, `blog-grid-view.html → /nieuws`,
`blog-single-view.html → /nieuws/voorbeeld`, `contacts.html → /contact`.

Click handling: mapped links are intercepted and pushed through the router
(no full reload); every unmapped `*.html` link and every `#`/demo link stays
neutralised exactly as today. `contacts.html`'s PHP form action and the Google
Maps iframe are neutralised in Act 1B (form submit prevented, iframe replaced
by a static inert placeholder box of identical dimensions) — no external
request is made from any route.

## 6. Per-page KEEP / REPURPOSE / REMOVE matrices

Legend: content dependency = governed VZ content record required before Act 2.

### `/over-ons` (about-us.html)
| Source section/class | Act 2 | Target purpose | Content dependency | Accessibility | Link behaviour |
|---|---|---|---|---|---|
| page title banner | KEEP | "Over ons" + breadcrumb | page title | breadcrumb `nav[aria-label]` | crumb → `/` |
| `section-lg` intro/about | KEEP | mandate & purpose text | governed org description | heading order h1→h2 | none |
| `counter-section-two` | REMOVE | — | — | — | — |
| `section-lg` (team/coaching) | REMOVE | — | — | — | — |
| `testimonial-one-bg` | REMOVE | — | — | — | — |
| `counter-one` | REMOVE | — | — | — | — |
| final `section-lg` CTA | REPURPOSE | guidance-only Aanvraaghulp CTA | CTA copy | button contrast ≥ 4.5:1 | → `/aanvraaghulp` |

### `/diensten` (our-services.html)
| Source | Act 2 | Target | Dependency | Accessibility | Links |
|---|---|---|---|---|---|
| page title banner | KEEP | "Diensten" | — | breadcrumb | → `/` |
| `section-lg pbmit-bg-color-light` service grid | KEEP | governed service categories | service catalog | cards as `<article>`, link is the heading | → `/diensten/$categorie` |
| `section-lg` process/steps | KEEP | preparation steps, guidance boundary | steps copy | ordered list semantics | — |
| `about-us-two pbmit-bg-color-global` dark band | KEEP geometry | category highlight, no autoplay | catalog | keyboard-operable controls, pause | → category |
| `section-lg counter-section-two` | REMOVE | — | — | — | — |
| trailing `section-lg` | REPURPOSE | Documentenlijsten entry point | doc lists | — | → `/documentenlijsten` |

### `/diensten/$categorie` (visa.html)
| Source | Act 2 | Target | Dependency | Accessibility | Links |
|---|---|---|---|---|---|
| page title banner | KEEP | category name + breadcrumb | category record | breadcrumb 3 levels | → `/diensten` |
| `section-lg service-section` card grid | KEEP | services in the category | catalog | card = article, focus ring | → `$slug` |
| sidebar/filter widgets (if present) | REPURPOSE | category switcher | catalog | list of links, no JS-only control | → sibling categories |
| any demo CTA/download widget | REMOVE unless a governed document exists | — | doc register | — | — |

### `/diensten/$categorie/$slug` (visa-details.html)
| Source | Act 2 | Target | Dependency | Accessibility | Links |
|---|---|---|---|---|---|
| page title banner | KEEP | service name | service record | breadcrumb 4 levels | ↑ |
| `visa-details-section` main column | KEEP | description, requirements, documents, costs | governed service record | h2/h3 order, definition lists | — |
| sidebar service list | KEEP | siblings in category | catalog | current item `aria-current` | → siblings |
| sidebar brochure/contact widget | REPURPOSE | practical info + Aanvraaghulp CTA | contact set | — | → `/aanvraaghulp` |
| pricing / packages | REMOVE unless governed fees exist | — | fee record | — | — |
| progress circles / counters | REMOVE | — | — | — | — |

### `/veelgestelde-vragen` (faq.html)
| Source | Act 2 | Target | Dependency | Accessibility | Links |
|---|---|---|---|---|---|
| page title banner | KEEP | "Veelgestelde vragen" | — | breadcrumb | → `/` |
| `section-lg` intro | KEEP | scope + guidance boundary | intro copy | — | — |
| `section-faq` accordion | KEEP | governed Q&A groups | FAQ records | native `<button aria-expanded>` + `aria-controls`, no div-buttons | in-answer links to services |
| contact/CTA panel | KEEP | governed contact + Aanvraaghulp | contact set | — | → `/contact` |

### `/nieuws` (blog-grid-view.html)
| Source | Act 2 | Target | Dependency | Accessibility | Links |
|---|---|---|---|---|---|
| page title banner | KEEP | "Nieuws en mededelingen" | — | breadcrumb | → `/` |
| `section-lg` card grid | KEEP | notice cards | news records | article + time element | → `/nieuws/$slug` |
| pagination | KEEP | paginate when records exist | news records | `nav[aria-label]`, current page marked | — |
| category/tag/search widgets | REPURPOSE to a simple type filter, or REMOVE | — | news taxonomy | — | — |
| social share / comment counts | REMOVE | — | — | — | — |
| — (new) | REPURPOSE empty state | truthful "Er zijn nu geen mededelingen" in the grid zone | — | announced via region | — |

### `/nieuws/$slug` (blog-single-view.html)
| Source | Act 2 | Target | Dependency | Accessibility | Links |
|---|---|---|---|---|---|
| page title banner | KEEP | notice title + date | news record | breadcrumb 3 levels | → `/nieuws` |
| `section-lgb` article body | KEEP | notice body | news record | h1 once, semantic body | — |
| author box | REMOVE (or issuing unit only, if governed) | — | issuer record | — | — |
| tags + social share | REMOVE share; tags only if governed | — | taxonomy | — | — |
| comment list + comment form | REMOVE | — | — | — | — |
| prev/next navigation | KEEP | adjacent notices | news records | `rel` + labels | → siblings |
| sidebar recent posts | KEEP | recent notices | news records | — | → siblings |

### `/contact` (contacts.html)
| Source | Act 2 | Target | Dependency | Accessibility | Links |
|---|---|---|---|---|---|
| page title banner | KEEP | "Contact" | — | breadcrumb | → `/` |
| info cards (address/phone/mail/hours) | KEEP | governed VZ contact set | contact record | `address` element, tel/mailto links | — |
| contact form (PHP action) | REMOVE the submitting form | replaced by static "hoe u ons bereikt" panel in the same zone | contact record | no dead inputs left in DOM | — |
| Google Maps iframe | REMOVE third-party embed | inert static location panel, same dimensions | location record | text address available | — |
| CTA band | REPURPOSE | Aanvraaghulp guidance CTA | CTA copy | — | → `/aanvraaghulp` |

## 7. Binding homepage disposition for Act 2 (recorded, not executed)

| Homepage zone | Decision |
|---|---|
| Pre-header | KEEP geometry; governed VZ contact/practical info replaces demo contact; social + demo CTA removed |
| Header `header-style-1` | KEEP exact geometry, nav rhythm, responsive behaviour; swap identity, nav items and CTA only |
| Hero | KEEP 1:1 composition and dimensions; copy and image replaced later; CTA 1 = Aanvraaghulp, CTA 2 = Diensten; single static composition allowed only as a documented accessibility deviation |
| Three overlapping icon cards | KEEP; map to Diensten bekijken / Aanvraaghulp starten / Documentenlijsten |
| Intro/about block | KEEP geometry; public-service purpose + guidance boundary |
| Dark service band/carousel | KEEP visual geometry; governed service categories; keyboard-accessible controls; no forced autoplay; premium appearance preserved |
| Assessment CTA | KEEP geometry; guidance-only Aanvraaghulp wording; never submission or eligibility-decision wording |
| Country/portfolio chooser | REPURPOSE (not deleted) with identical card geometry as "Waarmee kunnen wij u helpen?" journey entries: Verblijf, Vestiging, Naturalisatie, Ingezetenschap, Asiel, Overig — subject to governed catalog release |
| Testimonials | REMOVE |
| Counters/statistics | REMOVE; no invented claims; no replacement unless the content contract expressly approves a practical-information block in that zone |
| Blog cards | KEEP; Nieuws en mededelingen incl. truthful empty state |
| Footer | KEEP exact geometry; governed quick links/contact/legal; newsletter, social links and invented details removed |

## 8. Verification (one automated run)

- Playwright script screenshots every one of the nine routes at 1440, 1280,
  992, 768, 375 and diffs each against the matching source page served from a
  temp directory outside the project; thresholds as in Act 1 (height delta ≤ 2%,
  per-section mismatch ≤ 3% ignoring antialiasing, identical section order/count).
- Per route: zero console errors, zero non-2xx asset responses, no horizontal
  overflow, computed fonts Mulish/Roboto.
- SPA navigation loop (§4) asserts no duplicate script tags or handler stacking.
- Admin isolation: `/admin` and `/admin/auth-signin` render unchanged;
  `curl /admin | grep -c vz-public` → 0; `git diff --stat` empty under
  `src/routes/admin*`, `src/lib/admin/**`, `public/admin/**`.
- `tsgo --noEmit` clean; build log reports `build OK`; no dependency added
  (`package.json` and lockfile unchanged).

## 9. Evidence and documentation

- `docs/vz-juspol-gen/execution-evidence/LFB-103B1/` with `REPORT.md`,
  `MANIFEST.md` (SHA-256 + bytes of every changed file), asset-reuse proof, the
  parity artefacts per route/viewport, and the deviation register (carrying
  D-103A-1 forward).
- MTB update: LFB-103A COMPLETE; **LFB-103B1 (this batch) PLANNED / NOT
  RELEASED**; LFB-103B2 (Act 2 sitewide governed swap) PLANNED / NOT RELEASED and
  blocked on the governed content records listed in §6; LFB-111
  document-retention remains blocked.

## 10. Act 2 content dependencies (blocking, not executed)

Service catalog and categories; per-service requirement/document/fee records;
FAQ records; news/notice records; governed contact set and opening hours;
organisation description; CTA copy; approved imagery. Where a record is absent,
Act 2 renders a truthful governed empty state in the same visual zone — never
invented text, never a demo value left in place.

## 11. Execution shape

One combined implementation batch for all eight pages (extraction, modules,
routes, link map, one verification run, evidence), followed by at most one
material correction round. No microbatches; cosmetic nits are logged, not re-run.

## 12. Forbidden throughout

No `/admin/*` edit, no new dependency, no ZIP commit, no Cloud/Database/Supabase,
no backend/API/auth, no GitHub, no deployment or publication, no analytics, no
external form submission or third-party embed, no invented institutional content,
no image replacement in Act 1B.

---

**Verdict: MULTI-PAGE LIVIZA SOURCE-PORT PLAN READY FOR DELROY APPROVAL**
