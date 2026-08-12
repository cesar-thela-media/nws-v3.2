import type { Metadata } from "next";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Elevate your home with our remodeling services. From custom home building to kitchen and bathroom remodels. Call (281) 299-2309.",
};

export default function FaqsPage() {
  return (
    <>
      <h1 className="sr-only">FREQUENTLY ASKED QUESTIONS</h1>
      <Faq />
    </>
  );
}
