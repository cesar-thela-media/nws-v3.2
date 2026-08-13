"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { locations } from "@/data/locations";
import { RevealGroup, RevealItem } from "@/components/Reveal";

export interface CardItem {
  id: string;
  category: string;
  title: string;
  /** Short body under title (About-style orange panel) */
  description?: string;
  src: string;
  href: string;
}

/** Area cards for “Areas we serve”, real NWS photos + location pages */
const areaImages = [
  "/images/custom-homes-1.jpeg",
  "/images/hero-home-remodeled-richmond-tx.webp",
  "/images/kitchen-gallery-1.jpeg",
  "/images/custom-homes-3.jpeg",
  "/images/whole-home-remodeling-richmond-tx.jpg",
  "/images/bathroom-gallery-1.jpeg",
  "/images/remodeling-1.jpeg",
  "/images/home-addition-contractors.webp",
  "/images/custom-homes-2.jpeg",
];

export const areasServeCards: CardItem[] = locations.map((loc, i) => ({
  id: loc.slug,
  category: "Service area",
  title: loc.name.replace(/,?\s*TX$/i, ""),
  description: "Local custom homes and remodeling in Fort Bend.",
  src: areaImages[i % areaImages.length],
  href: loc.href === "#" ? "/areas-we-serve/" : loc.href,
}));

/** Original project-gallery cards (available if needed elsewhere) */
export const projectGalleryCards: CardItem[] = [
  {
    id: "1",
    category: "Custom homes",
    title: "Built for how you live in Fort Bend.",
    description: "New construction with lasting craftsmanship.",
    src: "/images/custom-homes-1.jpeg",
    href: "/custom-homes-gallery/",
  },
  {
    id: "2",
    category: "Kitchen",
    title: "Better flow, storage, and finishes.",
    description: "Kitchens planned around how you cook and gather.",
    src: "/images/kitchen-gallery-1.jpeg",
    href: "/kitchen-remodeling-gallery/",
  },
  {
    id: "3",
    category: "Bathroom",
    title: "Calmer baths with moisture-smart details.",
    description: "Showers, tubs, and full bath remodels.",
    src: "/images/bathroom-gallery-1.jpeg",
    href: "/bathroom-remodeling-gallery/",
  },
  {
    id: "4",
    category: "Whole home",
    title: "One plan for kitchens, baths, and rooms.",
    description: "Coordinated multi-room remodeling.",
    src: "/images/custom-homes-3.jpeg",
    href: "/remodeling-gallery/",
  },
  {
    id: "5",
    category: "Additions",
    title: "More space that feels original.",
    description: "Room and home additions that match the house.",
    src: "/images/home-addition-contractors.webp",
    href: "/services/room-additions-home-additions/",
  },
];

type AppleCardCarouselProps = {
  label?: string;
  heading?: string;
  description?: string;
  cards?: CardItem[];
  className?: string;
  /**
   * landscape = wide photo + orange text panel (services)
   * portrait = taller cards (legacy)
   */
  orientation?: "landscape" | "portrait";
};

const AppleCardCarousel = ({
  label = "Areas we serve",
  heading = "Richmond & nearby Fort Bend",
  description,
  cards = areasServeCards,
  className,
  orientation = "landscape",
}: AppleCardCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const landscape = orientation === "landscape";
  // Wide enough for natural landscape project photos
  const cardShell = landscape
    ? "w-[min(20rem,calc(100vw-2.5rem))] sm:w-[22rem] lg:w-[24rem]"
    : "w-[13rem] sm:w-[14.5rem] lg:w-[15.5rem]";

  return (
    <section
      className={className ?? "w-full py-10 sm:py-14 md:py-16 bg-background"}
      data-carousel-08
      data-carousel-orientation={orientation}
    >
      <RevealGroup className="px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto mb-8 sm:mb-10 flex flex-col items-center gap-2 text-center">
        <RevealItem as="p" className="text-sm sm:text-base font-semibold text-primary !m-0">
          {label}
        </RevealItem>
        <RevealItem
          as="h1"
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground !m-0 max-w-4xl"
        >
          {heading}
        </RevealItem>
        {description ? (
          <RevealItem
            as="p"
            className="text-base sm:text-lg text-muted-foreground max-w-2xl !m-0 mt-1"
          >
            {description}
          </RevealItem>
        ) : null}
      </RevealGroup>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 sm:-ml-6 px-4 sm:px-6 lg:px-8 xl:px-16">
          {cards.map((card) => (
            <CarouselItem key={card.id} className="pl-4 sm:pl-6 basis-auto">
              <a
                href={card.href}
                className={`group flex flex-col ${cardShell} rounded-xl overflow-hidden border border-primary/20 bg-primary shadow-sm transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
              >
                {/* Landscape photo band - natural horizontal crop */}
                <div
                  className={`relative w-full overflow-hidden shrink-0 ${
                    landscape
                      ? "aspect-[16/10] sm:aspect-[16/9]"
                      : "aspect-[3/4]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Soft fade image → orange text panel (About bento style) */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-b from-transparent via-primary/55 to-primary"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 backdrop-blur-[2px] bg-gradient-to-b from-transparent to-primary/40"
                    aria-hidden
                  />
                </div>

                {/* Orange text panel - About-style, centered */}
                <div className="relative z-[1] flex flex-1 flex-col items-center justify-center gap-1.5 bg-primary px-4 pb-5 pt-3 sm:px-5 sm:pb-6 min-h-[6.5rem] sm:min-h-[7.25rem] text-center">
                  {card.category ? (
                    <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-white/80 !m-0">
                      {card.category}
                    </p>
                  ) : null}
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white !m-0 leading-snug">
                    {card.title}
                  </h3>
                  {card.description ? (
                    <p className="text-sm leading-normal text-white/90 !m-0 line-clamp-2 max-w-[18rem]">
                      {card.description}
                    </p>
                  ) : null}
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-end gap-2 px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={!canScrollPrev}
          className="h-10 w-10 rounded-full bg-background shadow-xs"
          aria-label="Previous"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={!canScrollNext}
          className="h-10 w-10 rounded-full bg-background shadow-xs"
          aria-label="Next"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default AppleCardCarousel;
