import Hero08 from "@/components/shadcn-space/blocks/hero-08";
import Gallery03 from "@/components/shadcn-space/blocks/gallery-03/gallery";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import type { Gallery } from "@/data/galleries";
import { galleryImagePaths } from "@/data/galleries";

/**
 * Gallery family: hero-08 marquee + orange Project photos grid + lightbox + cta-08.
 * Full description in hero (no mid-sentence ellipsis).
 */
export function GalleryPage({ gallery }: { gallery: Gallery }) {
  const sourceCtaLabel = "Contact Us";

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
        description={gallery.description}
        primaryCtaLabel="Contact Us"
        primaryCtaHref="/contact/"
        secondaryCtaLabel="Call Now"
        images={galleryImagePaths(gallery)}
        cards={marqueeCards}
      />

      <Gallery03
        showAll
        eyebrow="Project photos"
        heading="Project photos"
        description={gallery.description}
        items={photoItems}
        ctaLabel={sourceCtaLabel}
        ctaHref="/contact/"
      />

      <CTA />
    </>
  );
}
