import HeroSection, {
  type Hero12Props,
} from "@/components/shadcn-space/blocks/hero-12/hero";

/** Production hero-12: content only (no demo navbar). */
export default function Hero12Nws(props: Hero12Props) {
  return <HeroSection {...props} />;
}

export type { Hero12Props };
