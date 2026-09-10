# Per-project checklist

Copy to `.lovable/template-port-checklist.md` at the start of a port and tick as you go.

## Phase 0 — Stack detection
- [ ] Detected stack: ☐ TanStack Start ☐ Vite-React

## Phase 1 — Intake
- [ ] Unzipped to /tmp/intake
- [ ] No `.git` inside the upload
- [ ] INVENTORY.md written (pages, css, js, fonts, images, frameworks)
- [ ] User confirmed scope + demo URL (if any)

## Phase 2 — Scaffold routes
- [ ] Every HTML page → route file
- [ ] Typecheck clean
- [ ] Each route has unique title/description

## Phase 3 — Assets & CSS
- [ ] public/{css,js,fonts,svg,img} populated
- [ ] Tailwind preflight disabled in root layout
- [ ] Zero 404s on css/font/svg in network

## Phase 4 — JS rehydration
- [ ] Per-route useEffect script loader in place
- [ ] Sliders/menus work after SPA nav
- [ ] Dead script references removed

## Phase 5 — Real imagery
- [ ] Demo scraped OR placeholders intentionally left
- [ ] Verify script reports zero MISSING

## Phase 6 — Smoke + pixel-diff
- [ ] REPORT.md: zero console errors, zero 404s
- [ ] User reviewed screenshot diffs

## Phase 7 — Brand & content swap rounds
- [ ] Round 1: ____________________ (planned ☐ approved ☐ executed ☐ verified ☐)
- [ ] Round 2: ____________________ (planned ☐ approved ☐ executed ☐ verified ☐)
- [ ] Round 3: ____________________ (planned ☐ approved ☐ executed ☐ verified ☐)

## Phase 8 — Hand-off
- [ ] Sitemap + robots.txt
- [ ] All routes have unique SEO meta
- [ ] Publish checklist green
