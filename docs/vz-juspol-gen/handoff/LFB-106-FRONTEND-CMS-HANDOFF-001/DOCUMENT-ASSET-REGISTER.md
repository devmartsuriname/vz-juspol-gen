# DOCUMENT ASSET REGISTER — LFB-106

17 institutional PDFs, served unchanged from `public/vz-public/documenten/`.
Machine-readable twin: `document-assets.csv`.

Verification performed for this handoff (read-only): every file was hashed
with `sha256sum` and its byte size read with `stat`; all 17 begin with the
`%PDF-` signature; every value matches the record in
`src/content/vz-content.ts#documents` exactly. No PDF was opened for editing,
renamed, moved or re-encoded.

---

## 1. Register

Public URL pattern: `/vz-public/documenten/<exact filename>` (spaces and
parentheses are URL-encoded by the browser; the stored filename is
authoritative).

| # | Title | Filename | Bytes | SHA-256 | Service | Category |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Documentenlijst aanvraag verblijf Surinaamse origine | `Documentenlijst aanvraag verblijf surinaamse origine (VZ ONLINE ).pdf` | 714264 | `c1516a3d91867aa68060d31585ad01be866e5c72d63bafd3680f24f635055b85` | SRV-001 | verblijf |
| 2 | Documentenlijst aanvraag verblijf overige | `Documentenlijst aanvraag verblijf overige (VZ ONLINE ).pdf` | 697551 | `81d5cb687d613ba7b8997058fc7f86b57898b08d5e4a20d0a8024385db6faa34` | SRV-002 | verblijf |
| 3 | Documentenlijst aanvraag verlenging verblijf | `Documentenlijst aanvraag verlenging verblijf (VZ ONLINE).pdf` | 696043 | `d49697a9667ee81365b53ac0f96316c77fc5a8c5cf9c398e336714c8f7a193e0` | SRV-003 | verblijf |
| 4 | Documentenlijst aanvraag vestiging overige | `documentenlijst aanvraag vestiging overige.pdf` | 267767 | `ad21f962f72e88bd9e7a564fe57fb9e25c77c2ede860c1d1f13e04932a367168` | SRV-004 | vestiging |
| 5 | Documentenlijst aanvraag omzetten toelatingsbeschikking naar vestigingsvergunning | `Documentenlijst aanvraag omzetten van toelatingsbeschikking voor onbepaalde tijd in een vestigingsvergunning (VZ ONLINE).pdf` | 688261 | `b80d0906b08a1749a826c0c5a19b886425c39a7b626975502022d6d4237d09a1` | SRV-005 | vestiging |
| 6 | Documentenlijst aanvraag vestiging Surinaamse origine | `Documentenlijst aanvraag vestiging surinaamse origine (VZ ONLINE ).pdf` | 268239 | `c6f98e44588dd653fb15f477dd61733173fd6fddd517655206816f4f9358e194` | SRV-014 | vestiging |
| 7 | Documentenlijst aanvraag naturalisatie Surinaamse origine | `Documentenlijst aanvraag Naturalisatie surinaamse origine (VZ ONLINE ).pdf` | 716050 | `941fa69091fa56e839560300ffcea425e292e6aa504f4b2ba543d9f5d0aa635e` | SRV-006 | naturalisatie |
| 8 | Documentenlijst aanvraag naturalisatie overige vreemdelingen | `Documentenlijst aanvraag Naturalisatie overige Vreemdelingen (VZ ONLINE ).pdf` | 717072 | `595c57601bf6b5cbf4ef17cd8b53941a41bf5cc08ed9ee10a0861ca5bf567ed5` | SRV-007 | naturalisatie |
| 9 | Documentenlijst aanvraag verklaring van naturalisatie door optie (Art. 5) | `Documentenlijst aanvraag verklaring van Naturalisatie door Optie (Art 5) (VZ ONLINE).pdf` | 592461 | `6fbb19f059d1669e8eeb62892fa2c4d19d986c01ddb574f7358bc6acc9d95247` | SRV-008 | naturalisatie |
| 10 | Documentenlijst aanvraag verklaring van naturalisatie door optie (Art. 12) | `Documentenlijst aanvraag verklaring van Naturalisatie door Optie (Art 12) (VZ ONLINE).pdf` | 621127 | `74a3b849dbba6eb4bb7e00da53dd38801a37ba80b64cba95f04338426f30d1c4` | SRV-009 | naturalisatie |
| 11 | Documentenlijst aanvraag verklaring van naturalisatie | `Documentenlijst aanvraag verklaring van Naturalisatie (VZ ONLINE).pdf` | 425437 | `80efc315f5f6c24d71ec3eb5e729be481e40be03072225ed2bc9118dedd55b07` | SRV-011 | naturalisatie |
| 12 | Documentenlijst aanvraag verklaring van ingezetenschap Art. 21 | `Documentenlijst aanvraag verklaring van ingezetenschapArt 21 ( VZ ONLINE ).pdf` | 676501 | `0f57e559bf5b03404869cb1393a88485692661a0f6978266b71b8322838f655d` | SRV-010 | ingezetenschap |
| 13 | Formulier nadere informatie minderjarige kinderen | `Formulier Nadere informatie minderjarige kinderen.pdf` | 205721 | `432628da2fd1eb98a9c068bf4b7499c5962c0cadf251c2af402bbd25dcac1ba0` | SRV-010 | ingezetenschap |
| 14 | Documentenlijst vreemdelingen in de asielprocedure | `documentenlijst  vreemdelingen in de asielprocedure 3.pdf` | 301108 | `658d1b1d5963919688d86d4b819e8d0bc4ba3731ee52348224731d2261f56206` | SRV-015 | asiel |
| 15 | Documentenlijst aanvraag duplicaat | `Documentenlijst aanvraag duplicaat.pdf` | 681881 | `8420d36faa30861ee5c0a4ee9c937c13827113fcf69591ec4148026669f7ac08` | SRV-012 | overig |
| 16 | Documentenlijst garantstellingsformulier | `Documentenlijst garantstellingsformulier (VZ ONLINE).pdf` | 362951 | `0e972132d6a2a52b58d09069abe7d37a2226158ac88f6dd440d4f15d2505b805` | SRV-013 | overig |
| 17 | Formulier voor machtiging | `13. Formulier voor Machtiging.pdf` | 215886 | `c5632fde67e21934ef45b5a34db7f8dab50902e325aca2060b945d6897b40c5b` | — (no service association) | overig |

Total: 17 files, 8 838 320 bytes.

## 2. Provenance

Recorded provenance is the BCF-04 governed institutional release (LFB-103D),
with the byte size and SHA-256 above captured at port time and re-verified
for this handoff. The register carries no licence text, author metadata or
issuing-date field beyond that — those were not supplied and are not
invented here.

## 3. Current link behaviour

- `/documentenlijsten`: six Bootstrap tabs (one per category), one active
  panel at a time; each panel lists the documents of that category as direct
  anchors.
- Service-detail pages: a single "officieel document" link below the
  conditions checklist, resolved via `documentFor(service)`.
- Links are plain anchors to the static file. There is no download proxy, no
  tracking parameter, no authentication and no expiry.
- Filenames including double spaces, trailing spaces inside parentheses and a
  leading `13. ` are preserved byte-identically; they are part of the public
  URL.

## 4. Requirements for a future CMS replacement

1. **URL stability is mandatory.** `/vz-public/documenten/<filename>` must
   keep resolving. If a CMS serves documents from new URLs, the old paths
   must 301-redirect to them.
2. Replacement of a binary requires re-verification: new byte size, new
   SHA-256 and recorded provenance before publication.
3. The service ↔ document association must stay bidirectionally consistent
   (`ServiceRecord.document` ↔ `DocumentRecord.file`/`.service`).
4. A document may only be published when its provenance and publication
   authority are recorded; no placeholder or draft PDF may be served.
5. Renaming for cosmetic reasons is discouraged; if it happens, the old path
   must redirect and the change must be recorded with a date and an approver.
6. Content-Type must remain `application/pdf`; documents must be served
   inline-capable (not forced download) to preserve current behaviour.
