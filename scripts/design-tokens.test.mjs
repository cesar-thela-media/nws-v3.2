/**
 * Asserts shipped design tokens match glyph.software visual system.
 * Reads real files: src/app/globals.css + src/app/layout.tsx
 * Run: node --test scripts/design-tokens.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const cssPath = path.join(root, "src", "app", "globals.css");
const layoutPath = path.join(root, "src", "app", "layout.tsx");

function read(p) {
  return fs.readFileSync(p, "utf8");
}

function parseRootVars(css) {
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/);
  assert.ok(rootMatch, ":root block must exist in globals.css");
  const block = rootMatch[1];
  const vars = {};
  for (const m of block.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) {
    vars[m[1]] = m[2].trim();
  }
  return vars;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "").trim();
  if (h.length !== 6) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function isWarmOffWhite(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  // light warm: high RGB, not pure white only if still peach-branded - allow #fafaf9 / #f5f4f0
  return (
    rgb.r >= 240 &&
    rgb.g >= 240 &&
    rgb.b >= 230 &&
    rgb.r + rgb.g + rgb.b >= 720
  );
}

function isNearBlack(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  return rgb.r <= 30 && rgb.g <= 30 && rgb.b <= 30;
}

function isOrangeRed(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  // orangered family: high R, mid-low G, low B - e.g. #FF4500
  return rgb.r >= 220 && rgb.g <= 120 && rgb.b <= 80 && rgb.r > rgb.g && rgb.g >= rgb.b;
}

function isOldPeach(hex) {
  return /^#e09c73$/i.test(hex.trim());
}

test("globals.css ships glyph-like palette (not old NWS peach system)", () => {
  const css = read(cssPath);
  const vars = parseRootVars(css);

  assert.ok(vars["color-bg"], "color-bg required");
  assert.ok(vars["color-text"], "color-text required");
  assert.ok(vars["color-primary"] || vars["color-peach"], "primary accent required");

  const bg = vars["color-bg"];
  const text = vars["color-text"];
  const heading = vars["color-heading"] || text;
  const primary = vars["color-primary"] || vars["color-peach"];

  assert.ok(isWarmOffWhite(bg), `bg should be warm off-white, got ${bg}`);
  assert.ok(isNearBlack(text) || isNearBlack(heading), `text/heading near-black, got text=${text} heading=${heading}`);
  assert.ok(isOrangeRed(primary), `primary should be orange-red family, got ${primary}`);
  assert.ok(!isOldPeach(primary), "primary must not be old NWS peach #e09c73");

  // must not still define dominant peach as #e09c73
  assert.doesNotMatch(css, /--color-peach:\s*#e09c73/i);
  assert.doesNotMatch(css, /--color-bg:\s*#fbfbfb/i);
});

test("typography: Geist body (base-nova) + Manrope headings", () => {
  const css = read(cssPath);
  const layout = read(layoutPath);

  assert.match(layout, /Geist/, "layout must load Geist for body");
  assert.match(layout, /Manrope/, "layout must load Manrope for headings");
  assert.doesNotMatch(
    layout,
    /Instrument_Serif|Instrument Serif/,
    "layout must not load Instrument Serif"
  );
  assert.doesNotMatch(layout, /Cabin\(/);

  assert.match(css, /--font-geist|Geist/, "body sans uses Geist");
  assert.match(
    css,
    /body\s*\{[\s\S]*?font-family:\s*var\(--nws-font-sans\)|body\s*\{[\s\S]*?font-family:\s*var\(--font-sans\)/,
    "body uses sans"
  );
  assert.match(
    css,
    /--nws-font-sans:\s*var\(--font-geist\)/,
    "nws-font-sans maps to Geist"
  );

  const headingBlock = css.match(
    /h1,\s*\n?h2,\s*\n?h3[\s\S]*?\.font-display\s*\{([\s\S]*?)\}/
  );
  assert.ok(headingBlock, "heading selector block");
  assert.match(
    headingBlock[1],
    /font-family:[\s\S]*(--nws-font-heading|--font-manrope|Manrope)/i,
    "headings use Manrope heading stack"
  );
  assert.doesNotMatch(
    headingBlock[1],
    /Instrument Serif|--font-instrument|--nws-font-serif/i,
    "headings must not force Instrument Serif"
  );
  assert.match(
    headingBlock[1],
    /font-weight:\s*700/,
    "headings use bold weight like Glyph"
  );
  assert.match(
    headingBlock[1],
    /letter-spacing:\s*-0\.02/,
    "headings use tight letter-spacing"
  );
});

test("primary button uses orange-red token and sharp radius (glyph-like)", () => {
  const css = read(cssPath);
  assert.match(css, /\.btn\s*\{[\s\S]*?background:\s*var\(--color-primary\)/);
  assert.match(css, /--radius-btn:\s*4px/);
  // old soft peach radius 8px should not be the token
  assert.doesNotMatch(css, /--radius-btn:\s*8px/);
});

test("no remaining hard-coded #e09c73 in src components/app", () => {
  const dirs = [
    path.join(root, "src", "app"),
    path.join(root, "src", "components"),
  ];
  const hits = [];
  function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (/\.(tsx|ts|css)$/.test(ent.name)) {
        const c = fs.readFileSync(full, "utf8");
        if (/#e09c73/i.test(c)) hits.push(full);
      }
    }
  }
  for (const d of dirs) walk(d);
  assert.deepEqual(hits, [], `old peach hex remains in: ${hits.join(", ")}`);
});

test("heading/paragraph color uses @layer base + :where() so text-white utilities win", () => {
  const css = read(cssPath);
  // Colors must be inside @layer base (loses to Tailwind utilities layer)
  assert.match(
    css,
    /@layer\s+base\s*\{[\s\S]*:where\(\s*h1[\s\S]*?\)\s*\{\s*color:\s*var\(--color-heading\)/,
    "heading color must be in @layer base :where()"
  );
  assert.match(
    css,
    /@layer\s+base\s*\{[\s\S]*:where\(\s*p\s*\)\s*\{\s*color:\s*var\(--(?:color-muted|muted-foreground)\)/,
    "paragraph muted color must be in @layer base :where()"
  );
  // Unlayered heading font block must not set color:
  const headingFontBlock = css.match(
    /h1,\s*\n?h2,\s*\n?h3[\s\S]*?\.font-display\s*\{([\s\S]*?)\}/
  );
  assert.ok(headingFontBlock, "heading font block");
  assert.doesNotMatch(
    headingFontBlock[1],
    /^\s*color:/m,
    "unlayered heading font block must not set color (breaks text-white)"
  );
});

test("CSS pseudo content uses unicode escapes not mojibake", () => {
  const css = read(cssPath);
  assert.doesNotMatch(css, /â€|âˆ|Ã¢/);
  assert.match(css, /content:\s*"\\2022"/, "flip-card bullet \\2022");
  assert.match(css, /content:\s*"\\2212"/, "faq open minus \\2212");
});
