"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MinusIcon, PlusIcon } from "lucide-react";
import type { ServicePage } from "@/data/servicePages";
import { Reveal } from "@/components/Reveal";

type Section = ServicePage["sections"][number];

function SectionBody({ section }: { section: Section }) {
  return (
    <>
      {section.paragraphs?.map((p) => (
        <p key={p.slice(0, 80)} className="text-base text-muted-foreground !m-0 leading-relaxed">
          {p}
        </p>
      ))}
      {section.bullets && (
        <ol className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 !m-0 pl-0 list-none">
          {section.bullets.map((b, index) => (
            <li
              key={b}
              className="rounded-xl border border-border bg-muted/40 px-5 py-4 text-sm text-foreground leading-relaxed"
            >
              <span className="block text-xs font-semibold text-primary mb-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              {b}
            </li>
          ))}
        </ol>
      )}
      {section.subBlocks?.length ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {section.subBlocks?.map((block) => (
            <div
              key={block.title}
              className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-7 flex flex-col gap-4"
            >
              <h4 className="text-lg font-semibold text-foreground !m-0">
                {block.title}
              </h4>
              <ul className="flex flex-col gap-3 !m-0 pl-0 list-none">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-muted-foreground leading-relaxed border-t border-border/70 pt-3 first:border-t-0 first:pt-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

function isDenseSection(section: Section) {
  if (section.expandable) return true;
  if (section.subBlocks && section.subBlocks.length > 0) return true;
  const paragraphCount = section.paragraphs?.length ?? 0;
  const bulletCount = section.bullets?.length ?? 0;
  if (paragraphCount >= 3) return true;
  if (paragraphCount >= 1 && bulletCount >= 4) return true;
  return false;
}

export function ServiceDetailSections({ sections }: { sections: Section[] }) {
  const overview = sections.filter((section) => !isDenseSection(section));
  const educational = sections.filter((section) => isDenseSection(section));
  return (
    <>
      {overview.length > 0 ? (
        <div className="mt-14 flex flex-col gap-8" data-service-overview>
          {overview.map((section) => {
            const isFeature = (section.paragraphs?.[0]?.length ?? 0) > 160;
            return isFeature ? (
              <article
                key={section.heading}
                className="rounded-2xl border border-border/60 bg-white p-8 sm:p-10 lg:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                data-service-body-feature
              >
                <Reveal as="h3" className="lg:col-span-4 text-xl sm:text-2xl font-bold text-foreground !m-0">
                  {section.heading}
                </Reveal>
                <div className="lg:col-span-8 flex flex-col gap-5">
                  <SectionBody section={section} />
                </div>
              </article>
            ) : (
              <article
                key={section.heading}
                className="rounded-2xl border border-border/60 bg-white p-8 sm:p-10 shadow-sm"
                data-service-body-card
              >
                <Reveal as="h3" className="text-lg font-bold text-foreground !m-0 mb-4">
                  {section.heading}
                </Reveal>
                <SectionBody section={section} />
              </article>
            );
          })}
        </div>
      ) : null}

      {educational.length > 0 ? (
        <div
          className="mt-12 sm:mt-14 rounded-2xl border border-border/60 bg-white p-8 sm:p-10 lg:p-12 shadow-sm"
          data-service-educational-accordion
        >
          <Reveal as="p" className="text-sm font-semibold text-primary !m-0 mb-8">
            More details
          </Reveal>
          <Accordion className="w-full" keepMounted defaultValue={["edu-0"]}>
            {educational.map((section, index) => (
              <AccordionItem
                key={section.heading}
                value={`edu-${index}`}
                className="border-b border-border last:border-b-0 py-6 first:pt-2 last:pb-2"
              >
                <AccordionTrigger
                  className="p-0 hover:no-underline cursor-pointer gap-4 items-start **:data-[slot=accordion-trigger-icon]:hidden"
                  data-service-expand-trigger={section.heading}
                >
                  <span className="shrink-0 mt-0.5 text-primary">
                    <PlusIcon className="size-5 group-aria-expanded/accordion-trigger:hidden" />
                    <MinusIcon className="size-5 hidden group-aria-expanded/accordion-trigger:inline" />
                  </span>
                  <span className="flex-1 text-left text-lg sm:text-xl font-semibold text-foreground">
                    {section.heading}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className="pt-5 pb-2 pl-0 sm:pl-9"
                  data-service-expand-panel={section.heading}
                >
                  <div className="flex flex-col gap-5">
                    <SectionBody section={section} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : null}
    </>
  );
}
