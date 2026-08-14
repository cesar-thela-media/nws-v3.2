"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { useMemo } from "react";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export type Hero08Card = {
  src: string;
  title: string;
  label?: string;
};

export type Hero08Props = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  images?: string[];
  /** Prefer descriptive cards over numbered titles from images alone */
  cards?: Hero08Card[];
};

/**
 * Gallery hero-08: landscape marquee first, then title + CTAs.
 */
export default function HeroSection({
  eyebrow = "Project gallery",
  heading = "Custom Homes",
  description = "See the craftsmanship behind NWS builds and remodels across Fort Bend.",
  primaryCtaLabel = "Start a project",
  primaryCtaHref = "/contact/",
  secondaryCtaLabel = "Call us",
  secondaryCtaHref,
  images = [],
  cards: cardsProp,
}: Hero08Props) {
  const cards = useMemo(() => {
    if (cardsProp && cardsProp.length > 0) {
      return cardsProp.map((c, i) => ({
        id: i,
        src: c.src,
        title: c.title,
        label: c.label || "NWS project",
      }));
    }
    const srcs =
      images.length > 0
        ? images
        : [
            "/images/custom-homes-1.jpeg",
            "/images/custom-homes-2.jpeg",
            "/images/custom-homes-3.jpeg",
            "/images/custom-homes-4.jpeg",
            "/images/custom-homes-5.jpeg",
            "/images/custom-homes-6.jpeg",
          ];
    return srcs.map((src, i) => ({
      id: i,
      src,
      title: heading,
      label: "NWS project",
    }));
  }, [cardsProp, images, heading]);

  const secondaryHref = secondaryCtaHref || `tel:${site.phone.officeTel}`;

  return (
    <section
      className="bg-background pt-2 sm:pt-3 w-full max-w-full overflow-x-clip"
      data-hero-08
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full min-w-0">
        <div className="flex flex-col items-center text-center gap-2 max-w-3xl mx-auto pt-2 pb-5 sm:pb-6 w-full min-w-0">
          <span className="w-fit max-w-full px-3 py-0.5 text-sm font-medium text-primary bg-primary/10 rounded-lg">
            {eyebrow}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight !m-0 text-balance max-w-full">
            {heading}
          </h1>
        </div>
      </div>

      <div
        className="relative pt-0 pb-8 sm:pb-10 w-full overflow-hidden"
        data-hero-08-marquee
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1.1,
              playOnInit: true,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {cards.map((card, index) => (
              <CarouselItem
                key={`${card.src}-${index}`}
                className="group pl-3 sm:pl-4 basis-auto flex-none"
              >
                <div className="relative w-[min(28rem,calc(100vw-2rem))] sm:w-[34rem] md:w-[40rem] lg:w-[46rem] xl:w-[52rem] aspect-[16/10] rounded-xl overflow-hidden border border-border shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 px-4 py-3.5 text-center">
                    <p className="text-base sm:text-lg font-semibold tracking-tight text-white !m-0 leading-snug drop-shadow-sm line-clamp-2">
                      {card.title}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full min-w-0">
        <RevealGroup className="flex flex-col items-center text-center gap-5 sm:gap-6 max-w-3xl mx-auto pt-6 sm:pt-8 pb-14 sm:pb-16 w-full min-w-0">
          <RevealItem
            as="p"
            className="text-sm sm:text-base font-normal text-muted-foreground max-w-2xl !m-0 text-pretty"
          >
            {description}
          </RevealItem>
          <RevealItem className="flex flex-col min-[400px]:flex-row flex-wrap items-stretch min-[400px]:items-center justify-center gap-3 pt-2 w-full min-w-0">
            <Button
              className="relative text-sm font-semibold rounded-[4px] h-11 p-1 ps-5 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-5 w-full min-[400px]:w-fit max-w-full overflow-hidden cursor-pointer !text-white shrink min-w-0"
              render={<Link href={primaryCtaHref} />}
            >
              <span className="relative z-10 transition-all duration-500">
                {primaryCtaLabel}
              </span>
              <div className="absolute right-1 w-9 h-9 bg-white text-primary rounded-[4px] flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-40px)] group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-11 px-5 rounded-[4px] text-foreground cursor-pointer w-full min-[400px]:w-auto"
              render={
                secondaryHref.startsWith("tel:") ? (
                  <a href={secondaryHref} />
                ) : (
                  <Link href={secondaryHref} />
                )
              }
            >
              {secondaryCtaLabel}
            </Button>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
