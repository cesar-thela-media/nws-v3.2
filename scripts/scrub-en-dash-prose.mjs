/**
 * Replace AI-style en-dash prose separators (U+2013 between title words and sentence)
 * while preserving numeric / price ranges like $15,000–$30,000 or 2–6 weeks.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");

function walk(d, a = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, a);
    else if (/\.(ts|tsx)$/.test(e.name)) a.push(p);
  }
  return a;
}

/** True if en dash sits in a pure numeric/currency/time range */
function isNumericRangeContext(line, index) {
  const before = line.slice(0, index);
  const after = line.slice(index + 1);
  // digit or $ on left of optional spaces; digit on right of optional spaces
  return /[\d$]\s*$/.test(before) && /^\s*[\d$]/.test(after);
}

let scrubbed = 0;
const remaining = [];

for (const f of walk(root)) {
  const t = fs.readFileSync(f, "utf8");
  if (!t.includes("\u2013")) continue;
  const lines = t.split("\n");
  const outLines = lines.map((line) => {
    let s = line;
    let idx = 0;
    while ((idx = s.indexOf("\u2013", idx)) !== -1) {
      if (isNumericRangeContext(s, idx)) {
        idx += 1;
        continue;
      }
      // Prose separator → colon + single space (trim spaces around dash)
      const left = s.slice(0, idx).replace(/\s+$/, "");
      const right = s.slice(idx + 1).replace(/^\s+/, "");
      s = `${left}: ${right}`;
      scrubbed += 1;
      idx = left.length + 2;
    }
    return s;
  });
  const out = outLines.join("\n");
  if (out !== t) {
    fs.writeFileSync(f, out);
    console.log("updated", path.relative(path.join(root, ".."), f));
  }
  outLines.forEach((l, i) => {
    if (l.includes("\u2013") && !isNumericRangeContext(l, l.indexOf("\u2013"))) {
      remaining.push(`${f}:${i + 1} ${l.trim().slice(0, 100)}`);
    }
  });
}

console.log("scrubbed", scrubbed);
console.log("remaining_prose", remaining.length ? remaining.join("\n") : "none");

// list allowed remaining (numeric)
const allowed = [];
for (const f of walk(root)) {
  const t = fs.readFileSync(f, "utf8");
  t.split("\n").forEach((l, i) => {
    let idx = 0;
    while ((idx = l.indexOf("\u2013", idx)) !== -1) {
      if (isNumericRangeContext(l, idx)) {
        allowed.push(`${path.relative(path.join(root, ".."), f)}:${i + 1}`);
      }
      idx += 1;
    }
  });
}
console.log("allowed_numeric_ranges", allowed.length);
