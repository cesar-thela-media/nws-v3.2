"use client";

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const carouselImages = [
  { src: "/images/custom-homes-1.jpeg", alt: "Custom home project" },
  { src: "/images/kitchen-gallery-1.jpeg", alt: "Kitchen remodel" },
  { src: "/images/bathroom-gallery-1.jpeg", alt: "Bathroom remodel" },
  { src: "/images/remodeling-1.jpeg", alt: "Home remodel" },
  { src: "/images/custom-homes-3.jpeg", alt: "Custom home exterior" },
  { src: "/images/kitchen-gallery-3.jpeg", alt: "Kitchen renovation" },
  { src: "/images/bathroom-gallery-3.jpeg", alt: "Bathroom renovation" },
];

const RADIUS = 750;
const CARD_W = 275;
const CARD_H = 330;
const N_IMAGES = carouselImages.length;
const N_TOTAL = N_IMAGES * 2;

function CarouselCard({
  index,
  rotation,
}: {
  index: number;
  rotation: MotionValue<number>;
}) {
  const img = carouselImages[index % N_IMAGES];

  const angle = useTransform(
    rotation,
    (r) => r + Math.PI + (index / N_TOTAL) * Math.PI * 2,
  );

  const x = useTransform(angle, (a) => RADIUS * Math.sin(a));
  const z = useTransform(angle, (a) => RADIUS * Math.cos(a));

  const rotateY = useTransform(
    x,
    [-RADIUS, -RADIUS * 0.55, 0, RADIUS * 0.55, RADIUS],
    [70, 30, 0, -30, -70],
  );

  const opacity = useTransform(z, [0, RADIUS * 0.25], [1, 0]);
  const zIndex = useTransform(z, [-RADIUS, 0], [0, 9]);

  return (
    <motion.div
      className="absolute bottom-0 left-1/2 overflow-hidden rounded-2xl pointer-events-none"
      style={{
        width: CARD_W,
        height: CARD_H,
        marginLeft: -CARD_W / 2,
        x,
        z,
        rotateY,
        opacity,
        zIndex,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover select-none pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
}

function GalleryCarousel({ isInView }: { isInView: boolean }) {
  const rotation = useMotionValue(0);
  const isDragging = useRef(false);
  const dragStartRotation = useRef(0);

  useAnimationFrame((_, delta) => {
    if (!isDragging.current) {
      rotation.set(rotation.get() + delta * 0.00012);
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.9, delay: 0.2, ease: "easeInOut" }}
      className="relative w-full overflow-hidden h-100 cursor-grab"
      onPanStart={() => {
        isDragging.current = true;
        dragStartRotation.current = rotation.get();
      }}
      onPanEnd={() => {
        isDragging.current = false;
      }}
      onPan={(_, info) => {
        const sensitivity = 0.0015;
        rotation.set(dragStartRotation.current - info.offset.x * sensitivity);
      }}
    >
      <div className="absolute inset-0 perspective-midrange perspective-origin-[50%_80%]">
        {Array.from({ length: N_TOTAL }, (_, i) => (
          <CarouselCard key={i} index={i} rotation={rotation} />
        ))}
      </div>
    </motion.div>
  );
}

const Gallery04 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  // Render the deterministic gallery transforms during SSR and hydration.
  const mounted = true;

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 mb-8 text-center">
        <p className="text-sm font-medium text-primary mb-2">Our work</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          Project gallery
        </h2>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Drag to explore custom homes, kitchens, baths, and remodels across Fort
          Bend County.
        </p>
      </div>
      <div ref={sectionRef} className="sm:py-4 py-2 relative overflow-hidden">
        {mounted ? (
          <GalleryCarousel isInView={isInView} />
        ) : (
          <div
            className="relative w-full overflow-hidden h-100"
            aria-hidden
          />
        )}
      </div>
      <div className="text-center mt-4">
        <a
          href="/remodeling-gallery/"
          className="text-sm font-medium text-primary underline hover:no-underline"
        >
          Browse full galleries
        </a>
      </div>
    </section>
  );
};

export default Gallery04;
