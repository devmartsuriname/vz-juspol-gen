# Devmart Admin — CSS & JS Isolation Contract

Goal: Devmart Admin (Darkone-based) must be droppable into any Lovable
project — regardless of the public frontend template — without any style
or script bleeding either way.

## Contract

1. **Route scope.** All admin URLs live under `/admin/*`. The layout route
   `src/routes/admin.tsx` is the ONLY place that references admin assets.
2. **Head links per route.** `admin.tsx` declares admin CSS in `head.links`.
   TanStack Router injects those tags only for matching routes; other
   routes never see them. Verified: `curl /` returns zero references to
   `/admin/assets/*`.
3. **DOM wrapper.** Admin pages render inside
   `<div class="devmart-admin" style="display:contents">`. `display:contents`
   keeps the layout at document root so Darkone's `.app-wrapper` still
   controls the viewport.
4. **JS injection.** `AdminPage` injects `config.js`, `vendor.min.js`,
   `app.js` (and any per-page script) on mount, removes them on unmount.
   No admin JS runs on non-admin routes.
5. **No global CSS pollution.** The `src/styles.css` entry file is
   untouched by the port. Tailwind preflight remains the global reset for
   the frontend.

## What is NOT done (yet, on purpose)

- We do **not** post-process Darkone CSS to prefix every selector with
  `.devmart-admin`. That would break Bootstrap resets and the Darkone
  design system. Because the CSS only loads on `/admin/*`, prefixing is
  unnecessary: the frontend template is on `/` and never fetches it.
- If a future frontend template puts its own routes under `/admin/*` for
  some reason, remap Devmart Admin to a different mount (e.g. `/backoffice`)
  by renaming the layout route.

## Verification checklist

- [ ] `curl -sS http://localhost:8080/ | grep -c 'admin/assets'` → 0
- [ ] `curl -sSL http://localhost:8080/admin | grep -c 'admin/assets/css'` → ≥1
- [ ] Navigating `/` → `/admin` → `/` shows no leftover Bootstrap classes
      or ApexCharts scripts on `/` (DevTools Elements + Network).
