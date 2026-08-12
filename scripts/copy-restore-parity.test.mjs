import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const corpusDir = path.join(root, "docs", "v3.2-content-corpus");
const serviceData = fs.readFileSync(path.join(root, "src/data/servicePages.ts"), "utf8");
const locationData = fs.readFileSync(path.join(root, "src/data/locations.ts"), "utf8");
const detailPage = [
  fs.readFileSync(path.join(root, "src/app/services/[slug]/page.tsx"), "utf8"),
  fs.readFileSync(path.join(root, "src/components/ServiceDetailSections.tsx"), "utf8"),
].join("\n");
const locationPage = fs.readFileSync(path.join(root, "src/components/LocationPage.tsx"), "utf8");
const shipped = `${serviceData}\n${locationData}`;

function normalize(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const shippedNorm = normalize(shipped);

function corpusParagraphs(file) {
  const data = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"));
  return (data.paragraphs || []).filter((p) => p && p.length >= 28);
}

function assertContains(label, text) {
  assert.ok(
    shippedNorm.includes(normalize(text)),
    `missing shipped copy for ${label}: ${text.slice(0, 120)}`,
  );
}

const bathroomNeedles = [
  "One of the most popular design directions in modern bathroom remodeling is the spa-inspired look. Homeowners are turning their bathrooms into private sanctuaries that evoke relaxation and tranquility.",
  "To complete the spa aesthetic, many bathroom remodel contractors recommend incorporating natural elements, stone tiles, wood vanities, and soft, neutral color palettes.",
  "A shower conversion allows for easier access, less maintenance, and a sleek, contemporary appearance.",
  "As homes evolve toward minimalist design, vanity replacement trends have shifted to floating vanities",
  "Custom cabinetry solutions are another highlight of contemporary bathroom remodeling services.",
  "For those seeking wellness-oriented features, chromotherapy lighting and smart showers that remember your preferred temperature settings",
  "Modern bathroom remodel contractors are experimenting with bold textures and artistic tilework to make a statement.",
  "Many homeowners are also embracing geometric patterns, herringbone designs, and marble-inspired surfaces",
  "For instance, families may choose dual sinks and expanded storage, while couples might opt for separate vanity areas.",
  "Proper lighting can make or break your bathroom remodel. The latest trends emphasize layered lighting",
  "Recessed ceiling lights offer general illumination, while sconces near mirrors provide focused light for grooming.",
  "Homeowners no longer feel confined to a single design style. The newest bathroom upgrade trends blend timeless elegance with modern minimalism.",
  "Bathroom remodeling contractors encourage clients to mix and match finishes, combining wood textures with matte metals",
  "We address these challenges by:",
  "Tub-to-Shower Conversions: Replace outdated tubs with accessible walk-in showers.",
  "Ceramic Tile: Cost-effective and versatile, available in a wide range of colors and patterns.",
  "Porcelain Tile: Dense and moisture-resistant, ideal for floors and shower walls in humid environments.",
  "Large-Format Tile: Minimizes grout lines, making cleaning easier and creating a modern appearance.",
];

const customNeedles = [
  "Choosing What's Right for You",
  "Lessons Learned From Supply Chain Challenges During the Pandemic",
  "Unique Design: With a custom home, you can build on any lot and choose an architectural style that fits your personality.",
  "Predictable Process: The build timeline and pricing are generally more consistent, providing peace of mind for homeowners who prefer simplicity.",
  "We help guide you through key considerations such as:",
  "The Texas housing market is evolving, and today's homeowners are seeking spaces that balance comfort, functionality, and modern style.",
  "5. Natural Finishes and Textures",
  "Wood accents, stone surfaces, and earthy tones continue to dominate design choices.",
  "Luxury bathrooms are trending across Texas. Homeowners are opting for walk-in showers, freestanding tubs, and high-end finishes",
  "Recent years have shown how important planning and communication are during construction.",
  "Our approach has evolved to address these challenges:",
  "Construction Phase: Manage framing, systems installation, and finishing work",
  "Reliable Supplier Network: Work with trusted vendors to reduce delays",
  "Transparent Communication: Keep you informed about timelines and availability",
  "Flexible Planning: Adjust schedules when needed without compromising quality",
];

const remainingNeedles = [
  "Galley Layout: Ideal for smaller spaces, this layout maximizes efficiency with parallel counters and streamlined workflow.",
  "Quartz Countertops: Durable, low-maintenance surfaces with a modern appearance and consistent patterns.",
  "Shaker Cabinets: Clean lines that suit both modern and traditional kitchens.",
  "Flat-Panel Cabinets: Minimalist style perfect for contemporary designs.",
  "Soft-Close Features: Reduce wear and improve everyday functionality.",
  "Backsplash Installation: Adds visual interest and protects walls from moisture and spills.",
  "Flooring Options: Durable tile, hardwood, or luxury vinyl for long-term performance.",
  "Converting a traditional tub or outdated shower into a walk-in design is one of the most popular upgrades in Richmond, TX. It improves accessibility, modernizes your space, and increases home value.",
  "Wall Niches: Built-in storage for soaps and toiletries, keeping the space clean and organized.",
  "Rainfall Showerheads: Enhance relaxation and water coverage.",
  "Handheld Fixtures: Improve flexibility and convenience.",
  "Slip-Resistant Flooring: Increases safety without compromising style.",
  "Demolition and Prep: Remove old materials and prepare the space for installation.",
  "Installation: Install tile, glass, fixtures, and drainage systems with precision.",
  "Final Inspection: Ensure everything meets quality standards and functions properly.",
  "Our Conversion Process Includes:",
  "This process transforms your bathroom into a more open, accessible, and modern space.",
  "Deep Soaking Tubs: Designed for full-body immersion, offering a spa-like experience at home.",
  "Ergonomic Shapes: Built for comfort with contoured back support.",
  "Drop-In Tubs: Installed within a custom deck, allowing for added storage and design flexibility.",
  "Initial Consultation: Evaluate your space, plumbing, and goals for the remodel.",
  "Demolition: Remove the existing bathtub and prepare the space.",
  "Installation: Add tile, fixtures, glass, and finishing details with precision.",
  "Final Walkthrough: Confirm everything meets quality standards and functions properly.",
  "Here are just a few reasons families decide on garage conversions:",
  "Professional garage remodelers make sure the new space blends seamlessly with the rest of your home.",
  "Many homeowners searching for room addition contractors worry about mismatched styles or disruptive construction.",
  "Here's how to make your remodel a success:",
  "With these tips, you're ready to make informed decisions for your remodel. At NWS Custom Homes and Remodeling, we're passionate about sharing our expertise and supporting homeowners at every step.",
  "These tips will help you start your project with confidence. We love sharing our knowledge to help homeowners.",
  "We're here to refresh any space with designs that bring new life to your home.",
  "We're here to help you transform any room, giving your home a fresh look and feel.",
  "Homeowners choose NWS Custom Homes and Remodeling because we focus on consistency and accountability at every step.",
  "Here are some of the biggest benefits:",
  "Reach Out to Our Remodeling Experts",
];

test("bathroom corpus long-form units are in shipped service content", () => {
  const paras = corpusParagraphs("services--bathroom-remodeling.json");
  assert.ok(paras.some((p) => /spa-inspired look/i.test(p)));
  for (const needle of bathroomNeedles) assertContains("bathroom", needle);
});

test("custom-home-builder omitted headings and expanded copy are in shipped service content", () => {
  for (const needle of customNeedles) assertContains("custom-home-builder", needle);
});

test("remaining omitted kitchen/shower/tub/garage/additions/area wrap-up units are in shipped content", () => {
  for (const needle of remainingNeedles) assertContains("remaining", needle);
});

test("service and location renderers output all stored sections without display truncation", () => {
  assert.match(detailPage, /const introParagraphs = page\.intro/);
  assert.match(detailPage, /const sectionHighlights = page\.sections/);
  assert.match(detailPage, /overview\.map\(\(section\)/);
  assert.match(detailPage, /educational\.map\(\(section/);
  assert.match(detailPage, /section\.paragraphs\?\.map/);
  assert.match(detailPage, /section\.bullets\.map/);
  assert.match(detailPage, /section\.subBlocks\?\.map/);
  assert.doesNotMatch(detailPage, /sections\.slice\(/);
  assert.doesNotMatch(detailPage, /intro\.slice\(/);
  assert.doesNotMatch(detailPage, /paragraphs\.slice\(0,\s*[0-9]/);
  assert.doesNotMatch(detailPage, /bullets\.slice\(0,\s*[0-9]/);
  assert.doesNotMatch(detailPage, /subBlocks\.slice\(/);

  assert.match(locationPage, /const bodyContent = location\.body/);
  assert.match(locationPage, /const sectionsContent = location\.sections/);
  assert.match(locationPage, /bodyContent\.map/);
  assert.match(locationPage, /sectionsContent\?\.map/);
  assert.match(locationPage, /section\.paragraphs\?\.map/);
  assert.match(locationPage, /section\.bullets\.map/);
  assert.doesNotMatch(locationPage, /body\.slice\(0,\s*[0-9]/);
  assert.doesNotMatch(locationPage, /sections\.slice\(0,\s*[0-9]/);
  assert.doesNotMatch(locationPage, /paragraphs\.slice\(0,\s*[0-9]/);
  assert.doesNotMatch(locationPage, /bullets\.slice\(0,\s*[0-9]/);
  assert.doesNotMatch(locationPage, /services\.slice\(0,\s*[0-9]/);
});
