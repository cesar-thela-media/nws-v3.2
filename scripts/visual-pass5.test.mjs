/**
 * Visual pass markers aligned with multipage UI pass.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (...p) => fs.readFileSync(path.join(root, ...p), "utf8");
const exists = (...p) => fs.existsSync(path.join(root, ...p));

test("blocks hero-12, hero-08, gallery-03, gallery-01 exist", () => {
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "hero-12", "hero.tsx"));
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "hero-08", "hero.tsx"));
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "gallery-03", "gallery.tsx"));
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "gallery-01", "gallery.tsx"));
});

test("homepage Room & Home Additions uses cover fit image; FAQ help image swapped", () => {
  const port = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "portfolio-06",
    "portfolio.tsx",
  );
  const faq = read("src", "components", "shadcn-space", "blocks", "faq-07", "faq.tsx");
  assert.match(port, /Room & Home Additions/);
  assert.match(port, /object-cover/);
  assert.match(faq, /Still have questions/);
  assert.match(faq, /cta-home-remodeling-foldable-ladder|data-faq-help-image/);
  assert.doesNotMatch(
    faq,
    /Still have questions[\s\S]{0,400}custom-homes-1\.jpeg/,
  );
});

test("About: no or open on YouTube; story fade/collage layout", () => {
  const hero = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-13",
    "hero.tsx",
  );
  const about = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "about-us-13",
    "about-us.tsx",
  );
  assert.doesNotMatch(hero, /or open on YouTube/i);
  assert.match(hero, /data-about-video-play|nSJ_8lzRTjM/);
  assert.match(about, /data-about-story-top-fade|data-about-story-card/);
  assert.match(about, /data-about-story-collage|about-story-bg/);
});

test("Services hub and detail use carousel-08 + cta-08; hub uses Faq", () => {
  const hub = read("src", "app", "services", "page.tsx");
  const detail = read("src", "app", "services", "[slug]", "page.tsx");
  const faq = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "faq-07",
    "faq.tsx",
  );
  assert.match(hub, /ServicesCarouselHero|carousel-08/);
  assert.match(hub, /cta-08|CTA/);
  assert.match(hub, /faq-07|Faq/);
  assert.match(hub, /data-services-visual-grid/);
  assert.match(detail, /ServicesCarouselHero|carousel-08/);
  assert.match(detail, /cta-08|CTA/);
  assert.doesNotMatch(detail, /data-service-split-hero|data-service-overview/);
  assert.match(detail, /<Faq[\s\S]*items=/);
  assert.match(faq, /items\?:/);
  assert.match(faq, /nwsFaqs/);
  assert.match(faq, /data-faq-07/);
});

test("Gallery template: hero-08, no hero-22, single gallery-03 photos + cta-08", () => {
  const gall = read("src", "components", "GalleryPage.tsx");
  const h08 = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-08",
    "hero.tsx",
  );
  assert.match(gall, /hero-08|Hero08/);
  assert.doesNotMatch(gall, /hero-22|Hero22/);
  assert.match(gall, /gallery-03|Gallery03/);
  assert.doesNotMatch(gall, /import Gallery01|from .*gallery-01/);
  assert.match(gall, /showAll/);
  assert.match(gall, /cta-08|CTA/);
  assert.match(h08, /data-hero-08/);
  assert.match(h08, /AutoScroll|stopOnMouseEnter/);
});

test("Areas + locations: hero-12, image cards, no jump/logo-cloud, map band is CTA", () => {
  const areas = read("src", "app", "areas-we-serve", "page.tsx");
  const loc = read("src", "components", "LocationPage.tsx");
  const grid = read("src", "components", "AreasGrid.tsx");
  assert.match(areas, /hero-12|Hero12/);
  assert.doesNotMatch(areas, /logo-cloud-03|LogoCloud03/);
  assert.doesNotMatch(areas, /Jump to a community|data-areas-city-chips/);
  assert.match(areas, /AreasGrid|data-areas-communities/);
  assert.match(grid, /data-areas-image-cards/);
  assert.match(loc, /hero-12|Hero12/);
  assert.match(loc, /data-location-local-cta/);
  assert.doesNotMatch(loc, /mapSmall|site\.mapSmall/);
});

test("button/logo primitives intact after registry installs", () => {
  const btn = read("src", "components", "ui", "button.tsx");
  const logo = read("src", "assets", "logo", "logo.tsx");
  assert.match(btn, /resolvedNative/);
  assert.match(logo, /onDark/);
});
