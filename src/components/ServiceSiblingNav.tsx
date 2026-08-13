"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { canonicalServiceCatalog } from "@/data/informationArchitecture";
import { sourceServiceSidebarItem } from "@/data/homeCopy";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

export function ServiceSiblingNav() {
  const pathname = usePathname();

  return (
    <nav
      className="mt-12 sm:mt-14 rounded-2xl border border-border/60 bg-white p-8 sm:p-10 lg:p-12 shadow-sm"
      aria-label="Our Services"
      data-service-sibling-nav
    >
      <p className="sr-only">{sourceServiceSidebarItem}</p>
      <Reveal
        as="p"
        className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground !m-0 mb-8"
      >
        Our Services
      </Reveal>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {canonicalServiceCatalog.map((service) => {
          const active =
            pathname === service.href || pathname === service.href.replace(/\/$/, "");
          return (
            <li key={service.slug}>
              <Link
                href={service.href}
                className={cn(
                  "group flex items-center justify-between gap-3 rounded-xl border px-5 py-5 transition-colors",
                  active
                    ? "border-primary bg-primary !text-white"
                    : "border-border bg-muted/40 !text-foreground hover:border-primary/40 hover:bg-primary/5",
                )}
              >
                <span className="text-sm font-semibold leading-snug !text-inherit">
                  {service.label}
                </span>
                <ArrowRight
                  className={cn(
                    "size-4 shrink-0 transition-transform group-hover:translate-x-0.5",
                    active ? "text-white" : "text-primary",
                )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
