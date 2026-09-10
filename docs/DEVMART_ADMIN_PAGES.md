# Devmart Admin — Page Catalogue

After the pre-Akte-2 cleanup, the only active admin route is the
**Dashboard** at `/admin`, backed by a trimmed shell (topbar, sidebar with
one "Dashboard" entry, footer) and a placeholder card in the page body.

| URL                  | HTML source                              | Route file                              |
| -------------------- | ---------------------------------------- | --------------------------------------- |
| `/admin`             | `src/lib/admin/pages/index.html`         | `src/routes/admin/index.tsx`            |
| `/admin/auth-signin` | `src/lib/admin/pages/auth-signin.html`   | `src/routes/admin/auth-signin.tsx`      |

The sign-in page is a **static demo** (no authentication logic). It renders
standalone with `bodyClass="authentication-bg"` (no sidebar/topbar), and the
form submits to `/admin`. The landing page CTA (`/`) links here.

## Building new admin pages

Two supported approaches — pick per page.

### 1. React-first (preferred for product pages)

Build a normal React component under `src/routes/admin/<slug>.tsx` and
compose it from the wrapper library (`AdminChart`, `AdminTable`,
`AdminDatepicker`, `AdminScroll`). See `docs/DEVMART_ADMIN_LIBRARY.md`.

The `admin.tsx` layout route already loads the Darkone CSS bundle, so any
Bootstrap / Darkone class (`.card`, `.btn`, `.row`, ...) works out of the
box.

### 2. Re-port a Darkone template (for a 1:1 demo page)

1. Extract the `<body>` HTML of the Darkone dist page into
   `src/lib/admin/pages/<slug>.html`.
2. Rewrite asset URLs to `/admin/assets/...` and internal links to
   TanStack paths.
3. Add a `meta.ts` entry.
4. Create the route:

```tsx
// src/routes/admin/<slug>.tsx
import { createFileRoute } from "@tanstack/react-router";
import { AdminPage } from "../../lib/admin/AdminPage";
import { adminPageMeta } from "../../lib/admin/pages/meta";
import bodyHtml from "../../lib/admin/pages/<slug>.html?raw";

const meta = adminPageMeta["<slug>"];

export const Route = createFileRoute("/admin/<slug>")({
  head: () => ({
    meta: [
      { title: meta.title },
      { name: "description", content: meta.description },
    ],
  }),
  component: () => (
    <AdminPage bodyHtml={bodyHtml} pageScripts={[/* optional vendor scripts */]} />
  ),
});
```

The bulk Darkone port (46 pages) was executed as a validation pass and
then rolled back during cleanup; the underlying assets under
`public/admin/assets/` remain in place so this workflow is always
available.
