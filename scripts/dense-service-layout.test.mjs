import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const require = createRequire(import.meta.url);
const restore = fs.readFileSync(path.join(root, "scripts/copy-restore-parity.test.mjs"), "utf8");
const data = fs.readFileSync(path.join(root, "src/data/servicePages.ts"), "utf8");
const page = fs.readFileSync(path.join(root, "src/app/services/[slug]/page.tsx"), "utf8");
const helper = fs.readFileSync(path.join(root, "src/components/ServiceDetailSections.tsx"), "utf8");
const renderer = `${page}\n${helper}`;

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractNeedles(source, name) {
  const match = source.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\];`));
  assert.ok(match, `needles ${name} not found in copy-restore test`);
  return [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
}

function headingHasFlag(heading) {
  const idx = data.indexOf(`heading: "${heading}"`);
  if (idx < 0) return false;
  const window = data.slice(idx, idx + 180);
  return /expandable:\s*true/.test(window);
}

test("restored bathroom and custom-home needles remain in shipped service data", () => {
  const shipped = normalize(data);
  for (const needle of [
    ...extractNeedles(restore, "bathroomNeedles"),
    ...extractNeedles(restore, "customNeedles"),
  ]) {
    assert.ok(shipped.includes(normalize(needle)), `missing restored needle: ${needle.slice(0, 100)}`);
  }
});

test("shipped renderer maps every stored section field and does not slice display content", () => {
  assert.match(page, /const introParagraphs = page\.intro/);
  assert.match(page, /const sectionHighlights = page\.sections/);
  assert.match(page, /introParagraphs\.map/);
  assert.match(helper, /overview\.map\(\(section\)/);
  assert.match(helper, /educational\.map\(\(section/);
  assert.match(helper, /section\.paragraphs\?\.map/);
  assert.match(helper, /section\.bullets\.map/);
  assert.match(helper, /section\.subBlocks\?\.map/);
  assert.match(helper, /block\.items\.map/);
  assert.doesNotMatch(renderer, /sections\.slice\(/);
  assert.doesNotMatch(renderer, /intro\.slice\(/);
  assert.doesNotMatch(renderer, /paragraphs\.slice\(0,\s*[0-9]/);
  assert.doesNotMatch(renderer, /bullets\.slice\(0,\s*[0-9]/);
  assert.doesNotMatch(renderer, /subBlocks\.slice\(/);
});

test("bathroom and custom-home educational blocks use the shipped accordion while intro stays visible", () => {
  assert.match(page, /<ServiceDetailSections sections=\{sectionHighlights\} \/>/);
  assert.match(page, /introParagraphs\.map/);
  assert.doesNotMatch(page, /Accordion/);
  assert.match(helper, /Accordion/);
  assert.match(helper, /AccordionTrigger/);
  assert.match(helper, /AccordionContent/);
  assert.match(helper, /keepMounted/);
  assert.match(helper, /data-service-educational-accordion/);
  assert.match(helper, /data-service-overview/);
  assert.match(helper, /section\.expandable/);

  const bathroomExpandable = [
    "The Latest Bathroom Models: Modern Trends and Innovations in Remodeling",
    "Built for Texas Humidity and Long-Term Performance",
    "Smart Technology in Modern Bathrooms",
    "Energy-Efficient and Sustainable Materials",
  ];
  const bathroomOpen = [
    "Start-to-Finish Bathroom Renovation",
    "Work With a Professional Bathroom Remodeler",
    "Let Our Bathroom Remodeling Company Transform Your Space",
  ];
  const customExpandable = [
    "Custom vs. Production Homes: Pros, Cons & Top Texas Design Trends",
    "Custom Homes: Built Around You",
    "A Step-by-Step Custom Home Building Process",
    "Finding the Right Lot in Fort Bend County",
    "Top Design Trends for New Construction Homes in Texas",
    "Production Homes: Convenient and Cost-Effective",
    "Choosing What's Right for You",
    "Lessons Learned From Supply Chain Challenges During the Pandemic",
  ];
  const customOpen = [
    "A Space as Unique as You Are",
    "Why Choose Us as Your Home Construction Partner?",
    "Start Your Journey with a Professional Construction Company",
  ];

  for (const heading of bathroomExpandable.concat(customExpandable)) {
    assert.equal(headingHasFlag(heading), true, `${heading} should be expandable`);
  }
  for (const heading of bathroomOpen.concat(customOpen)) {
    assert.equal(headingHasFlag(heading), false, `${heading} should stay open`);
  }
});
