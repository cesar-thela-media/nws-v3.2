import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">NWS Custom Homes and Remodeling</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Page not found</h1>
        <p className="text-lg text-muted-foreground">The page you requested is not available. Explore our services or contact the Richmond team to get started.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button render={<Link href="/" />}>Go home</Button>
          <Button variant="outline" render={<Link href="/services/" />}>View services</Button>
          <Button variant="outline" render={<Link href="/areas-we-serve/" />}>Areas we serve</Button>
          <Button variant="outline" render={<Link href="/contact/" />}>Contact us</Button>
          <Button variant="outline" render={<a href="tel:2812992309" />}>Call (281) 299-2309</Button>
        </div>
      </div>
    </main>
  );
}
