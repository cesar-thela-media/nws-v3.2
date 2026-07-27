import { BentoGridHeader } from "@/components/shadcn-space/blocks/bento-grid-02/bento-grid-header";
import { WorkspaceMockup } from "@/components/shadcn-space/blocks/bento-grid-02/workspace-mockup";
import { FeatureCardsGrid } from "@/components/shadcn-space/blocks/bento-grid-02/feature-cards-grid";

/** About page bento - NWS Fort Bend copy (replaces feature-18 on About) */
const Bentogrid = () => {
  return (
    <section
      className="py-12 md:py-20 lg:py-24 pb-16 md:pb-24 bg-muted/40"
      data-bento-grid-02
      data-about-nws-spacing
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 flex flex-col gap-8 sm:gap-12">
        <BentoGridHeader />
        <div className="flex flex-col gap-6">
          <WorkspaceMockup />
          <FeatureCardsGrid />
        </div>
      </div>
    </section>
  );
};

export default Bentogrid;
