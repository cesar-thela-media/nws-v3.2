const fs = require("fs"); // eslint-disable-line @typescript-eslint/no-require-imports
const path = require("path"); // eslint-disable-line @typescript-eslint/no-require-imports

const dir = path.join(__dirname, "..", "scraped");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
const all = {};

for (const f of files) {
  const html = fs.readFileSync(path.join(dir, f), "utf8");
  const images = [];
  const re = /https:\/\/www\.nws-homes\.com\/wp-content\/uploads\/[^"'\\\s>]+/g;
  let m;
  while ((m = re.exec(html))) {
    const u = m[0].replace(/&amp;/g, "&");
    if (!images.includes(u) && !u.includes("g.gif") && !u.includes("pixel")) {
      images.push(u);
    }
  }
  all[f.replace(".html", "")] = images;
}

fs.writeFileSync(
  path.join(dir, "all-images.json"),
  JSON.stringify(all, null, 2)
);
console.log(
  Object.entries(all)
    .map(([k, v]) => `${k}: ${v.length} images`)
    .join("\n")
);
