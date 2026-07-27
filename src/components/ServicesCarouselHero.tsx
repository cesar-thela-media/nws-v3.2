"use client";

import AppleCardCarousel, {
  type CardItem,
} from "@/components/shadcn-space/carousel/carousel-08";
import { serviceCards } from "@/data/services";

const serviceImages = [
  "/images/custom-home-richmond-tx.jpg",
  "/images/home-remodeling-richmond-tx.jpg",
  "/images/kitchen-remodeling-richmond-tx.jpg",
  "/images/bathroom-remodeling-richmond-tx.jpg",
  "/images/whole-home-remodeling-richmond-tx.jpg",
  "/images/bathroom-gallery-1.jpeg",
  "/images/14-kitchen-after.jpg",
  "/images/home-addition-contractors.webp",
  "/images/Basement-Finishing.webp",
  "/images/garage-remodel.webp",
  "/images/open-concept.webp",
];

/** Services hub hero: carousel-08 with compact NWS service cards */
export function ServicesCarouselHero({
  label = "Our services",
  heading = "Custom homes & remodeling",
  description = "From kitchens and baths to whole-home work and new builds across Fort Bend County.",
  cards,
}: {
  label?: string;
  heading?: string;
  description?: string;
  cards?: CardItem[];
}) {
  const defaultCards: CardItem[] = serviceCards.map((s, i) => ({
    id: s.slug,
    category: "Service",
    title: s.title,
    src: serviceImages[i % serviceImages.length],
    href: s.href,
  }));

  return (
    <AppleCardCarousel
      label={label}
      heading={heading}
      description={description}
      cards={cards || defaultCards}
      compact
      className="w-full pt-28 sm:pt-32 pb-10 sm:pb-14 md:pb-16 bg-background border-b border-border"
    />
  );
}
