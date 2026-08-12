const fs = require("fs"); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require("path"); // eslint-disable-line @typescript-eslint/no-require-imports

const dir = path.join(__dirname, "..", "scraped");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));

function decode(html) {
  return html
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "-")
    .replace(/&#038;/g, "&")
    .replace(/&hellip;/g, "...")
    .replace(/&[a-zA-Z0-9#]+;/g, " ");
}

for (const f of files) {
  const html = fs.readFileSync(path.join(dir, f), "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "";
  const desc =
    (html.match(/name=["']description["']\s+content=["']([^"']*)["']/i) ||
      html.match(/content=["']([^"']*)["']\s+name=["']description["']/i) ||
      [])[1] || "";

  // Elementor widget text
  const widgets = [];
  const re =
    /elementor-widget-container[\s\S]*?>([\s\S]*?)<\/div>\s*<\/div>/gi;
  let m;
  while ((m = re.exec(html)) && widgets.length < 80) {
    const t = decode(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (t.length > 20 && t.length < 2000) widgets.push(t);
  }

  // headings
  const headings = [];
  const hre = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
  while ((m = hre.exec(html)) && headings.length < 40) {
    const t = decode(m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (t) headings.push(`${m[1]}: ${t}`);
  }

  // images from content
  const images = [];
  const ire = /wp-content\/uploads\/[^"'\\s]+/g;
  let im;
  while ((im = ire.exec(html)) && images.length < 40) {
    if (!images.includes(im[0])) images.push(im[0]);
  }

  const out = [
    `TITLE: ${decode(title)}`,
    `DESC: ${decode(desc)}`,
    "",
    "=== HEADINGS ===",
    ...headings,
    "",
    "=== WIDGETS ===",
    ...widgets.map((w, i) => `[${i}] ${w}`),
    "",
    "=== IMAGES ===",
    ...images,
  ].join("\n");

  fs.writeFileSync(path.join(dir, f.replace(".html", ".txt")), out);
  console.log("OK", f, headings.length, "headings", widgets.length, "widgets");
}
