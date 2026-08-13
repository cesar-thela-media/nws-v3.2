import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero12 from "@/components/shadcn-space/blocks/hero-12";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import { site } from "@/data/site";
import type { Location } from "@/data/locations";

/**
 * Location family: hero-12 + shortened longform + sticky photo + local CTA (no map band).
 */
export function LocationPage({ location }: { location: Location }) {
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

  return (
    <>
      <Hero12
        badgeLead="Areas We Serve"
        badge={location.name}
        headline={location.h1}
        description={location.body?.[0] || location.formIntro || ""}
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
            <div className="lg:sticky lg:top-28 rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
              <Image
                src={heroSrc}
                alt={`Remodeling services in ${location.name}`}
                width={800}
                height={960}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full h-auto object-cover max-h-[28rem] lg:max-h-none"
              />
            </div>
          </div>

          <div className="lg:col-span-7 prose-nws order-2">
            <h2 className="text-[22px] md:text-[28px] text-foreground font-bold tracking-tight !mt-0">
              {location.h1}
            </h2>
            {bodyContent.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}

            {location.slug === "park-row-tx" ? (
              <h3 className="mt-10">Complete Renovation Solutions for Your Property</h3>
            ) : null}
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
                            {item.label}
                          </Link>
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
        className="relative py-14 md:py-16 overflow-hidden bg-[#0f1416] text-white"
        data-location-local-cta
      >
        <div
          className="absolute inset-0 bg-[color-mix(in_oklab,var(--primary)_12%,transparent)]"
          aria-hidden
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold text-sm !m-0 mb-2">
            Local presence
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white !m-0 mb-4">
            {location.formTitle || `Building in ${shortName}`}
          </h2>
          {location.formIntro ? (
            <p className="text-white/75 mb-8 !m-0">{location.formIntro}</p>
          ) : (
            <p className="text-white/75 mb-8 !m-0">
              Talk with our Richmond team about your next remodel or custom home
              in {shortName}.
            </p>
          )}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              className="rounded-[4px] h-11 !text-white"
              render={<a href={`tel:${site.phone.officeTel}`} />}
            >
              Call {site.phone.office}
            </Button>
            <Button
              variant="outline"
              className="rounded-[4px] h-11 !border-white/70 !bg-transparent !text-white hover:!bg-white/15 hover:!text-white shadow-none"
              render={<Link href="/contact/" />}
            >
              Request a consult
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
