"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/Reveal";

/** What we do, service cards (card-02 style UI + NWS copy/photos) */
const portfolioItems = [
  {
    id: 1,
    badge: "Build",
    title: "Custom Home Building",
    description:
      "Our team will work with you from start to finish to ensure that your home is what you want, with all the features and finishes that matter to you most.",
    back: "We specialize in custom construction and have decades of experience building homes that fit your needs. Whether you want a large home with plenty of space for entertaining or a smaller home that's easy to maintain, we do it right.",
    image: "/images/custom-homes-1.jpeg",
    href: "/services/custom-home-builder/",
  },
  {
    id: 2,
    badge: "Remodel",
    title: "Remodeling",
    description:
      "We're here to help you turn your home into the place you've always dreamed of. Whether you want a kitchen to remodel, a bathroom makeover, or an addition to your home, we can do it all.",
    back: "We have the skills and the knowledge of what it takes to make your home look the best. We'll handle all the details from start to finish, so you can sit back and relax as we do all the work for you!",
    image: "/images/remodeling-1.jpeg",
    href: "/services/remodeling-company/",
  },
  {
    id: 3,
    badge: "Kitchen",
    title: "Kitchen Remodeling",
    description:
      "Kitchen remodeling is a great way to breathe new life into your home. We've got the expertise and experience you need to pull it off. We'll work with you every step of the way to create the kitchen of your dreams, no matter what that looks like.",
    back: "Our team will help you choose the right materials for your space and budget, as well as offer tips for making sure everything works together seamlessly. We work hard at keeping our costs fair while still providing high-quality service.",
    image: "/images/kitchen-gallery-1.jpeg",
    href: "/services/kitchen-remodeling/",
  },
  {
    id: 4,
    badge: "Bath",
    title: "Bathroom Remodeling",
    description:
      "Are you ready to take your bathroom to the next level? We've got everything you need to turn that tired, outdated space into a gorgeous, relaxing oasis, and we can do it all with minimal disruption to your busy life.",
    back: "We can help you add the perfect finishing touches to your bathroom remodel that will make it feel like home and help make your remodel experience as enjoyable as possible.",
    image: "/images/bathroom-gallery-1.jpeg",
    href: "/services/bathroom-remodeling/",
  },
  {
    id: 5,
    badge: "Whole home",
    title: "Whole Home Remodeling",
    description:
      "We specialize in whole home remodeling services, so no matter what part of your house needs work, we can help. We can help with everything from painting and flooring to building new rooms.",
    back: "Our top priority is always customer satisfaction, so you can be sure that when you choose us as your contractor, you'll get high-quality work at an affordable price. Your dream home is just one call away.",
    image: "/images/custom-homes-3.jpeg",
    href: "/services/home-remodel/",
  },
  {
    id: 6,
    badge: "Shower",
    title: "Shower Remodel",
    description:
      "Ready to upgrade your shower? Transform your space with a custom shower remodel tailored to your needs and style.",
    back: "Enjoy a modern, functional, and stylish shower. Our professional team handles every detail to create your ideal bathroom retreat.",
    image: "/images/14-kitchen-after.jpg",
    href: "/services/bathroom-shower-remodel/",
  },
  {
    id: 7,
    badge: "Bath",
    title: "Bathtub Remodel",
    description:
      "Upgrade your bathroom with a stunning bathtub remodel. Our team will help you transform your space into a relaxing, functional retreat.",
    back: "Ready to revamp your bathroom? We offer top-quality bathtub remodeling services to fit your style and needs. Whether it's a simple upgrade or a full remodel, we can help!",
    image: "/images/13-kitchen-after.jpg",
    href: "/services/bathtub-remodeling/",
  },
  {
    id: 8,
    badge: "Expand",
    title: "Room Additions & Home Additions",
    description:
      "Work with trusted home addition contractors who create seamless, stylish, and functional spaces. Expand your home with quality additions that fit your lifestyle perfectly.",
    back: "Our Home Addition Services Include:",
    features: [
      "Master suite additions",
      "Extra bedroom builds",
      "Second-story expansions",
      "Mother-in-law suites",
      "Custom room designs",
    ],
    image: "/images/custom-homes-5.jpeg",
    href: "/services/room-additions-home-additions/",
  },
  {
    id: 9,
    badge: "Basement",
    title: "Basement Remodeling / Finishing",
    description: "",
    back: "Our Remodeling Services Include:",
    features: [
      "Custom layouts",
      "Fixture upgrades",
      "Accessibility solutions",
      "Tile and flooring installation",
      "Full basement renovations",
    ],
    image: "/images/remodeling-4.jpeg",
    href: "/services/basement-remodeling-finishing/",
  },
  {
    id: 10,
    badge: "Garage",
    title: "Garage Conversions & Remodeling",
    description: "Create a new home office, gym, or bedroom with our garage remodel contractors. We handle flooring, insulation, and finishes to give your garage new life.",
    back: "Key Services We Provide:",
    features: [
      "Insulation upgrades",
      "Durable flooring",
      "Electrical updates",
      "Wall finishing",
      "Custom layouts",
    ],
    image: "/images/garage-remodel.webp",
    href: "/services/garage-remodel-contractors/",
  },
  {
    id: 11,
    badge: "Open concept",
    title: "Living Room & Open Concept Remodeling",
    description: "Brighten your home with open concept remodeling. From wall removal to layout redesign, we create inviting spaces for family living and entertaining.",
    back: "Key Services We Provide:",
    features: [
      "Wall removal",
      "Layout redesign",
      "Natural light flow",
      "Finish upgrades",
      "Family-friendly spaces",
    ],
    image: "/images/open-concept.webp",
    href: "/services/open-concept-remodeling/",
  },
];

type PortfolioProps = {
  label?: string;
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

function ServiceCard({
  item,
}: {
  item: (typeof portfolioItems)[0];
}) {
  return (
    <Card
      className="relative gap-0 py-0 rounded-2xl overflow-hidden border border-white/15 bg-primary shadow-lg shadow-primary/25 group hover:shadow-xl hover:brightness-[1.03] transition-all duration-300 h-full min-h-[24rem] sm:min-h-[28rem] md:min-h-[32rem] min-w-0"
      data-service-card-orange
    >
      <div className="relative overflow-hidden">
        <a href={item.href} className="block">
          <div className="w-full h-52 sm:h-64 md:h-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              width={560}
              height={360}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </a>
        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-flex size-11 items-center justify-center rounded-full bg-white text-primary shadow-md">
            <ArrowRight className="size-5" />
          </span>
        </div>
        <Badge className="absolute top-5 left-5 bg-white text-primary border-0 hover:bg-white text-sm px-3 py-1 font-semibold">
          {item.badge}
        </Badge>
      </div>

      <div className="p-6 sm:p-7 md:p-8 flex flex-col gap-3.5 flex-1 bg-primary">
        <a href={item.href}>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white !m-0 transition-colors duration-300">
            {item.title}
          </h3>
        </a>
        <div className="text-base sm:text-lg !text-white leading-relaxed !m-0 flex-1 space-y-2 [&_p]:!text-white [&_li]:!text-white">
          {item.description ? <p className="!m-0">{item.description}</p> : null}
          {"back" in item && item.back ? <p className="!m-0">{item.back}</p> : null}
          {"features" in item && Array.isArray(item.features) ? (
            <ul className="list-disc pl-5 space-y-1">
              {item.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <a
          href={item.href}
          className="group/learn inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-base font-semibold text-black hover:bg-white mt-1 w-fit transition-colors"
        >
          <span className="relative text-black after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 group-hover/learn:after:scale-x-100">Learn more</span>
          <ArrowRight className="size-4 text-black transition-colors duration-300 ease-out group-hover/learn:text-primary group-hover/learn:translate-x-1.5" />
        </a>
      </div>
    </Card>
  );
}

const Portfolio = ({
  label = "What we do",
  heading = "Services built around how you live",
  description = "From a single room to a full custom home, we scope, design, and build so every phase is clear for Fort Bend homeowners.",
  ctaLabel = "View all services",
  ctaHref = "/services/",
}: PortfolioProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <section
      className="w-full py-12 md:py-20 lg:py-24 space-y-10 md:space-y-12 bg-[#0a0e10]"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 90% 55% at 50% -5%, rgba(255,69,0,0.18), transparent 60%)",
          "linear-gradient(165deg, #141c20 0%, #0c1214 40%, #080c0e 100%)",
        ].join(", "),
      }}
      data-what-we-do
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <RevealGroup className="lg:col-span-5 flex flex-col gap-3">
            <RevealItem as="p" className="text-sm sm:text-base font-semibold text-primary !m-0">
              {label}
            </RevealItem>
            <RevealItem
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] !m-0"
            >
              {heading}
            </RevealItem>
          </RevealGroup>
          <div className="lg:col-span-1 lg:block hidden" />
          <RevealGroup className="flex flex-col items-start gap-6 lg:ml-auto lg:col-span-6">
            <RevealItem
              as="p"
              className="text-white/70 text-base sm:text-lg leading-relaxed !m-0"
            >
              {description}
            </RevealItem>
            <RevealItem>
              <Button
                className="rounded-[4px] px-6 h-11 cursor-pointer !text-white"
                variant="default"
                render={<a href={ctaHref} />}
              >
                {ctaLabel}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>

      <div className="relative w-full max-w-full overflow-x-clip">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full max-w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6 px-4 md:px-8 lg:px-16">
            {portfolioItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 md:pl-6 basis-[88%] min-[400px]:basis-[85%] sm:basis-[70%] md:basis-1/2 lg:basis-[42%] xl:basis-[38%] min-w-0"
              >
                <ServiceCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev && !api}
            aria-label="Previous services"
            className="h-10 w-10 rounded-full border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                type="button"
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  current === index
                    ? "w-8 bg-primary"
                    : "w-2 bg-white/25 hover:bg-white/40",
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext && !api}
            aria-label="Next services"
            className="h-10 w-10 rounded-full border-white/25 bg-white/5 text-white hover:bg-white/15 hover:text-white disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
