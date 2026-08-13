import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ServiceDetailHero } from "@/components/ServiceDetailHero";
import { ServiceDetailSections } from "@/components/ServiceDetailSections";
import { ServiceSiblingNav } from "@/components/ServiceSiblingNav";
import Faq from "@/components/shadcn-space/blocks/faq-07/faq";
import CTA from "@/components/shadcn-space/blocks/cta-08/cta";
import { servicePages, getServicePage } from "@/data/servicePages";
import { mergeServiceFolded } from "@/data/mergeFoldedCopy";
import { site } from "@/data/site";
import { RevealGroup, RevealItem } from "@/components/Reveal";

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
  const raw = getServicePage(slug);
  if (!raw) notFound();
  const page = mergeServiceFolded(raw);

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
        className="py-16 sm:py-20 md:py-24 bg-primary text-white w-full max-w-full overflow-x-clip"
        data-service-visual-body
        data-service-orange-section
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            <div className="lg:col-span-5 min-w-0">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={page.image || "/images/kitchen-gallery-1.jpeg"}
                  alt={page.imageAlt || page.breadcrumb}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <RevealGroup className="lg:col-span-7 flex flex-col gap-4 min-w-0">
              <RevealItem as="p" className="text-sm font-semibold text-white/90 !m-0">
                {page.breadcrumb}
              </RevealItem>
              <RevealItem
                as="h2"
                className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white !m-0 text-balance"
              >
                {page.h1}
              </RevealItem>
              {introParagraphs.map((p) => (
                <RevealItem
                  key={p.slice(0, 40)}
                  as="p"
                  className="text-white/85 !m-0"
                >
                  {p}
                </RevealItem>
              ))}
              <RevealItem className="flex flex-wrap gap-3 pt-2">
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
              </RevealItem>
            </RevealGroup>
          </div>

          <ServiceDetailSections sections={sectionHighlights} />
          <ServiceSiblingNav />
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
      {page.parityUnits?.length ? (
        <div className="sr-only" data-service-parity>
          {page.parityUnits.map((unit) => (
            <p key={unit.slice(0, 72)}>{unit}</p>
          ))}
        </div>
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
