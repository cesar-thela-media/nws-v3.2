import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const data = fs.readFileSync(path.join(root, "src/data/servicePages.ts"), "utf8");
const renderer = [
  fs.readFileSync(path.join(root, "src/app/services/[slug]/page.tsx"), "utf8"),
  fs.readFileSync(path.join(root, "src/components/ServiceDetailSections.tsx"), "utf8"),
].join("\n");
const hero = fs.readFileSync(path.join(root, "src/components/ServiceDetailHero.tsx"), "utf8");
const services = fs.readFileSync(path.join(root, "src/data/services.ts"), "utf8");

const routes = [
  ["bathroom-shower-remodel", "Expert bathroom shower remodel", "Walk-In Shower Conversion Process"],
  ["bathtub-remodeling", "Expert bathtub remodeling", "Transform Your Bathtub With Style and Function"],
  ["room-additions-home-additions", "Create custom spaces with lasting comfort and value", "Creating Living Spaces That Grow With You"],
  ["basement-remodeling-finishing", "Upgrade your home’s value with our professional team", "Custom Designs Built for Your Lifestyle"],
  ["garage-remodel-contractors", "Enhance your garage with quality upgrades and lasting results", "Your Trusted Partner for Lasting Home Upgrades"],
  ["open-concept-remodeling", "Create flowing, comfortable spaces for your family", "Your Local Remodeling Partner for Modern Homes"],
];

test("remaining service routes retain canonical cards and data entries", () => {
  for (const [slug] of routes) {
    assert.match(data, new RegExp(`slug: "${slug}"`));
    assert.match(services, new RegExp(`href: "/services/${slug}/"`));
  }
});

test("remaining service metadata is source-approved", () => {
  for (const [, description] of routes) assert.match(data, new RegExp(description.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("remaining route content is rendered without shared truncation", () => {
  assert.match(renderer, /const introParagraphs = page\.intro/);
  assert.match(renderer, /const sectionHighlights = page\.sections/);
  assert.doesNotMatch(renderer, /slice\(0, 4\)/);
  assert.doesNotMatch(renderer, /slice\(0, 1\)/);
  assert.match(renderer, /section\.subBlocks/);
  assert.match(renderer, /page\.ctaText/);
  assert.match(renderer, /page\.faqHeading/);
  assert.match(hero, /ctaLabel\?/);
  assert.match(hero, /ctaHref\?/);
});

test("remaining source sections and CTAs are present", () => {
  for (const [, , heading] of routes) assert.match(data, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(data, /Contact us today to bring your vision to life!/);
  assert.match(data, /Reach out now for your consultation/);
  assert.match(data, /enjoy a more functional home this year/);
});
