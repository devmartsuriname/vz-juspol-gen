# FRONTEND HANDOFF OVERVIEW — LFB-106

Package: `docs/vz-juspol-gen/handoff/LFB-106-FRONTEND-CMS-HANDOFF-001/`
Actor: Lovable (documentation-only execution). Final approval authority: Delroy.
Validation actor: ACT-CODEX (independent, read-only).

This package documents the accepted stakeholder-review MVP frontend. No
application code, CSS, media, PDF, dependency or configuration was changed.

---

## 1. Identity and baseline

| Item | Value | Source of the statement |
| --- | --- | --- |
| Lovable project ID | `ddc7ea4d-6274-4bc2-a1f9-dcede1e5ca68` | project preview URL / internal Git remote path |
| Lovable HEAD at execution start | `ec26f176a7b954454026d427f1e69032c9eecf8f` (2026-09-13 21:35:15 +0000) | `git log -1` in the project workspace |
| Accepted application baseline (LFB-105) | `054958b481f5e1cda8957068d222b228b18012ed` | LFB-105 release record |
| LFB-105 final-correction execution commit | `dc039bf07fc2f077b2693ae2f3fc55a7e99f3c63` | LFB-105-FINAL-CORRECTION-001 report |
| GitHub repository | `https://github.com/devmartsuriname/vz-juspol-gen` | declared by Delroy; reported "Connected / in sync" by the Lovable interface |
| Branch | `main` | as above |
| Publication state | private, unpublished | Lovable project settings; no published URL exists |
| Database state | disabled — no Lovable Cloud, no Supabase, no connector | repository contains no `src/integrations/supabase/**`, no server function and no `src/routes/api/**` |

Evidence limitation (recorded, not hidden): inside the Lovable build sandbox
the Git remote points at Lovable's internal repository storage, not at
`github.com`. The repository identity, branch and "in sync" state above are
therefore documented **as reported by the Lovable interface** and are not
independently verified against github.com from within this environment.
ACT-CODEX should verify repository, branch and commit equality directly on
GitHub.

## 2. Framework, tooling, commands

| Item | Value |
| --- | --- |
| Framework | TanStack Start v1 (`@tanstack/react-start` ^1.168.26) with TanStack Router (`@tanstack/react-router` ^1.170.16) |
| UI runtime | React 19 (`react` / `react-dom` ^19.2.0) |
| Build tool | Vite ^8.0.16 via `@lovable.dev/vite-tanstack-config` 2.13.1 |
| Server build | Nitro `3.0.260603-beta` (bundled through the Lovable Vite config) |
| Styling | Tailwind CSS ^4.2.1 (present, but the Tailwind entry is **not** loaded on public routes — see §5), plus the ported Liviza CSS and `vz-polish.css` |
| Validation | `zod` ^3.24.2 (installed; not used by the public routes) |
| Package manager | bun (`bunfig.toml` present); npm-compatible `package.json` scripts |
| Install | `bun install` (or `npm install`) |
| Development | `bun run dev` → `vite dev` |
| Production build | `bun run build` → `vite build` |
| Development-mode build | `bun run build:dev` → `vite build --mode development` |
| Local preview of build | `bun run preview` → `vite preview` |
| Lint / format | `bun run lint` (ESLint 9), `bun run format` (Prettier 3) |
| Typecheck | no dedicated script; TypeScript ^5.8.3 with `tsconfig.json` |

## 3. Entry points

| File | Role |
| --- | --- |
| `src/server.ts` | SSR entry, wired through `vite.config.ts` (`tanstackStart.server.entry = "server"`); SSR error wrapper |
| `src/start.ts` | TanStack Start client/runtime configuration |
| `src/router.tsx` | `getRouter()` — creates the router with a `QueryClient` context, `scrollRestoration: true` |
| `src/routes/__root.tsx` | Root route: `HeadContent`, `Scripts`, `QueryClientProvider`, not-found and error components. The Tailwind entry import is deliberately commented out (LFB-103A) so Tailwind preflight cannot alter the ported template |
| `src/routeTree.gen.ts` | Generated route tree — never hand-edited |
| `vite.config.ts` | Thin wrapper over `@lovable.dev/vite-tanstack-config` |

## 4. Route inventory

15 route files under `src/routes/` (excluding `admin.tsx` and `admin/**`),
producing **32 public URLs**: 11 static + 6 category URLs + 15 service-detail
URLs.

| Route file | URL pattern | Content module |
| --- | --- | --- |
| `index.tsx` | `/` | `liviza-home.html.ts` |
| `over-ons.tsx` | `/over-ons` | `liviza-about.html.ts` |
| `diensten.tsx` | layout (`<Outlet/>`) | — |
| `diensten.index.tsx` | `/diensten` | `liviza-services.html.ts` |
| `diensten.$categorie.index.tsx` | `/diensten/$categorie` (6 URLs) | `liviza-category.html.ts` |
| `diensten.$categorie.$slug.tsx` | `/diensten/$categorie/$slug` (15 URLs) | `liviza-service-detail.html.ts` |
| `aanvraaghulp.tsx` | `/aanvraaghulp` | `liviza-wizard.html.ts` |
| `documentenlijsten.tsx` | `/documentenlijsten` | `liviza-documenten.html.ts` |
| `veelgestelde-vragen.tsx` | `/veelgestelde-vragen` | `liviza-faq.html.ts` |
| `nieuws.tsx` | layout (`<Outlet/>`) | — |
| `nieuws.index.tsx` | `/nieuws` | `liviza-news.html.ts` |
| `nieuws.$slug.tsx` | `/nieuws/$slug` | `liviza-news-detail.html.ts` |
| `instanties.tsx` | `/instanties` | `liviza-instanties.html.ts` |
| `contact.tsx` | `/contact` | `liviza-contact.html.ts` |
| `privacy.tsx`, `disclaimer.tsx` | `/privacy`, `/disclaimer` | `liviza-legal.html.ts` |
| `admin.tsx`, `admin/**` | `/admin/*` | out of public scope; CSS-isolated, untouched |

The canonical path constants and navigation availability rules live in
`src/lib/public/routes-map.ts` (`publicRoutes`, `primaryNav`, `footerNav`).
Route head metadata is produced by `publicHead()` in `src/lib/public/seo.ts`,
which currently emits `robots: noindex, follow` while content is provisional.

## 5. CSS organization

| Layer | Location | Notes |
| --- | --- | --- |
| Tailwind / shadcn baseline | `src/styles.css` | present but **not imported** on public routes (import commented out in `__root.tsx`) so Tailwind preflight cannot break ported geometry |
| Ported Liviza template CSS | `public/vz-public/liviza/assets/css/*.css` | loaded per route in source order by `LIVIZA_CSS` in `LivizaTemplatePage.tsx`: bootstrap, fontawesome, flaticon, pbminfotech-base-icons, swiper, magnific-popup, shortcode, base, style, responsive |
| VZ polish layer | `public/vz-public/css/vz-polish.css` (725 lines) | always loaded last; holds all VZ-owned corrections (D-001 … D-008) |
| Admin CSS | `public/admin/assets/css/**` | fully isolated; not loaded by public routes |

Scripts are loaded once per mount by `LivizaTemplatePage` (`LIVIZA_JS`):
jQuery, popper, bootstrap, waypoints, appear, numinate, swiper,
magnific-popup, circle-progress, `scripts.js`, then the VZ-owned
`vz-polish.js` and `vz-wizard.js`. This post-mount effect is the single
script execution path (LFB-105 D-004); `livizaHead()` emits stylesheets only.

## 6. Template / chrome organization

- `src/lib/public/template/chrome.ts` — shared chrome generators:
  `headerTop()`, `header()`, `homeHeader()` (hero + three slides),
  `titleBar()`, `footer()`, `pageOpen()`, `contentOpen()`, `contentClose()`,
  plus the media constants `ASSETS`, `VZ_IMAGES`, `categoryImage`,
  `stakeholderImages`.
- `src/lib/public/template/liviza-*.html.ts` — one HTML module per page type,
  composed from `chrome.ts` and the governed content in
  `src/content/vz-content.ts`.
- `src/lib/public/template/LivizaTemplatePage.tsx` — renders a module's HTML
  string, re-runs template scripts on mount, neutralises demo forms and
  `*.html` links.
- `src/components/public/layout/**` — the typed React shell from LFB-102
  (PublicShell, PublicHeader, PublicFooter, MobileNavigation, Breadcrumbs,
  PageTitle, …). It is retained in the repository but the live public pages
  render through the Liviza HTML modules, not through this shell.
- `src/content/vz-content.ts` — governed content records (identity,
  categories, 15 services, 17 documents, stakeholders).
- `src/content/index.ts` + `src/content/types.ts` — the LFB-101 typed,
  deliberately empty governed record sets and their interfaces.

## 7. Responsive breakpoints in use

Validated and referenced widths: **320, 375, 430, 768, 991, 1024, 1440**.
`991px` is the Liviza/Bootstrap `xl` boundary and is the upper bound of the
LFB-105 D-008 hero-pagination override (`max-width: 991px`, dot strip
positioned `top: 508px` within 768–991px).

## 8. Accepted state

Delroy accepted, for this stage: current visual state, hero title behaviour,
slider controls, service-detail composition, remaining non-blocking polish,
preparation-only Aanvraaghulp, and current temporary imagery. See
`DEFERRED-ITEMS-REGISTER.md` for everything carried forward.
