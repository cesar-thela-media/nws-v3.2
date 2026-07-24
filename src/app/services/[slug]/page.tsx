import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CTABanner } from "@/components/CTABanner";
import { servicePages, getServicePage } from "@/data/servicePages";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
  };
}

/** Service detail: split hero + Overview band + narrow reading column */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const overviewImageSrc =
    page.overviewImage || page.image || "/images/kitchen-gallery-1.jpeg";
  const overviewImageAlt =
    page.overviewImageAlt || page.imageAlt || page.breadcrumb;

  return (
    <>
      <section
        className="grid grid-cols-1 lg:grid-cols-2 min-h-[min(72svh,680px)]"
        data-service-split-hero
      >
        <div className="relative min-h-[18rem] lg:min-h-full order-1 lg:order-2">
          <Image
            src={page.image || "/images/kitchen-gallery-1.jpeg"}
            alt={page.imageAlt || page.breadcrumb}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/10"
            aria-hidden
          />
        </div>
        <div className="relative flex flex-col justify-center gap-5 px-6 sm:px-10 lg:px-16 py-16 bg-[#12181b] text-white order-2 lg:order-1 overflow-hidden">
          <div
            className="absolute inset-0 bg-[color-mix(in_oklab,var(--primary)_10%,transparent)] pointer-events-none"
            aria-hidden
          />
          <div className="relative z-10 flex flex-col gap-5">
            <nav className="text-sm text-white/60">
              <Link href="/" className="hover:text-primary text-white/70">
                Home
              </Link>
              <span className="mx-2 text-white/35">/</span>
              <Link href="/services/" className="hover:text-primary text-white/70">
                Services
              </Link>
              <span className="mx-2 text-white/35">/</span>
              <span className="text-white">{page.breadcrumb}</span>
            </nav>
            {page.heroLabel && (
              <p className="text-sm font-semibold text-primary !m-0">
                {page.heroLabel}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white !m-0">
              {page.heroTitle || page.h1}
            </h1>
            <p className="text-white/80 text-base sm:text-lg !m-0 max-w-xl">
              {page.heroText}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                className="rounded-[4px] h-11 !text-white"
                render={
                  <a href={`tel:${site.phone.officeTel}`}>
                    {page.heroCta || "Get in touch"}
                  </a>
                }
              >
                {page.heroCta || "Get in touch"}
              </Button>
              <Button
                variant="outline"
                data-dark-outline-cta
                className="rounded-[4px] h-11 !border-white/70 !bg-transparent !text-white hover:!bg-white/15 hover:!text-white shadow-none"
                render={<Link href="/remodeling-gallery/" data-dark-outline-cta="" />}
              >
                View our work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview: side image prefers overviewImage so it can differ from hero */}
      <section
        className="py-12 md:py-16 bg-background border-b border-border"
        data-service-overview
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-border min-h-[16rem] lg:min-h-[20rem]">
                <Image
                  src={overviewImageSrc}
                  alt={overviewImageAlt}
                  fill
                  className="object-cover"
                  data-service-overview-image
                />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-4 prose-nws">
              <p className="text-sm font-semibold text-primary !m-0">Overview</p>
              <h2 className="text-[26px] md:text-[32px] text-foreground font-bold tracking-tight !m-0">
                {page.h1}
              </h2>
              {page.intro.map((p) => (
                <p key={p.slice(0, 40)} data-service-overview-intro>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-14 md:py-20 bg-background"
        data-service-longform
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose-nws">
          {page.sections.map((section) => (
            <div key={section.heading} className="mt-10 first:mt-0">
              <h3>{section.heading}</h3>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {section.subBlocks?.map((block) => (
                <div key={block.title} className="mb-6">
                  <h4>{block.title}</h4>
                  <ul>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          {page.faqs && page.faqs.length > 0 && (
            <div className="mt-14">
              <h2 className="section-title">FAQ</h2>
              <div className="mt-4 space-y-3">
                {page.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="rounded-xl border border-border bg-muted/30 p-4"
                  >
                    <summary className="font-semibold cursor-pointer">
                      {faq.q}
                    </summary>
                    <div className="mt-2 text-muted-foreground">{faq.a}</div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABanner
        label={page.ctaLabel || "Get in Touch"}
        title={page.ctaTitle || "Let's Get Started"}
        text={
          page.ctaText ||
          "Contact NWS Custom Homes and Remodeling today to discuss your project."
        }
        ctaLabel={page.ctaButton || "Call Now"}
        ctaHref={`tel:${site.phone.officeTel}`}
      />
    </>
  );
}
