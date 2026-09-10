# Common pitfalls

Battle-tested lessons. Read before phase 3 and again before phase 6.

## Tailwind v4 preflight breaks Bootstrap headers

Symptom: navigation wraps onto two lines, "double header".
Fix: comment out the `styles.css` import in `__root.tsx` (TanStack) or `main.tsx` (Vite). See `assets/root.tanstack.template.tsx`.

## Missing per-page minified JS served as HTML

Symptom: console shows `Unexpected token '<'` from `/js/<page>.min.js`.
Cause: file isn't in the ZIP. Vite dev server returns the SPA shell for unknown URLs, so the script tag downloads HTML and parses it as JS.
Fix: `curl -I http://localhost:8080/js/<file>`. If 404 or text/html, delete the reference from `PAGE_SCRIPTS` and `head().scripts`. Don't leave dead references.

## Swiper / template CSS fight

Symptom: custom Swiper padding/pagination is ignored.
Cause: template's own CSS loads after the overrides.
Fix: add overrides to `public/css/preload.min.css` (or a dedicated overrides file loaded LAST) with `!important` on `padding-bottom`, `position`, `bottom`.

## CTA background images 404 silently

Symptom: empty section where a hero/cta should sit.
Cause: CSS references `/img/<section>/bg.jpg` but the ZIP didn't ship it.
Fix: grep every CSS file for `url(/img/...)`, verify each file exists on disk. Scrape from demo or generate.

## Apostrophes in `BODY_HTML` string literals

Symptom: build fails with "unexpected token" in a route file.
Cause: source HTML contains `'`/`'`/`'` inside a single-quoted JS string.
Fix: use double-quote outer string, OR run the extractor with `--escape-quotes` (the bundled `extract_body.py` does this).

## `dangerouslySetInnerHTML` wrapping changes layout

Symptom: extra div pushes everything down or breaks flex.
Fix: always use `<div style={{display:"contents"}} dangerouslySetInnerHTML={...} />`.

## Vanilla JS only runs on first load

Symptom: nav from / to /about — sliders dead on /about until hard refresh.
Fix: the `useEffect` script re-appender pattern in `references/04-js-rehydration.md`. Not optional.

## Tailwind utility classes inside `BODY_HTML` don't apply

If preflight is disabled, utility classes still work — but if the JIT scanner doesn't see the class name in source files, it won't generate it. `BODY_HTML` is a string literal, so the scanner finds the classes. If a class is built at runtime, safelist it.

## `.git` inside the upload

Symptom: copying the unzipped template into the project corrupts the project's repo.
Fix: always `find /tmp/intake -name .git -print -quit` before any copy. Use `rsync --exclude='.git' --exclude='.git/**'`.
