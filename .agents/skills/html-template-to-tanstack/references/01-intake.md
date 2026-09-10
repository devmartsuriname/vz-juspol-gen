# Phase 1 — Intake

Goal: know exactly what the upload contains before writing any code.

## Steps

1. Locate the upload. ZIPs land at `user-uploads://<name>.zip` and are mounted read-only at `/mnt/user-uploads/<name>.zip`. Copy to `/tmp/intake/` and unzip there — never extract into the project tree.
2. Guard against `.git`: `find /tmp/intake -name .git -print -quit`. If anything is found, exclude it from any later copy.
3. Inventory:
   - HTML pages: `find /tmp/intake -name '*.html' -not -path '*/node_modules/*'`
   - CSS: `find /tmp/intake -name '*.css'`
   - JS: `find /tmp/intake -name '*.js'`
   - Images: count by extension under `img/`, `images/`, `assets/`
   - Fonts: `*.woff`, `*.woff2`, `*.ttf`, `*.otf`, `*.svg` (icon fonts)
   - SVG icons: `*.svg` outside font dirs
4. Detect frameworks by grepping CSS/JS heads:
   - Bootstrap → `bootstrap` in any css filename or class prefixes (`container-fluid`, `col-lg-*`)
   - Swiper → `swiper` in css/js
   - AOS → `aos.css` / `data-aos=` attributes
   - GSAP → `gsap` in js
   - jQuery → `jquery` in js
5. Spot placeholder imagery: `grep -rh 'placeholder' /tmp/intake --include='*.html' | wc -l`. If high, flag that real images must come from a demo URL or be generated.
6. Write `/tmp/intake/INVENTORY.md` listing: pages, css files, js files, image count, fonts, detected frameworks, placeholder ratio.

## Gate

Report the inventory to the user in chat (page list + counts + missing-image situation) and ask whether a live demo URL exists for phase 5. Do not start phase 2 until the user confirms scope.
