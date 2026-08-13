import type { Metadata } from "next";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import { faqs as canonicalFaqs } from "@/data/faqs";
import { foldedFor } from "@/data/mergeFoldedCopy";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Elevate your home with our remodeling services. From custom home building to kitchen and bathroom remodels. Call (281) 299-2309.",
};

export default function FaqsPage() {
  const folded = foldedFor("/faqs/");
  const seen = new Set(canonicalFaqs.map((faq) => faq.question.toLowerCase()));
  const extras =
    folded?.faqs
      .filter((faq) => !seen.has(faq.q.toLowerCase()))
      .map((faq) => ({ question: faq.q, answer: faq.a })) || [];

  return (
    <>
      <h1 className="sr-only">FREQUENTLY ASKED QUESTIONS</h1>
      <Faq
        items={[
          ...canonicalFaqs.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
            links: faq.links,
          })),
          ...extras,
        ]}
      />
    </>
  );
}
