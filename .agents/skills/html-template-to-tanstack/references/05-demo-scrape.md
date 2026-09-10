# Phase 5 — Real imagery (optional)

Goal: replace placeholder images with real assets — only if the user supplies a live demo URL or provides their own photos. Otherwise skip and leave placeholders for phase 7.

## When to run

- User pastes a demo URL (e.g. an Envato/ThemeForest preview): run `scripts/scrape_demo_assets.py`.
- User uploads photos: copy into `public/img/` and rewrite references.
- Neither: leave placeholders untouched. Do NOT silently generate brand imagery — that is a phase-7 decision.

## What to scrape

```bash
python /tmp/scrape_demo_assets.py \
  --url https://demo.example.com/theme-name/ \
  --out public/ \
  --paths img,css,js,fonts,svg
```

The script:
1. Loads the demo home page, follows internal nav links one level deep.
2. Parses each page for `<img src>`, `<source srcset>`, inline `style="background-image:url(...)"`, and CSS `url(...)` from any linked stylesheet.
3. Downloads anything that the local `public/` is missing into the matching subfolder.
4. Skips external CDNs unless `--include-cdn` is set.

## Verifying coverage

After scraping:

```bash
# every public/img reference in CSS resolves on disk
python -c "
import re, pathlib
roots = pathlib.Path('public')
for css in roots.rglob('*.css'):
    for url in re.findall(r'url\(([^)]+)\)', css.read_text()):
        u = url.strip('\"\\' ').split('?')[0]
        if u.startswith('/'):
            p = roots / u.lstrip('/')
            if not p.exists(): print('MISSING', u, 'in', css)
"
```

## Gate

Zero `MISSING` entries from the verify script. Every `<img>` in the rendered DOM has a real `naturalWidth > 0`.
