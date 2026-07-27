"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * How NWS works, what we do + how we deliver.
 * Images: generated process photos in /public/images/process/
 */
const projects = [
  {
    id: 1,
    step: "01",
    title: "Listen, scope, and plan with you",
    description:
      "We start with your goals, budget range, and how you use the house. You get a clear scope, realistic timeline, and an estimate before we schedule, so there are no mystery phases later.",
    tags: ["Consult", "Scope", "Estimate"],
    image: "/images/process/process-plan.jpg",
    ctaLabel: "Book a free consult",
    ctaHref: "tel:2812992309",
  },
  {
    id: 2,
    step: "02",
    title: "Build and remodel with one accountable crew",
    description:
      "Kitchens, baths, whole-home work, additions, or custom builds, same team from site prep through finish. We handle sequencing, materials, and updates so you’re never guessing who’s in charge.",
    tags: ["Build", "Remodel", "Additions"],
    image: "/images/process/process-build.jpg",
    ctaLabel: "See our services",
    ctaHref: "/services/",
  },
  {
    id: 3,
    step: "03",
    title: "Communicate clearly through every phase",
    description:
      "Fort Bend homes come with real-world constraints, permits, weather, lead times. We keep you posted on schedule, selections, and decisions so the job stays on track and the walkthrough is clean.",
    tags: ["Updates", "Quality", "Walkthrough"],
    image: "/images/process/process-finish.jpg",
    ctaLabel: "View our work",
    ctaHref: "/remodeling-gallery/",
  },
  {
    id: 4,
    step: "04",
    title: "Expand or start new when you’re ready",
    description:
      "Need more space or a full custom home? We design additions that look original and new builds that fit how you live in Richmond and nearby communities, under one plan, one team.",
    tags: ["Custom homes", "Room additions", "Local"],
    image: "/images/process/process-expand.jpg",
    ctaLabel: "Talk with our team",
    ctaHref: "/contact/",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  // Subtle sticky scale - avoids a laggy “waiting” feel on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  return (
    <div
      ref={container}
      className="sticky w-full top-20 md:top-28 min-h-0 md:h-[22rem] lg:h-[24rem]"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full flex flex-col md:flex-row items-stretch justify-between h-auto md:h-full bg-background border border-border rounded-2xl overflow-hidden gap-0 md:gap-0 origin-top shadow-sm"
      >
        {/* Content Side */}
        <div className="flex flex-col justify-between gap-5 sm:gap-6 p-5 sm:p-8 md:p-10 flex-1 min-w-0 order-2 md:order-1">
          <div className="flex flex-col gap-3 sm:gap-4 max-w-xl">
            <span className="text-sm font-semibold text-primary tracking-wide">
              Step {project.step}
            </span>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight !m-0">
              {project.title}
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed !m-0">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="h-7 rounded-full px-3 py-1 bg-background text-sm font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            variant="default"
            className="rounded-[4px] px-6 gap-2 group cursor-pointer h-11 w-fit !text-white"
            render={<a href={project.ctaHref} />}
          >
            {project.ctaLabel}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Image Side, full photo on mobile (no tiny clipped band) */}
        <div className="relative overflow-hidden w-full md:w-[48%] lg:w-[46%] aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:min-h-0 md:h-full shrink-0 order-1 md:order-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            width={466}
            height={320}
            className="absolute inset-0 object-cover object-center w-full h-full transition-transform duration-700 hover:scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <section
      className="w-full relative bg-gradient-to-b from-muted/30 via-primary/[0.07] to-muted/50"
      data-how-we-work-gradient
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_color-mix(in_oklab,var(--primary)_14%,transparent),_transparent_55%)]"
        aria-hidden
      />
      <div className="relative w-full flex flex-col items-center gap-6 md:gap-8 px-4 py-12 md:py-20 lg:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 md:gap-5 w-full">
          <Badge
            variant="outline"
            className="h-7 rounded-full px-3 py-1 text-sm font-normal border-primary/30 text-primary"
          >
            How we work
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl tracking-tight !m-0">
            Built for Fort Bend homeowners
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl !m-0">
            What we do and how we do it, from first consult to final walkthrough.
            One accountable team for remodels, additions, and custom homes in
            Richmond and nearby communities.
          </p>
        </div>
      </div>

      <div className="relative w-full flex flex-col items-center px-4 md:px-8 lg:px-16 pb-20 md:pb-32 lg:pb-40 gap-8 md:gap-12 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
