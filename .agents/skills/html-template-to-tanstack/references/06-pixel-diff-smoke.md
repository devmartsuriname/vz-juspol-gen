# Phase 6 — Smoke + pixel-diff

Goal: prove every ported route renders without console errors, without 404s, and visually matches the source (when a demo URL exists).

## Run

```bash
python /tmp/pixel_diff.py \
  --base http://localhost:8080 \
  --demo https://demo.example.com/theme-name/ \
  --routes /,/about,/services,/contact \
  --out /tmp/diff/
```

Without `--demo`, the script just captures local screenshots + console + network logs per route (smoke only).

The script writes:

- `/tmp/diff/<route>/local.png`, `<route>/demo.png`, `<route>/diff.png`
- `/tmp/diff/<route>/console.log` — any browser console output
- `/tmp/diff/<route>/network.log` — any non-2xx requests
- `/tmp/diff/REPORT.md` — summary table

## Triage order

1. **Console errors** first — most often `Unexpected token '<'` from a missing JS file served as HTML (see phase 4).
2. **404s** — missing CSS/image/font; fix path or scrape.
3. **Layout breaks** — usually Tailwind preflight back on (see phase 3) or a missing `display:contents` wrapper.
4. **Visual diffs** — accept small font-rendering deltas; flag structural diffs (missing section, wrong order) and re-extract the source page.

## Gate

`REPORT.md` shows zero console errors and zero 404s on every route. User reviews the screenshot diffs and signs off before phase 7.
