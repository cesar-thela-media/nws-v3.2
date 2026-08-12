import type { Metadata } from "next";
import { GalleryPage } from "@/components/GalleryPage";
import { galleries } from "@/data/galleries";

const gallery = galleries.find((g) => g.slug === "remodeling-gallery")!;

export const metadata: Metadata = {
  title: "Remodeling Gallery",
  description: "See the results of our remodeling company in Richmond, TX. We have over 35 years of combined experience. Call today at (281) 299-2309.",
};

export default function Page() {
  return <GalleryPage gallery={gallery} />;
}
