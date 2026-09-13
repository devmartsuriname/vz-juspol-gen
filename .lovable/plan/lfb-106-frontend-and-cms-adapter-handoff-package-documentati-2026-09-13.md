# LFB-106 — Frontend and CMS-Adapter Handoff Package (documentation only)

Prepare a complete, read-only handoff package for ACT-CLAUDE-CODE and later independent validation by ACT-CODEX. No application code, CSS, media, PDFs, dependencies or configuration are touched.

## Write boundary

All writes land in one new directory only:

`docs/vz-juspol-gen/handoff/LFB-106-FRONTEND-CMS-HANDOFF-001/`

Everything else in the project is read-only for this task.

## Deliverables

1. `FRONTEND-HANDOFF-OVERVIEW.md` — project ID, Lovable HEAD at execution, declared GitHub repository/branch, framework and versions, build/dev commands, entry points (`src/server.ts`, `src/start.ts`, `src/router.tsx`, `src/routes/__root.tsx`), route inventory, public-asset layout, CSS organization (`src/styles.css` scoped `.vz-public`, ported Liviza CSS, `public/vz-public/css/vz-polish.css`, isolated `/admin` CSS), template/chrome organization (`src/lib/public/template/**`), responsive breakpoints in use (320/375/430/768/991/1024/1440), private/unpublished/database-disabled state.
2. `ROUTE-AND-COMPONENT-MAP.md` — every public surface mapped to its implementation file and the exact function or block that renders it: header, pre-header, navigation, mobile navigation, hero and its three slides, slider controls, quick cards, service overview, category pages, service-detail routes, document tabs, document links, Aanvraaghulp wizard, news and FAQ empty states, contact page, footer, page-top/breadcrumb bar, shared buttons/cards/icons/tokens.
3. `CMS-CONTENT-BOUNDARY-MATRIX.md` — one row per content boundary (identity, contact, hours, navigation, categories, services, conditions, facts, documents, document associations, news, FAQ, hero, page metadata, wizard rules, wizard outcomes, footer, media). Each row records: current source file, current TypeScript type/shape, consuming routes and components, the adapter interface required later, fallback behavior, empty-state behavior, validation constraints, and whether CMS ownership is permitted later. Also emitted as `cms-content-boundaries.csv` for machine reading.
4. `MEDIA-INVENTORY-AND-RESOLVER-PROPOSAL.md` (+ `media-inventory.json`) — inventory of every current hero, page-top, category, stakeholder, brand, pattern and other public media reference with its current path, consumer and intrinsic dimensions where readable; then a concrete, non-implemented resolver proposal covering stable IDs, asset type, source path or CMS URL, aspect ratio, intrinsic width/height, responsive variants, WebP preference, fallback format, alt text, focal point, usage, placeholder behavior, cache/version field, publication status and provenance/ownership. Images stay untouched.
5. `WIZARD-PREPARATION-ONLY-BOUNDARY.md` — the Aanvraaghulp boundary stated explicitly (no accounts, authentication, personal data, uploads, payment, submission, case tracking, persistence or decisions), plus the existing category/service/outcome/navigation model so a later approved backend can integrate without altering the accepted presentation.
6. `DOCUMENT-ASSET-REGISTER.md` (+ `document-assets.csv`) — all 17 PDFs in `public/vz-public/documenten/`: filename, public path, category/service association, byte size, SHA-256, available provenance, current link behavior, and the URL-stability requirements any future CMS replacement must respect.
7. `BUILD-AND-PRIVATE-DEPLOYMENT-HANDOFF.md` — install/dev/build commands, the actual runtime model read from the repository (TanStack Start + Vite + Nitro server output; a plain static `dist/` upload is only recorded as valid if the repository actually supports it), route-fallback and direct-route handling, static asset and PDF serving requirements, environment-variable inventory (names only, no values), database-disabled requirement, rollback baseline commit, post-deployment smoke checklist, and reconciliation with the existing `docs/HOSTINGER_DEPLOY_NOTES.md`.
8. `DEFERRED-ITEMS-REGISTER.md` — temporary imagery, page-top composition, remaining visual polish, the 768–991px slider offset watchpoint, soft-hyphen portability, FAQ/news content dependencies, Lovable preview badge as platform-only condition, media resolver, CMS, backend/submission.
9. `HANDOFF-EVIDENCE-MANIFEST.md` — exact path, byte size and SHA-256 for every file in the package, plus Lovable HEAD at execution, observed branch/commit state, and every evidence limitation.
10. `COMPLETION-REPORT.md` — what was produced, what was read, confirmation that no forbidden surface changed, limitations, and the required final verdict and closing block.

## Technical notes

- Facts are collected by reading the repository, `package.json`, `vite.config.ts`, `src/routes/**`, `src/lib/public/**`, `src/content/**`, `public/vz-public/**`, existing docs and existing execution evidence. Nothing is asserted that a read did not confirm; anything unverifiable is recorded as a limitation rather than stated as fact.
- Hashes and sizes are produced with read-only shell commands (`sha256sum`, `stat`); no file outside the handoff directory is written.
- Known evidence limitation to be recorded up front: from inside the build sandbox the Git remote is Lovable's internal repository, so `devmartsuriname/vz-juspol-gen` / `main` and the "in sync" state are documented as reported by the Lovable interface, not independently verified against github.com. The exact Lovable HEAD at execution time is captured and recorded.
- If the runtime model cannot be established from the sources, or any step would need an application change, execution stops and reports instead of guessing.
