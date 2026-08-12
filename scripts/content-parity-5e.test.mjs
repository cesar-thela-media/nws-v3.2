import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const galleries = fs.readFileSync(path.join(root, "src/data/galleries.ts"), "utf8");
const galleryPage = fs.readFileSync(path.join(root, "src/components/GalleryPage.tsx"), "utf8");
const footer = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/footer-01/footer.tsx"), "utf8");
const ia = fs.readFileSync(path.join(root, "src/data/informationArchitecture.ts"), "utf8");
const publicImages = path.join(root, "public/images");
const galleryMetadata = {
  "custom-homes-gallery": ["Custom Homes Gallery", "Bring your dream home to life with our help. We have over 35 years of combined experience. Call us at (281) 299-2309 to get started."],
  "remodeling-gallery": ["Remodeling Gallery", "See the results of our remodeling company in Richmond, TX. We have over 35 years of combined experience. Call today at (281) 299-2309."],
  "kitchen-remodeling-gallery": ["Kitchen Remodeling Gallery", "See the results of our remodeling company in Richmond, TX. We have over 35 years of combined experience. Call today (281) 299-2309."],
  "bathroom-remodeling-gallery": ["Bathroom Remodeling Richmond, TX | Contact Us Today! | NWS Custom Homes and Remodeling", "Expert bathroom remodeling in Richmond, TX. With 35+ years of experience, we create stylish, functional bathrooms. Call (281) 299-2309 today!"],
};

const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), "utf8");


test("gallery route metadata matches the captured source exactly", () => {
  for (const [route, [title, description]] of Object.entries(galleryMetadata)) {
    const page = read(`src/app/${route}/page.tsx`);
    assert.ok(page.includes(`title: ${JSON.stringify(title)}`));
    assert.ok(page.includes(`description: ${JSON.stringify(description)}`));
  }
});

test("all four gallery records retain source headings and visible descriptions", () => {
  assert.match(galleries, /heading: "Custom Homes"/);
  assert.match(galleries, /heading: "Remodeling Gallery"/);
  assert.match(galleries, /heading: "Kitchen Remodeling Gallery"/);
  assert.match(galleries, /heading: "Bathroom Remodeling Gallery"/);
  assert.match(galleries, /We’re dedicated to building the homes you’ve always dreamed of/);
  assert.match(galleries, /relationships we’ve built with our clients over time/);
});

test("gallery page preserves the v3.1 visual components and source CTA intent", () => {
  assert.match(galleryPage, /<Hero08/);
  assert.match(galleryPage, /<Gallery03/);
  assert.match(galleryPage, /<CTA \/>/);
  assert.match(galleryPage, /primaryCtaLabel="Contact Us"/);
  assert.match(galleryPage, /secondaryCtaLabel="Call Now"/);
  assert.match(galleryPage, /ctaLabel=\{sourceCtaLabel\}/);
  assert.match(galleryPage, /photo\.alt \|\| photo\.title/);
});

test("all gallery image references exist locally", () => {
  const refs = [...galleries.matchAll(/src: "(\/images\/[^\"]+)"/g)].map((m) => m[1]);
  assert.ok(refs.length >= 30);
  for (const ref of refs) assert.ok(fs.existsSync(path.join(root, "public", ref)), `missing ${ref}`);
});

test("mounted footer has complete approved social and review links", () => {
  assert.match(footer, /site\.social\.facebook/);
  assert.match(footer, /site\.social\.instagram/);
  assert.match(footer, /site\.social\.youtube/);
  assert.match(footer, /site\.social\.houzz/);
  assert.match(footer, /site\.social\.googleMaps/);
  assert.match(footer, /site\.social\.googleReview/);
  assert.match(footer, /Leave Us a Review!/);
  assert.match(ia, /googleMaps: "https:\/\/goo\.gl\/maps\/Rb8ped27vjAPYisV9"/);
  assert.match(ia, /googleReview: "https:\/\/g\.page\/r\/CRyZ8e5jvBiVEBM\/review"/);
});

test("map assets exist locally", () => {
  for (const name of ["nws-custom-homes-and-remodeling-small-map.webp", "nws-custom-homes-and-remodeling-full-map.webp", "footer-gray.png"]) {
    assert.ok(fs.existsSync(path.join(publicImages, name)), `missing supporting asset ${name}`);
  }
});
