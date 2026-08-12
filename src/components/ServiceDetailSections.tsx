"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ServicePage } from "@/data/servicePages";

type Section = ServicePage["sections"][number];

function SectionBody({ section }: { section: Section }) {
  return (
    <>
      {section.paragraphs?.map((p) => (
        <p key={p.slice(0, 80)} className="text-sm text-muted-foreground !m-0">
          {p}
        </p>
      ))}
      {section.bullets && (
        <ul className="mt-3 space-y-1.5 list-disc pl-5 text-sm text-muted-foreground">
          {section.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      )}
      {section.subBlocks?.map((block) => (
        <div key={block.title} className="mt-4">
          <h4 className="text-base font-semibold text-foreground !m-0 mb-2">
            {block.title}
          </h4>
          <ul className="space-y-1.5 list-disc pl-5 text-sm text-muted-foreground">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export function ServiceDetailSections({ sections }: { sections: Section[] }) {
  const overview = sections.filter((section) => !section.expandable);
  const educational = sections.filter((section) => section.expandable);

  return (
    <>
      {overview.length > 0 ? (
        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5"
          data-service-overview
        >
          {overview.map((section) => (
            <article
              key={section.heading}
              className="rounded-2xl border border-border/60 bg-white p-5 sm:p-6 shadow-sm"
              data-service-body-card
            >
              <h3 className="text-lg font-bold text-foreground !m-0 mb-2">
                {section.heading}
              </h3>
              <SectionBody section={section} />
            </article>
          ))}
        </div>
      ) : null}

      {educational.length > 0 ? (
        <div
          className="mt-8 rounded-2xl border border-border/60 bg-white p-5 sm:p-6 shadow-sm"
          data-service-educational-accordion
        >
          <p className="text-sm font-semibold text-foreground !m-0 mb-3">
            More details
          </p>
          <Accordion className="w-full" keepMounted>
            {educational.map((section, index) => (
              <AccordionItem key={section.heading} value={`edu-${index}`}>
                <AccordionTrigger
                  className="text-base font-semibold text-foreground hover:no-underline cursor-pointer"
                  data-service-expand-trigger={section.heading}
                >
                  {section.heading}
                </AccordionTrigger>
                <AccordionContent data-service-expand-panel={section.heading}>
                  <SectionBody section={section} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : null}
    </>
  );
}
