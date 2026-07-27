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
 * Gallery hero-08: education-style auto-scrolling cards.
 * AutoScroll moves continuously; stopOnMouseEnter pauses on hover.
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
    <section className="bg-background pt-24 sm:pt-28" data-hero-08>
      <div className="max-w-7xl mx-auto sm:px-16 px-4">
        <div className="flex flex-col gap-6 max-w-2xl py-10 sm:py-12">
          <span className="w-fit px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-lg">
            {eyebrow}
          </span>
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight !m-0">
              {heading}
            </h1>
            <p className="text-base font-normal text-muted-foreground max-w-md !m-0">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
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

      <div className="py-5 w-full" data-hero-08-marquee>
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
          <CarouselContent className="-ml-4 sm:-ml-6">
            {cards.map((card, index) => (
              <CarouselItem
                key={`${card.src}-${index}`}
                className="group pl-4 sm:pl-6 basis-auto flex-none"
              >
                <div className="relative block w-[min(22rem,calc(100vw-3rem))] aspect-[368/420] rounded-3xl overflow-hidden border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.title}
                    className="rounded-3xl w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-5">
                    <p className="text-white font-semibold !m-0">{card.title}</p>
                    <span className="text-white/70 text-sm">{card.label}</span>
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
