/**
 * Regression: em/en dash prose separators, logo on-dark, home polish, page families.
 * Run: node --test scripts/home-polish.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const srcRoot = path.join(root, "src");

function walk(dir, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(ts|tsx|css)$/.test(ent.name)) acc.push(p);
  }
  return acc;
}

function read(...parts) {
  return fs.readFileSync(path.join(root, ...parts), "utf8");
}

/** En dash is allowed only in pure numeric/currency ranges */
function isNumericRangeContext(line, index) {
  const before = line.slice(0, index);
  const after = line.slice(index + 1);
  return /[\d$]\s*$/.test(before) && /^\s*[\d$]/.test(after);
}

test("no U+2014 em dashes in src ts/tsx/css", () => {
  const files = walk(srcRoot);
  const offenders = [];
  for (const f of files) {
    const t = fs.readFileSync(f, "utf8");
    if (t.includes("\u2014")) offenders.push(path.relative(root, f));
  }
  assert.deepEqual(offenders, [], `em dash found in: ${offenders.join(", ")}`);
});

test("no U+2013 en-dash prose separators (numeric ranges allowed)", () => {
  const files = walk(srcRoot);
  const offenders = [];
  for (const f of files) {
    const t = fs.readFileSync(f, "utf8");
    if (!t.includes("\u2013")) continue;
    t.split("\n").forEach((line, i) => {
      let idx = 0;
      while ((idx = line.indexOf("\u2013", idx)) !== -1) {
        if (!isNumericRangeContext(line, idx)) {
          offenders.push(
            `${path.relative(root, f)}:${i + 1}: ${line.trim().slice(0, 100)}`,
          );
        }
        idx += 1;
      }
    });
  }
  assert.deepEqual(
    offenders,
    [],
    `en-dash prose separators found:\n${offenders.join("\n")}`,
  );
});

test("logo has on-dark light asset and no white plate", () => {
  const logo = read("src", "assets", "logo", "logo.tsx");
  const site = read("src", "data", "site.ts");
  assert.doesNotMatch(logo, /bg-white/, "logo must not force bg-white plate");
  assert.match(logo, /logoOnDark|onDark/, "logo must branch for onDark");
  assert.match(
    site,
    /logoOnDark:\s*["']\/images\/nws-logo-on-dark\.png["']/,
    "site.logoOnDark must point at light mark",
  );
  assert.ok(
    fs.existsSync(path.join(root, "public", "images", "nws-logo-on-dark.png")),
    "nws-logo-on-dark.png must exist",
  );
  assert.ok(
    fs.existsSync(path.join(root, "public", "images", "nws-logo-transparent.png")),
    "transparent logo must exist",
  );
  // onDark uses logoOnDark src, not only drop-shadow on dark ink
  assert.match(
    logo,
    /logoOnDark/,
    "Logo component must select logoOnDark when onDark",
  );
});

test("What we do cards are orange (not plain white face only)", () => {
  const p = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "portfolio-06",
    "portfolio.tsx",
  );
  assert.doesNotMatch(
    p,
    /Card className="[^"]*\bbg-card\b[^"]*"/,
    "service Card must not use plain bg-card alone",
  );
  assert.ok(
    p.includes("data-service-card-orange") || p.includes("bg-primary"),
    "service cards should use orange primary surface",
  );
});

test("portfolio-08 sticky cards use official image frame", () => {
  const p = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "portfolio-08",
    "portfolio.tsx",
  );
  assert.ok(
    p.includes("h-70") && p.includes("md:h-full"),
    "official sticky image frame",
  );
  assert.ok(p.includes("sticky"), "stacked cards stay sticky");
  assert.ok(
    !p.includes("h-[min(32rem,70svh)]"),
    "old clipped sticky height must be gone",
  );
});

test("CTA has upper-weighted dark overlay", () => {
  const cta = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "cta-08",
    "cta.tsx",
  );
  assert.ok(
    cta.includes("from-black/80") || cta.includes("from-black/75"),
    "upper half should use strong from-black opacity",
  );
});

test("non-home page families use distinct layout markers", () => {
  const about = read("src", "app", "about", "page.tsx");
  const gallery = read("src", "components", "GalleryPage.tsx");
  const location = read("src", "components", "LocationPage.tsx");
  const services = read("src", "app", "services", "page.tsx");
  const serviceDetail = read("src", "app", "services", "[slug]", "page.tsx");
  const areas = read("src", "app", "areas-we-serve", "page.tsx");

  assert.ok(
    about.includes("hero-13") &&
      about.includes("about-us-13") &&
      about.includes("bento-grid-02"),
  );
  assert.ok(
    gallery.includes("Hero08") ||
      gallery.includes("hero-08") ||
      gallery.includes("Gallery03") ||
      gallery.includes("showAll"),
  );
  assert.ok(
    location.includes("hero-12") ||
      location.includes("Hero12") ||
      location.includes("lg:sticky") ||
      location.includes("data-location-longform"),
  );
  assert.ok(
    services.includes("ServicesCarouselHero") ||
      services.includes("carousel-08") ||
      services.includes("Services10"),
  );
  assert.ok(
    serviceDetail.includes("data-service-visual-body") ||
      serviceDetail.includes("ServicesCarouselHero") ||
      serviceDetail.includes("lg:grid-cols-12"),
  );
  assert.ok(
    areas.includes("hero-12") ||
      areas.includes("Hero12") ||
      areas.includes("AreasGrid") ||
      areas.includes("data-areas"),
  );

  const oldTemplateCount = [about, gallery, location, services, areas].filter(
    (s) => /<PageHero[\s\S]*title=/.test(s),
  ).length;
  assert.ok(
    oldTemplateCount <= 1,
    `too many pages still open with PageHero template (${oldTemplateCount})`,
  );
});
