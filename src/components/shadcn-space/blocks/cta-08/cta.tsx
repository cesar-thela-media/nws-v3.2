"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const perks = [
  "Free consultation",
  "5% off with website mention",
  "Local since 2007",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

type CTAProps = {
  eyebrow?: string;
  title?: string;
  text?: string;
  buttonLabel?: string;
};

const CTA = ({ eyebrow, title, text, buttonLabel }: CTAProps) => {
  return (
    <section className="relative overflow-x-clip w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12 sm:py-16 lg:py-20 min-w-0">
        <div className="relative rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[360px] md:min-h-[400px]">
          {/* Generated cinematic remodel CTA background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 sm:scale-100"
            style={{
              backgroundImage: "url(/images/cta-start-project-bg.jpg)",
            }}
            aria-hidden
          />
          {/* Upper-half heavy dark so "Ready to start your project?" stays legible */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/35"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.35)_48%,transparent_72%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,5,0.3)_100%)]"
            aria-hidden
          />

          <div className="relative flex flex-col gap-8 lg:gap-16 px-6 pt-10 pb-6 lg:px-16 lg:pt-16 lg:pb-10">
            <motion.div
              className="flex flex-col items-center gap-4 lg:gap-5 text-center px-0 lg:px-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                className="text-sm font-medium text-white/90"
              >
                {eyebrow || "Free consultation"}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-2xl !m-0"
              >
                {title || "Ready to start your project?"}
              </motion.h2>
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap justify-center items-center gap-3 sm:gap-6"
              >
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-3">
                    <Check className="size-5 text-primary shrink-0" />
                    <span className="text-sm sm:text-base font-medium text-white whitespace-normal sm:whitespace-nowrap">
                      {perk}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-background border border-border rounded-xl p-6 lg:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-base sm:text-lg lg:text-xl font-medium text-foreground tracking-tight leading-relaxed max-w-lg !m-0">
                {text || "Get a clear next step, no hard sell. Mention this website for 5% off."}
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <Button
                  variant="outline"
                  className="rounded-[4px] h-12 px-6"
                  render={<a href="/remodeling-gallery/" />}
                >
                  View our work
                </Button>
                <Button
                  className="rounded-[4px] h-12 px-6 !bg-primary !text-white hover:!bg-primary/90 hover:!text-white"
                  render={<a href="tel:2812992309" />}
                >
                  {buttonLabel || "Call (281) 299-2309"}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
