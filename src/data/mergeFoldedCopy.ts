import { foldedPageCopy } from "./foldedPageCopy";
import type { ServicePage } from "./servicePages";
import type { Location } from "./locations";
import { canonicalServiceCatalog } from "./informationArchitecture";

function splitLabeled(text: string) {
  const match = text.match(/^(.{3,72}?)\s*:\s+([\s\S]+)$/);
  if (!match || match[1].includes(". ") || match[1].split(" ").length > 8) {
    return null;
  }
  return { title: match[1].replace(/\s+/g, " ").trim(), body: match[2].trim() };
}

export function mergeServiceFolded(page: ServicePage): ServicePage {
  const folded = foldedPageCopy[`/services/${page.slug}/`];
  if (!folded) return page;

  const seenFaq = new Set((page.faqs || []).map((faq) => faq.q.toLowerCase()));
  const extraFaqs = folded.faqs.filter((faq) => !seenFaq.has(faq.q.toLowerCase()));
  const faqAnswers = new Set(
    [...(page.faqs || []), ...extraFaqs].map((faq) => faq.a.toLowerCase()),
  );

  const items = [...folded.items];
  const prose: string[] = [];
  for (const paragraph of folded.prose) {
    if (faqAnswers.has(paragraph.toLowerCase())) continue;
    if (
      extraFaqs.some(
        (faq) =>
          paragraph.toLowerCase().startsWith(faq.q.toLowerCase()) ||
          paragraph.toLowerCase().includes(faq.a.toLowerCase()),
      )
    ) {
      continue;
    }
    const labeled = splitLabeled(paragraph);
    if (labeled) items.push(labeled);
    else prose.push(paragraph);
  }

  const sections: ServicePage["sections"] = page.sections.map((section) => ({
    ...section,
    paragraphs: section.paragraphs ? [...section.paragraphs] : section.paragraphs,
    subBlocks: section.subBlocks
      ? section.subBlocks.map((block) => ({ ...block, items: [...block.items] }))
      : section.subBlocks,
  }));
  const existingText = [
    ...page.intro,
    ...sections.flatMap((section) => section.paragraphs || []),
  ].map((text) => text.toLowerCase());

  const uniqueProse = prose.filter(
    (paragraph) =>
      !existingText.some(
        (text) =>
          text.includes(paragraph.toLowerCase().slice(0, 80)) ||
          paragraph.toLowerCase().includes(text.slice(0, 80)),
      ),
  );

  const target =
    sections.find((section) => section.expandable) || sections[sections.length - 1];
  if (target && uniqueProse.length > 0) {
    target.expandable = true;
    target.paragraphs = [...(target.paragraphs || []), ...uniqueProse];
  } else if (uniqueProse.length > 0) {
    sections.push({
      heading: page.h1,
      expandable: true,
      paragraphs: uniqueProse,
    });
  }

  if (items.length > 0) {
    const itemHost =
      sections.find((section) => section.subBlocks?.length) ||
      sections.find((section) => section.expandable) ||
      sections[sections.length - 1];
    const blocks = items.map((item) => ({
      title: item.title,
      items: [item.body],
    }));
    if (itemHost) {
      itemHost.expandable = true;
      itemHost.subBlocks = [...(itemHost.subBlocks || []), ...blocks];
    } else {
      sections.push({
        heading: page.breadcrumb,
        expandable: true,
        subBlocks: blocks,
      });
    }
  }

  return {
    ...page,
    sections,
    faqs: [...(page.faqs || []), ...extraFaqs],
  };
}

export function mergeLocationFolded(location: Location): Location {
  const path = location.href === "#" ? "/areas-we-serve/" : location.href;
  const folded = foldedPageCopy[path];
  if (!folded) return location;

  const sections = (location.sections || []).map((section) => ({
    ...section,
    paragraphs: section.paragraphs ? [...section.paragraphs] : section.paragraphs,
    services: section.services ? [...section.services] : section.services,
    bullets: section.bullets ? [...section.bullets] : section.bullets,
  }));

  const existing = [
    ...location.body,
    ...sections.flatMap((section) => section.paragraphs || []),
  ].map((text) => text.toLowerCase());

  const uniqueProse = folded.prose.filter(
    (paragraph) =>
      !existing.some(
        (text) =>
          text.includes(paragraph.toLowerCase().slice(0, 80)) ||
          paragraph.toLowerCase().includes(text.slice(0, 80)),
      ),
  );

  const serviceHost =
    sections.find((section) => section.services?.length) || sections[0];
  if (serviceHost && uniqueProse.length > 0) {
    serviceHost.paragraphs = [...(serviceHost.paragraphs || []), ...uniqueProse];
  }

  for (const item of folded.items) {
    const title = item.title.replace(/\s+/g, " ").replace(/\s*:$/, "").trim();
    const catalog = canonicalServiceCatalog.find(
      (service) =>
        service.label.toLowerCase() === title.toLowerCase() ||
        title.toLowerCase().includes(service.label.toLowerCase()) ||
        service.label.toLowerCase().includes(title.toLowerCase()),
    );
    if (!serviceHost) continue;
    const already = serviceHost.services?.some(
      (service) => service.label.toLowerCase() === title.toLowerCase(),
    );
    if (already) {
      serviceHost.services = serviceHost.services?.map((service) =>
        service.label.toLowerCase() === title.toLowerCase()
          ? {
              ...service,
              detail: service.detail || item.body,
              sourceLine: service.sourceLine || `${title} : ${item.body}`,
            }
          : service,
      );
      continue;
    }
    serviceHost.services = [
      ...(serviceHost.services || []),
      {
        label: title,
        detail: item.body,
        href: catalog?.href || "/services/",
        sourceLine: `${title} : ${item.body}`,
      },
    ];
  }

  return {
    ...location,
    sections,
  };
}

export function foldedFor(path: string) {
  return foldedPageCopy[path];
}
