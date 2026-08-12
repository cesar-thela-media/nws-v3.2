import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const locations = fs.readFileSync(path.join(root, "src/data/locations.ts"), "utf8");
const navbar = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/navbar-02/navbar.tsx"), "utf8");

test("linked area records have unique explicit hero image associations", () => {
  const slugs = ["sugar-land-tx", "katy-tx", "fulshear-tx", "west-side-of-houston-tx", "cinco-ranch-tx", "rosenberg-tx", "weston-lakes-tx", "park-row-tx"];
  const records = slugs.map((slug) => {
    const start = locations.indexOf(`slug: "${slug}"`);
    const end = locations.indexOf("\n  },", start);
    const block = locations.slice(start, end);
    const image = block.match(/heroImage: "([^"]+)"/)?.[1];
    assert.ok(image, `missing hero image for ${slug}`);
    return { slug, image };
  });
  assert.equal(records.length, 8);
  assert.equal(new Set(records.map((r) => r.image)).size, records.length);
  for (const record of records) assert.ok(fs.existsSync(path.join(root, "public", record.image)), record.image);
});

test("area cards use each location hero image instead of a rotating generic array", () => {
  const grid = fs.readFileSync(path.join(root, "src/components/AreasGrid.tsx"), "utf8");
  const marquee = fs.readFileSync(path.join(root, "src/components/AreasServeMarquee.tsx"), "utf8");
  assert.match(grid, /loc\.heroImage/);
  assert.doesNotMatch(grid, /communityImages/);
  assert.match(marquee, /loc\.heroImage/);
  assert.doesNotMatch(marquee, /areaImages/);
});

test("areas desktop menu uses a two-column layout and retains canonical registry", () => {
  assert.match(navbar, /canonicalServiceAreaCatalog/);
  assert.match(navbar, /section\.title === "Areas"/);
  assert.match(navbar, /grid grid-cols-2/);
});
