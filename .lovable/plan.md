# VZ Juspol Gen — Public Frontend Plan 001 (Plan Mode only)

Planning output only. No files change, no dependency is added, no Cloud/Database/backend/auth/GitHub/deployment is involved. Liviza is the approved visual reference; selected pages and sections are reconstructed, never imported.

## 1. Verified current state

Confirmed by reading the project and the supplied documents:

- Routes present today: `/` (placeholder), `/admin` (layout), `/admin/`, `/admin/auth-signin`. No public portal routes exist yet.
- `src/styles.css` is the placeholder Tailwind v4 + shadcn baseline; admin CSS is isolated via `src/routes/admin.tsx` and `public/admin/assets/**`.
- `src/routes/__root.tsx` still carries the default "Lovable App" metadata and `lang="en"`.
- The Liviza ZIP and all twelve governance documents are present as uploads; the selection matrix, component mapping, IA map, wizard model and asset register have been read.
- No governed content records (identity, contact, services, documents, fees, FAQ, notices) exist anywhere in the project.

## 2. Baseline preparation (first executed batch, when released)

Per the remix rule, before any public page is built:

1. Replace `src/routes/index.tsx` with the VZ home route.
2. Reduce `src/styles.css` to `@import "tailwindcss";` plus the approved VZ token block (no Liviza CSS, no Bootstrap, no icon fonts).
3. Set `lang="nl"` and real default metadata in `src/routes/__root.tsx`.
4. Add a typed, empty-by-default content-record layer under `src/content/` (identity, contact, services, categories, documents, faq, notices, wizard model). Every public block reads from it; a missing record renders a governed empty state, never invented text.

`/admin/*`, `src/lib/admin/**` and `public/admin/assets/**` are never touched.

## 3. Route set (mirrors the approved IA map)

`/`, `/diensten`, `/diensten/$categorie`, `/diensten/$slug`, `/aanvraaghulp`, `/aanvraaghulp/$stap` (start, question, review, result), `/documentenlijsten`, `/documentenlijsten/$id`, `/instructies`, `/faq`, `/nieuws`, `/nieuws/$slug`, `/contact`, `/over-ons`, `/privacy`, `/disclaimer`, `/overzicht`, plus a custom Dutch 404.

Each leaf route gets its own `head()` with unique Dutch title, description and OG text. Every referenced route file is created in the same batch as the link that points to it.

## 4. Build batches (each needs its own release)

| Batch | Scope | Liviza reference |
|---|---|---|
| B1 | Tokens, `styles.css`, root metadata, content-record layer | `index.html` rhythm and spacing only |
| B2 | `PublicHeader`, `MobileNavigation`, `PublicFooter`, `Breadcrumbs`, `PageTitle` | header/footer REBUILT, not copied |
| B3 | `/` home: hero, quick links, static service grid, guidance entry card, notices block | `index.html` ADAPT sections only |
| B4 | `/diensten`, `/diensten/$categorie`, `/diensten/$slug` with the twelve required service blocks | `our-services.html`, `visa.html`, `visa-details.html` |
| B5 | `/aanvraaghulp` wizard shell, question, review, result, print view | `#assessment-cta` REBUILD |
| B6 | `/documentenlijsten`(+detail), `/instructies`, `/faq` | `faq.html` accordion rhythm |
| B7 | `/nieuws`, `/nieuws/$slug`, dated empty state | `blog-grid-view.html`, `blog-single-view.html` |
| B8 | `/contact`, `/over-ons`, `/privacy`, `/disclaimer`, `/overzicht`, 404 | `contacts.html`, `about-us.html` (composition only) |
| B9 | SEO/GSO pass: canonicals, sitemap, `robots.txt`, `llms.txt`, JSON-LD, accessibility sweep | — |

Rejected throughout: coaching, countries, team, testimonials, counters, newsletter, comments, sharing, lead capture, contact forms, map runtimes, downloads, analytics or any third-party tag.

## 5. Technical notes

- TanStack Start file routes, React 19, Tailwind v4 tokens in `src/styles.css` under `@theme`. Radix/shadcn primitives already in the project are used for the accordion and disclosure patterns; no new dependency is proposed.
- Bootstrap, jQuery, Swiper, Slider Revolution, AOS, Magnific Popup, PHP and PHPMailer are inspected only and rebuilt as plain React and CSS.
- The wizard is client-state only: labelled radio groups, keyboard operable, announced progress, back/change links, no free text, no personal data, no network call, no storage beyond in-memory session state.
- Content is static typed data; TanStack Query stays unused until a separately approved data contract exists.
- Liviza demo images are not shipped. Any temporary in-development image is marked `TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER`; the ZIP is never committed or exposed publicly.
- Verification per batch: `curl -s http://localhost:8080/ | grep -c admin/assets` → 0, `/admin` still 200, build log clean, keyboard and 320px checks, screenshots.

## 6. Content blockers (execution cannot fully complete without these)

1. Institutional identity: official department name, Dutch short name, logo file and usage approval.
2. Contact record: address, hours, phone, e-mail, location description — one governed source.
3. Service catalogue: category and service records with official names, legal basis, steps, requirements, fees, processing times.
4. Document lists and form metadata.
5. Approved FAQ answers with per-answer provenance.
6. News and notices: publication authority plus initial items (a dated empty state is acceptable at launch).
7. Approved `Privacy`, `Disclaimer` and `Over ons` texts.
8. Wizard decision model final mapping from branch to exact service.
9. Image provenance and four-part approval for any non-text asset.

Until each is supplied, the corresponding block ships as a governed empty state — no value is invented.

## 7. Verdict

**PLAN COMPLETE WITH CONTENT BLOCKERS**

No implementation follows this plan. Each batch in section 4 requires a separate explicit release.
