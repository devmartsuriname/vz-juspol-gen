# Devmart — Frontend replacement rule (READ ME FIRST on remix)

## Reference map (baseline documentation index)

All Devmart baseline documentation, in one place. Every agent working on
a remix should treat this list as the entry point.

**Repo docs (`docs/`)**
- [`DEVMART_FRONTEND_REMIX_NOTE.md`](DEVMART_FRONTEND_REMIX_NOTE.md) — this file, the remix contract.
- [`DEVMART_ADMIN_CSS_ISOLATION.md`](DEVMART_ADMIN_CSS_ISOLATION.md) — the CSS isolation contract for `/admin/*`.
- [`DEVMART_ADMIN_LIBRARY.md`](DEVMART_ADMIN_LIBRARY.md) — React wrappers (`AdminChart`, `AdminTable`, `AdminDatepicker`, `AdminScroll`).
- [`DEVMART_ADMIN_PAGES.md`](DEVMART_ADMIN_PAGES.md) — admin routing conventions.
- [`DEVMART_ADMIN_MASTER_TASKS.md`](DEVMART_ADMIN_MASTER_TASKS.md) — task breakdown and current baseline status.
- [`DEVMART_SEO_GSO_GUIDE.md`](DEVMART_SEO_GSO_GUIDE.md) — SEO / Generative Search Optimization baseline for the public frontend.
- [`HOSTINGER_DEPLOY_NOTES.md`](HOSTINGER_DEPLOY_NOTES.md) — deploy notes for Hostinger Business (Node 22, MySQL vs Supabase).

**Skills (`.agents/skills/`)**
- [`devmart-admin/SKILL.md`](../.agents/skills/devmart-admin/SKILL.md) — installs the `/admin/*` shell + library on a fresh project.
- [`devmart-admin/references/working-guide.md`](../.agents/skills/devmart-admin/references/working-guide.md) — deep-dive for agents extending the admin.
- [`devmart-admin/references/css-isolation.md`](../.agents/skills/devmart-admin/references/css-isolation.md) — isolation contract (skill copy).
- [`devmart-admin/references/react-wrappers.md`](../.agents/skills/devmart-admin/references/react-wrappers.md) — wrapper usage.
- [`html-template-to-tanstack/SKILL.md`](../.agents/skills/html-template-to-tanstack/SKILL.md) — ports an HTML template into TanStack Start; Phase 9 applies the SEO/GSO guide.

---

> **This project is an admin backoffice shell, not a finished website.**
> When you remix this project and drop in a public frontend template, the
> **first** thing to do is replace the frontend baseline. Do not layer a new
> frontend on top of the placeholder — you'll end up with two overlapping
> CSS stacks.

## What this project ships

- `/admin/*` — Devmart Admin (Darkone/Bootstrap 5) shell. **Fully
  CSS-isolated** via `src/routes/admin.tsx` `head.links` and
  `public/admin/assets/css/devmart-admin-scope.css`. Independent of whatever
  frontend you install.
- `/` — a **placeholder** page (`src/routes/index.tsx`) using Tailwind v4 +
  shadcn tokens from `src/styles.css`. It exists so the app boots; it is
  **not** the final frontend.

## The rule

When a new frontend template is being installed (typically via the
`html-template-to-tanstack` skill, or any hand-authored frontend), the
**first** actions must be:

1. **Replace `src/routes/index.tsx`** with the template's home route.
2. **Replace `src/styles.css`** with the template's global CSS. If the
   template does not ship a `styles.css`, strip the existing one down to
   just `@import "tailwindcss";` (or empty it entirely if the template
   doesn't use Tailwind).
3. Only then generate the rest of the frontend routes/components.

Doing it in this order guarantees a single CSS baseline on `/`, and keeps
the admin isolation intact.

## What you must NOT touch

These paths belong to the admin and are CSS-isolated. A frontend swap
never edits them:

- `src/routes/admin.tsx` — admin layout route (owns admin `<link>` tags).
- `src/routes/admin/**` — admin routes.
- `src/lib/admin/**` — `AdminPage`, wrappers (`AdminChart`, `AdminTable`,
  `AdminDatepicker`, `AdminScroll`), `loadVendor`, page registry.
- `public/admin/assets/**` — Darkone vendor bundle + scoped reset.

If a frontend template tries to import from these paths, or tries to
@import admin CSS into `src/styles.css`, **stop** — that breaks the
isolation contract. See `docs/DEVMART_ADMIN_CSS_ISOLATION.md`.

## Order of skills on a remix

1. **Frontend skill** (e.g. `html-template-to-tanstack`) → replaces
   `src/routes/index.tsx` and `src/styles.css`, generates the rest of the
   public pages, drops assets in `public/`.
2. **`devmart-admin`** — **already installed** on this project and every
   remix of it. Do not re-run the installer unless the admin is missing or
   needs an update.
3. Any additional frontend/content work.

## Verification after a frontend swap

Two curl checks confirm the isolation is still intact:

```bash
# Frontend must not load admin CSS
curl -s http://localhost:8080/ | grep -c admin/assets   # → 0

# Admin must still respond
curl -sI http://localhost:8080/admin | head -1          # → HTTP/1.1 200 OK
```

A visual check: `/admin` renders the Darkone dashboard with the sidebar,
topbar and placeholder card. Zero console errors, zero 404s on
`/admin/assets/*`.

## If the admin is missing after remix

Very rare (the skill is bundled with the project), but if `/admin` 404s or
`public/admin/` is empty, reinstall the shell:

```bash
python3 .agents/skills/devmart-admin/scripts/install_devmart_admin.py
```

Then restart the dev server so `routeTree.gen.ts` regenerates.

## Related docs

- `docs/DEVMART_ADMIN_CSS_ISOLATION.md` — the isolation contract.
- `docs/DEVMART_ADMIN_LIBRARY.md` — how to use the React wrappers when
   building real admin pages.
- `docs/DEVMART_ADMIN_PAGES.md` — admin routing conventions.
- `.agents/skills/devmart-admin/references/working-guide.md` — deep-dive
   for agents extending the admin.