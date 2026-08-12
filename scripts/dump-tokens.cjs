const fs = require("fs"); // eslint-disable-line @typescript-eslint/no-require-imports
const css=fs.readFileSync("src/app/globals.css","utf8");
const layout=fs.readFileSync("src/app/layout.tsx","utf8");
const m=css.match(/:root\s*\{([\s\S]*?)\n\}/);
const vars={};
for (const x of m[1].matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+);/gi)) vars[x[1]]=x[2].trim();
const out={
  source:"shipped src/app/globals.css :root + layout fonts",
  background:vars["color-bg"],
  backgroundAlt:vars["color-bg-alt"],
  text:vars["color-text"],
  heading:vars["color-heading"],
  primary:vars["color-primary"],
  primaryHover:vars["color-primary-hover"],
  border:vars["color-border"],
  muted:vars["color-muted"],
  dark:vars["color-dark"],
  radiusBtn:vars["radius-btn"],
  nwsFontSans:vars["nws-font-sans"],
  nwsFontSerif:vars["nws-font-serif"],
  layoutLoadsManrope:/Manrope/.test(layout),
  layoutLoadsInstrument:/Instrument_Serif|Instrument Serif/.test(layout),
  computedLiveNote:"Playwright: body Manrope; h1/h2 Instrument Serif; btn rgb(255,69,0); bg rgb(250,250,249)"
};
const scratch=process.env.SCRATCH;
fs.writeFileSync(scratch+"/nws-tokens-after.json", JSON.stringify(out,null,2));
console.log(JSON.stringify(out,null,2));
