# LFB-102 — Public shell — execution report

Batch: LFB-102 (Public shell) of approved Public Frontend Plan v0.3
Mode: bounded Build Mode. Implement, verify, document, STOP.
Commit before batch: `5a72bfac234dc8509c41e463fd89cf6fc22cd81d`
Commit after batch: recorded by the platform on completion of this turn.

## 1. Scope delivered

Reusable public shell, rebuilt in React 19 + Tailwind CSS 4 from the approved
reference visual language. No template import, no vendor runtime, no
Bootstrap/jQuery/Slider Revolution, no new dependency, no package/lockfile
change.

Components created under `src/components/public/layout/`:

| Component | Role |
| --- | --- |
| `PublicShell` | Skip link, header, single `<main>`, optional banner, footer |
| `PreHeaderStrip` | Thin dark strip above header (geometry only, no demo contact data) |
| `PublicHeader` | 105px desktop nav row, 50px logo optical area, available-only nav |
| `PublicNavItem` | Uppercase nav link, desktop and mobile variants, active state |
| `MobileNavigation` | Accessible disclosure: `aria-expanded`/`aria-controls`, Escape, focus return |
| `Breadcrumbs` | Typed breadcrumb trail, current page marked `aria-current="page"` |
| `PageTitle` | Inner-page banner foundation carrying the page `h1` |
| `PublicFooter` | Footer band + bottom bar, no invented contact or legal claims |
| `FooterColumn` | Footer widget column, omitted when it has no available link |
| `LegalLinks` | Bottom-bar legal nav, omitted while legal routes do not exist |
| `index.ts` | Barrel export |

## 2. Changed files (SHA-256, bytes)

| File | SHA-256 | Bytes | Change |
| --- | --- | --- | --- |
| `src/components/public/layout/PublicShell.tsx` | `3755198bad94969d51bb7e087c50f24410868e2d7ac58d8cbb0dda0e813c43dd` | 1279 | new |
| `src/components/public/layout/PublicHeader.tsx` | `71059f53a153e351109fb3299175aab0b18a7f3dbc6f35020dff2a3f7b763ee3` | 2129 | new |
| `src/components/public/layout/PreHeaderStrip.tsx` | `dfe786699cf1ab6010bc5e12bbb71772fead065df16798cd3cd3ce5541b539a7` | 793 | new |
| `src/components/public/layout/PublicNavItem.tsx` | `bc0acddb6e83c373dff71c74b237525aa0e93177dbc6127f5cb181ad865154d0` | 1295 | new |
| `src/components/public/layout/MobileNavigation.tsx` | `09a68232db60e839d31144d2a97b470d152b33e92da0642ced5794d3ef57e066` | 2683 | new |
| `src/components/public/layout/PublicFooter.tsx` | `e0695f86b4f0585f90470205294bcbf725323cd8b6ce067fbfbed45d9c71d394` | 1716 | new |
| `src/components/public/layout/FooterColumn.tsx` | `da054608dc31f3fa9ee35dba598271e20f5636d99c43d422e3f5c6660444a038` | 1063 | new |
| `src/components/public/layout/LegalLinks.tsx` | `c135f191547494edbf6e1e15e43c3c150ae0816e77aa0297a7fbad39b54e1468` | 833 | new |
| `src/components/public/layout/Breadcrumbs.tsx` | `f45a13b4fd3ff88e12de6490d1d33c2d761d82baa62ef44030dc8410d72b2170` | 1483 | new |
| `src/components/public/layout/PageTitle.tsx` | `bb64b720a2b1a61cf6d9b763c0630a534d10d0e8df67f6be3b24f47a5167c5a0` | 765 | new |
| `src/components/public/layout/index.ts` | `8464c232d474f3941fb2e65f66e5d36dfdee5e61b42125580172bf92736aaebd` | 491 | new |
| `src/lib/public/routes-map.ts` | `6b656d8cf009e9445e49dfafee29b2ad718505cefd7e1a536226b2c96c055b00` | 4025 | edited (typed nav config) |
| `src/routes/index.tsx` | `1a4c6a7835de73ee3c4a89dbb8c4d04bfd68786f6e75f5fc876445ea4431510c` | 1461 | edited (wired through shell) |
| `src/styles.css` | `bc32465cd37d2c4c299ba353bc238dfde2841e4f514a7b1142947ec069ade458` | 10629 | edited (shell tokens only, additive) |

`src/routes/__root.tsx` was in scope but required no change. No generated
route-tree change occurred. No file outside the approved write set was touched.

## 3. Shell-specific tokens added to `src/styles.css`

All additive; no existing LFB-101 token was modified.

| Token | Value | Justification |
| --- | --- | --- |
| `--spacing-vz-nav-row` | 6.5625rem (105px) | Measured desktop navigation row height |
| `--spacing-vz-nav-row-sm` | 4.5rem (72px) | Compact row below `lg`, source header collapses |
| `--spacing-vz-nav-item` | 1.0625rem (17px) | Measured nav item horizontal rhythm |
| `--spacing-vz-logo` | 3.125rem (50px) | Measured logo optical max-height |
| `--spacing-vz-preheader` | 2.75rem (44px) | Pre-header strip height |
| `--spacing-vz-banner` | 8.75rem (140px) | Inner banner vertical padding, desktop |
| `--spacing-vz-banner-sm` | 5rem (80px) | Inner banner vertical padding, small screens |

## 4. Measured verification (Playwright, localhost:8080)

| Viewport | Pre-header | Nav row | Logo | Content band | h1 | main | Horizontal overflow | Console errors |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 320 | hidden (0) | 72px | 50px | 320px (15px gutters) | 1 | 1 | none | none |
| 768 | 44px | 72px | 50px | 768px (15px gutters) | 1 | 1 | none | none |
| 1280 | 44px | 105px | 50px | 1200px | 1 | 1 | none | none |

Nav item padding measured at 17px per side on desktop.

## 5. Accessibility evidence

- Mobile navigation at 320 and 768: toggle click sets `aria-expanded="true"`,
  the panel `nav[aria-label="Mobiele navigatie"]` mounts, and focus moves to the
  first link ("Home").
- Escape: `aria-expanded` returns to `"false"`, the panel is unmounted (so its
  links leave the tab order) and focus returns to the toggle button
  (`aria-label="Menu openen"`).
- Toggle button is 44x44px and has an accessible name in both states.
- Skip link `Naar hoofdinhoud` becomes visible on focus (top 16px) with a
  3px solid focus outline from the LFB-101 focus token.
- Landmarks: exactly one `<main id="hoofdinhoud">`, one `<h1>`, labelled
  `header`/`footer` regions, `nav` elements labelled "Hoofdnavigatie",
  "Mobiele navigatie", "Kruimelpad", "Juridische links".
- Breadcrumb current page uses `aria-current="page"`; active nav link likewise.

## 6. Link and content integrity

- Rendered anchors on `/`: `#hoofdinhoud`, `/`, `/` — no broken link, no link
  into `/admin`.
- Navigation is driven by a typed configuration in `src/lib/public/routes-map.ts`.
  Entries are discriminated `AvailableNavItem` / `PlannedNavItem`; only
  `available: true` entries are rendered, and their `to` value is typed as
  `Exclude<keyof FileRoutesByPath, "/admin...">`, so an unavailable or admin
  path cannot compile into a public link.
- No address, phone, e-mail, opening hours, mandate, fee, legal text, service
  claim or ministry sub-line is rendered. `VZ Juspol Gen` appears only as the
  development/project label, with the footer bottom bar stating explicitly that
  it is a project designation in development.
- Content records remain untouched and read-only: `identity: null`, all record
  sets empty.

## 7. Build and typecheck

- `bunx tsgo --noEmit`: exit 0, no output.
- Build log latest entry: `build OK`.

## 8. Admin isolation

`git diff --stat` over `src/routes/admin*`, `src/lib/admin`, `public/admin`:
zero lines. All public styling stays inside the `.vz-public` scope applied by
`PublicShell`. No admin route, asset, library or style was read into or written
from this batch.

## 9. Deviations

| ID | Deviation | Reason |
| --- | --- | --- |
| D-102-1 | Inner banner renders a flat ink background instead of the source photographic background with dark overlay | No approved image record exists; no demo image may be used |
| D-102-2 | Pre-header carries a neutral descriptive line and language label instead of the source phone/e-mail/social/CTA row | Contact and social records do not exist; geometry retained, content truthfully omitted |
| D-102-3 | Footer renders one text column plus available link columns instead of the four-widget source footer | Footer widget content is governed and not yet approved |
| D-102-4 | Only `Home` is currently exposed in navigation | All other public routes are planned but not built; exposing them would create broken links |

## 10. Minor polish recorded for the later enhancement round

- Header shadow/sticky behaviour on scroll not yet implemented.
- Mobile panel open/close transition is instant (no height animation).
- Footer column typography rhythm may need a final pass once real link sets exist.
- Banner will need revisiting once an approved image and overlay ratio exist.

## 11. Screenshots

- `/tmp/browser/lfb102-320.png`, `lfb102-320-menu.png`
- `/tmp/browser/lfb102-768.png`, `lfb102-768-menu.png`
- `/tmp/browser/lfb102-1280.png`

## 12. Batch boundary

No later batch was started. LFB-103 and beyond, and LFB-111 governance-input
storage, remain PLANNED / NOT RELEASED. No Cloud, Database, Supabase, backend,
auth, GitHub, deployment or publication action was taken.

Verdict: LFB-102 COMPLETE — READY FOR ACT-CHATGPT REVIEW
