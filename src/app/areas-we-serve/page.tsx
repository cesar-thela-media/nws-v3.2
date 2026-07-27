import type { Metadata } from "next";
import { AreasGrid } from "@/components/AreasGrid";
import Hero12 from "@/components/shadcn-space/blocks/hero-12";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "Find a dependable remodeling company in Richmond, TX. We have over 35 years of combined experience. Call (281) 299-2309 to start your project.",
};

/**
 * Areas hub: hero-12 + image community cards + homepage cta-08.
 * No jump chips, logo marquee, or trusted strip.
 */
export default function AreasWeServePage() {
  return (
    <>
      <Hero12
        badgeLead="Areas"
        badge="Fort Bend & west Houston"
        headline="Areas we serve"
        description="Local builds and remodels across Richmond and nearby communities, prompt, careful, and built to last."
        imageSrc={site.mapFull}
        imageAlt="NWS service map across Fort Bend County"
        primaryCtaLabel={`Call ${site.phone.office}`}
        primaryCtaHref={`tel:${site.phone.officeTel}`}
        secondaryCtaLabel="View communities"
        secondaryCtaHref="#communities"
      />

      <section
        id="communities"
        className="py-16 md:py-20 bg-background"
        data-areas-communities
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <h2 className="section-title text-foreground">
              Communities we know well
            </h2>
            <p className="text-muted-foreground">
              Local remodeling and custom builds where Fort Bend families live.
            </p>
          </div>
          <AreasGrid />
        </div>
      </section>

      <CTA />
    </>
  );
}
