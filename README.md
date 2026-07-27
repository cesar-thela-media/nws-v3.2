# NWS Custom Homes and Remodeling

Frontend site for NWS Custom Homes (Richmond, TX) — **Next.js**, **TypeScript**, **Tailwind CSS v4**. Primary deploy target: **Vercel**. Optional Docker / Railway support is included.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4 + Glyph / NWS tokens (`#FF4500` primary)
- Manrope (headings) + Geist (body)
- Node **20.9+** (see `.nvmrc` and `package.json` engines)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` only when you need optional webhooks, Sentry, or map overrides. The site builds and runs without any env vars.

## Build (same as Vercel)

```bash
npm run build
npm start
```

Useful checks:

```bash
npm test
npx tsc --noEmit
```

## Deploy to Vercel

1. Push this repo (or connect the Git remote Vercel already watches).
2. Framework: **Next.js** (auto-detected; `vercel.json` sets install/build).
3. Build: `npm run build` · Install: `npm install` · Node 20.
4. Deploy.

No env vars are required for a working public site (pages, galleries, CTAs, health route).

### Optional production env (Vercel project settings)

| Variable | Purpose |
|----------|---------|
| `WEBHOOK_URL_CONTACT` or `N8N_WEBHOOK_URL` | Contact form → n8n via `POST /api/submit` |
| `WEBHOOK_URL_SCHEDULE` / `WEBHOOK_URL_NEWSLETTER` | Other form types if used |
| `NEXT_PUBLIC_SENTRY_DSN` / `SENTRY_DSN` | Error monitoring (app runs fine without) |
| `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN` | Source map upload at build time |
| `NEXT_PUBLIC_MAPS_EMBED_URL` | Override Areas map embed |
| `NEXT_PUBLIC_AREAS_HERO_BG` | Override Areas hero background image path |

Prefer **server-only** webhook URLs (not `NEXT_PUBLIC_*`) so secrets stay off the browser. Full list: `.env.example`.

### Health check

- `GET /api/health` — returns 200 when the Node process is up (useful for Railway / uptime monitors).

### Notes

- Contact forms post to **`/api/submit`**, which forwards to n8n when a webhook env is set. Without it, the UI still works; submissions are not delivered to n8n.
- Images live under `public/images/`.
- Routes use `trailingSlash: true` in `next.config.ts`.
- On Vercel, Next does **not** force `output: "standalone"`. Standalone is used for Docker / Railway only.
- `scraped/` and root-level screenshot `*.png` files are gitignored and not deployed.
- Sentry is DSN-optional: no keys → no monitoring, build still succeeds.

## Site structure

| Route | Page |
|-------|------|
| `/` | Home |
| `/about/` | About |
| `/contact/` | Contact |
| `/services/` | All services |
| `/services/[slug]/` | Service detail |
| `/faqs/` | FAQs |
| `/areas-we-serve/` | Areas hub |
| `/*-tx/` | Location pages |
| `/*-gallery/` | Project galleries |
| `/api/health` | Health |
| `/api/submit` | Form → n8n proxy |

## Other deploys

- **Docker:** `Dockerfile` (Bun install/build → Node 20 runner with standalone output when not on Vercel).
- **Railway:** `railway.toml` + health check path `/api/health`.
