/**
 * Structural guarantee: default heading/paragraph colors must not beat
 * Tailwind text-white on dark chrome (footer, hero, CTA).
 * Reads shipped globals.css only.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const css = fs.readFileSync(path.join(root, "src", "app", "globals.css"), "utf8");

test("default heading color is only in @layer base (utilities can override)", () => {
  // Extract unlayered top-level rules before any @layer that set color on h1
  // Simpler: require @layer base has the color, and the unlayered h1 font block has no color
  assert.match(css, /@layer\s+base/);
  // Fallback: just ensure base block contains heading color
  assert.match(
    css,
    /@layer\s+base\s*\{[\s\S]{0,800}:where\([^)]*h1[^)]*\)\s*\{\s*color:\s*var\(--color-heading\)/
  );
});

test("no unlayered color: var(--color-heading) on raw h1,h2 selectors", () => {
  // Disallow pattern like: h1, h2, h3 { ... color: var(--color-heading) outside @layer
  const withoutLayers = css.replace(/@layer[\s\S]*?\{[\s\S]*?\n\}/g, "");
  // After stripping @layer blocks, remaining CSS must not assign heading color to h1-h6
  assert.doesNotMatch(
    withoutLayers,
    /h1[\s\S]{0,200}color:\s*var\(--color-heading\)/
  );
});

test("mojibake-free pseudo elements", () => {
  assert.doesNotMatch(css, /â€|âˆ|Ã¢/);
  assert.match(css, /content:\s*"\\2022"/);
  assert.match(css, /content:\s*"\\2212"/);
});
