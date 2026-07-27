/**
 * Multi-page UI pass contract — drives shipped sources for home, About,
 * services, galleries, areas/locations. Exit 0 = criteria applied.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (...p) => fs.readFileSync(path.join(root, ...p), "utf8");
const exists = (...p) => fs.existsSync(path.join(root, ...p));

test("blocks carousel-08, hero-08, gallery-03, gallery-01 exist", () => {
  assert.ok(exists("src", "components", "shadcn-space", "carousel", "carousel-08.tsx"));
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "hero-08", "hero.tsx"));
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "gallery-03", "gallery.tsx"));
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "gallery-01", "gallery.tsx"));
  const pkg = JSON.parse(read("package.json"));
  assert.ok(
    pkg.dependencies?.["embla-carousel-auto-scroll"],
    "hero-08 requires embla-carousel-auto-scroll",
  );
});

test("home How We Work gradient + FAQ accordion only (no help band)", () => {
  const home = read("src", "app", "page.tsx");
  const how = read("src", "components", "shadcn-space", "blocks", "portfolio-08", "portfolio.tsx");
  const faq = read("src", "components", "shadcn-space", "blocks", "faq-07", "faq.tsx");
  assert.match(home, /portfolio-08|HowWeWork/);
  assert.match(home, /faq-07|Faq/);
  assert.match(how, /How we work/i);
  assert.match(how, /data-how-we-work-gradient/);
  assert.match(how, /bg-gradient/);
  assert.match(faq, /data-faq-07|Accordion/);
  assert.doesNotMatch(faq, /data-faq-help-band|data-faq-help-image|Our team is ready to help/);
});

test("About: no open on YouTube; story fade/fuller card; cta-08 no map/form", () => {
  const hero = read("src", "components", "shadcn-space", "blocks", "hero-13", "hero.tsx");
  const story = read("src", "components", "shadcn-space", "blocks", "about-us-13", "about-us.tsx");
  const bento = read("src", "components", "shadcn-space", "blocks", "bento-grid-02", "index.tsx");
  const page = read("src", "app", "about", "page.tsx");
  assert.doesNotMatch(hero, /or open on YouTube|Open on YouTube/i);
  assert.match(hero, /data-about-video-play|nSJ_8lzRTjM/);
  assert.match(story, /data-about-story-top-fade/);
  assert.match(story, /data-about-story-card/);
  assert.match(story, /data-about-story-collage/);
  assert.match(story, /max-w-\[90rem\]|max-w-7xl|xl:px-14/);
  assert.match(bento, /data-about-nws-spacing|pb-16|pb-24/);
  assert.match(page, /cta-08|from \"@\/components\/shadcn-space\/blocks\/cta-08|CTA/);
  assert.doesNotMatch(page, /ContactForm|mapSmall/);
});

test("Services hub+detail: carousel-08 hub, gallery-03 detail hero, faq-07 + cta-08", () => {
  const hub = read("src", "app", "services", "page.tsx");
  const detail = read("src", "app", "services", "[slug]", "page.tsx");
  const hero = read("src", "components", "ServicesCarouselHero.tsx");
  const detailHero = read("src", "components", "ServiceDetailHero.tsx");
  const photos = read("src", "data", "serviceHeroPhotos.ts");
  const carousel = read("src", "components", "shadcn-space", "carousel", "carousel-08.tsx");
  assert.match(hub, /ServicesCarouselHero|carousel-08/);
  assert.match(hub, /faq-07|Faq/);
  assert.match(hub, /cta-08|CTA/);
  assert.match(hub, /data-services-visual-grid/);
  // Detail uses gallery-03 with per-slug photos — not the hub carousel
  assert.match(detail, /ServiceDetailHero|gallery-03|Gallery03/);
  assert.doesNotMatch(detail, /ServicesCarouselHero/);
  assert.match(detail, /data-service-visual-body/);
  assert.doesNotMatch(detail, /data-service-overview/);
  assert.match(detail, /faq-07|Faq/);
  assert.match(detail, /cta-08|CTA/);
  assert.match(detailHero, /gallery-03|Gallery03|getServiceHeroPhotos/);
  assert.match(photos, /kitchen-remodeling/);
  assert.match(photos, /kitchen-gallery/);
  assert.match(hero, /carousel-08|AppleCardCarousel/);
  assert.match(carousel, /data-carousel-08/);
  assert.match(carousel, /items-center|text-center/);
});

test("Gallery: hero-08 + single gallery-03 project photos + cta-08, not hero-22", () => {
  const gall = read("src", "components", "GalleryPage.tsx");
  const g03 = read("src", "components", "shadcn-space", "blocks", "gallery-03", "gallery.tsx");
  const h08 = read("src", "components", "shadcn-space", "blocks", "hero-08", "hero.tsx");
  const h08i = read("src", "components", "shadcn-space", "blocks", "hero-08", "index.tsx");
  assert.match(gall, /Hero08|hero-08/);
  assert.doesNotMatch(gall, /Hero22|hero-22/);
  assert.match(gall, /Gallery03|gallery-03/);
  // Combined into one project-photos section (no separate gallery-01)
  assert.doesNotMatch(gall, /from .*gallery-01|import Gallery01/);
  assert.match(gall, /showAll/);
  assert.match(gall, /cta-08|CTA/);
  assert.match(g03, /data-gallery-project-photos|showAll/);
  assert.match(g03, /aspect-\[16\/10\]|lg:grid-cols-3/);
  assert.match(h08, /data-hero-08/);
  assert.match(h08, /AutoScroll|stopOnMouseEnter/);
  assert.doesNotMatch(h08i, /navbar\.tsx|Navbar/);
  for (const slug of [
    "custom-homes-gallery",
    "remodeling-gallery",
    "kitchen-remodeling-gallery",
    "bathroom-remodeling-gallery",
  ]) {
    const page = read("src", "app", slug, "page.tsx");
    assert.match(page, /GalleryPage/, `${slug} must use GalleryPage`);
  }
});

test("Areas + locations: hero-12, image cards, no jump/logo-cloud", () => {
  const areas = read("src", "app", "areas-we-serve", "page.tsx");
  const grid = read("src", "components", "AreasGrid.tsx");
  const loc = read("src", "components", "LocationPage.tsx");
  assert.match(areas, /hero-12|Hero12/);
  assert.doesNotMatch(areas, /logo-cloud-03|LogoCloud03|logo-cloud-01|LogoCloud/);
  assert.doesNotMatch(areas, /Jump to a community|data-areas-city-chips/);
  assert.match(areas, /AreasGrid|data-areas-communities/);
  assert.match(areas, /cta-08|CTA/);
  assert.match(grid, /data-areas-image-cards/);
  assert.match(grid, /object-cover/);
  assert.match(loc, /hero-12|Hero12/);
  assert.match(loc, /data-location-local-cta/);
  assert.doesNotMatch(loc, /mapSmall|site\.mapSmall/);
  assert.doesNotMatch(loc, /ContactForm/);
  for (const slug of [
    "sugar-land-tx",
    "katy-tx",
    "fulshear-tx",
    "west-side-of-houston-tx",
    "cinco-ranch-tx",
    "rosenberg-tx",
    "weston-lakes-tx",
    "park-row-tx",
  ]) {
    const page = read("src", "app", slug, "page.tsx");
    assert.match(page, /LocationPage/, `${slug} must use LocationPage`);
  }
});

test("faqs and contact pages still present and unchanged as routes", () => {
  assert.ok(exists("src", "app", "faqs", "page.tsx"));
  assert.ok(exists("src", "app", "contact", "page.tsx"));
  const faqs = read("src", "app", "faqs", "page.tsx");
  const contact = read("src", "app", "contact", "page.tsx");
  assert.match(faqs, /Faq|faq-07/);
  assert.match(contact, /contact-01|Contact/);
});

test("no demo hero routes under app", () => {
  assert.equal(exists("src", "app", "hero-04", "page.tsx"), false);
  assert.equal(exists("src", "app", "hero-08", "page.tsx"), false);
  assert.equal(exists("src", "app", "hero-12", "page.tsx"), false);
  assert.equal(exists("src", "app", "hero-22", "page.tsx"), false);
  assert.equal(exists("src", "app", "carousel-08", "page.tsx"), false);
});
