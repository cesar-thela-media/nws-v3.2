/**
 * Block integrity after multipage UI pass (heroes installed, production mounts).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (...parts) => fs.readFileSync(path.join(root, ...parts), "utf8");
const exists = (...parts) => fs.existsSync(path.join(root, ...parts));

test("hero-04 block installed under Space tree", () => {
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "hero-04", "hero.tsx"));
  assert.ok(exists("src", "components", "shadcn-space", "blocks", "hero-04", "index.tsx"));
});

test("no public demo routes for hero-04/12/22", () => {
  assert.equal(exists("src", "app", "hero-04", "page.tsx"), false);
  assert.equal(exists("src", "app", "hero-12", "page.tsx"), false);
  assert.equal(exists("src", "app", "hero-22", "page.tsx"), false);
});

test("LocationPage and areas-we-serve mount themed hero-12", () => {
  const loc = read("src", "components", "LocationPage.tsx");
  const areas = read("src", "app", "areas-we-serve", "page.tsx");
  const hero = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-12",
    "hero.tsx",
  );
  assert.match(loc, /hero-12|Hero12/);
  assert.match(areas, /hero-12|Hero12/);
  assert.match(hero, /data-hero-12/);
  assert.doesNotMatch(hero, /#1 Agency in New York|SaaS solutions/i);
});

test("hero-12 block remains NWS-themed (not SaaS demo)", () => {
  const hero = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-12",
    "hero.tsx",
  );
  assert.match(hero, /data-hero-12/);
  assert.doesNotMatch(hero, /#1 Agency in New York/);
  assert.doesNotMatch(hero, /SaaS solutions/i);
  assert.match(hero, /Custom homes|remodeling/i);
});

test("gallery family uses hero-08 not creators demo", () => {
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
  assert.match(hero, /data-hero-08/);
  assert.doesNotMatch(hero, /Loved by creators|Elite Masterclasses/i);
});

test("button nativeButton+render and logo onDark still production", () => {
  const btn = read("src", "components", "ui", "button.tsx");
  const logo = read("src", "assets", "logo", "logo.tsx");
  assert.match(btn, /resolvedNative/);
  assert.match(btn, /nativeButton/);
  assert.match(logo, /onDark/);
  assert.match(logo, /logoOnDark|logoTransparent/);
});

test("About play path and gallery secondary contrast still gated", () => {
  const about = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-13",
    "hero.tsx",
  );
  const gall = read("src", "components", "GalleryPage.tsx");
  const hero08 = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-08",
    "hero.tsx",
  );
  assert.match(about, /nSJ_8lzRTjM/);
  assert.match(about, /data-about-video-play/);
  assert.match(about, /watch-fallback|data-about-video-fallback|NWS_ABOUT_YOUTUBE_WATCH/);
  assert.match(gall, /Hero08|hero-08/);
  assert.match(hero08, /data-hero-08/);
  assert.match(hero08, /text-white/);
});

test("dark outline CTAs still force transparent + white on key survivors", () => {
  for (const f of [
    ["src", "components", "shadcn-space", "blocks", "hero-12", "hero.tsx"],
    ["src", "components", "shadcn-space", "blocks", "hero-22", "hero.tsx"],
    ["src", "components", "LocationPage.tsx"],
  ]) {
    const src = read(...f);
    assert.match(src, /!bg-transparent/);
    assert.match(src, /!text-white/);
  }
});
