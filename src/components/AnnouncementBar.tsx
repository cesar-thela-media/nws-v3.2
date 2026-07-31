import Link from "next/link";
import { site } from "@/data/site";

/** Slim promo strip, Glyph orange primary */
export function AnnouncementBar() {
  return (
    <div className="w-full max-w-full bg-primary text-primary-foreground overflow-x-clip">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-3 sm:px-4 py-2 text-center text-[0.7rem] leading-snug sm:text-sm font-medium tracking-tight">
        <span className="min-w-0 text-balance">
          Free consultation · 5% off when you mention this website
        </span>
        <span className="hidden sm:inline text-white/50" aria-hidden>
          |
        </span>
        <Link
          href={`tel:${site.phone.officeTel}`}
          className="hidden sm:inline underline underline-offset-2 hover:text-white/90 whitespace-nowrap"
        >
          Call {site.phone.office}
        </Link>
      </div>
    </div>
  );
}
