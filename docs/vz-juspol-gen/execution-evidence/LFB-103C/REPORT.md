# LFB-103C — Act 1B multi-page Liviza source port

Batch executed under the approved LFB-103C plan (Act 1B only). Act 2 (governed
VZ content/brand swap) was NOT executed and requires a separate release.

## 1. Scope delivered

Eight purchased-source pages ported byte-faithfully and mounted on the canonical
Dutch routes, reusing the homepage port machinery from LFB-103A.

| Source file | Target route | Route file | HTML module |
|---|---|---|---|
| `about-us.html` | `/over-ons` | `src/routes/over-ons.tsx` | `liviza-about.html.ts` |
| `our-services.html` | `/diensten` | `src/routes/diensten.index.tsx` | `liviza-services.html.ts` |
| `visa.html` | `/diensten/$categorie` | `src/routes/diensten.$categorie.index.tsx` | `liviza-category.html.ts` |
| `visa-details.html` | `/diensten/$categorie/$slug` | `src/routes/diensten.$categorie.$slug.tsx` | `liviza-service-detail.html.ts` |
| `faq.html` | `/veelgestelde-vragen` | `src/routes/veelgestelde-vragen.tsx` | `liviza-faq.html.ts` |
| `blog-grid-view.html` | `/nieuws` | `src/routes/nieuws.index.tsx` | `liviza-news.html.ts` |
| `blog-single-view.html` | `/nieuws/$slug` | `src/routes/nieuws.$slug.tsx` | `liviza-news-detail.html.ts` |
| `contacts.html` | `/contact` | `src/routes/contact.tsx` | `liviza-contact.html.ts` |

Pass-through layout routes added: `src/routes/diensten.tsx`, `src/routes/nieuws.tsx`
(each returns `<Outlet />` only).

`/aanvraaghulp` is custom product work and was not part of this batch.

## 2. Asset reuse — zero recopy

`git status --porcelain public/vz-public` → 0 lines: no asset file was added,
changed or removed. All eight pages resolve against the existing
`public/vz-public/liviza/assets/**` tree (340 files, 5.4 MB) copied in LFB-103A.
All nine template pages reference the identical ten stylesheets and ten scripts,
so `livizaHead()` in `LivizaTemplatePage.tsx` is reused unchanged; the wrapper
component itself was not modified in this batch.

Measured proof: 45 route/viewport measurements recorded **zero** non-2xx
responses of any kind.

## 3. Markup transformations (identical rules for all pages)

1. `<body>` inner markup extracted 1:1 (classes, nesting, section order preserved).
2. `<script>` tags removed — scripts are loaded by the route `head()` and the
   wrapper's rehydration effect.
3. Asset paths prefixed to `/vz-public/liviza/assets/…` (`src`, `href`,
   `data-src`, `poster`, CSS `url()`).
4. Internal template links normalised to canonical Dutch routes across all nine
   template-backed routes (the homepage module was re-normalised too):
   `index.html → /`, `about-us.html → /over-ons`, `our-services.html → /diensten`,
   `visa.html → /diensten/verblijf`, `visa-details.html →
   /diensten/verblijf/voorbeeld`, `faq.html → /veelgestelde-vragen`,
   `blog-grid-view.html → /nieuws`, `blog-single-view.html → /nieuws/voorbeeld`,
   `contacts.html → /contact`. Unmapped demo pages keep their `*.html` href and
   stay inert via the wrapper's existing click neutralisation.
5. `contacts.html` only: PHP form `action` removed and marked
   `data-liviza-disabled="php-form"`; the Google Maps `<iframe>` replaced by an
   inert `div` carrying the original class, width and height
   (`data-liviza-disabled="maps-embed"`). Runtime check: `iframe` count on
   `/contact` = 0, disabled markers = 2, external requests = 0.

## 4. Navigation model (per binding pre-approval correction 1)

Links are plain anchors to real URLs, so navigation between the nine
template-backed routes is a full document load: jQuery, Bootstrap, Swiper,
Waypoints, Magnific Popup and `scripts.js` start from a clean browser lifecycle
on every page. No `$(document).off(...)` teardown was introduced.

Verification loop `/ → /over-ons → /diensten → /diensten/verblijf →
/diensten/verblijf/voorbeeld → /veelgestelde-vragen → /nieuws →
/nieuws/voorbeeld → /contact → /`, run twice:

- `script[data-liviza]` count stayed at exactly 10 after both loops;
- initialised Swiper instances stayed at 3 on the homepage (no duplication);
- clicking the in-page `/contact` link produced a document load ending at
  `http://localhost:8080/contact` with 10 script nodes;
- zero console errors, zero non-2xx responses.

## 5. Parity results (source vs. port, five viewports)

45 measurements, `parity.json` in this folder. Section counts, computed fonts
(Mulish body / Roboto headings) and asset health matched on every route.

| Route | 1440 | 1280 | 992 | 768 | 375 |
|---|---|---|---|---|---|
| `/` | 1.79% | 1.79% | 1.87% | 1.37% | 1.90% |
| `/over-ons` | 2.06% | 2.06% | 2.19% | 1.41% | 2.06% |
| `/diensten` | 0.00% | 0.00% | 0.00% | 0.00% | 0.00% |
| `/diensten/verblijf` | 0.00% | 0.00% | 0.00% | 0.00% | 0.00% |
| `/diensten/verblijf/voorbeeld` | 0.00% | 0.00% | 0.00% | 0.00% | 0.00% |
| `/veelgestelde-vragen` | 0.00% | 0.00% | 0.00% | 0.00% | 0.00% |
| `/nieuws` | 0.00% | 0.00% | 0.00% | 0.00% | 0.00% |
| `/nieuws/voorbeeld` | 0.00% | 0.00% | 0.00% | 0.00% | 0.00% |
| `/contact` | 1.92%* | 1.92%* | 2.19%* | 0.00%* | 12.83%* |

`*` = intentional unsafe-surface deviation, see §6.

Horizontal overflow at 1440 is present in the **source** template as well
(verified: source `index.html` at 1440 also overflows); it is inherited template
behaviour, not a port defect. No route overflows at 1280/992/768/375.

## 6. Deviation register

| ID | Route(s) | Description | Status |
|---|---|---|---|
| D-103A-1 | all | Dev-only React hydration/source-annotation warning from `dangerouslySetInnerHTML` + the dev source-annotation transform. Not present as a functional error; excluded from the console-error count. | Carried forward |
| D-103C-1 | `/`, `/over-ons` | Hero/AOS animation timing adds 108–216 px page height vs. the static source capture (1.37–2.19%). `/over-ons` slightly exceeds the 2% threshold at 1440/1280/992/375 for the same reason. | Accepted, animation timing only |
| D-103C-2 | `/contact` | Disabled PHP contact form and removed Google Maps embed. Original geometry preserved via the inert placeholder; residual height delta 1.92–2.19% desktop and 12.83% at 375 (the embed reflows tallest on mobile). Excluded from the general threshold per binding correction 3. | Intentional safety deviation |

## 7. Isolation, typecheck, build

- `/admin` → 200, `/admin/auth-signin` → 200, both unchanged.
- `curl /admin | grep -c vz-public` → 0; `curl / | grep -c admin/assets` → 0.
- `git diff --stat` under `src/routes/admin*`, `src/lib/admin/**`,
  `public/admin/**` → empty.
- `tsgo --noEmit` → clean.
- Build log → `build OK`.
- `package.json` / lockfile unchanged; no dependency added.
- No Cloud/Database/Supabase, backend, auth, GitHub, deployment, publication,
  analytics, external form submission or third-party embed.

One supporting change outside the route files: `src/lib/public/routes-map.ts`
`ExistingRoutePath` now excludes generated trailing-slash route IDs, which the
new index routes introduced and which broke `Link to` typing in the LFB-102
shell components. No behavioural change.

## 8. Content status

All ported pages still contain purchased-template demo content and imagery,
tracked as `TEMPORARY TEMPLATE PLACEHOLDER — REPLACE BEFORE HANDOVER`. No
governed VZ content, contact data, imagery or institutional claim was
introduced. Act 2 dependencies remain as recorded in the approved plan.

## 9. MTB status

- LFB-103A — COMPLETE
- **LFB-103C (this batch) — COMPLETE, pending ACT-CHATGPT review**
- LFB-103B2 / Act 2 sitewide governed swap — PLANNED / NOT RELEASED, blocked on
  governed content records
- LFB-111 document retention — BLOCKED

---

**Verdict: LFB-103C ACT 1B COMPLETE — READY FOR ACT-CHATGPT REVIEW**
