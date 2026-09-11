# VZ Juspol Gen — Public Frontend Plan v0.3 (Plan Mode only)

Remediation of Plan v0.2 after ACT-CHATGPT targeted correction. Planning output only: no implementation, no install, no dependency, no Cloud/Database/Supabase/GitHub/publication, no `/admin/*` change, no Knowledge change, no execution approval requested.

---

## 1. Input reconciliation

**Thirteen (13) governance/planning documents are present**, plus one source archive. Plan 001 said "twelve"; that was a miscount, corrected here. Nothing from the manifest is missing.

1. `DECISION-LOG.md`
2. `FRONTEND-ARCHITECTURE-BASELINE.md`
3. `LIVIZA-ASSET-AND-IMAGE-REPLACEMENT-REGISTER.md`
4. `LIVIZA-PAGE-AND-SECTION-SELECTION-MATRIX.md`
5. `LIVIZA-TO-TANSTACK-COMPONENT-MAPPING.md`
6. `LOVABLE-PROTECTED-SURFACES.md`
7. `PRE-LOVABLE-DOCUMENTATION-GATE.md`
8. `PUBLIC-PORTAL-REQUIREMENTS.md`
9. `SOURCE-OF-TRUTH-PRECEDENCE.md`
10. `VZ-FRONTEND-INFORMATION-ARCHITECTURE-AND-CONTENT-MAP.md`
11. `VZ-LOVABLE-FRONTEND-MTB-DRAFT.md`
12. `WIZARD-DECISION-MODEL.md`
13. `WIZARD-REQUIREMENTS.md`

**Archive:** `themeforest-xo9DItQc-liviza-immigration-consulting-html-template.zip`.

**Inspection status.** The archive was inspected in place (read-only, never extracted into the project, never copied, never committed). Structure: `Liviza HTML Package/Liviza HTML Files/` (21 HTML files, `css/`, `js/`, `images/`, `fonts/`, `revolution/`, `phpmailer/`) plus `Liviza Documentation/`.


| Selected page           | Inspected      | Basis                                                        |
| ----------------------- | -------------- | ------------------------------------------------------------ |
| `index.html`            | Yes — measured | section order + classes read (lines 274–1316) + shared CSS   |
| `about-us.html`         | Yes — measured | section order, grid classes, shared CSS rules (§2.4)         |
| `our-services.html`     | Yes — measured | section order, grid classes, shared CSS rules (§2.4)         |
| `visa.html`             | Yes — measured | section order, grid classes, shared CSS rules (§2.4)         |
| `visa-details.html`     | Yes — measured | sidebar/detail geometry read from `style.css` 479–489 (§2.4) |
| `faq.html`              | Yes — measured | accordion markup + `shortcode.css` 2133–2174 (§2.4)          |
| `blog-grid-view.html`   | Yes — measured | 3×3 card grid + `shortcode.css` 962–992 (§2.4)               |
| `blog-single-view.html` | Yes — measured | 9/3 split + sidebar widgets (§2.4)                           |
| `contacts.html`         | Yes — measured | 3× info box row, form block, map block (§2.4)                |


**Honest statement:** all nine selected pages plus the shared stylesheets (`base.css`, `style.css`, `shortcode.css`, `responsive.css`) have now been read at measurement depth in Plan Mode, read-only from the archive (`unzip -p`), never extracted, copied or committed. Measurement depth is section order, grid class geometry and the CSS rules those classes resolve to; pixel-perfect per-element padding tables for individual cards remain an implementation-batch detail, not a planning gap.

---

## 2. Liviza visual reference analysis (measured)

### 2.1 Global values read directly from `css/base.css :root`

FACT — exact source measurements:


| Token                     | Source value                                                      |
| ------------------------- | ----------------------------------------------------------------- |
| Primary                   | `#0067da`                                                         |
| Secondary                 | `#eea200`                                                         |
| Light surface             | `#f5f8fb`                                                         |
| Blackish / heading        | `#2d3845`                                                         |
| Body text                 | `#5d6975`                                                         |
| White                     | `#ffffff`                                                         |
| Body font                 | Mulish, 15px, line-height 1.8                                     |
| Heading font              | Roboto, weight 500                                                |
| Button font               | Roboto 500, 14px, weight 700 in `.pbmit-btn`, letter-spacing .5px |
| Base radius               | `4px` (`--border-radius`)                                         |
| Responsive breakpoint var | `1200px`                                                          |


Heading scale (FACT): h1 42/48, h2 36/42, h3 32/38, h4 26/34, h5 24/30, h6 20/26, all letter-spacing 0.

Buttons (FACT): `.pbmit-btn` padding 17px 30px, radius 4px; `.pbmit-btn-lg` padding 14px 60px, font 15px, radius 32px (pill). Link-buttons: uppercase, 14px, letter-spacing 1px, icon padded 10px left.

Section rhythm (FACT): `.section-lg` 90/70, `.section-md` 90/150, `.section-lgx` 90/200, `.section-lgb` bottom 60. Content max-width band `1200px` with `0 15px` gutters (Bootstrap 5 grid underneath).

Radii in use across cards (FACT, from `shortcode.css`): 3, 4, 5, 6, 8px — 6px and 8px dominate cards and media, 4px buttons/inputs, 3px small chips.

Shadow (FACT): `0 9px 35px 0 rgba(0,0,0,.07)` is the recurring elevated-card/image shadow.

Header geometry (FACT): logo max-height 50px; top-level nav links height and line-height 105px, margin 0 17px, 14–15px, weight 500–700, uppercase, letter-spacing 1px; a `pre-header` strip above with phone/search/button; sticky variant swaps the logo.

Breakpoints present in `responsive.css` (FACT): 1400, 1366, 1280, 1200, 1199, 1024, 991, 768, 767, 580, 575, 479, 375, 280.

Motion (FACT): global `a` transition `all .5s ease-out`; buttons `.2–.3s`; AOS, Swiper and Slider Revolution drive the rest. **All script-driven motion is rejected**; only CSS transitions ≤300ms are reconstructed, and all of it is disabled under `prefers-reduced-motion`.

### 2.2 `index.html` section-by-section decomposition (source order)


| #   | Source section                                             | Line   | Visual pattern to preserve                                                                            | Classification                                                                 |
| --- | ---------------------------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1   | `pre-header` strip                                         | header | thin dark strip, contact/left, actions/right                                                          | ADAPT VISUALLY — keep strip geometry, drop demo phone/social                   |
| 2   | `site-header header-style-1`                               | header | transparent-over-hero bar, 105px nav row, 50px logo, uppercase nav                                    | REBUILD IN LIVIZA DESIGN LANGUAGE                                              |
| 3   | Hero / Revolution slider                                   | top    | full-bleed hero, 42px h1, two CTA buttons, generous top/bottom pad (`335px 0 275px` on inner banners) | REBUILD — static text-first hero, keep type scale and pad rhythm, no slider    |
| 4   | `iconbox-section-one` (light bg, `margin-top:-105px`)      | 275    | 3–4 card row overlapping the hero by 105px, light `#f5f8fb` band                                      | ADAPT VISUALLY — keep the overlap + card row as quick-link grid                |
| 5   | `section-md` About                                         | 378    | two-column image collage + 22px/36px lead paragraph, 300 weight                                       | REJECT (no approved institutional claim/asset)                                 |
| 6   | `section-lgx service-one-bg` blackish                      | 426    | dark full-width service band, 90/200 padding, pattern backgrounds                                     | ADAPT VISUALLY — dark band kept, Swiper carousel replaced by static 3-col grid |
| 7   | Assessment CTA                                             | 672    | full-width accent CTA panel                                                                           | REBUILD — becomes `GuidanceEntryCard` with visible non-application boundary    |
| 8   | Portfolio / country cards                                  | 695    | image card grid                                                                                       | REJECT                                                                         |
| 9   | Testimonials                                               | 807    | quote slider                                                                                          | REJECT                                                                         |
| 10  | Counters                                                   | 959    | animated metrics                                                                                      | REJECT                                                                         |
| 11  | `section-lg` Blog                                          | 1007   | 3-card news row, 8px radius, date badge, meta line, read-more link-btn                                | ADAPT VISUALLY                                                                 |
| 12  | Search box overlay                                         | 1316   | full-screen search                                                                                    | REJECT (no fake search)                                                        |
| 13  | Footer (`pbmit-footer-widget-area`, `pbmit-footer-bottom`) | footer | dark multi-column widget area + bottom bar                                                            | REBUILD IN LIVIZA DESIGN LANGUAGE                                              |


### 2.4 Measured tables for the eight remaining selected pages

Shared across all eight: identical header (`105px` nav row, `50px` logo cap), identical inner-page banner `.pbmit-title-bar-wrapper` (background image + `:before` overlay, `.pbmit-breadcrumb` 16/26 white, links `rgba(255,255,255,.72)`), and an identical tail sequence (2-col CTA row `col-md-6`+`col-md-6`, footer widget row `col-md-6 col-lg-4` / `col-lg-3` / `col-lg-2` / `col-lg-3`, bottom bar `col-md-5`+`col-md-7`, plus a full-screen search overlay). Tail classification is uniform: banner ADAPT VISUALLY (VZ image, real breadcrumb), CTA REBUILD (no sales CTA), footer REBUILD IN LIVIZA DESIGN LANGUAGE at the same 4-column widths, search overlay REJECT.

`**about-us.html**`


| #   | Section        | Classes / grid                                                     | Geometry & type                                        | Responsive               | Class                                  |
| --- | -------------- | ------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------ | -------------------------------------- |
| 1   | Banner         | `.pbmit-title-bar-wrapper`                                         | 335/275 band, h1 42/48, breadcrumb 16/26               | image cover, text stacks | ADAPT VISUALLY                         |
| 2   | About agency   | `section-lg` · `col-md-12 col-lg-6` ×2                             | 90/70, 1200 band, 15px gutter, h2 36/42, body 15/1.8   | ≤991 single column       | ADAPT VISUALLY                         |
| 3   | Counters       | `section-lg counter-section-two` · 2× half + 5× `col-md-20percent` | 5-up metric strip                                      | 20% cols wrap ≤991       | REJECT (unsupported claims)            |
| 4   | Team           | `section-lg` · `col-md-6 col-lg-3` ×4                              | 4-up cards, 6px radius, `0 9px 35px 0 rgba(0,0,0,.07)` | 4→2→1                    | REBUILD (no persons unless authorised) |
| 5   | Testimonials   | `col-md-12 col-lg-6` split                                         | quote block                                            | stacks                   | REJECT                                 |
| 6   | Counters (2nd) | as #3                                                              | —                                                      | —                        | REJECT                                 |
| 7   | Blog           | `section-lg` · `col-md-6 col-lg-4` ×3                              | 3-up cards                                             | 3→2→1                    | ADAPT VISUALLY (governed notices)      |


`**our-services.html**`


| #   | Section       | Classes / grid                                                                     | Geometry & type                               | Responsive   | Class                                          |
| --- | ------------- | ---------------------------------------------------------------------------------- | --------------------------------------------- | ------------ | ---------------------------------------------- |
| 1   | Banner        | `.pbmit-title-bar-wrapper`                                                         | as above                                      | —            | ADAPT VISUALLY                                 |
| 2   | Service cards | `section-lg pbmit-bg-color-light` · `col-md-6 col-lg-4` ×3                         | light band `#f5f8fb`, 90/70, 8px radius cards | 3→2→1        | KEEP VISUALLY (card geometry)                  |
| 3   | About agency  | `col-md-12 col-lg-6` ×2                                                            | h2 36/42 + body                               | stacks ≤991  | ADAPT VISUALLY                                 |
| 4   | Dark CTA      | `about-us-two pbmit-bg-color-global` · `col-md-12 col-xl-9` + `col-md-12 col-xl-3` | brand-colour band, 9/3 split                  | stacks ≤1199 | REBUILD (governed guidance band, no sales CTA) |
| 5   | Team          | `col-md-6 col-lg-3` ×4                                                             | as above                                      | 4→2→1        | REBUILD                                        |
| 6   | Counters      | 5× `col-md-20percent`                                                              | —                                             | —            | REJECT                                         |
| 7   | Blog          | header `col-md-6` ×2 + `col-md-6 col-lg-4` ×3                                      | —                                             | 3→2→1        | ADAPT VISUALLY                                 |


`**visa.html**` — the primary source for `/diensten`


| #   | Section                  | Classes / grid                                         | Geometry & type                                                                      | Responsive | Class                                                       |
| --- | ------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------ | ---------- | ----------------------------------------------------------- |
| 1   | Banner                   | `.pbmit-title-bar-wrapper`                             | as above                                                                             | —          | ADAPT VISUALLY                                              |
| 2   | Service grid             | `section-lg service-section` · `col-md-6 col-lg-4` ×8+ | 3-up card grid, 90/70, 8px radius, hairline + shadow, title h5 24/30, excerpt 15/1.8 | 3→2→1      | KEEP VISUALLY — canonical grid for the 12 VZ service blocks |
| 3   | Two-column feature       | `row align-items-center` · `col-md-6` ×2               | image/text pair                                                                      | stacks     | ADAPT VISUALLY (text-first)                                 |
| 4   | Tail (CTA/footer/search) | see shared                                             | —                                                                                    | —          | REBUILD / REJECT                                            |


`**visa-details.html**` — the source for `/diensten/$categorie/$slug`


| #   | Section         | Classes / grid                                                                                                                                            | Geometry & type     | Responsive                                                                            | Class                                                                   |
| --- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1   | Banner          | `.pbmit-title-bar-wrapper`                                                                                                                                | as above            | —                                                                                     | ADAPT VISUALLY                                                          |
| 2   | Detail layout   | `visa-details-section` · `.service-left-col` (flex 0 0 30%, max 30%, margin-top 65px, padding-bottom 40px) + `.service-right-col` (70%, padding-top 65px) | 30/70 desktop split | source uses `order-2 order-lg-1` / `order-1`: on mobile main content precedes sidebar | KEEP VISUALLY (30/70 + mobile order)                                    |
| 3   | Sidebar widgets | `.service-sidebar .post-list` padding 30px 25px; `.widget_media_image` overlay card                                                                       | list + contact card | full-width below main                                                                 | ADAPT VISUALLY (nav list + governed contact card, no phone-sales block) |
| 4   | Feature blocks  | `col-md-4` ×3                                                                                                                                             | icon/label trio     | 3→1                                                                                   | ADAPT VISUALLY (SVG icons)                                              |
| 5   | Content pair    | `col-md-6` ×2                                                                                                                                             | body copy           | stacks                                                                                | KEEP VISUALLY                                                           |
| 6   | Related cards   | `col-md-6 col-lg-4` ×3                                                                                                                                    | as service card     | 3→2→1                                                                                 | ADAPT VISUALLY (related services)                                       |


`**faq.html**`


| #   | Section     | Classes / grid                                     | Geometry & type                                                                                                                                                                                                                | Responsive           | Class                                                                                |
| --- | ----------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ------------------------------------------------------------------------------------ |
| 1   | Banner      | `.pbmit-title-bar-wrapper`                         | as above                                                                                                                                                                                                                       | —                    | ADAPT VISUALLY                                                                       |
| 2   | Accordion A | `section-lg` · `col-md-12` · `.accordion` ×5 items | `.accordion-item` border none, margin-bottom 15px; `.accordion-button` radius 5px, 15px, weight 500, padding 20px; open state = brand background + white text, line-height 20px; `.accordion-body` 14px 20px, colour `#5d6975` | full width all sizes | KEEP VISUALLY / REBUILD BEHAVIOUR (native `<button aria-expanded>`, no Bootstrap JS) |
| 3   | Accordion B | `section-faq` · `col-12` · second `.accordion`     | same rules, second group                                                                                                                                                                                                       | —                    | KEEP VISUALLY                                                                        |


`**blog-grid-view.html**` — the source for `/nieuws`


| #   | Section   | Classes / grid                        | Geometry & type                                                                                                                                                                   | Responsive | Class                                                                                                  |
| --- | --------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| 1   | Banner    | `.pbmit-title-bar-wrapper`            | as above                                                                                                                                                                          | —          | ADAPT VISUALLY                                                                                         |
| 2   | Card grid | `section-lg` · `col-md-6 col-lg-4` ×9 | `.pbminfotech-blogbox-style-1` margin-bottom 35px; image radius 6px; `.pbminfotech-box-content` white, padding-top 15px; meta chip `top:-48px` on white; title `margin-top:-25px` | 3→2→1      | ADAPT VISUALLY — chip carries date only; image slot omitted or governed placeholder, geometry retained |
| 3   | Tail      | shared                                | —                                                                                                                                                                                 | —          | REBUILD / REJECT                                                                                       |


`**blog-single-view.html**` — the source for `/nieuws/$slug`


| #   | Section          | Classes / grid                                | Geometry & type                                                                     | Responsive      | Class                                                                  |
| --- | ---------------- | --------------------------------------------- | ----------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------- |
| 1   | Banner           | `.pbmit-title-bar-wrapper`                    | as above                                                                            | —               | ADAPT VISUALLY                                                         |
| 2   | Article          | `section-lgb` · `col-lg-9 blog-right-col`     | prose column, 15/1.8, h2–h4 scale, quote/list blocks in nested `col-12`/`col-md-12` | full width ≤991 | KEEP VISUALLY                                                          |
| 3   | Sidebar          | `col-lg-3 blog-left-col blog-details` widgets | search / categories / recent / tags                                                 | below article   | ADAPT VISUALLY (recent notices only; no search, tags, comments, share) |
| 4   | Comments / share | in-page blocks                                | —                                                                                   | —               | REJECT                                                                 |


`**contacts.html**`


| #   | Section    | Classes / grid                                                                       | Geometry & type                   | Responsive | Class                                                                                                                                     |
| --- | ---------- | ------------------------------------------------------------------------------------ | --------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Banner     | `.pbmit-title-bar-wrapper`                                                           | as above                          | —          | ADAPT VISUALLY                                                                                                                            |
| 2   | Info boxes | `section-lg` · `col-md-4` ×3 · `.pbminfotech-ihbox-style-2` (icon + heading + text)  | 3-up icon/label/value, 90/70 band | 3→1 ≤767   | KEEP VISUALLY — governed address / hours / channel, SVG icons                                                                             |
| 3   | Form + map | `col-md-6` ×2, form fields `col-md-12 col-lg-6` ×4 + `col-sm-12` + `.message-status` | PHPMailer-backed form             | stacks     | REJECT (no form, no PHP, no map tracker) — the 6/6 row becomes governed contact text + static institutional info block at the same widths |
| 4   | Tail       | shared                                                                               | —                                 | —          | REBUILD / REJECT                                                                                                                          |


### 2.5 Reconciliation into the rest of the plan

- Route plan (§3): `/diensten` inherits the `visa.html` 3-up grid; `/diensten/$categorie/$slug` inherits the 30/70 `service-left-col`/`service-right-col` split with mobile content-first order; `/nieuws` and `/nieuws/$slug` inherit `blog-grid-view` and the 9/3 `blog-single-view` split; `/veelgestelde-vragen` inherits the FAQ accordion; `/contact` inherits the 3× info-box row without form or map.
- Component mapping (§4): adds `ServiceDetailLayout` (30/70), `SidebarNavList`, `AccordionItem`, `NewsCard` (meta chip offsets), `ArticleLayout` (9/3), `InfoBox` (icon/label/value).
- Tokens (§5): adds sidebar rhythm 65px top offset / 40px bottom, sidebar list padding 30px 25px, accordion radius 5px, accordion header padding 20px, accordion body padding 14/20, news card bottom margin 35px, media radius 6px, meta-chip offsets −48/−25.
- Deviation register (§2.6): extended below with the eight-page findings.

### 2.6 Deviation register


| Source pattern                                  | Deviation                                             | Reason                                                  | Parity preservation                                                                              |
| ----------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Swiper services carousel                        | static grid                                           | no vendor JS; autoplay a11y                             | same card size, gutter, radius 8px, shadow, dark band padding                                    |
| Revolution hero slider                          | single static hero                                    | motion/vendor ban                                       | same height band, 42/48 h1, same CTA pair geometry                                               |
| Counters / testimonials / countries             | removed                                               | unsupported claims                                      | vertical rhythm re-balanced by keeping `section-lg` 90/70 spacing between survivors              |
| Newsletter + contact form                       | removed                                               | no public inputs                                        | footer column becomes contact summary at identical column widths                                 |
| Flaticon/Themify icon fonts                     | inline SVG, labelled                                  | licence + a11y                                          | same optical size and accent colour                                                              |
| Demo photography                                | omitted or approved replacement                       | asset register                                          | text-first blocks keep card aspect boxes so grid geometry is unchanged                           |
| jQuery dropdown menu                            | React disclosure nav                                  | no jQuery                                               | same 105px row, 17px item spacing, same hover underline                                          |
| Bootstrap collapse accordion (`data-bs-toggle`) | native `<button aria-expanded>` + React state         | no Bootstrap JS; keyboard/SR support                    | same 5px radius, 20px header padding, 14/20 body padding, brand-filled open state, 15px item gap |
| Team member cards (`col-md-6 col-lg-3` ×4)      | omitted unless persons are authorised                 | no invented institutional identity                      | if released, same 4-up grid, 6px radius, standard card shadow                                    |
| Contact form + map block (`col-md-6` ×2)        | governed contact text + static info block             | no inputs, no PHP/PHPMailer, no third-party map/tracker | same 6/6 row, same `section-lg` band, same info-box typography                                   |
| Blog sidebar search / tags / comments / share   | recent-notice list only                               | no search theatre, no social, no comments               | same `col-lg-3` sidebar width and widget rhythm                                                  |
| Blog card image + author meta                   | date-only chip; image omitted or governed placeholder | asset provenance; no invented authors                   | same 6px media radius, −48px chip offset, −25px title offset, 35px card gap                      |
| `visa-details` phone/CTA sidebar widget         | governed contact card                                 | no sales CTA                                            | same `widget_media_image` card footprint and 30px 25px padding                                   |


---

## 3. Route plan

Columns per route: source → purpose/blocks → files → record → empty behaviour → visual ref → a11y → evidence.


| Route                    | Source                    | Blocks                                                            | Files                                  | Record                          | Empty/blocked                                               | Desktop / mobile ref                                    | A11y checks                        | Evidence                                |
| ------------------------ | ------------------------- | ----------------------------------------------------------------- | -------------------------------------- | ------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------- | --------------------------------------- |
| `/`                      | `index.html` §2.2         | hero, quick links, service grid, guidance CTA, practical, notices | `routes/index.tsx` + home sections     | identity, category, notice      | notices → dated empty state; hero needs identity (blocking) | full-bleed hero + overlapping card row / stacked, 1-col | one h1, landmark order, focus ring | screenshots 320/768/1280, keyboard walk |
| `/diensten`              | `our-services.html`       | intro, category grid, support links                               | `routes/diensten.index.tsx`            | categories                      | no categories → route not meaningful (blocking)             | 3-col / 1-col                                           | link names complete                | screenshots + axe pass                  |
| `/diensten/$categorie`   | `visa.html`               | breadcrumb, intro, service cards                                  | `routes/diensten.$categorie.tsx`       | category+services               | unknown slug → Dutch 404                                    | 2–3 col list                                            | breadcrumb `nav[aria-label]`       | slug + 404 case                         |
| `/diensten/$categorie/$slug`        | `visa-details.html`       | 12 mandated blocks in portal order                                | `routes/diensten.$categorie.$slug.tsx` | service, document, fee, contact | per-block truthful omission                                 | content column + sticky aside / stacked                 | heading order h1→h2                | block-order screenshot                  |
| `/aanvraaghulp`          | `#assessment-cta`         | boundary, explanation, start                                      | `routes/aanvraaghulp.index.tsx`        | wizard model                    | model missing → start disabled with notice                  | centred card / full-width                               | boundary announced before CTA      | screenshot + SR read                    |
| wizard start             | rebuilt                   | root question, 9 branches + "Ik weet het niet zeker"              | `routes/aanvraaghulp.start.tsx`        | decision model                  | —                                                           | radio card list                                         | radiogroup semantics               | branch list check                       |
| wizard question          | rebuilt                   | question, explanation, choices, progress, back/change             | `routes/aanvraaghulp.vraag.$id.tsx`    | decision model                  | dead-end forbidden                                          | 1-col card                                              | `aria-live` progress               | every branch traversed                  |
| wizard review            | rebuilt                   | `Controleer uw antwoorden`, change links                          | `routes/aanvraaghulp.controle.tsx`     | session state                   | —                                                           | summary list                                            | change links named                 | screenshot                              |
| wizard result            | rebuilt                   | service, requirements, checklist, fee, contact, print             | `routes/aanvraaghulp.resultaat.tsx`    | service records                 | unmapped → truthful fallback                                | result card                                             | print stylesheet                   | print PDF-less proof                    |
| `/documentenlijsten`     | `visa-details.html` lists | intro, groups, forms, how to obtain                               | `routes/documentenlijsten.index.tsx`   | checklist model                 | empty → governed notice                                     | 2-col / 1-col                                           | list semantics                     | screenshot                              |
| `/documentenlijsten/$id` | same                      | title, purpose, requirements, notes, service link, disclaimer     | `routes/documentenlijsten.$id.tsx`     | exact list record               | unknown id → 404                                            | content column                                          | no download affordance             | 404 case + no-`<a download>` grep       |
| `/instructies`           | `visa-details.html` steps | process, prep, documents, after submission, boundary              | `routes/instructies.tsx`               | procedure records               | missing → omit step group                                   | numbered steps                                          | `<ol>` semantics                   | screenshot                              |
| `/veelgestelde-vragen`                   | `faq.html`                | categories, filter, accordion, help                               | `routes/veelgestelde-vragen.tsx`                       | FAQ records                     | no results state                                            | accordion column                                        | Radix accordion keyboard           | keyboard + no-result shot               |
| `/nieuws`                | `blog-grid-view.html`     | notice cards or dated empty state                                 | `routes/nieuws.index.tsx`              | notices                         | dated empty state (acceptable)                              | 3-col / 1-col                                           | card link names                    | both states                             |
| `/nieuws/$slug`          | `blog-single-view.html`   | title, date/status, body, sources, back                           | `routes/nieuws.$slug.tsx`              | notice                          | unknown slug → 404                                          | article column                                          | article landmark                   | screenshot                              |
| `/contact`               | `contacts.html`           | contact cards, hours, location text                               | `routes/contact.tsx`                   | contact record                  | missing → blocking                                          | 3 cards / stacked                                       | no form controls present           | screenshot + no-input grep              |
| `/over-ons`              | `about-us.html`           | mandate, platform boundary                                        | `routes/over-ons.tsx`                  | institutional text              | missing → blocking                                          | narrative column                                        | one h1                             | screenshot                              |
| `/privacy`               | inner page                | data boundary, browser state, analytics-off, reporting            | `routes/privacy.tsx`                   | legal text                      | missing → blocking                                          | text column                                             | contrast                           | screenshot                              |
| `/disclaimer`            | inner page                | scope, confirmation, non-submission, limits                       | `routes/disclaimer.tsx`                | legal text                      | missing → blocking                                          | text column                                             | contrast                           | screenshot                              |
| `/overzicht`             | inner page                | grouped route links                                               | `routes/overzicht.tsx`                 | route map                       | available routes only                                       | 4-col / 1-col                                           | list semantics                     | screenshot                              |
| custom 404               | inner page                | `Pagina niet gevonden`, recovery links                            | `__root.tsx` notFoundComponent         | route map                       | always available                                            | centred                                                 | keyboard recovery                  | screenshot                              |


---

## 4. Component architecture (proposed)

```text
src/
  routes/                     # as listed in §3 (public only; admin untouched)
  components/public/
    layout/      PublicShell PublicHeader PreHeaderStrip MobileNavigation
                 PublicNavItem PublicFooter FooterColumn LegalLinks
                 Breadcrumbs PageTitle SectionBand
    home/        PublicServiceHero QuickLinkGrid QuickLinkCard
                 ServiceCategoryGrid GuidanceEntryCard PracticalBlock
                 HomeNoticeStrip
    services/    ServiceCard ServiceCategoryPage ServiceDetailPage
                 ServiceBlock RequirementList ChecklistSummary FeeBlock
                 ProcessingTimeBlock SubmissionBlock FormMetadataList
                 ServiceDisclaimer
    documents/   DocumentList DocumentRequirementGroup DocumentListDetail
    news/        NewsCard NewsArchive NewsArticle EmptyNoticeState
    faq/         FaqFilter FaqAccordion FaqEmptyState
    contact/     ContactDetails ContactCard StaticLocationVisual
    wizard/      WizardShell WizardBoundary WizardProgress WizardQuestion
                 WizardChoiceGroup WizardReview WizardResult WizardFallback
                 WizardError WizardPrintView
    common/      GovernedEmptyState SourceNote PrintButton VisuallyHidden
  content/       identity.ts contact.ts categories.ts services.ts
                 documents.ts faq.ts notices.ts wizard-model.ts types.ts
  lib/public/    routes-map.ts format.ts seo.ts
  styles.css     # VZ public tokens only
```

Isolation: nothing under `src/components/public/**` or `src/content/**` imports from `src/lib/admin/**`, `src/routes/admin*`, or `public/admin/assets/**`, and vice versa.

---

## 5. Design-token reconstruction plan

`src/styles.css` gets a `@theme` block. All FACT values below are measured from the source in §2.1, §2.2 and §2.4. The right-hand column lists values that are VZ decisions or per-component assignments, not unread source values — the source audit is complete.


| Group      | FACT (measured)                                                                                                                                                                                                                                       | Still to decide (VZ decision / assignment)                                               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Colour     | primary `#0067da`, secondary `#eea200`, light `#f5f8fb`, ink `#2d3845`, body `#5d6975`, white                                                                                                                                                         | hover/active shades, dark-band overlay opacity, focus-ring colour (VZ contrast decision) |
| Type       | Mulish 15/1.8 body; Roboto 500 headings; h1–h6 scale exact; breadcrumb 16/26; accordion header 15/500; card title h5 24/30                                                                                                                            | responsive heading downscale values VZ adopts from `responsive.css`                      |
| Spacing    | section 90/70, 90/150, 90/200, bottom 60; hero overlap −105px; inner banner 335/275; detail sidebar +65 top / 40 bottom; detail main +65 top; sidebar list 30/25; accordion header 20, body 14/20, item gap 15; news card gap 35, chip −48, title −25 | which components take which spacing token                                                |
| Width      | content band 1200px, gutter 15px; detail split 30/70; article split 75/25 (`col-lg-9`/`col-lg-3`)                                                                                                                                                     | —                                                                                        |
| Radius     | 4 buttons, 5 accordion, 6 media/cards, 8 service cards, 3 chips, 32 pill                                                                                                                                                                              | per-component assignment                                                                 |
| Shadow     | `0 9px 35px 0 rgba(0,0,0,.07)`                                                                                                                                                                                                                        | hover elevation variants                                                                 |
| Border     | 1px hairlines on cards/dividers                                                                                                                                                                                                                       | exact hairline colour                                                                    |
| Breakpoint | 1400/1366/1280/1200/1199/1024/991/768/767/580/575/479/375/280                                                                                                                                                                                         | VZ-reduced set (proposed: 1280/1024/768/480/320)                                         |
| Motion     | link .5s, button .2–.3s                                                                                                                                                                                                                               | reduced-motion mapping (all → 0ms)                                                       |


Colour-contrast note: `#0067da` on white is ≈4.6:1 (AA for normal text, checked at implementation), `#5d6975` on `#f5f8fb` must be verified; any pair failing AA is darkened and recorded as a deviation. No measurement is invented.

---

## 6. Content and data plan


| Record                         | Feeds                                             | Status                                                                                               |
| ------------------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Identity (name, logo, mandate) | header, footer, hero, `/over-ons`, metadata       | **MISSING — blocking** for `/`, `/over-ons`, shell branding                                          |
| Contact                        | footer, `/contact`, service detail, wizard result | **MISSING — blocking** for `/contact`                                                                |
| Categories                     | `/diensten`, home grid                            | **MISSING — blocking** for `/diensten`                                                               |
| Services (12 blocks)           | `/diensten/$categorie/$slug`, wizard result, instructies     | **MISSING — blocking** for service routes                                                            |
| Documents / forms              | `/documentenlijsten*`, checklists                 | **MISSING — blocking** for document routes                                                           |
| FAQ                            | `/veelgestelde-vragen`                                            | **MISSING — blocking** for `/veelgestelde-vragen`                                                                    |
| Notices                        | `/nieuws*`, home strip                            | **MISSING — acceptable empty state** (dated)                                                         |
| Wizard model                   | all wizard states                                 | **PARTIAL** — model document supplied; branch→service mapping blocked by the missing service records |
| Legal texts                    | `/privacy`, `/disclaimer`                         | **MISSING — blocking** (route must not publish invented text)                                        |


Acceptable empty states: notices, optional imagery, optional per-service sub-blocks (fee, forms, processing time) when the parent service record exists. Not acceptable as empty: a whole route whose only reason to exist is the missing record — those routes stay unreleased rather than shipping a hollow page.

---

## 7. Wizard plan

- **States:** entry (`/aanvraaghulp`) → start (root question, nine branches + "Ik weet het niet zeker") → question steps → review → result; plus fallback (no exact mapping), error (invalid step id), and print view.
- **Boundary:** a persistent, non-dismissible statement on every state that this is preparation guidance, not an application, and that nothing is submitted.
- **Data:** in-memory React state only. No free text, no personal data, no upload, no storage, no cookie, no server function, no network request. Proof: no `fetch`/`createServerFn`/`localStorage`/`<input type=text>` anywhere under `components/public/wizard/**` — grep evidence per batch.
- **Navigation:** back and change links on every step; review links jump back to the exact question; no dead end; direct-URL entry to a step without prior answers redirects to start.
- **Keyboard/SR:** each choice group is a labelled radiogroup, arrow-key navigable, one tab stop; progress announced via `aria-live="polite"`; step heading receives focus on change.
- **Mobile:** single column from 320px, choice cards full width, sticky continue button, no horizontal scroll.
- **Testing:** every branch traversed to a result or truthful fallback; screenshot per state at 320 and 1280.

---

## 8. News plan

| Surface | Liviza reference | Plan |
|---|---|---|
| Home notice strip | `index.html` blog row (line 1007, `.section-lg`) | 3 cards desktop / 1 mobile, 8px radius, date + title + short summary, "Lees meer" link-btn; no image required |
| Archive `/nieuws` | `blog-grid-view.html` | same card in a 3-col grid, simple pagination if count warrants it |
| Category/filter | `blog-large-image.html` sidebar | **not planned** — no taxonomy authority; revisit only if notice records ship categories |
| Detail `/nieuws/$slug` | `blog-single-view.html` | title, publication date, status, body, source links, back link; comments, share, author promo and newsletter removed |
| States | — | published only; drafts never rendered; dated empty state "Er zijn op \<datum\> geen mededelingen" when the record set is empty |

---

## 9. Asset plan

- **Excluded outright:** all people photography, team portraits, testimonials, country flags, partner logos, trust badges, Liviza brand logo, Slider Revolution assets, icon fonts (Flaticon, Themify, FontAwesome).
- **Temporary private placeholders (development only, never handover):** neutral decorative background patterns and card aspect fillers, each visibly marked `TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER`, listed in a tracking table with path, source, and removal owner.
- **Icons:** inline SVG with accessible names, matched to Liviza optical size and accent colour.
- **Replacement tracking:** every candidate asset carries id, path, provenance, creator/tool/date, public-use evidence, editorial approval, privacy/likeness outcome, alt rationale, component, review date, status — per the register. Generated ≠ licensed ≠ approved.
- **Evidence:** desktop (1280) and mobile (375) screenshots per route showing the placeholder marking, plus a final pre-handover pass proving zero placeholders remain.
- The ZIP is never extracted into the project, committed, or served.

---

## 10. Accessibility, responsive and isolation test plans

**Keyboard/focus:** tab order per route; visible focus on every interactive element; mobile nav trap-free and Escape-closable; accordion and radiogroup keyboard maps; skip-to-content link.
**Headings/landmarks:** exactly one h1 per route; no skipped levels; one `<main>` in the public shell; `header`/`nav`/`main`/`footer` present; breadcrumb `nav` labelled in Dutch.
**Contrast:** measured pairs for body, muted, link, button, dark band, focus ring; every pair recorded with its ratio; failures darkened.
**Reduced motion:** `prefers-reduced-motion: reduce` sets all transitions to 0ms; no autoplay, no parallax, no counters.
**Responsive:** 320, 375, 480, 768, 1024, 1280, 1440 — no horizontal scroll, no clipped text, tap targets ≥44px.
**Dutch copy expansion:** nav, buttons and card titles tested with the longest Dutch labels; no truncation or two-line button collapse.
**Print:** `/aanvraaghulp/resultaat`, service detail and document lists print legibly in one column with URLs shown and chrome hidden.
**Isolation (not one curl):** (a) `/` HTML contains zero `admin/assets` references; (b) network panel on every public route lists zero `/admin/*` requests; (c) `/admin` and `/admin/auth-signin` still return 200 and render unchanged; (d) grep proves no public file imports `lib/admin` or `routes/admin`; (e) `src/styles.css` contains no admin `@import`; (f) admin screenshots before/after each batch.

---

## 11. Proposed changed-file inventory (proposed only — nothing changed)

| Batch | New | Modified |
|---|---|---|
| B1 tokens/base | `src/content/*`, `src/lib/public/*` | `src/styles.css`, `src/routes/__root.tsx` (lang nl + metadata), `src/routes/index.tsx` |
| B2 shell | `components/public/layout/*` | `__root.tsx` |
| B3 home | `components/public/home/*` | `routes/index.tsx` |
| B4 services | `routes/diensten*`, `components/public/services/*` | `lib/public/routes-map.ts` |
| B5 wizard | `routes/aanvraaghulp*`, `components/public/wizard/*` | routes-map |
| B6 docs/instructies/faq | those routes + `components/public/{documents,faq}/*` | routes-map |
| B7 news | `routes/nieuws*`, `components/public/news/*` | routes-map |
| B8 static pages | `routes/{contact,over-ons,privacy,disclaimer,overzicht}.tsx` | `__root.tsx` 404 |
| B9 SEO/GSO | `routes/sitemap[.]xml.ts`, `public/robots.txt`, `public/llms.txt` | leaf route `head()` |

**Protected — must not change:** `src/routes/admin.tsx`, `src/routes/admin/**`, `src/lib/admin/**`, `public/admin/assets/**`, `src/routeTree.gen.ts` (generated), `docs/**` unless a batch names it, `.agents/skills/**`, `AGENTS.md`, `package.json` (no new dependency).

---

## 12. Proposed Frontend MTB (all rows PLANNED / NOT RELEASED)

Executor: LOVABLE. Validator: ACT-CODEX (technical) / ACT-CHATGPT (governance). Evidence location: `07-Validation\` plus the released task's evidence path. Forbidden in every row: `/admin/*`, admin assets/styles, Cloud, Lovable Database, Supabase, backend/API/auth, GitHub, new dependencies, deployment/publication, full Liviza import, demo assets, invented official content. STOP in every row on: missing authority, protected-surface impact, requirement conflict, any data capture, or need for an unlisted path.

| ID | Lane/batch | Outcome | Inputs | Depends on | Proposed paths | Gate | Acceptance evidence | Status |
|---|---|---|---|---|---|---|---|---|
| LFB-P02 | PLAN | Measure all nine selected Liviza pages | ZIP, matrix | — | none (read-only) | — | COMPLETED in Plan Mode: per-page tables in §2.2 and §2.4 | COMPLETED (planning evidence, not an execution dependency) |
| LFB-101 | B1 | VZ tokens + base | brand decision, §5 | — | `styles.css`, `content/*`, `__root.tsx` | brand release | token list, contrast table, isolation proof | PLANNED / NOT RELEASED |
| LFB-102 | B2 | Public shell | identity, contact, routes | LFB-101 | `components/public/layout/*` | identity release | screenshots, keyboard walk, no admin asset | PLANNED / NOT RELEASED |
| LFB-103 | B3 | Home | identity, categories, notices | LFB-102 | `routes/index.tsx`, `home/*` | content release | 3-viewport screenshots, axe | PLANNED / NOT RELEASED |
| LFB-104 | B4 | Services tree | service records | LFB-103 | `routes/diensten*`, `services/*` | service-record release | block-order proof, 404 case | PLANNED / NOT RELEASED |
| LFB-105 | B5 | Wizard | decision model, services | LFB-104 | `routes/aanvraaghulp*`, `wizard/*` | wizard release | branch traversal, no-data grep, SR log | PLANNED / NOT RELEASED |
| LFB-106 | B6 | Documents, instructies, FAQ | checklist + FAQ records | LFB-104 | those routes/components | content release | no-download grep, accordion keyboard | PLANNED / NOT RELEASED |
| LFB-107 | B7 | News | notice authority | LFB-102 | `routes/nieuws*`, `news/*` | publication authority | both states screenshotted | PLANNED / NOT RELEASED |
| LFB-108 | B8 | Static + legal + 404 | contact, legal, institutional text | LFB-102 | those routes | legal release | screenshots, no-input grep | PLANNED / NOT RELEASED |
| LFB-109 | B9 | SEO/GSO + a11y sweep | SEO guide | all | sitemap, robots, llms, heads | final gate | per-route metadata table, axe report | PLANNED / NOT RELEASED |
| LFB-110 | QA | Placeholder removal + handover check | asset register | all | asset paths only | handover gate | zero-placeholder proof | PLANNED / NOT RELEASED |
| LFB-111 | GOV | Governed document retention (see §12.1) | the exact 13 approved Markdown inputs | separate Delroy release **and** a supported, safe upload method | `docs/vz-juspol-gen/governance-inputs/` only | Delroy retention release | filename + SHA-256 + byte-size manifest, byte-identical verification, README present | PLANNED / NOT RELEASED — currently BLOCKED (no verified safe upload path) |

### 12.1 LFB-111 — governed document retention (PLANNED / NOT RELEASED, currently BLOCKED)

Purpose: durable, private retention of the governed inputs. The current uploaded copies live in a temporary session upload area and are **not** durable storage; nothing is retained today.

Preconditions (all required, none met): a separate explicit Delroy release for this task, and a supported upload method that can place the files in the repository without exposing them publicly. Agent execution is **not** coupled to the upload — the files being uploaded does not authorise this task.

Scope when released:
- Store exactly the 13 approved Markdown inputs — no more, no fewer — under a private, isolated documentation location such as `docs/vz-juspol-gen/governance-inputs/`.
- Preserve contents **byte-identically**; no reformatting, renaming, translation, summarising or normalisation.
- Record for each file: exact filename, SHA-256, byte size, and the date of retention, in a manifest stored alongside them.
- Add a `README.md` in that directory stating that these are governed reference inputs, that they are not application content, and stating the Source-of-Truth precedence order that applies to them.

Prohibited in this task: any application import of these files; any public serving, route, sitemap, `llms.txt` or asset exposure; storing the Liviza ZIP or any part of the purchased package; storing purchase evidence, licence keys, invoices or personal data; overwriting any existing file; any coupling of agent execution to the act of uploading.

Blocked status: as planned today, there is no verified safe method available to place these files into the repository under the current constraints. This task therefore stays **BLOCKED** and must not be attempted until both preconditions are satisfied and the method is confirmed safe.

---


## 13. Risk and decisions

**Content blockers:** identity, contact, categories, services (12 blocks), documents/forms, FAQ, legal texts, branch→service mapping. Notices may launch as a dated empty state.

**Technical risks:** (1) reconstructing Bootstrap grid behaviour in Tailwind v4 can shift gutters — mitigated by pinning the 1200px band and 15px gutter as tokens; (2) `#0067da` may fail AA in some placements — measured and darkened where needed; (3) Liviza's 105px hero overlap is fragile below 768px — a documented deviation with a stacked fallback; (4) print output for the wizard result needs a dedicated stylesheet; (5) route-file/`createFileRoute` mismatches break the build — every link and its route file land in the same batch.

**STOP conditions:** any request implying data capture, submission, account, upload, analytics, backend, Cloud, GitHub, publication, `/admin/*` change, a new dependency, or content not traceable to a governed record.

**FACT:** §2.1 measurements, the 13-document inventory, the current route set, admin isolation mechanics.
**INFERENCE:** section classifications in §2.2 beyond the measured geometry; the proposed batch order; the reduced breakpoint set.
**OPEN DECISION:** VZ brand colour — whether `#0067da` is retained or replaced by an approved institutional colour; whether `/nieuws` launches as a dated empty state; whether Mulish/Roboto are approved for public use by VZ (see typography note below).

**One weak assumption:** that Liviza's commercial visual language, once stripped of sales patterns, still reads as an appropriate public-service register. If Delroy judges it too commercial, §2 needs rework before B1.
**One missing constraint (typography):** FACT — the purchased Liviza source technically references Mulish and Roboto (Google Fonts, loaded by URL reference, not shipped as files in the template's own `fonts/` directory) and technically bundles the icon fonts Flaticon, Themify, FontAwesome and `pbminfotech-base-icons` as font files inside the package. Technical inclusion or reference is not the same as public-use approval: no VZ decision record exists that approves these families for public deployment, states the licence basis relied on (Google Fonts terms, self-hosting versus CDN, ThemeForest coverage for the bundled icon fonts), or rules on their accessibility. This is an unresolved approval, not an evidenced absence of a licence — no claim is made that a licence does not exist. Icon fonts are in any case planned out (§2.6, replaced by inline SVG), so the open item concerns the two text families only.
**One material failure risk:** building service and wizard routes against placeholder records, then having to rewrite block structure when the real service model arrives; mitigated by holding LFB-104/105 until the service records exist.

---

## 14. Plan-mode integrity

Commit history: `f56782e` (Remixed with public template) → `1602291` → `b590d02` (Update plan). Both commits after `f56782e` touch **only `.lovable/plan.md`** (`git show --stat` reports `1 file changed` on each), and `git status` is clean. Those commits are plan-authoring artefacts — `.lovable/plan.md` is the one file Plan Mode may write. No application file, no `/admin/*` path, no dependency and no configuration was modified. This v0.3 revises `.lovable/plan.md` only: the archive was read in place with `unzip -p`, never extracted, never copied into the project, never committed; an attempted extraction to a temporary path was refused by Plan Mode and abandoned.

---

## Verdict

**PLAN COMPLETE WITH CONTENT BLOCKERS**

Stopping here. No implementation, no execution approval requested; every batch in §12 requires a separate explicit release.
