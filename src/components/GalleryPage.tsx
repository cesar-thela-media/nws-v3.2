import Hero08 from "@/components/shadcn-space/blocks/hero-08";
import Gallery03 from "@/components/shadcn-space/blocks/gallery-03/gallery";
import Gallery01 from "@/components/shadcn-space/blocks/gallery-01/gallery";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import type { Gallery } from "@/data/galleries";
import { splitGalleryPhotos } from "@/lib/galleryPhotos.mjs";

export { splitGalleryPhotos };

/**
 * Gallery family: hero-08 + gallery-03 then gallery-01 + homepage cta-08.
 */
export function GalleryPage({ gallery }: { gallery: Gallery }) {
  const shortDesc =
    gallery.description.length > 120
      ? gallery.description.slice(0, 117).trim() + "..."
      : gallery.description;

  const { featured, remaining } = splitGalleryPhotos(gallery.images);

  const g03Items = featured.map((image, i) => ({
    title: `${gallery.heading} ${i + 1}`,
    description: shortDesc,
    image,
    alt: `${gallery.heading} project photo ${i + 1}`,
  }));

  const gallery01 = remaining.map((image, i) => ({
    title: `${gallery.heading} ${i + 5}`,
    image,
    alt: `${gallery.heading} project photo ${i + 5}`,
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
        heading="Project photos"
        description={shortDesc}
        items={g03Items}
        ctaLabel="Start a project"
        ctaHref="/contact/"
      />

      {gallery01.length > 0 ? (
        <Gallery01 items={gallery01} heading="More project photos" />
      ) : null}

      <CTA />
    </>
  );
}
