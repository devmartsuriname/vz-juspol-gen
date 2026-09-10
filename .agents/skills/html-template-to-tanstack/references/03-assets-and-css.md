# Phase 3 — Assets & CSS

Goal: the route files reference `/css/...`, `/js/...`, `/fonts/...`, `/svg/...`, `/img/...` — make those URLs resolve.

## Copy into `public/`

From the unzipped template:

```bash
mkdir -p public/css public/js public/fonts public/svg public/img
rsync -a --exclude='.git' --exclude='.git/**' /tmp/intake/<template>/css/  public/css/
rsync -a --exclude='.git' --exclude='.git/**' /tmp/intake/<template>/js/   public/js/
rsync -a --exclude='.git' --exclude='.git/**' /tmp/intake/<template>/fonts/ public/fonts/
rsync -a --exclude='.git' --exclude='.git/**' /tmp/intake/<template>/svg/  public/svg/
rsync -a --exclude='.git' --exclude='.git/**' /tmp/intake/<template>/img/  public/img/
```

Folder names vary (`Img/`, `assets/img/`, `images/`); adjust per inventory.

## Tailwind v4 conflict — disable preflight

Lovable templates ship Tailwind v4 with preflight, which resets `<header>`, `<ul>`, etc., and visibly breaks Bootstrap-based themes (classic symptom: header nav wraps to a second line → "double header"). In `src/routes/__root.tsx` (TanStack) or `src/main.tsx` (Vite), comment out the `import "./styles.css"` / `import appCss from "../styles.css?url"` and note why. See `assets/root.tanstack.template.tsx`.

If the user later wants Tailwind utilities back, re-enable styles.css with preflight disabled via `@layer base` overrides — not by deleting the comment.

## `display:contents` wrapper

Wrap `dangerouslySetInnerHTML` in `<div style={{display:"contents"}}>` so the injected `<header>/<main>/<footer>` participate in the document flow without a wrapping `<div>` box affecting layout.

## Gate

Open each route in the preview. Network panel: zero 404s for `/css/*`, `/fonts/*`, `/svg/*`. Visual: header renders on one line, fonts loaded, icons visible.
