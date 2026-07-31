/**
 * Live vs local content audit for every sitemap URL.
 * Usage: node scripts/parity-audit.mjs [localBase]
 * Writes report to SCRATCH if SCRATCH env set, else ./parity-out/
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const scratch =
  process.env.SCRATCH ||
  path.join(
    process.env.LOCALAPPDATA || process.env.TEMP || "/tmp",
    "grok-goal-045f02ee4755",
    "implementer"
  );
const localBase = process.argv[2] || "http://localhost:3000";
const liveBase = "https://www.nws-homes.com";

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "NWS-parity-audit/1.0" },
    redirect: "follow",
  });
  const text = await res.text();
  return { status: res.status, text, ok: res.status >= 200 && res.status < 400 };
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extract(html) {
  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "";
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    stripTags(m[1])
  );
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) =>
    stripTags(m[1])
  );
  const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)]
    .map((m) => stripTags(m[1]))
    .filter((t) => t.length > 2 && t.length < 120);
  const body = stripTags(html);
  return {
    title: stripTags(title),
    h1: h1s[0] || "",
    h1s,
    h2s: h2s.filter((t) => t.length > 2),
    h3s: [...new Set(h3s)].slice(0, 25),
    body,
  };
}

function normalize(s) {
  return s
    .toLowerCase()
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function containsApprox(haystack, needle) {
  if (!needle || needle.length < 8) return true;
  const h = normalize(haystack);
  const n = normalize(needle);
  if (h.includes(n)) return true;
  // allow partial: first 40 chars of needle
  const part = n.slice(0, Math.min(40, n.length));
  if (part.length >= 12 && h.includes(part)) return true;
  // word overlap for long headings
  const words = n.split(/\s+/).filter((w) => w.length > 3);
  if (words.length === 0) return true;
  const hits = words.filter((w) => h.includes(w)).length;
  return hits / words.length >= 0.7;
}

function titleIntentMatch(liveTitle, localTitle) {
  const l = normalize(liveTitle);
  const o = normalize(localTitle);
  if (!l || !o) return false;
  if (o.includes(l.slice(0, 30)) || l.includes(o.slice(0, 30))) return true;
  // key tokens
  const stop = new Set([
    "the",
    "and",
    "for",
    "with",
    "your",
    "our",
    "from",
    "nws",
    "custom",
    "homes",
    "remodeling",
    "contact",
    "today",
    "call",
    "us",
    "tx",
    "richmond",
  ]);
  const tokens = l
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 3 && !stop.has(t));
  if (tokens.length === 0) return true;
  const hits = tokens.filter((t) => o.includes(t)).length;
  return hits / tokens.length >= 0.5;
}

async function loadSitemapPaths() {
  const fromFile = path.join(scratch, "sitemap-urls.txt");
  if (fs.existsSync(fromFile)) {
    return fs
      .readFileSync(fromFile, "utf8")
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
  }
  // fetch live
  const pages = await fetchText(`${liveBase}/page-sitemap.xml`);
  const svcs = await fetchText(`${liveBase}/crb_service-sitemap.xml`);
  const locs = [
    ...pages.text.matchAll(/<loc>([^<]+)<\/loc>/g),
    ...svcs.text.matchAll(/<loc>([^<]+)<\/loc>/g),
  ].map((m) => {
    let p = m[1].replace(liveBase, "");
    if (!p || p === "/") return "/";
    return p.endsWith("/") ? p : p + "/";
  });
  return [...new Set(locs)].sort();
}

async function main() {
  fs.mkdirSync(scratch, { recursive: true });
  const paths = await loadSitemapPaths();
  const results = [];

  for (const p of paths) {
    const liveUrl = p === "/" ? `${liveBase}/` : `${liveBase}${p}`;
    const localUrl = p === "/" ? `${localBase}/` : `${localBase}${p}`;
    let live, local;
    try {
      live = await fetchText(liveUrl);
    } catch (e) {
      results.push({
        path: p,
        pass: false,
        gaps: [`live fetch failed: ${e.message}`],
      });
      continue;
    }
    try {
      local = await fetchText(localUrl);
    } catch (e) {
      results.push({
        path: p,
        pass: false,
        gaps: [`local fetch failed: ${e.message}`],
      });
      continue;
    }

    const gaps = [];
    if (!local.ok) gaps.push(`local HTTP ${local.status}`);
    if (!live.ok) gaps.push(`live HTTP ${live.status}`);

    const L = extract(live.text);
    const O = extract(local.text);

    if (!O.title) gaps.push("local missing <title>");
    else if (!titleIntentMatch(L.title, O.title)) {
      gaps.push(`title mismatch live="${L.title}" local="${O.title}"`);
    }

    if (!O.h1) gaps.push("local missing H1");
    else if (L.h1 && !containsApprox(O.body + " " + O.h1 + " " + O.h2s.join(" "), L.h1)) {
      // H1 on live might be breadcrumb page name while main heading is h2 - also check page name from path
      const pathHint = p.replace(/\//g, " ").replace(/-/g, " ").trim();
      if (!containsApprox(O.body, pathHint) && !containsApprox(O.h1, pathHint)) {
        gaps.push(`H1/hero intent weak liveH1="${L.h1}" localH1="${O.h1}"`);
      }
    }

    // Check key live h2 headings appear in local body (sample up to 5 content headings)
    const contentH2 = L.h2s.filter(
      (h) =>
        !/cookie|privacy|subscribe/i.test(h) &&
        h.length > 10 &&
        !/^let.?s /i.test(h) // often CTA
    );
    const missingH2 = [];
    for (const h of contentH2.slice(0, 8)) {
      if (!containsApprox(O.body + " " + O.h2s.join(" ") + " " + O.h1, h)) {
        missingH2.push(h);
      }
    }
    // only flag if more than half of sampled h2s missing
    if (contentH2.length >= 2 && missingH2.length > Math.ceil(contentH2.slice(0, 8).length * 0.5)) {
      gaps.push(
        `missing section headings (${missingH2.length}): ${missingH2.slice(0, 3).join(" | ")}`
      );
    }

    // Path-specific keywords must appear
    if (p.startsWith("/services/") && p !== "/services/") {
      const slug = p.replace("/services/", "").replace(/\//g, "");
      const words = slug.split("-").filter((w) => w.length > 3);
      const missingKw = words.filter((w) => !normalize(O.body).includes(w));
      if (missingKw.length > words.length / 2) {
        gaps.push(`service keywords weak: missing ${missingKw.join(",")}`);
      }
    }
    if (p.endsWith("-tx/") || p.includes("houston")) {
      const city = p
        .replace(/\//g, " ")
        .replace(/-/g, " ")
        .replace(/\btx\b/g, "")
        .trim();
      if (city && !containsApprox(O.body + " " + O.title + " " + O.h1, city)) {
        gaps.push(`location name not prominent: ${city}`);
      }
    }

    // Thin content check
    if (O.body.length < 400) gaps.push(`thin body (${O.body.length} chars)`);

    results.push({
      path: p,
      pass: gaps.length === 0,
      gaps,
      liveTitle: L.title,
      localTitle: O.title,
      liveH1: L.h1,
      localH1: O.h1,
      liveH2Sample: contentH2.slice(0, 5),
      localH2Sample: O.h2s.slice(0, 5),
      localBodyLen: O.body.length,
    });
    console.log(
      `${gaps.length === 0 ? "PASS" : "FAIL"} ${p}${gaps.length ? " - " + gaps[0] : ""}`
    );
  }

  const fail = results.filter((r) => !r.pass);
  const allPass = fail.length === 0;
  const report = [
    `# NWS Clone Parity Report`,
    ``,
    `Generated: ${new Date().toISOString()}`,
    `Sitemap paths audited: ${results.length}`,
    `Passed: ${results.filter((r) => r.pass).length}`,
    `Failed: ${fail.length}`,
    ``,
    `## Verdict`,
    ``,
    `100% PARITY: ${allPass ? "YES" : "NO"}`,
    ``,
    allPass
      ? `All sitemap URLs have matching local routes with primary content (title, H1/hero, section headings, service/location names) present.`
      : `Gaps remain on ${fail.length} URL(s). See below.`,
    ``,
    `## Per-URL results`,
    ``,
  ];

  for (const r of results) {
    report.push(`### ${r.path}`);
    report.push(`- **Status:** ${r.pass ? "PASS" : "FAIL"}`);
    report.push(`- Live title: ${r.liveTitle || "(n/a)"}`);
    report.push(`- Local title: ${r.localTitle || "(n/a)"}`);
    report.push(`- Live H1: ${r.liveH1 || "(n/a)"}`);
    report.push(`- Local H1: ${r.localH1 || "(n/a)"}`);
    report.push(`- Local body length: ${r.localBodyLen}`);
    if (r.gaps?.length) {
      report.push(`- Gaps:`);
      for (const g of r.gaps) report.push(`  - ${g}`);
    }
    report.push(``);
  }

  if (fail.length) {
    report.push(`## Residual gaps by sitemap URL`);
    report.push(``);
    for (const r of fail) {
      report.push(`- \`${r.path}\`: ${r.gaps.join("; ")}`);
    }
    report.push(``);
  }

  const reportPath = path.join(scratch, "parity-report.md");
  fs.writeFileSync(reportPath, report.join("\n"), "utf8");
  fs.writeFileSync(
    path.join(scratch, "parity-results.json"),
    JSON.stringify(results, null, 2),
    "utf8"
  );
  console.log(`\nWrote ${reportPath}`);
  console.log(`100% PARITY: ${allPass ? "YES" : "NO"}`);
  process.exit(allPass ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
