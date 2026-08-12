"use client";

import { Button } from "@/components/ui/button";
import DotBackground from "@/components/shadcn-space/blocks/about-us-06/dot-background";
import { MarkerHighlight } from "@/components/shadcn-space/animated-text/animated-text-08";
import { cn } from "@/lib/utils";
import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";

const bullets = [
  "Local knowledge of Fort Bend County homes and permitting",
  "Custom builds and full remodels under one roof",
  "Straightforward updates on schedule, materials, and budget",
];

const ease = [0.21, 0.47, 0.32, 0.98] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger = 0.012) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.02,
    },
  }),
};

type AnimatedLettersProps = {
  text: string;
  className?: string;
  letterClassName?: string;
  /** Seconds between each letter */
  stagger?: number;
  isInView: boolean;
  as?: "span" | "p" | "h2" | "h3";
};

/** Per-letter animation, but words wrap as units (no mid-word breaks). */
function AnimatedLetters({
  text,
  className,
  letterClassName,
  stagger = 0.028,
  isInView,
  as = "span",
  delayOffset = 0,
}: AnimatedLettersProps & { delayOffset?: number }) {
  const Tag = motion[as];
  const words = text.split(/(\s+)/);

  return (
    <Tag
      className={cn(className)}
      aria-label={text}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      custom={stagger}
    >
      {words.map((word, wi) => {
        if (/^\s+$/.test(word)) {
          return <span key={`sp-${wi}`}>{" "}</span>;
        }
        const start = words
          .slice(0, wi)
          .filter((part) => !/^\s+$/.test(part))
          .reduce((total, part) => total + part.length, 0);
        return (
          <span
            key={`w-${wi}-${start}`}
            className="inline-block whitespace-nowrap max-w-full"
          >
            {word.split("").map((char, ci) => (
              <motion.span
                key={`${start + ci}`}
                aria-hidden
                initial={{ opacity: 0, y: "0.45em" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: "0.45em" }
                }
                transition={{
                  duration: 0.4,
                  delay: delayOffset + (start + ci) * stagger,
                  ease,
                }}
                className={cn("inline-block", letterClassName)}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}

/** Headline with animated-text-08 marker on “Richmond” (orange mark, white type). */
function AnimatedHeadline({
  isInView,
}: {
  isInView: boolean;
}) {
  const stagger = 0.008;
  const first = "Bring Your Dream Home to Life";

  return (
    <h2
      className="font-bold text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.15] max-w-4xl mx-auto text-center tracking-tight !m-0"
      aria-label="Bring Your Dream Home to Life"
    >
      <AnimatedLetters
        text={first}
        isInView={isInView}
        stagger={stagger}
        delayOffset={0.02}
        className="inline"
      />{" "}
      <MarkerHighlight
        highlight="Richmond"
        markerColor="#ff4500"
        highlightedTextColor="#ffffff"
        baseColor="hsl(var(--foreground))"
        speed={2.4}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight"
      />
    </h2>
  );
}

const AboutUs06 = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const body =
    "Whether you need a full home remodel, an updated kitchen layout, or an expanded living space, our team of seasoned professionals is ready to help. We bring years of experience as both house renovation contractors and home addition contractors, ensuring every project, from simple upgrades to complex remodels, is completed with care, precision, and efficiency.";

  // Snappy entrance - no long staggered waits on body / bullets
  const bodyStartDelay = 0.18;
  const bulletBase = bodyStartDelay + 0.12;
  const ctaDelay = bulletBase + 0.22;

  return (
    <section ref={ref}>
      <div className="max-w-7xl mx-auto w-full border-x border-border relative overflow-hidden">
        <DotBackground>
          <div className="lg:py-40 md:py-28 py-16 px-4 sm:px-6 lg:px-16 relative z-2">
            <div className="flex flex-col items-center justify-center gap-10 md:gap-14">
              <div className="flex flex-col gap-4 md:gap-5 items-center">
                <AnimatedLetters
                  as="p"
                  text="Let’s Build Your Dreams"
                  isInView={isInView}
                  stagger={0.012}
                  className="text-base md:text-lg font-semibold text-primary tracking-wide !m-0"
                />
                <AnimatedHeadline isInView={isInView} />
              </div>

              <div className="flex flex-col items-center justify-center gap-7 md:gap-8 w-full">
                <motion.p
                  className="text-muted-foreground text-lg sm:text-xl md:text-[1.35rem] leading-relaxed max-w-2xl mx-auto text-center !m-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.35, delay: bodyStartDelay, ease }}
                >
                  {body}
                </motion.p>

                <ul className="text-base sm:text-lg text-muted-foreground max-w-xl space-y-3 text-left w-full sm:w-auto">
                  {bullets.map((item, bi) => (
                    <motion.li
                      key={item}
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : undefined}
                      transition={{
                        duration: 0.3,
                        delay: bulletBase + bi * 0.06,
                        ease,
                      }}
                    >
                      <span className="text-primary font-semibold shrink-0" aria-hidden>
                        ·
                      </span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: 0.35, delay: ctaDelay, ease }}
                >
                  <Button
                    size="lg"
                    className="px-8 h-12 md:h-14 text-base cursor-pointer !text-white hover:!text-white"
                    render={<a href="tel:2812992309" />}
                  >
                    Speak with our team
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </DotBackground>
      </div>
    </section>
  );
};

export default AboutUs06;
