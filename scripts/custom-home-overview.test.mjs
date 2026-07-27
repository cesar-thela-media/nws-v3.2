/**
 * custom-home-builder: short intro retained; Overview band removed this pass
 * (services use carousel-08 + visual body). Drives shipped getServicePage.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const read = (...p) => fs.readFileSync(path.join(root, ...p), "utf8");

async function loadCustomHomeBuilder() {
  const dataPath = path.join(root, "src", "data", "servicePages.ts");
  try {
    const mod = await import(pathToFileURL(dataPath).href);
    if (typeof mod.getServicePage === "function") {
      const p = mod.getServicePage("custom-home-builder");
      assert.ok(p, "getServicePage(custom-home-builder) must resolve");
      return {
        image: p.image,
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

test("custom-home-builder has hero image and short intro", async () => {
  const data = await loadCustomHomeBuilder();
  assert.ok(data.image);
  assert.ok(
    data.introChars <= 220,
    `intro too long: ${data.introChars}`,
  );
  assert.match(data.introJoined, /custom home builder/i);
  assert.match(data.introJoined, /Richmond|Fort Bend/i);
});

test("service detail uses gallery hero and visual body (no Overview band)", () => {
  const tpl = read("src", "app", "services", "[slug]", "page.tsx");
  assert.match(tpl, /ServiceDetailHero|gallery-03|Gallery03/);
  assert.match(tpl, /data-service-visual-body/);
  assert.match(tpl, /data-service-body-card|bg-white/);
  assert.doesNotMatch(tpl, /data-service-overview/);
  assert.match(tpl, /Faq|faq-07/);
  assert.match(tpl, /CTA|cta-08/);
});
