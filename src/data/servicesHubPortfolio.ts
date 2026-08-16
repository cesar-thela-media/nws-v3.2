import { serviceCards, type ServiceCard } from "./services";
import { getServiceHeroPhotos } from "./serviceHeroPhotos";

export type ServicesHubPortfolioItem = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  image: string;
  href: string;
  ctaLabel: string;
};

/** Thin pass over the shipped catalog + photo lookup used by /services/. */
export function serviceCardToPortfolioItem(
  service: ServiceCard,
): ServicesHubPortfolioItem {
  return {
    id: service.slug,
    title: service.title,
    description:
      service.front ||
      [service.back, ...(service.features || [])].filter(Boolean).join(" "),
    tags: service.features?.slice(0, 3),
    image:
      getServiceHeroPhotos(service.slug).items[0]?.image || service.icon,
    href: service.href,
    ctaLabel: service.ctaLabel || "Learn more",
  };
}

export function servicesHubPortfolioItems(
  cards: ServiceCard[] = serviceCards,
): ServicesHubPortfolioItem[] {
  return cards.map(serviceCardToPortfolioItem);
}
