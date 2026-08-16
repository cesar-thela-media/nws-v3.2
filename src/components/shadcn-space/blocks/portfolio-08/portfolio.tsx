"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type Portfolio08Item = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  image: string;
  href: string;
  ctaLabel?: string;
};

type PortfolioProps = {
  label?: string;
  heading?: string;
  description?: string;
  items: Portfolio08Item[];
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Portfolio08Item;
  index: number;
}) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div
      ref={container}
      className="sticky w-full h-150 md:h-100 lg:h-87.5 xl:h-82 top-20 md:top-28"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
        }}
        className="w-full flex flex-col md:flex-row items-center justify-between h-full bg-background overflow-hidden gap-8 md:gap-4 origin-top"
      >
        <div className="flex flex-col justify-between gap-8 min-w-0 flex-1">
          <div className="flex flex-col gap-4 max-w-129">
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground !m-0">
              {project.title}
            </p>
            <p className="text-muted-foreground text-base !m-0">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 ? (
              <div className="flex flex-wrap gap-3">
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
            ) : null}
          </div>

          <Button
            variant="default"
            className="rounded-[4px] px-6 py-5 gap-2 group cursor-pointer hover:bg-primary/80 h-10 w-fit !text-white"
            render={<a href={project.href} />}
          >
            {project.ctaLabel || "Learn more"}
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="relative overflow-hidden w-full max-w-116.5 h-70 md:h-full shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            width={466}
            height={320}
            className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 hover:scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
};

const Portfolio = ({
  label = "Services",
  heading = "Our Quality Services",
  description,
  items,
}: PortfolioProps) => {
  return (
    <section className="w-full relative bg-background" data-services-visual-grid>
      <div className="w-full flex flex-col items-center gap-6 md:gap-10 px-4 py-12 md:py-20 lg:py-24 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center gap-4 md:gap-6 w-full">
          <Badge
            variant="outline"
            className="h-7 rounded-full px-3 py-1 text-sm font-normal"
          >
            {label}
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground max-w-190 !m-0">
            {heading}
          </h2>
          {description ? (
            <p className="text-base text-muted-foreground max-w-153 !m-0">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="w-full flex flex-col items-center px-4 md:px-16 lg:px-20 pb-20 md:pb-32 lg:pb-40 gap-10 md:gap-16 max-w-7xl mx-auto relative h-full">
        {items.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
