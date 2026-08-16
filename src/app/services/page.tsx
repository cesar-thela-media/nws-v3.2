import type { Metadata } from "next";
import { ServicesCarouselHero } from "@/components/ServicesCarouselHero";
import Portfolio08 from "@/components/shadcn-space/blocks/portfolio-08/portfolio";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import { foldedFor } from "@/data/mergeFoldedCopy";
import { servicesHubPortfolioItems } from "@/data/servicesHubPortfolio";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Learn more about our dependable remodeling company in Richmond, TX. We have over 35 years of combined experience. Call us at (281) 299-2309.",
};

/** Services hub: carousel-08 hero + portfolio-08 stack + homepage FAQ + cta-08 */
export default function ServicesPage() {
  const leftover = foldedFor("/services/")?.prose.join(" ") || "";
  return (
    <>
      <ServicesCarouselHero />
      <Portfolio08
        label="Services"
        heading="Our Quality Services"
        description={`Our wide range of services means we can build you a custom home from square one or remodel an existing one. We can help you find the right lot, plan out your dream home, or help you convert an existing structure into your dream home! ${leftover}`.trim()}
        items={servicesHubPortfolioItems()}
      />
      <Faq />
      <CTA />
    </>
  );
}
