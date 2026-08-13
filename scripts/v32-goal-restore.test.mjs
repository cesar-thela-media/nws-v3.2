/**
 * Drives shipped v3.2 restore files: copy auditor, home hero, review avatars,
 * and homepage service-card photographs.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");

test("copy-parity auditor reports zero omitted source units", () => {
  const auditor = read("scripts", "audit-copy-parity.mjs");
  assert.doesNotMatch(auditor, /hits \/ words\.length >= 0\.85/);
  assert.doesNotMatch(auditor, /hits \/ phrases\.length >= 0\.6/);
  assert.match(auditor, /function haystackForRoute/);
  assert.match(auditor, /function foundInRoute/);
  const ran = spawnSync(process.execPath, ["scripts/audit-copy-parity.mjs"], {
    cwd: root,
    encoding: "utf8",
  });
  assert.equal(ran.status, 0, ran.stderr || ran.stdout);
  const report = JSON.parse(
    read("docs", "v3.2-copy-parity-audit.json"),
  );
  assert.equal(report.totals.omitted, 0, JSON.stringify(report.worstRoutes, null, 2));
  assert.equal(report.navigation.servicesFound, 11);
  assert.equal(report.navigation.areasFound, 8);
});

test("home hero keeps designed one-line prefix and live source H1", () => {
  const page = read("src", "app", "page.tsx");
  const hero = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-01",
    "hero.tsx",
  );
  const roller = read(
    "src",
    "components",
    "shadcn-space",
    "animated-text",
    "animated-text-04.tsx",
  );
  const homeCopy = read("src", "data", "homeCopy.ts");
  assert.match(page, /headline="Custom homes & remodels in"/);
  assert.match(
    page,
    /Choose a Dependable Residential Remodeling Services in Richmond, TX/,
  );
  assert.match(homeCopy, /Discover what it truly means to live in a custom-built/);
  assert.match(hero, /data-hero-prefix/);
  assert.match(hero, /whitespace-nowrap/);
  assert.doesNotMatch(hero, /data-hero-prefix[\s\S]{0,180}whitespace-normal/);
  assert.match(roller, /data-hero-location-line/);
});

test("custom-home-builder ships full cons and FAQ sentences from the corpus", () => {
  const servicePages = read("src", "data", "servicePages.ts");
  assert.match(
    servicePages,
    /1\. Longer Build Time: Because everything is built from scratch, the process can take months or even over a year, depending on complexity and size\./,
  );
  assert.match(
    servicePages,
    /2\. Higher Cost: Personalization comes at a price\. Materials, design, and changes made during the process can increase the overall budget\./,
  );
  assert.match(
    servicePages,
    /3\. Decision Fatigue: With endless choices to make, from fixtures to flooring, some homeowners find the process overwhelming without proper guidance from a professional home builder or construction contractor\./,
  );
  assert.match(
    servicePages,
    /You'll work closely with the construction contractor to choose the floor plan, materials, and finishes, giving you total design freedom\./,
  );
  assert.match(
    servicePages,
    /Texas families love open floor plans that bring the kitchen, dining, and living areas together\./,
  );
  assert.doesNotMatch(servicePages, /Longer Build Time: Process can take months or over a year\./);
});

test("named reviews keep published quotes and letter avatars", () => {
  const reviews = read("src", "data", "reviews.ts");
  const testimonial = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "testimonial-07",
    "testimonial.tsx",
  );
  assert.doesNotMatch(reviews, /\/images\/avatars\/avatar-\d+\.jpg/);
  assert.match(testimonial, /ReviewerAvatar/);
  assert.match(reviews, /name: "Tim O\."/);
  assert.match(reviews, /name: "Mark Dixon"/);
  assert.match(reviews, /name: "Katie Jacob"/);
  assert.match(reviews, /name: "Amy Heinz"/);
  assert.match(
    reviews,
    /Excellent! Very pleased with NWS remodeling\. Great value and they can do anything!/,
  );
  assert.match(
    reviews,
    /NWS did a great job doing the concrete work and building a 12/,
  );
  assert.match(
    reviews,
    /NWS took care of our full home build during the middle of the pandemic/,
  );
  assert.match(reviews, /These guys are top notch\. Contractors are usually tough/);
});

test("room additions and basement homepage cards use project photographs", () => {
  const portfolio = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "portfolio-06",
    "portfolio.tsx",
  );
  const additions = portfolio.match(
    /title: "Room Additions & Home Additions"[\s\S]*?image: "([^"]+)"/,
  );
  const basement = portfolio.match(
    /title: "Basement Remodeling \/ Finishing"[\s\S]*?image: "([^"]+)"/,
  );
  assert.ok(additions?.[1], "room additions image");
  assert.ok(basement?.[1], "basement image");
  assert.match(additions[1], /\.(jpe?g)$/i);
  assert.match(basement[1], /\.(jpe?g)$/i);
  assert.ok(
    fs.existsSync(path.join(root, "public", additions[1])),
    additions[1],
  );
  assert.ok(
    fs.existsSync(path.join(root, "public", basement[1])),
    basement[1],
  );
});
