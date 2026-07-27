import Hero08 from "@/components/shadcn-space/blocks/hero-08";
import Gallery03 from "@/components/shadcn-space/blocks/gallery-03/gallery";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import type { Gallery } from "@/data/galleries";

/**
 * Gallery family: hero-08 marquee + one Project photos section (full grid) + cta-08.
 * Single photos band only — no second stacked component.
 */
export function GalleryPage({ gallery }: { gallery: Gallery }) {
  const shortDesc =
    gallery.description.length > 120
      ? gallery.description.slice(0, 117).trim() + "..."
      : gallery.description;

  const photoItems = gallery.images.map((image, i) => ({
    title: `${gallery.heading} ${i + 1}`,
    image,
    alt: `${gallery.heading} project photo ${i + 1}`,
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
        images={gallery.images}
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
