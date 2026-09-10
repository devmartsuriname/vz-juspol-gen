import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * Devmart Admin layout route.
 *
 * CSS isolation contract:
 *   - Loads Darkone's compiled bundles ONLY on `/admin/*` via `head.links`.
 *     Sibling routes (e.g. `/`) never fetch a single byte of admin CSS.
 *   - Wraps children in `<div class="devmart-admin">` so future scoped resets
 *     have a stable hook. Uses `display: contents` so Darkone's own
 *     `.app-wrapper` still owns the viewport.
 */
export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" },
      { rel: "stylesheet", href: "/admin/assets/css/vendor.min.css" },
      { rel: "stylesheet", href: "/admin/assets/css/icons.min.css" },
      { rel: "stylesheet", href: "/admin/assets/css/style.min.css" },
      { rel: "stylesheet", href: "/admin/assets/vendor/jsvectormap/css/jsvectormap.min.css" },
      // Neutralises Tailwind preflight leakage (img display:block etc.)
      // inside `.devmart-admin`. Must load AFTER style.min.css.
      { rel: "stylesheet", href: "/admin/assets/css/devmart-admin-scope.css" },
      { rel: "icon", href: "/admin/assets/images/favicon.ico" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="devmart-admin" style={{ display: "contents" }}>
      <Outlet />
    </div>
  );
}