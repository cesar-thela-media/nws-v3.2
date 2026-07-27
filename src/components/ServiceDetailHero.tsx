import Gallery03 from "@/components/shadcn-space/blocks/gallery-03/gallery";
import { getServiceHeroPhotos } from "@/data/serviceHeroPhotos";
import { site } from "@/data/site";

/**
 * Service detail hero: gallery-03 with slug-relevant project photos
 * (not the hub carousel — each service page looks distinct).
 */
export function ServiceDetailHero({
  slug,
  eyebrow,
  heading,
  description,
}: {
  slug: string;
  eyebrow?: string;
  heading: string;
  description?: string;
}) {
  const photos = getServiceHeroPhotos(slug);
  const shortDesc =
    description && description.length > 160
      ? description.slice(0, 157).trim() + "..."
      : description ||
        "See project photos matched to this service, then talk with our Richmond team.";

  return (
    <div className="pt-24 sm:pt-28 border-b border-border" data-service-detail-hero>
      <Gallery03
        asHero
        eyebrow={eyebrow || "Service"}
        heading={heading}
        description={shortDesc}
        items={photos.items}
        ctaLabel={`Call ${site.phone.office}`}
        ctaHref={`tel:${site.phone.officeTel}`}
      />
    </div>
  );
}
