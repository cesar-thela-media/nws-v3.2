"use client";

import Logo from "@/assets/logo/logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Bath,
  Building2,
  ChevronDown,
  Hammer,
  Home,
  Images,
  CookingPot,
  MapPin,
  TextAlignJustify,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavigationItem = {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  href?: string;
};

export type NavigationSection = {
  title: string;
  subtitle?: string;
  href?: string;
  items?: NavigationItem[];
  layout?: "list" | "grid";
};

const navigationData: NavigationSection[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about/" },
  {
    title: "Services",
    layout: "list",
    items: [
      {
        title: "Custom Homes",
        description: "Full builds from plan to walkthrough",
        icon: Home,
        href: "/services/custom-home-builder/",
      },
      {
        title: "Kitchen Remodeling",
        description: "Flow, storage, and finishes that last",
        icon: CookingPot,
        href: "/services/kitchen-remodeling/",
      },
      {
        title: "Bathroom Remodeling",
        description: "Moisture-smart baths for Texas homes",
        icon: Bath,
        href: "/services/bathroom-remodeling/",
      },
      {
        title: "Whole Home Remodel",
        description: "Multi-room work under one plan",
        icon: Hammer,
        href: "/services/home-remodel/",
      },
      {
        title: "All Services",
        description: "Additions, showers, garages & more",
        icon: Building2,
        href: "/services/",
      },
    ],
  },
  {
    title: "Galleries",
    layout: "grid",
    items: [
      {
        title: "Custom Homes",
        description: "New construction projects",
        icon: Home,
        href: "/custom-homes-gallery/",
      },
      {
        title: "Remodeling",
        description: "Whole-home transformations",
        icon: Hammer,
        href: "/remodeling-gallery/",
      },
      {
        title: "Kitchens",
        description: "Kitchen remodels",
        icon: CookingPot,
        href: "/kitchen-remodeling-gallery/",
      },
      {
        title: "Bathrooms",
        description: "Bath & shower projects",
        icon: Images,
        href: "/bathroom-remodeling-gallery/",
      },
    ],
  },
  {
    title: "Areas",
    layout: "list",
    items: [
      {
        title: "Areas We Serve",
        description: "Richmond & Fort Bend County",
        icon: MapPin,
        href: "/areas-we-serve/",
      },
      {
        title: "Sugar Land",
        description: "Custom homes & remodels",
        icon: MapPin,
        href: "/sugar-land-tx/",
      },
      {
        title: "Katy",
        description: "Local remodeling team",
        icon: MapPin,
        href: "/katy-tx/",
      },
      {
        title: "Fulshear",
        description: "Builds & renovations",
        icon: MapPin,
        href: "/fulshear-tx/",
      },
    ],
  },
  { title: "FAQs", href: "/faqs/" },
];

/** Desktop/tablet → contact form; mobile can still dial from contact page or tel links in sheet */
const BookNowButton = ({
  className,
  overHero = false,
}: {
  className?: string;
  overHero?: boolean;
}) => (
  <Button
    className={cn(
      "h-9 px-5 w-full lg:w-fit font-semibold !bg-primary !text-white hover:!bg-primary/90 hover:!text-white",
      overHero && "shadow-md shadow-black/20",
      className,
    )}
    render={<a href="/contact/" />}
  >
    Book Now
  </Button>
);

/**
 * Sticky site chrome with NWS navigation.
 * On home at top of page: transparent over-hero treatment (hero pulls under via -mt).
 * On scroll / other routes: solid frosted bar.
 */
const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 24);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth >= 1024) setIsOpen(false);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  // Close mobile sheet on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Base UI uses data-popup-open / data-open (not Radix data-[state=open]).
  // Hover + open → primary orange (never muted white wash).
  const linkTone = overHero
    ? "text-sm font-medium !text-white/85 hover:!text-primary hover:!bg-primary/15 data-popup-open:!bg-primary/20 data-popup-open:!text-primary data-open:!bg-primary/20 data-open:!text-primary focus:!bg-primary/15 rounded-[4px] transition-colors"
    : "text-sm font-medium text-muted-foreground hover:!text-primary hover:!bg-primary/10 data-popup-open:!bg-primary/10 data-popup-open:!text-primary data-open:!bg-primary/10 data-open:!text-primary focus:!bg-primary/10 rounded-[4px] transition-colors";

  return (
    <header
      data-navbar="nws"
      data-over-hero={overHero ? "true" : "false"}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color,color] duration-200",
        // Over-hero: force link/trigger colors; open state uses Base UI data-popup-open
        overHero &&
          "[&_a[data-slot=navigation-menu-link]]:!text-white/85 [&_a[data-slot=navigation-menu-link]]:hover:!text-primary [&_button[data-slot=navigation-menu-trigger]]:!text-white/85 [&_button[data-slot=navigation-menu-trigger]]:hover:!text-primary [&_button[data-slot=navigation-menu-trigger]]:data-popup-open:!text-primary [&_button[data-slot=navigation-menu-trigger]]:data-open:!text-primary",
        overHero
          ? "bg-transparent border-transparent shadow-none"
          : scrolled
            ? "bg-background border-border/60 shadow-sm"
            : "bg-background border-border/40",
      )}
    >
      <div className="max-w-7xl mx-auto w-full min-w-0 px-4 sm:px-6">
        <nav className="w-full min-w-0 flex items-center justify-between gap-2 sm:gap-3 h-16 sm:h-[4.25rem]">
          <Link href="/" className="shrink-0 min-w-0" aria-label="NWS home">
            <Logo onDark={overHero} />
          </Link>

          <NavigationMenu className="max-lg:hidden">
            <NavigationMenuList className="flex gap-0.5">
              {navigationData.map((section) => (
                <NavigationMenuItem key={section.title}>
                  {section.items ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-9 px-2.5 py-1.5 border-none shadow-none bg-transparent",
                          linkTone,
                        )}
                      >
                        {section.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent
                        className={cn(
                          "p-2 pt-4 rounded-xl",
                          section.layout === "grid" ? "w-md" : "w-fit",
                        )}
                      >
                        <div
                          className={cn(
                            "pt-1",
                            section.layout === "grid"
                              ? "grid grid-cols-2"
                              : "flex flex-col",
                          )}
                        >
                          {section.items.map((item) => (
                            <NavigationMenuLink
                              key={item.title}
                              href={item.href || "#"}
                              className="flex items-center gap-3 rounded-lg hover:bg-muted/80 transition-all group mb-0 p-2"
                            >
                              <div className="flex items-center justify-center p-3 rounded-lg bg-muted group-hover:bg-background transition-colors min-w-10 h-10">
                                {item.icon ? <item.icon size={16} /> : null}
                              </div>
                              <div className="space-y-0.5">
                                <div className="text-sm font-medium text-foreground mb-0 flex items-center gap-1">
                                  <p className="!m-0">{item.title}</p>
                                  <ArrowRight
                                    size={12}
                                    className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground font-normal !m-0">
                                  {item.description}
                                </p>
                              </div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={section.href}
                      className={cn(
                        "h-9 px-2.5 py-1.5 inline-flex items-center",
                        linkTone,
                      )}
                    >
                      {section.title}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <BookNowButton
            className="hidden lg:inline-flex"
            overHero={overHero}
          />

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "rounded-[4px] h-10 w-10",
                      overHero
                        ? "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                        : "border border-border",
                    )}
                  />
                }
              >
                <TextAlignJustify size={20} />
                <span className="sr-only">Toggle Menu</span>
              </SheetTrigger>
              <SheetContent
                showCloseButton={false}
                side="right"
                className="min-w-80 p-0"
              >
                <ScrollArea className="h-full px-6 py-6">
                  <SheetHeader className="mb-4 p-0">
                    <SheetTitle className="text-left flex items-center justify-between">
                      <Logo />
                      <SheetClose className="absolute top-6 right-4 rounded-lg bg-black text-white p-2.5 cursor-pointer">
                        <X size={16} />
                      </SheetClose>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col">
                    {navigationData.map((section) =>
                      section.items ? (
                        <Collapsible key={section.title} className="w-full">
                          <CollapsibleTrigger className="flex items-center justify-between w-full py-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors group/collapsible">
                            {section.title}
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-aria-expanded/collapsible:rotate-180" />
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="flex flex-col">
                              {section.items.map((item) => (
                                <a
                                  key={item.title}
                                  href={item.href || "#"}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <div className="flex items-center justify-center p-2 rounded-md bg-muted min-w-8 h-8">
                                    {item.icon ? (
                                      <item.icon size={16} />
                                    ) : null}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-medium">
                                      {item.title}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {item.description}
                                    </span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ) : (
                        <a
                          key={section.title}
                          href={section.href}
                          className="text-base font-medium text-muted-foreground hover:text-foreground py-2 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {section.title}
                        </a>
                      ),
                    )}
                  </div>
                  <div className="mt-4">
                    <BookNowButton />
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
