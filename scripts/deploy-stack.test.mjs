/**
 * Deploy-stack readiness: Docker/Railway, health, n8n submit, Sentry scaffold, Areas maps.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (...p) => fs.readFileSync(path.join(root, ...p), "utf8");
const exists = (...p) => fs.existsSync(path.join(root, ...p));

test("Docker: Bun build + Node 20 runs server.js", () => {
  const d = read("Dockerfile");
  assert.match(d, /oven\/bun/);
  assert.match(d, /node:20/);
  assert.match(d, /bun run build/);
  assert.match(d, /node.*server\.js|CMD \["node", "server\.js"\]/);
});

test("Railway healthcheck points at /api/health", () => {
  const t = read("railway.toml");
  assert.match(t, /healthcheckPath\s*=\s*"\/api\/health"/);
  assert.ok(exists("src", "app", "api", "health", "route.ts"));
});

test("api/submit proxies contact forms to n8n webhook env", () => {
  const api = read("src", "app", "api", "submit", "route.ts");
  assert.match(api, /WEBHOOK_URL_CONTACT|N8N_WEBHOOK_URL/);
  assert.match(api, /export async function POST/);
  for (const rel of [
    ["src", "components", "ContactForm.tsx"],
    ["src", "components", "shadcn-space", "blocks", "contact-01", "contact-form.tsx"],
  ]) {
    const f = read(...rel);
    assert.match(f, /\/api\/submit/);
  }
});

test("Sentry is DSN-ready and disabled without credentials", () => {
  assert.ok(exists("sentry.client.config.ts"));
  assert.ok(exists("sentry.server.config.ts"));
  assert.ok(exists("sentry.edge.config.ts"));
  assert.ok(exists("instrumentation.ts"));
  const client = read("sentry.client.config.ts");
  assert.match(client, /NEXT_PUBLIC_SENTRY_DSN|Sentry\.init/);
  assert.match(client, /if \(dsn\)/);
  const nc = read("next.config.ts");
  assert.match(nc, /withSentryConfig/);
  const pkg = JSON.parse(read("package.json"));
  assert.ok(pkg.dependencies["@sentry/nextjs"]);
});

test("Areas hero uses project bg + Google Maps embed", () => {
  const page = read("src", "app", "areas-we-serve", "page.tsx");
  const site = read("src", "data", "site.ts");
  const hero = read("src", "components", "shadcn-space", "blocks", "hero-12", "hero.tsx");
  assert.match(page, /mapEmbedSrc/);
  assert.match(page, /backgroundImageSrc|areasHeroBg/);
  assert.match(site, /mapsEmbedUrl/);
  assert.match(site, /maps\.google\.com|google\.com\/maps|output=embed/);
  assert.match(hero, /iframe/);
  assert.match(hero, /mapEmbedSrc/);
});

test("Vercel-safe next config (no forced standalone on VERCEL)", () => {
  const nc = read("next.config.ts");
  assert.match(nc, /process\.env\.VERCEL/);
  assert.match(nc, /standalone/);
});
