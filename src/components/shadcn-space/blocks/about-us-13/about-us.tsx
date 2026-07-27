"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useInView } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const num = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const isNumeric = Boolean(match);

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(isNumeric ? `0${suffix}` : value);

  useEffect(() => {
    if (!isInView || !isNumeric) return;
    const controls = animate(motionValue, num, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });
    return controls.stop;
  }, [isInView, motionValue, num, suffix, isNumeric]);

  if (!isNumeric) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>{display}</span>;
}

/** NWS production stats - not Space demo agency metrics */
const stats = [
  { value: "2007", label: "Serving since" },
  { value: "35+", label: "Years combined experience" },
  { value: "Full", label: "Service construction team" },
  { value: "5%", label: "Off when you mention the website" },
];

const mosaicImages = [
  {
    src: "/images/whole-home-remodeling-richmond-tx.jpg",
    alt: "Whole home remodeling by NWS in Richmond, TX",
  },
  {
    src: "/images/kitchen-gallery-1.jpeg",
    alt: "Kitchen remodeling by NWS Custom Homes",
  },
  {
    src: "/images/bathroom-remodeling-richmond-tx.jpg",
    alt: "Bathroom remodeling by NWS",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const staggerStats = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export default function AboutUs() {
  return (
    <section
      className="relative py-12 md:py-20 lg:py-24 overflow-hidden"
      data-about-us-13
    >
      {/* Background photo + primary wash + upper white fade into About hero */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/about-story-bg.jpg)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[color-mix(in_oklab,var(--primary)_22%,transparent)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-transparent"
        data-about-story-top-fade
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"
        data-about-story-bottom-fade
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
        {/* Fuller-width story card with collage layout */}
        <div
          className="rounded-2xl border border-border bg-white shadow-[var(--shadow-card,0_12px_40px_rgba(0,0,0,0.08))] overflow-hidden"
          data-about-story-card
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Editorial collage: large hero + two equal tiles (no floating overlays) */}
            <motion.div
              className="lg:col-span-5 p-4 sm:p-5 lg:p-6 flex flex-col gap-3 sm:gap-3.5 bg-muted/20"
              data-about-story-collage
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeLeft}
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[16rem] ring-1 ring-border/60 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mosaicImages[0].src}
                  alt={mosaicImages[0].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                <div className="relative overflow-hidden rounded-xl aspect-[5/4] ring-1 ring-border/60 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mosaicImages[1].src}
                    alt={mosaicImages[1].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-xl aspect-[5/4] ring-1 ring-border/60 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mosaicImages[2].src}
                    alt={mosaicImages[2].alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 xl:p-12">
              <motion.div
                className="flex flex-col gap-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
              >
                <motion.div variants={fadeRight}>
                  <Badge
                    variant="outline"
                    className="text-sm font-normal text-foreground px-3 py-1 rounded-full h-auto bg-white"
                  >
                    Our story
                  </Badge>
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  className="xl:text-5xl lg:text-4xl text-3xl font-bold text-foreground leading-tight tracking-tight !m-0"
                >
                  Discover the true meaning of custom homes
                </motion.h2>

                <motion.div
                  variants={fadeUp}
                  className="flex flex-col gap-4 text-base text-muted-foreground"
                >
                  <p className="!m-0">
                    Discover the true meaning of Custom Homes with NWS Custom
                    Homes and Remodeling! We&apos;re a full-service construction
                    company specializing in remodeling and custom homes.
                    We&apos;ve been building our reputation for excellence since
                    2007 and have recently expanded our services to include more
                    projects than ever before. We offer a range of options for
                    your remodeling needs: from kitchen and bathroom renovations
                    to complete additions, we do it all!
                  </p>
                  <p className="!m-0">
                    Our team is composed of highly skilled professionals who work
                    together seamlessly to ensure that each project goes smoothly
                    from start to finish.
                  </p>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                  <Button
                    className="rounded-[4px] px-4 h-11 text-sm !text-white"
                    render={<a href={`tel:${site.phone.officeTel}`} />}
                  >
                    Speak to Our Experts
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-[4px] px-4 h-11 text-sm"
                    render={<Link href="/services/" />}
                  >
                    View services
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid grid-cols-2 lg:gap-x-6 lg:gap-y-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerStats}
              >
                {stats.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    variants={fadeUp}
                    className={cn(
                      "flex flex-col gap-2 items-center py-6 px-4",
                      i < 2 && "border-b border-border lg:border-b-0",
                      i % 2 === 0 && "border-r border-border lg:border-r-0",
                      "lg:items-start lg:p-0",
                    )}
                  >
                    <span className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight">
                      <CountUp value={value} />
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
