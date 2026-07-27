import type { Metadata } from "next";
import { ServicesCarouselHero } from "@/components/ServicesCarouselHero";
import Services10 from "@/components/shadcn-space/blocks/services-10/services";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Learn more about our dependable remodeling company in Richmond, TX. We have over 35 years of combined experience. Call us at (281) 299-2309.",
};

/** Services hub: carousel-08 hero + services grid + homepage FAQ + cta-08 */
export default function ServicesPage() {
  return (
    <>
      <ServicesCarouselHero />
      <div data-services-visual-grid>
        <Services10 />
      </div>
      <Faq showHelpBand={false} />
      <CTA />
    </>
  );
}
