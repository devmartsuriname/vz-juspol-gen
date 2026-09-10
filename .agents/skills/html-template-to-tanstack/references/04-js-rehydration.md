# Phase 4 — JS rehydration

Goal: vanilla JS sliders, mobile menus, modals, scroll effects re-initialize after SPA navigation, not just on first hard load.

## Pattern

Each route owns a `PAGE_SCRIPTS` array. On mount, append a fresh `<script>` for each. On unmount, remove them. This forces re-execution every time the route mounts.

```tsx
const PAGE_SCRIPTS = ["/js/common.min.js", "/js/<page>.min.js"];

useEffect(() => {
  const added: HTMLScriptElement[] = [];
  PAGE_SCRIPTS.forEach((src) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = false; // preserve execution order
    document.body.appendChild(s);
    added.push(s);
  });
  return () => { added.forEach((s) => s.remove()); };
}, []);
```

The `head()` `scripts` array (TanStack) handles first-paint SSR; the `useEffect` handles SPA nav. Both are needed.

## Library-specific notes

- **Swiper**: lazy-load `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js` if the template's css/js doesn't ship it. Initialize inside `useEffect` after the script loads, not at module scope.
- **AOS**: call `AOS.refresh()` after the route mounts.
- **jQuery plugins**: ensure jQuery is in `common.min.js` and loaded first (`async = false`).
- **GSAP ScrollTrigger**: call `ScrollTrigger.refresh()` after mount.

## Broken JS files

If a per-page script (e.g. `services.min.js`) was not in the ZIP, the browser receives a 404 — but Vite dev server serves the SPA `index.html` for unknown paths, so the script tag downloads HTML and throws `Unexpected token '<'`. **Delete the reference**, don't keep it. Confirm by `curl -I http://localhost:8080/js/<file>` — if it returns HTML or 404, drop from `PAGE_SCRIPTS` and the `head().scripts` array.

## Gate

Click through every nav link. Sliders auto-play, mobile menu opens, modals trigger. Zero console errors. Zero 404s in network.
