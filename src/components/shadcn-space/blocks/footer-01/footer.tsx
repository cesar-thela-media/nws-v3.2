import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { site } from "@/data/site";
import { canonicalServiceCatalog } from "@/data/informationArchitecture";

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.4V9.84c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.11.19 2.11.19v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.91h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 2.162c3.204 0 3.584.012 4.849.07 1.17.054 1.805.249 2.228.413.56.218.96.478 1.38.898s.68.82.898 1.38c.164.423.36 1.058.413 2.228.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.053 1.17-.249 1.805-.413 2.228a3.7 3.7 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.058.36-2.228.413-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.17-.053-1.805-.249-2.228-.413a3.7 3.7 0 0 1-1.38-.898c-.42-.42-.68-.82-.898-1.38-.164-.423-.36-1.058-.413-2.228-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.054-1.17.249-1.805.413-2.228.218-.56.478-.96.898-1.38s.82-.68 1.38-.898c.423-.164 1.058-.36 2.228-.413 1.265-.058 1.645-.07 4.849-.07M12 0C8.741 0 8.332.014 7.052.072 5.775.131 4.902.333 4.14.63a5.9 5.9 0 0 0-2.126 1.384A5.9 5.9 0 0 0 .63 4.14c-.297.763-.5 1.635-.558 2.912C.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.059 1.277.261 2.15.558 2.912.307.79.717 1.459 1.384 2.126A5.9 5.9 0 0 0 4.14 23.37c.763.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.059 2.15-.261 2.912-.558a5.9 5.9 0 0 0 2.126-1.384 5.9 5.9 0 0 0 1.384-2.126c.297-.763.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.059-1.277-.261-2.15-.558-2.912a5.9 5.9 0 0 0-1.384-2.126A5.9 5.9 0 0 0 19.86.63c-.763-.297-1.635-.5-2.912-.558C15.668.014 15.259 0 12 0m0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m7.846-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0"
      fill="currentColor"
    />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
  </svg>
);

const MapsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
  </svg>
);

type FooterData = {
  title: string;
  links: { title: string; href: string }[];
};

const footerSections: FooterData[] = [
  {
    title: "Services",
    links: [
      ...canonicalServiceCatalog.map((service) => ({
        title: service.label,
        href: service.href,
      })),
      { title: "View All Our Services", href: "/services/" },
    ],
  },
  {
    title: "Quick links",
    links: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about/" },
      { title: "Areas We Serve", href: "/areas-we-serve/" },
      { title: "Custom Homes Gallery", href: "/custom-homes-gallery/" },
      { title: "Remodeling Gallery", href: "/remodeling-gallery/" },
      { title: "FAQs", href: "/faqs/" },
      { title: "Contact", href: "/contact/" },
    ],
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 bg-primary text-white w-full max-w-full overflow-x-clip">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto w-full min-w-0">
        <div className="flex flex-col gap-6 sm:gap-12 min-w-0">
          <div className="py-10 sm:py-12 grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-x-6 sm:gap-x-8 gap-y-10 px-2 sm:px-6 xl:px-0">
            <div className="col-span-1 min-w-0 sm:col-span-2 lg:col-span-4">
              <div className="flex flex-col gap-6">
                <Link href="/" className="w-fit">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={site.logoOnDark}
                    alt={site.name}
                    width={160}
                    height={44}
                    className="h-11 w-auto max-h-11 object-contain object-left drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]"
                    style={{ height: 44, maxHeight: 44, width: "auto" }}
                  />
                </Link>
                <p className="text-base font-normal text-white/85 !m-0">
                  Custom homes & remodeling · Richmond, TX since 2007
                </p>
                <div
                  className="flex flex-wrap items-center gap-x-4 gap-y-3"
                  data-footer-socials
                >
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href={site.social.houzz}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    Houzz
                  </a>
                  <a
                    href={site.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <YouTubeIcon />
                  </a>
                  <a
                    href={site.social.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Google Maps"
                  >
                    <MapsIcon />
                  </a>
                  <a
                    href={site.social.googleReview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    Leave Us a Review!
                  </a>
                </div>
              </div>
            </div>

            {footerSections.map(({ title, links }, index) => (
              <div
                key={index}
                className={
                  title === "Services"
                    ? "col-span-1 min-[400px]:col-span-2 sm:col-span-2 lg:col-span-4"
                    : "col-span-1 sm:col-span-2 lg:col-span-2"
                }
              >
                <div className="flex flex-col gap-4">
                  <p className="text-base font-semibold text-white !m-0">
                    {title}
                  </p>
                  <ul
                    className={
                      title === "Services"
                        ? "grid grid-cols-2 gap-x-6 gap-y-3"
                        : "flex flex-col gap-3"
                    }
                  >
                    {links.map(({ title: linkTitle, href }) => (
                      <li key={linkTitle}>
                        <Link
                          href={href}
                          className="text-sm sm:text-base font-normal text-white/80 hover:text-white transition-colors break-words min-w-0 block"
                        >
                          {linkTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            <div className="col-span-full sm:col-span-2 lg:col-span-2">
              <div className="flex flex-col gap-4">
                <p className="text-base font-semibold text-white !m-0">
                  Contact
                </p>
                <ul className="flex flex-col gap-3">
                  <li>
                    <p className="text-base font-normal text-white/80 !m-0">
                      {site.location}
                    </p>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-base font-normal text-white/80 hover:text-white transition-colors"
                    >
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${site.phone.officeTel}`}
                      className="text-base font-normal text-white/80 hover:text-white transition-colors"
                    >
                      Office: {site.phone.office}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${site.phone.mobileTel}`}
                      className="text-base font-normal text-white/80 hover:text-white transition-colors"
                    >
                      Mobile: {site.phone.mobile}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Separator
            orientation="horizontal"
            className="bg-white/25 data-[orientation=horizontal]:bg-white/25"
          />
          <p className="text-sm font-normal text-white/75 text-center !m-0">
            ©{year}, NWS Custom Homes and Remodeling. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
