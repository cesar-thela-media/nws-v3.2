import { faqs as canonicalFaqs } from "./faqs";

/** Data for Shadcn Space blocks, from the approved v3.2 content model. */

export const nwsServices10 = [
  {
    badge: "Build",
    title: "Custom Home Building",
    description:
      "From first plan to final walkthrough, built for how you live in Fort Bend County.",
    image: "/images/custom-home-richmond-tx.jpg",
    href: "/services/custom-home-builder/",
  },
  {
    badge: "Kitchen",
    title: "Kitchen Remodeling",
    description:
      "Better flow, storage, and finishes for the room you use most.",
    image: "/images/kitchen-remodeling-richmond-tx.jpg",
    href: "/services/kitchen-remodeling/",
  },
  {
    badge: "Bath",
    title: "Bathroom Remodeling",
    description:
      "A calmer, more durable bath with moisture-smart details for Texas homes.",
    image: "/images/bathroom-remodeling-richmond-tx.jpg",
    href: "/services/bathroom-remodeling/",
  },
  {
    badge: "Whole home",
    title: "Whole Home Remodeling",
    description:
      "Coordinate kitchens, baths, floors, and rooms under one clear plan.",
    image: "/images/whole-home-remodeling-richmond-tx.jpg",
    href: "/services/home-remodel/",
  },
  {
    badge: "Expand",
    title: "Room & Home Additions",
    description:
      "More space that looks like it was always part of the house.",
    image: "/images/home-addition-contractors.webp",
    href: "/services/room-additions-home-additions/",
  },
];

/** Re-export real Google/Angi reviews (see src/data/reviews.ts) */
export { nwsTestimonials } from "./reviews";

export const nwsFaqs = canonicalFaqs.map((faq) => ({
  question: faq.question,
  answer: faq.answer,
}));
