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
 * Gallery hero-08: compact header + landscape marquee cards.
 * Image-led cards (thin title strip); hover pauses auto-scroll.
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
    <section className="bg-background pt-16 sm:pt-18" data-hero-08>
      {/* Compact header — minimal empty space under nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-3 max-w-2xl py-4 sm:py-5">
          <span className="w-fit px-3 py-0.5 text-sm font-medium text-primary bg-primary/10 rounded-lg">
            {eyebrow}
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight !m-0">
              {heading}
            </h1>
            <p className="text-sm sm:text-base font-normal text-muted-foreground max-w-md !m-0">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="relative text-sm font-semibold rounded-[4px] h-11 p-1 ps-5 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-5 w-fit overflow-hidden cursor-pointer !text-white"
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
              className="h-11 px-5 rounded-[4px] text-foreground cursor-pointer"
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

      {/* Image-led landscape cards — thin caption bar, more photo */}
      <div className="pb-5 sm:pb-6 w-full" data-hero-08-marquee>
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
                <div className="relative w-[min(18rem,calc(100vw-2.5rem))] sm:w-[20rem] lg:w-[22rem] aspect-[16/10] rounded-xl overflow-hidden border border-border shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Soft bottom scrim — keeps type readable without a tall orange block */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/35 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 px-3.5 py-3 text-center">
                    <p className="text-sm sm:text-base font-semibold tracking-tight text-white !m-0 leading-snug drop-shadow-sm line-clamp-2">
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
