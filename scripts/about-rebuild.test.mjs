/**
 * About rebuild gates: Space blocks, NWS copy/video, no feature-18,
 * nav Contact removed, Book Now still /contact/.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));

test("hero-13, about-us-13, bento-grid-02 blocks are installed", () => {
  assert.ok(exists("src/components/shadcn-space/blocks/hero-13/hero.tsx"));
  assert.ok(exists("src/components/shadcn-space/blocks/about-us-13/about-us.tsx"));
  assert.ok(exists("src/components/shadcn-space/blocks/bento-grid-02/index.tsx"));
});

test("About page mounts Space trio and not feature-18 or cinematic custom hero", () => {
  const page = read("src/app/about/page.tsx");
  assert.match(page, /hero-13/);
  assert.match(page, /about-us-13/);
  assert.match(page, /bento-grid-02/);
  assert.doesNotMatch(page, /feature-18/);
  assert.doesNotMatch(page, /min-h-\[42svh\]/);
  assert.doesNotMatch(page, /Your go-to home builders/); // title lives in hero-13 block now
});

test("About hero embeds NWS YouTube id; stats strip removed; no BrandSlider", () => {
  const hero = read("src/components/shadcn-space/blocks/hero-13/hero.tsx");
  const index = read("src/components/shadcn-space/blocks/hero-13/index.tsx");
  assert.match(hero, /nSJ_8lzRTjM/);
  assert.match(hero, /iframe_api|YT\.Player|onError/);
  assert.match(hero, /NWS_ABOUT_YOUTUBE_WATCH|data-about-video-watch|data-about-video-fallback/);
  assert.match(hero, /data-about-video-play/);
  assert.doesNotMatch(hero, /data-about-hero-stats/);
  assert.doesNotMatch(hero, /Serving Fort Bend/);
  assert.doesNotMatch(index, /import\s+BrandSlider|<BrandSlider/);
  assert.doesNotMatch(hero, /images\.shadcnspace\.com.*hero-13-video/);
  assert.doesNotMatch(hero, /creative Design production studio/i);
});

test("about-us-13 uses NWS story copy not Space agency sample", () => {
  const about = read("src/components/shadcn-space/blocks/about-us-13/about-us.tsx");
  assert.match(about, /Discover the true meaning of custom homes/i);
  assert.match(about, /full-service construction[\s\S]{0,40}company/i);
  assert.match(about, /since[\s\S]{0,40}2007/i);
  assert.doesNotMatch(about, /Transforming spaces into experiences/i);
  assert.doesNotMatch(about, /450\+/);
  assert.doesNotMatch(about, /images\.shadcnspace\.com\/assets\/about/);
});

test("bento-grid-02 uses Fort Bend NWS framing not SaaS workspace demo", () => {
  const header = read(
    "src/components/shadcn-space/blocks/bento-grid-02/bento-grid-header.tsx",
  );
  const mock = read(
    "src/components/shadcn-space/blocks/bento-grid-02/workspace-mockup.tsx",
  );
  const cards = read(
    "src/components/shadcn-space/blocks/bento-grid-02/feature-cards-grid.tsx",
  );
  assert.match(header, /Built for Fort Bend/);
  assert.doesNotMatch(header, /Your workspace, everywhere/i);
  assert.doesNotMatch(mock, /bento-grid-02-mockup/);
  assert.doesNotMatch(mock, /Platform Support/);
  assert.match(mock, /Richmond/);
  assert.match(cards, /Since 2007/);
});

test("navbar has no Contact nav item; Book Now still goes to /contact/", () => {
  const nav = [
    read("src/components/shadcn-space/blocks/navbar-07/index.tsx"),
    read("src/components/shadcn-space/blocks/navbar-07/navbar.tsx"),
  ].join("\n");
  assert.doesNotMatch(
    nav,
    /title:\s*"Contact"/,
    "Contact must not be a main nav entry",
  );
  assert.match(nav, /href="\/contact\/"/);
  assert.match(nav, /Book Now/);
});

test("page section inventory exists for next UI-shopping pass", () => {
  const inv = read("docs/page-section-inventory.md");
  assert.match(inv, /\/services/);
  assert.match(inv, /\/services\/\[slug\]/);
  assert.match(inv, /Gallery family/);
  assert.match(inv, /Location family/);
  assert.match(inv, /\/areas-we-serve/);
  assert.match(inv, /gallery-04|services-10|LocationPage|GalleryPage/);
});

test("FAQ and Contact page bodies not rewritten this goal (still route files)", () => {
  assert.ok(exists("src/app/faqs/page.tsx"));
  assert.ok(exists("src/app/contact/page.tsx"));
});
