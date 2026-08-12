"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { locations } from "@/data/locations";

const areas = locations.map((loc) => ({
  id: loc.slug,
  name: loc.name,
  href: loc.href === "#" ? "/areas-we-serve/" : loc.href,
  image:
    loc.heroImage || "/images/hero-custom-home-remodeling-paralax-image.jpg",
  blurb: "Custom homes & remodeling",
}));

function AreaCard({
  name,
  href,
  image,
  blurb,
}: {
  name: string;
  href: string;
  image: string;
  blurb: string;
}) {
  return (
    <Card className="relative w-[20rem] sm:w-[22rem] md:w-[24rem] shrink-0 gap-0 py-0 rounded-2xl overflow-hidden border border-border/80 bg-card shadow-sm group hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <Link href={href} className="block">
          <div className="w-full h-56 sm:h-64 md:h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${name} remodeling and custom homes`}
              sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 24rem"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-white text-foreground shadow-md">
            <ArrowRight className="size-4" />
          </span>
        </div>
        <Badge className="absolute top-4 left-4 bg-primary text-white border-0 hover:bg-primary">
          Service area
        </Badge>
      </div>

      <div className="p-5 sm:p-6 flex flex-col gap-2">
        <Link href={href}>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground !m-0 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm sm:text-base text-muted-foreground !m-0">
          {blurb}
        </p>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-1 w-fit"
        >
          Explore area
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Card>
  );
}

/**
 * Areas we serve, horizontal marquee of large UI cards
 * (replaces carousel-08 in this section)
 */
export function AreasServeMarquee() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-background overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto mb-8 sm:mb-10 flex flex-col gap-2">
        <p className="text-sm sm:text-base font-semibold text-primary !m-0">
          Areas We Serve
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground !m-0">
          Areas We Serve
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl !m-0 mt-1">
          We complete every project promptly, effectively, and with the utmost attention to detail.
        </p>
      </div>

      <Marquee
        pauseOnHover
        className="[--duration:50s] [--gap:1.25rem] py-2"
        repeat={2}
      >
        {areas.map((area) => (
          <AreaCard key={area.id} {...area} />
        ))}
      </Marquee>

      {/* Optional reverse second row for depth */}
      <Marquee
        reverse
        pauseOnHover
        className="[--duration:55s] [--gap:1.25rem] py-2 mt-1 hidden sm:flex"
        repeat={2}
      >
        {[...areas].reverse().map((area) => (
          <AreaCard key={`r-${area.id}`} {...area} />
        ))}
      </Marquee>
    </section>
  );
}
