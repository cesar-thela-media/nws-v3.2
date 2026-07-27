import HeroSection, {
  type Hero08Props,
} from "@/components/shadcn-space/blocks/hero-08/hero";

/** Production hero-08: content only (no demo navbar). */
export default function Hero08Nws(props: Hero08Props) {
  return <HeroSection {...props} />;
}

export type { Hero08Props };
