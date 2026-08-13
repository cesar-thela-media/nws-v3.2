"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion, useInView } from "motion/react";
import "@/components/shadcn-space/blocks/hero-04/hero.css";

export type Hero04Props = {
  eyebrow?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  breadcrumb?: ReactNode;
};

/**
 * Hero 04 layout themed for NWS Glyph (no Space demo designer / teal chrome).
 * Site navbar stays in root layout - this block has no navbar.
 */
export default function HeroContent({
  eyebrow = "Areas we serve",
  titleLine1 = "Fort Bend",
  titleLine2 = "Custom homes & remodels",
  description = "Local craftsmanship for Richmond and nearby communities since 2007.",
  imageSrc = "/images/whole-home-remodeling-richmond-tx.jpg",
  imageAlt = "NWS custom home and remodeling project",
  primaryCtaLabel = "Get in touch",
  primaryCtaHref,
  secondaryLabel = "View services",
  secondaryHref = "/services/",
  breadcrumb,
}: Hero04Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const ctaHref = primaryCtaHref || `tel:${site.phone.officeTel}`;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background border-b border-border"
      data-hero-04
    >
      <div className="max-w-7xl mx-auto xl:px-16 lg:px-8 px-4 w-full py-2 flex items-center lg:min-h-[min(70svh,640px)] pt-24 sm:pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
          <div className="flex flex-col gap-4 lg:gap-6 py-8 lg:py-12 relative z-10">
            {breadcrumb}

            <div className="flex items-center gap-2 bg-primary/10 border border-primary/40 px-3 py-1.5 rounded-full w-fit">
              <MapPin className="size-3.5 text-primary shrink-0" />
              <span className="text-foreground text-sm font-medium">
                {eyebrow}
              </span>
            </div>

            <motion.h1
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-foreground overflow-hidden !m-0"
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    },
                  },
                }}
                className="block"
              >
                {titleLine1}
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: -40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.21, 0.47, 0.32, 0.98],
                      delay: 0.05,
                    },
                  },
                }}
                className="block text-primary"
              >
                {titleLine2}
              </motion.span>
            </motion.h1>

            <p className="text-base sm:text-lg font-normal text-muted-foreground max-w-lg !m-0">
              {description}
            </p>

            <div className="w-full h-px bg-border my-2" />

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <Button
                className="relative text-sm font-semibold rounded-[4px] h-12 p-1 ps-5 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-5 w-fit overflow-hidden cursor-pointer !text-white"
                render={
                  ctaHref.startsWith("tel:") || ctaHref.startsWith("http") ? (
                    <a href={ctaHref} />
                  ) : (
                    <Link href={ctaHref} />
                  )
                }
              >
                <span className="relative z-10 transition-all duration-500">
                  {primaryCtaLabel}
                </span>
                <div className="absolute right-1 w-10 h-10 bg-white text-primary rounded-[4px] flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </Button>
              <div className="flex items-center gap-3 max-w-xs">
                <div className="size-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <MapPin className="size-4 text-primary" />
                </div>
                <p className="text-xs sm:text-sm font-normal text-muted-foreground !m-0">
                  {site.location} office.{" "}
                  <Link
                    href={secondaryHref}
                    className="underline text-foreground hover:text-primary font-medium"
                  >
                    {secondaryLabel}
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full min-h-[16rem] sm:min-h-[22rem] lg:min-h-[28rem] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.08,
              }}
              className="absolute inset-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt={imageAlt}
                width={800}
                height={960}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
