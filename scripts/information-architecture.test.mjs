import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const iaPath = path.join(root, "src", "data", "informationArchitecture.ts");
const servicesPath = path.join(root, "src", "data", "services.ts");
const locationsPath = path.join(root, "src", "data", "locations.ts");
const sitePath = path.join(root, "src", "data", "site.ts");
const servicePagesPath = path.join(root, "src", "data", "servicePages.ts");
const faqsPath = path.join(root, "src", "data", "faqs.ts");
const ia = fs.readFileSync(iaPath, "utf8");
const services = fs.readFileSync(servicesPath, "utf8");
const locations = fs.readFileSync(locationsPath, "utf8");
const site = fs.readFileSync(sitePath, "utf8");
const servicePages = fs.readFileSync(servicePagesPath, "utf8");
const faqs = fs.readFileSync(faqsPath, "utf8");

const serviceSlugs = [
  "custom-home-builder",
  "remodeling-company",
  "kitchen-remodeling",
  "bathroom-remodeling",
  "home-remodel",
  "bathroom-shower-remodel",
  "bathtub-remodeling",
  "room-additions-home-additions",
  "basement-remodeling-finishing",
  "garage-remodel-contractors",
  "open-concept-remodeling",
];
const areaSlugs = [
  "richmond-tx",
  "sugar-land-tx",
  "katy-tx",
  "fulshear-tx",
  "west-side-of-houston-tx",
  "cinco-ranch-tx",
  "rosenberg-tx",
  "weston-lakes-tx",
  "park-row-tx",
];
const linkedAreaSlugs = areaSlugs.filter((slug) => slug !== "richmond-tx");
const routePattern = /\/services\/[a-z0-9-]+\//;

function occurrences(source, pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

function assertUnique(values, label) {
  assert.equal(new Set(values).size, values.length, `${label} must be unique`);
}

test("canonical information architecture exports the complete route registries", () => {
  assert.match(ia, /export const canonicalServiceCatalog/);
  assert.match(ia, /export const canonicalServiceAreaCatalog/);
  assert.match(ia, /export const canonicalRoutes/);
  for (const slug of serviceSlugs) assert.match(ia, new RegExp(`slug: "${slug}"`));
  for (const slug of areaSlugs) assert.match(ia, new RegExp(`slug: "${slug}"`));
  assertUnique(serviceSlugs, "service slugs");
  assertUnique(areaSlugs, "area slugs");
  assert.equal(linkedAreaSlugs.length, 8);
});

test("service data and service pages cover all eleven canonical service routes", () => {
  for (const slug of serviceSlugs) {
    assert.match(services, new RegExp(`slug: "${slug}"`), `service card missing ${slug}`);
    assert.match(servicePages, new RegExp(`slug: "${slug}"`), `service page missing ${slug}`);
    assert.match(services, new RegExp(`href: "/services/${slug}/"`), `service card href missing ${slug}`);
    assert.match(servicePages, new RegExp(`slug: "${slug}"[\\s\\S]{0,1800}h1:`), `service page h1 missing ${slug}`);
  }
  assert.equal(occurrences(servicePages, /slug:\s*"([^"]+)"/g).length, 11);
});

test("location data covers all nine canonical service areas and eight linked routes", () => {
  for (const slug of areaSlugs) {
    assert.match(locations, new RegExp(`slug: "${slug}"`), `location missing ${slug}`);
  }
  for (const slug of linkedAreaSlugs) {
    assert.match(locations, new RegExp(`slug: "${slug}"[\\s\\S]{0,140}href: "/${slug}/"`), `location href missing ${slug}`);
  }
  assert.match(locations, /slug: "richmond-tx"[\s\S]{0,120}href: "#"/);
});

test("canonical registries use valid local trailing-slash internal route hrefs", () => {
  const hrefs = occurrences(ia, /href: (?:"|`)(\/[^"`]+)(?:"|`)/g);
  assert.ok(hrefs.length >= 19, `expected canonical catalog hrefs, got ${hrefs.length}`);
  for (const href of hrefs) {
    assert.ok(href === "/" || href.endsWith("/"), `href must have trailing slash: ${href}`);
    assert.ok(!href.includes("//"), `href must not contain duplicate slash: ${href}`);
    if (href.startsWith("/services/") && href !== "/services/") assert.match(href, routePattern);
  }
});

test("canonical contact facts are consumed by site.ts", () => {
  assert.match(site, /canonicalSiteFacts/);
  assert.match(site, /canonicalSocialLinks/);
  assert.match(site, /metadataRules/);
  for (const value of ["2812992309", "7138846571", "info@nws-homes.com", "Richmond, TX"]) {
    assert.match(ia, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(ia, /free consultation and 5% off/);
});

test("canonical metadata rules produce normalized canonical URLs", () => {
  assert.match(ia, /siteUrl: "https:\/\/www\.nws-homes\.com"/);
  assert.match(ia, /titleTemplate:/);
  assert.match(ia, /defaultTitle:/);
  assert.match(ia, /canonicalPath\(pathname: string\)/);
});

test("FAQ registry contains all fifteen captured client questions", () => {
  const questions = occurrences(faqs, /question: "([^"]+)"/g);
  assert.equal(questions.length, 15);
  assertUnique(questions, "FAQ questions");
});
