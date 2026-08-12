import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const scratch =
  process.env.SCRATCH ||
  "C:\\Users\\idder\\AppData\\Local\\Temp\\grok-goal-d46a9e3be9e8\\implementer";
fs.mkdirSync(scratch, { recursive: true });
const outLog = path.join(scratch, "dense-service-browser.log");
const lines = [];
function log(msg) {
  lines.push(msg);
  console.log(msg);
}

const pages = [
  {
    slug: "bathroom-remodeling",
    url: "http://localhost:3000/services/bathroom-remodeling/",
    intro: "An outdated bathroom can feel cramped",
    trigger: "The Latest Bathroom Models",
    hidden: "spa-inspired look",
    shotClosed: "dense-service-bathroom-closed.png",
    shotOpen: "dense-service-bathroom-open.png",
  },
  {
    slug: "custom-home-builder",
    url: "http://localhost:3000/services/custom-home-builder/",
    intro: "As a custom home builder in Richmond, TX",
    trigger: "Lessons Learned From Supply Chain",
    hidden: "pandemic-related supply delays",
    shotClosed: "dense-service-custom-closed.png",
    shotOpen: "dense-service-custom-open.png",
  },
];

let browser;
try {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("pageerror", (err) => consoleErrors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  for (const spec of pages) {
    consoleErrors.length = 0;
    const res = await page.goto(spec.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    log(`${spec.slug} status ${res?.status()}`);
    await page.waitForSelector("[data-service-visual-body]");
    const introVisible = await page.getByText(spec.intro, { exact: false }).first().isVisible();
    const accordionCount = await page.locator("[data-service-educational-accordion]").count();
    const trigger = page.locator("[data-service-expand-trigger]").filter({ hasText: spec.trigger }).first();
    const triggerVisible = await trigger.isVisible();
    const hiddenLocator = page
      .locator("[data-service-educational-accordion]")
      .getByText(spec.hidden, { exact: false })
      .first();
    const hiddenBefore = await hiddenLocator.isVisible().catch(() => false);
    await page.screenshot({ path: path.join(scratch, spec.shotClosed), fullPage: true });
    await trigger.click();
    await page.waitForTimeout(400);
    const hiddenAfter = await hiddenLocator.isVisible();
    await page.screenshot({ path: path.join(scratch, spec.shotOpen), fullPage: true });
    log(
      JSON.stringify({
        slug: spec.slug,
        introVisible,
        accordionCount,
        triggerVisible,
        hiddenBefore,
        hiddenAfter,
        pageErrors: [...consoleErrors],
      }),
    );
    if (!introVisible || accordionCount < 1 || !triggerVisible || !hiddenAfter) {
      throw new Error(`browser check failed for ${spec.slug}`);
    }
  }
  log("PASS");
} catch (err) {
  log(`FAIL ${err?.stack || err}`);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  fs.writeFileSync(outLog, lines.join("\n") + "\n");
}
