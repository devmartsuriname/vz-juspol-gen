# LFB-104 — Frontend completion (imagery, page-top, hero, brand mark, Aanvraaghulp)

Actor: LOVABLE (frontend/UI executor only)
Mode: Build Mode, one consolidated batch
Scope: public frontend only. No `/admin/*`, backend, database, Cloud, Supabase,
auth, personal-data intake, uploads, payments, email, deployment, publication,
PDF modification or dependency changes.

## 1. What was implemented

### 1.1 Shared inner-page top system
One continuous blue/off-white composition (`vz-page-top.svg`, 1920x650) behind
the absolute header menu and the title/breadcrumb zone, with a vertical scrim so
white title, breadcrumb and menu text stay readable. Liviza geometry unchanged:
650px height, 135px top padding, 45/55px title. Long titles wrap instead of
clipping.

### 1.2 Homepage hero — three real-image slides
`chrome.ts` now renders three governed slides on the original
`pbmit-slider-one` geometry (1920x900 slot):

| Slide | Eyebrow | CTA |
| --- | --- | --- |
| 1 | Informatie en voorbereiding | /diensten |
| 2 | Documenten | /documentenlijsten |
| 3 | Aanvraaghulp | /aanvraaghulp |

Autoplay stays off (`data-autoplay="false"`) so the carousel never moves without
user action. Dots and arrows are enabled and focus-visible. Each slide loads a
1920 / 1280 / 768 WebP source by media query. Hero CTA carries an `aria-label`
because the Liviza mobile style hides the visible label.

### 1.3 Image replacement
All remaining Liviza demo imagery on public routes is replaced with VZ-owned
neutral illustration in the original slots and aspect ratios. No text, no logos,
no identifiable government buildings, no identifiable persons as subject matter.

| Slot | File(s) | Size | Consumers |
| --- | --- | --- | --- |
| Hero | `hero/vz-hero-0{1,2,3}[-1280][-768].webp` | 1920x900 (+2 widths) | `/` |
| Page top | `pattern/vz-page-top.svg` | 1920x650 | all inner routes |
| About (home) | `home/vz-home-01.webp`, `home/vz-home-02.webp` | 470x470, 370x275 | `/` |
| About page | `about/vz-about-01.webp` | 530x540 | `/over-ons` |
| Category cards | `category/{6 slugs}.webp` | 800x535 | `/diensten`, `/diensten/$categorie` |
| Stakeholder cards | `instantie/{6 slugs}.webp` | 800x650 | `/`, `/instanties` |
| Detail/prep panel | `pattern/vz-cta-texture.webp` | 500x280 slot | `/diensten/$categorie/$slug` |
| Decorative | `pattern/vz-pattern-{right,left,border}.svg`, `vz-stakeholder-field.svg`, `vz-footer-pattern.svg` | source sizes | shared |
| Brand | `brand/vz-mark.svg`, `vz-wordmark-{light,dark}.svg`, `og-image.png` | 512x512, 360x40, 1200x630 | icon/social |

Raster imagery is WebP; flat/abstract compositions are SVG. All `<img>` slots
carry explicit `width`/`height` and lazy loading below the fold.

### 1.4 Brand mark and favicon
The Vreemdelingenzaken wordmark stays as the readable header brand. A restrained
`VZ` monogram was added for compact contexts only: `public/favicon.svg`,
`favicon.png` (64), `favicon.ico` (16/32/48), `apple-touch-icon.png` (180), all
derived from `vz-mark.svg`. No seal, coat of arms or invented emblem.

### 1.5 Aanvraaghulp (`/aanvraaghulp`)
Preparation-only guidance on Liviza patterns:
- Step 1: categorical question, six governed categories.
- Step 2: categorical question, the services in the chosen category (15 total).
- Step 3: the governed record for that service — summary, recorded fee/legal
  basis/processing where the source has them, conditions, and actions:
  official PDF (where one is registered), service page, contact, back, restart.

Boundaries enforced by construction: no personal data, no free-text input, no
uploads, no payments, no account, no submission, no backend call, no analytics.
Every step and outcome is server-rendered; `/vz-public/js/vz-wizard.js` only
toggles visibility. The only stored value is the pair of categorical slugs in
`localStorage` under `vz-aanvraaghulp`, expiring after 24 hours; "Opnieuw
beginnen" clears it.

Terminal mapping: all 15 services resolve to an outcome. Nine link the
registered official PDF; six (SRV-005, 006, 007, 008, 009, 010 as recorded in
`vz-content.ts` without a direct service document) show the service outcome and
a note that no documentenlijst is published for that service via this website —
no invented document, fee or legal ground.

`/aanvraaghulp` is now `available: true` in `routes-map.ts` and appears in the
template header navigation and the footer "Diensten" column.

## 2. Verification

| Check | Result |
| --- | --- |
| `tsgo --noEmit` | clean |
| Build | `build OK` (latest entry) |
| Routes rendered (13 + wizard) | all 200, no 4xx/5xx responses |
| Broken images | none (`naturalWidth === 0` count: 0) |
| Console errors | only the inherited SSR hydration warning of the ported template |
| Horizontal overflow | 0 at 1280, 992, 768, 375, 320; 30px at 1440 (inherited, pre-existing) |
| Hero | 3 slides, 3 dots, arrows present, autoplay off |
| Wizard pointer flow | step 1 → 2 → 3, exactly one step visible at a time |
| Wizard persistence | outcome restored after reload; restart returns to step 1 and clears storage (`localStorage` value `null`) |
| PDFs | 17 files, all `%PDF-` verified, byte-identical (untouched) |
| `/admin/*` | 200, zero diff, no admin file edited |

Screenshots: `/tmp/browser/lfb104/` (home, wizard steps 1–3, instanties,
diensten at 1440 and 375).

## 3. Disclosures

- The SSR hydration warning of the ported template is inherited from LFB-103A
  and unchanged by this batch.
- The 30px horizontal overflow at exactly 1440px is inherited from the Liviza
  source and unchanged by this batch.
- Generated imagery is neutral illustration created for this project. It is not
  documentary and depicts no real office, building, document or identifiable
  person. Editorial approval of the imagery remains a governance step.
- FAQ and news remain governed empty states; no Q&A or article content was
  invented.
- `identity.hours` in the governed content reads `Maandag t/m donderdag
  07:30–13:30`; the release note of 2026-09-11 records `07:30–13:00`. The value
  was not changed in this batch — it needs an explicit governed correction.

## 4. Not released / not done

Act 2 news migration, FAQ content, PDF changes, publication, deployment and any
backend, database or `/admin/*` work remain out of scope and untouched.

Verdict: LFB-104 COMPLETE — READY FOR REVIEW
