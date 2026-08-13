import type { Metadata } from "next";
import { AreasGrid } from "@/components/AreasGrid";
import Hero12 from "@/components/shadcn-space/blocks/hero-12";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import { site } from "@/data/site";
import { foldedFor } from "@/data/mergeFoldedCopy";
import { RevealGroup, RevealItem } from "@/components/Reveal";

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
        <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 md:mb-16 items-stretch">
            <RevealGroup className="lg:col-span-7 flex flex-col justify-center gap-4">
              <RevealItem as="p" className="text-sm font-semibold text-primary !m-0">
                Areas We Serve
              </RevealItem>
              <RevealItem
                as="h2"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] !m-0 text-balance"
              >
                We build new homes specifically to fit your needs.
              </RevealItem>
              <RevealItem
                as="p"
                className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl !m-0"
              >
                We complete every project promptly, effectively, and with the utmost attention to detail.
              </RevealItem>
              {(foldedFor("/areas-we-serve/")?.prose || []).map((line) => (
                <RevealItem
                  key={line}
                  as="p"
                  className="text-base text-muted-foreground leading-relaxed !m-0"
                >
                  {line}
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="lg:col-span-5">
              <div className="h-full rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[var(--shadow-card)] flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-primary shrink-0" />
                  <p className="text-sm font-semibold text-primary !m-0">
                    Business Hours
                  </p>
                </div>
                <ul className="flex flex-col divide-y divide-border !m-0 pl-0 list-none">
                  <li className="flex items-baseline justify-between gap-4 py-3 first:pt-0">
                    <span className="text-sm text-muted-foreground">Weekdays</span>
                    <span className="text-base font-semibold text-foreground text-right">
                      Mon - Fri: 8:00 AM - 6:00 PM
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4 py-3">
                    <span className="text-sm text-muted-foreground">Saturday</span>
                    <span className="text-base font-semibold text-foreground text-right">
                      Sat: 8:00 AM - 12:00 PM
                    </span>
                  </li>
                  <li className="flex items-baseline justify-between gap-4 py-3 last:pb-0">
                    <span className="text-sm text-muted-foreground">Sunday</span>
                    <span className="text-base font-semibold text-foreground text-right">
                      Sun: Closed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <AreasGrid />
        </div>
      </section>

      <CTA />
    </>
  );
}
