import HeroSection from "@/components/shadcn-space/blocks/hero-01/hero";
import AboutUs06 from "@/components/shadcn-space/blocks/about-us-06/about-us";
import Portfolio from "@/components/shadcn-space/blocks/portfolio-06/portfolio";
import HowWeWork from "@/components/shadcn-space/blocks/portfolio-08/portfolio";
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
        headline="Dependable Remodeling Services in"
        highlight="Richmond, TX"
        subhead="Discover what it truly means to live in a custom-built or beautifully remodeled home with NWS Custom Homes and Remodeling. As a trusted name in residential remodeling services, we bring your vision to life with attention to detail, personalized design, and high-quality craftsmanship. We’re here to make your house feel like home, one thoughtful renovation at a time."
        primaryCta={{ label: "Book Now", href: "tel:2812992309" }}
        secondaryCta={{ label: "Contact Us", href: "/contact/" }}
        rating="5.0"
        ratingLabel="Google & Angi reviews"
        backgroundImage="/images/hero-home-remodeled-richmond-tx.webp"
      />

      <AboutUs06 />

      <Portfolio
        label="Let’s Build Your Dreams"
        heading="Our Quality Services"
        description="When you’re ready to transform your space, working with the right remodeling contractor makes all the difference. At NWS Custom Homes and Remodeling, we’ve proudly served Richmond, TX, and surrounding areas since 2007, offering top-tier residential remodeling services tailored to your lifestyle and goals."
        ctaLabel="View All Our Services"
      />

      <HowWeWork />

      <CTA />

      <Testimonial />

      <AreasServeMarquee />

      <Contact />

      <Faq />
    </>
  );
}
