# Release baseline — Track A (public information)

Prepared under `VZ JUSPOL GEN MAIN RELEASE BASELINE AND TRACK-A PREPARATION 001`
(ND-020, 2026-09-22). Track A is a public-information and stakeholder-facing
release. Track B (citizen portal, application wizard, login/OTP, uploads,
case status, operational backoffice) is not released and is not part of this
baseline.

## Baseline identities

| Item | Value |
| --- | --- |
| Repository | `vz-juspol-gen`, branch `main` |
| Pre-batch HEAD | `d4baa5464918b89d5303fe5b84003d5e22f42e05` (identical on `origin/main` at batch start) |
| Track-A commit | see the batch completion report (`09-Reports/02-Claude-Code/...COMPLETION-001.md`) |
| Runtime | Node 22.x (Hostinger) / Node 24.x (local verification), Bun 1.3.x for install/build |
| Framework | TanStack Start + Vite 8 + Nitro 3 (`nitro` `3.0.260603-beta`) |

## Released public routes (Track A)

Static routes: `/`, `/over-ons`, `/diensten`, `/aanvraaghulp`,
`/documentenlijsten`, `/veelgestelde-vragen`, `/nieuws`, `/instanties`,
`/contact`, `/privacy`, `/disclaimer`.

Generated routes: `/diensten/$categorie` (one per governed category) and
`/diensten/$categorie/$slug` (one per governed service), `/nieuws/$slug`.
The route sources are `src/routes/*.tsx`; the content source is
`src/content/vz-content.ts`. All public routes are server-rendered Liviza
template HTML and carry `robots: noindex, follow` (unchanged by this batch).

Direct entry to an unknown path returns the application 404 page.

## What Track A does not contain

- No form, login, one-time code, account, session or e-mail transport.
- No application submission, upload, storage, case status lookup or saved
  draft. The Aanvraaghulp is a client-side decision aid only; it issues no
  network request.
- No link from the public header, footer or content to `/inloggen`,
  `/aanvraag/*`, `/mijn/*`, `/status` or `/admin/*`. Those route sources exist
  only in the developer working tree as unreleased Track-B work and are not
  part of the committed tree.
- No environment variable is read by application source.

## Runtime and build

The Nitro preset is pinned in `nitro.config.ts`:

```ts
import { defineConfig } from "nitro/config";
export default defineConfig({ preset: "node-server" });
```

Without that file the Lovable Vite wrapper only supplies
`defaultPreset: "cloudflare-module"`, so a plain build would emit a Worker
bundle instead of the Node server.

```sh
bun install --frozen-lockfile
bun run build                      # emits .output/ (preset node-server)
cat .output/nitro.json             # "preset": "node-server", "serverEntry": "server/index.mjs"
PORT=3000 HOST=0.0.0.0 node .output/server/index.mjs
```

The server entry reads `PORT`/`HOST` (also `NITRO_PORT`/`NITRO_HOST`); see
`.env.example` (names only). `vite preview` is not a supported runtime for
this project.

## Verification commands (local, synthetic data only)

```sh
node node_modules/typescript/bin/tsc --noEmit
node node_modules/eslint/bin/eslint.js src vite.config.ts nitro.config.ts public/vz-public/js
bun run build && PORT=3100 HOST=127.0.0.1 node .output/server/index.mjs
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:3100/
```

Note: the repository lint script (`eslint .`) also runs Prettier over the
vendored, minified Liviza assets under `public/vz-public/liviza/` and over
CRLF-encoded files committed before this baseline; it reports pre-existing
`Delete ␍` findings and does not finish in a practical time on the full tree.
The scoped command above covers all application source.

Scoped browser checks (hero previous/next controls, hero indicator state,
mobile menu at 320/375/430 px, keyboard operation, horizontal overflow,
absence of transactional affordances) live in the isolated test harness
outside the repository:
`C:\Users\delro\devmart-test-harness\playwright\vz-juspol-gen\evidence\MAIN-RELEASE-BASELINE-TRACK-A-001\`.

## Corrections carried by this baseline

- **D-107-001** — hero "Vorige dia" / "Volgende dia": real buttons, visually
  hidden without clipping so they stay pointer-reachable, shown on keyboard
  focus, `aria-disabled` at the first/last slide, bound to the Swiper instance
  with status sync. Visible navigation remains the template's pagination dots
  (LFB-105 D-006 Option 2). Autoplay is off.
- **D-107-002** — mobile navigation: the collapse box takes the height of the
  open panel, `aria-expanded`/`aria-controls` on the toggler, Escape closes and
  returns focus, menu links close the panel, state resets at the desktop
  breakpoint.
- **Truthful Track-A state** — public header CTA and menu link are `Contact`;
  the Aanvraaghulp result panel no longer offers "Aanvraag starten".

## Rollback

The pre-batch source state is HEAD `d4baa546…` plus the developer's uncommitted
Track-B files, which this batch leaves untouched. To undo the Track-A commit
without rewriting published history:

```sh
git revert <track-a-commit-sha>
```

Do not force-push, rebase or amend on `main` (Lovable-connected branch).
