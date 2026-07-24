/**
 * custom-home-builder Overview: distinct photo from hero + shortened intro.
 * Drives shipped getServicePage data and template source wiring.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const read = (...p) => fs.readFileSync(path.join(root, ...p), "utf8");

/** Load custom-home-builder payload from shipped getServicePage. */
async function loadCustomHomeBuilder() {
  const dataPath = path.join(root, "src", "data", "servicePages.ts");
  try {
    const mod = await import(pathToFileURL(dataPath).href);
    if (typeof mod.getServicePage === "function") {
      const p = mod.getServicePage("custom-home-builder");
      assert.ok(p, "getServicePage(custom-home-builder) must resolve");
      return {
        image: p.image,
        overviewImage: p.overviewImage,
        introJoined: (p.intro || []).join("\n"),
        introChars: (p.intro || []).join("").length,
      };
    }
  } catch {
    // fall through
  }
  const { spawnSync } = await import("node:child_process");
  const script = `
    import { getServicePage } from ${JSON.stringify(dataPath.replace(/\\/g, "/"))};
    const p = getServicePage("custom-home-builder");
    if (!p) { console.error("MISSING"); process.exit(2); }
    console.log(JSON.stringify({
      image: p.image,
      overviewImage: p.overviewImage,
      introJoined: (p.intro || []).join("\\n"),
      introChars: (p.intro || []).join("").length,
    }));
  `;
  const r = spawnSync("bun", ["-e", script], { cwd: root, encoding: "utf8" });
  if (r.status !== 0) {
    throw new Error(
      `bun getServicePage failed: ${r.stderr || r.stdout || r.status}`,
    );
  }
  return JSON.parse(r.stdout.trim());
}

test("custom-home-builder Overview image differs from hero image", async () => {
  const data = await loadCustomHomeBuilder();
  assert.ok(data.image, "hero image set");
  assert.ok(data.overviewImage, "overviewImage set for custom-home-builder");
  assert.notEqual(
    data.image,
    data.overviewImage,
    "Overview photo must not reuse the hero asset",
  );
  assert.match(data.overviewImage, /\/images\//);
});

test("custom-home-builder Overview intro is short and keeps core message", async () => {
  const data = await loadCustomHomeBuilder();
  assert.ok(
    data.introChars <= 220,
    `Overview intro too long: ${data.introChars} chars (max 220)`,
  );
  assert.match(data.introJoined, /custom home builder/i);
  assert.match(data.introJoined, /Richmond|Fort Bend/i);
  assert.doesNotMatch(
    data.introJoined,
    /When it comes to building custom homes, we believe the process should reflect your lifestyle and personality/i,
  );
});

test("service detail keeps split-hero chrome and wires overviewImage for Overview band", () => {
  const tpl = read("src", "app", "services", "[slug]", "page.tsx");
  // Prior chrome intact (not a full Hero12 rewrite)
  assert.match(tpl, /data-service-split-hero/);
  assert.match(tpl, /CTABanner/);
  assert.match(tpl, /data-dark-outline-cta/);
  assert.doesNotMatch(tpl, /Hero12|hero-12/);
  // Overview wiring
  assert.match(tpl, /overviewImage/);
  assert.match(tpl, /overviewImageSrc\s*=\s*[\s\S]*page\.overviewImage\s*\|\|/);
  assert.match(tpl, /data-service-overview/);
  // Hero still uses page.image
  assert.match(
    tpl,
    /data-service-split-hero[\s\S]*src=\{page\.image/,
  );
});
