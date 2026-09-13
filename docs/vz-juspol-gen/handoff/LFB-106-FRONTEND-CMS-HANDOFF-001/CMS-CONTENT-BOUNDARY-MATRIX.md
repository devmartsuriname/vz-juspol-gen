# CMS CONTENT BOUNDARY MATRIX — LFB-106

One row per content boundary. Machine-readable twin:
`cms-content-boundaries.csv`.

"CMS ownership allowed later" records whether governance permits a future CMS
to own the record — it does **not** release any implementation. Nothing in
this document authorises building a CMS, a backend or a database.

---

## 1. Boundaries

### B-01 Organization identity
- Current source: `src/content/vz-content.ts` → `identity` (`name`, `subline`, `unit`)
- Shape: `const` object literal, all `string`
- Consumers: `chrome.ts` (`headerTop`, `footer`), `liviza-about.html.ts`, `liviza-contact.html.ts`, `seo.ts` (`SITE_NAME`)
- Adapter required: `getIdentity(): Identity | null` (see `src/content/types.ts#Identity`)
- Fallback: none — omit the element rather than substitute text
- Empty state: header/footer identity block omitted; page still renders
- Validation: non-empty strings; no invented mandate, logo or authority claim
- CMS ownership later: yes, with editorial + institutional approval

### B-02 Contact information
- Source: `identity.address`, `identity.phone`, `identity.phoneHref`, `identity.email`
- Shape: `string` (phoneHref is a `tel:` URI)
- Consumers: pre-header, header phone block, footer contact widget, `/contact`
- Adapter: `getContactChannels(): ContactChannel[]` (`kind: address|phone|email|hours|other`)
- Fallback: none; omit the channel
- Empty state: contact widget renders only the channels that exist
- Validation: `tel:` href must match the displayed number; e-mail syntactically valid
- CMS ownership later: yes

### B-03 Opening hours
- Source: `identity.hours`, `identity.hoursClosed`
- Shape: `string`
- Consumers: pre-header right cell, footer contact widget, `/contact`
- Adapter: `ContactChannel` with `kind: "hours"`, or a structured weekly model
- Fallback: none
- Empty state: hours line omitted
- Validation: no invented holiday or exception rules
- CMS ownership later: yes

### B-04 Navigation
- Source: `src/lib/public/routes-map.ts` (`publicRoutes`, `primaryNav`, `footerNav`) for the typed shell; `chrome.ts#navItems()` for the live markup
- Shape: `PublicNavConfigItem[]` (`AvailableNavItem | PlannedNavItem`)
- Consumers: header nav, mobile nav, footer columns
- Adapter: `getNavigation(): NavNode[]`, resolving each node to an existing route path
- Fallback: hide any node whose route does not exist
- Empty state: nav renders the remaining items; never a dead link
- Validation: every `to` must exist in the generated route tree
- CMS ownership later: partial — labels/order yes, target paths remain code-owned

### B-05 Service categories
- Source: `vz-content.ts#categories` (6 records: verblijf, vestiging, naturalisatie, ingezetenschap, asiel, overig)
- Shape: `{ slug: CategorySlug; label: string; intro: string }`
- Consumers: `/diensten`, `/diensten/$categorie`, Diensten dropdown, footer, wizard step 1, document tabs
- Adapter: `getCategories(): Category[]`
- Fallback: none
- Empty state: category grid omitted; `/diensten/$categorie` 404s for unknown slugs
- Validation: slug is a stable URL segment and must not change without a redirect
- CMS ownership later: yes for label/intro; slug changes require a URL-stability decision

### B-06 Services
- Source: `vz-content.ts#services` (15 records, `SRV-001` … `SRV-015`)
- Shape: `ServiceRecord { id, slug, category, title, summary, conditions[], fee?, legalBasis?, processing?, document? }`
- Consumers: `/diensten/$categorie`, `/diensten/$categorie/$slug`, wizard step 2 and outcome, related cards
- Adapter: `getServices(): ServiceRecord[]`, `getService(category, slug)`
- Fallback: none — optional fields are omitted, never estimated
- Empty state: category page shows no cards; detail route 404s
- Validation: `category` must exist; `document` must match a registered PDF filename exactly
- CMS ownership later: yes, under governed legal/editorial review

### B-07 Service conditions
- Source: `ServiceRecord.conditions: readonly string[]`
- Consumers: service-detail checklist, wizard outcome
- Adapter: part of `getService()`; ordered list, order is meaningful
- Fallback / empty state: conditions block omitted when the array is empty
- Validation: verbatim from the governed source; no paraphrase that changes meaning
- CMS ownership later: yes, with legal review

### B-08 Service facts (fee, legal basis, processing)
- Source: `ServiceRecord.fee?`, `.legalBasis?`, `.processing?`
- Consumers: service-detail facts block, wizard outcome
- Adapter: optional fields on the service record
- Fallback: **absolutely none** — an absent fee/legal basis/processing time is omitted, never estimated or rounded
- Empty state: the individual fact row is not rendered
- Validation: amounts and legal citations must be traceable to an approved source
- CMS ownership later: yes, with legal review and provenance capture

### B-09 Official documents (PDFs)
- Source: `vz-content.ts#documents` (17 records) + files in `public/vz-public/documenten/`
- Shape: `DocumentRecord { title, file, bytes, sha256, service?, category }`
- Consumers: `/documentenlijsten` tabs, service-detail PDF link
- Adapter: `getDocuments(): DocumentRecord[]` plus a URL resolver that preserves today's public paths
- Fallback: none; link omitted when no record exists
- Empty state: tab panel shows a governed "no documents" message
- Validation: byte size and SHA-256 must match the served file; filename is part of the public URL
- CMS ownership later: yes for metadata; binary replacement requires provenance re-verification

### B-10 Document associations
- Source: `ServiceRecord.document` + `documentFor(service)` + `DocumentRecord.service` / `.category`
- Consumers: service-detail PDF block, documentenlijsten grouping
- Adapter: `getDocumentsForService(serviceId)`, `getDocumentsForCategory(slug)`
- Fallback: none
- Empty state: "geen document" block omitted
- Validation: association must be bidirectionally consistent (service id ↔ file)
- CMS ownership later: yes

### B-11 News / notices
- Source: `src/content/index.ts#notices` — `GovernedRecordSet<Notice>` with `status: "empty-allowed"`, `items: []`
- Consumers: `/nieuws`, `/nieuws/$slug`
- Adapter: `getNotices(): GovernedRecordSet<Notice>`
- Fallback: none
- Empty state: governed empty state (accepted, intentional). No comments, newsletter or social sharing anywhere
- Validation: `publishedAt` ISO date; publication authority must be recorded before any item goes live
- CMS ownership later: yes — this is the primary controlled capability a CMS would serve

### B-12 FAQ
- Source: `src/content/index.ts#faqCategories`, `#faqItems` — both `status: "missing-blocking"`, empty
- Consumers: `/veelgestelde-vragen`
- Adapter: `getFaq(): { categories, items }`
- Fallback: none
- Empty state: single accordion item stating answers are pending, plus CTA to `/diensten`
- Validation: an answer may only be published when an authoritative citeable record exists
- CMS ownership later: yes

### B-13 Hero content
- Source: `chrome.ts#heroSlides` (3 records: slot, eyebrow, title incl. one `&shy;`, lead, ctaHref, ctaLabel); backgrounds via CSS classes `vz-hero-slide-1..3`
- Consumers: `/` only
- Adapter: `getHeroSlides(): HeroSlide[]`, with the media reference resolved through the future media registry rather than a CSS class
- Fallback: render the first slide only; never render an empty carousel
- Empty state: hero area omitted, page still valid
- Validation: exactly one `<span>` emphasis per title; CTA must target an existing route; slide count changes require re-measuring the 768–991px dot offset
- CMS ownership later: yes, with a media-resolver dependency

### B-14 Page metadata
- Source: `src/lib/public/seo.ts#publicHead(title, description)`; per-route call sites in `src/routes/*.tsx`
- Shape: meta array (title, description, robots, og:title, og:description, og:type, og:locale, twitter:card)
- Consumers: every public route `head()`
- Adapter: `getPageMeta(routeId): PageMeta`
- Fallback: current hard-coded per-route strings
- Empty state: not applicable — a title is always required
- Validation: `robots: noindex, follow` must stay until Delroy releases indexing; title < 60, description < 160 characters
- CMS ownership later: yes

### B-15 Wizard rules
- Source: `liviza-wizard.html.ts` (server-rendered steps derived from `categories` + `servicesInCategory()`), `public/vz-public/js/vz-wizard.js` (step visibility, `localStorage` `vz-aanvraaghulp`, 24h TTL)
- Shape: two categorical choices — `category: CategorySlug`, `service: slug`
- Adapter: `getWizardModel(): { steps, choices }` derived from B-05/B-06; no independent rule store
- Fallback: if a stored choice no longer resolves, the wizard restarts at step 1
- Empty state: step 2 shows no cards for an empty category
- Validation: no free text, no personal data, no upload, no submission (see `WIZARD-PREPARATION-ONLY-BOUNDARY.md`)
- CMS ownership later: yes for copy and ordering; the preparation-only boundary is not CMS-configurable

### B-16 Wizard outcomes
- Source: derived at render time from the chosen `ServiceRecord` (summary, conditions, facts, PDF via `documentFor()`)
- Consumers: wizard step 3
- Adapter: reuse `getService()` + `getDocumentsForService()`
- Fallback: none
- Empty state: outcome shows only the fields that exist
- Validation: the outcome may never present itself as an eligibility decision
- CMS ownership later: indirectly, through B-06/B-09

### B-17 Footer content
- Source: `chrome.ts#footer()` — identity block, Informatie link list, Diensten list from `categories`, contact widget from `identity`, bottom bar links (Privacy, Disclaimer, Instanties)
- Adapter: `getFooter(): FooterModel` (columns of links + contact channels)
- Fallback: omit any column whose records are absent
- Empty state: column omitted; bottom bar remains
- Validation: no newsletter, social row or commercial widget may be reintroduced
- CMS ownership later: yes for link labels/order and copy

### B-18 Media assets
- Source: `chrome.ts` (`VZ_IMAGES`, `categoryImage`, `stakeholderImages`) and background declarations in `vz-polish.css`
- Consumers: home, categories, services, instanties, hero, page-top
- Adapter: the media registry/resolver proposed in `MEDIA-INVENTORY-AND-RESOLVER-PROPOSAL.md` (not implemented)
- Fallback: documented placeholder behaviour per asset type
- Empty state: card renders without an image rather than with a broken one
- Validation: provenance, public-use review, editorial approval and privacy/likeness review are required before any image is treated as approved; generated ≠ licensed
- CMS ownership later: yes, after the resolver exists

## 2. Cross-cutting rules

1. No adapter may invent a value. Absent data is omitted or shown as a
   governed empty state.
2. Slugs and document filenames are public URLs — changing them requires a
   redirect decision (see `DOCUMENT-ASSET-REGISTER.md` §4).
3. Adapters must be read-only for the public frontend; no write path,
   account, form or submission may be introduced under this boundary set.
