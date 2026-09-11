# LFB-103D POLISH 001 — Consolidated template-pattern polish

Actor: LOVABLE (public frontend/UI executor only)
Mode: Build Mode, one consolidated batch
Baseline: project ddc7ea4d-6274-4bc2-a1f9-dcede1e5ca68, commit 2a6c29316af9ea0b8b783d03b7d33f3dc4bcc97a
Governing documents: LOVABLE-LFB-103D-VISUAL-POLISH-CONTRACT-DRAFT-001.md,
LIVIZA-ROUTE-AND-PATTERN-MAPPING-001.md, CODEX-LFB-103D-VISUAL-POLISH-AUDIT-001.md

## 1. Corrections executed (template pattern first)

| # | Contract item | Liviza pattern used | Result |
|---|---|---|---|
| 1 | Quick-card contrast on the active homepage card | `index.html` `pbminfotech-ihbox-style-3` | Title link/icon forced to Liviza white on coloured cards; white-variant card keeps blackish title. Rule lives in the isolated polish stylesheet, no inline styles. |
| 2 | Equalise homepage service-carousel cards | `index.html` service carousel | `vz-equal-slides` stretch rules; measured slide heights all 389 px, type scale and content unchanged. |
| 3 | Stakeholder section as carousel | `countries.html` `pbminfotech-portfoliobox-style-2` inside the Liviza swiper | 6 records, `data-columns="4"` → 4 desktop / 2 tablet / 1 mobile per template script mapping; autoplay off, dots on, swipe + keyboard via Swiper; measured heights all 396 px. |
| 4 | `/documentenlijsten` category tabs | Liviza service-box cards + isolated tab chrome | Six tabs (Verblijf, Vestiging, Naturalisatie, Ingezetenschap, Asiel, Overig), ARIA tablist, arrow/Home/End keys; 17 PDF links present, filenames and bytes untouched. |
| 5 | Service detail rebuild | `visa-details.html` | Detail hierarchy, three governed fact cards (`ihbox-style-2`), condition checklist, sidebar widgets (gegevens, official PDF panel, related services, contact), preparation callout on the `assessment-one` pattern. Only governed facts render; absent fees/legal bases are omitted. |
| 6 | Contact hours / visit | `contacts.html` info-box pattern | Address, phone, e-mail, opening hours, visit and preparation as six equal `ihbox-style-2` cards; no map embed, no form. |
| 7 | `/instanties` | `countries.html` card pattern | Generic service-card grid replaced with portfolio-box-style-2 cards. |
| 8 | `/privacy`, `/disclaimer` | `blog-single-view.html` | Article column (`col-lg-9`, `blog-classic`) plus sidebar (`col-lg-3`, widgets); comments, sharing, tags, search, author box excluded. |
| 9 | FAQ / news / news detail empty states | `faq.html` accordion, `blog-grid-view.html`, `blog-single-view.html` | Preserved; news detail gained the mapped sidebar column. |
| 10 | Inline presentation styles | — | All removed from the public templates (`font-size:13px`, `margin-top:24px`, brand/hero/footer inline styles) and replaced by classes in the isolated polish stylesheet. The single remaining inline style is the source-faithful Liviza hero `background-image`, which is inline in the purchased source itself. |
| 11 | One static hero | — | Slider not re-enabled; single static composition retained. |
| 12 | Aanvraaghulp | — | Referenced only as guidance/preparation copy; no route, no form, no submission. |

## 2. Evidence

- Screenshots: `screenshots/<route>-<width>.png`, 13 routes × 6 widths (1440, 1280, 992, 768, 375, 320) = 78 files.
- Automated run: 78 route/width measurements. No console errors (other than the pre-existing hydration attribute warning), no HTTP ≥ 400 responses, no missing assets, no forbidden template values (`Liviza`, `Lorem`, `Subscribe`, demo phone, `*.html` demo links) in rendered text.
- Keyboard: document tabs — 6 tabs, ArrowRight moves selection and focus to `Vestiging`, exactly one panel visible.
- Carousels: service 15 slides / stakeholder 6 slides, equal heights, initialised, autoplay off.
- Typecheck (`tsgo --noEmit`) and production build both pass.
- PDFs: 17 files, 8 848 320 bytes total; SHA-256 set identical to the LFB-103D verification, `%PDF-` header on every file, sample download HTTP 200 / 215 886 bytes. See `pdf-verification.md`.

### Known, pre-existing (not introduced by this batch)

- Document `scrollWidth` exceeds `clientWidth` by 30 px at 1440 on every route, including routes untouched by this batch, and by 5 px at 320 on the home route. This originates in the ported Liviza header `container-fluid` chrome and predates the polish batch.
- React hydration attribute warning on template-backed routes (`dangerouslySetInnerHTML` + script rehydration), carried over from LFB-103A.
- Card imagery is still Liviza demo material, registered as TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER (`image-register.md`). No image was generated or replaced in this batch, per the release.

## 3. Isolation

No change to `/admin/*`, `src/lib/admin/**`, `public/admin/**`, backend, API, auth, database, Cloud, Supabase, secrets, dependencies, GitHub, deployment, publication, DNS or Hostinger. No package added or removed; no configuration file touched. Changed-file inventory in `MANIFEST.md`.

## 4. Verdict

LFB-103D POLISH 001 COMPLETE — READY FOR VISUAL REVIEW
