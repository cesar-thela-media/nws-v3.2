import type { Metadata } from "next";
import Contact from "@/components/shadcn-space/blocks/contact-01";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out to our dependable remodeling company in Richmond, TX. We have over 35 years of combined experience. Call us today at (281) 299-2309.",
};

export default function ContactPage() {
  return <Contact />;
}
