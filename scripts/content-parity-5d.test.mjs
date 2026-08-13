import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const locations = fs.readFileSync(path.join(root, "src/data/locations.ts"), "utf8");
const renderer = fs.readFileSync(path.join(root, "src/components/LocationPage.tsx"), "utf8");
const areas = ["richmond-tx", "sugar-land-tx", "katy-tx", "fulshear-tx", "west-side-of-houston-tx", "cinco-ranch-tx", "rosenberg-tx", "weston-lakes-tx", "park-row-tx"];
const linked = areas.filter((slug) => slug !== "richmond-tx");
const areaHub = fs.readFileSync(path.join(root, "src/app/areas-we-serve/page.tsx"), "utf8");

test("areas hub preserves captured source headings and exact intro copy", () => {
  assert.match(areaHub, /headline="Areas We Serve"/);
  assert.match(areaHub, /We build new homes specifically to fit your needs\./);
  assert.match(areaHub, /We complete every project promptly, effectively, and with the utmost attention to detail\./);
  assert.match(areaHub, /Mon - Fri: 8:00 AM - 6:00 PM/);
  assert.match(areaHub, /Sat: 8:00 AM - 12:00 PM/);
  assert.match(areaHub, /Sun: Closed/);
});

test("location data contains all nine area records and eight real routes", () => {
  for (const slug of areas) assert.match(locations, new RegExp(`slug: "${slug}"`));
  for (const slug of linked) assert.match(locations, new RegExp(`slug: "${slug}"[\\s\\S]{0,160}href: "/${slug}/"`));
  assert.match(locations, /slug: "richmond-tx"[\s\S]{0,120}href: "#"/);
});

test("LocationPage renders complete area data without truncation", () => {
  assert.match(renderer, /const bodyContent = location\.body/);
  assert.match(renderer, /const sectionsContent = location\.sections/);
  assert.doesNotMatch(renderer, /slice\(0, 2\)/);
  assert.doesNotMatch(renderer, /slice\(0, 3\)/);
  assert.doesNotMatch(renderer, /slice\(0, 5\)/);
  assert.doesNotMatch(renderer, /slice\(0, 4\)/);
  assert.match(renderer, /section\.services\.map/);
  assert.match(renderer, /section\.bullets\.map/);
  assert.match(locations, /Complete Renovation Solutions for Your Property/);
});

test("area-specific source wording and CTA decisions are preserved", () => {
  assert.match(locations, /Enhance your home with our trusted remodeling company in Fulshear/);
  assert.match(locations, /Looking for a remodeling company on West Side of Houston/);
  assert.match(locations, /Discuss Your Remodeling Project Now/);
  assert.match(locations, /Get Started/);
  assert.match(locations, /Start Your Remodeling Project Now/);
  assert.match(locations, /Get Your Free Consultation/);
  assert.match(locations, /Quality home remodeling in Park Row, TX since 2007/);
  assert.match(locations, /Professional Home Remodeling Services in Park Row, TX/);
});

test("all area records retain meaningful headings, body copy, and service links", () => {
  const records = (locations.match(/slug: "[a-z0-9-]+"/g) || []).length;
  assert.ok(records >= 9);
  assert.ok((locations.match(/h1:/g) || []).length >= 9);
  assert.ok((locations.match(/body:/g) || []).length >= 9);
  assert.ok((locations.match(/\/services\//g) || []).length >= 50);
});
