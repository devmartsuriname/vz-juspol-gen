# Devmart Admin — Working Guide (for the next agent)

Read this before touching anything under `/admin`. It captures every
non-obvious decision from the initial port so you don't have to relearn it.

## Mental model

- The public frontend is Tailwind + custom design tokens.
- The admin is Bootstrap 5 (Darkone template), physically isolated to
  `/admin/*` routes. Nothing bleeds into `/`.
- The dashboard ships **clean** — one placeholder card. Real pages are
  composed with the React wrapper library, not by re-porting more Darkone
  HTML.

## File map

```
public/admin/assets/                 # Darkone vendor bundle (~20 MB, verbatim)
  css/devmart-admin-scope.css        # Scoped Tailwind-preflight reset
src/routes/admin.tsx                 # Layout route: loads admin CSS, wraps in .devmart-admin
src/routes/admin/index.tsx           # Dashboard route (placeholder)
src/routes/admin/auth-signin.tsx     # Static demo sign-in page (no real auth)
src/lib/admin/
  AdminPage.tsx                      # Host for raw Darkone HTML (fetch + isolated exec)
  AdminChart.tsx                     # ApexCharts wrapper
  AdminTable.tsx                     # GridJS wrapper
  AdminDatepicker.tsx                # Flatpickr wrapper
  AdminScroll.tsx                    # SimpleBar wrapper
  loadVendor.ts                      # Idempotent script/style loader
  index.ts                           # Barrel export
  pages/index.html                   # Trimmed dashboard shell
  pages/auth-signin.html             # Darkone-style sign-in card
  pages/meta.ts                      # Page metadata registry
```

## Standalone pages (no sidebar/topbar)

Pages like sign-in / 404 / lock-screen render outside the Darkone
`app-wrapper` shell. Use `<AdminPage bodyClass="authentication-bg" ... />`
so Darkone's centered layout kicks in. `src/routes/admin/auth-signin.tsx` is
the canonical reference — copy its pattern for any other standalone screen.
The sign-in form is a static demo; if a project needs real auth, wire it
separately (do not add it to this baseline).

## Adding a new admin page

**Prefer React-first.** Only re-port raw Darkone HTML when you need a 1:1
visual copy of a specific demo template.

### React-first (default)

1. Create `src/routes/admin/<slug>.tsx` using `createFileRoute("/admin/<slug>")`.
2. Compose the shell yourself (or import shared pieces you extract from
   `pages/index.html` into React components under `src/components/admin/`).
3. Fill the page body with wrappers:
   ```tsx
   import { AdminChart, AdminTable, AdminDatepicker } from "@/lib/admin";
   ```
4. Register the slug in `src/lib/admin/pages/meta.ts` (optional — the meta
   registry is only needed when you use `AdminPage` with raw HTML).
5. Add a sidebar link inside `src/lib/admin/pages/index.html`
   (`#navbar-nav`). Keep the existing menu structure.

### Re-port a Darkone template (rare)

1. Extract the `<body>` HTML from `dist/<page>.html` into
   `src/lib/admin/pages/<slug>.html`.
2. Rewrite asset URLs to `/admin/assets/...`.
3. Rewrite internal links to TanStack paths (`href="/admin/<other>"`).
4. Add a `meta.ts` entry.
5. Create the route:
   ```tsx
   import bodyHtml from "@/lib/admin/pages/<slug>.html?raw";
   import { AdminPage } from "@/lib/admin";

   component: () => <AdminPage bodyHtml={bodyHtml} pageScripts={[...]} bodyClass="..." />
   ```
6. Pass any page-specific vendor scripts (e.g.
   `/admin/assets/js/pages/chart.js`) via `pageScripts`.

## Non-negotiables — do NOT change these without reading the linked docs

1. **CSS load site** — admin CSS lives only in `admin.tsx` `head.links`.
   Never `@import` it from `src/styles.css`; that would leak Bootstrap into
   the whole frontend. See `css-isolation.md`.
2. **Scope reset order** — `devmart-admin-scope.css` MUST be the last
   stylesheet on `admin.tsx`. It undoes Tailwind Preflight inside
   `.devmart-admin`.
3. **Button reset specificity** — the button reset uses `:where(.devmart-admin) button`
   so it has specificity 0 and Bootstrap's `.btn` wins. Do not rewrite it as
   `.devmart-admin button` — that raises specificity to (0,1,1) and breaks
   `btn-outline-*`.
4. **`AdminPage` script isolation** — scripts are executed via
   `new Function` inside an IIFE, not injected as `<script>` tags. This
   prevents `Identifier 'Components' has already been declared` on repeat
   SPA navigations.
5. **DOMContentLoaded shim** — `AdminPage` patches
   `document.addEventListener` so vendor scripts that register on
   `DOMContentLoaded` still initialise after client-side navigation. Do
   not remove it.
6. **`display: contents`** on `.devmart-admin` wrapper. Removing it breaks
   Darkone's `.app-wrapper` full-viewport layout.
7. **SSR gate** — `AdminPage` renders an empty shell during SSR and only
   injects HTML after mount. This avoids hydration mismatches caused by
   vendor JS mutating DOM. Do not force SSR.

## Common pitfalls

- **"page renders but sidebar toggle does nothing"** — you probably added
  a new route that forgot to invoke the vendor pipeline. Either use
  `AdminPage` (which reruns `app.js`) or manually call the initialiser
  when composing shells in React.
- **"charts don't appear after navigating away and back"** — the vendor
  script cached its top-level `const`. Fix by ensuring the script runs
  through `AdminPage`'s `new Function` wrapper, or via the React wrapper
  which re-instantiates ApexCharts per mount.
- **"images are cut off / logo squished"** — Tailwind Preflight leaked in.
  Verify `devmart-admin-scope.css` is the last `<link>` in `admin.tsx`.
- **"400/404 on `/admin/assets/*`"** — the vendor bundle was not copied.
  Rerun the installer.

## Smoke test before shipping

1. Typecheck: `bunx tsgo --noEmit` — 0 errors.
2. `curl -s http://localhost:8080/ | grep -c admin/assets` → `0`
   (CSS isolation intact).
3. `curl -sI http://localhost:8080/admin` → `200`.
4. Playwright walk: `/` → `/admin` → any other admin route → `/admin`.
   Assert 0 console errors, sidebar toggle still works, no 404s in network.
5. Dark/light theme switch in the topbar still flips
   `<html data-bs-theme>`.

## When something feels off

If a new page misbehaves, the first three files to re-read are:

1. `src/lib/admin/AdminPage.tsx`
2. `public/admin/assets/css/devmart-admin-scope.css`
3. `src/routes/admin.tsx`

Ninety percent of admin-side regressions trace back to changes in one of
those.

## Coexistence with frontend templates

This skill only owns the admin subtree. It never touches the public
frontend on `/`. When installed in a fresh project (or one being remixed
with a new frontend template), follow these rules:

- **Do not edit** `src/routes/index.tsx` or `src/styles.css` — those
  belong to the frontend skill (e.g. `html-template-to-tanstack`).
- **Do not `@import`** any `/admin/assets/*.css` into `src/styles.css`.
  Admin CSS loads exclusively via `src/routes/admin.tsx` `head.links`.
- If no frontend exists yet and `src/routes/index.tsx` needs a stub, keep
  it minimal (Tailwind classes are fine; it will be overwritten later).
- When both skills run on the same project, the **frontend skill runs
  first** so it can replace `index.tsx` + `styles.css` cleanly. This skill
  is idempotent and safe to run after.

See `docs/DEVMART_FRONTEND_REMIX_NOTE.md` in the host project for the
full remix contract.

That note also carries the **Reference map** — the canonical index of
every baseline doc (admin isolation, library, pages, SEO/GSO, Hostinger
deploy) and every skill. Consult it before extending the admin so you
don't duplicate rules that already live in a sibling doc.