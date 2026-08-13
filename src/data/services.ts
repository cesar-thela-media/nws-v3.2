import { canonicalServiceCatalog } from "./informationArchitecture";

export type ServiceCard = {
  slug: string;
  title: string;
  front: string;
  back: string;
  icon: string;
  href: string;
  features?: string[];
  ctaLabel?: string;
};

export const serviceCards: ServiceCard[] = [
  {
    slug: "custom-home-builder",
    title: "Custom Home Building",
    front:
      "Our team will work with you from start to finish to ensure that your home is what you want, with all the features and finishes that matter to you most.",
    back: "We specialize in custom construction and have decades of experience building homes that fit your needs. Whether you want a large home with plenty of space for entertaining or a smaller home that's easy to maintain, we do it right.",
    icon: "/images/flipcard-service-1.svg",
    href: "/services/custom-home-builder/",
  },
  {
    slug: "remodeling-company",
    title: "Remodeling",
    front:
      "We're here to help you turn your home into the place you've always dreamed of. Whether you want a kitchen to remodel, a bathroom makeover, or an addition to your home, we can do it all.",
    back: "We have the skills and the knowledge of what it takes to make your home look the best. We'll handle all the details from start to finish, so you can sit back and relax as we do all the work for you!",
    icon: "/images/flipcard-service-2.svg",
    href: "/services/remodeling-company/",
  },
  {
    slug: "kitchen-remodeling",
    title: "Kitchen Remodeling",
    front:
      "Kitchen remodeling is a great way to breathe new life into your home. We've got the expertise and experience you need to pull it off. We'll work with you every step of the way to create the kitchen of your dreams, no matter what that looks like.",
    back: "Our team will help you choose the right materials for your space and budget, as well as offer tips for making sure everything works together seamlessly. We work hard at keeping our costs fair while still providing high-quality service.",
    icon: "/images/flipcard-service-3.svg",
    href: "/services/kitchen-remodeling/",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathroom Remodeling",
    front:
      "Are you ready to take your bathroom to the next level? We've got everything you need to turn that tired, outdated space into a gorgeous, relaxing oasis, and we can do it all with minimal disruption to your busy life.",
    back: "We can help you add the perfect finishing touches to your bathroom remodel that will make it feel like home and help make your remodel experience as enjoyable as possible.",
    icon: "/images/icon-bathroom.svg",
    href: "/services/bathroom-remodeling/",
  },
  {
    slug: "home-remodel",
    title: "Whole Home Remodeling",
    front:
      "We specialize in whole home remodeling services, so no matter what part of your house needs work, we can help. We can help with everything from painting and flooring to building new rooms.",
    back: "Our top priority is always customer satisfaction, so you can be sure that when you choose us as your contractor, you'll get high-quality work at an affordable price. Your dream home is just one call away.",
    icon: "/images/flipcard-service-5.svg",
    href: "/services/home-remodel/",
  },
  {
    slug: "bathroom-shower-remodel",
    title: "Shower Remodel",
    front:
      "Ready to upgrade your shower? Transform your space with a custom shower remodel tailored to your needs and style.",
    back: "Enjoy a modern, functional, and stylish shower. Our professional team handles every detail to create your ideal bathroom retreat.",
    icon: "/images/icon-shower.svg",
    href: "/services/bathroom-shower-remodel/",
  },
  {
    slug: "bathtub-remodeling",
    title: "Bathtub Remodel",
    front:
      "Upgrade your bathroom with a stunning bathtub remodel. Our team will help you transform your space into a relaxing, functional retreat.",
    back: "Ready to revamp your bathroom? We offer top-quality bathtub remodeling services to fit your style and needs. Whether it's a simple upgrade or a full remodel, we can help!",
    icon: "/images/flipcard-service-4.svg",
    href: "/services/bathtub-remodeling/",
  },
  {
    slug: "room-additions-home-additions",
    title: "Room Additions & Home Additions",
    front:
      "Work with trusted home addition contractors who create seamless, stylish, and functional spaces. Expand your home with quality additions that fit your lifestyle perfectly.",
    back: "Our Home Addition Services Include:",
    icon: "/images/flipcard-service-5.svg",
    href: "/services/room-additions-home-additions/",
    features: [
      "Master suite additions",
      "Extra bedroom builds",
      "Second-story expansions",
      "Mother-in-law suites",
      "Custom room designs",
    ],
    ctaLabel: "Read More",
  },
  {
    slug: "basement-remodeling-finishing",
    title: "Basement Remodeling / Finishing",
    front: "",
    back: "Our Remodeling Services Include:",
    icon: "/images/flipcard-service-1.svg",
    href: "/services/basement-remodeling-finishing/",
    features: [
      "Custom layouts",
      "Fixture upgrades",
      "Accessibility solutions",
      "Tile and flooring installation",
      "Full basement renovations",
    ],
    ctaLabel: "Read More",
  },
  {
    slug: "garage-remodel-contractors",
    title: "Garage Conversions & Remodeling",
    front:
      "Create a new home office, gym, or bedroom with our garage remodel contractors. We handle flooring, insulation, and finishes to give your garage new life.",
    back: "Key Services We Provide:",
    icon: "/images/Asset-2.svg",
    href: "/services/garage-remodel-contractors/",
    features: [
      "Insulation upgrades",
      "Durable flooring",
      "Electrical updates",
      "Wall finishing",
      "Custom layouts",
    ],
    ctaLabel: "Read More",
  },
  {
    slug: "open-concept-remodeling",
    title: "Living Room & Open Concept Remodeling",
    front:
      "Brighten your home with open concept remodeling. From wall removal to layout redesign, we create inviting spaces for family living and entertaining.",
    back: "Key Services We Provide:",
    icon: "/images/open-concept.svg",
    href: "/services/open-concept-remodeling/",
    features: [
      "Wall removal",
      "Layout redesign",
      "Natural light flow",
      "Finish upgrades",
      "Family-friendly spaces",
    ],
    ctaLabel: "Read More",
  },
];

export const homeServiceList = [
  {
    label: "Custom home building, from lot selection and design to full construction",
    href: "/services/custom-home-builder/",
  },
  {
    label: "Whole home remodeling for top-to-bottom transformations",
    href: "/services/home-remodel/",
  },
  {
    label: "Kitchen remodeling to improve layout, functionality, and style",
    href: "/services/kitchen-remodeling/",
  },
  {
    label: "Bathroom remodeling with upgraded features and finishes",
    href: "/services/bathroom-remodeling/",
  },
  {
    label: "Shower remodels that blend comfort, aesthetics, and performance",
    href: "/services/bathroom-shower-remodel/",
  },
  {
    label: "Bathtub remodels for a more relaxing and modern bathing space",
    href: "/services/bathtub-remodeling/",
  },
  {
    label: "General remodeling solutions for any room in your home",
    href: "/services/remodeling-company/",
  },
];

export const navServices = canonicalServiceCatalog.map((service) => ({
  label: service.label,
  href: service.href,
}));
