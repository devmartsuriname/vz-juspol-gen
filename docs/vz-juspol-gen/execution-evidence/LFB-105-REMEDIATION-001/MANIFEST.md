# LFB-105 STRUCTURAL REMEDIATION 001 — EVIDENCE MANIFEST

## Screenshots

- Location: `docs/vz-juspol-gen/execution-evidence/LFB-105-REMEDIATION-001/screenshots/`
- Count: 96 PNG files
- Total size: 8.8 MB
- Naming: `<route-slug>_<width>.png` (`home_*` = `/`)
- Widths captured: 1440 (desktop), 768 (tablet), 320 (smallest supported mobile)
- Routes captured: 32 public routes —
  `/`, `/over-ons`, `/diensten`, `/nieuws`, `/instanties`, `/veelgestelde-vragen`,
  `/contact`, `/privacy`, `/disclaimer`, `/documentenlijsten`, `/aanvraaghulp`,
  6 category routes (`/diensten/{verblijf,vestiging,naturalisatie,ingezetenschap,asiel,overig}`),
  15 service-detail routes (`/diensten/{categorie}/{slug}`).

## Measurement runs

| Run | Scope | Result |
| --- | --- | --- |
| Overflow + overlap audit | 34 entries × 9 widths (320/375/390/430/768/992/1024/1280/1440) | overflow `[]`, overlap `[]` |
| Console capture | 96 loads + 4 SPA navigations | 0 errors, 0 warnings, 0 hydration messages |
| Equal-height sampling | `/diensten`, 6 categories, related grids | equal heights per row |
| Tabs | `/documentenlijsten`, pointer + keyboard | 1 visible panel, 1 selected tab |
| Registered documents | 17 links | 17 × HTTP 200, no file diff vs baseline |
| Aanvraaghulp traversal | 6 categories → 15 terminal outcomes | all reachable; Back/Restart verified; 0 inputs/forms; 0 non-GET requests |
| Protected surface | `/admin` | HTTP 200, 0 diff vs baseline |

## Source references

- Baseline / rollback: `0bcec76dc5638ca457e4057a05dd8ea5f3706196`
- Plan: `.lovable/plan/lfb-105-structural-remediation-plan-001-rev-002-2026-09-13.md`
- Report: `./REPORT.md`
