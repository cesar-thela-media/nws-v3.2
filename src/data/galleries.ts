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
        alt: "Completed custom home exterior by NWS",
      },
      {
        src: "/images/custom-homes-2.jpeg",
        title: "Framing under blue sky",
        alt: "Custom home framing in progress",
      },
      {
        src: "/images/custom-homes-3.jpeg",
        title: "Open living interior",
        alt: "Custom home open living space",
      },
      {
        src: "/images/custom-homes-4.jpeg",
        title: "Street-facing elevation",
        alt: "Custom home front elevation",
      },
      {
        src: "/images/custom-homes-5.jpeg",
        title: "Site prep and foundation",
        alt: "Custom home site preparation",
      },
      {
        src: "/images/custom-homes-6.jpeg",
        title: "Roof and structure stage",
        alt: "Custom home structure and roofing",
      },
      {
        src: "/images/custom-homes-7.jpeg",
        title: "New build with NWS sign",
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
        title: "Whole-home remodel finish",
        alt: "Completed whole-home remodel",
      },
      {
        src: "/images/remodeling-2.jpeg",
        title: "Interior transformation",
        alt: "Interior remodeling project",
      },
      {
        src: "/images/remodeling-3.jpeg",
        title: "Updated living areas",
        alt: "Remodeled living area",
      },
      {
        src: "/images/remodeling-4.jpeg",
        title: "Bright open rooms",
        alt: "Open remodeled interior",
      },
      {
        src: "/images/remodeling-5.jpeg",
        title: "Detail craftsmanship",
        alt: "Remodeling finish details",
      },
      {
        src: "/images/remodeling-6.jpeg",
        title: "Multi-room refresh",
        alt: "Multi-room remodeling project",
      },
      {
        src: "/images/remodeling-7.jpeg",
        title: "Finished space ready to live",
        alt: "Finished remodeling space",
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
        title: "Family gathering kitchen",
        alt: "Family-sized kitchen remodel",
      },
      {
        src: "/images/kitchen-gallery-7.jpeg",
        title: "Quartz and pendant light",
        alt: "Kitchen remodel with quartz counters",
      },
      {
        src: "/images/kitchen-gallery-8.jpeg",
        title: "Two-tone cabinets",
        alt: "Kitchen remodel with two-tone cabinetry",
      },
      {
        src: "/images/kitchen-gallery-9.jpeg",
        title: "Classic white kitchen",
        alt: "Classic white kitchen remodel",
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
        title: "Spa vanity & tub",
        alt: "Bathroom remodel with vanity and freestanding tub",
      },
      {
        src: "/images/bathroom-gallery-2.jpeg",
        title: "Double vanity suite",
        alt: "Bathroom remodel with double vanity",
      },
      {
        src: "/images/bathroom-gallery-3.jpeg",
        title: "Soaking tub focus",
        alt: "Bathroom remodel featuring soaking tub",
      },
      {
        src: "/images/bathroom-gallery-4.jpeg",
        title: "Walk-in shower tile",
        alt: "Bathroom remodel with walk-in shower",
      },
      {
        src: "/images/bathroom-gallery-5.jpeg",
        title: "Glass shower enclosure",
        alt: "Bathroom remodel glass shower",
      },
      {
        src: "/images/bathroom-gallery-6.jpeg",
        title: "Modern wet zone",
        alt: "Modern bathroom wet zone remodel",
      },
      {
        src: "/images/bathroom-gallery-7.jpeg",
        title: "Guest bath refresh",
        alt: "Guest bathroom remodel",
      },
      {
        src: "/images/bathroom-gallery-8.jpeg",
        title: "Primary bath suite",
        alt: "Primary bathroom suite remodel",
      },
      {
        src: "/images/bathroom-gallery-9.jpeg",
        title: "Clean tile details",
        alt: "Bathroom remodel tile details",
      },
    ],
  },
];
