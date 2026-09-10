# Hostinger Deploy Notes

How Lovable + TanStack Start projects run on **Hostinger Business Hosting**,
and how to pick a database + auth model per project.

## TL;DR

The stack is **1-op-1 compatibel** met Hostinger Business. Geen
`vite.config.ts` of `src/server.ts` wijziging nodig. Nitro (de build-tool
achter `@lovable.dev/vite-tanstack-config`) detecteert de Node target
automatisch bij een GitHub-import op Hostinger. Bevestigd op de live
referentie **Prani Kulturu Pro** (zelfde stack, Framework: Nitro, Node 22.x).

---

## 1. Deploy-flow (Lovable → GitHub → Hostinger)

1. Lovable project → GitHub sync aan via workspace Git settings
   (Plus-menu → GitHub → Connect project).
2. Hostinger hPanel → **Websites → Add website → Import from GitHub** →
   selecteer repo + `main` branch.
3. Auto-deployment aan zetten. Elke push naar `main` triggert een build en
   deploy.
4. Hostinger detecteert **Nitro** in de repo en bouwt met de **Node preset**
   (Node 22.x standaard, ook 18/20/24 beschikbaar).
5. Custom domain koppelen via Hostinger `Domains`; SSL/CDN staan default aan.

Runtime logs zijn zichtbaar onder `Websites → <site> → Runtime logs`.

## 2. Waarom het werkt zonder aanpassing

- `@lovable.dev/vite-tanstack-config` gebruikt **Nitro** als build-tool.
- Nitro is universeel: Cloudflare Worker preset in Lovable preview/publish,
  Node preset op Hostinger. Zelfde source, andere output.
- `createServerFn`, server routes (`src/routes/api/**`), TanStack Router,
  en de `devmart-admin` shell zijn allemaal **preset-onafhankelijk**.
- `src/server.ts` (SSR error wrapper) werkt op beide runtimes — het is een
  standaard `{ fetch }` handler die Node net zo goed serveert als workerd.

## 3. Environment variables

Instellen in Hostinger: `Websites → <site> → Environment variables`.

- **Server-only** (geen `VITE_` prefix): `DATABASE_URL`, `SESSION_SECRET`,
  `JWT_SECRET`, externe API keys. Lees altijd via `process.env.X` **binnen**
  een `.handler()` body of server route handler, nooit op module scope
  (module-init runs voordat env is geïnjecteerd op sommige presets).
- **Client-side** (`VITE_*`): ingebakken bij build. Wijziging = redeploy.
- **Geen** secrets ooit als `VITE_` variabele — die eindigen in het browser
  bundle.

## 4. DB keuze per project

| Optie | Wanneer | Setup |
| --- | --- | --- |
| **Geen DB** | Marketing site, portfolio, statische frontend | Niets extra |
| **MySQL** (Hostinger native) | SaaS/tools zonder Supabase-vendor lock | `mysql2` + `drizzle-orm`, `DATABASE_URL` uit Hostinger Databases, migraties via `drizzle-kit` naar `src/db/migrations/` |
| **Supabase** | Realtime, Auth, Storage nodig | Lovable Cloud aan, of eigen Supabase project. Werkt naast Hostinger (Supabase = externe API, host-onafhankelijk) |

MySQL basisstructuur (referentie, niet nu implementeren):

```
src/db/
  client.ts          # createPool(process.env.DATABASE_URL) inside a lazy getter
  schema.ts          # drizzle schema
  migrations/        # drizzle-kit output
```

Alle queries in `createServerFn` handlers of server routes — nooit op module
scope, nooit vanuit componenten.

## 5. Auth keuze per project

| Model | Wanneer | Kern |
| --- | --- | --- |
| **Supabase Auth** | Je gebruikt Supabase als DB | Bestaande `requireSupabaseAuth` middleware, `_authenticated/` route gate, Google/Apple via broker |
| **Eigen sessie-auth** | MySQL setup, customer-facing signup | `useSession` uit `@tanstack/react-start/server` (encrypted cookies), `SESSION_SECRET` env, users tabel in MySQL, wachtwoorden met argon2/bcrypt |
| **Lovable workspace identity** | Interne tool, teamleden zijn al op Lovable ingelogd | `$getSessionUser()` uit `@/lib/session`, geen login-flow nodig |
| **OAuth (Google/Apple)** | Public app | Via Supabase Auth broker, of eigen OAuth client (bijv. `arctic` + eigen sessie) bij pure MySQL |

`useSession` skeleton voor MySQL setup:

```ts
import { useSession } from "@tanstack/react-start/server";

const sessionConfig = {
  password: process.env.SESSION_SECRET!, // 32+ chars
  name: "app-session",
  maxAge: 60 * 60 * 24 * 7,
  cookie: { secure: true, sameSite: "lax" as const, httpOnly: true },
};
```

## 6. Beslismatrix per project-type

| Project-type | DB | Auth |
| --- | --- | --- |
| Marketing / portfolio | Geen | Geen |
| Interne tool / employee portal | MySQL of Supabase | Lovable workspace identity |
| Admin backoffice (devmart-admin) | MySQL of Supabase | Sessie-auth of Supabase Auth |
| Customer SaaS met realtime | Supabase | Supabase Auth |
| Customer SaaS zonder realtime | MySQL | Eigen sessie-auth of OAuth |

## 7. Afwijkingen t.o.v. Cloudflare Worker preset

Niet-blokkerend, maar goed om te weten:

- **Geen Cloudflare-specifieke APIs** (KV, R2, D1, Durable Objects). De
  default Lovable stack gebruikt deze niet, dus geen issue.
- **Echte Node filesystem** (i.p.v. workerd virtual fs). Meer vrijheid; je
  kunt bijv. lokaal bestanden schrijven naar `/tmp` als je dat wilt.
- **Concurrency-model verschilt** — Node process met event loop i.p.v.
  worker isolates. Relevant voor tuning en long-lived state, niet voor
  compatibiliteit.
- **Cold starts** zijn typisch trager op Node hosting; niet dramatisch bij
  Hostinger Business met een `Running` state.

## 8. Verificatie na eerste deploy

1. `curl -sI https://<domein>/` → `200`, `content-type: text/html`.
2. `curl -s https://<domein>/` → volledige HTML inclusief root layout.
3. Als `devmart-admin` geïnstalleerd is: `curl -sI https://<domein>/admin`
   → `200`.
4. Hostinger `Runtime logs` open tijdens de eerste requests — SSR errors
   verschijnen daar direct (via de `src/server.ts` error wrapper).
5. Voor MySQL projecten: een `SELECT 1` server function als healthcheck
   endpoint, en de eerste keer aanroepen om connectiviteit te bevestigen.

## 9. Referenties

- **Werkende referentie**: Prani Kulturu Pro (Lovable workspace) — zelfde
  stack, live op Hostinger via GitHub auto-deploy.
- **Admin shell**: `.agents/skills/devmart-admin/` — stack-agnostisch, werkt
  op zowel Cloudflare Worker als Node preset zonder wijziging.
- **Frontend replacement rule**: `docs/DEVMART_FRONTEND_REMIX_NOTE.md`
  blijft onverkort geldig bij remix + nieuwe frontend template.
- **Nitro presets**: https://nitro.build/deploy — voor als je later een
  andere host wil (Vercel, Netlify, Deno Deploy, VPS met Node).

## 10. Wat NIET nodig is

- Geen `vite.config.ts` override voor Node target — Nitro doet dit.
- Geen aparte Node server (Express/Hono) naast de app — `createServerFn`
  en server routes vervangen dat.
- Geen `nitro.config.ts` in de repo — Lovable config bepaalt dit al.
- Geen migratie voor bestaande Supabase-projecten — die blijven werken;
  Supabase is een externe API en agnostisch t.a.v. de host.