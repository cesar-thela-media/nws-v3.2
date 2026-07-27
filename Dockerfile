# NWS Homes — multi-stage: Bun (latest) build → Node 20 run standalone
# Vercel ignores this file; Railway/Docker use it.

# --- deps ---
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock* package-lock.json* ./
RUN if [ -f bun.lock ]; then bun install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then bun install; \
    else bun install; fi

# --- build ---
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# Standalone for Docker (VERCEL is unset here)
RUN bun run build

# --- run (Node 20) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
# Next standalone server
CMD ["node", "server.js"]
