# Devmart Admin — Master Task Breakdown

> **Baseline status (2026-07-29): DONE.** Admin shell = clean (no demo data),
> React wrapper library = live, skill `devmart-admin` = active, frontend
> replacement rule = documented, SEO/GSO baseline = documented, Hostinger
> deploy path = validated. Ready to remix. See
> [`DEVMART_FRONTEND_REMIX_NOTE.md`](DEVMART_FRONTEND_REMIX_NOTE.md) for the
> full reference map.

Single source of truth for porting Darkone v1.0 admin template into this
project as **Devmart Admin**, then packaging it as the reusable
`devmart-admin` skill.

Status legend: `[ ]` todo · `[~]` in progress · `[x]` done · `[!]` blocked

---

## Act 1 — Port Darkone → this project (`/admin/*`)

### Phase 1 · Intake
- [x] Unzip template to `/tmp/darkone`
- [x] Inventory: 46 source HTML pages, 47 compiled dist pages
- [x] Detect vendor stack: Bootstrap 5, ApexCharts, GridJS, Flatpickr, SimpleBar, Dropzone, jsvectormap, Quill, Moment, Iconify, node-waves, countup, gmaps, wnumb
- [x] Copy `dist/assets/` (20 MB) → `public/admin/assets/`

### Phase 2 · Route scaffold (fase-gated: kern eerst)
**Kern (validatiepakket):**
- [x] `src/routes/admin.tsx` — layout route (CSS loader + wrapper + Outlet)
- [x] `src/routes/admin/index.tsx` — dashboard (Analytics)
- [x] `src/routes/admin/auth-signin.tsx`
- [x] `src/routes/admin/ui-buttons.tsx`
- [x] `src/routes/admin/charts.tsx`
- [x] `src/routes/index.tsx` — vervangen door landing met CTA naar `/admin`

**Rest (na kern-gate):**
- [x] Auth: signup, password, lock-screen, 404, 404-alt
- [x] UI kit / Forms / Tables / Icons / Maps / Layouts / Auth / 404 — ported and validated, then **rolled back during cleanup** (see below). Only `/admin` dashboard remains active.

### Phase 3 · Assets & CSS isolation
- [x] Assets under `public/admin/assets/`
- [x] CSS loaded ONLY on `/admin/*` via route-level `head({ links })`
- [x] JS loaded ONLY on `/admin/*` via `AdminPage` component
- [~] Tailwind preflight neutralised inside `.devmart-admin` wrapper — deferred; not needed while CSS is fully route-scoped (see `DEVMART_ADMIN_CSS_ISOLATION.md`)
- [x] Verified: `curl /` grep `admin/assets` → 0 hits; `/admin` → hits

### Phase 4 · JS rehydration
- [x] Vendor bundle (`vendor.min.js`) load once, cache-friendly (`AdminPage` fetch+cache)
- [x] `app.js` re-init on client-side nav (DOMContentLoaded shim)
- [x] Page-specific scripts (`pages/chart.js` etc.) mount/unmount per route
- [x] Iconify icons (`<iconify-icon>`) render after nav
- [x] React wrapper library (`src/lib/admin/`): `AdminChart`, `AdminTable`, `AdminDatepicker`, `AdminScroll`, `loadVendor` (see `docs/DEVMART_ADMIN_LIBRARY.md`)

### Phase 5 · Imagery
- [x] All template images/fonts copied 1:1 (no AI replacements)

### Phase 6 · Smoke + validation
- [x] Playwright smoke over 29 ported routes: 200 OK, 0 pageerrors, 0 404s
- [x] Sidebar toggle works after SPA nav
- [x] Dashboard charts render (ApexCharts) — validated during smoke; charts now removed (Cleanup)
- [x] Auth pages render standalone — validated during smoke; auth routes removed (Cleanup)

### Cleanup · pre-Akte-2
- [x] Sidebar trimmed to a single **Dashboard** entry
- [x] Dashboard body replaced with a placeholder card (`<h4>Dashboard</h4>` + intro to the library)
- [x] 45 demo route files removed from `src/routes/admin/`
- [x] 45 demo templates removed from `src/lib/admin/pages/`
- [x] `meta.ts` reduced to a single `index` entry
- [x] `pageScripts` on `/admin` cleared (no vendor-map/dashboard scripts)
- [x] Wrapper library (`src/lib/admin/{AdminChart,AdminTable,AdminDatepicker,AdminScroll,loadVendor,AdminPage}`) preserved intact
- [x] Assets under `public/admin/assets/` preserved intact (library + future re-ports depend on them)

### Post-cleanup · auth entry restored
- [x] `/admin/auth-signin` restored as a static demo sign-in page (Darkone
      `authentication-bg` centered card, no sidebar/topbar). Form submits to
      `/admin`; no real auth logic. Landing CTA (`/`) now points here.

---

## Act 2 — Package as `devmart-admin` skill

### Phase 7 · Skill scaffold under `.agents/skills/devmart-admin/`
- [ ] `SKILL.md` — trigger conditions, activation, page catalogue, CSS isolation contract
- [ ] `assets/` — CSS/JS/fonts/img bundle + route template + layout template
- [ ] `scripts/install_devmart_admin.py` — copies assets to `public/admin/`, scaffolds `src/routes/admin.tsx` and page routes
- [ ] `scripts/pixel_diff.py` — Playwright per-route diff
- [ ] `references/` — page catalogue, css-isolation.md, react-wrappers.md

### Phase 8 · Skill activation
- [ ] `skills--apply_draft .agents/skills/devmart-admin`
- [ ] Smoke test skill on a scratch project (mental)

---

## Repo structure (target)

```
public/admin/                      # 1:1 copy of Darkone dist assets
  assets/
    css/                           # style.min.css, icons.min.css, vendor.min.css
    js/                            # app.js, config.js, pages/*.js
    vendor/                        # apexcharts, bootstrap, gridjs, ...
    fonts/                         # boxicons, solar
    images/                        # logos, avatars, small/*

src/routes/
  index.tsx                        # landing (link to /admin)
  admin.tsx                        # layout route: loads CSS/JS, .devmart-admin wrapper, <Outlet />
  admin/
    index.tsx                      # dashboard (Analytics)
    auth-signin.tsx
    auth-signup.tsx
    auth-password.tsx
    auth-lock-screen.tsx
    ui-buttons.tsx                 # ...one file per HTML page
    charts.tsx
    ...

src/components/admin/              # extracted React versions of partials
  Topbar.tsx
  Sidebar.tsx
  Menu.tsx
  Footer.tsx
  PageTitle.tsx

src/lib/admin/                     # thin React wrappers over vanilla vendor libs
  AdminChart.tsx                   # ApexCharts
  AdminTable.tsx                   # GridJS
  AdminDatepicker.tsx              # Flatpickr
  AdminScroll.tsx                  # SimpleBar

src/lib/admin/loader.ts            # per-route script loader (idempotent)

docs/
  DEVMART_ADMIN_MASTER_TASKS.md    # THIS FILE — leidraad + checklist
  DEVMART_ADMIN_PAGES.md           # HTML → route mapping table
  DEVMART_ADMIN_CSS_ISOLATION.md   # scoping contract
  DEVMART_ADMIN_LIBS.md            # vendor library catalogue

.agents/skills/devmart-admin/      # (Act 2) reusable skill package
  SKILL.md
  assets/
  scripts/
  references/
```

---

## CSS isolation contract (short version)

1. Admin CSS bundles (`vendor.min.css`, `icons.min.css`, `style.min.css`) are
   loaded **only** on `/admin/*` routes via the layout route's `head.links`.
2. All admin routes render inside a `<div className="devmart-admin">` wrapper.
3. Tailwind preflight stays global for the frontend. A neutralising reset
   inside `.devmart-admin` prevents Tailwind resets from bleeding into
   Bootstrap components.
4. Vendor JS (`vendor.min.js`, `app.js`, `pages/*.js`) is injected only on
   admin routes; unmount cleans up added `<script>` tags.
5. Non-admin routes never fetch a single byte of admin CSS/JS.

Full contract lives in `docs/DEVMART_ADMIN_CSS_ISOLATION.md`.

---

## Kern-gate exit criteria (before we build the "rest")

- `/` renders landing without any admin CSS/JS in the network tab.
- `/admin` renders the Analytics dashboard identical to `dist/index.html`.
- `/admin/auth-signin` renders standalone (no sidebar/topbar) identical to `dist/auth-signin.html`.
- `/admin/ui-buttons` renders all Bootstrap button variants correctly.
- `/admin/charts` renders ApexCharts on first load AND after SPA nav.
- Sidebar toggle, theme switch, dropdown open/close still work after
  navigating `/admin` → `/admin/charts` → `/admin` (rehydration proof).
