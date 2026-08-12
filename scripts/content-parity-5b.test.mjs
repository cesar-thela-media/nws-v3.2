import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const servicesPage = fs.readFileSync(path.join(root, "src/app/services/page.tsx"), "utf8");
const servicesBlock = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/services-10/services.tsx"), "utf8");
const detailPage = [
  fs.readFileSync(path.join(root, "src/app/services/[slug]/page.tsx"), "utf8"),
  fs.readFileSync(path.join(root, "src/components/ServiceDetailSections.tsx"), "utf8"),
].join("\n");
const serviceData = fs.readFileSync(path.join(root, "src/data/servicePages.ts"), "utf8");
const servicesData = fs.readFileSync(path.join(root, "src/data/services.ts"), "utf8");

const core = ["custom-home-builder", "remodeling-company", "kitchen-remodeling", "bathroom-remodeling", "home-remodel"];
const labels = ["Custom Home Building", "Remodeling", "Kitchen Remodeling", "Bathroom Remodeling", "Whole Home Remodeling", "Shower Remodel", "Bathtub Remodel", "Room Additions & Home Additions", "Basement Remodeling / Finishing", "Garage Conversions & Remodeling", "Living Room & Open Concept Remodeling"];

test("services index uses source heading/intro and canonical service cards", () => {
  assert.match(servicesPage, /Our Quality Services/);
  assert.match(servicesPage, /Our wide range of services means we can build you a custom home/);
  assert.match(servicesPage, /services=\{serviceCards\.map/);
  assert.match(servicesBlock, /services = nwsServices10/);
});

test("services index data retains all eleven authoritative service labels/routes", () => {
  for (const label of labels) assert.match(servicesData, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  for (const slug of ["custom-home-builder", "remodeling-company", "kitchen-remodeling", "bathroom-remodeling", "home-remodel", "bathroom-shower-remodel", "bathtub-remodeling", "room-additions-home-additions", "basement-remodeling-finishing", "garage-remodel-contractors", "open-concept-remodeling"]) {
    assert.match(servicesData, new RegExp(`href: "/services/${slug}/"`));
  }
});

test("core service renderer preserves full data structures and page-specific CTA/FAQ fields", () => {
  assert.match(detailPage, /const introParagraphs = page\.intro/);
  assert.match(detailPage, /const sectionHighlights = page\.sections/);
  assert.doesNotMatch(detailPage, /slice\(0, 4\)/);
  assert.doesNotMatch(detailPage, /slice\(0, 1\)/);
  assert.match(detailPage, /section\.subBlocks/);
  assert.match(detailPage, /page\.ctaTitle/);
  assert.match(detailPage, /page\.ctaText/);
  assert.match(detailPage, /page\.ctaButton/);
  assert.match(detailPage, /page\.faqHeading/);
  for (const slug of core) assert.match(serviceData, new RegExp(`slug: "${slug}"`));
});

test("core service metadata and FAQ headings are source-specific", () => {
  assert.match(serviceData, /crafting quality, personalized homes/);
  assert.match(serviceData, /deliver quality home renovations/);
  assert.match(serviceData, /beautiful, functional spaces/);
  assert.match(serviceData, /Bathroom Remodeling Richmond, TX \| NWS Custom Homes and Remodeling/);
  assert.match(serviceData, /tailored to your style/);
  assert.match(serviceData, /Custom Home Building FAQ/);
  assert.match(serviceData, /Frequently Asked Questions About Kitchen Remodeling/);
  assert.match(serviceData, /Bathroom Remodeling FAQ/);
  assert.match(serviceData, /Frequently Asked Questions About Home Remodeling/);
});
