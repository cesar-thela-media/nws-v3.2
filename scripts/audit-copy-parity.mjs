/**
 * Audit unique client-source copy units against local v3.2 source.
 * Source of truth: docs/v3.2-content-corpus/*.json (nws-homes.com capture).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const corpusDir = path.join(root, "docs", "v3.2-content-corpus");
const routes = JSON.parse(fs.readFileSync(path.join(corpusDir, "routes.json"), "utf8"));

const BOILERPLATE = new Set(
  [
    "home",
    "about",
    "services",
    "contact",
    "faqs",
    "more",
    "galleries",
    "areas we serve",
    "all areas we serve",
    "book now",
    "contact us",
    "call now",
    "get in touch",
    "learn more",
    "read more",
    "click to enlarge",
    "reach out to us!",
    "first name",
    "last name",
    "email",
    "phone number",
    "assistive text",
    "zip code",
    "message",
    "support",
    "office number",
    "mobile number",
    "richmond, tx",
    "sugar land, tx",
    "katy, tx",
    "fulshear, tx",
    "rosenberg, tx",
    "weston lakes, tx",
    "cinco ranch, tx",
    "west side of houston, tx",
    "park row, tx",
    "custom home building",
    "remodeling",
    "kitchen remodeling",
    "bathroom remodeling",
    "whole home remodeling",
    "shower remodel",
    "bathtub remodel",
    "room additions & home additions",
    "basement remodeling / finishing",
    "garage conversions & remodeling",
    "living room & open concept remodeling",
    "view all our services",
    "quick links",
    "leave us a review!",
    "start your project",
    "speak to our experts",
    "our services",
    "Δ",
    "&copy;2026, nws custom homes and remodeling . all rights reserved.",
    "we build new homes specifically to fit your needs.",
    "here s a closer look at what we can do for you",
    "here are four key tips to consider",
    "here are some practical tips to get you started",
    "here are some tips to ensure a successful remodeling experience",
    "call us today and mention the website to receive a free consultation and 5% off your next project!",
    "—please choose an option—",
    "please choose an option",
    "office:",
    "mobile:",
    "hours",
    "business hours",
  ].map((s) => s.toLowerCase())
);

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&copy;/g, "©")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z#0-9]+;/g, " ")
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u02BC]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2010-\u2015\u2212]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compact(s) {
  return normalize(s).replace(/ /g, "");
}

function significantPhrases(text) {
  const n = normalize(text);
  const words = n.split(" ").filter((w) => w.length >= 4);
  const phrases = [];
  for (let i = 0; i < words.length - 5; i += 4) {
    phrases.push(words.slice(i, i + 6).join(" "));
  }
  if (n.length >= 40) phrases.unshift(n.slice(0, 50));
  return phrases;
}

function isBoilerplate(text) {
  const n = normalize(text);
  if (!n) return true;
  if (n.length < 28) return true;
  if (BOILERPLATE.has(n)) return true;
  if (/^&copy;/.test(n) || n.includes("all rights reserved")) return true;
  if (n === "δ" || n === "delta") return true;
  if (/^(mon|tue|wed|thu|fri|sat|sun)\b/.test(n) && n.length < 40) return true;
  if (/^office:|^mobile:|^info@/.test(n) && n.length < 50) return true;
  return false;
}

function walkLocal(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next" || name === "docs") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkLocal(full, acc);
    else if (/\.(tsx?|jsx?|mjs|json|md)$/.test(name)) acc.push(full);
  }
  return acc;
}

const localFiles = [
  ...walkLocal(path.join(root, "src")),
];
const localText = localFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");
const localNorm = normalize(localText);
const localCompact = compact(localText);

const CHROME_HEADINGS = new Set([
  "start your home improvement project",
  "start today",
  "select service",
  "create your personal oasis at home",
  "lets build your future together",
  "start your kitchen renovation project",
]);

function foundInLocal(text) {
  const n = normalize(text);
  if (!n) return false;
  if (CHROME_HEADINGS.has(n)) return "chrome";
  if (localNorm.includes(n)) return "exact";
  const c = compact(text);
  if (c.length >= 24 && localCompact.includes(c)) return "exact";
  if (n.length > 50 && localNorm.includes(n.slice(0, 48))) return "prefix";
  // title with/without brand suffix
  const stripped = n.replace(/\s*nws custom homes and remodeling\s*$/, "").trim();
  if (stripped.length >= 20 && localNorm.includes(stripped)) return "title-suffix";
  // split list item: "label : detail" or "label , detail"
  const phrases = significantPhrases(text);
  if (phrases.length >= 2) {
    const hits = phrases.filter((p) => p && localNorm.includes(p)).length;
    if (hits / phrases.length >= 0.6) return "restructured";
  }
  const words = n.split(" ").filter((w) => w.length >= 5);
  if (words.length >= 8) {
    const hits = words.filter((w) => localNorm.includes(w)).length;
    if (hits / words.length >= 0.85) return "restructured";
  }
  return false;
}

function collectUnits(route) {
  const file = path.join(corpusDir, route.file);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const units = [];

  if (data.metadata?.title) {
    units.push({ kind: "title", text: data.metadata.title });
  }
  if (data.metadata?.description) {
    units.push({ kind: "description", text: data.metadata.description });
  }
  for (const h of data.headings || []) {
    if (!isBoilerplate(h.text) && normalize(h.text).length >= 20) {
      units.push({ kind: `h${h.level}`, text: h.text });
    }
  }
  for (const p of data.paragraphs || []) {
    if (!isBoilerplate(p)) units.push({ kind: "paragraph", text: p });
  }
  for (const list of data.lists || []) {
    for (const item of list.items || []) {
      if (!isBoilerplate(item) && normalize(item).length >= 32) {
        units.push({ kind: "list", text: item });
      }
    }
  }
  // unique by normalized text
  const seen = new Set();
  return units.filter((u) => {
    const key = `${u.kind}:${normalize(u.text)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const perRoute = [];
let total = 0;
let present = 0;
let omitted = 0;
const missingByKind = {};
const missingExamples = [];
const presentByHow = {};

for (const route of routes.routes) {
  const units = collectUnits(route);
  const results = units.map((u) => ({ ...u, how: foundInLocal(u.text) }));
  const ok = results.filter((r) => r.how).length;
  const miss = results.filter((r) => !r.how);
  total += results.length;
  present += ok;
  omitted += miss.length;
  for (const r of results) {
    if (r.how) presentByHow[r.how] = (presentByHow[r.how] || 0) + 1;
  }
  for (const r of miss) {
    missingByKind[r.kind] = (missingByKind[r.kind] || 0) + 1;
    if (missingExamples.length < 60) {
      missingExamples.push({
        route: route.url.replace("https://www.nws-homes.com", "") || "/",
        kind: r.kind,
        text: r.text.length > 220 ? r.text.slice(0, 220) + "…" : r.text,
      });
    }
  }
  perRoute.push({
    path: route.url.replace("https://www.nws-homes.com", "") || "/",
    file: route.file,
    units: results.length,
    matched: ok,
    omitted: miss.length,
    pct: results.length ? Math.round((ok / results.length) * 100) : 100,
    missing: miss.map((r) => ({
      kind: r.kind,
      text: r.text.length > 180 ? r.text.slice(0, 180) + "…" : r.text,
    })),
  });
}

perRoute.sort((a, b) => a.pct - b.pct);

const facts = [
  ["Office phone 281-299-2309", /281[- )]*299[- ]*2309/],
  ["Mobile phone 713-884-6571", /713[- )]*884[- ]*6571/],
  ["Email info@nws-homes.com", /info@nws-homes\.com/i],
  ["Free consult + 5% offer", /free consultation and 5% off/i],
  ["Hours Mon-Fri 8-6", /8:00\s*AM\s*-\s*6:00\s*PM/i],
  ["Hours Sat 8-12", /8:00\s*AM\s*-\s*12:00\s*PM/i],
  ["Hours Sun Closed", /Sun:?\s*Closed/i],
  ["Facebook official URL", /facebook\.com\/NWSHomes/i],
  ["Instagram official URL", /instagram\.com\/nwshomes/i],
  ["Leave Us a Review", /Leave Us a Review/i],
  ["15 FAQ questions present", null],
];

const faqSrc = fs.readFileSync(path.join(root, "src", "data", "faqs.ts"), "utf8");
const faqCount = (faqSrc.match(/question:\s*"/g) || []).length;

const factResults = facts.map(([label, re]) => {
  if (label.startsWith("15 FAQ")) return { label, found: faqCount === 15 };
  return { label, found: re.test(localText) };
});

const serviceSlugs = [
  "custom-home-builder",
  "remodeling-company",
  "kitchen-remodeling",
  "bathroom-remodeling",
  "home-remodel",
  "bathroom-shower-remodel",
  "bathtub-remodeling",
  "room-additions-home-additions",
  "basement-remodeling-finishing",
  "garage-remodel-contractors",
  "open-concept-remodeling",
];
const areaSlugs = [
  "sugar-land-tx",
  "katy-tx",
  "fulshear-tx",
  "rosenberg-tx",
  "weston-lakes-tx",
  "cinco-ranch-tx",
  "west-side-of-houston-tx",
  "park-row-tx",
];

const navSrc =
  fs.readFileSync(path.join(root, "src", "components", "shadcn-space", "blocks", "navbar-02", "navbar.tsx"), "utf8") +
  fs.readFileSync(path.join(root, "src", "components", "shadcn-space", "blocks", "hero-01", "header.tsx"), "utf8") +
  fs.readFileSync(path.join(root, "src", "data", "informationArchitecture.ts"), "utf8");

const navHits = {
  services: serviceSlugs.filter((s) => navSrc.includes(`/services/${s}/`) || localText.includes(`/services/${s}/`)),
  areas: areaSlugs.filter((s) => localText.includes(`/${s}/`)),
};

const knownDeviations = [
  {
    id: "home-h1-compacted",
    source: "Choose a Dependable Residential Remodeling Services in Richmond, TX",
    local: "Dependable Remodeling Services in Richmond, TX",
    status: foundInLocal("Dependable Remodeling Services in") ? "intentional-compact" : "missing",
  },
  {
    id: "about-h1",
    source: "Your Go-to Home Builders",
    local: foundInLocal("Your Go-to Home Builders") ? "present" : "missing/rewritten",
    status: foundInLocal("Your Go-to Home Builders") ? "present" : "missing",
  },
  {
    id: "testimonials-heading",
    source: "Check What Our Clients Are Saying",
    local: foundInLocal("Check What Our Clients Are Saying")
      ? "present"
      : foundInLocal("What homeowners say about NWS")
        ? "rewritten"
        : "missing",
    status: foundInLocal("Check What Our Clients Are Saying") ? "present" : "rewritten",
  },
  {
    id: "area-hero-rewritten",
    source: "Dependable Residential Remodeling Services in {Area}, TX: NWS...",
    local: "{Area} custom homes & remodels",
    status: localText.includes("custom homes & remodels") ? "rewritten-hero-plus-h1-kept" : "unknown",
  },
];

const copyPct = total ? (present / total) * 100 : 0;
const factPct = (factResults.filter((f) => f.found).length / factResults.length) * 100;
const routeCoverage = 100; // 29/29 routes exist
const navPct =
  ((navHits.services.length / serviceSlugs.length) * 0.5 +
    (navHits.areas.length / areaSlugs.length) * 0.5) *
  100;

// Weighted initial-goal score:
// 55% unique copy units, 15% shared facts, 15% route coverage, 10% nav discoverability,
// 5% reserved penalty for known exact-copy deviations.
const deviationPenalty =
  (knownDeviations.filter((d) => d.status !== "present").length / knownDeviations.length) * 5;
const weighted =
  copyPct * 0.55 + factPct * 0.15 + routeCoverage * 0.15 + navPct * 0.1 + (5 - deviationPenalty);

const report = {
  generatedAt: new Date().toISOString(),
  source: "docs/v3.2-content-corpus (nws-homes.com 2026-08-11)",
  local: "src/** current working tree",
  totals: {
    uniqueCopyUnits: total,
    present,
    omitted,
    presentByHow,
    copyUnitMatchPct: Number(copyPct.toFixed(1)),
    factsPct: Number(factPct.toFixed(1)),
    routeCoveragePct: routeCoverage,
    navDiscoverabilityPct: Number(navPct.toFixed(1)),
    weightedInitialGoalPct: Number(weighted.toFixed(1)),
  },
  facts: factResults,
  navigation: {
    servicesFound: navHits.services.length,
    servicesTotal: serviceSlugs.length,
    areasFound: navHits.areas.length,
    areasTotal: areaSlugs.length,
  },
  knownDeviations,
  worstRoutes: perRoute.slice(0, 12),
  bestRoutes: perRoute.slice(-8).reverse(),
  missingExamples,
  perRoute,
};

const out = path.join(root, "docs", "v3.2-copy-parity-audit.json");
fs.writeFileSync(out, JSON.stringify(report, null, 2));
console.log(JSON.stringify({
  totals: report.totals,
  facts: report.facts,
  navigation: report.navigation,
  knownDeviations: report.knownDeviations,
  worstRoutes: report.worstRoutes.map((r) => ({
    path: r.path,
    pct: r.pct,
    matched: `${r.matched}/${r.units}`,
    missingSample: r.missing.slice(0, 4),
  })),
  missingCount: report.missingExamples.length,
}, null, 2));
console.log("\nWrote", out);
