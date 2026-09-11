# LFB-103D — Sitewide governed content swap — uitvoeringsrapport

Actor: LOVABLE (frontend/UI). Modus: één gecombineerde Build-batch.
Basis: goedgekeurd en gearchiveerd plan
`.lovable/plan/lfb-103d-sitewide-governed-content-swap-plan-mode-only-rev-0-2026-09-11.md`
inclusief de bindende stakeholdercorrectie.

## 1. Uitgevoerde scope — dertien routes

| Route | Bron-geometrie | Inhoud |
|---|---|---|
| `/` | Liviza `index.html` | statische hero, drie snelkaarten, intro, over-blok, dienstenband (15 diensten), begeleidingspaneel, instantiesectie (6 instanties), lege nieuwsstaat, footer |
| `/over-ons` | `about-us.html` | over VZ + praktische informatie; tellers, team en testimonials verwijderd |
| `/diensten` | `our-services.html` | zes categorieën met dienstaantal |
| `/diensten/$categorie` | `visa.html` | datagestuurde dienstkaarten + categorie-navigatie |
| `/diensten/$categorie/$slug` | `visa-details.html` | dienstdetail, voorwaarden, gegevens, gekoppeld PDF-brondocument |
| `/veelgestelde-vragen` | `faq.html` | accordeongeometrie met waarheidsgetrouwe lege staat |
| `/nieuws` | `blog-grid-view.html` | lege staat "Er zijn nu geen mededelingen." |
| `/nieuws/$slug` | `blog-single-view.html` | lege staat, geen reacties/delen/tags |
| `/contact` | `contacts.html` | goedgekeurde adres-, telefoon-, e-mail- en openingstijdgegevens; formulier en kaart-embed verwijderd |
| `/documentenlijsten` | Liviza kaartgrid | 17 officiële PDF's met bestandsnaam, omvang, SHA-256-prefix en status |
| `/instanties` | Liviza kaartgrid | zes governed instanties met rolregel en verificatienotitie |
| `/privacy` | Liviza artikelgeometrie | exacte goedgekeurde tekst uit het plan |
| `/disclaimer` | Liviza artikelgeometrie | exacte goedgekeurde tekst uit het plan |

`/aanvraaghulp` is niet gebouwd (buiten scope) en wordt nergens als link
gepresenteerd; de homepage beschrijft de aanvraaghulp uitsluitend als tekst.

## 2. Verwijderd bronmateriaal

Testimonials, tellers, landenkiezer/vlaggen, prijsblokken, nieuwsbrief,
sociale links, zoekoverlay, reacties, teamprofielen, demo-contactgegevens,
PHP-formulier (`send.php`) en de kaart-embed. Er is geen netwerkactie naar
derden overgebleven.

## 3. Bewaarde Liviza-geometrie

Vierkolommenfooter, `header-style-1`-chrome, titelbalk met kruimelpad,
kaartrasters, dienstenband, accordeon en typografische ritmes zijn behouden
met de originele klassen en bron-CSS-volgorde. Afwijkingen:

1. Hero: één statische compositie in plaats van een autoplay-carrousel
   (toegankelijkheid). De transform-animatieklassen zijn verwijderd zodat de
   tekst zonder JavaScript zichtbaar is.
2. Hoofdmenu teruggebracht tot zes items om regelafbreking te voorkomen;
   Veelgestelde vragen en Instanties staan in de footer.
3. Pre-header-actieknop verwijderd (overlapte de telefoonblok en zou naar een
   niet-bestaande route verwijzen).
4. Contactkaart-embed vervangen door een statisch bezoekpaneel met gelijke
   blokafmetingen.

## 4. Officiële PDF's

Exact 17 PDF's uit het uploadtransport zijn byte-identiek geplaatst in
`public/vz-public/documenten/`; bestandsnamen ongewijzigd; alle SHA-256-waarden
en `%PDF-`-headers geverifieerd na plaatsing. Zie `pdf-verification.md`.
Het transport-ZIP is niet in de repository opgenomen.

## 5. Verificatie

- Typecheck (`tsgo --noEmit`): 0 fouten.
- Build (`bun run build`): geslaagd.
- Browsercontrole: 13 routes × 5 breedtes (1440/1280/992/768/375) = 65 metingen.
  Geen console-fouten, geen HTTP ≥ 400, geen ontbrekende assets.
  Er resteert uitsluitend de bekende React-hydratatiewaarschuwing van de
  Act 1-sjabloonwikkel; deze is aanwezig op alle sjabloonroutes, ontwikkelmodus-
  gebonden en niet door dit batch geïntroduceerd.
- Overloop: geen enkel element steekt buiten de viewport (element-meting bij
  1440 leverde nul overschrijdende elementen op). Op 1280/992/768/375 is
  `scrollWidth == clientWidth` voor alle publieke routes.
- Toetsenbord: eerste Tab landt op de sitetitellink; menu-, accordeon- en
  documentlinks zijn bereikbaar; PDF-links openen in een nieuw tabblad met
  `rel="noopener"`.
- Verboden-waardescan (hoofdlettergevoelig, zoals in het plan):
  `Liviza|lorem|testimonial|newsletter|subscribe|Justitie en Politie|N-REMOTE|3610|3611|3612|Aanvraag indienen|Dien uw aanvraag`
  → nul zichtbare treffers. Hoofdletterongevoelig komt alleen de
  goedgekeurde ontkennende zin "…geen officiële aanvraag indienen…" voor; dit
  is letterlijke goedgekeurde tekst en geen call-to-action.
- `/admin/` blijft HTTP 200 en identiek; geen bestand onder `src/routes/admin*`,
  `src/lib/admin/**` of `public/admin/**` is aangeraakt.
- Geen dependency, backend, database, Cloud, authenticatie, secret, GitHub,
  deployment of publicatie geraakt.

## 6. Afwijking van het plan die vermelding vereist

Het plan verwijst naar `SERVICE-CONTENT-MIGRATION-MATRIX.md`. Dat document is
niet aangeleverd en niet in het project aanwezig. De 15 dienstrecords
(SRV-001…SRV-015) en de zes categorieën zijn daarom afgeleid uit de wel
beschikbare governed bronnen: `WIZARD-DECISION-MODEL.md`,
`WIZARD-REQUIREMENTS.md`, `PUBLIC-PORTAL-REQUIREMENTS.md` en `DECISION-LOG.md`.
Waar kosten of wettelijke grondslagen niet bevestigd zijn (o.a. SRV-005,
SRV-011, SRV-012) worden deze velden weggelaten of als "wordt bevestigd"
getoond; niets is geschat.

## 7. Nog geblokkeerd

- BCF-05 FAQ-inhoud en BCF-06 nieuwsinhoud: lege staten blijven staan.
- BCF-07 beeldmateriaal: Liviza-sjabloonafbeeldingen blijven tijdelijk; zie
  `image-register.md`.
- Instantiegegevens (adres, telefoon, openingstijden) worden niet getoond tot
  bevestiging.
- `/aanvraaghulp` is nog niet gebouwd.

## 8. Verdict

`LFB-103D COMPLETE — READY FOR REVIEW`
