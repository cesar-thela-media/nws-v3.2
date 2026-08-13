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
      duration: 1.4,
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
  { value: "5%", label: "Off when you mention the website" },
];

/** Landscape stack - no empty mosaic gap under a tall hero tile */
const stackImages = [
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
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const staggerStats = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};

export default function AboutUs() {
  return (
    <section
      className="relative py-12 md:py-20 lg:py-24 overflow-x-clip bg-primary w-full max-w-full"
      data-about-us-13
      data-about-story-orange
    >
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 min-w-0">
        <div
          className="rounded-2xl border border-white/20 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)] overflow-hidden"
          data-about-story-card
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Stack of landscape photos - fills column, no white gap under image */}
            <motion.div
              className="lg:col-span-5 p-3 sm:p-4 lg:p-5 flex flex-col gap-3 bg-muted/30 min-w-0"
              data-about-story-collage
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.12 }}
              variants={fadeLeft}
            >
              {stackImages.map((img) => (
                <div
                  key={img.src}
                  className="relative overflow-hidden rounded-xl aspect-[16/10] ring-1 ring-border/50 shadow-sm w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </motion.div>

            <div className="lg:col-span-7 flex flex-col gap-8 lg:gap-10 p-5 sm:p-8 lg:p-10 xl:p-12 min-w-0">
              <motion.div
                className="flex flex-col gap-5"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
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
                viewport={{ once: true, amount: 0.15 }}
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
