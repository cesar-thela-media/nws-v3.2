import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const home = fs.readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
const portfolio = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/portfolio-06/portfolio.tsx"), "utf8");
const about = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/about-us-06/about-us.tsx"), "utf8");
const contact = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/contact-01/contact-info.tsx"), "utf8");
const faq = fs.readFileSync(path.join(root, "src/components/shadcn-space/blocks/faq-07/faq.tsx"), "utf8");
const faqData = fs.readFileSync(path.join(root, "src/data/faqs.ts"), "utf8");
const reviews = fs.readFileSync(path.join(root, "src/data/reviews.ts"), "utf8");

const services = [
  "Custom Home Building", "Remodeling", "Kitchen Remodeling", "Bathroom Remodeling", "Whole Home Remodeling", "Shower Remodel", "Bathtub Remodel", "Room Additions & Home Additions", "Basement Remodeling / Finishing", "Garage Conversions & Remodeling", "Living Room & Open Concept Remodeling",
];

test("home uses client metadata and approved source section labels", () => {
  assert.match(home, /Residential Remodeling Services Richmond, TX \| Contact Us Today!/);
  assert.match(home, /badge="We build new homes specifically to fit your needs\./);
  assert.match(home, /Dependable Remodeling Services in/);
  assert.match(home, /label="Let’s Build Your Dreams"/);
  assert.match(home, /heading="Our Quality Services"/);
  assert.match(home, /<AreasServeMarquee \/>/);
});

test("home service section exposes every client service route and label", () => {
  for (const title of services) assert.match(portfolio, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(portfolio, /href: "\/services\/open-concept-remodeling\/"/);
  assert.match(portfolio, /href: "\/services\/basement-remodeling-finishing\/"/);
});

test("about and contact use captured client headings/copy", () => {
  assert.match(about, /Let’s Build Your Dreams/);
  assert.match(about, /Bring Your Dream Home to Life/);
  assert.match(about, /house renovation contractors and home addition contractors/);
  assert.match(contact, /Start Your Project/);
  assert.match(contact, /Reach Out to Our Contractors/);
  assert.match(contact, /Questions or queries\? Get in touch!/);
  assert.match(contact, />Hours</);
});

test("FAQ route uses all fifteen canonical client FAQs and renders their links", () => {
  assert.match(faq, /canonicalFaqs/);
  assert.match(faq, /faq\.links/);
  assert.equal((faqData.match(/question: "/g) || []).length, 15);
  assert.match(faq, /FREQUENTLY ASKED QUESTIONS/);
});

test("testimonial data does not truncate client quotes", () => {
  assert.match(reviews, /body: `“\$\{r\.text\}”`/);
});
