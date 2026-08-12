import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ServiceDetailHero } from "@/components/ServiceDetailHero";
import { ServiceDetailSections } from "@/components/ServiceDetailSections";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
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

/**
 * Service detail: gallery-03 hero with slug-relevant photos (not hub carousel),
 * orange visual body, faq-07 (no help band), cta-08.
 */
export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const introParagraphs = page.intro;
  const sectionHighlights = page.sections;

  return (
    <>
      <ServiceDetailHero
        slug={slug}
        eyebrow={page.heroLabel || page.breadcrumb || "Service"}
        heading={page.heroTitle || page.h1}
        description={page.heroText}
        ctaLabel={page.heroCta}
        ctaHref={page.heroCtaHref}
      />

      <section
        className="py-12 md:py-16 bg-primary text-white w-full max-w-full overflow-x-clip"
        data-service-visual-body
        data-service-orange-section
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            <div className="lg:col-span-5 min-w-0">
              <div className="relative rounded-2xl overflow-hidden border border-white/25 min-h-[14rem] sm:min-h-[16rem] lg:min-h-[22rem] shadow-lg">
                <Image
                  src={page.image || "/images/kitchen-gallery-1.jpeg"}
                  alt={page.imageAlt || page.breadcrumb}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 flex flex-col gap-4 min-w-0">
              <p className="text-sm font-semibold text-white/90 !m-0">
                {page.breadcrumb}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white !m-0 text-balance">
                {page.h1}
              </h2>
              {introParagraphs.map((p) => (
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

          <ServiceDetailSections sections={sectionHighlights} />
        </div>
      </section>

      {page.faqs && page.faqs.length > 0 ? (
        <Faq
          heading={page.faqHeading || "FREQUENTLY ASKED QUESTIONS"}
          items={page.faqs.map((faq) => ({
            question: faq.q,
            answer: faq.a,
          }))}
        />
      ) : null}

      <CTA
        eyebrow={page.ctaLabel}
        title={page.ctaTitle}
        text={page.ctaText}
        buttonLabel={page.ctaButton}
      />
    </>
  );
}
