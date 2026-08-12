import type { Metadata } from "next";
import { metadataRules } from "./informationArchitecture";

export function pageMetadata(
  pathname: string,
  title: string,
  description: string,
): Metadata {
  const fullTitle = title.includes("NWS Custom Homes and Remodeling")
    ? title
    : title;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: metadataRules.canonicalPath(pathname) },
    openGraph: { title: fullTitle, description, url: metadataRules.canonicalPath(pathname), type: "website" },
  };
}
