/**
 * Page family gates after multipage UI pass.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (...parts) =>
  fs.readFileSync(path.join(root, ...parts), "utf8");
const exists = (...parts) => fs.existsSync(path.join(root, ...parts));

test("About hero: NWS YouTube play path with API error → watch fallback; no stats strip", () => {
  const hero = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-13",
    "hero.tsx",
  );
  assert.match(hero, /nSJ_8lzRTjM/);
  assert.match(hero, /iframe_api|YT\.Player|loadYouTubeApi/);
  assert.match(hero, /onError/);
  assert.match(hero, /data-about-video-play|Play NWS project video/);
  assert.match(hero, /data-about-video-fallback|useWatchFallback|watch-fallback/);
  assert.match(hero, /data-about-video-watch|NWS_ABOUT_YOUTUBE_WATCH|Play on YouTube/);
  assert.doesNotMatch(hero, /data-about-hero-stats/);
  assert.doesNotMatch(hero, /Serving Fort Bend/);
  assert.doesNotMatch(hero, /label:\s*"Projects"/);
  assert.doesNotMatch(hero, /or open on YouTube/i);
});

test("Dark-surface outline CTAs force transparent bg + white label", () => {
  const files = [
    "src/components/shadcn-space/blocks/hero-12/hero.tsx",
    "src/components/shadcn-space/blocks/hero-22/hero.tsx",
  ];
  for (const f of files) {
    const src = read(...f.split("/"));
    assert.match(src, /!bg-transparent/, `${f} transparent outline`);
    assert.match(src, /!text-white/, `${f} white label`);
    assert.match(src, /data-dark-outline-cta/, `${f} marker`);
  }
  const loc = read("src", "components", "LocationPage.tsx");
  assert.match(loc, /!bg-transparent/);
  assert.match(loc, /!text-white/);
});

test("Our Story is one white card over generated themed background", () => {
  const about = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "about-us-13",
    "about-us.tsx",
  );
  assert.match(about, /data-about-story-card/);
  assert.match(about, /about-story-bg|data-about-story-top-fade/);
  assert.match(about, /bg-white/);
  assert.match(about, /Discover the true meaning of custom homes/i);
  assert.match(about, /full-service construction[\s\S]{0,40}company/i);
  assert.doesNotMatch(about, /Transforming spaces into experiences/i);
  assert.ok(exists("public", "images", "about-story-bg.jpg"));
});

test("Bento three cards: orange face, white text, equal aspect image, fade seam", () => {
  const cards = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "bento-grid-02",
    "feature-cards-grid.tsx",
  );
  assert.match(cards, /data-bento-orange-cards/);
  assert.match(cards, /bg-primary/);
  assert.match(cards, /text-white/);
  assert.match(cards, /aspect-\[4\/3\]|aspect-\[/);
  assert.match(cards, /bg-gradient-to-b/);
  assert.match(cards, /backdrop-blur/);
  assert.doesNotMatch(cards, /bg-card/);
});

test("Services hub uses carousel-08 + visual grid + FAQ/CTA", () => {
  const page = read("src", "app", "services", "page.tsx");
  assert.match(page, /ServicesCarouselHero|carousel-08/);
  assert.match(page, /data-services-visual-grid|Services10/);
  assert.match(page, /faq-07|Faq/);
  assert.match(page, /cta-08|CTA/);
});

test("Service detail uses carousel hero + visual body + CTA", () => {
  const page = read("src", "app", "services", "[slug]", "page.tsx");
  assert.match(page, /ServicesCarouselHero|carousel-08/);
  assert.match(page, /data-service-visual-body|cta-08|CTA/);
  assert.doesNotMatch(page, /data-service-overview/);
});

test("Gallery family: hero-08 + gallery-03/01 + home CTA", () => {
  const gall = read("src", "components", "GalleryPage.tsx");
  const hero = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-08",
    "hero.tsx",
  );
  assert.match(gall, /Hero08|hero-08/);
  assert.match(gall, /Gallery03|gallery-03/);
  assert.match(gall, /Gallery01|gallery-01/);
  assert.match(gall, /cta-08|CTA/);
  assert.doesNotMatch(gall, /Hero22|hero-22/);
  assert.match(hero, /data-hero-08/);
  assert.match(hero, /stopOnMouseEnter|AutoScroll/);
});

test("Locations + Areas use themed hero-12 and keep form tails", () => {
  const loc = read("src", "components", "LocationPage.tsx");
  const areas = read("src", "app", "areas-we-serve", "page.tsx");
  assert.match(loc, /hero-12|Hero12/);
  assert.match(loc, /data-location-longform|lg:sticky/);
  assert.match(areas, /hero-12|Hero12/);
  assert.match(areas, /data-areas-communities|AreasGrid/);
  assert.doesNotMatch(areas, /LogoCloud03|logo-cloud-03/);
  assert.doesNotMatch(areas, /data-areas-city-chips|Jump to a community/);
});

test("FAQ and Contact page bodies still present (no redesign required)", () => {
  assert.ok(exists("src", "app", "faqs", "page.tsx"));
  assert.ok(exists("src", "app", "contact", "page.tsx"));
});
