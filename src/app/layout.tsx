import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import Navbar from "@/components/shadcn-space/blocks/navbar-07";
import Footer from "@/components/shadcn-space/blocks/footer-01/footer";
import { cn } from "@/lib/utils";

/** base-nova / shadcn default, body + UI */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Glyph-style headings (bold) */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Custom Homes & Remodeling Richmond, TX | NWS Custom Homes and Remodeling",
    template: "%s | NWS Custom Homes and Remodeling",
  },
  description:
    "Local custom home builder and remodeler in Richmond, TX since 2007. Kitchens, baths, whole-home renovations, additions. Call (281) 299-2309.",
  metadataBase: new URL("https://www.nws-homes.com"),
  alternates: { canonical: "https://www.nws-homes.com/" },
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(geist.variable, manrope.variable, "font-sans")}
      style={
        {
          "--font-geist": geist.style.fontFamily,
          "--font-manrope": manrope.style.fontFamily,
        } as CSSProperties
      }
    >
      <body
        className={cn(
          geist.className,
          "min-h-screen antialiased bg-background text-foreground font-sans overflow-x-clip",
        )}
      >
        <AnnouncementBar />
        <Navbar />
        <main className="min-h-[50vh] w-full max-w-full overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
