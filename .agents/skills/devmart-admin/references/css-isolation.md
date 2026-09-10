# CSS Isolation Contract

The admin is Bootstrap 5; the frontend is Tailwind. They must not bleed.

## Rules

1. Admin CSS bundles load ONLY on `/admin/*`, via `admin.tsx` `head.links`:
   - `/admin/assets/css/vendor.min.css`
   - `/admin/assets/css/icons.min.css`
   - `/admin/assets/css/style.min.css`
   - `/admin/assets/vendor/jsvectormap/css/jsvectormap.min.css`
   - `/admin/assets/css/devmart-admin-scope.css`  **(last)**
2. All admin markup lives inside `<div class="devmart-admin" style="display: contents">`.
3. `devmart-admin-scope.css` neutralises Tailwind Preflight inside
   `.devmart-admin` — restores `img/svg/canvas` to `inline-block`, resets
   `button` to browser defaults using `:where()` (specificity 0), keeps
   `.card-header` button groups on one line.
4. Vendor JS (`config.js`, `vendor.min.js`, `app.js`, per-page scripts) is
   injected only from `AdminPage`. Nothing runs on `/`.
5. Tailwind stays global for the frontend — no admin-facing changes to
   `src/styles.css`.

## Verify

```bash
curl -s http://localhost:8080/          | grep -c admin/assets   # 0
curl -s http://localhost:8080/admin     | grep -c admin/assets   # > 0
```

## Why `display: contents` on `.devmart-admin`

Darkone's `.app-wrapper` expects to be a viewport-level flex container. A
regular block wrapper collapses that layout. `display: contents` removes the
wrapper from the box tree while keeping the class hook for scoping.