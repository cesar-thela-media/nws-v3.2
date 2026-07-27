import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ServicesCarouselHero } from "@/components/ServicesCarouselHero";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import { servicePages, getServicePage } from "@/data/servicePages";
import { serviceCards } from "@/data/services";
import { site } from "@/data/site";
import type { CardItem } from "@/components/shadcn-space/carousel/carousel-08";

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

const serviceImages = [
  "/images/custom-home-richmond-tx.jpg",
  "/images/home-remodeling-richmond-tx.jpg",
  "/images/kitchen-remodeling-richmond-tx.jpg",
  "/images/bathroom-remodeling-richmond-tx.jpg",
  "/images/whole-home-remodeling-richmond-tx.jpg",
  "/images/bathroom-gallery-1.jpeg",
  "/images/14-kitchen-after.jpg",
  "/images/home-addition-contractors.webp",
  "/images/Basement-Finishing.webp",
  "/images/garage-remodel.webp",
  "/images/open-concept.webp",
];

/** Service detail: carousel-08 hero, scannable visual body (no Overview), faq-07 + cta-08 */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const carouselCards: CardItem[] = serviceCards.map((s, i) => ({
    id: s.slug,
    category: s.slug === slug ? "This service" : "Service",
    title: s.title,
    src: serviceImages[i % serviceImages.length],
    href: s.href,
  }));

  const introShort = page.intro.slice(0, 1).map((p) =>
    p.length > 280 ? p.slice(0, 277).trim() + "..." : p,
  );
  const sectionHighlights = page.sections.slice(0, 4).map((section) => ({
    ...section,
    paragraphs: section.paragraphs
      ?.slice(0, 1)
      .map((p) => (p.length > 220 ? p.slice(0, 217).trim() + "..." : p)),
    bullets: section.bullets?.slice(0, 4),
  }));

  return (
    <>
      <ServicesCarouselHero
        label={page.heroLabel || "Service"}
        heading={page.heroTitle || page.h1}
        description={
          page.heroText && page.heroText.length > 160
            ? page.heroText.slice(0, 157).trim() + "..."
            : page.heroText
        }
        cards={carouselCards}
      />

      <section
        className="py-12 md:py-16 bg-primary text-white"
        data-service-visual-body
        data-service-orange-section
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/25 min-h-[16rem] lg:min-h-[22rem] shadow-lg">
                <Image
                  src={page.image || "/images/kitchen-gallery-1.jpeg"}
                  alt={page.imageAlt || page.breadcrumb}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="text-sm font-semibold text-white/90 !m-0">
                {page.breadcrumb}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white !m-0">
                {page.h1}
              </h2>
              {introShort.map((p) => (
                <p key={p.slice(0, 40)} className="text-white/85 !m-0">
                  {p}
                </p>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  className="rounded-[4px] h-11 !bg-white !text-primary hover:!bg-white/90"
                  render={<a href={`tel:${site.phone.officeTel}`} />}
                >
                  Call {site.phone.office}
                </Button>
                <Button
                  variant="outline"
                  className="rounded-[4px] h-11 !border-white/70 !bg-transparent !text-white hover:!bg-white/15 hover:!text-white shadow-none"
                  render={<Link href="/contact/" />}
                >
                  Request a consult
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sectionHighlights.map((section) => (
              <article
                key={section.heading}
                className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-5 sm:p-6"
              >
                <h3 className="text-lg font-bold text-white !m-0 mb-2">
                  {section.heading}
                </h3>
                {section.paragraphs?.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="text-sm text-white/85 !m-0 line-clamp-4"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-3 space-y-1.5 list-disc pl-5 text-sm text-white/80">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Faq
        items={
          page.faqs && page.faqs.length > 0
            ? page.faqs.map((faq) => ({
                question: faq.q,
                answer: faq.a,
              }))
            : undefined
        }
      />

      <CTA />
    </>
  );
}
