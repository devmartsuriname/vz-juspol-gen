## Goal

Bring back the Darkone auth login screen that was removed during cleanup, so `/admin` is preceded by a proper sign-in page (matching the Darkone demo). Then update the docs that reference the "clean state".

## Scope

Frontend/presentation only. No real auth logic — the form is a static Darkone-style page with a "Sign in" button that navigates to `/admin`. Backend/auth wiring is explicitly out of scope (workspace rule: no Cloud, no auth systems).

## Changes

1. **Recreate the Darkone auth-signin template**
   - `src/lib/admin/pages/auth-signin.html` — the Darkone auth card markup (logo, email + password inputs, remember-me, "Sign In" button styled as `.btn-primary`, footer link). Asset URLs rewritten to `/admin/assets/...`. The `Sign In` button/link points to `/admin`.
   - `src/lib/admin/pages/meta.ts` — add an `authSignin` entry (`title: "Sign in · Devmart Admin"`, `description`, `robots: noindex`).

2. **Add the route**
   - `src/routes/admin/auth-signin.tsx` — uses `<AdminPage bodyHtml={...} bodyClass="authentication-bg" />` so the card centers exactly like the Darkone demo (this is the same pattern we validated earlier). `head()` sets title + `robots: noindex, nofollow`.

3. **Wire the landing CTA through auth**
   - `src/routes/index.tsx` — change the "Open Devmart Admin" link's `to` from `/admin` to `/admin/auth-signin`. Copy stays the same.

4. **Sidebar/menu unchanged**
   - The admin sidebar still shows only "Dashboard". Auth is reachable via the landing CTA and via direct URL; it is not a menu entry (matches Darkone, where auth pages live outside the app shell).

5. **Docs refresh**
   - `docs/DEVMART_ADMIN_PAGES.md` — add the `auth-signin` row to the page catalogue.
   - `docs/DEVMART_ADMIN_MASTER_TASKS.md` — note that the auth-signin page is restored (kept as the single non-dashboard page, all other demo pages remain removed).
   - `.agents/skills/devmart-admin/references/working-guide.md` — mention `auth-signin` as the reference example of a standalone (no sidebar/topbar) admin page using `bodyClass="authentication-bg"`.
   - `docs/DEVMART_FRONTEND_REMIX_NOTE.md` — no change needed (auth-signin lives under `/admin/*` and is covered by existing CSS-isolation rules).

## Verification

- `curl -sSL http://localhost:8080/admin/auth-signin` returns 200 and includes the `authentication-bg` class on `<body>` after mount.
- `curl -sSL http://localhost:8080/` still shows zero references to `/admin/assets/*` (isolation intact).
- Visual smoke via preview: card is centered, logo shows, no console errors, Sign In button navigates to `/admin`.

## Out of scope

- Real authentication (no Cloud, no session, no form submission handling).
- Signup / password-reset / lock-screen pages (can be re-added later per the same pattern if needed).
