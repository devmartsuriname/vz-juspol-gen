# LFB-105 FINAL FRONTEND CORRECTION 001 — MANIFEST

## Application files changed (2)

| File | Bytes | SHA-256 |
| --- | --- | --- |
| `public/vz-public/css/vz-polish.css` | 21726 | `c14d7c94c946251bdb67e4d7ddfbdd4a654998c650ac6dcd6499dff4173c8b8e` |
| `src/lib/public/template/chrome.ts` | 14423 | `f84cc2a1669df64eb57fc9f63a3f82f6dc14095507a3b684dc33adecf54e22a0` |

## Evidence files

| Path | Contents |
| --- | --- |
| `REPORT.md` | Execution report, defect results, viewport and smoke matrices |
| `MANIFEST.md` | This file |
| `screenshots.sha256` | SHA-256 of all 70 screenshots |
| `screenshots/` | 70 PNG files, 4.2 MB total |

Screenshot naming: `after_<route-slug>_<width>.png`.
Coverage: homepage hero at 320, 375, 430, 768, 900, 1024, 1440; all 32 public routes at 320 and 1440; `after_documentenlijsten_tabs_1440.png` for the six-tab / 17-PDF control.

## Untouched / verified

- 17 institutional PDFs in `public/vz-public/documenten/` — count and `%PDF-` headers verified, files unmodified.
- `/admin/*` (`src/routes/admin*`, `src/lib/admin/**`, `public/admin/**`) — diff empty.
- D-009 badge — no application or platform change.
- No dependency, lockfile, configuration, image, content or project-knowledge change.
- Project private and unpublished; no deployment or publication action.
