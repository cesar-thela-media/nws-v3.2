import HeroSection from "@/components/shadcn-space/blocks/hero-01/hero";
import AboutUs06 from "@/components/shadcn-space/blocks/about-us-06/about-us";
import Portfolio from "@/components/shadcn-space/blocks/portfolio-06/portfolio";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import Testimonial from "@/components/shadcn-space/blocks/testimonial-07/testimonial";
import Contact from "@/components/shadcn-space/blocks/contact-01";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import { metadataRules } from "@/data/informationArchitecture";
import { AreasServeMarquee } from "@/components/AreasServeMarquee";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential Remodeling Services Richmond, TX | Contact Us Today! | NWS Custom Homes and Remodeling",
  description: metadataRules.defaultDescription,
};

export default function HomePage() {
  // People portraits for social proof (same set as review cards)
  const avatarList = [
    { image: "/images/avatars/avatar-1.jpg", alt: "NWS client testimonial" },
    { image: "/images/avatars/avatar-2.jpg", alt: "NWS client testimonial" },
    { image: "/images/avatars/avatar-4.jpg", alt: "NWS client testimonial" },
    { image: "/images/avatars/avatar-5.jpg", alt: "NWS client testimonial" },
  ];

  return (
    <>
      <HeroSection
        avatarList={avatarList}
        badge="We build new homes specifically to fit your needs."
        headline="Choose a Dependable Residential Remodeling Services in"
        highlight="Richmond, TX"
        subhead="Discover what it truly means to live in a custom-built or beautifully remodeled home with NWS Custom Homes and Remodeling. As a trusted name in residential remodeling services, we bring your vision to life with attention to detail, personalized design, and high-quality craftsmanship. We’re here to make your house feel like home, one thoughtful renovation at a time."
        primaryCta={{ label: "Book Now", href: "tel:2812992309" }}
        secondaryCta={{ label: "Contact Us", href: "/contact/" }}
        rating=""
        ratingLabel=""
        backgroundImage="/images/hero-home-remodeled-richmond-tx.webp"
      />

      <AboutUs06 />

      <Portfolio
        label="Let’s Build Your Dreams"
        heading="Our Quality Services"
        description="We offer a full range of residential remodeling services designed to match your vision and your budget. Whether you're building from the ground up or transforming an existing home, we provide: Our team can help you plan every detail, from selecting materials to optimizing layouts. We'll be by your side through every phase of the project, delivering results you'll love and a remodeling experience you'll actually enjoy."
        ctaLabel="View All Our Services"
      />

      <CTA />

      <Testimonial />

      <AreasServeMarquee />

      <Contact />

      <Faq />
    </>
  );
}
