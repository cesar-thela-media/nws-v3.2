"use client";

import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import { useInView, motion } from "motion/react";
import { nwsTestimonials, type TestimonialCard } from "@/data/reviews";

const firstRow = nwsTestimonials.slice(0, 4);
const secondRow = nwsTestimonials.slice(4, 8);
const thirdRow = [
  ...nwsTestimonials.slice(8),
  ...nwsTestimonials.slice(0, 2),
];

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const AngiIcon = () => (
  <span className="text-[10px] font-bold tracking-wide text-[#FF6153] border border-[#FF6153]/40 rounded px-1.5 py-0.5">
    Angi
  </span>
);

const ReviewCard = ({
  name,
  username,
  body,
  avatar,
  projectImage,
  source,
}: TestimonialCard) => {
  return (
    <Card className="p-0 border border-white/20 ring-0 shadow-none max-w-sm overflow-hidden bg-white text-foreground">
      <CardContent className="p-0 flex flex-col">
        <div className="relative h-28 w-full overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={projectImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        <div className="p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              {/* People photo avatar (stock portrait for UI) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatar}
                alt=""
                width={44}
                height={44}
                className="size-11 shrink-0 rounded-full object-cover ring-2 ring-background shadow-sm"
              />
              <div className="min-w-0">
                <p className="text-base font-medium truncate !m-0">{name}</p>
                <p className="text-xs text-muted-foreground !m-0 truncate">
                  {username}
                </p>
              </div>
            </div>
            <div className="shrink-0" title={source}>
              {source === "Google" ? <GoogleIcon /> : <AngiIcon />}
            </div>
          </div>
          <Separator />
          <p className="text-sm sm:text-base text-foreground leading-relaxed !m-0">
            {body}
          </p>
          <div className="stars text-sm" aria-label="5 stars">
            ★★★★★
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98] as const,
      },
    },
  };

  return (
    <section ref={sectionRef} className="py-10 md:py-16 bg-primary text-white">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col sm:gap-12 gap-8"
        >
          <div className="flex flex-col justify-center items-center gap-4">
            <motion.div variants={itemVariants}>
              <Badge
                variant="outline"
                className="h-7 px-3 py-1 text-sm font-normal border-white/40 text-white bg-white/10"
              >
                Client feedback
              </Badge>
            </motion.div>
            <div className="flex flex-col gap-3 items-center">
              <motion.h2
                variants={itemVariants}
                className="text-center font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight !m-0 text-white"
              >
                Check What Our Clients Are Saying
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-center text-base sm:text-lg text-white/80 max-w-lg !m-0"
              >
                Don&apos;t Take Our Word For It
              </motion.p>
            </div>
          </div>
          <motion.div
            variants={itemVariants}
            className="relative w-full h-full max-h-[28rem] sm:max-h-96 flex flex-row items-center justify-center overflow-hidden gap-6"
          >
            <div className="flex flex-row items-center gap-5">
              <Marquee
                pauseOnHover
                vertical
                className="[--duration:28s] p-0 [--gap:1.25rem]"
              >
                {firstRow.map((review) => (
                  <ReviewCard key={review.name + review.date} {...review} />
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                vertical
                className="[--duration:28s] p-0 [--gap:1.25rem] hidden sm:flex"
              >
                {secondRow.map((review) => (
                  <ReviewCard key={review.name + review.date} {...review} />
                ))}
              </Marquee>
              <Marquee
                pauseOnHover
                vertical
                className="[--duration:28s] p-0 [--gap:1.25rem] hidden lg:flex"
              >
                {thirdRow.map((review) => (
                  <ReviewCard
                    key={"t3-" + review.name + review.date}
                    {...review}
                  />
                ))}
              </Marquee>
            </div>
            <div className="from-primary pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b" />
            <div className="from-primary pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
