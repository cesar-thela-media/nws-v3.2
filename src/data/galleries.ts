export type GalleryPhoto = {
  src: string;
  /** Descriptive label based on what the photo shows (not "Kitchen 1") */
  title: string;
  alt?: string;
};

export type Gallery = {
  slug: string;
  title: string;
  heading: string;
  description: string;
  photos: GalleryPhoto[];
};

/** @deprecated prefer gallery.photos - kept for any callers that only need paths */
export function galleryImagePaths(gallery: Gallery): string[] {
  return gallery.photos.map((p) => p.src);
}

export const galleries: Gallery[] = [
  {
    slug: "custom-homes-gallery",
    title: "Custom Homes Gallery",
    heading: "Custom Homes",
    description:
      "We’re dedicated to building the homes you’ve always dreamed of, and we want to make sure that every step of the process is as smooth and stress-free as possible.",
    photos: [
      {
        src: "/images/custom-homes-1.jpeg",
        title: "Finished custom exterior",
        alt: "Completed two-story custom home exterior by NWS",
      },
      {
        src: "/images/custom-homes-2.jpeg",
        title: "Framing under blue sky",
        alt: "Custom home framing in progress",
      },
      {
        src: "/images/1-Addition-after.jpeg",
        title: "Open living interior",
        alt: "Open living and dining interior opening to the pool",
      },
      {
        src: "/images/custom-homes-4.jpeg",
        title: "Street-facing elevation",
        alt: "Custom home front elevation with garage",
      },
      {
        src: "/images/kitchen-gallery-3.jpeg",
        title: "Kitchen open to living",
        alt: "Custom home kitchen opening to the living room",
      },
      {
        src: "/images/custom-homes-6.jpeg",
        title: "Finished porch elevation",
        alt: "Finished custom home with wraparound porch",
      },
      {
        src: "/images/custom-homes-7.jpeg",
        title: "New build in progress",
        alt: "Custom home construction with NWS yard sign",
      },
      {
        src: "/images/custom-homes-8.jpeg",
        title: "Sheathing and windows",
        alt: "Custom home exterior sheathing and windows",
      },
      {
        src: "/images/custom-homes-9.jpeg",
        title: "House wrap and gables",
        alt: "Custom home house wrap and roof gables",
      },
    ],
  },
  {
    slug: "remodeling-gallery",
    title: "Remodeling Gallery",
    heading: "Remodeling Gallery",
    description:
      "We are proud of our record of success and the relationships we’ve built with our clients over time, and we’re excited about what’s in store for us as we continue to grow!",
    photos: [
      {
        src: "/images/remodeling-1.jpeg",
        title: "Pool and outdoor pavilion",
        alt: "Pool remodel with outdoor living pavilion",
      },
      {
        src: "/images/remodeling-2.jpeg",
        title: "Covered outdoor kitchen",
        alt: "Covered outdoor kitchen with stone bar",
      },
      {
        src: "/images/remodeling-3.jpeg",
        title: "Outdoor kitchen pavilion",
        alt: "Outdoor kitchen pavilion with grill and stone",
      },
      {
        src: "/images/remodeling-4.jpeg",
        title: "Stone fireplace wall",
        alt: "Outdoor living wall with fireplace and TVs",
      },
      {
        src: "/images/remodeling-5.jpeg",
        title: "Built-in grill station",
        alt: "Built-in outdoor grill and refrigeration",
      },
      {
        src: "/images/1-Patio-After.jpeg",
        title: "Covered patio addition",
        alt: "Covered timber patio addition at the back of the home",
      },
      {
        src: "/images/remodeling-7.jpeg",
        title: "Patio seating by the pool",
        alt: "Covered patio seating next to the pool",
      },
    ],
  },
  {
    slug: "kitchen-remodeling-gallery",
    title: "Kitchen Remodeling Gallery",
    heading: "Kitchen Remodeling Gallery",
    description:
      "We are proud of our record of success and the relationships we’ve built with our clients over time, and we’re excited about what’s in store for us as we continue to grow!",
    photos: [
      {
        src: "/images/kitchen-gallery-1.jpeg",
        title: "Island with seating",
        alt: "Kitchen remodel with large island and bar seating",
      },
      {
        src: "/images/kitchen-gallery-2.jpeg",
        title: "White cabinetry & storage",
        alt: "Kitchen remodel with white cabinetry",
      },
      {
        src: "/images/kitchen-gallery-3.jpeg",
        title: "Open concept with beams",
        alt: "Open kitchen remodel with wood beams",
      },
      {
        src: "/images/kitchen-gallery-4.jpeg",
        title: "Dark island & range hood",
        alt: "Kitchen remodel with dark island and hood",
      },
      {
        src: "/images/kitchen-gallery-5.jpeg",
        title: "Bright work triangle",
        alt: "Bright kitchen remodel layout",
      },
      {
        src: "/images/kitchen-gallery-6.jpeg",
        title: "Built-in refrigeration",
        alt: "Kitchen remodel with built-in refrigeration",
      },
      {
        src: "/images/kitchen-gallery-7.jpeg",
        title: "Quartz and pendant light",
        alt: "Kitchen remodel with quartz counters",
      },
      {
        src: "/images/kitchen-gallery-8.jpeg",
        title: "Pro range and hood",
        alt: "Kitchen remodel with professional range and hood",
      },
      {
        src: "/images/kitchen-gallery-9.jpeg",
        title: "Wood kitchen with stone",
        alt: "Wood kitchen remodel with stone details",
      },
    ],
  },
  {
    slug: "bathroom-remodeling-gallery",
    title: "Bathroom Remodeling Gallery",
    heading: "Bathroom Remodeling Gallery",
    description:
      "We are proud of our record of success and the relationships we’ve built with our clients over time, and we’re excited about what’s in store for us as we continue to grow!",
    photos: [
      {
        src: "/images/bathroom-gallery-1.jpeg",
        title: "Vanity and glass shower",
        alt: "Bathroom remodel with vanity and glass shower",
      },
      {
        src: "/images/bathroom-gallery-2.jpeg",
        title: "Walk-in shower and vanity",
        alt: "Bathroom remodel with walk-in shower and vanity",
      },
      {
        src: "/images/bathroom-gallery-3.jpeg",
        title: "Vanity, tub, and shower",
        alt: "Bathroom remodel with vanity, soaking tub, and shower",
      },
      {
        src: "/images/bathroom-gallery-4.jpeg",
        title: "Soaking tub and walk-in shower",
        alt: "Bathroom remodel with freestanding tub and tiled shower",
      },
      {
        src: "/images/bathroom-gallery-5.jpeg",
        title: "Glass shower enclosure",
        alt: "Bathroom remodel glass shower",
      },
      {
        src: "/images/bathroom-gallery-6.jpeg",
        title: "Glass shower with subway tile",
        alt: "Bathroom remodel glass shower with subway tile",
      },
      {
        src: "/images/bathroom-gallery-7.jpeg",
        title: "Vanity with soaking tub",
        alt: "Bathroom remodel with vanity and freestanding tub",
      },
      {
        src: "/images/bathroom-gallery-8.jpeg",
        title: "Vanity dressing area",
        alt: "Bathroom remodel vanity dressing area",
      },
      {
        src: "/images/bathroom-gallery-9.jpeg",
        title: "Vanity opening to the tub",
        alt: "Bathroom remodel vanity with soaking tub beyond",
      },
    ],
  },
];
