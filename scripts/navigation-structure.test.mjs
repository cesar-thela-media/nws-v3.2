import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const navbar = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/navbar-02/navbar.tsx"), "utf8");
const footer = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/footer-01/footer.tsx"), "utf8");
const ia = fs.readFileSync(path.join(root, "src/data/informationArchitecture.ts"), "utf8");

const services = [
  "custom-home-builder", "remodeling-company", "kitchen-remodeling", "bathroom-remodeling", "home-remodel", "bathroom-shower-remodel", "bathtub-remodeling", "room-additions-home-additions", "basement-remodeling-finishing", "garage-remodel-contractors", "open-concept-remodeling",
];
const areas = [
  "sugar-land-tx", "katy-tx", "fulshear-tx", "west-side-of-houston-tx", "cinco-ranch-tx", "rosenberg-tx", "weston-lakes-tx", "park-row-tx",
];

test("mounted navbar consumes canonical service and area registries", () => {
  assert.match(navbar, /canonicalServiceCatalog/);
  assert.match(navbar, /canonicalServiceAreaCatalog/);
  assert.match(navbar, /const serviceNavigationItems/);
  assert.match(navbar, /const areaNavigationItems/);
  assert.match(navbar, /items: serviceNavigationItems/);
  assert.match(navbar, /items: areaNavigationItems/);
  assert.match(navbar, /href="\/contact\/"/);
  assert.match(navbar, /tel:2812992309/);
});

test("canonical navigation includes every service and linked service area", () => {
  for (const slug of services) assert.match(ia, new RegExp(`slug: "${slug}"`));
  for (const slug of areas) assert.match(ia, new RegExp(`slug: "${slug}"`));
  assert.match(ia, /slug: "richmond-tx", label: "Richmond, TX", href: null/);
});

test("mounted footer consumes all canonical services and exact review CTA", () => {
  assert.match(footer, /canonicalServiceCatalog\.map/);
  assert.match(footer, /site\.social\.googleReview/);
  assert.match(footer, /Leave Us a Review!/);
  assert.match(footer, /View All Our Services/);
});
