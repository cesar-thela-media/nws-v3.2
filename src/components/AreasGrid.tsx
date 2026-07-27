import Image from "next/image";
import Link from "next/link";
import { locations } from "@/data/locations";

const communityImages = [
  "/images/custom-homes-1.jpeg",
  "/images/hero-home-remodeled-richmond-tx.webp",
  "/images/kitchen-gallery-1.jpeg",
  "/images/custom-homes-3.jpeg",
  "/images/whole-home-remodeling-richmond-tx.jpg",
  "/images/bathroom-gallery-1.jpeg",
  "/images/remodeling-1.jpeg",
  "/images/home-addition-contractors.webp",
  "/images/custom-homes-2.jpeg",
];

/** Image cards linking to each location route (no plain chip list). */
export function AreasGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}
      data-areas-image-cards
    >
      {locations.map((loc, i) => {
        const href = loc.href === "#" ? "/areas-we-serve/" : loc.href;
        const label = loc.name.replace(/,?\s*TX$/i, "");
        const src = communityImages[i % communityImages.length];
        const isAnchor = loc.href === "#";

        const card = (
          <article className="group relative overflow-hidden rounded-2xl border border-border bg-card min-h-[14rem] sm:min-h-[16rem]">
            <Image
              src={src}
              alt={`${label} remodeling and custom homes`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              aria-hidden
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
              <p className="text-white font-semibold text-lg !m-0">{label}</p>
              <span className="text-white/80 text-sm">
                {isAnchor ? "Home base" : "View local page"}
              </span>
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
