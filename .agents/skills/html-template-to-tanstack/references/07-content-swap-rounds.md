# Phase 7 — Brand & content swap rounds

Goal: turn the demo-content port into the user's actual brand. Freeform — no fixed round structure. The user decides what gets swapped and in what order.

## Round protocol

Each round is **plan → approve → execute**, regardless of size.

1. The user states the swap (e.g. "change accent to X, brand name to Y" or "rewrite all blog copy").
2. The agent calls `plan--create` listing exact files, exact strings, exact values that will change. Flag ambiguities.
3. User approves.
4. Agent executes with surgical edits (prefer global find/replace for color tokens; route-by-route edits for copy).
5. Agent verifies (preview + targeted screenshot) and reports.

## Common swap categories (use as a menu, not a script)

- **Accent / color tokens** — global find/replace across `public/css/*` AND `public/svg/*`. Verify with `grep -r '<old-hex>' public/`.
- **Brand name + logo** — string replace; if the user provides an SVG/PNG, drop into `public/svg/` and update the `<svg>` block in every header/footer.
- **Contact info** — phone, address, email, social links. Update every route's footer + the dedicated contacts page + map iframe.
- **Hero/marketing copy** — page-by-page.
- **Services / pricing** — update markup; if currency changes, sweep all numeric literals.
- **Team / testimonials / blog** — replace photos + names + bios.
- **Map** — swap the Google Maps iframe `src` to the new location.
- **Components** — carousels, modals, CTA backgrounds. May need CSS overrides written into `public/css/preload.min.css` (or equivalent) with `!important` to beat the template's own CSS.

## Rules

- Never invent brand details. If the user didn't specify a value, ask before writing it.
- Keep template design patterns intact unless the user explicitly says otherwise.
- Apostrophes in `BODY_HTML` string literals must be escaped or the file must use double-quote outer strings — Python/JS string syntax errors here are the #1 stall in this phase.
- After any color sweep, also check inline `<svg fill="...">` and `<style>` blocks inside `BODY_HTML`.

## Gate

User explicitly approves each round before the next starts.
