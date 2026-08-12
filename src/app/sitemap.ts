import type { MetadataRoute } from "next";
import { canonicalRoutes, metadataRules } from "@/data/informationArchitecture";

export default function sitemap(): MetadataRoute.Sitemap {
  return canonicalRoutes.map((route) => ({
    url: metadataRules.canonicalPath(route),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route.startsWith("/services/") ? 0.8 : 0.7,
  }));
}
