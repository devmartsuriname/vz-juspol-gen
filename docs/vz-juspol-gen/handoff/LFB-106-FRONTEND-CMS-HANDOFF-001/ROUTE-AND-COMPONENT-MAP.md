# ROUTE AND COMPONENT MAP — LFB-106

Every public surface mapped to the file — and the exact function or block —
that renders it. All paths are repository-relative. Read-only record.

---

## 1. Route → content module → head

| URL | Route file | HTML module / export | Head |
| --- | --- | --- | --- |
| `/` | `src/routes/index.tsx` | `liviza-home.html.ts` → `LIVIZA_HOME_HTML` | `publicHead("Home", …)` + `livizaHead()` |
| `/over-ons` | `src/routes/over-ons.tsx` | `liviza-about.html.ts` | idem |
| `/diensten` | `src/routes/diensten.index.tsx` (under layout `diensten.tsx`) | `liviza-services.html.ts` | idem |
| `/diensten/$categorie` | `src/routes/diensten.$categorie.index.tsx` | `liviza-category.html.ts` (per-category generator) | idem |
| `/diensten/$categorie/$slug` | `src/routes/diensten.$categorie.$slug.tsx` | `liviza-service-detail.html.ts` (per-service generator) | idem |
| `/aanvraaghulp` | `src/routes/aanvraaghulp.tsx` | `liviza-wizard.html.ts` | idem |
| `/documentenlijsten` | `src/routes/documentenlijsten.tsx` | `liviza-documenten.html.ts` | idem |
| `/veelgestelde-vragen` | `src/routes/veelgestelde-vragen.tsx` | `liviza-faq.html.ts` | idem |
| `/nieuws` | `src/routes/nieuws.index.tsx` (under layout `nieuws.tsx`) | `liviza-news.html.ts` | idem |
| `/nieuws/$slug` | `src/routes/nieuws.$slug.tsx` | `liviza-news-detail.html.ts` | idem |
| `/instanties` | `src/routes/instanties.tsx` | `liviza-instanties.html.ts` | idem |
| `/contact` | `src/routes/contact.tsx` | `liviza-contact.html.ts` | idem |
| `/privacy`, `/disclaimer` | `src/routes/privacy.tsx`, `src/routes/disclaimer.tsx` | `liviza-legal.html.ts` | idem |
| `/admin/*` | `src/routes/admin.tsx`, `src/routes/admin/**` | isolated admin shell | out of scope |

All public routes render through the same wrapper:
`LivizaTemplatePage` (`src/lib/public/template/LivizaTemplatePage.tsx`).

## 2. Surface → implementation

| Surface | File | Exact location |
| --- | --- | --- |
| Global header (all inner pages) | `src/lib/public/template/chrome.ts` | `header(active)` → wraps `headerTop(active)`; emitted by `pageOpen(active)` |
| Home header incl. hero | `chrome.ts` | `homeHeader()` |
| Top bar / pre-header (address, phone, e-mail, hours, Contact CTA) | `chrome.ts` | `headerTop()`, `.pre-header` block; Contact CTA is the `li.pbmit-header-button.vz-header-cta` in the right-hand hours cell (LFB-104) |
| Primary navigation | `chrome.ts` | `navItems(active)` — Home, Over ons, Diensten (dropdown of the 6 categories), Aanvraaghulp, Documentenlijsten, Nieuws, Contact |
| Mobile navigation | `chrome.ts` markup (`.navbar-toggler`, `.pbmit-mobile-menu-bg`, `#pbmit-menu`) + behaviour from `public/vz-public/liviza/assets/js/scripts.js` | toggle button inside `headerTop()` |
| Header phone block | `chrome.ts` | `.pbmit-header-phone` in `headerTop()`, uses `identity.phoneHref` |
| Hero area + three slides | `chrome.ts` | `heroSlides` (3 records) + `heroSlide(slide)` + `homeHeader()`; slide backgrounds are the CSS classes `vz-hero-slide-1..3` defined in `vz-polish.css` |
| Slider controls | `chrome.ts` `.vz-hero-controls` (hidden but focusable `Vorige dia` / `Volgende dia` buttons and the `Dia X van 3` live status) + `vz-polish.css` D-008 pagination block + Swiper from the ported `scripts.js` | `data-autoplay="false"`, `data-loop="false"`, `data-arrows="false"`, `data-dots="true"` |
| Quick cards (home) | `src/lib/public/template/liviza-home.html.ts` | `pbminfotech-ihbox-style-3` row directly under the hero |
| Home body sections | `liviza-home.html.ts` | governed intro, category grid, preparation/CTA blocks |
| Service overview `/diensten` | `liviza-services.html.ts` | category cards, image from `categoryImage[slug]` in `chrome.ts` |
| Service category pages | `liviza-category.html.ts` | category intro + service cards from `servicesInCategory()`; no "Categorieën"/"Documenten" sidebar column (LFB-104) |
| Service-detail pages | `liviza-service-detail.html.ts` | full-width composition: summary, conditions list, facts (fee / legal basis / processing), official PDF below the checklist, `.vz-detail-panel` preparation panel, `.vz-related-grid` with at most 3 related cards, single callout |
| Document-list tabs | `liviza-documenten.html.ts` | six Bootstrap `nav-tabs` (one per category), one active panel; Home/End key supplement in `public/vz-public/js/vz-polish.js` |
| Document links | `liviza-documenten.html.ts` + `liviza-service-detail.html.ts` | anchors to `/vz-public/documenten/<file>`, built from `documents` / `documentFor(service)` in `src/content/vz-content.ts` |
| Aanvraaghulp wizard | `liviza-wizard.html.ts` (server-rendered steps) + `public/vz-public/js/vz-wizard.js` (visibility toggling, `localStorage` key `vz-aanvraaghulp`, 24h TTL) | `choiceCard()`, `step1`, `step2`, outcome step |
| News empty state | `liviza-news.html.ts` | governed "no approved notices" block |
| News detail | `liviza-news-detail.html.ts` | governed empty/unavailable state for `/nieuws/$slug` |
| FAQ empty state | `liviza-faq.html.ts` | single accordion item stating answers are pending + CTA to `/diensten` |
| Stakeholders `/instanties` | `liviza-instanties.html.ts` | cards from `stakeholders` + `STAKEHOLDER_VERIFY_NOTE`; images from `stakeholderImages` |
| Contact page | `liviza-contact.html.ts` | governed contact facts from `identity`; no commercial form, no submission |
| Legal pages | `liviza-legal.html.ts` | `/privacy` and `/disclaimer` bodies |
| Footer | `chrome.ts` | `footer()` — four widget columns (identity, Informatie links, Diensten category links, Contact facts) + bottom bar with Privacy / Disclaimer / Instanties |
| Page-top / breadcrumb bar | `chrome.ts` | `titleBar(title, crumbs)`; background composition defined in `vz-polish.css` (dark services-band base + two corner patterns) |
| Shared buttons / cards / icons | ported Liviza CSS (`shortcode.css`, `style.css`, `base.css`, `pbminfotech-base-icons.css`, `flaticon.css`, `fontawesome.css`) + VZ overrides in `vz-polish.css` | class families `pbmit-btn`, `pbminfotech-servicebox-*`, `pbminfotech-ihbox-*`, `pbmit-*-icon` |
| Visual tokens (VZ) | `src/styles.css` (`vz-*` tokens, `.vz-public` scope — not loaded on public routes today) and `vz-polish.css` custom properties | see `FRONTEND-HANDOFF-OVERVIEW.md` §5 |
| Typed React shell (unused by live pages) | `src/components/public/layout/**` | `PublicShell`, `PublicHeader`, `PublicFooter`, `PublicNavItem`, `MobileNavigation`, `PreHeaderStrip`, `PageTitle`, `Breadcrumbs`, `FooterColumn`, `LegalLinks` |

## 3. Behaviour files

| File | Responsibility |
| --- | --- |
| `public/vz-public/liviza/assets/js/scripts.js` | original template behaviour: menu, Swiper init, waypoints, counters |
| `public/vz-public/js/vz-polish.js` | VZ-owned supplements: Home/End keys for Bootstrap tablists, hero prev/next + "Dia X van 3" status sync |
| `public/vz-public/js/vz-wizard.js` | preparation-only wizard steps; only stores `{category, service, saved}` in `localStorage` for 24h; no network calls |
| `LivizaTemplatePage.tsx` | script (re)execution, cleanup on unmount, `submit` prevention, `*.html` link neutralisation |

## 4. Invariants a later implementer must not break

1. `livizaHead()` emits stylesheets only; scripts run exclusively from the
   post-mount effect (prevents the LFB-105 D-004 hydration mismatch).
2. `vz-polish.css` is always the last stylesheet.
3. `/admin/*` never loads public CSS/JS and public routes never load admin
   assets.
4. Navigation entries are rendered only when `available: true` in
   `routes-map.ts`, so the shell cannot produce a broken link.
5. Governed content is never invented; absent records render a governed empty
   state or are omitted.
