"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import { nwsFaqs } from "@/data/nws-blocks";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqProps = {
  items?: FaqItem[];
  heading?: string;
  description?: string;
};

/**
 * FAQ accordion only (no secondary help-card under the Q&A list).
 * Closing CTA lives in cta-08 / contact elsewhere on the page.
 */
export default function Faq({
  items,
  heading = "Common questions",
  description = "Straight answers about services, areas, timelines, and how we work.",
}: FaqProps) {
  const faqs =
    items && items.length > 0
      ? items
      : nwsFaqs.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <section className="bg-muted" data-faq-07>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-20 py-10 lg:py-24 flex flex-col gap-8">
        <div className="flex flex-col gap-4 items-center text-center lg:px-16">
          <Badge
            variant="outline"
            className="h-auto py-1 px-3 border-0 bg-background outline outline-border w-fit flex items-center gap-1.5"
          >
            <span className="size-2 rounded-full bg-primary shrink-0" />
            FAQs
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
            {heading}
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-lg">
            {description}
          </p>
        </div>

        <div className="bg-background border border-border rounded-3xl p-5 lg:p-8">
          <Accordion defaultValue={["item-0"]} className="w-full flex flex-col">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`item-${index}`}
                value={`item-${index}`}
                className={cn(
                  "py-6 lg:py-8 flex flex-col gap-4 group/item transition-colors border-b border-border last:border-b-0 first:pt-0 last:pb-0",
                )}
              >
                <AccordionTrigger className="p-0 hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden cursor-pointer gap-6 items-start">
                  <span className="shrink-0 mt-0.5">
                    <PlusIcon className="w-6 h-6 group-aria-expanded/accordion-trigger:hidden" />
                    <MinusIcon className="w-6 h-6 hidden group-aria-expanded/accordion-trigger:inline" />
                  </span>
                  <span className="flex-1 text-xl font-semibold text-foreground text-left">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="p-0 pl-12 text-muted-foreground text-lg">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
