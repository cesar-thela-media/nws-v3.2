"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { Phone } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export type Hero12Props = {
  badgeLead?: string;
  badge?: string;
  headline?: string;
  description?: string;
  /** Full-bleed section background (defaults to card image) */
  backgroundImageSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** When set, right panel is a live Google Maps embed instead of a photo */
  mapEmbedSrc?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
};

/**
 * Hero-12 layout restyled to Glyph / NWS (no SaaS demo copy).
 * Site chrome stays in root layout (navbar-02); block navbar not used.
 */
export default function HeroSection({
  badgeLead = "Fort Bend",
  badge = "Custom homes & remodeling since 2007",
  headline = "Custom homes and full-service remodeling you can trust",
  description = "Our wide range of services means we can build you a custom home from square one or remodel an existing one. Find the right lot, plan your dream home, or convert an existing structure with one accountable team.",
  backgroundImageSrc,
  imageSrc = "/images/custom-home-richmond-tx.jpg",
  imageAlt = "Custom home project by NWS in Richmond, TX",
  mapEmbedSrc,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel = "Contact our experts",
  secondaryCtaHref = "/contact/",
}: Hero12Props) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const primaryHref = primaryCtaHref || `tel:${site.phone.officeTel}`;
  const primaryLabel = primaryCtaLabel || `Call ${site.phone.office}`;
  const bgSrc =
    backgroundImageSrc ||
    imageSrc ||
    "/images/whole-home-remodeling-richmond-tx.jpg";

  return (
    <section
      ref={sectionRef}
      data-hero-12
      className="relative overflow-x-clip bg-[#0a0e10] text-white sm:pt-8 w-full max-w-full"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{
          backgroundImage: `url(${bgSrc})`,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[color-mix(in_oklab,var(--primary)_12%,transparent)]"
        aria-hidden
      />

      <div className="relative z-20 max-w-7xl mx-auto xl:px-16 lg:px-8 px-4 py-14 sm:py-20 lg:py-24 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-8 items-center">
          <div className="flex flex-col gap-5 sm:gap-6 pt-6 sm:pt-10 min-w-0">
            <div className="flex max-w-full w-fit flex-wrap items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-2 py-1.5">
              <Badge className="h-6 bg-primary text-xs font-semibold text-white border-0 shadow-sm leading-none hover:bg-primary shrink-0">
                {badgeLead}
              </Badge>
              <span className="text-xs font-medium text-white tracking-tight pr-1 min-w-0">
                {badge}
              </span>
            </div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white !m-0 text-balance max-w-full"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.01 },
                },
              }}
            >
              {headline.split("").map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.15 } },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <p className="text-base sm:text-lg text-white/75 max-w-md !m-0">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button
                className="gap-2 !bg-primary !text-white hover:!bg-primary/90 px-6 py-3.5 h-12 rounded-[4px] w-fit"
                render={
                  primaryHref.startsWith("tel:") ||
                  primaryHref.startsWith("http") ? (
                    <a href={primaryHref} />
                  ) : (
                    <Link href={primaryHref} />
                  )
                }
              >
                <Phone size={16} className="shrink-0" />
                {primaryLabel}
              </Button>
              <Button
                variant="outline"
                data-dark-outline-cta
                className="px-6 py-3.5 h-12 rounded-[4px] w-fit !border-white/70 !bg-transparent !text-white hover:!bg-white/15 hover:!text-white shadow-none"
                render={<Link href={secondaryCtaHref} data-dark-outline-cta="" />}
              >
                {secondaryCtaLabel}
              </Button>
            </div>
          </div>

          <div className="relative min-h-[16rem] sm:min-h-[22rem] lg:min-h-[28rem] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black/40">
            {mapEmbedSrc ? (
              <iframe
                title={imageAlt || "Service area map"}
                src={mapEmbedSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  width={845}
                  height={641}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
