import {
  canonicalSiteFacts,
  canonicalSocialLinks,
  metadataRules,
} from "./informationArchitecture";

export const site = {
  name: canonicalSiteFacts.name,
  shortName: "NWS Homes",
  phone: {
    office: canonicalSiteFacts.officePhone,
    officeTel: canonicalSiteFacts.officeTel,
    mobile: canonicalSiteFacts.mobilePhone,
    mobileTel: canonicalSiteFacts.mobileTel,
  },
  email: canonicalSiteFacts.email,
  location: canonicalSiteFacts.location,
  hours: {
    weekdays: canonicalSiteFacts.weekdayHours,
    saturday: canonicalSiteFacts.saturdayHours,
    sunday: canonicalSiteFacts.sundayHours,
  },
  promo: canonicalSiteFacts.offer,
  claims: {
    sinceYear: canonicalSiteFacts.sinceYear,
    experience: canonicalSiteFacts.experienceClaim,
  },
  headerBadge: "We build new homes specifically to fit your needs.",
  social: canonicalSocialLinks,
  metadata: metadataRules,
  /** Official brand mark (same asset as www.nws-homes.com) */
  logo: "/images/gbp.png",
  /** Transparent-background mark (color) for light surfaces */
  logoTransparent: "/images/nws-logo-transparent.png",
  /** Light roofs/tagline + copper NWS for dark hero / orange footer */
  logoOnDark: "/images/nws-logo-on-dark.png",
  mapSmall: "/images/nws-custom-homes-and-remodeling-small-map.webp",
  mapFull: "/images/nws-custom-homes-and-remodeling-full-map.webp",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Richmond,+TX+Fort+Bend+County&z=10&output=embed",
  areasHeroBg: "/images/whole-home-remodeling-richmond-tx.jpg",
} as const;

export const serviceOptions = [
  "Custom Home Building",
  "Remodeling",
  "Kitchen Remodeling",
  "Bathroom Remodeling",
  "Whole Home Remodeling",
] as const;
