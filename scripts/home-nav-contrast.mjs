/**
 * Runtime probe: over-hero top-level nav links must compute to a light color.
 * Drives the live Next app (default http://localhost:3000).
 *
 * Run: node scripts/home-nav-contrast.mjs
 *      BASE_URL=http://127.0.0.1:3000 node scripts/home-nav-contrast.mjs
 *
 * Also wired into node --test via home-chrome.test.mjs when BASE_URL is up
 * or RUN_BROWSER_TESTS=1.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const scratch =
  process.env.SCRATCH ||
  path.join(
    process.env.TEMP || process.env.TMP || ".",
    "grok-goal-6d26f879cde9",
    "implementer",
  );

/** True when computed color is near-white / high lightness (oklab L or sRGB). */
export function isLightComputedColor(color) {
  if (!color || typeof color !== "string") return false;
  const s = color.trim().toLowerCase();

  // oklab(L a b) or oklab(L a b / alpha) - L in 0..1
  const oklab = s.match(/oklab\(\s*([0-9.e+-]+)/i);
  if (oklab) {
    const L = parseFloat(oklab[1]);
    return Number.isFinite(L) && L >= 0.85;
  }

  // oklch(L c h)
  const oklch = s.match(/oklch\(\s*([0-9.e+-]+)/i);
  if (oklch) {
    const L = parseFloat(oklch[1]);
    return Number.isFinite(L) && L >= 0.85;
  }

  // rgb / rgba
  const rgb = s.match(
    /rgba?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)\s*[, ]\s*([\d.]+)/i,
  );
  if (rgb) {
    const r = parseFloat(rgb[1]);
    const g = parseFloat(rgb[2]);
    const b = parseFloat(rgb[3]);
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return lum >= 0.7;
  }

  // #fff / #ffffff
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s)) {
    let h = s.slice(1);
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
    return lum >= 0.7;
  }

  return false;
}

export async function probeOverHeroNavColors(url = baseUrl) {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const res = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    const status = res?.status() ?? 0;

    // Ensure top of page (over-hero)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const report = await page.evaluate(() => {
      const header = document.querySelector('header[data-navbar="nws"]');
      const overHero = header?.getAttribute("data-over-hero");
      const plainTitles = ["Home", "About", "FAQs"];
      const links = [
        ...document.querySelectorAll(
          'header[data-navbar="nws"] a[data-slot="navigation-menu-link"]',
        ),
      ].filter((a) => plainTitles.includes((a.textContent || "").trim()));

      const triggers = [
        ...document.querySelectorAll(
          'header[data-navbar="nws"] button[data-slot="navigation-menu-trigger"]',
        ),
      ];

      const sample = (el) => ({
        text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 48),
        tag: el.tagName.toLowerCase(),
        color: getComputedStyle(el).color,
      });

      return {
        overHero,
        plainLinks: links.map(sample),
        triggers: triggers.map(sample),
      };
    });

    const plainResults = report.plainLinks.map((item) => ({
      ...item,
      isLight: isLightComputedColor(item.color),
    }));
    const triggerResults = report.triggers.map((item) => ({
      ...item,
      isLight: isLightComputedColor(item.color),
    }));

    const allPlainLight =
      plainResults.length >= 3 && plainResults.every((r) => r.isLight);
    const allTriggersLight =
      triggerResults.length >= 1 && triggerResults.every((r) => r.isLight);

    return {
      status,
      url,
      overHero: report.overHero,
      plainResults,
      triggerResults,
      allPlainLight,
      allTriggersLight,
      ok:
        status === 200 &&
        report.overHero === "true" &&
        allPlainLight &&
        allTriggersLight,
    };
  } finally {
    await browser.close();
  }
}

// CLI
const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const result = await probeOverHeroNavColors();
  try {
    fs.mkdirSync(scratch, { recursive: true });
    fs.writeFileSync(
      path.join(scratch, "nav-contrast-probe.json"),
      JSON.stringify(result, null, 2),
      "utf8",
    );
    const lines = [
      `status: ${result.status}`,
      `url: ${result.url}`,
      `overHero: ${result.overHero}`,
      `allPlainLight: ${result.allPlainLight}`,
      `allTriggersLight: ${result.allTriggersLight}`,
      `ok: ${result.ok}`,
      "plainLinks:",
      ...result.plainResults.map(
        (r) => `  - ${r.text}: ${r.color} light=${r.isLight}`,
      ),
      "triggers:",
      ...result.triggerResults.map(
        (r) => `  - ${r.text}: ${r.color} light=${r.isLight}`,
      ),
      `timestamp: ${new Date().toISOString()}`,
    ];
    fs.writeFileSync(
      path.join(scratch, "home-load.txt"),
      lines.join("\n") + "\n",
      "utf8",
    );
  } catch {
    /* scratch optional */
  }

  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) {
    console.error("FAIL: over-hero nav links are not light enough");
    process.exit(1);
  }
  console.log("PASS: over-hero nav links compute to light colors");
}
