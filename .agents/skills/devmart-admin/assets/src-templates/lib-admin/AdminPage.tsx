import { useEffect, useRef, useState } from "react";

/**
 * Base vendor scripts required by every Devmart Admin page.
 * Order matters: config.js first (sets window.config), then vendor.min.js
 * (Bootstrap, SimpleBar, ApexCharts, Iconify, node-waves, ...), then app.js
 * (sidebar toggle, dropdown-hover, dark-mode switch, ...).
 */
const BASE_SCRIPTS = [
  "/admin/assets/js/config.js",
  "/admin/assets/js/vendor.min.js",
  "/admin/assets/js/app.js",
];

/**
 * Cache of fetched script source code. We execute each script wrapped in an
 * IIFE via `new Function` so top-level `const`/`let` declarations
 * (e.g. `const Components = ...` in vendor.min.js) don't collide across
 * SPA navigations. A plain <script src> would re-declare and throw
 * "Identifier 'Components' has already been declared".
 */
const scriptCache = new Map<string, Promise<string>>();
function fetchScript(src: string): Promise<string> {
  let p = scriptCache.get(src);
  if (!p) {
    p = fetch(src).then((r) => (r.ok ? r.text() : ""));
    scriptCache.set(src, p);
  }
  return p;
}

type Props = {
  bodyHtml: string;
  /** Extra page-specific scripts, e.g. ["/admin/assets/js/pages/chart.js"]. */
  pageScripts?: string[];
  /**
   * Classes to add to <body> while this page is mounted. Mirrors Darkone's
   * per-page body classes (e.g. `authentication-bg` on sign-in / 404) which
   * drive full-page centering + backgrounds.
   */
  bodyClass?: string;
};

/**
 * Renders one Darkone HTML page inside the .devmart-admin scope and
 * re-injects the vendor + app scripts on every mount so vanilla JS
 * (Bootstrap dropdowns, SimpleBar, ApexCharts, Iconify web component)
 * re-initialises after client-side navigation.
 *
 * `display: contents` on the wrapper is critical: it keeps the Darkone
 * markup as if it were at document root, so its full-viewport `.app-wrapper`
 * layout still works.
 */
export function AdminPage({ bodyHtml, pageScripts = [], bodyClass }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Gate render until after mount: SSR emits an empty shell so React never
  // diffs against DOM that vendor JS is about to mutate. Removes the
  // dev-only hydration-mismatch warnings for Darkone markup.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!bodyClass) return;
    const classes = bodyClass.split(/\s+/).filter(Boolean);
    document.body.classList.add(...classes);
    return () => document.body.classList.remove(...classes);
  }, [bodyClass]);

  useEffect(() => {
    if (!mounted) return;
    const scripts = [...BASE_SCRIPTS, ...pageScripts];
    let cancelled = false;

    // Darkone's config.js runs `JSON.parse(sessionStorage.getItem(KEY))`
    // without a try/catch — a stale or malformed entry throws SyntaxError.
    // Sanitise once up-front so the vendor script stays untouched.
    try {
      const KEY = "__DARKONE_CONFIG__";
      const raw = sessionStorage.getItem(KEY);
      if (raw !== null) {
        try {
          JSON.parse(raw);
        } catch {
          sessionStorage.removeItem(KEY);
        }
      }
    } catch {
      /* sessionStorage unavailable (sandboxed iframe) — ignore */
    }

    // Darkone's app.js / page scripts register initialisers inside
    // `document.addEventListener("DOMContentLoaded", ...)`. On SPA navigation
    // DOMContentLoaded already fired long ago, so those listeners never run.
    // Patch addEventListener to invoke DOMContentLoaded callbacks immediately
    // while our scripts execute, then restore.
    const origAdd = document.addEventListener.bind(document);
    (document as any).addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions
    ) {
      if (
        type === "DOMContentLoaded" &&
        document.readyState !== "loading" &&
        typeof listener === "function"
      ) {
        try {
          (listener as EventListener)(new Event("DOMContentLoaded"));
        } catch (e) {
          // Known-benign vendor init failures (SVG.js's `c.Doc` parser prep,
          // libraries that expect globals we don't bundle) do not affect
          // Darkone functionality. Log at debug so the console stays clean.
          console.debug("[AdminPage] DOMContentLoaded init skipped", e);
        }
        return;
      }
      return origAdd(type, listener, opts);
    };

    (async () => {
      for (const src of scripts) {
        if (cancelled) return;
        const code = await fetchScript(src);
        if (cancelled || !code) continue;
        try {
          // Function-scoped execution: isolates top-level const/let so
          // repeat execution on SPA navigation doesn't collide.
          new Function(`${code}\n//# sourceURL=${src}`)();
        } catch (err) {
          // Surface but don't break navigation.
          console.error(`[AdminPage] script failed: ${src}`, err);
        }
      }
      // Restore once all scripts have finished loading.
      (document as any).addEventListener = origAdd;
    })();

    return () => {
      cancelled = true;
      (document as any).addEventListener = origAdd;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bodyHtml, mounted]);

  return (
    <div
      ref={containerRef}
      style={{ display: "contents" }}
      dangerouslySetInnerHTML={{ __html: mounted ? bodyHtml : "" }}
    />
  );
}