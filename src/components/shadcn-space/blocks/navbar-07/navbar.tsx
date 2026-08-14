"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { NavigationLink } from "@/components/shadcn-space/blocks/navbar-07";
import Logo from "@/assets/logo/logo";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
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
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronDown, TextAlignJustify, X } from "lucide-react";

interface NavbarProps {
    navigationLinks: NavigationLink[];
    MegaMenuPanel: React.ComponentType<{
        link: NavigationLink;
        isVisible: boolean;
    }>;
}

const Navbar = ({ navigationLinks, MegaMenuPanel }: NavbarProps) => {
    const pathname = usePathname();
    const [sticky, setSticky] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isHome = pathname === "/";
    const overHero = isHome && !sticky;

    useEffect(() => {
        const handleScroll = () => setSticky(window.scrollY >= 24);
        handleScroll();
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setActiveDropdown(null);
    }, [pathname]);

    const clearDropdownTimer = () => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };

    const handleMouseEnter = (title: string) => {
        clearDropdownTimer();
        setActiveDropdown(title);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 280);
    };

    return (
        <header
            ref={navRef}
            data-navbar="nws"
            data-over-hero={overHero ? "true" : "false"}
            className={cn(
                "sticky top-0 z-50 transition-all duration-300 bg-transparent",
                overHero &&
                    "[&_a[data-slot=navigation-menu-link]]:!text-white/90 [&_a[data-slot=navigation-menu-link]]:hover:!text-white",
            )}
        >
            <div
                className="relative max-w-7xl mx-auto w-full min-w-0 px-4 py-3 sm:px-6 sm:py-4"
                onMouseEnter={clearDropdownTimer}
                onMouseLeave={handleMouseLeave}
            >
                <nav
                    className={cn(
                        "w-full flex items-center h-14 sm:h-16 justify-between gap-2 sm:gap-3.5 lg:gap-4 xl:gap-6 transition-all duration-500 min-w-0",
                        sticky && !overHero
                            ? "pl-5 pr-3 py-2 bg-white border border-black/5 shadow-lg shadow-black/5 rounded-2xl overflow-hidden"
                            : "bg-transparent border-transparent",
                    )}
                >
                    <a href="/" className="flex items-center shrink-0 max-h-11 overflow-hidden pl-2 sm:pl-3">
                        <Logo onDark={overHero} />
                    </a>

                    {/* Desktop Nav */}
                    <NavigationMenu className="max-lg:hidden">
                        <NavigationMenuList className="gap-0.5">
                            {navigationLinks.map((link) => (
                                <NavigationMenuItem
                                    key={link.title}
                                    onMouseEnter={() =>
                                        link.hasDropdown && handleMouseEnter(link.title)
                                    }
                                >
                                    <NavigationMenuLink
                                        href={link.href}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "px-1.5 lg:px-2.5 xl:px-4 py-1.5 text-sm xl:text-base font-medium tracking-normal gap-1 bg-transparent",
                                            overHero
                                                ? "!text-white/90 hover:!text-white hover:bg-white/10"
                                                : "text-muted-foreground hover:text-foreground",
                                            activeDropdown === link.title &&
                                                (overHero
                                                    ? "bg-white/15 text-white"
                                                    : "bg-muted text-foreground"),
                                        )}
                                    >
                                        {link.title}
                                        {link.hasDropdown && (
                                            <ChevronDown
                                                size={14}
                                                className={cn(
                                                    "transition-transform duration-200",
                                                    activeDropdown === link.title && "rotate-180",
                                                )}
                                            />
                                        )}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex  gap-1">
                        <Button
                            className="hidden lg:flex h-auto px-5 py-2.5 rounded-lg hover:bg-primary/80 cursor-pointer !text-white"
                            render={<a href="/contact/" data-book-now-tel="tel:2812992309" />}
                        >
                            Book Now
                        </Button>

                    </div>

                    {/* Mobile Nav */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className={cn(
                                        "rounded-full border p-2 outline-none flex items-center justify-center cursor-pointer transition-colors h-10 w-10 lg:hidden",
                                        overHero
                                            ? "border-white/40 bg-white/10 text-white hover:bg-white/20 hover:text-white"
                                            : "border-border hover:bg-muted text-muted-foreground",
                                    )}
                                />
                            }
                        >
                            <TextAlignJustify size={20} />
                        </SheetTrigger>
                        <SheetContent
                            showCloseButton={false}
                            side="right"
                            className="w-[min(22rem,100vw)] max-w-full p-0"
                        >
                            <ScrollArea className="h-full">
                                <SheetHeader className=" p-0 border-b px-4 py-4">
                                    <SheetTitle className="text-left flex items-center justify-between">
                                        <Logo />
                                        <SheetClose className="absolute top-4 right-4 rounded-full border dark:text-white text-black p-2.5 cursor-pointer ">
                                            <X size={16} />
                                        </SheetClose>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col  px-4 py-5">
                                    {navigationLinks.map((link) =>
                                        link.hasDropdown ? (
                                            <Collapsible key={link.title} className="w-full">
                                                <CollapsibleTrigger className=" aria-expanded:text-foreground aria-expanded:bg-muted flex items-center justify-between w-full py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted p-2 rounded-lg transition-colors group/collapsible">
                                                    {link.title}
                                                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-aria-expanded/collapsible:rotate-180" />
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <div className="flex flex-col px-4 gap-0.5 mt-2">
                                                        {link.featureSections?.map((section) =>
                                                            section.items.map((item) => (
                                                                <a
                                                                    key={item.title}
                                                                    href={item.href || "#"}
                                                                    className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-primary hover:text-white transition-colors group"
                                                                    onClick={() => setIsOpen(false)}
                                                                >

                                                                    <div className="flex flex-col">
                                                                        <span className="text-lg font-medium group-hover:text-white">
                                                                            {item.title}
                                                                        </span>
                                                                        {item.description ? (
                                                                        <span className="text-xs text-muted-foreground group-hover:text-white/80">
                                                                            {item.description}
                                                                        </span>
                                                                        ) : null}
                                                                    </div>
                                                                </a>
                                                            )),
                                                        )}
                                                    </div>
                                                    {link.highlightCard ? (
                                                    <div className="py-3 px-4 rounded-xl bg-muted flex flex-col justify-between h-full min-h-67 mt-3 ">
                                                        <div>
                                                            <p className="text-sm font-normal text-muted-foreground tracking-wide h-5 mb-2">
                                                                More
                                                            </p>
                                                            <div>
                                                                <p className="text-base font-medium text-foreground tracking-wide ">
                                                                    {link.highlightCard.title}
                                                                </p>
                                                                {link.highlightCard.description ? (
                                                                <p className="text-xs font-normal text-muted-foreground tracking-wide ">
                                                                    {link.highlightCard.description}
                                                                </p>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <a
                                                                href={link.highlightCard.href || "/"}
                                                                aria-label={link.highlightCard.title}
                                                                className="group relative block h-40 overflow-hidden rounded-2xl bg-muted transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
                                                                onClick={() => setIsOpen(false)}
                                                            >
                                                                <div
                                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                                    style={{
                                                                        backgroundImage: `url(${link.highlightCard.image || "/images/custom-homes-1.jpeg"})`,
                                                                    }}
                                                                />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    ) : null}
                                                </CollapsibleContent>
                                            </Collapsible>
                                        ) : (
                                            <a
                                                key={link.title}
                                                href={link.href}
                                                className="text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg p-2 transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.title}
                                            </a>

                                        ),
                                    )}
                                    <div className="flex flex-col mt-5  gap-2">
                                        <Button
                                            className="w-full h-auto px-5 py-2.5 rounded-lg hover:bg-primary/80 cursor-pointer !text-white"
                                            render={<a href="/contact/" data-book-now-tel="tel:2812992309" />}
                                        >
                                            Book Now
                                        </Button>
                                    </div>
                                </div>
                            </ScrollArea>
                        </SheetContent>
                    </Sheet>
                </nav>

            {navigationLinks
                .filter((l) => l.hasDropdown)
                .map((link) => {
                    const isVisible = activeDropdown === link.title;
                    return (
                    <div
                        key={link.title}
                        className={cn(
                            "absolute left-4 right-4 sm:left-6 sm:right-6 top-full z-50 pt-3",
                            isVisible
                                ? "pointer-events-auto"
                                : "pointer-events-none invisible",
                        )}
                        onMouseEnter={() => {
                            if (isVisible) handleMouseEnter(link.title);
                        }}
                    >
                        <MegaMenuPanel
                            link={link}
                            isVisible={isVisible}
                        />
                    </div>
                    );
                })}
            </div>
        </header>
    );
};

export default Navbar;
