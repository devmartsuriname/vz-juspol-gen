# LFB-103D — Manifest gewijzigde en toegevoegde bestanden

## Nieuw — inhoud en gedeelde chrome

| Pad | Doel |
|---|---|
| `src/content/vz-content.ts` | Governed identiteit/contact, 6 categorieën, 15 diensten (SRV-001…SRV-015), 17 PDF-records, 6 instanties |
| `src/lib/public/template/chrome.ts` | Gedeelde Liviza-header, hero, titelbalk, footer en paginawikkels met VZ-inhoud |

## Nieuw — paginamodules

| Pad |
|---|
| `src/lib/public/template/liviza-documenten.html.ts` |
| `src/lib/public/template/liviza-instanties.html.ts` |
| `src/lib/public/template/liviza-legal.html.ts` (privacy + disclaimer) |

## Herschreven paginamodules

`liviza-home.html.ts`, `liviza-about.html.ts`, `liviza-services.html.ts`,
`liviza-category.html.ts`, `liviza-service-detail.html.ts`,
`liviza-faq.html.ts`, `liviza-news.html.ts`, `liviza-news-detail.html.ts`,
`liviza-contact.html.ts`.

## Nieuw — routes

`src/routes/documentenlijsten.tsx`, `src/routes/instanties.tsx`,
`src/routes/privacy.tsx`, `src/routes/disclaimer.tsx`.

## Gewijzigd — routes en helpers

`src/routes/index.tsx`, `over-ons.tsx`, `diensten.index.tsx`,
`diensten.$categorie.index.tsx`, `diensten.$categorie.$slug.tsx`,
`veelgestelde-vragen.tsx`, `nieuws.index.tsx`, `nieuws.$slug.tsx`,
`contact.tsx`, `src/lib/public/seo.ts`, `src/lib/public/routes-map.ts`.

## Nieuw — documenten

`public/vz-public/documenten/` — 17 officiële PDF's, byte-identiek
(8.848.320 bytes totaal). Het uploadtransport-ZIP is niet opgenomen.

## Bewijs

`REPORT.md`, `MANIFEST.md`, `pdf-verification.md`, `image-register.md`
in `docs/vz-juspol-gen/execution-evidence/LFB-103D/`.

## Niet gewijzigd

`src/routes/admin.tsx`, `src/routes/admin/**`, `src/lib/admin/**`,
`public/admin/**`, `src/routes/__root.tsx`, `src/styles.css`,
`package.json`, buildconfiguratie, en alle backend-, database-,
authenticatie-, deploy- of publicatie-instellingen.
