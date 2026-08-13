"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Navbar from "@/components/shadcn-space/blocks/navbar-07/navbar";
import {
    ArrowRight,
    LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    canonicalServiceAreaCatalog,
    canonicalServiceCatalog,
} from "@/data/informationArchitecture";

// -- Types --

export type NavigationItem = {
    title: string;
    description?: string;
    icon?: LucideIcon;
    href?: string;
};

export type FeatureSection = {
    heading: string;
    items: NavigationItem[];
};

export type HighlightCard = {
    title: string;
    description?: string;
    href?: string;
    image?: string;
};

export type NavigationLink = {
    title: string;
    href: string;
    hasDropdown?: boolean;
    featureSections?: FeatureSection[];
    highlightCard?: HighlightCard;
};


function chunkItems(items: NavigationItem[], size: number): FeatureSection[] {
    const sections: FeatureSection[] = [];
    for (let i = 0; i < items.length; i += size) {
        sections.push({ heading: "", items: items.slice(i, i + size) });
    }
    return sections;
}

const serviceNavigationItems: NavigationItem[] = canonicalServiceCatalog.map(
    (service) => ({
        title: service.label,
        href: service.href,
    }),
);

const areaNavigationItems: NavigationItem[] = [
    {
        title: "All Areas We Serve",
        href: "/areas-we-serve/",
    },
    ...canonicalServiceAreaCatalog
        .filter((area) => area.href)
        .map((area) => ({
            title: area.label,
            href: area.href as string,
        })),
];

const galleryNavigationItems: NavigationItem[] = [
    { title: "Custom Homes Gallery", href: "/custom-homes-gallery/" },
    { title: "Remodeling Gallery", href: "/remodeling-gallery/" },
    { title: "Kitchen Remodeling Gallery", href: "/kitchen-remodeling-gallery/" },
    { title: "Bathroom Remodeling Gallery", href: "/bathroom-remodeling-gallery/" },
];

const navigationLinks: NavigationLink[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about/" },
    {
        title: "Services",
        href: "/services/",
        hasDropdown: true,
        featureSections: chunkItems(serviceNavigationItems, 4),
        highlightCard: {
            title: "View All Our Services",
            href: "/services/",
            image: "/images/kitchen-gallery-1.jpeg",
        },
    },
    {
        title: "Galleries",
        href: "/custom-homes-gallery/",
        hasDropdown: true,
        featureSections: chunkItems(galleryNavigationItems, 2),
        highlightCard: {
            title: "Custom Homes Gallery",
            href: "/custom-homes-gallery/",
            image: "/images/custom-homes-1.jpeg",
        },
    },
    {
        title: "Areas",
        href: "/areas-we-serve/",
        hasDropdown: true,
        featureSections: chunkItems(areaNavigationItems, 3),
        highlightCard: {
            title: "Areas We Serve",
            href: "/areas-we-serve/",
            image: "/images/custom-homes-6.jpeg",
        },
    },
    { title: "FAQs", href: "/faqs/" },
];

// -- Sub-Components (Mega Menu) --

const MegaMenuPanel = ({
    link,
    isVisible,
}: {
    link: NavigationLink;
    isVisible: boolean;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const gridRef = useRef<HTMLDivElement>(null);
    const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    const handleColumnEnter = (index: number) => {
        if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
        setHoveredIndex(index);
    };

    const handleColumnLeave = () => {
        leaveTimeoutRef.current = setTimeout(() => setHoveredIndex(null), 150);
    };

    const updateIndicator = useCallback((index: number | null) => {
        if (index === null || !columnRefs.current[index] || !gridRef.current)
            return;
        const gridRect = gridRef.current.getBoundingClientRect();
        const colRect = columnRefs.current[index]!.getBoundingClientRect();
        setIndicator({ left: colRect.left - gridRect.left, width: colRect.width });
    }, []);

    useEffect(() => {
        updateIndicator(hoveredIndex);
    }, [hoveredIndex, updateIndicator]);

    useEffect(() => {
        const onResize = () => updateIndicator(hoveredIndex);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [hoveredIndex, updateIndicator]);

    if (!link.featureSections) return null;

    return (
        <div
            className={cn(
                "w-full bg-white border border-black/5 shadow-xl shadow-black/10 rounded-2xl z-50 transition-all duration-300 ease-in-out overflow-hidden",
                isVisible
                    ? "opacity-100 max-h-125 translate-y-0 pointer-events-auto"
                    : "opacity-0 max-h-0 -translate-y-2 pointer-events-none",
            )}
        >
            <div className="w-full px-4 sm:px-6 py-6 xl:py-8 min-w-0">
                <div
                    ref={gridRef}
                    className={cn(
                        "grid gap-3 xl:gap-4 relative min-w-0",
                        link.highlightCard
                            ? "grid-cols-2 xl:grid-cols-4"
                            : "grid-cols-2 xl:grid-cols-3",
                    )}
                >
                    <div className="absolute " />

                    {link.featureSections.map((section, i) => (
                        <div key={i} className="min-w-0">
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <a
                                        key={item.title}
                                        href={item.href || "#"}
                                        className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 xl:py-3 hover:bg-primary hover:text-white transition-all group min-w-0"
                                    >
                                        <span className="text-base xl:text-lg font-medium text-foreground group-hover:text-white text-pretty leading-snug min-w-0">
                                            {item.title}
                                        </span>
                                        <ArrowRight
                                            size={16}
                                            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                        />
                                        {item.description ? (
                                        <span className="text-xs text-muted-foreground group-hover:text-white/80 font-normal leading-relaxed">
                                            {item.description}
                                        </span>
                                        ) : null}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {link.highlightCard && (
                        <div className="py-3 px-4 rounded-xl bg-muted flex flex-col items-start justify-between ">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-normal text-muted-foreground tracking-wide">
                                    More
                                </p>
                                <div className="flex flex-col">
                                    <p className="text-lg font-medium text-foreground tracking-wide ">
                                        {link.highlightCard.title}
                                    </p>
                                    {link.highlightCard.description ? (
                                    <p className="text-xs font-normal text-muted-foreground tracking-wide ">
                                        {link.highlightCard.description}
                                    </p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full">
                                <a
                                    href={link.highlightCard.href || "#"}
                                    aria-label={link.highlightCard.title}
                                    className="group relative block h-32 md:h-36 lg:h-40 overflow-hidden rounded-xl bg-muted transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
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

                    )}
                </div>
            </div>
        </div>
    );
};

// -- Entry Point Component --

const NavbarBlock = () => {
    return (
        <Navbar navigationLinks={navigationLinks} MegaMenuPanel={MegaMenuPanel} />
    );
};

export default NavbarBlock;
