"use client";

import { Button } from "@/components/ui/button";
import { FullBleedBackground } from "@/components/FullBleedBackground";
import AnimatedTextRoller from "@/components/shadcn-space/animated-text/animated-text-04";
import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";

export type AvatarList = {
  image: string;
  alt?: string;
};

export type LocationRoll = {
  /** Display name shown in the roller */
  text: string;
  /** Tailwind text color class */
  color?: string;
};

type HeroSectionProps = {
  avatarList?: AvatarList[];
  headline?: string;
  /** Static highlight (used when `locations` is empty) */
  highlight?: string;
  /** Locations to rotate through in the hero roller */
  locations?: LocationRoll[];
  /** Interval in ms between rotations */
  locationIntervalMs?: number;
  subhead?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  badge?: string;
  backgroundImage?: string;
  /** e.g. "5.0" */
  rating?: string;
  /** e.g. "Google & Angi reviews" */
  ratingLabel?: string;
};

function HeroSection({
  avatarList = [],
  headline = "Custom homes & remodels in",
  highlight = "Richmond, TX",
  locations = [
    { text: "Richmond, TX" },
    { text: "Sugar Land, TX" },
    { text: "Katy, TX" },
    { text: "Fulshear, TX" },
    { text: "Cinco Ranch, TX" },
    { text: "Rosenberg, TX" },
    { text: "Weston Lakes, TX" },
    { text: "Park Row, TX" },
    { text: "West Houston, TX" },
  ],
  locationIntervalMs = 2200,
  subhead = "Local team since 2007. Kitchens, baths, whole-home renovations, additions, and custom builds, planned and built with clear communication.",
  primaryCta = { label: "Book a free consult", href: "tel:2812992309" },
  secondaryCta = { label: "View our work", href: "/remodeling-gallery/" },
  badge = "Serving Fort Bend since 2007",
  backgroundImage = "/images/hero-nws-cinematic.jpg",
  rating = "5.0",
  ratingLabel = "Google & Angi reviews",
}: HeroSectionProps) {
  return (
    <section
      data-hero="home"
      className={[
        "relative w-full max-w-none overflow-x-clip",
        /* Pull under sticky navbar so transparent chrome sits on the image */
        "-mt-16 sm:-mt-[4.25rem]",
        "flex items-center justify-center",
        "min-h-[min(100svh,720px)]",
        "sm:min-h-[min(88svh,780px)]",
        "md:min-h-[min(90svh,860px)]",
        "lg:min-h-[min(92svh,920px)]",
        "xl:min-h-[min(88svh,980px)]",
        "2xl:min-h-[min(85svh,1080px)]",
      ].join(" ")}
    >
      <FullBleedBackground src={backgroundImage} />

      <div
        className={[
          "relative z-10 w-full mx-auto flex flex-col items-center text-center",
          "max-w-5xl px-4 sm:px-6 lg:px-8",
          /* Extra top padding so content clears overlaid navbar */
          "pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32",
          "gap-6 sm:gap-7 md:gap-8",
        ].join(" ")}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-1.5"
        >
          <span className="size-1.5 rounded-full bg-primary shrink-0" />
          <span className="text-xs sm:text-sm font-medium text-white/90">
            {badge}
          </span>
        </motion.div>

        <div className="flex flex-col items-center gap-2 md:gap-2.5 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-[clamp(1.2rem,4.8vw,1.65rem)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] font-bold tracking-tight text-white !m-0 max-w-5xl w-full min-w-0 px-1 sm:px-2 text-center break-words"
          >
            {locations.length > 1 ? (
              <AnimatedTextRoller
                prefix={headline}
                items={locations}
                intervalMs={locationIntervalMs}
                defaultColor="text-primary"
                forceDefaultColor
              />
            ) : (
              <span className="flex flex-col items-center gap-0">
                <span className="block whitespace-nowrap">{headline}</span>
                <span className="block text-primary whitespace-nowrap">
                  {highlight}
                </span>
              </span>
            )}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg font-normal max-w-2xl text-white/75 !m-0 px-1"
          >
            {subhead}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-2"
        >
          <Button
            size="lg"
            className="relative h-11 sm:h-12 min-w-0 sm:min-w-[180px] rounded-[4px] !bg-white !text-[#050505] hover:!bg-white/90 hover:!text-[#050505] font-semibold px-5 sm:px-6 w-full sm:w-auto [&_svg]:!text-[#050505]"
            render={<a href={primaryCta.href} />}
          >
            {primaryCta.label}
            <ArrowUpRight className="size-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-11 sm:h-12 min-w-0 sm:min-w-[160px] rounded-[4px] !border-white/55 !bg-transparent !text-white hover:!bg-white/15 hover:!text-white font-semibold px-5 sm:px-6 shadow-none w-full sm:w-auto"
            render={<a href={secondaryCta.href} />}
          >
            {secondaryCta.label}
          </Button>
        </motion.div>

        {/* Organized social proof, no promo copy (lives in announcement bar) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="inline-flex flex-row items-center gap-3 sm:gap-4 rounded-full border border-white/15 bg-black/25 backdrop-blur-md px-3 sm:px-4 py-2"
        >
          {avatarList.length > 0 && (
            <ul className="flex flex-row items-center pl-0.5" aria-hidden>
              {avatarList.map((avatar, index) => (
                <li
                  key={index}
                  className="-ml-2 first:ml-0 ring-2 ring-black/40 rounded-full"
                  style={{ zIndex: avatarList.length - index }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatar.image}
                    alt={avatar.alt || "NWS client testimonial"}
                    width={36}
                    height={36}
                    className="rounded-full object-cover size-8 sm:size-9"
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="w-px h-7 bg-white/20 shrink-0" aria-hidden />

          <div className="flex flex-col items-start gap-0.5 pr-1 text-left">
            <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-3.5 fill-amber-400 text-amber-400"
                  aria-hidden
                />
              ))}
              <span className="ml-1 text-sm font-semibold text-white tabular-nums">
                {rating}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-normal text-white/70 !m-0 leading-none">
              {ratingLabel}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
