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

function shortDesc(text: string, max = 90) {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trim() + "…";
}

/** Services hub/detail hero: landscape carousel-08 cards (About-style orange text) */
export function ServicesCarouselHero({
  label = "Services",
  heading = "Services",
  description = "Our wide range of services means we can build you a custom home from square one or remodel an existing one.",
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
    description: shortDesc(s.front || s.back || ""),
    src: serviceImages[i % serviceImages.length],
    href: s.href,
  }));

  return (
    <AppleCardCarousel
      label={label}
      heading={heading}
      description={description}
      cards={cards || defaultCards}
      orientation="landscape"
      className="w-full pt-16 sm:pt-20 pb-10 sm:pb-14 md:pb-16 bg-background border-b border-border"
    />
  );
}
