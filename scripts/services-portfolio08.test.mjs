import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { register } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

register(
  `data:text/javascript,${encodeURIComponent(`
    export async function resolve(specifier, context, nextResolve) {
      try {
        return await nextResolve(specifier, context);
      } catch (err) {
        if (err?.code === "ERR_MODULE_NOT_FOUND" && specifier.startsWith(".") && !/\\.[a-zA-Z0-9]+$/.test(specifier)) {
          return nextResolve(specifier + ".ts", context);
        }
        throw err;
      }
    }
  `)}`,
  import.meta.url,
);

async function loadShipped() {
  const helperUrl = pathToFileURL(
    path.join(root, "src/data/servicesHubPortfolio.ts"),
  ).href;
  const catalogUrl = pathToFileURL(path.join(root, "src/data/services.ts")).href;
  const [{ servicesHubPortfolioItems }, { serviceCards }] = await Promise.all([
    import(helperUrl),
    import(catalogUrl),
  ]);
  return { servicesHubPortfolioItems, serviceCards };
}

function publicImagePath(image) {
  assert.equal(typeof image, "string");
  assert.match(image, /^\/images\//);
  return path.join(root, "public", image.replace(/^\//, ""));
}

test("hub composition mounts portfolio-08, not the services-10 accordion", () => {
  const hub = fs.readFileSync(path.join(root, "src/app/services/page.tsx"), "utf8");
  const block = fs.readFileSync(
    path.join(root, "src/components/shadcn-space/blocks/portfolio-08/portfolio.tsx"),
    "utf8",
  );
  assert.match(hub, /from "@\/components\/shadcn-space\/blocks\/portfolio-08\/portfolio"/);
  assert.match(hub, /<Portfolio08/);
  assert.match(hub, /heading="Our Quality Services"/);
  assert.match(hub, /items=\{servicesHubPortfolioItems\(\)\}/);
  assert.doesNotMatch(hub, /Services10|services-10|AccordionTrigger/);
  assert.match(block, /sticky/);
  assert.match(block, /project\.href/);
  assert.doesNotMatch(block, /AccordionTrigger/);
});

test("servicesHubPortfolioItems is one complete card per shipped catalog service", async () => {
  const { servicesHubPortfolioItems, serviceCards } = await loadShipped();
  const items = servicesHubPortfolioItems();

  assert.ok(Array.isArray(serviceCards) && serviceCards.length > 0);
  assert.equal(items.length, serviceCards.length);

  const seenIds = new Set();
  for (const service of serviceCards) {
    const item = items.find((entry) => entry.id === service.slug);
    assert.ok(item, `missing stacked card for catalog slug ${service.slug}`);
    assert.equal(item.title, service.title);
    assert.ok(String(item.title).trim(), `empty title for ${service.slug}`);

    assert.ok(
      String(item.description).trim(),
      `empty description for ${service.slug}`,
    );
    const catalogCopy = [service.front, service.back, ...(service.features || [])]
      .filter(Boolean)
      .join(" ");
    assert.ok(
      catalogCopy.includes(item.description) || item.description.includes(service.front) || item.description.includes(service.back),
      `description for ${service.slug} is not drawn from existing service copy`,
    );

    assert.equal(item.href, service.href);
    assert.match(item.href, new RegExp(`^/services/${service.slug}/$`));

    const imageFile = publicImagePath(item.image);
    assert.ok(fs.existsSync(imageFile), `missing photo file ${item.image}`);
    assert.ok(!/unsplash|placeholder|dummy|lorempixel/i.test(item.image));

    assert.ok(String(item.ctaLabel).trim());
    assert.equal(seenIds.has(item.id), false, `duplicate card id ${item.id}`);
    seenIds.add(item.id);
  }
});
