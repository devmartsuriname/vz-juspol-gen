# Liviza 1:1 Homepage Source-Port — Execution Plan (LFB-103H)

Planning only. Nothing is implemented in this turn. One release from Delroy is
required before any file is written.

Approach change accepted: instead of micro-batch visual reconstruction, the
homepage is ported as one page-level source port. Selected Liviza markup, class
relationships and CSS declarations are reused directly and converted to JSX;
they are not re-invented as new Tailwind components.

---

## 1. Source evidence (verified this turn, ZIP read in place, never extracted)

Package: `themeforest-xo9DItQc-liviza-immigration-consulting-html-template.zip`
Root used: `Liviza HTML Package/Liviza HTML Files/`

Homepage: `index.html` (57,638 bytes). Confirmed section order and classes:

| # | Source lines (approx) | Section / classes | Decision |
|---|---|---|---|
| 1 | 43–92 | `.pbmit-pre-header-content`, `.pbmit-table`, `.pbmit-social-links-wrapper`, `.pbmit-header-button` | KEEP geometry, swap content |
| 2 | 94–192 | `site-header header-style-1`, `.pbmit-menu-wrap`, `.pbmit-mobile-menu-bg`, `.pbmit-right-side`, `.pbmit-header-phone`, `.pbmit-header-search-btn` | KEEP; drop search button |
| 3 | 193–274 | `.pbmit-slider-area.pbmit-slider-one`, 3× `.pbmit-slider-item` + `.pbmit-slider-bg` + `.pbmit-slider-content` | KEEP slide A only, static |
| 4 | 275–377 | `section.pbmit-bg-color-light.iconbox-section-one` (overlap row) | KEEP, adapt to VZ quick links |
| 5 | 378–425 | `section.section-md` two-column about (`images/homepage-1/img-01.jpg`) | KEEP geometry |
| 6 | 426–672 | `section.section-lgx.service-one-bg.pbmit-bg-color-blackish`, 9× `.pbmit-ihbox` in swiper | KEEP; swiper → static grid |
| 7 | 673–695 | assessment CTA panel | KEEP → Aanvraaghulp guidance |
| 8 | 696–806 | portfolio/country section | REMOVE |
| 9 | 807–958 | `section.testimonial-one-bg` | REMOVE |
| 10 | 959–1050 | `section.counter-one`, `.pbmit-fidbox-style-4`, `.pbmit-circle-outer` | REMOVE |
| 11 | ~1007+ | `section.section-lg` blog, 3× `.pbmit-blogbox` | KEEP → nieuws preview |
| 12 | 1177–1330 | `footer.footer.site-footer`: `.pbmit-footer-widget-area-top` (newsletter/boxes), `.pbmit-footer-widget-area` (4 columns), `.pbmit-footer-bottom` | KEEP structure; drop newsletter form + social |

CSS files referenced by `index.html`, in order: `bootstrap.min.css`,
`fontawesome.css`, `flaticon.css`, `pbminfotech-base-icons.css`,
`swiper.min.css`, `magnific-popup.css`, `shortcode.css`, `base.css`,
`style.css`, `responsive.css`.

Verified background images declared in `css/style.css` for the selected
sections: `homepage-1/bg/border-pattarn.png` (icon-box band),
`homepage-1/bg/bg-pattarn.png` + `bg-pattarn-left.png` (dark services band),
`homepage-1/bg/img-01.jpg`, `homepage-1/bg/img-02.jpg`, `homepage-1/bg/map.png`.

Fonts: `css/base.css` lines 15–17 `@import` Google Fonts for **Mulish**,
**Roboto**, **Oswald**. Tokens: `--pbmit-body-typography-font-family:"Mulish"`,
`--pbmit-heading-typography-font-family:"Roboto"`. No font binaries for
Mulish/Roboto ship in the package — only icon fonts (FontAwesome, Themify,
Flaticon, pbminfotech).

## 2. Asset manifest (selected sections only)

| Source file | Destination | Status |
|---|---|---|
| `images/banner-slider-img/slider-01-a.jpg` | `public/vz-public/liviza/hero/slider-01-a.jpg` | TEMPORARY PLACEHOLDER — replace before handover |
| `images/homepage-1/bg/border-pattarn.png` | `public/vz-public/liviza/bg/border-pattarn.png` | Reusable (abstract pattern) |
| `images/homepage-1/bg/bg-pattarn.png` | `public/vz-public/liviza/bg/bg-pattarn.png` | Reusable |
| `images/homepage-1/bg/bg-pattarn-left.png` | `public/vz-public/liviza/bg/bg-pattarn-left.png` | Reusable |
| `images/homepage-1/img-01.jpg` | `public/vz-public/liviza/about/img-01.jpg` | TEMPORARY PLACEHOLDER |
| `images/homepage-1/img-02.jpg` | only if the CTA panel uses it | TEMPORARY PLACEHOLDER |
| `images/homepage-1/blog/bolg-0{1,2,3}.jpg` | `public/vz-public/liviza/news/` | TEMPORARY PLACEHOLDER; likely unused if news is empty |
| `fonts/pbminfotech-base-icons.*`, `flaticon.*` | `public/vz-public/liviza/fonts/` | Reusable, needed by icon classes |
| `images/logo-white.png`, testimonial/portfolio/`map.png` | — | REJECTED (Liviza brand / removed sections) |

Every temporary image is tracked in the evidence register and rendered with a
`TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER` note in the report.
Nothing else from the ZIP is copied. The ZIP itself is never committed.

## 3. CSS extraction and scoping

New file `src/styles/vz-public/liviza-source.css`, imported once from
`src/styles.css` (local `@import` at top of file, allowed by Lightning CSS).

Extraction rules:
1. Copy verbatim only the declarations needed by the selected sections from
   `base.css`, `shortcode.css`, `style.css`, `responsive.css`.
2. Wrap the whole file in `.vz-public { ... }` nesting so every rule is scoped;
   `:root` custom properties become `.vz-public { --pbmit-… }`.
3. Bootstrap: not imported. Only the grid declarations actually used
   (`.container`, `.container-fluid`, `.row`, `.col-*` for the used spans) are
   hand-translated into the same scoped file, matching Bootstrap 5 values
   (1320/1140/960/720/540 max-widths, 12-column flex, `--bs-gutter-x: 1.5rem`).
4. Swiper, magnific-popup, AOS, Slider Revolution: no CSS, no JS.
5. Icon fonts: `@font-face` rewritten to `/vz-public/liviza/fonts/…`.

Leakage proof: `curl /admin | grep -c vz-public` → 0, and every selector in
`liviza-source.css` verified to start with `.vz-public`. Admin diff must be
zero lines.

## 4. Component and route mapping

New: `src/components/public/home/` —
`HeroStatic.tsx` (§3), `IconBoxRow.tsx` (§4), `AboutIntro.tsx` (§5),
`ServicesBand.tsx` (§6), `AanvraaghulpCta.tsx` (§7), `NewsPreview.tsx` (§11).

Shell replaced in place under `src/components/public/layout/`:
`PreHeaderStrip.tsx`, `PublicHeader.tsx`, `PublicNavItem.tsx`,
`MobileNavigation.tsx`, `PublicFooter.tsx`, `FooterColumn.tsx`,
`LegalLinks.tsx` are rewritten to the Liviza source markup/classes.
`PublicShell.tsx`, `Breadcrumbs.tsx`, `PageTitle.tsx`, `index.ts` are kept.

Route: `src/routes/index.tsx` composes the sections inside `PublicShell`.
No new route files, so no route-tree change is expected.

## 5. Fonts

Liviza loads Mulish and Roboto from Google Fonts by `@import` — technical
reference only, no licence evidence in the package (both are Open Font License
families, but public-use approval is Delroy's call).

Plan: add `<link rel="preconnect">` + Google Fonts `<link>` for Mulish and
Roboto in `src/routes/__root.tsx` (the stack forbids remote `@import` in CSS).
Oswald is not used by the selected sections and is dropped.

**PRE-EXECUTION GATE F1:** Delroy confirms external Google Fonts requests are
acceptable. If not, the alternative is lawful self-hosting under
`public/vz-public/liviza/fonts/` (OFL, attribution kept), which requires a
separate approval to add font binaries. Execution does not start with a silent
system-font fallback.

## 6. Parity verification

Reference render: the source `index.html` is served read-only from a temp
sandbox directory (never inside the project) and screenshotted with Playwright
at 1440, 1280, 992, 768 and 375. The ported route is screenshotted at the same
viewports. Side-by-side comparison per section on: section order, section
heights, container width, card dimensions and overlap offsets, type sizes and
weights, colour relationships, spacing rhythm, breakpoint behaviour.
Every deviation is listed in the report with reason (content removal,
accessibility, no-runtime constraint).

## 7. Content-swap matrix

| Source demo content | VZ governed field | Status |
|---|---|---|
| Pre-header phone/e-mail | Contact candidate `+597 427-197` / `info@vz.juspol.sr` | PENDING RELEASE — omitted until released |
| Pre-header social icons + CTA button | — | REJECTED |
| Header logo `logo-white.png` | `Vreemdelingenzaken` wordmark + sub-line `Ministerie van Justitie en Veiligheid` | PENDING RELEASE — neutral text label used |
| Header phone block | Contact candidate | PENDING RELEASE |
| Hero headline/sub/button | Governed VZ purpose text | PENDING RELEASE — neutral Dutch preparation text |
| Icon-box row (3 cards) | Diensten / Aanvraaghulp / Documentenlijsten quick links | Links only when route exists |
| About text + image | Governed VZ purpose | PENDING RELEASE; image temporary |
| Services band (9 items) | Governed dienstcategorieën | BLOCKED — content set empty; governed empty state |
| Assessment CTA | Aanvraaghulp guidance wording, never "aanvraag indienen" | PENDING RELEASE |
| Blog cards (3) | Nieuws en mededelingen preview | Empty state until notices exist |
| Footer newsletter / social / address / hours | Contact candidate block | PENDING RELEASE; newsletter+social REJECTED |
| Footer copyright | Neutral VZ line | Allowed |

Until each row is released, the section renders a governed empty state or the
element is omitted — never invented text.

## 8. Files created / modified

Create:
- `src/styles/vz-public/liviza-source.css`
- `src/components/public/home/{HeroStatic,IconBoxRow,AboutIntro,ServicesBand,AanvraaghulpCta,NewsPreview}.tsx`
- `src/components/public/home/index.ts`
- `public/vz-public/liviza/**` (only the manifest files in §2)
- `docs/vz-juspol-gen/execution-evidence/LFB-103H/{REPORT.md,MANIFEST.md}`

Modify:
- `src/styles.css` (single scoped import; existing `vz-*` tokens kept)
- `src/routes/__root.tsx` (font links only)
- `src/routes/index.tsx`
- `src/components/public/layout/{PreHeaderStrip,PublicHeader,PublicNavItem,MobileNavigation,PublicFooter,FooterColumn,LegalLinks}.tsx`
- `src/lib/public/routes-map.ts` (only if a nav grouping is needed)

Untouched: everything under `/admin`, `src/lib/admin/**`,
`public/admin/**`, `src/content/**` (read-only), packages, lockfiles.

## 9. LFB-101 / LFB-102 disposition

| Item | Disposition |
|---|---|
| `src/styles.css` VZ tokens (LFB-101) | KEEP — still used by non-ported pages |
| `src/content/**`, `src/lib/public/{content,format,seo}.ts` | KEEP unchanged |
| `routes-map.ts` availability model | KEEP |
| `PublicShell`, `Breadcrumbs`, `PageTitle` | KEEP |
| Header/footer components (LFB-102) | REPLACED by source port |
| LFB-102 evidence docs | KEEP; superseded note added |
| Home empty-state body (LFB-101) | REPLACED by ported sections |

## 10. Execution batch, acceptance and stop conditions

One build turn for the full homepage, then at most one polish round if material
parity defects remain. Cosmetic nits are logged, not re-run.

Acceptance: section order matches §1; scoped CSS with zero admin leakage;
no Bootstrap/jQuery/Swiper/Slider Revolution runtime; no new dependency;
typecheck and build clean; single `<h1>`; keyboard-operable menu with Escape
and focus return; visible focus; no broken exposed link; no invented content;
screenshots at 1440/1280/992/768/375 with side-by-side source comparison;
deviation list; admin diff zero; evidence written to the LFB-103H path.

STOP if: font gate F1 unresolved; an unapproved path is needed; a dependency
would be required; admin is touched; or governed content is missing in a way
that cannot be handled by a truthful empty state.

## 11. Untouched systems

`/admin/*`, Lovable Cloud, Database, Supabase, backend, API, authentication,
GitHub, deployment and publication remain untouched. No analytics, no forms
that transmit, no third-party tags beyond the font gate in §5.

---

**Verdict: HOMEPAGE SOURCE-PORT PLAN READY FOR DELROY REVIEW**

Open pre-execution gates: F1 (font loading method), and the content-swap
release for the PENDING rows in §7.
