import { Card } from "@/components/ui/card";

export type Gallery01Item = {
  title?: string;
  subtitle?: string;
  image: string;
  alt?: string;
};

type Gallery01Props = {
  items?: Gallery01Item[];
  heading?: string;
};

function PhotoCard({
  item,
  titleClass,
  minH,
}: {
  item: Gallery01Item;
  titleClass: string;
  minH: string;
}) {
  return (
    <Card
      className={`group relative overflow-hidden rounded-2xl border-none p-0 ${minH} after:absolute after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:from-40% after:to-black/80 shadow-none ring-0`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.alt || item.title || "Project photo"}
        className="object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full absolute inset-0"
      />
      <div className="absolute bottom-0 ps-4 sm:ps-6 pb-4 sm:pb-6 z-10 flex flex-col gap-1">
        {item.title ? (
          <h3 className={`${titleClass} font-semibold text-white !m-0`}>
            {item.title}
          </h3>
        ) : null}
        {item.subtitle ? (
          <p className="text-white/80 text-sm !m-0">{item.subtitle}</p>
        ) : null}
      </div>
    </Card>
  );
}

/**
 * Secondary masonry-style showcase (gallery-01) under gallery-03.
 * Renders all supplied items: bento of first 4, then overflow grid for 5+.
 * Pads only missing bento slots from the last real item (never drops extras).
 */
export default function Gallery01({
  items = [],
  heading = "More from this gallery",
}: Gallery01Props) {
  const defaults: Gallery01Item[] = [
    { image: "/images/custom-homes-3.jpeg", title: "Exterior" },
    { image: "/images/kitchen-gallery-3.jpeg", title: "Kitchen" },
    { image: "/images/bathroom-gallery-3.jpeg", title: "Bath" },
    { image: "/images/remodeling-2.jpeg", title: "Remodel" },
  ];

  const cards = items.length > 0 ? items : defaults;
  const primary = cards.slice(0, 4);
  const overflow = cards.slice(4);

  // Pad only missing bento slots from the last real card
  const last = primary[primary.length - 1] || defaults[0];
  while (primary.length < 4 && primary.length > 0) {
    primary.push({
      ...last,
      title: last.title,
      image: last.image,
      alt: last.alt || last.title || "Project photo",
    });
  }

  const a = primary[0] || defaults[0];
  const b = primary[1] || a;
  const c = primary[2] || a;
  const d = primary[3] || b;

  return (
    <section className="w-full bg-muted/30" data-gallery-01>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 py-10 sm:py-14 w-full">
        <p className="text-sm font-semibold text-primary !m-0 mb-2">{heading}</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PhotoCard
            item={a}
            titleClass="text-2xl"
            minH="min-h-[20rem] md:min-h-[28rem]"
          />

          <div className="grid grid-rows-2 gap-6 min-h-[20rem] md:min-h-[28rem]">
            <PhotoCard item={b} titleClass="text-xl" minH="min-h-[10rem]" />
            <div className="grid grid-cols-2 gap-6">
              <PhotoCard item={c} titleClass="text-lg" minH="min-h-[10rem]" />
              <PhotoCard item={d} titleClass="text-lg" minH="min-h-[10rem]" />
            </div>
          </div>
        </div>

        {overflow.length > 0 ? (
          <div
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-gallery-01-overflow
          >
            {overflow.map((item, i) => (
              <PhotoCard
                key={`${item.image}-overflow-${i}`}
                item={item}
                titleClass="text-lg"
                minH="min-h-[14rem] sm:min-h-[16rem]"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
