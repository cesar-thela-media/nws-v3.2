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
        badgeLead="Areas We Serve"
        badge="Richmond, TX"
        headline="Areas We Serve"
        description="We complete every project promptly, effectively, and with the utmost attention to detail."
        backgroundImageSrc={
          process.env.NEXT_PUBLIC_AREAS_HERO_BG || site.areasHeroBg
        }
        imageAlt="NWS service area - Richmond and Fort Bend County, TX"
        mapEmbedSrc={
          process.env.NEXT_PUBLIC_MAPS_EMBED_URL || site.mapsEmbedUrl
        }
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
            <p className="text-muted-foreground">
              We build new homes specifically to fit your needs.
            </p>
            <p className="text-muted-foreground">
              We complete every project promptly, effectively, and with the utmost attention to detail.
            </p>
            <div className="mt-6 text-sm text-muted-foreground space-y-1">
              <p className="font-semibold text-foreground !m-0">Business Hours</p>
              <p className="!m-0">Mon - Fri: 8:00 AM - 6:00 PM</p>
              <p className="!m-0">Sat: 8:00 AM - 12:00 PM</p>
              <p className="!m-0">Sun: Closed</p>
            </div>
          </div>
          <AreasGrid />
        </div>
      </section>

      <CTA />
    </>
  );
}
