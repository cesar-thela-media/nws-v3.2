import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ia = fs.readFileSync(path.join(root, "src/data/informationArchitecture.ts"), "utf8");
const sitemap = fs.readFileSync(path.join(root, "src/app/sitemap.ts"), "utf8");
const robots = fs.readFileSync(path.join(root, "src/app/robots.ts"), "utf8");
const notFound = fs.readFileSync(path.join(root, "src/app/not-found.tsx"), "utf8");
const form = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/contact-01/contact-form.tsx"), "utf8");
const api = fs.readFileSync(path.join(root, "src/app/api/submit/route.ts"), "utf8");
const layout = fs.readFileSync(path.join(root, "src/app/layout.tsx"), "utf8");

test("release metadata routes use canonical production origin and all routes", () => {
  assert.match(sitemap, /canonicalRoutes\.map/);
  assert.match(sitemap, /metadataRules\.canonicalPath/);
  assert.match(robots, /metadataRules\.siteUrl.*sitemap\.xml/s);
  assert.match(ia, /canonicalRoutes = \[/);
  assert.match(layout, /metadataBase: new URL\("https:\/\/www\.nws-homes\.com"\)/);
  assert.match(layout, /alternates: \{ canonical: "https:\/\/www\.nws-homes\.com\/" \}/);
});

test("branded not-found experience preserves release CTAs", () => {
  assert.match(notFound, /Page not found/);
  assert.match(notFound, /href="\/services\/"/);
  assert.match(notFound, /href="\/areas-we-serve\/"/);
  assert.match(notFound, /href="\/contact\/"/);
  assert.match(notFound, /tel:2812992309/);
});

test("mounted contact form has accessible labels and truthful feedback", () => {
  for (const id of ["firstName", "lastName", "email", "phone", "zip", "service", "message", "terms"]) {
    assert.match(form, new RegExp(`id=\\"${id}\\"`));
  }
  assert.match(form, /htmlFor="firstName"/);
  assert.match(form, /htmlFor="lastName"/);
  assert.match(form, /htmlFor="email"/);
  assert.match(form, /htmlFor="phone"/);
  assert.match(form, /htmlFor="zip"/);
  assert.match(form, /htmlFor="service"/);
  assert.match(form, /htmlFor="message"/);
  assert.match(form, /role="status" aria-live="polite"/);
  assert.match(form, /!response\.ok \|\| !result\.ok/);
  assert.match(form, /submission_failed/);
});

test("submit API has explicit invalid JSON and webhook failure responses", () => {
  assert.match(api, /invalid_json/);
  assert.match(api, /webhook_failed/);
  assert.match(api, /webhook_error/);
  assert.match(api, /delivered: false/);
});
