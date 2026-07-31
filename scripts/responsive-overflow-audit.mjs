/**
 * Multi-viewport horizontal overflow + contact geometry audit.
 * Drives a real browser against the running app (BASE_URL, default localhost:3000).
 *
 * Usage:
 *   node scripts/responsive-overflow-audit.mjs [out.json]
 *   BASE_URL=http://localhost:3000 node scripts/responsive-overflow-audit.mjs
 *
 * Exit 0 only if every route×width has overflowPx ≤ 1 and contact geometry passes at 375.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const BASE = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const OUT =
  process.argv[2] ||
  path.join(root, "scripts", "responsive-overflow-audit.last.json");

const ROUTES = [
  "/",
  "/about/",
  "/services/",
  "/services/custom-home-builder/",
  "/custom-homes-gallery/",
  "/areas-we-serve/",
  "/contact/",
  "/faqs/",
];

const WIDTHS = [320, 375, 768, 1280, 1536];
const HEIGHT = 900;
const OVERFLOW_LIMIT = 1;

async function measureOverflow(page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const body = document.body;
    const sw = Math.max(de.scrollWidth, body?.scrollWidth || 0);
    const cw = de.clientWidth;
    const overflowPx = sw - cw;
    let worst = null;
    if (overflowPx > 1) {
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width <= 0 || r.height <= 0) continue;
        if (r.right > cw + 1) {
          if (!worst || r.right > worst.right) {
            const cls =
              typeof el.className === "string"
                ? el.className.slice(0, 100)
                : "";
            worst = {
              tag: el.tagName.toLowerCase(),
              className: cls,
              right: Math.round(r.right),
              width: Math.round(r.width),
            };
          }
        }
      }
    }
    return {
      scrollWidth: sw,
      clientWidth: cw,
      overflowPx: Math.round(overflowPx * 100) / 100,
      worst,
    };
  });
}

async function measureContact(page) {
  await page.setViewportSize({ width: 375, height: HEIGHT });
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(400);

  const hasContact = await page.evaluate(() => {
    const sec = document.querySelector("[data-contact-01]");
    if (sec) {
      sec.scrollIntoView({ block: "start" });
      return true;
    }
    const form = Array.from(document.querySelectorAll("form")).find((f) =>
      f.closest("section")?.textContent?.includes("Tell us about your project"),
    );
    form?.closest("section")?.scrollIntoView({ block: "start" });
    return Boolean(form);
  });
  await page.waitForTimeout(350);

  if (!hasContact) {
    return {
      ok: false,
      error: "contact section not found",
      formLeft: null,
      formRight: null,
      formWidth: null,
      clientWidth: 375,
      hasSlideTransform: null,
    };
  }

  return page.evaluate(() => {
    const clientWidth = document.documentElement.clientWidth;
    const section = document.querySelector("[data-contact-01]");
    const form =
      section?.querySelector("form") ||
      Array.from(document.querySelectorAll("form")).find((f) =>
        f.closest("section")?.textContent?.includes("Tell us about your project"),
      );
    const card =
      form?.closest("[class*='rounded']") ||
      form?.parentElement ||
      form;
    const r = card?.getBoundingClientRect();
    if (!r) {
      return {
        ok: false,
        error: "form card not found",
        formLeft: null,
        formRight: null,
        formWidth: null,
        clientWidth,
        hasSlideTransform: null,
      };
    }
    const formLeft = r.left;
    const formRight = r.right;
    const formWidth = r.width;
    // Residual slide-in: non-identity transform on card/form ancestors
    let hasSlideTransform = false;
    let el = card;
    while (el && el !== document.body) {
      const t = getComputedStyle(el).transform;
      if (t && t !== "none") {
        // allow scale only if translate is ~0
        const m = t.match(/matrix\(([^)]+)\)/);
        if (m) {
          const parts = m[1].split(",").map((x) => parseFloat(x.trim()));
          // matrix(a,b,c,d,tx,ty) - tx/ty should be ~0
          if (parts.length >= 6 && (Math.abs(parts[4]) > 2 || Math.abs(parts[5]) > 2)) {
            hasSlideTransform = true;
            break;
          }
        } else if (t.includes("translate")) {
          hasSlideTransform = true;
          break;
        }
      }
      el = el.parentElement;
    }

    const leftOk = formLeft >= 12;
    const rightOk = formRight <= clientWidth - 12;
    const widthOk = formWidth >= clientWidth - 48;
    const ok =
      leftOk && rightOk && widthOk && !hasSlideTransform;

    return {
      ok,
      formLeft: Math.round(formLeft * 100) / 100,
      formRight: Math.round(formRight * 100) / 100,
      formWidth: Math.round(formWidth * 100) / 100,
      clientWidth,
      hasSlideTransform,
      leftOk,
      rightOk,
      widthOk,
    };
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const rows = [];
  let failed = false;

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: HEIGHT });
    for (const route of ROUTES) {
      const url = `${BASE}${route}`;
      let status = 0;
      try {
        const res = await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 60000,
        });
        status = res?.status() || 0;
        await page.waitForTimeout(350);
      } catch (e) {
        rows.push({
          path: route,
          width,
          overflowPx: 999,
          error: String(e.message || e),
          status: 0,
        });
        failed = true;
        continue;
      }
      const m = await measureOverflow(page);
      const row = {
        path: route,
        width,
        status,
        overflowPx: m.overflowPx,
        scrollWidth: m.scrollWidth,
        clientWidth: m.clientWidth,
        worst: m.worst,
      };
      if (m.overflowPx > OVERFLOW_LIMIT) failed = true;
      rows.push(row);
    }
  }

  const contact = await measureContact(page);
  if (!contact.ok) failed = true;

  await browser.close();

  const report = {
    baseUrl: BASE,
    measuredAt: new Date().toISOString(),
    overflowLimit: OVERFLOW_LIMIT,
    rows,
    contact375: contact,
    pass: !failed,
  };

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(report, null, 2), "utf8");

  const bad = rows.filter((r) => r.overflowPx > OVERFLOW_LIMIT);
  console.log(
    JSON.stringify(
      {
        out: OUT,
        pass: report.pass,
        overflowFailures: bad.length,
        contactOk: contact.ok,
        contact: contact,
      },
      null,
      2,
    ),
  );

  if (failed) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
