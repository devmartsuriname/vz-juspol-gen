# WIZARD — PREPARATION-ONLY BOUNDARY — LFB-106

Route: `/aanvraaghulp`
Markup: `src/lib/public/template/liviza-wizard.html.ts`
Behaviour: `public/vz-public/js/vz-wizard.js`

---

## 1. What Aanvraaghulp is

Aanvraaghulp is **guidance and preparation support only**. It asks two
categorical questions and then shows the governed information that already
exists for the chosen service: summary, conditions, recorded facts (fee,
legal basis, processing time where recorded) and the registered PDF.

The on-page notice states this explicitly:

> "De aanvraaghulp geeft informatie en helpt u voorbereiden. U dient hier
> niets in, u maakt geen account aan en er wordt niet om persoonsgegevens
> gevraagd."

## 2. What it explicitly does NOT do

Verified by reading the two files above: the wizard provides **no**

- applicant account;
- authentication or sign-in;
- personal-data collection (no name, address, date of birth, document number);
- free-text input of any kind;
- file upload;
- payment;
- application submission;
- case or reference number;
- case tracking;
- database or server persistence;
- eligibility decision or application decision;
- analytics, telemetry or third-party tag;
- network call of any kind.

The only persisted value is a pair of categorical slugs:

```js
localStorage["vz-aanvraaghulp"] = { category, service, saved }  // TTL 24h
```

`saved` is a timestamp; entries older than 24 hours are deleted on read.
"Opnieuw beginnen" clears the key. No personal data is involved, and the
value never leaves the browser.

## 3. Current model (for later backend integration)

```text
Step 1  category choice     → 6 categories (B-05)
Step 2  service choice      → services in that category (B-06)
Step 3  outcome (read-only) → summary, conditions, facts, registered PDF
```

| Element | Source | Attribute in markup |
| --- | --- | --- |
| Step container | `liviza-wizard.html.ts` | `[data-vz-wizard]`, `.vz-wizard-step[data-vz-step="1..3"]` |
| Category choice | `categories` | `data-vz-category="<slug>"` |
| Service choice | `servicesInCategory(slug)` | `data-vz-service="<category>/<slug>"` |
| Outcome content | `ServiceRecord` + `documentFor(service)` | rendered server-side for every service |
| Live region | — | `.vz-wizard-live` (polite announcements) |

All steps and all outcomes are rendered server-side; the script only toggles
visibility. That means the whole decision surface is statically inspectable
and index-free — there is no hidden client logic to audit later.

Navigation model: the outcome links to the corresponding
`/diensten/$categorie/$slug` page and to the registered PDF under
`/vz-public/documenten/`. Those are the only outbound targets.

## 4. Rules for a later, separately approved backend

1. The accepted public presentation must not change as a side effect of
   backend work. Any layout, wording or step-count change requires its own
   approval from Delroy.
2. The categorical choice model (category slug + service slug) is the stable
   contract. A backend may consume it; it may not widen it into personal data
   without an explicit, separately released decision.
3. Submission, accounts, uploads, payments and case tracking are **out of
   scope by governance**, not merely unimplemented. Adding any of them is a
   new decision, not a continuation of this work.
4. Nothing in the outcome may be re-labelled as an eligibility or application
   decision.
5. If persistence is ever introduced, the 24-hour categorical `localStorage`
   value must not silently become an identity or a case reference.
