/**
 * Round-2 goal regression tests (home micro-fixes, nav, deploy/n8n prep).
 * Run: node --test scripts/round2-goal.test.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function read(...parts) {
  return fs.readFileSync(path.join(root, ...parts), "utf8");
}

function exists(...parts) {
  return fs.existsSync(path.join(root, ...parts));
}

test("animated-text-08 MarkerHighlight wired in About NWS (home) on Richmond", () => {
  const about = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "about-us-06",
    "about-us.tsx",
  );
  assert.match(about, /MarkerHighlight/);
  assert.match(about, /animated-text-08/);
  assert.match(about, /highlight=["']Richmond["']/);
  assert.ok(
    about.includes("#ff4500") || about.includes("ff4500"),
    "orange marker color",
  );
  assert.ok(
    about.includes("#ffffff") || about.includes("ffffff"),
    "white highlighted text",
  );
  assert.ok(
    exists("src", "components", "shadcn-space", "animated-text", "animated-text-08.tsx"),
    "animated-text-08 file present",
  );
});

test("What we do Learn more is orange and carousel not infinite loop", () => {
  const p = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "portfolio-06",
    "portfolio.tsx",
  );
  assert.match(p, /text-primary/);
  assert.match(p, /Learn more/);
  assert.match(p, /loop:\s*false/);
});

test("CTA primary call button forces white text on orange", () => {
  const cta = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "cta-08",
    "cta.tsx",
  );
  assert.ok(
    cta.includes("!text-white") && cta.includes("Call (281)"),
    "call button white text",
  );
});

test("hero roller uses hard clip to prevent letter bleed", () => {
  const roller = read(
    "src",
    "components",
    "shadcn-space",
    "animated-text",
    "animated-text-04.tsx",
  );
  assert.match(roller, /clipPath|overflow-hidden/);
  assert.match(roller, /LINE_EM/);
  assert.ok(
    roller.includes("1.35") || roller.includes("1.25"),
    "fixed line height for clip",
  );
});

test("navbar Book Now goes to contact (desktop-friendly) and orange hover/open", () => {
  const nav = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "navbar-02",
    "navbar.tsx",
  );
  const triggerStyle = read("src", "components", "ui", "navigation-menu.tsx");
  assert.match(nav, /href=["']\/contact\/["']/);
  assert.doesNotMatch(
    nav,
    /Book Now[\s\S]{0,200}tel:2812992309/,
    "Book Now should not be tel-only",
  );
  assert.match(nav, /hover:!text-primary|hover:text-primary/);
  // Base UI open attrs — not Radix data-[state=open]
  assert.match(nav, /data-popup-open:!bg-primary|data-popup-open:bg-primary/);
  assert.match(nav, /data-popup-open:!text-primary|data-popup-open:text-primary/);
  assert.match(nav, /data-open:!bg-primary|data-open:bg-primary/);
  assert.doesNotMatch(
    nav,
    /data-\[state=open\]:bg-primary/,
    "must not rely on Radix data-[state=open] for open fill",
  );
  // Default trigger must not hardcode muted open wash
  assert.doesNotMatch(
    triggerStyle,
    /data-popup-open:bg-muted/,
    "navigationMenuTriggerStyle must not force muted open background",
  );
  assert.doesNotMatch(nav, /subtitle:\s*"What we build"/);
  assert.doesNotMatch(nav, /subtitle:\s*"Our work"/);
  assert.doesNotMatch(nav, /subtitle:\s*"Where we work"/);
});

test("Button sets nativeButton false when render is used", () => {
  const btn = read("src", "components", "ui", "button.tsx");
  assert.match(btn, /nativeButton/);
  assert.match(btn, /render === undefined/);
  assert.match(btn, /resolvedNative/);
});

test("contact forms are n8n webhook-ready via env", () => {
  const form = read("src", "components", "ContactForm.tsx");
  const form2 = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "contact-01",
    "contact-form.tsx",
  );
  for (const f of [form, form2]) {
    assert.match(f, /NEXT_PUBLIC_N8N_WEBHOOK_URL/);
    assert.match(f, /fetch\(/);
    assert.match(f, /POST/);
  }
});

test("deploy prep files exist (Docker, Railway, Nixpacks)", () => {
  assert.ok(exists("Dockerfile"));
  assert.ok(exists("railway.toml"));
  assert.ok(exists("nixpacks.toml"));
  const pkg = JSON.parse(read("package.json"));
  assert.ok(pkg.engines?.node, "engines.node set");
  const next = read("next.config.ts");
  // standalone for Docker/Railway; skipped on Vercel via !process.env.VERCEL
  assert.match(next, /standalone/);
});

test("home FAQ still-have-questions image uses object-cover", () => {
  const faq = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "faq-07",
    "faq.tsx",
  );
  assert.match(faq, /object-cover/);
  assert.match(faq, /object-center/);
});

test("hero background uses real NWS public image path", () => {
  const page = read("src", "app", "page.tsx");
  assert.match(page, /backgroundImage=["']\/images\//);
  assert.ok(
    page.includes("hero-home-remodeled-richmond-tx.webp") ||
      page.includes("hero-custom-home") ||
      page.includes("custom-homes-"),
    "prefer real NWS photo under public/images",
  );
});
