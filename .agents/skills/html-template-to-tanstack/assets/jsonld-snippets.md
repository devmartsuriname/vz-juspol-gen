# JSON-LD snippets for TanStack `head().scripts`

All snippets inject via:

```tsx
scripts: [{
  type: "application/ld+json",
  children: JSON.stringify({ /* schema object */ }),
}]
```

`children` MUST be a string. Never pass the object directly. Schemas
stack — a single route can inject multiple JSON-LD blocks.

---

## Organization (sitewide — in `__root.tsx`)

```ts
{
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Acme Studio",
  url: "https://acme.example",
  logo: "https://acme.example/logo.png",
  sameAs: [
    "https://twitter.com/acme",
    "https://linkedin.com/company/acme",
    "https://github.com/acme",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@acme.example",
    contactType: "customer support",
  },
}
```

## WebSite (home route — enables sitelinks search box)

```ts
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Acme Studio",
  url: "https://acme.example",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://acme.example/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}
```

## Article (blog post leaf `/blog/$slug`)

```ts
{
  "@context": "https://schema.org",
  "@type": "Article",
  headline: loaderData.title,
  description: loaderData.excerpt,
  image: loaderData.coverImage,           // absolute URL, required
  datePublished: loaderData.publishedAt,  // ISO 8601
  dateModified: loaderData.updatedAt,
  author: { "@type": "Person", name: loaderData.author },
  publisher: {
    "@type": "Organization",
    name: "Acme Studio",
    logo: { "@type": "ImageObject", url: "https://acme.example/logo.png" },
  },
}
```

## Product (product leaf `/products/$slug`)

```ts
{
  "@context": "https://schema.org",
  "@type": "Product",
  name: loaderData.title,
  description: loaderData.description,
  image: loaderData.image,                // absolute URL
  sku: loaderData.sku,
  brand: { "@type": "Brand", name: "Acme" },
  offers: {
    "@type": "Offer",
    price: loaderData.price,
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: `https://acme.example/products/${loaderData.slug}`,
  },
  aggregateRating: loaderData.rating && {
    "@type": "AggregateRating",
    ratingValue: loaderData.rating.average,
    reviewCount: loaderData.rating.count,
  },
}
```

## FAQPage (FAQ route `/faq`)

```ts
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
}
```

## BreadcrumbList (any deep route — append alongside primary schema)

```ts
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://acme.example/" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://acme.example/blog" },
    { "@type": "ListItem", position: 3, name: loaderData.title, item: `https://acme.example/blog/${loaderData.slug}` },
  ],
}
```

---

## Building absolute URLs during SSR

Never hardcode a host. Read the request origin server-side:

```ts
// src/lib/origin.functions.ts
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

export const getRequestOrigin = createServerFn({ method: "GET" }).handler(() => {
  const req = getRequest();
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host = req.headers.get("host")!;
  return `${proto}://${host}`;
});
```

Pass the origin through the loader and prepend it to any URL in the
JSON-LD payload. This keeps the site correct across Cloudflare,
Hostinger, custom domains, and previews.

## Stacking schemas on one route

```tsx
scripts: [
  { type: "application/ld+json", children: JSON.stringify(articleSchema) },
  { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
]
```

## Validation

Paste each rendered block into <https://validator.schema.org/> before
publish. Every route with JSON-LD must validate clean.