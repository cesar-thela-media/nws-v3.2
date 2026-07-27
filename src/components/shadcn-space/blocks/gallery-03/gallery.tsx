"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type Gallery03Item = {
  title: string;
  description?: string;
  image: string;
  alt?: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
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
  /**
   * When true (gallery pages), show every item in one landscape grid.
   * When false (service hero), keep the compact featured layout (max 4).
   */
  showAll?: boolean;
  /** Tighter vertical padding (service detail under sticky nav). */
  compact?: boolean;
};

/**
 * Project photos grid (gallery-03).
 * Gallery pages: orange section + landscape grid + lightbox.
 * Service detail: compact intro + up to 4 featured tiles.
 */
export default function Gallery03({
  eyebrow = "Project photos",
  heading = "Project photos",
  description = "A closer look at craftsmanship across custom homes and remodels.",
  items = [],
  ctaLabel = "Start a project",
  ctaHref = "/contact/",
  asHero = false,
  showAll = false,
  compact = false,
}: Gallery03Props) {
  const defaults: Gallery03Item[] = [
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

  const raw = items.length > 0 ? items : defaults;
  let cards = showAll ? raw : raw.slice(0, 4);
  if (showAll && cards.length > 3) {
    const rem = cards.length % 3;
    if (rem === 1) {
      cards = cards.slice(0, -1);
    }
  }

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const goPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + cards.length) % cards.length,
    );
  }, [cards.length]);
  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % cards.length));
  }, [cards.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  const HeadingTag = asHero ? "h1" : "h2";
  const sectionPad = compact
    ? "py-6 sm:py-8"
    : "py-10 sm:py-14";

  const lightbox =
    lightboxIndex !== null ? (
      <AnimatePresence>
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={cards[lightboxIndex]?.title || "Project photo"}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-gallery-lightbox
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/85 border-0 cursor-pointer"
            aria-label="Close photo"
            onClick={closeLightbox}
          />
          <motion.div
            className="relative z-10 w-full max-w-5xl flex flex-col gap-3"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cards[lightboxIndex].image}
                alt={cards[lightboxIndex].alt || cards[lightboxIndex].title}
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-3 text-white px-1">
              <p className="text-sm sm:text-base font-medium !m-0 truncate">
                {cards[lightboxIndex].title}
              </p>
              <p className="text-xs text-white/60 !m-0 shrink-0">
                {lightboxIndex + 1} / {cards.length}
              </p>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute -top-2 -right-2 sm:top-2 sm:right-2 z-20 flex size-10 items-center justify-center rounded-full bg-white text-foreground shadow-lg border-0 cursor-pointer hover:bg-white/95"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            {cards.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-20 flex size-10 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md border-0 cursor-pointer hover:bg-white"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-20 flex size-10 items-center justify-center rounded-full bg-white/95 text-foreground shadow-md border-0 cursor-pointer hover:bg-white"
                  aria-label="Next photo"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            ) : null}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    ) : null;

  if (showAll) {
    return (
      <>
        <section
          className="w-full bg-primary text-white"
          data-gallery-03
          data-gallery-project-photos
          data-gallery-photos-orange
        >
          <div
            className={cn(
              "max-w-7xl mx-auto px-4 md:px-10 lg:px-16 xl:px-20 flex flex-col gap-8 sm:gap-10",
              sectionPad,
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="flex flex-col gap-3 max-w-2xl">
                <div className="flex items-center gap-1.5">
                  <span className="m-1.5 size-1.5 rounded-full bg-white" />
                  <p className="text-base leading-6 text-white/90 font-medium !m-0">
                    {eyebrow}
                  </p>
                </div>
                <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-bold text-white !m-0">
                  {heading}
                </HeadingTag>
                <p className="text-base leading-6 text-white/85 !m-0">
                  {description}
                </p>
              </div>
              <Button
                className="w-fit h-12 px-6 rounded-[4px] text-sm font-semibold !bg-white !text-primary hover:!bg-white/90 shrink-0"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {cards.map((item, i) => (
                <motion.div
                  key={`${item.image}-${i}`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={0.04 + (i % 6) * 0.04}
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(i)}
                    className="block w-full text-left border-0 bg-transparent p-0 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    aria-label={`View ${item.title} full size`}
                  >
                    <Card className="group relative overflow-hidden rounded-2xl border-none p-0 aspect-[16/10] shadow-md ring-1 ring-white/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.alt || item.title}
                        className="absolute inset-0 object-cover object-center transition-transform duration-500 group-hover:scale-105 h-full w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
                        <h3 className="text-lg sm:text-xl font-semibold text-white !m-0">
                          {item.title}
                        </h3>
                      </div>
                    </Card>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {lightbox}
      </>
    );
  }

  // Compact featured layout (service detail heroes)
  return (
    <>
      <section className="w-full bg-background" data-gallery-03>
        <div
          className={cn(
            "max-w-7xl mx-auto px-4 md:px-10 lg:px-16 xl:px-20",
            sectionPad,
          )}
        >
          <div className="grid grid-cols-12 gap-5 sm:gap-6">
            <motion.div
              className="col-span-12 lg:col-span-6 flex flex-col"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <div className="flex flex-col gap-5 sm:gap-6">
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
                    : "col-span-12 sm:col-span-6 lg:col-span-4"
                }
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.08 + i * 0.06}
              >
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  className="block w-full h-full text-left border-0 bg-transparent p-0 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={`View ${item.title} full size`}
                >
                  <Card className="group relative overflow-hidden rounded-2xl border-none p-0 min-h-[14rem] sm:min-h-[16rem] h-full shadow-none ring-0">
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
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {lightbox}
    </>
  );
}
