import type { Metadata } from "next";
import { GalleryPage } from "@/components/GalleryPage";
import { galleries } from "@/data/galleries";

const gallery = galleries.find((g) => g.slug === "custom-homes-gallery")!;

export const metadata: Metadata = {
  title: "Custom Homes Gallery",
  description: "Bring your dream home to life with our help. We have over 35 years of combined experience. Call us at (281) 299-2309 to get started.",
};

export default function Page() {
  return <GalleryPage gallery={gallery} />;
}
