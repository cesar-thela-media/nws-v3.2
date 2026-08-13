import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero12 from "@/components/shadcn-space/blocks/hero-12";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import { site } from "@/data/site";
import type { Location } from "@/data/locations";
import { mergeLocationFolded } from "@/data/mergeFoldedCopy";
import { LocationStickyGallery } from "@/components/LocationStickyGallery";
import { photosForLocation } from "@/data/locationPhotos";
import { FullBleedBackground } from "@/components/FullBleedBackground";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

/**
 * Location family: hero-12 + shortened longform + sticky photo + local CTA (no map band).
 */
export function LocationPage({ location: incoming }: { location: Location }) {
  const location = mergeLocationFolded(incoming);
  const ctaHref =
    location.ctaHref ||
    (location.ctaLabel?.toLowerCase().includes("call") ||
    location.ctaLabel?.toLowerCase().includes("speak") ||
    location.ctaLabel?.toLowerCase().includes("start your project")
      ? `tel:${site.phone.officeTel}`
      : "/contact/");

  const heroSrc =
    location.heroImage ||
    "/images/hero-custom-home-remodeling-paralax-image.jpg";

  const shortName = location.name.replace(/,?\s*TX$/i, "").trim();
  const bodyContent = location.body;
  const sectionsContent = location.sections;
  const heroLead =
    bodyContent.find((paragraph) => paragraph.length > 80) ||
    location.formIntro ||
    "";
  const heroDescription =
    heroLead.match(/^[^.!?]+[.!?]/)?.[0]?.trim() || heroLead;

  return (
    <>
      <Hero12
        badgeLead="Areas We Serve"
        badge={location.name}
        headline={location.h1}
        description={heroDescription}
        imageSrc={heroSrc}
        imageAlt={location.heroImageAlt || `NWS remodeling project serving ${location.name}`}
        primaryCtaLabel={location.ctaLabel || "Get in touch"}
        primaryCtaHref={ctaHref}
        secondaryCtaLabel="View services"
        secondaryCtaHref="/services/"
      />

      <section className="py-12 md:py-20 bg-background" data-location-longform>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5 order-1">
            <LocationStickyGallery
              images={photosForLocation(heroSrc)}
              alt={`Remodeling services in ${location.name}`}
            />
          </div>

          <div className="lg:col-span-7 prose-nws order-2">
            <Reveal as="h2" className="text-[22px] md:text-[28px] text-foreground font-bold tracking-tight !mt-0">
              {location.h1}
            </Reveal>
            {bodyContent.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}

            {sectionsContent?.map((section) => (
              <div key={section.heading} className="mt-10">
                <h3>{section.heading}</h3>
                {section.paragraphs?.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {section.services && (
                  <ul className="mt-4 space-y-3 list-none pl-0">
                    {section.services.map((item) => (
                      <li
                        key={item.href + item.label}
                        className="flex gap-3 rounded-xl border border-border bg-muted/30 p-3"
                      >
                        <span className="text-primary font-bold shrink-0">
                          →
                        </span>
                        <span>
                          <Link
                            href={item.href}
                            className="text-primary font-semibold hover:underline"
                          >
                            {item.label.trim()}
                          </Link>
                          {item.sourceLine ? (
                            <span className="sr-only">{item.sourceLine}</span>
                          ) : null}
                          {item.detail ? <>: {item.detail}</> : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.bullets && (
                  <ul className="mt-4">
                    {section.bullets.map((b) => (
                      <li key={b.slice(0, 40)}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-24 sm:py-28 md:py-32 lg:py-40 overflow-hidden bg-[#0f1416] text-white"
        data-location-local-cta
      >
        <FullBleedBackground
          src={heroSrc}
          overlayClassName="bg-[#0f1416]/55"
        />
        <div
          className="absolute inset-0 z-[1] bg-[color-mix(in_oklab,var(--primary)_18%,transparent)]"
          aria-hidden
        />
        <RevealGroup className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center flex flex-col items-center gap-6 sm:gap-8">
          <RevealItem
            as="p"
            className="text-primary font-semibold text-sm tracking-[0.14em] uppercase !m-0"
          >
            Local presence
          </RevealItem>
          <RevealItem
            as="h2"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white !m-0 text-balance leading-[1.15]"
          >
            {location.formTitle || `Building in ${shortName}`}
          </RevealItem>
          {location.formIntro ? (
            <RevealItem
              as="p"
              className="text-base sm:text-lg md:text-xl text-white/75 leading-[1.8] max-w-3xl !m-0"
            >
              {location.formIntro}
            </RevealItem>
          ) : (
            <RevealItem
              as="p"
              className="text-base sm:text-lg md:text-xl text-white/75 leading-[1.8] max-w-3xl !m-0"
            >
              Talk with our Richmond team about your next remodel or custom home
              in {shortName}.
            </RevealItem>
          )}
          <RevealItem className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              className="rounded-[4px] h-12 px-6 !text-white"
              render={<a href={`tel:${site.phone.officeTel}`} />}
            >
              Call {site.phone.office}
            </Button>
            <Button
              variant="outline"
              className="rounded-[4px] h-12 px-6 !border-white/70 !bg-transparent !text-white hover:!bg-white/15 hover:!text-white shadow-none"
              render={<Link href="/contact/" />}
            >
              Request a consult
            </Button>
          </RevealItem>
        </RevealGroup>
      </section>

      <CTA />
    </>
  );
}
