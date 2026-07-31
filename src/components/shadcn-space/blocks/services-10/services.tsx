"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, MessageCircleMore } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { nwsServices10 } from "@/data/nws-blocks";

export interface ServiceCard {
  badge: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

export interface Services10Props {
  label?: string;
  heading?: string;
  ctaText?: string;
  ctaLinkText?: string;
  ctaHref?: string;
  services?: ServiceCard[];
}

export default function Services10({
  label = "What we do",
  heading = "Services built around how you live", // main section title
  ctaText = "Tell us your goals, we'll map the right path.",
  ctaLinkText = "View all services",
  ctaHref = "/services/",
  services = nwsServices10,
}: Services10Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative w-full max-w-none overflow-x-clip",
        "py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28",
        "min-h-[min(100%,520px)] sm:min-h-0",
        "bg-[#070b0c]",
      )}
      style={{
        backgroundImage: [
          // Warm brand glow top-center
          "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(255,69,0,0.22), rgba(255,69,0,0.06) 35%, transparent 65%)",
          // Soft orange side wash (left)
          "radial-gradient(ellipse 55% 70% at 0% 40%, rgba(255,69,0,0.1), transparent 55%)",
          // Cool steel wash (right)
          "radial-gradient(ellipse 50% 65% at 100% 55%, rgba(40,70,90,0.18), transparent 55%)",
          // Depth at bottom corners
          "radial-gradient(ellipse 80% 50% at 50% 110%, rgba(0,0,0,0.65), transparent 50%)",
          // Main vertical multi-stop gradient
          "linear-gradient(165deg, #121a1d 0%, #0c1214 22%, #070b0c 48%, #06090a 72%, #030506 100%)",
          // Subtle diagonal sheen
          "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.03) 42%, transparent 58%)",
        ].join(", "),
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 flex flex-col gap-7 sm:gap-8 md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeInOut" }}
          className="flex flex-col gap-2 sm:gap-3 md:gap-4"
        >
          <p className="text-sm sm:text-base md:text-lg font-semibold text-primary">
            {label}
          </p>
          <h2 className="font-bold tracking-tight text-white !m-0 max-w-full text-balance text-[clamp(1.25rem,4.2vw,3.75rem)] leading-tight">
            {heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
          className="flex flex-col gap-8 md:gap-10"
        >
          <div className="w-full min-w-0">
            <ScrollArea className="w-full">
              <div className="flex gap-4 sm:gap-5 md:gap-6 w-max md:w-full pb-3 md:pb-0">
                {services.map((service, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={index}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setActiveIndex(index)
                      }
                      aria-label={`View ${service.title}`}
                      className={cn(
                        "relative rounded-2xl overflow-hidden border border-white/15 cursor-pointer shrink-0 shadow-lg shadow-black/30",
                        "transition-all duration-500 ease-in-out",
                        // Height scales by breakpoint
                        "h-72 sm:h-96 md:h-[28rem] lg:h-[30rem]",
                        // Width: mobile accordion strip → desktop flex expand
                        isActive
                          ? "w-[min(18rem,78vw)] sm:w-78"
                          : "w-16 sm:w-24",
                        isActive
                          ? "md:w-auto md:flex-[7_0_0]"
                          : "md:w-auto md:flex-[1_0_0]",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent" />
                      <div
                        className={cn(
                          "absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6",
                          "transition-opacity duration-300 ease-in-out",
                          isActive
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none",
                        )}
                      >
                        <div className="flex flex-col gap-2 sm:gap-3">
                          <Badge className="h-6 rounded-md self-start backdrop-blur-md bg-white/20 text-white border-transparent hover:bg-white/20 whitespace-nowrap">
                            {service.badge}
                          </Badge>
                          <div className="flex flex-col md:flex-row md:items-end gap-3 md:gap-6">
                            <div className="flex flex-col gap-1 flex-1 min-w-0">
                              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-white leading-7 sm:leading-8 !m-0">
                                {service.title}
                              </h3>
                              <p className="text-xs sm:text-sm md:text-base text-white/60 leading-5 sm:leading-6 !m-0">
                                {service.description}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              className="h-8 rounded-[4px] bg-white text-gray-950 hover:bg-white/80 shadow-xs shrink-0 w-fit cursor-pointer group"
                              render={
                                <a href={service.href || "/services/"} />
                              }
                            >
                              Learn more
                              <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform duration-300" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" className="md:hidden" />
            </ScrollArea>
          </div>

          <div className="flex justify-center px-1">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-full px-4 sm:px-5 py-2.5 text-center sm:text-left max-w-full">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <MessageCircleMore className="size-5 text-white shrink-0" />
                <span className="text-sm sm:text-base text-white/90 break-words">
                  {ctaText}
                </span>
              </div>
              <a
                href={ctaHref}
                className="text-sm font-medium text-primary underline underline-offset-2 whitespace-nowrap hover:text-[var(--color-primary-hover,#e03e00)] shrink-0 transition-colors"
              >
                {ctaLinkText}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
