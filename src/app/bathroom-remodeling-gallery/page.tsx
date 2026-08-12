import type { Metadata } from "next";
import { GalleryPage } from "@/components/GalleryPage";
import { galleries } from "@/data/galleries";

const gallery = galleries.find(
  (g) => g.slug === "bathroom-remodeling-gallery"
)!;

export const metadata: Metadata = {
  title: "Bathroom Remodeling Richmond, TX | Contact Us Today! | NWS Custom Homes and Remodeling",
  description: "Expert bathroom remodeling in Richmond, TX. With 35+ years of experience, we create stylish, functional bathrooms. Call (281) 299-2309 today!",
};

export default function Page() {
  return <GalleryPage gallery={gallery} />;
}
