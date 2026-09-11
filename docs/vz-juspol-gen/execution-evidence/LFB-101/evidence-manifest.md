# LFB-101 — evidence manifest (Bounded Remediation 001)

Date (UTC): 2026-09-11 · Commit before: `9a3f6e0` · Working tree before edits: clean

## Files changed in this remediation

| Path | Action | Before SHA-256 | Before bytes | After SHA-256 | After bytes |
|---|---|---|---|---|---|
| `.lovable/plan/vz-juspol-gen-public-frontend-plan-v0-3-plan-mode-only-2026-09-11.md` | restored to complete §§1–14 | `d94b6f90887290f366f7958691f44679fa1adb593168dd2859b7db99c6446cf2` | 50430 | `40ccfb53a46ac4e4c4d585080f583343c02f9822d6d0081256cdbe32b8393f22` | 64487 |
| `src/styles.css` | h3 token 30/36 → 32/38 | `5563bd2e975b4c5a0cdf67eaa00d3f3593d44b18bbd010b037f954cc6bc2bf01` | 10044 | `512c8999237b4e70c1f89c7d3c579f64cd401df8af675e29181f5ce02f0ba67e` | 10057 |
| `src/routes/index.tsx` | removed `Beheeromgeving` footer link + unused import | `84c7073b945b9ed5023dbf49fc9760918a66a7da011ca46fd7dc53dc1fe96c74` | 1904 | `0c9e8a09712ffa65efd1cde39666857136ef3dfb22b456349da997421ef98627` | 1455 |
| `docs/vz-juspol-gen/execution-evidence/LFB-101/LFB-101-remediation-001-report.md` | created | — | — | see report | — |
| `docs/vz-juspol-gen/execution-evidence/LFB-101/evidence-manifest.md` | created (this file) | — | — | — | — |

## Plan restoration provenance

| Fragment | Source | Range |
|---|---|---|
| Title through `## 7. Wizard plan` heading | archived plan at commit `739a78b` | lines 1–339 |
| `## 7. Wizard plan` body through Verdict | `.lovable/plan.md` at commit `c8d8756` | line 310 → EOF |

Restored file: 15 headings (§§1–14 + Verdict), 64,487 bytes. Canonical routes `/veelgestelde-vragen` and `/diensten/$categorie/$slug` preserved. No text authored by the agent.

## Verification artefacts (temporary, not committed)

| Artefact | Path |
|---|---|
| Home at 320px | `/tmp/browser/lfb101r/home-320.png` |
| Home at 768px | `/tmp/browser/lfb101r/home-768.png` |
| Home at 1280px | `/tmp/browser/lfb101r/home-1280.png` |
| Measurement script | `/tmp/browser/lfb101r/check.py` |

## Checks

| Check | Result |
|---|---|
| Typecheck (`tsgo --noEmit`) | clean |
| Build log | `build OK` |
| Console errors at 320/768/1280 | none |
| Horizontal overflow at 320/768/1280 | none |
| Admin diff (`src/routes/admin*`, `src/lib/admin/**`, `public/admin/**`) | zero changes |
| Public anchors to admin routes | zero |
| `src/content/index.ts` | untouched — `identity: null`, all record sets `items: []` |
| Dependencies / lockfiles | unchanged |
| Later batches (LFB-102 … LFB-111) | none executed |
| Governance inputs / ZIP stored in repo | none |
