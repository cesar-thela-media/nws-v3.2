/**
 * Structural checks for home chrome: over-hero navbar (NWS links), Glyph button,
 * and areas logo-cloud. Reads shipped source files - not reimplemented fixtures.
 * Runtime: isLightComputedColor unit cases + optional live browser probe.
 * Run: node --test scripts/home-chrome.test.mjs
 *      RUN_BROWSER_TESTS=1 node --test scripts/home-chrome.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { isLightComputedColor } from "./home-nav-contrast.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function read(...parts) {
  return fs.readFileSync(path.join(root, ...parts), "utf8");
}

test("layout wires navbar-02 (not navbar-04 demo block) as site chrome", () => {
  const layout = read("src", "app", "layout.tsx");
  assert.match(
    layout,
    /navbar-02\/navbar/,
    "root layout must import navbar-02",
  );
  assert.doesNotMatch(
    layout,
    /navbar-04/,
    "root layout must not mount navbar-04 demo as production chrome",
  );
  assert.match(layout, /<Navbar\s*\/>/, "layout must render Navbar");
});

test("navbar-02 ships NWS nav titles (not Features/Analytics demo)", () => {
  const nav = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "navbar-02",
    "navbar.tsx",
  );
  for (const title of [
    "Home",
    "About",
    "Services",
    "Galleries",
    "Areas",
    "FAQs",
  ]) {
    assert.match(
      nav,
      new RegExp(`title:\\s*"${title}"`),
      `navbar must include ${title}`,
    );
  }
  assert.doesNotMatch(nav, /title:\s*"Features"/, "no demo Features link");
  assert.doesNotMatch(nav, /title:\s*"Analytics"/, "no demo Analytics link");
  assert.match(nav, /overHero|data-over-hero/, "must support over-hero mode");
  assert.match(nav, /bg-transparent/, "over-hero uses transparent chrome");
  assert.match(nav, /isHome|pathname === ["']\/["']/, "home-only over-hero path");
  // Force light color against globals `a { color: inherit }`
  assert.match(
    nav,
    /!text-white\/85|!text-white/,
    "over-hero links must force white with !important utilities",
  );
  assert.match(
    nav,
    /navigation-menu-link\]\]:!text-white/,
    "header-scoped selector forces plain <a> nav links white over hero",
  );
});

test("isLightComputedColor accepts oklab white and rejects near-black", () => {
  // Live Chrome reports oklab for text-white/85 after our fix
  assert.equal(
    isLightComputedColor("oklab(0.999994 0.0000455678 0.0000200868 / 0.85)"),
    true,
  );
  assert.equal(isLightComputedColor("rgb(255, 255, 255)"), true);
  assert.equal(isLightComputedColor("rgba(255, 255, 255, 0.85)"), true);
  assert.equal(isLightComputedColor("rgb(12, 10, 9)"), false);
  assert.equal(isLightComputedColor("oklab(0.15 0.01 0.01)"), false);
});

test("hero pulls under navbar for over-image merge + readable CTAs", () => {
  const hero = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "hero-01",
    "hero.tsx",
  );
  assert.match(
    hero,
    /-mt-14|-mt-16|sm:-mt-16|sm:-mt-\[4\.25rem\]/,
    "hero negative margin under navbar",
  );
  assert.match(
    hero,
    /!bg-white.*!text-\[#050505\]|!text-\[#050505\].*!bg-white/,
    "primary CTA keeps dark-on-white contrast",
  );
  assert.match(hero, /!text-white/, "secondary CTA readable on dark hero");
});

test("default Button variant uses primary token (Glyph orange path)", () => {
  const button = read("src", "components", "ui", "button.tsx");
  assert.match(
    button,
    /default:\s*["']bg-primary text-primary-foreground/,
    "default variant must use bg-primary + primary-foreground",
  );
  assert.match(
    button,
    /nativeButton/,
    "Button must resolve nativeButton for render=<a> CTAs",
  );
  const css = read("src", "app", "globals.css");
  assert.match(
    css,
    /--primary:\s*#ff4500/i,
    "globals primary must be Glyph #FF4500",
  );
});

test("home page no longer mounts Areas we serve logo-cloud", () => {
  const page = read("src", "app", "page.tsx");
  assert.doesNotMatch(
    page,
    /LogoCloudAreas|logo-cloud-01/,
    "home must not mount areas logo cloud section",
  );
});

test(
  "runtime: over-hero plain nav links compute light color on live /",
  { timeout: 90000 },
  async () => {
    const run =
      process.env.RUN_BROWSER_TESTS === "1" ||
      process.env.RUN_BROWSER_TESTS === "true";
    // Always try when default dev server is up; skip cleanly if unreachable
    let probe;
    try {
      probe = await import("./home-nav-contrast.mjs");
    } catch (e) {
      if (!run) {
        // playwright missing and not forced
        return;
      }
      throw e;
    }

    let result;
    try {
      result = await probe.probeOverHeroNavColors(
        process.env.BASE_URL || "http://localhost:3000",
      );
    } catch (e) {
      if (!run) {
        // Server or browser binary unavailable - structural tests still gate
        console.log("skip runtime nav contrast:", e.message);
        return;
      }
      throw e;
    }

    assert.equal(result.status, 200, "home must return 200");
    assert.equal(result.overHero, "true", "at top of home, data-over-hero=true");
    assert.ok(
      result.plainResults.length >= 3,
      `expected Home/About/FAQs, got ${result.plainResults.length}`,
    );
    for (const item of result.plainResults) {
      assert.ok(
        item.isLight,
        `${item.text} must be light over hero, got ${item.color}`,
      );
    }
    for (const item of result.triggerResults) {
      assert.ok(
        item.isLight,
        `trigger ${item.text} must be light over hero, got ${item.color}`,
      );
    }
    assert.equal(result.ok, true);
  },
);
