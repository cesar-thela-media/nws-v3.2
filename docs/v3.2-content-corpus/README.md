# NWS v3.2 content corpus

Captured 2026-08-11T18:24:38.964Z from the exact 29 URLs in docs/v3.2-baseline.md (18 page sitemap URLs and 11 service sitemap URLs). Each route JSON records its source URL, capture timestamp, HTTP status, metadata, headings, visible text, paragraphs, lists, links, CTAs, contact facts/hours/offers, navigation, image URLs/alt text, forms (not submitted), and FAQ/accordion HTML markers.

Collection used Node.js HTTP fetch and a dependency-free HTML parser based on defensive tag matching and entity decoding for the 29 per-route files. A supplementary Playwright browser capture of the rendered `/faqs/` page is stored in `rendered-faqs.json`; it confirms the 15 rendered FAQ questions and answers plus the visible header/service-area navigation. JavaScript-only or interaction-revealed content on other routes may therefore still require review during the parity-matrix stage. No forms were submitted. This corpus is source capture only and makes no parity claim.

## Verification

- Expected routes: 29 (18 page + 11 service)
- Captured routes: 29 (18 page + 11 service)
- Failures: 0
- Per-route files: 29
- Rendered browser capture: `rendered-faqs.json` (15 FAQ questions + 15 answers, no form submission)
- Verification record: `verification.json`

`source-failures.json` contains an empty failure list. `routes.json` is the route-level source of truth for the 29 HTTP captures; every route record has a source URL, capture timestamp, HTTP 200 status, and per-route JSON file.
