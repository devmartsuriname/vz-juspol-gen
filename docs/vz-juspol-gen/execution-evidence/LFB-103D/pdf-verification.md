# LFB-103D — PDF-verificatie

Bron: uploadtransport `vz-official-pdfs-17.zip` (niet in de repository opgenomen).
Doel: `public/vz-public/documenten/`.
Aantal bestanden: **17** (verwacht 17). Totale omvang: **8848320 bytes**.
Bestandsnamen en bytes zijn ongewijzigd overgenomen; elk bestand begint met `%PDF-`.

| # | Bestandsnaam | Bytes | SHA-256 (na plaatsing) | `%PDF-` header |
|---|---|---|---|---|
| 1 | `13. Formulier voor Machtiging.pdf` | 215886 | `c5632fde67e21934ef45b5a34db7f8dab50902e325aca2060b945d6897b40c5b` | ja |
| 2 | `Documentenlijst aanvraag Naturalisatie overige Vreemdelingen (VZ ONLINE ).pdf` | 717072 | `595c57601bf6b5cbf4ef17cd8b53941a41bf5cc08ed9ee10a0861ca5bf567ed5` | ja |
| 3 | `Documentenlijst aanvraag Naturalisatie surinaamse origine (VZ ONLINE ).pdf` | 716050 | `941fa69091fa56e839560300ffcea425e292e6aa504f4b2ba543d9f5d0aa635e` | ja |
| 4 | `Documentenlijst aanvraag duplicaat.pdf` | 681881 | `8420d36faa30861ee5c0a4ee9c937c13827113fcf69591ec4148026669f7ac08` | ja |
| 5 | `Documentenlijst aanvraag omzetten van toelatingsbeschikking voor onbepaalde tijd in een vestigingsvergunning (VZ ONLINE).pdf` | 688261 | `b80d0906b08a1749a826c0c5a19b886425c39a7b626975502022d6d4237d09a1` | ja |
| 6 | `Documentenlijst aanvraag verblijf overige (VZ ONLINE ).pdf` | 697551 | `81d5cb687d613ba7b8997058fc7f86b57898b08d5e4a20d0a8024385db6faa34` | ja |
| 7 | `Documentenlijst aanvraag verblijf surinaamse origine (VZ ONLINE ).pdf` | 714264 | `c1516a3d91867aa68060d31585ad01be866e5c72d63bafd3680f24f635055b85` | ja |
| 8 | `Documentenlijst aanvraag verklaring van Naturalisatie (VZ ONLINE).pdf` | 425437 | `80efc315f5f6c24d71ec3eb5e729be481e40be03072225ed2bc9118dedd55b07` | ja |
| 9 | `Documentenlijst aanvraag verklaring van Naturalisatie door Optie (Art 12) (VZ ONLINE).pdf` | 621127 | `74a3b849dbba6eb4bb7e00da53dd38801a37ba80b64cba95f04338426f30d1c4` | ja |
| 10 | `Documentenlijst aanvraag verklaring van Naturalisatie door Optie (Art 5) (VZ ONLINE).pdf` | 592461 | `6fbb19f059d1669e8eeb62892fa2c4d19d986c01ddb574f7358bc6acc9d95247` | ja |
| 11 | `Documentenlijst aanvraag verklaring van ingezetenschapArt 21 ( VZ ONLINE ).pdf` | 676501 | `0f57e559bf5b03404869cb1393a88485692661a0f6978266b71b8322838f655d` | ja |
| 12 | `Documentenlijst aanvraag verlenging verblijf (VZ ONLINE).pdf` | 696043 | `d49697a9667ee81365b53ac0f96316c77fc5a8c5cf9c398e336714c8f7a193e0` | ja |
| 13 | `Documentenlijst aanvraag vestiging surinaamse origine (VZ ONLINE ).pdf` | 268239 | `c6f98e44588dd653fb15f477dd61733173fd6fddd517655206816f4f9358e194` | ja |
| 14 | `Documentenlijst garantstellingsformulier (VZ ONLINE).pdf` | 362951 | `0e972132d6a2a52b58d09069abe7d37a2226158ac88f6dd440d4f15d2505b805` | ja |
| 15 | `Formulier Nadere informatie minderjarige kinderen.pdf` | 205721 | `432628da2fd1eb98a9c068bf4b7499c5962c0cadf251c2af402bbd25dcac1ba0` | ja |
| 16 | `documentenlijst  vreemdelingen in de asielprocedure 3.pdf` | 301108 | `658d1b1d5963919688d86d4b819e8d0bc4ba3731ee52348224731d2261f56206` | ja |
| 17 | `documentenlijst aanvraag vestiging overige.pdf` | 267767 | `ad21f962f72e88bd9e7a564fe57fb9e25c77c2ede860c1d1f13e04932a367168` | ja |

Controlecommando's: `unzip -l`, `sha256sum`, `stat -c%s`, `head -c4`.
HTTP-controle: `GET /vz-public/documenten/13.%20Formulier%20voor%20Machtiging.pdf` → 200, 215886 bytes.
