/**
 * Per-slug project photos for service detail heroes (gallery-03).
 * Images are context-matched so kitchen pages show kitchens, not generic exteriors.
 */

export type ServiceHeroPhotoSet = {
  items: {
    title: string;
    description: string;
    image: string;
    alt: string;
  }[];
};

const bySlug: Record<string, ServiceHeroPhotoSet> = {
  "custom-home-builder": {
    items: [
      {
        title: "Custom exteriors",
        description: "New builds designed around your lot and lifestyle.",
        image: "/images/custom-homes-1.jpeg",
        alt: "Custom home exterior by NWS",
      },
      {
        title: "Living spaces",
        description: "Open plans with lasting finishes.",
        image: "/images/1-Addition-after.jpeg",
        alt: "Custom home living area",
      },
      {
        title: "Kitchens that work",
        description: "Layouts planned with the whole home.",
        image: "/images/kitchen-gallery-1.jpeg",
        alt: "Custom home kitchen",
      },
      {
        title: "Craft in every detail",
        description: "From curb appeal to final walkthrough.",
        image: "/images/custom-home-richmond-tx.jpg",
        alt: "Custom home project Richmond TX",
      },
    ],
  },
  "remodeling-company": {
    items: [
      {
        title: "Whole-home remodels",
        description: "Coordinated updates under one team.",
        image: "/images/remodeling-1.jpeg",
        alt: "Home remodeling project",
      },
      {
        title: "Covered outdoor kitchen",
        description: "Clear phases from demo to punch list.",
        image: "/images/remodeling-2.jpeg",
        alt: "Covered outdoor kitchen remodel",
      },
      {
        title: "Outdoor kitchen pavilion",
        description: "Rooms that feel new without a full rebuild.",
        image: "/images/remodeling-3.jpeg",
        alt: "Outdoor kitchen pavilion",
      },
      {
        title: "Exterior upgrades",
        description: "Curb appeal that matches the interior work.",
        image: "/images/home-remodeling-richmond-tx.jpg",
        alt: "Exterior remodeling Richmond TX",
      },
    ],
  },
  "kitchen-remodeling": {
    items: [
      {
        title: "Kitchen islands",
        description: "Prep space, seating, and flow for Fort Bend homes.",
        image: "/images/kitchen-gallery-1.jpeg",
        alt: "Kitchen remodel island",
      },
      {
        title: "Cabinetry & storage",
        description: "Custom layouts that cut the clutter.",
        image: "/images/kitchen-gallery-2.jpeg",
        alt: "Kitchen cabinetry remodel",
      },
      {
        title: "Finishes that last",
        description: "Counters, tile, and lighting chosen to work hard.",
        image: "/images/kitchen-gallery-3.jpeg",
        alt: "Kitchen finishes remodel",
      },
      {
        title: "Full kitchen remodel",
        description: "From plan to first meal in the new space.",
        image: "/images/kitchen-remodeling-richmond-tx.jpg",
        alt: "Kitchen remodeling Richmond TX",
      },
    ],
  },
  "bathroom-remodeling": {
    items: [
      {
        title: "Spa-ready baths",
        description: "Calm layouts with moisture-smart details.",
        image: "/images/bathroom-gallery-1.jpeg",
        alt: "Bathroom remodel",
      },
      {
        title: "Vanities & storage",
        description: "Daily routine, better organized.",
        image: "/images/bathroom-gallery-2.jpeg",
        alt: "Bathroom vanity remodel",
      },
      {
        title: "Tile & wet zones",
        description: "Built for Texas humidity and real use.",
        image: "/images/bathroom-gallery-3.jpeg",
        alt: "Bathroom tile remodel",
      },
      {
        title: "Full bath remodel",
        description: "Primary and guest baths done right.",
        image: "/images/bathroom-remodeling-richmond-tx.jpg",
        alt: "Bathroom remodeling Richmond TX",
      },
    ],
  },
  "home-remodel": {
    items: [
      {
        title: "Whole-home plan",
        description: "Kitchens, baths, and living areas in one scope.",
        image: "/images/whole-home-remodeling-richmond-tx.jpg",
        alt: "Whole home remodeling",
      },
      {
        title: "Living room refresh",
        description: "Open, brighter gathering spaces.",
        image: "/images/remodeling-4.jpeg",
        alt: "Living space remodel",
      },
      {
        title: "Kitchen core",
        description: "The heart of a multi-room remodel.",
        image: "/images/kitchen-gallery-4.jpeg",
        alt: "Kitchen in whole home remodel",
      },
      {
        title: "Bath suite",
        description: "Coordinated finishes across the house.",
        image: "/images/bathroom-gallery-4.jpeg",
        alt: "Bath in whole home remodel",
      },
    ],
  },
  "bathroom-shower-remodel": {
    items: [
      {
        title: "Walk-in showers",
        description: "Clean lines and easy maintenance.",
        image: "/images/bathroom-gallery-5.jpeg",
        alt: "Walk-in shower remodel",
      },
      {
        title: "Shower glass & tile",
        description: "Moisture-smart details that look sharp.",
        image: "/images/bathroom-gallery-6.jpeg",
        alt: "Shower tile remodel",
      },
      {
        title: "Primary bath shower",
        description: "A calmer start and end to the day.",
        image: "/images/bathroom-gallery-1.jpeg",
        alt: "Primary shower remodel",
      },
      {
        title: "Shower remodel craft",
        description: "From demo to waterproof finish.",
        image: "/images/bathroom-remodeling-richmond-tx.jpg",
        alt: "Shower remodeling project",
      },
    ],
  },
  "bathtub-remodeling": {
    items: [
      {
        title: "Soaking tubs",
        description: "Comfort-focused bath upgrades.",
        image: "/images/bathroom-gallery-3.jpeg",
        alt: "Bathtub remodel",
      },
      {
        title: "Tub surround refresh",
        description: "Tile and fixtures that feel new.",
        image: "/images/bathroom-gallery-7.jpeg",
        alt: "Tub surround remodel",
      },
      {
        title: "Bath suite",
        description: "Tub, vanity, and lighting as one plan.",
        image: "/images/bathroom-gallery-2.jpeg",
        alt: "Bathroom suite remodel",
      },
      {
        title: "Tub remodeling",
        description: "Safe installs with a clean finish.",
        image: "/images/bathroom-gallery-8.jpeg",
        alt: "Bathtub remodeling work",
      },
    ],
  },
  "room-additions-home-additions": {
    items: [
      {
        title: "Room additions",
        description: "More space that matches the original home.",
        image: "/images/home-addition-contractors.webp",
        alt: "Room addition project",
      },
      {
        title: "Expanded living",
        description: "Seamless flow into new square footage.",
        image: "/images/custom-homes-2.jpeg",
        alt: "Home addition living space",
      },
      {
        title: "Exterior match",
        description: "Additions that look original from the curb.",
        image: "/images/custom-homes-4.jpeg",
        alt: "Home addition exterior",
      },
      {
        title: "Addition craft",
        description: "Structure, finishes, and final walkthrough.",
        image: "/images/remodeling-5.jpeg",
        alt: "Home addition interior",
      },
    ],
  },
  "basement-remodeling-finishing": {
    items: [
      {
        title: "Finished basements",
        description: "Useful living space below grade.",
        image: "/images/Basement-Finishing.webp",
        alt: "Basement finishing",
      },
      {
        title: "Lower-level living",
        description: "Media, guest, or flex rooms done right.",
        image: "/images/remodeling-6.jpeg",
        alt: "Basement living remodel",
      },
      {
        title: "Moisture-smart finish",
        description: "Details that protect the investment.",
        image: "/images/remodeling-2.jpeg",
        alt: "Basement remodel details",
      },
      {
        title: "Basement refresh",
        description: "From storage to finished rooms.",
        image: "/images/whole-home-remodeling-richmond-tx.jpg",
        alt: "Basement remodeling project",
      },
    ],
  },
  "garage-remodel-contractors": {
    items: [
      {
        title: "Garage remodels",
        description: "Workshop, storage, or living conversion.",
        image: "/images/garage-remodel.webp",
        alt: "Garage remodel",
      },
      {
        title: "Organized workspace",
        description: "Floors, lighting, and storage that work.",
        image: "/images/remodeling-7.jpeg",
        alt: "Garage workspace remodel",
      },
      {
        title: "Garage interiors",
        description: "Cleaner, brighter, more useful.",
        image: "/images/remodeling-1.jpeg",
        alt: "Garage interior remodel",
      },
      {
        title: "Conversion ready",
        description: "From parking bay to finished room.",
        image: "/images/home-addition-contractors.webp",
        alt: "Garage conversion project",
      },
    ],
  },
  "open-concept-remodeling": {
    items: [
      {
        title: "Open concept living",
        description: "Kitchen, dining, and living as one space.",
        image: "/images/open-concept.webp",
        alt: "Open concept remodel",
      },
      {
        title: "Kitchen connection",
        description: "Islands and sightlines that open the home.",
        image: "/images/kitchen-gallery-5.jpeg",
        alt: "Open kitchen remodel",
      },
      {
        title: "Brighter rooms",
        description: "Light that travels after walls come down.",
        image: "/images/kitchen-gallery-6.jpeg",
        alt: "Open concept light and space",
      },
      {
        title: "Family flow",
        description: "Layouts built for how you gather.",
        image: "/images/14-kitchen-after.jpg",
        alt: "Open concept family kitchen",
      },
    ],
  },
};

const fallback: ServiceHeroPhotoSet = {
  items: [
    {
      title: "Project craft",
      description: "Custom homes and remodels across Fort Bend.",
      image: "/images/custom-homes-1.jpeg",
      alt: "NWS project photo",
    },
    {
      title: "Kitchens",
      description: "Flow, storage, and durable finishes.",
      image: "/images/kitchen-gallery-1.jpeg",
      alt: "Kitchen project",
    },
    {
      title: "Baths",
      description: "Moisture-smart remodels.",
      image: "/images/bathroom-gallery-1.jpeg",
      alt: "Bathroom project",
    },
    {
      title: "Whole home",
      description: "One plan, one accountable team.",
      image: "/images/remodeling-1.jpeg",
      alt: "Remodeling project",
    },
  ],
};

export function getServiceHeroPhotos(slug: string): ServiceHeroPhotoSet {
  return bySlug[slug] || fallback;
}
