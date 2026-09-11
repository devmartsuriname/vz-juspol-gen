/**
 * Governed VZ content records used by the public frontend (LFB-103D).
 *
 * Every value here is taken from an approved governed input:
 * - identity/contact: Delroy release of 2026-09-11 (BCF-01, BCF-02)
 * - service catalogue: WIZARD-DECISION-MODEL.md / WIZARD-REQUIREMENTS.md
 *   (SRV-001 … SRV-015), fees and legal bases exactly as recorded there
 * - documents: the 17 provenance-registered institutional PDFs (BCF-04)
 *
 * Nothing in this file may be invented. Where a source records no value the
 * field is omitted entirely; it is never estimated.
 */

export const identity = {
  name: "Vreemdelingenzaken",
  subline: "Ministerie van Justitie en Veiligheid",
  unit: "Afgifte Unit, oud Parket Gebouw",
  address: "Henck Arronstraat no. 1, Paramaribo",
  phone: "+597 427-197",
  phoneHref: "tel:+597427197",
  email: "info@vz.juspol.sr",
  hours: "Maandag t/m donderdag 07:30–13:30",
  hoursClosed: "Vrijdag gesloten",
} as const;

export type CategorySlug =
  | "verblijf"
  | "vestiging"
  | "naturalisatie"
  | "ingezetenschap"
  | "asiel"
  | "overig";

export type ServiceRecord = {
  id: string;
  slug: string;
  category: CategorySlug;
  title: string;
  summary: string;
  /** Prominent conditions exactly as recorded in the governed source. */
  conditions: readonly string[];
  /** Omitted when the source records no verified amount. */
  fee?: string;
  /** Omitted — never estimated — when no legal basis is recorded. */
  legalBasis?: string;
  /** Only where PDF-verified. */
  processing?: string;
  /** Registered PDF filename, when one exists for this service. */
  document?: string;
};

export const categories: readonly {
  slug: CategorySlug;
  label: string;
  intro: string;
}[] = [
  {
    slug: "verblijf",
    label: "Verblijf",
    intro: "Aanvragen die gaan over een verblijfsvergunning en de verlenging daarvan.",
  },
  {
    slug: "vestiging",
    label: "Vestiging",
    intro: "Aanvragen die gaan over een vestigingsvergunning voor onbepaald verblijf.",
  },
  {
    slug: "naturalisatie",
    label: "Naturalisatie",
    intro: "Aanvragen die gaan over de Surinaamse nationaliteit via naturalisatie of optie.",
  },
  {
    slug: "ingezetenschap",
    label: "Ingezetenschap",
    intro: "Aanvragen die gaan over de verblijfsstatus van een minderjarig kind.",
  },
  {
    slug: "asiel",
    label: "Asiel",
    intro: "Informatie voor vluchtelingen en asielzoekers.",
  },
  {
    slug: "overig",
    label: "Overig",
    intro: "Overige aanvragen en ondersteunende formulieren.",
  },
];

export const services: readonly ServiceRecord[] = [
  {
    id: "SRV-001",
    slug: "verblijf-surinaamse-origine",
    category: "verblijf",
    title: "Verblijf Surinaamse origine",
    summary:
      "Eerste aanvraag van een verblijfsvergunning voor personen van Surinaamse origine.",
    conditions: [
      "Bent u in Suriname geboren, dan is een bewijs van Surinaamse origine niet vereist.",
      "Bent u niet in Suriname geboren, dan vraagt de documentenlijst een geboorteakte van de Surinaamse ouder, het Surinaamse paspoort van een ouder en een PSA-kaart.",
    ],
    fee: "USD 150. CARICOM-onderdanen zijn vrijgesteld.",
    document: "Documentenlijst aanvraag verblijf surinaamse origine (VZ ONLINE ).pdf",
  },
  {
    id: "SRV-002",
    slug: "verblijf-overige",
    category: "verblijf",
    title: "Verblijf overige",
    summary: "Eerste aanvraag van een verblijfsvergunning voor overige vreemdelingen.",
    conditions: [
      "Een geldige MKV (visum type KV) in het paspoort is vereist.",
      "Een gelegaliseerde verklaring van goed gedrag is vereist.",
      "Vragen meerdere personen samen aan, voeg dan de visumpagina's van alle paspoorten samen in één PDF.",
    ],
    fee: "USD 150. CARICOM-onderdanen zijn vrijgesteld.",
    document: "Documentenlijst aanvraag verblijf overige (VZ ONLINE ).pdf",
  },
  {
    id: "SRV-003",
    slug: "verlenging-verblijf",
    category: "verblijf",
    title: "Verlenging verblijf",
    summary: "Verlenging van een bestaande verblijfsvergunning.",
    conditions: [
      "De laatst afgegeven vergunning moet drie stempels dragen: KPS/VD, CBB hoofdkantoor en CBB wijkkantoor.",
      "De CBB-registratie mag maximaal zes maanden oud zijn.",
      "Bent u in loondienst, dan hoort bij de aanvraag ook een werkvergunning.",
    ],
    fee: "USD 150. CARICOM-onderdanen zijn vrijgesteld.",
    document: "Documentenlijst aanvraag verlenging verblijf (VZ ONLINE).pdf",
  },
  {
    id: "SRV-004",
    slug: "vestiging-overige",
    category: "vestiging",
    title: "Vestiging overige",
    summary: "Aanvraag van een vestigingsvergunning voor overige vreemdelingen.",
    conditions: [
      "Verblijfsvergunningen over de laatste vijf jaar, bij indiening nog ten minste drie maanden geldig.",
    ],
    fee: "USD 200. CARICOM-onderdanen zijn vrijgesteld.",
    document: "documentenlijst aanvraag vestiging overige.pdf",
  },
  {
    id: "SRV-005",
    slug: "omzetten-toelatingsbeschikking",
    category: "vestiging",
    title: "Omzetten toelatingsbeschikking naar vestigingsvergunning",
    summary:
      "Omzetting van een toelatingsbeschikking voor onbepaalde tijd in een vestigingsvergunning.",
    conditions: [
      "De documentenlijst is bewust kort: de bron vermeldt geen geboorteakte, burgerlijke staat of inkomensdocumenten.",
      "Zowel het oude als het huidige paspoort is vereist.",
      "Controleer de vereisten voor deze aanvraag bij het kantoor van Vreemdelingenzaken.",
    ],
    fee: "Kosten worden bevestigd.",
    document:
      "Documentenlijst aanvraag omzetten van toelatingsbeschikking voor onbepaalde tijd in een vestigingsvergunning (VZ ONLINE).pdf",
  },
  {
    id: "SRV-014",
    slug: "vestiging-surinaamse-origine",
    category: "vestiging",
    title: "Vestiging Surinaamse origine",
    summary:
      "Aanvraag van een vestigingsvergunning voor personen van Surinaamse origine.",
    conditions: [
      "De bron vermeldt voor deze aanvraag geen CBB-registratie en geen verklaring van de burgerlijke staat.",
    ],
    fee: "USD 200. CARICOM-onderdanen zijn vrijgesteld. Betaalbaar in SRD tegen de CBvS-koers.",
    legalBasis:
      "Art. 10 lid 2 Vreemdelingenwet 1991 (S.B. 1992 no. 3) jo. S.B. 2008 no. 93.",
    document: "Documentenlijst aanvraag vestiging surinaamse origine (VZ ONLINE ).pdf",
  },
  {
    id: "SRV-006",
    slug: "naturalisatie-surinaamse-origine",
    category: "naturalisatie",
    title: "Naturalisatie Surinaamse origine",
    summary:
      "Aanvraag van de Surinaamse nationaliteit via naturalisatie voor personen van Surinaamse origine.",
    conditions: [
      "Vijf jaar aan verblijfsvergunningen of een vestigingsvergunning met drie stempels.",
      "De ziektekostenverzekering heeft voor deze aanvraag een geldigheid van één maand.",
      "Een verklaring van het netto-inkomen van de Belastingdienst, ook voor een echtgenoot die in de aanvraag wordt meegenomen.",
    ],
    fee: "SRD 200.",
    legalBasis: "Art. 16a WNI (S.B. 2014 no. 12).",
    document:
      "Documentenlijst aanvraag Naturalisatie surinaamse origine (VZ ONLINE ).pdf",
  },
  {
    id: "SRV-007",
    slug: "naturalisatie-overige-vreemdelingen",
    category: "naturalisatie",
    title: "Naturalisatie overige vreemdelingen",
    summary:
      "Aanvraag van de Surinaamse nationaliteit via naturalisatie voor overige vreemdelingen.",
    conditions: [
      "De ziektekostenverzekering moet in Suriname gedekt zijn; de bron noemt geen termijn.",
    ],
    fee: "SRD 200. Voor een echtgenoot die afzonderlijk aanvraagt: SRD 80.",
    legalBasis: "Art. 8 WNI.",
    document:
      "Documentenlijst aanvraag Naturalisatie overige Vreemdelingen (VZ ONLINE ).pdf",
  },
  {
    id: "SRV-008",
    slug: "optie-art-5",
    category: "naturalisatie",
    title: "Optie Art. 5 WNI",
    summary:
      "Optie op de Surinaamse nationaliteit op grond van geboorte in Suriname of een Surinaamse ouder.",
    conditions: [
      "Alleen een Surinaamse geboorteakte wordt geaccepteerd; een buitenlandse akte niet.",
      "Bent u niet bij het CBB geregistreerd, dan kan een registratieverklaring van de moeder of vader worden ingediend.",
    ],
    fee: "SRD 200.",
    legalBasis: "Art. 5 WNI.",
    document:
      "Documentenlijst aanvraag verklaring van Naturalisatie door Optie (Art 5) (VZ ONLINE).pdf",
  },
  {
    id: "SRV-009",
    slug: "optie-art-12",
    category: "naturalisatie",
    title: "Optie Art. 12 WNI",
    summary:
      "Optie op de Surinaamse nationaliteit op grond van een huwelijk met een Surinaamse staatsburger.",
    conditions: [
      "Een geldige verblijfs- of vestigingsvergunning met drie stempels.",
      "De huwelijksakte moet gelegaliseerd zijn.",
      "Voor de Surinaamse echtgenoot geldt een aparte deellijst: identificatie, nationaliteitsverklaring (maximaal zes maanden oud) en CBB-registratie (maximaal zes maanden oud).",
    ],
    fee: "SRD 200.",
    legalBasis: "Art. 12 WNI.",
    document:
      "Documentenlijst aanvraag verklaring van Naturalisatie door Optie (Art 12) (VZ ONLINE).pdf",
  },
  {
    id: "SRV-011",
    slug: "verklaring-van-naturalisatie",
    category: "naturalisatie",
    title: "Verklaring van Naturalisatie",
    summary:
      "Afgifte van een verklaring van naturalisatie voor wie al genaturaliseerd is.",
    conditions: [
      "De houderpagina van een geldig paspoort en een ingevulde brief.",
      "De verklaring kan worden afgegeven aan instanties zoals de SVB.",
    ],
    fee: "USD 10. De eerste verklaring is gratis bij een NATSO-aanvraag.",
    document: "Documentenlijst aanvraag verklaring van Naturalisatie (VZ ONLINE).pdf",
  },
  {
    id: "SRV-010",
    slug: "ingezetenschap-art-21",
    category: "ingezetenschap",
    title: "Ingezetenschap Art. 21 WNI",
    summary:
      "Vaststelling van de verblijfsstatus van een minderjarig kind, aangevraagd door de wettelijke vertegenwoordiger.",
    conditions: [
      "De aanvraag wordt gedaan door de wettelijke vertegenwoordiger (ouder, voogd of adoptieouder) namens het kind.",
      "Zowel het paspoort van het kind als de houderpagina van het paspoort van de andere ouder, of een nationaliteitsverklaring.",
      "Als bewijs van vertegenwoordiging geldt een voogdijbeschikking, akte van erkenning, voogdijvonnis of adoptievonnis.",
    ],
    fee: "USD 10 per aanvraag, ook wanneer die meerdere kinderen tegelijk betreft. CARICOM-onderdanen zijn vrijgesteld.",
    legalBasis: "Art. 21 WNI.",
    document:
      "Documentenlijst aanvraag verklaring van ingezetenschapArt 21 ( VZ ONLINE ).pdf",
  },
  {
    id: "SRV-015",
    slug: "asiel-vluchteling",
    category: "asiel",
    title: "Asiel en vluchteling",
    summary: "Informatie voor vreemdelingen in de asielprocedure.",
    conditions: [
      "Een UNHCR-certificaat met naam, registratienummer, geldigheidsduur, nationaliteit, land van asiel en de handtekening of stempel van de functionaris.",
      "Financiële ondersteuning: een verklaring van het Surinaamse Rode Kruis of UNHCR, of bewijs van eigen middelen.",
      "Gelegaliseerde vertalingen wanneer documenten niet in het Nederlands of Engels zijn.",
    ],
    fee: "USD 150. Betaalbaar in SRD tegen de CBvS-koers.",
    processing:
      "Gesprek binnen ongeveer twee weken; bericht over de beslissing ongeveer een maand na het gesprek.",
    document: "documentenlijst  vreemdelingen in de asielprocedure 3.pdf",
  },
  {
    id: "SRV-012",
    slug: "duplicaat",
    category: "overig",
    title: "Duplicaat",
    summary:
      "Aanvraag van een duplicaat van een verloren of beschadigd verblijfsdocument.",
    conditions: [
      "Bij verlies, diefstal of brand hoort een politieverklaring bij de aanvraag.",
      "Bij andere schade dan verlies of diefstal: neem contact op met het kantoor van Vreemdelingenzaken.",
      "Het verzoek noemt alleen de personen die op de verloren vergunning staan.",
    ],
    fee: "USD 250. CARICOM-onderdanen zijn vrijgesteld.",
    document: "Documentenlijst aanvraag duplicaat.pdf",
  },
  {
    id: "SRV-013",
    slug: "garantstelling",
    category: "overig",
    title: "Garantstelling",
    summary:
      "Ondersteunend formulier bij een aanvraag; geen zelfstandige aanvraag.",
    conditions: [
      "De garantstelling hoort bij een andere aanvraag wanneer de bron dat vereist.",
    ],
    document: "Documentenlijst garantstellingsformulier (VZ ONLINE).pdf",
  },
];

export function servicesInCategory(slug: CategorySlug): readonly ServiceRecord[] {
  return services.filter((service) => service.category === slug);
}

/**
 * The 17 provenance-registered institutional PDFs. `file` is the registered
 * filename, preserved byte-identically under /vz-public/documenten/.
 */
export type DocumentRecord = {
  title: string;
  file: string;
  bytes: number;
  sha256: string;
  service?: string;
  category: CategorySlug;
};

export const documents: readonly DocumentRecord[] = [
  {
    title: "Documentenlijst aanvraag verblijf Surinaamse origine",
    file: "Documentenlijst aanvraag verblijf surinaamse origine (VZ ONLINE ).pdf",
    bytes: 714264,
    sha256: "c1516a3d91867aa68060d31585ad01be866e5c72d63bafd3680f24f635055b85",
    service: "SRV-001",
    category: "verblijf",
  },
  {
    title: "Documentenlijst aanvraag verblijf overige",
    file: "Documentenlijst aanvraag verblijf overige (VZ ONLINE ).pdf",
    bytes: 697551,
    sha256: "81d5cb687d613ba7b8997058fc7f86b57898b08d5e4a20d0a8024385db6faa34",
    service: "SRV-002",
    category: "verblijf",
  },
  {
    title: "Documentenlijst aanvraag verlenging verblijf",
    file: "Documentenlijst aanvraag verlenging verblijf (VZ ONLINE).pdf",
    bytes: 696043,
    sha256: "d49697a9667ee81365b53ac0f96316c77fc5a8c5cf9c398e336714c8f7a193e0",
    service: "SRV-003",
    category: "verblijf",
  },
  {
    title: "Documentenlijst aanvraag vestiging overige",
    file: "documentenlijst aanvraag vestiging overige.pdf",
    bytes: 267767,
    sha256: "ad21f962f72e88bd9e7a564fe57fb9e25c77c2ede860c1d1f13e04932a367168",
    service: "SRV-004",
    category: "vestiging",
  },
  {
    title:
      "Documentenlijst aanvraag omzetten toelatingsbeschikking naar vestigingsvergunning",
    file: "Documentenlijst aanvraag omzetten van toelatingsbeschikking voor onbepaalde tijd in een vestigingsvergunning (VZ ONLINE).pdf",
    bytes: 688261,
    sha256: "b80d0906b08a1749a826c0c5a19b886425c39a7b626975502022d6d4237d09a1",
    service: "SRV-005",
    category: "vestiging",
  },
  {
    title: "Documentenlijst aanvraag vestiging Surinaamse origine",
    file: "Documentenlijst aanvraag vestiging surinaamse origine (VZ ONLINE ).pdf",
    bytes: 268239,
    sha256: "c6f98e44588dd653fb15f477dd61733173fd6fddd517655206816f4f9358e194",
    service: "SRV-014",
    category: "vestiging",
  },
  {
    title: "Documentenlijst aanvraag naturalisatie Surinaamse origine",
    file: "Documentenlijst aanvraag Naturalisatie surinaamse origine (VZ ONLINE ).pdf",
    bytes: 716050,
    sha256: "941fa69091fa56e839560300ffcea425e292e6aa504f4b2ba543d9f5d0aa635e",
    service: "SRV-006",
    category: "naturalisatie",
  },
  {
    title: "Documentenlijst aanvraag naturalisatie overige vreemdelingen",
    file: "Documentenlijst aanvraag Naturalisatie overige Vreemdelingen (VZ ONLINE ).pdf",
    bytes: 717072,
    sha256: "595c57601bf6b5cbf4ef17cd8b53941a41bf5cc08ed9ee10a0861ca5bf567ed5",
    service: "SRV-007",
    category: "naturalisatie",
  },
  {
    title: "Documentenlijst aanvraag verklaring van naturalisatie door optie (Art. 5)",
    file: "Documentenlijst aanvraag verklaring van Naturalisatie door Optie (Art 5) (VZ ONLINE).pdf",
    bytes: 592461,
    sha256: "6fbb19f059d1669e8eeb62892fa2c4d19d986c01ddb574f7358bc6acc9d95247",
    service: "SRV-008",
    category: "naturalisatie",
  },
  {
    title: "Documentenlijst aanvraag verklaring van naturalisatie door optie (Art. 12)",
    file: "Documentenlijst aanvraag verklaring van Naturalisatie door Optie (Art 12) (VZ ONLINE).pdf",
    bytes: 621127,
    sha256: "74a3b849dbba6eb4bb7e00da53dd38801a37ba80b64cba95f04338426f30d1c4",
    service: "SRV-009",
    category: "naturalisatie",
  },
  {
    title: "Documentenlijst aanvraag verklaring van naturalisatie",
    file: "Documentenlijst aanvraag verklaring van Naturalisatie (VZ ONLINE).pdf",
    bytes: 425437,
    sha256: "80efc315f5f6c24d71ec3eb5e729be481e40be03072225ed2bc9118dedd55b07",
    service: "SRV-011",
    category: "naturalisatie",
  },
  {
    title: "Documentenlijst aanvraag verklaring van ingezetenschap Art. 21",
    file: "Documentenlijst aanvraag verklaring van ingezetenschapArt 21 ( VZ ONLINE ).pdf",
    bytes: 676501,
    sha256: "0f57e559bf5b03404869cb1393a88485692661a0f6978266b71b8322838f655d",
    service: "SRV-010",
    category: "ingezetenschap",
  },
  {
    title: "Formulier nadere informatie minderjarige kinderen",
    file: "Formulier Nadere informatie minderjarige kinderen.pdf",
    bytes: 205721,
    sha256: "432628da2fd1eb98a9c068bf4b7499c5962c0cadf251c2af402bbd25dcac1ba0",
    service: "SRV-010",
    category: "ingezetenschap",
  },
  {
    title: "Documentenlijst vreemdelingen in de asielprocedure",
    file: "documentenlijst  vreemdelingen in de asielprocedure 3.pdf",
    bytes: 301108,
    sha256: "658d1b1d5963919688d86d4b819e8d0bc4ba3731ee52348224731d2261f56206",
    service: "SRV-015",
    category: "asiel",
  },
  {
    title: "Documentenlijst aanvraag duplicaat",
    file: "Documentenlijst aanvraag duplicaat.pdf",
    bytes: 681881,
    sha256: "8420d36faa30861ee5c0a4ee9c937c13827113fcf69591ec4148026669f7ac08",
    service: "SRV-012",
    category: "overig",
  },
  {
    title: "Documentenlijst garantstellingsformulier",
    file: "Documentenlijst garantstellingsformulier (VZ ONLINE).pdf",
    bytes: 362951,
    sha256: "0e972132d6a2a52b58d09069abe7d37a2226158ac88f6dd440d4f15d2505b805",
    service: "SRV-013",
    category: "overig",
  },
  {
    title: "Formulier voor machtiging",
    file: "13. Formulier voor Machtiging.pdf",
    bytes: 215886,
    sha256: "c5632fde67e21934ef45b5a34db7f8dab50902e325aca2060b945d6897b40c5b",
    category: "overig",
  },
];

export function documentFor(service: ServiceRecord): DocumentRecord | undefined {
  return documents.find((doc) => doc.file === service.document);
}

/** Governed stakeholder roster. No detail is shown that is not verified. */
export const stakeholders: readonly { name: string; role: string }[] = [
  {
    name: "Vreemdelingendienst",
    role: "Betrokken bij controle en registratie rond verblijf.",
  },
  {
    name: "Immigratiedienst",
    role: "Betrokken bij binnenkomst en vertrek.",
  },
  {
    name: "Dienst Werkvergunningen",
    role: "Betrokken wanneer u in Suriname werkt.",
  },
  {
    name: "Consulaire Zaken",
    role: "Betrokken bij documenten uit het buitenland.",
  },
  {
    name: "Centraal Bureau voor Burgerzaken",
    role: "Betrokken bij registratie en burgerlijke staat.",
  },
  {
    name: "Afdeling Bedrijfsvergunningen",
    role: "Betrokken bij vergunningen voor bedrijven.",
  },
];

export const STAKEHOLDER_VERIFY_NOTE =
  "Namen en departementale toewijzing zijn onderhevig aan het governance-register. Gegevens die niet zijn geverifieerd, worden niet weergegeven.";
