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

export type Hero08Props = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  images?: string[];
};

/**
 * Gallery hero-08: compact header + landscape auto-scroll cards
 * (same orange-panel concept as services carousel). Hover pauses marquee.
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
}: Hero08Props) {
  const cards = useMemo(() => {
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
      title: `${heading} ${i + 1}`,
      label: "NWS project",
    }));
  }, [images, heading]);

  const secondaryHref = secondaryCtaHref || `tel:${site.phone.officeTel}`;

  return (
    <section className="bg-background pt-20 sm:pt-22" data-hero-08>
      {/* Tighter header — less empty white above the marquee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col gap-4 max-w-2xl py-6 sm:py-8">
          <span className="w-fit px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-lg">
            {eyebrow}
          </span>
          <div className="flex flex-col gap-2.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight !m-0">
              {heading}
            </h1>
            <p className="text-base font-normal text-muted-foreground max-w-md !m-0">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              className="relative text-sm font-semibold rounded-[4px] h-12 p-1 ps-5 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-5 w-fit overflow-hidden cursor-pointer !text-white"
              render={<Link href={primaryCtaHref} />}
            >
              <span className="relative z-10 transition-all duration-500">
                {primaryCtaLabel}
              </span>
              <div className="absolute right-1 w-10 h-10 bg-white text-primary rounded-[4px] flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 rounded-[4px] text-foreground cursor-pointer"
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
          </div>
        </div>
      </div>

      {/* Landscape marquee cards — orange text panel like services carousel */}
      <div className="pb-6 sm:pb-8 w-full" data-hero-08-marquee>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            AutoScroll({
              speed: 1,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-3 sm:-ml-4 px-4 sm:px-6">
            {cards.map((card, index) => (
              <CarouselItem
                key={`${card.src}-${index}`}
                className="group pl-3 sm:pl-4 basis-auto flex-none"
              >
                <div className="flex flex-col w-[min(20rem,calc(100vw-2.5rem))] sm:w-[22rem] lg:w-[24rem] rounded-xl overflow-hidden border border-primary/20 bg-primary shadow-sm">
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.src}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent via-primary/55 to-primary"
                      aria-hidden
                    />
                  </div>
                  <div className="relative z-[1] flex flex-col items-center justify-center gap-1 bg-primary px-4 py-4 sm:px-5 sm:py-4 text-center min-h-[4.5rem]">
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-white/80 !m-0">
                      {card.label}
                    </p>
                    <p className="text-base sm:text-lg font-semibold tracking-tight text-white !m-0 leading-snug">
                      {card.title}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
