---
name: devmart-admin
description: Install the Devmart Admin dashboard shell (Darkone-based Bootstrap 5 admin, CSS-isolated to /admin/*) into a TanStack Start project. Ships a clean dashboard, React wrappers for ApexCharts / GridJS / Flatpickr / SimpleBar, and a scoped Tailwind-preflight neutraliser. Trigger when the user asks for an admin panel, backoffice, dashboard shell, or wants to reuse the Devmart / Darkone admin layout alongside a Lovable frontend.
---

# Devmart Admin

A batteries-included admin shell for TanStack Start projects. The skill drops
a clean, Bootstrap 5 dashboard at `/admin` with the sidebar/topbar/footer
already wired, plus a React wrapper library so the next agent can build real
pages (charts, tables, forms) without re-porting Darkone HTML.

**Do not** load this skill for tweaks to an admin that is already installed —
just edit the files directly. Only run the installer on a project that has no
`/admin` shell yet.

## What ships

1. `public/admin/assets/` — full Darkone vendor bundle (CSS, JS, fonts,
   images, ApexCharts, GridJS, Flatpickr, SimpleBar, jsVectorMap, Iconify,
   Bootstrap, node-waves, ...). ~20 MB, copied verbatim.
2. `public/admin/assets/css/devmart-admin-scope.css` — scoped reset that
   neutralises Tailwind Preflight leakage inside `.devmart-admin`.
3. `src/routes/admin.tsx` — layout route. Loads admin CSS **only** on
   `/admin/*` via `head.links` and wraps children in `<div class="devmart-admin">`.
4. `src/routes/admin/index.tsx` — clean Dashboard route (single placeholder card).
5. `src/lib/admin/pages/index.html` — trimmed shell (topbar + sidebar with a
   single **Menu → Dashboard** entry + footer + placeholder body).
6. `src/lib/admin/pages/meta.ts` — page metadata registry.
7. `src/lib/admin/AdminPage.tsx` — host component for raw Darkone HTML pages
   (fetch + `new Function` isolated execution + DOMContentLoaded shim +
   body-class handling). Use it when you re-port a Darkone template.
8. `src/lib/admin/{AdminChart,AdminTable,AdminDatepicker,AdminScroll}.tsx` —
   React wrappers around ApexCharts, GridJS, Flatpickr, SimpleBar.
9. `src/lib/admin/loadVendor.ts` — idempotent script/style loader used by the
   wrappers.
10. `src/lib/admin/index.ts` — barrel export.

## Install

```bash
python3 .agents/skills/devmart-admin/scripts/install_devmart_admin.py
```

The script is idempotent. It refuses to overwrite existing files unless
`--force` is passed, and prints a summary of what it copied.

## After install

1. Restart the Vite dev server (or wait for HMR) — new route files require a
   fresh `routeTree.gen.ts`.
2. Verify `/admin` renders the placeholder dashboard.
3. Verify `/` (or any non-admin route) does **not** load `/admin/assets/*`.
   `curl -s http://localhost:8080/ | grep -c admin/assets` should return `0`.

## Building real admin pages

Prefer the React wrappers over re-porting Darkone HTML. See
`references/react-wrappers.md`. The layout route already loads Bootstrap CSS,
so `.card`, `.btn`, `.row`, etc. work out of the box.

```tsx
// src/routes/admin/analytics.tsx
import { createFileRoute } from "@tanstack/react-router";
import { AdminChart } from "@/lib/admin";

export const Route = createFileRoute("/admin/analytics")({
  component: () => (
    <div className="devmart-admin">
      <div className="app-wrapper">
        {/* topbar / sidebar composed manually or via <AdminPage> shell */}
        <div className="page-content">
          <div className="card"><div className="card-body">
            <AdminChart height={320} options={{ chart: { type: "area" }, series: [{ data: [1,2,3] }] }} />
          </div></div>
        </div>
      </div>
    </div>
  ),
});
```

## Contract for the CSS isolation

See `references/css-isolation.md`. Non-negotiables:

- Admin CSS bundles load ONLY on `/admin/*` (via `admin.tsx` `head.links`).
- All admin markup lives inside `.devmart-admin`.
- `devmart-admin-scope.css` is loaded LAST so it beats Tailwind Preflight.
- Vendor JS is injected per-route by `AdminPage`; no globals leak into `/`.

## Working guide for the next agent

Read `references/working-guide.md` before extending the admin. It covers:
- Where to put new pages (React-first vs re-port).
- How to reuse the wrappers with the correct vendor assets.
- What NOT to touch (`devmart-admin-scope.css` specificity, `AdminPage`
  script isolation, the `DOMContentLoaded` shim).
- Smoke-test checklist before shipping.