"use client";

import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type Gallery03Item = {
  title: string;
  description?: string;
  image: string;
  alt?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

type Gallery03Props = {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items?: Gallery03Item[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Use h1 when this block is the page hero (service detail). */
  asHero?: boolean;
};

/**
 * Featured project grid (gallery-03). Accepts NWS gallery images via props.
 */
export default function Gallery03({
  eyebrow = "Project photos",
  heading = "Project photos",
  description = "A closer look at craftsmanship across custom homes and remodels.",
  items = [],
  ctaLabel = "Start a project",
  ctaHref = "/contact/",
  asHero = false,
}: Gallery03Props) {
  const cards =
    items.length > 0
      ? items.slice(0, 4)
      : [
          {
            title: "Custom homes",
            description: "New construction with lasting detail.",
            image: "/images/custom-homes-1.jpeg",
          },
          {
            title: "Kitchens",
            description: "Flow, storage, and finishes.",
            image: "/images/kitchen-gallery-1.jpeg",
          },
          {
            title: "Baths",
            description: "Moisture-smart renovations.",
            image: "/images/bathroom-gallery-1.jpeg",
          },
          {
            title: "Whole-home",
            description: "Coordinated multi-room work.",
            image: "/images/remodeling-1.jpeg",
          },
        ];

  const HeadingTag = asHero ? "h1" : "h2";

  return (
    <section className="w-full bg-background" data-gallery-03>
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 xl:px-20 py-10 sm:py-14">
        <div className="grid grid-cols-12 gap-6">
          <motion.div
            className="col-span-12 lg:col-span-6 flex flex-col"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="m-1.5 size-1.5 rounded-full bg-primary" />
                  <p className="text-base leading-6 text-primary font-medium !m-0">
                    {eyebrow}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground !m-0">
                    {heading}
                  </HeadingTag>
                  <p className="text-base leading-6 text-muted-foreground !m-0 max-w-lg">
                    {description}
                  </p>
                </div>
              </div>
              <Button
                className="w-fit h-12 px-6 rounded-[4px] text-sm font-semibold !text-white"
                render={
                  ctaHref.startsWith("tel:") || ctaHref.startsWith("http") ? (
                    <a href={ctaHref} />
                  ) : (
                    <Link href={ctaHref} />
                  )
                }
              >
                {ctaLabel}
                <ArrowRight className="size-4 ml-1" />
              </Button>
            </div>
          </motion.div>

          {cards.map((item, i) => (
            <motion.div
              key={item.image + i}
              className={
                i === 0
                  ? "col-span-12 lg:col-span-6"
                  : i === 1
                    ? "col-span-12 sm:col-span-6 lg:col-span-4"
                    : "col-span-12 sm:col-span-6 lg:col-span-4"
              }
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1 + i * 0.08}
            >
              <Card className="group relative overflow-hidden rounded-2xl border-none p-0 min-h-[16rem] sm:min-h-[18rem] h-full shadow-none ring-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105 h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-white !m-0">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p className="text-white/80 text-sm !m-0 line-clamp-2">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
