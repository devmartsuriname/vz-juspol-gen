# HANDOFF EVIDENCE MANIFEST — LFB-106

Package: `docs/vz-juspol-gen/handoff/LFB-106-FRONTEND-CMS-HANDOFF-001/`
Produced by: Lovable, documentation-only execution.
Validation actor: ACT-CODEX (independent, read-only).

---

## 1. Commit and repository state

| Item | Value |
| --- | --- |
| Lovable HEAD at execution start | `ec26f176a7b954454026d427f1e69032c9eecf8f` (2026-09-13 21:35:15 +0000) |
| Lovable HEAD at manifest time (documentation commits only) | `80e8a221b976a81b1a0f42d546adf04dc0501b87` |
| Lovable project ID | `ddc7ea4d-6274-4bc2-a1f9-dcede1e5ca68` |
| Declared GitHub repository | `devmartsuriname/vz-juspol-gen` |
| Declared branch | `main` |
| Sync state | reported "Connected / in sync" by the Lovable interface |
| Publication state | private, unpublished |
| Database state | disabled (no Cloud, no Supabase, no connector) |
| Accepted application baseline | `054958b481f5e1cda8957068d222b228b18012ed` |

## 2. Package files

Sizes in bytes, SHA-256 computed with `sha256sum` at manifest time.

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `BUILD-AND-PRIVATE-DEPLOYMENT-HANDOFF.md` | 6686 | `205a585f7e6439a2da17c89ec982aa5903274ad0d00bc3f62ac986c6709111cd` |
| `CMS-CONTENT-BOUNDARY-MATRIX.md` | 11088 | `f60f3e1aa6d1317b16755f2e7efdc0117d240b65b8431cececc4699d85e8550f` |
| `DEFERRED-ITEMS-REGISTER.md` | 3860 | `ebca10d75d980b750906602ef3db9c4769d13f9e809c5677df57eb5011cc4545` |
| `DOCUMENT-ASSET-REGISTER.md` | 6696 | `c6e017e3cb592293e9da44c122a415c1638fd27b2cee3f7eb1b8bfbe69796f4a` |
| `FRONTEND-HANDOFF-OVERVIEW.md` | 8511 | `cc6a0a352a19b7fdd05fa0e3a649e6571393ff71a9c3880fa88840ef3aa456bd` |
| `MEDIA-INVENTORY-AND-RESOLVER-PROPOSAL.md` | 7745 | `bd5f9e84c8f21d6cf96f648dc9f3461c245f06b22c06c21c95e2e899f36daac6` |
| `ROUTE-AND-COMPONENT-MAP.md` | 7742 | `40faa1d9cc865f6c584c797242ee62d3b12f2bafa849986c2c55122043e67548` |
| `WIZARD-PREPARATION-ONLY-BOUNDARY.md` | 3575 | `84eb2cbcabb979bf5472d44b76488e40c7b7344d182caa5dc02316fa4f118f60` |
| `cms-content-boundaries.csv` | 4746 | `1c13038ddec7e502e525b90504b0c1e924dfb1b1d896db7cdc74b281bca6538c` |
| `document-assets.csv` | 5330 | `654dda4aea646c10b1ec339aa25b3d39b0b3e5d8c84f35c7c97af68685b74e35` |
| `media-inventory.json` | 9194 | `8882b35300ae08124f9a3319420a01efa4ea84332841d0daf8b9797498089196` |
| `HANDOFF-EVIDENCE-MANIFEST.md` | this file | self-referential — excluded |
| `COMPLETION-REPORT.md` | written after this manifest | excluded; hash it independently if required |

## 3. Verification performed for this package

| Check | Method | Result |
| --- | --- | --- |
| 17 PDFs present and unchanged | `stat` + `sha256sum` on `public/vz-public/documenten/*.pdf`, compared to `src/content/vz-content.ts#documents` | 17/17 match on filename, byte size and SHA-256; all begin with `%PDF-` |
| Image inventory | `stat` + PIL intrinsic sizes on `public/vz-public/images/**` | 35 files recorded; none modified |
| Media reference sites | `rg` over `src/` and `vz-polish.css` | references exist only in `chrome.ts` and `vz-polish.css` |
| Environment variables | `rg "process.env|import.meta.env"` over `src/` | zero matches |
| Runtime model | read `vite.config.ts`, `src/server.ts`, `package.json`, `docs/HOSTINGER_DEPLOY_NOTES.md` | server runtime (Vite + TanStack Start + Nitro), not static `dist/` |
| Route inventory | listed `src/routes/**` and read every route file | 15 public route files → 32 public URLs |
| Application diff | only files under this handoff directory were written | no application, CSS, media, PDF, dependency or config change |

## 4. Evidence limitations

1. **GitHub state not independently verified.** Inside the Lovable build
   sandbox the Git remote points at Lovable's internal repository storage, not
   at github.com. Repository identity `devmartsuriname/vz-juspol-gen`, branch
   `main` and the "in sync" status are recorded **as reported by the Lovable
   interface**. ACT-CODEX should confirm repository, branch and commit
   equality directly on GitHub.
2. **Working-branch naming.** The sandbox reports an internal Lovable edit
   branch rather than `main`; this is normal Lovable behaviour and is not
   evidence of divergence, but it means branch equality could not be asserted
   from here.
3. **No runtime/browser evidence was captured for this task.** LFB-106 is
   documentation-only; visual and interaction evidence remains the LFB-105
   FINAL-CORRECTION-001 screenshot set (70 PNG, `screenshots.sha256`).
4. **Provenance fields for the PDFs** are limited to what the governed BCF-04
   release recorded (filename, byte size, SHA-256, association). Licence text,
   author metadata and issuing dates were not supplied and are not invented.
5. **The manifest cannot hash itself**, and `COMPLETION-REPORT.md` is written
   after it; both are listed but excluded from the hash table.
