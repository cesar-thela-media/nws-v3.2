import type { Metadata } from "next";
import { ServicesCarouselHero } from "@/components/ServicesCarouselHero";
import Services10 from "@/components/shadcn-space/blocks/services-10/services";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import { serviceCards } from "@/data/services";
import { foldedFor } from "@/data/mergeFoldedCopy";
import { getServiceHeroPhotos } from "@/data/serviceHeroPhotos";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Learn more about our dependable remodeling company in Richmond, TX. We have over 35 years of combined experience. Call us at (281) 299-2309.",
};

/** Services hub: carousel-08 hero + services grid + homepage FAQ + cta-08 */
export default function ServicesPage() {
  const leftover = foldedFor("/services/")?.prose.join(" ") || "";
  return (
    <>
      <ServicesCarouselHero />
      <div data-services-visual-grid>
        <Services10
        label="Services"
        heading="Our Quality Services"
        ctaText={`Our wide range of services means we can build you a custom home from square one or remodel an existing one. We can help you find the right lot, plan out your dream home, or help you convert an existing structure into your dream home! ${leftover}`.trim()}
        ctaLinkText="View All Our Services"
        services={serviceCards.map((service) => ({
          badge: service.title,
          title: service.title,
          description: [service.front, service.back, ...(service.features || [])]
            .filter(Boolean)
            .join(" "),
          image:
            getServiceHeroPhotos(service.slug).items[0]?.image ||
            service.icon,
          href: service.href,
        }))}
      />
      </div>
      <Faq />
      <CTA />
    </>
  );
}
