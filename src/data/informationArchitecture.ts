/**
 * Canonical v3.2 information architecture and shared business facts.
 *
 * This registry intentionally contains routing/identity data only. Page copy
 * remains in the page-specific data modules so the v3.1 visual components do
 * not need to change in this normalization stage.
 */

export const canonicalSiteFacts = {
  name: "NWS Custom Homes and Remodeling",
  location: "Richmond, TX",
  officePhone: "(281) 299-2309",
  officeTel: "2812992309",
  mobilePhone: "(713) 884-6571",
  mobileTel: "7138846571",
  email: "info@nws-homes.com",
  weekdayHours: "Mon - Fri: 8:00 AM - 6:00 PM",
  saturdayHours: "Sat: 8:00 AM - 12:00 PM",
  sundayHours: "Sun: Closed",
  offer:
    "Call us today and mention the website to receive a free consultation and 5% off your next project!",
  sinceYear: 2007,
  experienceClaim: "35+ years of combined experience",
} as const;

export const canonicalSocialLinks = {
  facebook: "https://www.facebook.com/NWSHomes/",
  instagram: "https://www.instagram.com/nwshomes/?hl=en",
  youtube: "https://www.youtube.com/channel/UCeJ8l_IhyNplw76bt0yk4NA",
  houzz:
    "https://www.houzz.com/professionals/home-builders/nws-custom-homes-and-remodeling-pfvwus-pf~849721310",
  googleMaps: "https://goo.gl/maps/Rb8ped27vjAPYisV9",
  googleReview: "https://g.page/r/CRyZ8e5jvBiVEBM/review",
} as const;

export const canonicalServiceCatalog = [
  { slug: "custom-home-builder", label: "Custom Home Building", href: "/services/custom-home-builder/" },
  { slug: "remodeling-company", label: "Remodeling", href: "/services/remodeling-company/" },
  { slug: "kitchen-remodeling", label: "Kitchen Remodeling", href: "/services/kitchen-remodeling/" },
  { slug: "bathroom-remodeling", label: "Bathroom Remodeling", href: "/services/bathroom-remodeling/" },
  { slug: "home-remodel", label: "Whole Home Remodeling", href: "/services/home-remodel/" },
  { slug: "bathroom-shower-remodel", label: "Shower Remodel", href: "/services/bathroom-shower-remodel/" },
  { slug: "bathtub-remodeling", label: "Bathtub Remodel", href: "/services/bathtub-remodeling/" },
  { slug: "room-additions-home-additions", label: "Room Additions & Home Additions", href: "/services/room-additions-home-additions/" },
  { slug: "basement-remodeling-finishing", label: "Basement Remodeling / Finishing", href: "/services/basement-remodeling-finishing/" },
  { slug: "garage-remodel-contractors", label: "Garage Conversions & Remodeling", href: "/services/garage-remodel-contractors/" },
  { slug: "open-concept-remodeling", label: "Living Room & Open Concept Remodeling", href: "/services/open-concept-remodeling/" },
] as const;

export const canonicalServiceAreaCatalog = [
  { slug: "richmond-tx", label: "Richmond, TX", href: null },
  { slug: "sugar-land-tx", label: "Sugar Land, TX", href: "/sugar-land-tx/" },
  { slug: "katy-tx", label: "Katy, TX", href: "/katy-tx/" },
  { slug: "fulshear-tx", label: "Fulshear, TX", href: "/fulshear-tx/" },
  { slug: "west-side-of-houston-tx", label: "West Side of Houston, TX", href: "/west-side-of-houston-tx/" },
  { slug: "cinco-ranch-tx", label: "Cinco Ranch, TX", href: "/cinco-ranch-tx/" },
  { slug: "rosenberg-tx", label: "Rosenberg, TX", href: "/rosenberg-tx/" },
  { slug: "weston-lakes-tx", label: "Weston Lakes, TX", href: "/weston-lakes-tx/" },
  { slug: "park-row-tx", label: "Park Row, TX", href: "/park-row-tx/" },
] as const;

export const linkedServiceAreas = canonicalServiceAreaCatalog.filter(
  (area): area is (typeof canonicalServiceAreaCatalog)[number] & { href: string } =>
    Boolean(area.href),
);

export const metadataRules = {
  siteUrl: "https://www.nws-homes.com",
  titleTemplate: "%s | NWS Custom Homes and Remodeling",
  defaultTitle: "Custom Homes & Remodeling Richmond, TX | NWS Custom Homes and Remodeling",
  defaultDescription:
    "Reliable residential remodeling services in Richmond, TX. 35+ years of experience delivering quality home renovations. Call (281) 299-2309.",
  canonicalPath(pathname: string) {
    const normalized = pathname === "/" ? "/" : `/${pathname.replace(/^\/+|\/+$/g, "")}/`;
    return `${this.siteUrl}${normalized}`;
  },
} as const;

export const canonicalRoutes = [
  "/",
  "/contact/",
  "/areas-we-serve/",
  "/custom-homes-gallery/",
  "/remodeling-gallery/",
  "/about/",
  "/kitchen-remodeling-gallery/",
  "/faqs/",
  "/west-side-of-houston-tx/",
  "/services/",
  "/bathroom-remodeling-gallery/",
  "/katy-tx/",
  "/fulshear-tx/",
  "/cinco-ranch-tx/",
  "/rosenberg-tx/",
  "/weston-lakes-tx/",
  "/sugar-land-tx/",
  "/park-row-tx/",
  ...canonicalServiceCatalog.map((service) => service.href),
] as const;
