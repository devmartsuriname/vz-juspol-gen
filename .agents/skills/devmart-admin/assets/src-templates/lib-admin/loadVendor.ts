/**
 * Vendor loader for Devmart Admin React wrappers.
 *
 * Loads a script or stylesheet from /admin/assets/... exactly once per
 * page-load, regardless of how many wrapper instances mount. Scripts are
 * injected as regular <script src> tags (unlike AdminPage, which sandboxes
 * raw template scripts in a `new Function` scope) so the vendor's global
 * (window.ApexCharts, window.gridjs, window.flatpickr, window.SimpleBar,
 * ...) is exposed for the wrapper to use.
 */
const scriptPromises = new Map<string, Promise<void>>();
const stylePromises = new Map<string, Promise<void>>();

export function loadScript(src: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  let p = scriptPromises.get(src);
  if (p) return p;
  p = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-devmart-vendor="${src}"]`,
    );
    if (existing) {
      if (existing.dataset.loaded === "1") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(src)));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.dataset.devmartVendor = src;
    s.addEventListener("load", () => {
      s.dataset.loaded = "1";
      resolve();
    });
    s.addEventListener("error", () => reject(new Error(src)));
    document.head.appendChild(s);
  });
  scriptPromises.set(src, p);
  return p;
}

export function loadStyle(href: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  let p = stylePromises.get(href);
  if (p) return p;
  p = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLLinkElement>(
      `link[data-devmart-vendor="${href}"]`,
    );
    if (existing) {
      if (existing.dataset.loaded === "1") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error(href)));
      return;
    }
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    l.dataset.devmartVendor = href;
    l.addEventListener("load", () => {
      l.dataset.loaded = "1";
      resolve();
    });
    l.addEventListener("error", () => reject(new Error(href)));
    document.head.appendChild(l);
  });
  stylePromises.set(href, p);
  return p;
}

export async function loadAll(items: string[]): Promise<void> {
  for (const item of items) {
    if (item.endsWith(".css")) await loadStyle(item);
    else await loadScript(item);
  }
}