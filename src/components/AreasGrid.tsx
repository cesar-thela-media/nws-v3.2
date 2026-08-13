import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";
import { Reveal } from "@/components/Reveal";

/** Image cards linking to each location route (no plain chip list). */
export function AreasGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 sm:gap-8 ${className}`}
      data-areas-image-cards
    >
      {locations.map((loc) => {
        const href = loc.href === "#" ? "/areas-we-serve/" : loc.href;
        const label = loc.name;
        const src =
          loc.heroImage || "/images/hero-custom-home-remodeling-paralax-image.jpg";
        const isAnchor = loc.href === "#";

        const card = (
          <article className="group relative overflow-hidden rounded-2xl aspect-[16/9] sm:aspect-[2/1]">
            <Image
              src={src}
              alt={label}
              sizes="100vw"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <Reveal
                as="p"
                className="text-white font-semibold text-xl sm:text-2xl md:text-3xl !m-0"
              >
                {label}
              </Reveal>
            </div>
          </article>
        );

        return isAnchor ? (
          <div key={loc.slug}>{card}</div>
        ) : (
          <Link key={loc.slug} href={href} className="block">
            {card}
          </Link>
        );
      })}
    </div>
  );
}
