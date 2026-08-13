/**
 * Writes src/data/corpusRestores.ts from the latest route-scoped audit.
 * Each omitted unit is stored under its sitemap path so the matching page can render it.
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
spawnSync(process.execPath, ["scripts/audit-copy-parity.mjs"], {
  cwd: root,
  stdio: "inherit",
});

const report = JSON.parse(
  fs.readFileSync(path.join(root, "docs", "v3.2-copy-parity-audit.json"), "utf8"),
);

const restores = {};
for (const route of report.perRoute || []) {
  const texts = (route.missing || [])
    .map((item) => String(item.text || "").trim())
    .filter(Boolean);
  if (texts.length) restores[route.path] = [...new Set(texts)];
}

const file = `/** Auto-generated omitted live-site copy, keyed by sitemap path. */
export const corpusRestores: Record<string, string[]> = ${JSON.stringify(restores, null, 2)};
`;

fs.writeFileSync(path.join(root, "src", "data", "corpusRestores.ts"), file);
console.log(
  "routes with restores",
  Object.keys(restores).length,
  "units",
  Object.values(restores).reduce((n, list) => n + list.length, 0),
);
