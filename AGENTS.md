<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## ⚠ Frontend replacement rule (READ ON REMIX)

This project is an **admin backoffice shell** (`/admin/*`), not a finished
website. `src/routes/index.tsx` + `src/styles.css` are a **placeholder**
Tailwind/shadcn baseline — they exist only so the app boots.

When a frontend template is being installed on a remix of this project
(via `html-template-to-tanstack` or any other frontend skill), the **first**
actions must be:

1. Replace `src/routes/index.tsx` with the template's home route.
2. Replace `src/styles.css` with the template's global CSS (or strip it to
   `@import "tailwindcss";` if the template doesn't ship one).
3. Only then generate the rest of the frontend.

Never `@import` admin CSS into `src/styles.css`, and never edit
`src/routes/admin.tsx`, `src/routes/admin/**`, `src/lib/admin/**`, or
`public/admin/assets/**` from a frontend skill — those are CSS-isolated
and independent.

Full details: [`docs/DEVMART_FRONTEND_REMIX_NOTE.md`](docs/DEVMART_FRONTEND_REMIX_NOTE.md).

## Docs index

The remix note above is the entry point; it contains the full
**Reference map** linking every baseline doc and skill. Quick pointers:

- Admin: [`docs/DEVMART_ADMIN_CSS_ISOLATION.md`](docs/DEVMART_ADMIN_CSS_ISOLATION.md), [`docs/DEVMART_ADMIN_LIBRARY.md`](docs/DEVMART_ADMIN_LIBRARY.md), [`docs/DEVMART_ADMIN_PAGES.md`](docs/DEVMART_ADMIN_PAGES.md), [`docs/DEVMART_ADMIN_MASTER_TASKS.md`](docs/DEVMART_ADMIN_MASTER_TASKS.md)
- Frontend: [`docs/DEVMART_SEO_GSO_GUIDE.md`](docs/DEVMART_SEO_GSO_GUIDE.md)
- Deploy: [`docs/HOSTINGER_DEPLOY_NOTES.md`](docs/HOSTINGER_DEPLOY_NOTES.md)
- Skills: [`.agents/skills/devmart-admin/SKILL.md`](.agents/skills/devmart-admin/SKILL.md), [`.agents/skills/html-template-to-tanstack/SKILL.md`](.agents/skills/html-template-to-tanstack/SKILL.md)

## SEO / GSO baseline

Every project remixed from this baseline follows the SEO and Generative
Search Optimization conventions in
[`docs/DEVMART_SEO_GSO_GUIDE.md`](docs/DEVMART_SEO_GSO_GUIDE.md):
per-route `head()` with unique title/description/OG, canonical on leaf
routes only, dynamic sitemap via `src/routes/sitemap[.]xml.ts`,
`public/robots.txt`, JSON-LD on content routes, and `public/llms.txt`
for AI crawlers. The `html-template-to-tanstack` skill applies this
guide automatically in Phase 9.
