# DEFERRED ITEMS REGISTER — LFB-106

Items carried forward from the accepted stakeholder-review MVP. None of these
is released for implementation by LFB-106. Each requires its own decision
from Delroy.

| ID | Item | Current state | Why deferred | Who acts next |
| --- | --- | --- | --- | --- |
| D-A | Temporary imagery | All hero, category, stakeholder and editorial images are generated placeholders marked temporary in `media-inventory.json` | Generated ≠ licensed or approved. Provenance, public-use review, editorial/institutional approval and privacy/likeness review are outstanding | Delroy (approval) → later implementer |
| D-B | Page-top imagery and composition | Dark services-band base plus two restrained corner patterns (LFB-104); legacy `vz-page-top.svg` superseded but still in the repository | Accepted for this stage; final institutional artwork not supplied | Delroy |
| D-C | Remaining visual polish | Accepted as non-blocking, including the known ~30px sitewide overflow at 1440 caused by the footer `.second-footer-inner` Bootstrap row (negative margins, no horizontal padding) | Cosmetic; fixing it touches ported template geometry | later implementer, on release |
| D-D | Tablet slider maintenance watchpoint | The hero dot strip is positioned `top: 508px; bottom: auto` within 768–991px because the overlapping quick-card row intercepts pointer events at the native position | The offset is anchored to the current hero content height; changing hero copy, slide count or the quick-card row requires re-measuring it | whoever changes hero content |
| D-E | Soft-hyphen portability | `Vreemdelingen&shy;zaken` in `chrome.ts` is a rendering hint; the invisible character may travel with copied hero text | Accepted trade-off for word-safe wrapping | note for content owners |
| D-F | FAQ content dependency | `faqCategories` / `faqItems` are `missing-blocking` and empty; the page shows a governed empty state | No authoritative citeable answers released | Delroy (content) |
| D-G | News content dependency | `notices` is `empty-allowed` and empty; `/nieuws` and `/nieuws/$slug` show governed empty states | Publication authority and approved items not released | Delroy (content) |
| D-H | Lovable preview badge | Present in the Lovable preview environment only; no badge source exists in the repository or the served HTML | Platform/environment condition, not application-controlled. No CSS, markup or setting change was made to hide it | platform-level, out of application scope |
| D-I | Media registry / resolver | Proposed in detail, not implemented; media references still live in `chrome.ts` and `vz-polish.css` | Implementation is a separate release | ACT-CLAUDE-CODE, after release |
| D-J | CMS implementation | Boundaries and adapter interfaces documented; no CMS, no adapter and no data layer exist | Separate release; requires backend decisions | ACT-CLAUDE-CODE, after release |
| D-K | Backend / application submission | Aanvraaghulp is preparation-only by governance; no accounts, uploads, payments, submission, case tracking or persistence | Explicitly out of scope; a new decision, not a continuation | Delroy → later implementer |
| D-L | Unused typed React shell | `src/components/public/layout/**` and the `.vz-public` Tailwind token layer in `src/styles.css` are present but not used by the live Liviza-rendered pages | Retained deliberately; removing or adopting either is a design decision | later implementer |
| D-M | Brand and OG assets unused | `brand/vz-mark.svg`, both wordmarks and `brand/og-image.png` exist but are not referenced by the live chrome or head metadata | No approved institutional logo or social-preview policy | Delroy |
| D-N | Indexing | `publicHead()` emits `robots: noindex, follow` on every route | Content is provisional; indexing must be explicitly released | Delroy |
