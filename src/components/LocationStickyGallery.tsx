"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export function LocationStickyGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = Math.max(images.length, 1);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(value * count)));
    setIndex((current) => (current === next ? current : next));
  });

  return (
    <div
      ref={frameRef}
      className="lg:min-h-full"
      data-location-sticky-gallery
    >
      <div className="lg:sticky lg:top-28 overflow-hidden">
        <div className="relative aspect-[4/5] w-full bg-background">
          {images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt={i === index ? alt : ""}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
