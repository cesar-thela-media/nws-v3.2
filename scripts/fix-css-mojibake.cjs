const fs = require("fs"); // eslint-disable-line @typescript-eslint/no-require-imports
const path = "src/app/globals.css";
let text = fs.readFileSync(path, "utf8");

// Replace flip-card bullet content (any broken encoding)
text = text.replace(
  /(\.flip-card li::before\s*\{[^}]*?content:\s*)"[^"]*"(\s*;)/,
  '$1"\\2022"$2'
);

// Replace FAQ open minus content
text = text.replace(
  /(\.faq-item\[open\] summary::after\s*\{[^}]*?content:\s*)"[^"]*"(\s*;)/,
  '$1"\\2212"$2'
);

// Fallback: any remaining mojibake content lines near those selectors
text = text.replace(/content:\s*"â€¢"\s*;/g, 'content: "\\2022";');
text = text.replace(/content:\s*"âˆ’"\s*;/g, 'content: "\\2212";');
// common mis-decoded sequences
text = text.replace(/content:\s*"Ã¢â‚¬Â¢"\s*;/g, 'content: "\\2022";');
text = text.replace(/content:\s*"Ã¢Ë†â€™"\s*;/g, 'content: "\\2212";');

fs.writeFileSync(path, text);

// Verify
const lines = text.split(/\n/);
lines.forEach((l, i) => {
  if (/content:/.test(l) && !/justify/.test(l)) {
    console.log(i + 1, JSON.stringify(l));
  }
});
if (/â€|âˆ|Ã¢/.test(text)) {
  console.error("Still has mojibake patterns");
  process.exit(1);
}
console.log("OK fixed mojibake");
