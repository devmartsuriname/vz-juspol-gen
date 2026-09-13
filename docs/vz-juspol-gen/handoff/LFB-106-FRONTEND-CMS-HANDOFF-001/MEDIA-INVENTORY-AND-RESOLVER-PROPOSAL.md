# MEDIA INVENTORY AND RESOLVER PROPOSAL — LFB-106

Read-only. No image was generated, replaced, moved, resized or re-encoded.
The resolver below is a **proposal only** and is explicitly not implemented.

Machine-readable twin: `media-inventory.json`.

---

## 1. Current media inventory

VZ-owned media root: `public/vz-public/images/`.
Ported template media root: `public/vz-public/liviza/assets/images/`.

### 1.1 Hero (temporary imagery — see deferred register)

| File | Intrinsic | Bytes | Used by |
| --- | --- | --- | --- |
| `hero/vz-hero-01.webp` | 1920×900 | 19 968 | `.vz-hero-slide-1` background (`vz-polish.css`) |
| `hero/vz-hero-01-1280.webp` | 1280×600 | 10 320 | `.vz-hero-slide-1` ≤1280 |
| `hero/vz-hero-01-768.webp` | 768×360 | 5 354 | `.vz-hero-slide-1` ≤768 |
| `hero/vz-hero-02.webp` | 1920×900 | 30 736 | `.vz-hero-slide-2` |
| `hero/vz-hero-02-1280.webp` | 1280×600 | 15 248 | `.vz-hero-slide-2` ≤1280 |
| `hero/vz-hero-02-768.webp` | 768×360 | 7 722 | `.vz-hero-slide-2` ≤768 |
| `hero/vz-hero-03.webp` | 1920×900 | 38 704 | `.vz-hero-slide-3` |
| `hero/vz-hero-03-1280.webp` | 1280×600 | 16 656 | `.vz-hero-slide-3` ≤1280 |
| `hero/vz-hero-03-768.webp` | 768×360 | 7 428 | `.vz-hero-slide-3` ≤768 |

### 1.2 Category cards (`chrome.ts#categoryImage`, all 800×535 WebP)

`category/verblijf.webp` (11 790), `category/vestiging.webp` (8 772),
`category/naturalisatie.webp` (15 070), `category/ingezetenschap.webp`
(14 214), `category/asiel.webp` (13 108), `category/overig.webp` (11 922).
Used by `/diensten` and the category cards on `/`.

### 1.3 Stakeholder cards (`chrome.ts#stakeholderImages`, all 800×650 WebP)

`instantie/vreemdelingendienst.webp` (9 868),
`instantie/immigratiedienst.webp` (13 978),
`instantie/werkvergunningen.webp` (18 544),
`instantie/consulaire-zaken.webp` (10 398),
`instantie/burgerzaken.webp` (14 520),
`instantie/bedrijfsvergunningen.webp` (7 076).
Used by `/instanties` and the home stakeholder section.

### 1.4 Editorial / section imagery

| File | Intrinsic | Bytes | Used by |
| --- | --- | --- | --- |
| `about/vz-about-01.webp` | 530×540 | 9 792 | `/over-ons` |
| `home/vz-home-01.webp` | 512×512 | 8 692 | home section |
| `home/vz-home-02.webp` | 740×550 | 8 370 | home section |

### 1.5 Patterns, page-top and brand

| File | Intrinsic | Bytes | Used by |
| --- | --- | --- | --- |
| `pattern/vz-cta-texture.webp` | 1024×573 | 6 708 | CTA band (`vz-polish.css`) |
| `pattern/vz-pattern-left.svg` | vector | 448 | page-top left corner |
| `pattern/vz-pattern-right.svg` | vector | 2 545 | page-top right corner |
| `pattern/vz-page-top.svg` | vector | 1 841 | legacy page-top artwork (superseded by the LFB-104 dark band) |
| `pattern/vz-pattern-border.svg` | vector | 885 | section border |
| `pattern/vz-footer-pattern.svg` | vector | 672 | footer decoration |
| `pattern/vz-stakeholder-field.svg` | vector | 684 | stakeholder section field |
| `brand/vz-mark.svg` | vector | 345 | brand mark (not rendered in live chrome) |
| `brand/vz-wordmark-dark.svg` | vector | 664 | brand wordmark (not rendered in live chrome) |
| `brand/vz-wordmark-light.svg` | vector | 664 | brand wordmark (not rendered in live chrome) |
| `brand/og-image.png` | raster | 71 032 | social preview asset (not referenced by the current head metadata) |

### 1.6 Inherited template media still referenced

`vz-polish.css` references two ported Liviza raster patterns:
`/vz-public/liviza/assets/images/homepage-1/bg/bg-pattarn.png` and
`…/bg-pattarn-left.png`. The full ported image tree under
`public/vz-public/liviza/assets/images/` remains in the repository; only these
two are referenced by VZ-owned CSS. Template-origin imagery is licensed under
the purchased Liviza licence and must never be published as a downloadable
template distribution.

### 1.7 Reference style today

There is no media registry. References live in two places only:
1. `src/lib/public/template/chrome.ts` — `VZ_IMAGES`, `categoryImage`,
   `stakeholderImages` (string paths).
2. `public/vz-public/css/vz-polish.css` — `background-image` declarations for
   hero slides, page-top patterns and the CTA texture.

Consequence: media identity is coupled to file paths and to CSS class names
(`vz-hero-slide-1..3`), so no CMS can change an image without a code or CSS
edit. That is exactly what the resolver below removes.

---

## 2. Media registry / resolver proposal (NOT IMPLEMENTED)

### 2.1 Principle

Components and CSS stop naming files. They name a **stable media ID**; a
resolver returns everything needed to render it.

```text
component/CSS  ──asks for──>  media ID ("hero.slide-1")
                                  │
                          media registry entry
                                  │
        ┌─────────────┬───────────┴───────────┬──────────────┐
   sources/variants   intrinsic size      alt + focal     status/version
```

### 2.2 Proposed entry shape

| Field | Type | Purpose |
| --- | --- | --- |
| `id` | stable string, dot-namespaced (`hero.slide-1`, `category.verblijf`) | replaces component-owned file paths |
| `type` | `photo \| illustration \| pattern \| logo \| document-thumb \| og` | selects placeholder and review rules |
| `source` | local public path **or** CMS URL | single source of truth |
| `aspectRatio` | `"16:9"`, `"800:535"` … | layout stability, prevents CLS |
| `intrinsicWidth`, `intrinsicHeight` | number | required `width`/`height` attributes |
| `variants[]` | `{ width, path, format }` | responsive `srcset` (today: 768 / 1280 / 1920 for hero) |
| `preferredFormat` | `"webp"` | WebP is the delivery default |
| `fallbackFormat` | `"jpg" \| "png" \| null` | alternative for non-WebP clients |
| `alt` | Dutch string, or `""` for decorative | accessibility; decorative patterns use `""` + `aria-hidden` |
| `focalPoint` | `{ x: 0..1, y: 0..1 }` | correct cropping across breakpoints |
| `usage[]` | `{ route, component }` | reverse index; makes orphan/duplicate detection possible |
| `placeholder` | `"none" \| "solid-token" \| "blur"` | defined behaviour when the asset is missing — never a broken image |
| `version` | integer or content hash | cache busting on replacement |
| `status` | `"temporary" \| "approved" \| "retired"` | blocks unapproved imagery from a public release |
| `provenance` | `{ origin, licence, reviewedBy, reviewedAt, publicUseApproved, privacyReviewed }` | records that "generated" is not the same as "licensed and approved" |

### 2.3 Resolver surface

```ts
// proposal only — do not implement under LFB-106
getMedia(id: MediaId): MediaEntry | null;
resolveSrcSet(id: MediaId): { src: string; srcSet: string; sizes: string } | null;
```

Rules the resolver must enforce:
1. Unknown ID → `null` → the consumer renders the documented placeholder, not
   a broken image.
2. `status: "temporary"` is rendered in private/stakeholder environments and
   must be reportable as a blocking list before any public release.
3. `alt` is mandatory for `type: photo|illustration`; decorative types must
   use an empty alt.
4. Replacing an asset bumps `version`; public paths for documents (PDFs) stay
   stable regardless of version.

### 2.4 Migration sketch (later, separately released)

1. Freeze the inventory above as the initial registry, one entry per row.
2. Replace `categoryImage` / `stakeholderImages` lookups with `getMedia()`.
3. Replace the hero background CSS classes with resolver-driven inline
   `background-image` or `<picture>` markup, keeping the current composition.
4. Only then allow CMS-owned media URLs.

No step of this migration is authorised by LFB-106.
