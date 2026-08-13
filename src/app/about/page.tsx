import type { Metadata } from "next";
import Hero13About from "@/components/shadcn-space/blocks/hero-13";
import AboutUs13 from "@/components/shadcn-space/blocks/about-us-13/about-us";
import BentoGrid02 from "@/components/shadcn-space/blocks/bento-grid-02";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about our dependable remodeling company in Richmond, TX. We have over 35 years of combined experience. Call at (281) 299-2309.",
};

/** About: hero-13 + about-us-13 + bento-grid-02 + homepage cta-08 (no map/form) */
export default function AboutPage() {
  return (
    <>
      <h2 className="sr-only">We're Looking Forward to Work With You</h2>
      <Hero13About />
      <AboutUs13 />
      <BentoGrid02 />
      <CTA />
    </>
  );
}
