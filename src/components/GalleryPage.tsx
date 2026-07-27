import Hero08 from "@/components/shadcn-space/blocks/hero-08";
import Gallery03 from "@/components/shadcn-space/blocks/gallery-03/gallery";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import type { Gallery } from "@/data/galleries";
import { galleryImagePaths } from "@/data/galleries";

/**
 * Gallery family: hero-08 marquee + one Project photos section + cta-08.
 * Photo titles are descriptive (what the shot shows), not numbered labels.
 */
export function GalleryPage({ gallery }: { gallery: Gallery }) {
  const shortDesc =
    gallery.description.length > 120
      ? gallery.description.slice(0, 117).trim() + "..."
      : gallery.description;

  const photoItems = gallery.photos.map((photo) => ({
    title: photo.title,
    image: photo.src,
    alt: photo.alt || photo.title,
  }));

  const marqueeCards = gallery.photos.map((photo) => ({
    src: photo.src,
    title: photo.title,
    label: "NWS project",
  }));

  return (
    <>
      <Hero08
        eyebrow="Project gallery"
        heading={gallery.heading}
        description={shortDesc}
        primaryCtaLabel="Start a project"
        primaryCtaHref="/contact/"
        secondaryCtaLabel="Call us"
        images={galleryImagePaths(gallery)}
        cards={marqueeCards}
      />

      <Gallery03
        showAll
        eyebrow="Project photos"
        heading="Project photos"
        description={shortDesc}
        items={photoItems}
        ctaLabel="Start a project"
        ctaHref="/contact/"
      />

      <CTA />
    </>
  );
}
