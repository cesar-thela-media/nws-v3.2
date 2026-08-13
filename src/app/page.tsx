import HeroSection from "@/components/shadcn-space/blocks/hero-01/hero";
import AboutUs06 from "@/components/shadcn-space/blocks/about-us-06/about-us";
import Portfolio from "@/components/shadcn-space/blocks/portfolio-06/portfolio";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import Testimonial from "@/components/shadcn-space/blocks/testimonial-07/testimonial";
import Contact from "@/components/shadcn-space/blocks/contact-01";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import { metadataRules } from "@/data/informationArchitecture";
import { AreasServeMarquee } from "@/components/AreasServeMarquee";
import { reviews } from "@/data/reviews";
import {
  homeCtaText,
  homeDiscover,
  homeQualityClose,
  homeQualityIntro,
} from "@/data/homeCopy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Residential Remodeling Services Richmond, TX | Contact Us Today! | NWS Custom Homes and Remodeling",
  description: metadataRules.defaultDescription,
};

export default function HomePage() {
  const avatarList = reviews.slice(0, 4).map((review) => ({
    initial: review.initial,
    alt: `${review.name} review`,
  }));

  return (
    <>
      <h1 className="sr-only">
        Choose a Dependable Residential Remodeling Services in Richmond, TX
      </h1>
      <HeroSection
        avatarList={avatarList}
        badge="We build new homes specifically to fit your needs."
        headline="Custom homes & remodels in"
        highlight="Richmond, TX"
        subhead={homeDiscover}
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
        description={`${homeQualityIntro} ${homeQualityClose}`}
        ctaLabel="View All Our Services"
      />

      <CTA
        eyebrow="Get in Touch"
        title="Bring Your Dream Home to Life"
        text={homeCtaText}
      />

      <Testimonial />

      <AreasServeMarquee />

      <Contact />

      <Faq />
    </>
  );
}
