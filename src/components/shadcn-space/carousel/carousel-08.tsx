"use client";

import * as React from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { locations } from "@/data/locations";

export interface CardItem {
  id: string;
  category: string;
  title: string;
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
  title: loc.name,
  src: areaImages[i % areaImages.length],
  href: loc.href === "#" ? "/areas-we-serve/" : loc.href,
}));

/** Original project-gallery cards (available if needed elsewhere) */
export const projectGalleryCards: CardItem[] = [
  {
    id: "1",
    category: "Custom homes",
    title: "Built for how you live in Fort Bend.",
    src: "/images/custom-homes-1.jpeg",
    href: "/custom-homes-gallery/",
  },
  {
    id: "2",
    category: "Kitchen",
    title: "Better flow, storage, and finishes.",
    src: "/images/kitchen-gallery-1.jpeg",
    href: "/kitchen-remodeling-gallery/",
  },
  {
    id: "3",
    category: "Bathroom",
    title: "Calmer baths with moisture-smart details.",
    src: "/images/bathroom-gallery-1.jpeg",
    href: "/bathroom-remodeling-gallery/",
  },
  {
    id: "4",
    category: "Whole home",
    title: "One plan for kitchens, baths, and rooms.",
    src: "/images/custom-homes-3.jpeg",
    href: "/remodeling-gallery/",
  },
  {
    id: "5",
    category: "Additions",
    title: "More space that feels original.",
    src: "/images/home-addition-contractors.webp",
    href: "/services/room-additions-home-additions/",
  },
  {
    id: "6",
    category: "Kitchen",
    title: "The room you use most, reworked.",
    src: "/images/kitchen-gallery-3.jpeg",
    href: "/kitchen-remodeling-gallery/",
  },
  {
    id: "7",
    category: "Bathroom",
    title: "Showers, tubs, and full bath remodels.",
    src: "/images/bathroom-gallery-3.jpeg",
    href: "/bathroom-remodeling-gallery/",
  },
  {
    id: "8",
    category: "Remodeling",
    title: "Clear communication from start to finish.",
    src: "/images/remodeling-1.jpeg",
    href: "/remodeling-gallery/",
  },
];

type AppleCardCarouselProps = {
  label?: string;
  heading?: string;
  description?: string;
  cards?: CardItem[];
  className?: string;
  /** Smaller cards for services headers (default: compact) */
  compact?: boolean;
};

const AppleCardCarousel = ({
  label = "Areas we serve",
  heading = "Richmond & nearby Fort Bend",
  description,
  cards = areasServeCards,
  className,
  compact = true,
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

  const cardSize = compact
    ? "w-[13rem] h-[18rem] sm:w-[14.5rem] sm:h-[20rem] lg:w-[15.5rem] lg:h-[21.5rem]"
    : "w-[16.5rem] h-[24rem] sm:w-[18.5rem] sm:h-[27rem] lg:w-[20.5rem] lg:h-[30rem]";

  return (
    <section
      className={className ?? "w-full py-10 sm:py-14 md:py-16 bg-background"}
      data-carousel-08
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto mb-8 sm:mb-10 flex flex-col gap-2">
        <p className="text-sm sm:text-base font-semibold text-primary !m-0">
          {label}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground !m-0">
          {heading}
        </h1>
        {description ? (
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl !m-0 mt-1">
            {description}
          </p>
        ) : null}
      </div>

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
                className={`group relative block ${cardSize} rounded-2xl overflow-hidden border border-border shadow-sm transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
                  aria-hidden
                />

                <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                  <div className="flex flex-col gap-2 sm:gap-3 text-white">
                    <p className="text-xs sm:text-sm font-medium text-white/90 uppercase tracking-wide !m-0">
                      {card.category}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold tracking-tight leading-snug text-white !m-0">
                      {card.title}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-foreground shadow-md">
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </div>
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
