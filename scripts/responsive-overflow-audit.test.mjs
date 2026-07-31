/**
 * Structural + executable audit gate for responsive overflow script.
 * Run: node --test scripts/responsive-overflow-audit.test.mjs
 *
 * Full browser audit (needs server + playwright):
 *   node scripts/responsive-overflow-audit.mjs
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function read(...parts) {
  return fs.readFileSync(path.join(root, ...parts), "utf8");
}

test("responsive overflow audit script exists and targets required routes/widths", () => {
  const script = read("scripts", "responsive-overflow-audit.mjs");
  assert.match(script, /playwright|chromium/i);
  for (const route of [
    '"/"',
    '"/about/"',
    '"/services/"',
    '"/services/custom-home-builder/"',
    '"/custom-homes-gallery/"',
    '"/areas-we-serve/"',
    '"/contact/"',
    '"/faqs/"',
  ]) {
    assert.ok(script.includes(route), `missing route ${route}`);
  }
  for (const w of [320, 375, 768, 1280, 1536]) {
    assert.ok(
      script.includes(String(w)),
      `missing width ${w}`,
    );
  }
  assert.match(script, /data-contact-01|Tell us about your project/);
  assert.match(script, /overflowPx|scrollWidth/);
});

test("contact form has no residual slide-in animation classes", () => {
  const form = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "contact-01",
    "contact-form.tsx",
  );
  assert.doesNotMatch(
    form,
    /slide-in-from-right|fill-mode-both/,
    "slide-in residual offset must stay removed",
  );
  assert.match(form, /w-full max-w-full|min-w-0/);
});

test("contact section exposes data-contact-01 for audit hooks", () => {
  const idx = read(
    "src",
    "components",
    "shadcn-space",
    "blocks",
    "contact-01",
    "index.tsx",
  );
  assert.match(idx, /data-contact-01/);
});

test("html/body clip horizontal overflow at root", () => {
  const css = read("src", "app", "globals.css");
  assert.match(css, /overflow-x:\s*clip/);
});

/**
 * When BASE_URL is reachable, run the real Playwright audit and assert pass.
 * Skips cleanly if server is down (CI without server); local goal runs with server.
 */
test("live overflow audit passes when BASE_URL responds", async () => {
  const base = (process.env.BASE_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
  let up = false;
  try {
    const res = await fetch(base + "/");
    up = res.ok;
  } catch {
    up = false;
  }
  if (!up) {
    // Soft skip: structural tests above still gate shipped code
    console.log("skip live audit: server not reachable at", base);
    return;
  }

  const out = path.join(__dirname, "responsive-overflow-audit.last.json");
  const r = spawnSync(
    process.execPath,
    [path.join(__dirname, "responsive-overflow-audit.mjs"), out],
    {
      cwd: root,
      encoding: "utf8",
      env: { ...process.env, BASE_URL: base },
      timeout: 300000,
    },
  );
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.stderr) process.stderr.write(r.stderr);
  assert.equal(r.status, 0, `audit exit ${r.status}`);
  assert.ok(fs.existsSync(out), "audit wrote json");
  const report = JSON.parse(fs.readFileSync(out, "utf8"));
  assert.equal(report.pass, true);
  assert.ok(Array.isArray(report.rows));
  assert.ok(report.rows.length >= 8 * 5);
  for (const row of report.rows) {
    assert.ok(
      row.overflowPx <= 1,
      `${row.path}@${row.width} overflow ${row.overflowPx}`,
    );
  }
  assert.equal(report.contact375.ok, true);
  assert.ok(report.contact375.formLeft >= 12);
  assert.ok(
    report.contact375.formRight <= report.contact375.clientWidth - 12,
  );
  assert.ok(
    report.contact375.formWidth >= report.contact375.clientWidth - 48,
  );
  assert.equal(report.contact375.hasSlideTransform, false);
});
