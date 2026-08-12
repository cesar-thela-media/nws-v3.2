import type { MetadataRoute } from "next";
import { metadataRules } from "@/data/informationArchitecture";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${metadataRules.siteUrl}/sitemap.xml`,
  };
}
