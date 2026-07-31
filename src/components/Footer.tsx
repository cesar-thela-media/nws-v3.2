import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";

const services = [
  { label: "Custom Home Building", href: "/services/custom-home-builder/" },
  { label: "Remodeling", href: "/services/remodeling-company/" },
  { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling/" },
  { label: "Bathroom Remodeling", href: "/services/bathroom-remodeling/" },
  { label: "Whole Home Remodeling", href: "/services/home-remodel/" },
  { label: "Shower Remodel", href: "/services/bathroom-shower-remodel/" },
  { label: "Bathtub Remodel", href: "/services/bathtub-remodeling/" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Areas We Serve", href: "/areas-we-serve/" },
  { label: "Custom Homes Gallery", href: "/custom-homes-gallery/" },
  { label: "Remodeling Gallery", href: "/remodeling-gallery/" },
  { label: "Contact", href: "/contact/" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-white relative overflow-hidden">
      <div className="container py-14 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        <div>
          <Image
            src={site.logo}
            alt={site.name}
            width={200}
            height={115}
            className="h-20 w-auto mb-5 brightness-0 invert"
          />
          <ul className="space-y-2 text-sm text-[var(--color-footer-muted)]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="hover:text-white transition-colors"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.officeTel}`}
                className="hover:text-white transition-colors"
              >
                Office: {site.phone.office}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.mobileTel}`}
                className="hover:text-white transition-colors"
              >
                Mobile: {site.phone.mobile}
              </a>
            </li>
            <li>{site.location}</li>
          </ul>
          <div className="flex flex-wrap gap-3 mt-5">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors text-sm font-semibold"
              aria-label="Facebook"
            >
              f
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors text-sm font-semibold"
              aria-label="Instagram"
            >
              ig
            </a>
            <a
              href={site.social.houzz}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors text-xs font-semibold"
              aria-label="Houzz"
            >
              Hz
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors text-xs font-semibold"
              aria-label="YouTube"
            >
              YT
            </a>
            <a
              href={site.social.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] transition-colors text-xs font-semibold"
              aria-label="Google Maps"
            >
              Map
            </a>
          </div>
          <a
            href="https://g.page/r/review"
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-5 inline-flex"
          >
            Leave Us a Review!
          </a>
        </div>

        <div>
          <h4 className="text-white text-lg mb-4 font-bold">Services</h4>
          <ul className="space-y-2 text-sm text-[var(--color-footer-muted)]">
            {services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="hover:text-white transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services/"
                className="hover:text-white transition-colors font-semibold text-white/90"
              >
                View All Our Services
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-lg mb-4 font-bold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[var(--color-footer-muted)]">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-4 text-center text-sm text-[var(--color-footer-muted)]">
          ©{new Date().getFullYear()}, NWS Custom Homes and Remodeling. All
          Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
