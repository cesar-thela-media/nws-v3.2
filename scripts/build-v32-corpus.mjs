import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const baselinePath = path.join(root, "docs", "v3.2-baseline.md");
const baseline = await fs.readFile(baselinePath, "utf8");
const urls = [...baseline.matchAll(/^https:\/\/www\.nws-homes\.com\/[^\s`]+/gm)].map((m) => m[0]);
const uniqueUrls = [...new Set(["https://www.nws-homes.com/", ...urls])];
const pageUrls = uniqueUrls.filter((u) => !u.includes("/services/") || u.endsWith("/services/"));
const serviceUrls = uniqueUrls.filter((u) => u.includes("/services/") && !u.endsWith("/services/"));
const outDir = path.join(root, "docs", "v3.2-content-corpus");
await fs.mkdir(outDir, { recursive: true });
const capturedAt = new Date().toISOString();
const failures = [];
const items = [];

function decode(s = "") {
  return s.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
}
function attrs(tag) {
  const out = {};
  for (const m of tag.matchAll(/([:\w-]+)\s*=\s*["']([^"']*)["']/g)) out[m[1].toLowerCase()] = decode(m[2]);
  return out;
}
function text(html) {
  return decode(html.replace(/<!--[\s\S]*?-->/g, " ").replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}
function blocks(html, tag) {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi");
  return [...html.matchAll(re)].map((m) => text(m[1])).filter(Boolean);
}
function allTags(html, tag) { return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map((m) => ({ raw: m[0], attrs: attrs(m[0]) })); }
function canonical(html) { return allTags(html, "link").find((x) => x.attrs.rel?.toLowerCase() === "canonical")?.attrs.href || null; }
function meta(html, name) { const x = allTags(html, "meta").find((x) => (x.attrs.name || x.attrs.property || "").toLowerCase() === name); return x?.attrs.content || null; }
function normalizeUrl(base, value) { try { return new URL(value, base).href; } catch { return value; } }
function routeSlug(url) { const p = new URL(url).pathname.replace(/^\/+|\/+$/g, ""); return p ? p.replace(/\//g, "--") : "home"; }

for (const url of uniqueUrls) {
  const started = new Date().toISOString();
  try {
    const res = await fetch(url, { headers: { "User-Agent": "NWS-v3.2-content-corpus/1.0" } });
    const html = await res.text();
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] && text(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)[1])) || null;
    const headings = [];
    for (let level = 1; level <= 6; level++) for (const value of blocks(html, `h${level}`)) headings.push({ level, text: value });
    const paragraphs = blocks(html, "p");
    const lists = [...html.matchAll(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((m) => ({ type: m[1].toLowerCase(), items: blocks(m[2], "li") })).filter((x) => x.items.length);
    const pageLinks = allTags(html, "a").map((x) => ({ url: normalizeUrl(url, x.attrs.href), text: "" })).map((x, i) => ({ ...x, text: text([...html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)][i]?.[1] || "") })).filter((x) => x.url && !x.url.startsWith("javascript:"));
    const images = allTags(html, "img").map((x) => ({ url: normalizeUrl(url, x.attrs.src || x.attrs["data-src"] || ""), alt: x.attrs.alt || "" })).filter((x) => x.url && x.url !== url);
    const forms = allTags(html, "form").map((x) => ({ action: normalizeUrl(url, x.attrs.action || ""), method: x.attrs.method || "get" }));
    const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
    const visibleText = text(body);
    const ctas = pageLinks.filter((x) => /contact|quote|consult|start|learn more|call|schedule|free|view/i.test(`${x.text} ${x.url}`));
    const phone = [...new Set((visibleText.match(/(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/g) || []))];
    const email = [...new Set((visibleText.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/g) || []))];
    const hours = [...new Set((visibleText.match(/(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)[^.!?]{0,100}/gi) || []))];
    const item = { source: { url, capturedAt: started, httpStatus: res.status, finalUrl: res.url }, metadata: { title, description: meta(html, "description"), canonical: canonical(html) }, headings, visibleText, paragraphs, lists, links: pageLinks, ctas, contact: { phones: phone, emails: email, hours, offers: [...new Set((visibleText.match(/[^.]{0,60}(?:free estimate|consultation|special|offer|discount)[^.]{0,100}/gi) || []))] }, navigation: { links: pageLinks.filter((x) => /menu|nav|header|footer/i.test(x.text + x.url)) }, images, forms, faq: { details: [...html.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)].map((m) => text(m[1])), accordionMarkers: /accordion|faq|aria-expanded|data-toggle/i.test(html) } };
    const filename = `${routeSlug(url)}.json`;
    await fs.writeFile(path.join(outDir, filename), JSON.stringify(item, null, 2));
    items.push({ url, file: filename, httpStatus: res.status, title, capturedAt: started, paragraphs: paragraphs.length, headings: headings.length, links: pageLinks.length, images: images.length });
  } catch (error) { failures.push({ url, capturedAt: started, error: String(error) }); }
}
const nav = { capturedAt, source: "https://www.nws-homes.com/", routes: items.map((x) => x.url), shared: [], note: "Route-level navigation is retained in each normalized route JSON under navigation.links." };
const assetIndex = { capturedAt, source: "https://www.nws-homes.com/", assets: [] };
for (const item of items) { const data = JSON.parse(await fs.readFile(path.join(outDir, item.file), "utf8")); for (const image of data.images) assetIndex.assets.push({ ...image, sourceRoute: item.url }); }
assetIndex.assets = [...new Map(assetIndex.assets.map((x) => [`${x.url}|${x.alt}`, x])).values()];
await fs.writeFile(path.join(outDir, "routes.json"), JSON.stringify({ capturedAt, source: "https://www.nws-homes.com/", expected: { total: 29, pages: 18, services: 11 }, counts: { captured: items.length, pages: items.filter((x) => !x.url.includes("/services/") || x.url.endsWith("/services/")).length, services: items.filter((x) => x.url.includes("/services/") && !x.url.endsWith("/services/")).length }, routes: items }, null, 2));
await fs.writeFile(path.join(outDir, "navigation.json"), JSON.stringify(nav, null, 2));
await fs.writeFile(path.join(outDir, "assets.json"), JSON.stringify(assetIndex, null, 2));
await fs.writeFile(path.join(outDir, "source-failures.json"), JSON.stringify({ capturedAt, failures }, null, 2));
await fs.writeFile(path.join(outDir, "README.md"), `# NWS v3.2 content corpus\n\nCaptured ${capturedAt} from the exact 29 URLs in docs/v3.2-baseline.md (18 page sitemap URLs and 11 service sitemap URLs). Each route JSON records its source URL, capture timestamp, HTTP status, metadata, headings, visible text, paragraphs, lists, links, CTAs, contact facts/hours/offers, navigation, image URLs/alt text, forms (not submitted), and FAQ/accordion HTML markers.\n\nCollection used Node.js HTTP fetch and a dependency-free HTML parser based on defensive tag matching and entity decoding. Browser rendering was not used by this batch collector; JavaScript-only or interaction-revealed content may therefore be incomplete. FAQ/accordion source HTML was inspected for details and common accordion markers. No forms were submitted. This corpus is source capture only and makes no parity claim.\n\n## Verification\n\n- Expected routes: 29 (18 page + 11 service)\n- Captured routes: ${items.length} (${items.filter((x) => !x.url.includes("/services/") || x.url.endsWith("/services/")).length} page + ${items.filter((x) => x.url.includes("/services/") && !x.url.endsWith("/services/")).length} service)\n- Failures: ${failures.length}\n- Per-route files: ${items.length}\n`);
console.log(JSON.stringify({ expected: 29, captured: items.length, pages: pageUrls.length, services: serviceUrls.length, failures: failures.length, outDir }, null, 2));
if (items.length !== 29 || failures.length) process.exitCode = 2;
