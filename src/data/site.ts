export const site = {
  name: "NWS Custom Homes and Remodeling",
  shortName: "NWS Homes",
  phone: {
    office: "(281) 299-2309",
    officeTel: "2812992309",
    mobile: "(713) 884-6571",
    mobileTel: "7138846571",
  },
  email: "info@nws-homes.com",
  location: "Richmond, TX",
  hours: {
    weekdays: "Mon - Fri: 8:00 AM - 6:00 PM",
    saturday: "Sat: 8:00 AM - 12:00 PM",
    sunday: "Sun: Closed",
  },
  promo:
    "Call us today and mention the website to receive a free consultation and 5% off your next project!",
  social: {
    facebook: "https://www.facebook.com/NWSHomes/",
    instagram: "https://www.instagram.com/nwshomes/?hl=en",
    houzz:
      "https://www.houzz.com/professionals/home-builders/nws-custom-homes-and-remodeling-pfvwus-pf~849721310",
  },
  /** Official brand mark (same asset as www.nws-homes.com) */
  logo: "/images/gbp.png",
  /** Transparent-background mark (color) for light surfaces */
  logoTransparent: "/images/nws-logo-transparent.png",
  /** Light roofs/tagline + copper NWS for dark hero / orange footer */
  logoOnDark: "/images/nws-logo-on-dark.png",
  mapSmall: "/images/nws-custom-homes-and-remodeling-small-map.webp",
  mapFull: "/images/nws-custom-homes-and-remodeling-full-map.webp",
  /**
   * Google Maps embed centered on Richmond / Fort Bend service area.
   * Keyless public embed (Share → Embed a map). Override via NEXT_PUBLIC_MAPS_EMBED_URL.
   */
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Richmond,+TX+Fort+Bend+County&z=10&output=embed",
  /**
   * Areas hero full-bleed photo - distinct from homepage hero
   * (`hero-home-remodeled-richmond-tx.webp`).
   */
  areasHeroBg: "/images/whole-home-remodeling-richmond-tx.jpg",
} as const;

export const serviceOptions = [
  "Custom Home Building",
  "Remodeling",
  "Kitchen Remodeling",
  "Bathroom Remodeling",
  "Whole Home Remodeling",
] as const;
