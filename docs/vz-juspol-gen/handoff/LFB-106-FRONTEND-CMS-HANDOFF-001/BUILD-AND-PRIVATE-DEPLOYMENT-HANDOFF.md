# BUILD AND PRIVATE DEPLOYMENT HANDOFF — LFB-106

Documentation only. Nothing was built, deployed, published or configured
during this task.

---

## 1. Commands

| Purpose | Command |
| --- | --- |
| Install | `bun install` (npm/pnpm compatible: `npm install`) |
| Development | `bun run dev` → `vite dev` |
| Production build | `bun run build` → `vite build` |
| Development-mode build | `bun run build:dev` → `vite build --mode development` |
| Local preview of the build | `bun run preview` → `vite preview` |
| Lint | `bun run lint` |
| Format | `bun run format` |

Node: the Hostinger reference deployment uses Node 22.x (18/20/24 also
available). No Node version is pinned in `package.json` (`engines` is absent).

## 2. Actual runtime model — read from the repository

This application **requires a server runtime. A plain static `dist/` upload
is NOT a valid deployment.** Evidence from the sources:

1. `vite.config.ts` uses `@lovable.dev/vite-tanstack-config` and sets
   `tanstackStart.server.entry = "server"`, i.e. an SSR server entry.
2. `src/server.ts` exists and is that SSR entry (a `{ fetch }` handler wrapper).
3. `nitro` `3.0.260603-beta` is a devDependency; the Lovable Vite config runs
   Nitro at build time to emit a server bundle.
4. `src/routes/__root.tsx` renders `HeadContent` / `Scripts` and every public
   route supplies a `head()` — head metadata is produced during SSR.
5. `docs/HOSTINGER_DEPLOY_NOTES.md` records the confirmed model: Nitro
   detects the Node preset on Hostinger; Lovable preview/publish uses the
   Cloudflare Worker preset. Same source, different output.

So: **Vite + TanStack Start + Nitro, deployed as a Node (or Worker) server
process**, not as static files.

## 3. Deployment path (documented, not executed)

Per `docs/HOSTINGER_DEPLOY_NOTES.md`:

1. Lovable → GitHub sync (already connected: `devmartsuriname/vz-juspol-gen`,
   branch `main`).
2. Hostinger hPanel → Websites → Add website → Import from GitHub → select
   the repository and `main`.
3. Enable auto-deployment (each push to `main` builds and deploys).
4. Hostinger detects Nitro and builds with the Node preset (Node 22.x).
5. Attach a custom domain via Hostinger Domains; SSL/CDN default on.
6. Runtime logs: Websites → `<site>` → Runtime logs.

For the stakeholder-review stage this must remain a **private/restricted**
deployment. Deployment itself is not released by LFB-106.

## 4. Routing requirements

- The server handles all routing; there is no client-only SPA fallback file
  to configure. Every request reaches the Nitro server handler.
- Direct entry to any of the 32 public URLs (for example
  `/diensten/naturalisatie/optie-art-12`) must be server-rendered, not
  redirected to `/`.
- Unknown paths must reach the application's not-found component in
  `src/routes/__root.tsx`, not a host-level 404 page.
- `/admin/*` is part of the same application and must not be exposed publicly
  in a stakeholder deployment without an access decision.

## 5. Static and public asset requirements

Everything under `public/` is served at the site root and must be deployed
verbatim:

| Path | Contents | Requirement |
| --- | --- | --- |
| `public/vz-public/liviza/assets/**` | ported template CSS/JS/fonts/images | must be served with correct MIME types; fonts need byte-accurate delivery |
| `public/vz-public/css/vz-polish.css` | VZ polish layer | must load last |
| `public/vz-public/js/*.js` | `vz-polish.js`, `vz-wizard.js` | plain scripts, no module type |
| `public/vz-public/images/**` | VZ imagery | WebP must be served as `image/webp` |
| `public/vz-public/documenten/**` | the 17 PDFs | see §6 |
| `public/admin/assets/**` | isolated admin assets | untouched |
| `public/favicon.svg` | favicon | — |

Filenames containing spaces and parentheses must survive deployment
unmodified — the host must not normalise, lowercase or rewrite them.

## 6. PDF serving requirements

- Path: `/vz-public/documenten/<exact filename>`, byte-identical files.
- `Content-Type: application/pdf`.
- Inline-capable (no forced `Content-Disposition: attachment`), matching
  current behaviour.
- No authentication, no expiring URL, no download proxy.
- Byte size and SHA-256 must equal the values in `DOCUMENT-ASSET-REGISTER.md`
  after deployment.

## 7. Environment variables

Inventory: **none required**. A repository-wide search found no
`process.env.*` and no `import.meta.env.*` reference in `src/`. There is no
`.env` file in the repository and no secret is needed to build or run the
public frontend.

Consequence: do not create environment variables for this stage. The variables
named in the Hostinger notes (`DATABASE_URL`, `SESSION_SECRET`, `JWT_SECRET`)
belong to a future, separately approved backend and must **not** be created
now.

## 8. Database-disabled requirement

- No Lovable Cloud, no Supabase, no connector, no database client is present
  or may be enabled.
- No `src/routes/api/**`, no `createServerFn` business logic, no auth.
- Any deployment must run with zero database configuration.

## 9. Rollback baseline

| Purpose | Commit |
| --- | --- |
| Accepted application baseline (LFB-105) | `054958b481f5e1cda8957068d222b228b18012ed` |
| LFB-105 final-correction execution commit | `dc039bf07fc2f077b2693ae2f3fc55a7e99f3c63` |
| HEAD at the start of this handoff | `ec26f176a7b954454026d427f1e69032c9eecf8f` |

LFB-106 adds documentation only, so the application rollback target is
unchanged by this task.

## 10. Post-deployment smoke-test checklist

1. `/` renders with the header, pre-header contact strip and hero.
2. Hero shows three slides; dots are visible and operable at 320, 375, 430,
   768, 900, 1024 and 1440; the status reads "Dia X van 3" and stays in sync.
3. No horizontal overflow at any of those widths (`scrollWidth == clientWidth`).
4. All 32 public URLs return 200 on direct entry (not via client navigation).
5. `/documentenlijsten` shows six tabs, one active panel, and 17 working PDF
   links; a spot-checked PDF downloads with the recorded byte size.
6. Service-detail pages render full width with conditions, facts, the PDF
   link below the checklist and at most three related cards.
7. `/aanvraaghulp` completes the three steps with pointer and keyboard; no
   network request is issued by the wizard.
8. `/nieuws` and `/veelgestelde-vragen` show their governed empty states.
9. Browser console: zero errors and zero hydration warnings.
10. `robots` still reports `noindex, follow`; the site is not publicly
    indexable at this stage.
11. `/admin/*` behaves as before and loads no public CSS/JS.
12. A random page reload preserves layout (SSR output matches client render).
