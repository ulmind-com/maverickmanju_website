import { Check } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { useServiceData } from "@/hooks/useServiceData";
import { useService } from "@/hooks/useServices";
import { GALLERY_KEY, getPublishedGalleryItems } from "@/services/galleryService";
import type { GalleryCategory, GalleryItem } from "@/types";
import { ButtonLink, Reveal, SectionHeader } from "./primitives";

/**
 * Which gallery heading each service page pulls its "recent events" from, so a
 * visitor on /stage-magic sees stage work rather than the whole feed.
 */
const GALLERY_CATEGORY_BY_SLUG: Record<string, GalleryCategory> = {
  "stage-magic": "Stage Magic",
  "walk-around-magic": "Walk Around",
  emcee: "Emcee",
  mentalism: "Mentalism",
};

export interface ServicePageContent {
  slug: string;
  eyebrow: string;
  headline: string;
  intro: string;
  why: { title: string; body: string }[];
  included: string[];
  suitableFor: string[];
  interaction: string;
}

export function ServiceDetailPage({ content }: { content: ServicePageContent }) {
  const service = useService(content.slug)!;
  const { data: gallery } = useServiceData<GalleryItem[]>(
    GALLERY_KEY,
    getPublishedGalleryItems,
    [],
  );
  // Every page shows everything filed under its own category. An empty one
  // hides the section rather than filling it with another service's work.
  const category = GALLERY_CATEGORY_BY_SLUG[content.slug];
  const shown = (category ? gallery.filter((g) => g.category === category) : gallery).map((g) => ({
    ...g,
    layout: "medium" as const,
  }));

  return (
    <>
      {/* No hero: the page opens straight on the work. pt-36 clears the fixed bar. */}
      {shown.length > 0 && (
        <section className="border-t border-border bg-surface pt-36 pb-20 sm:pb-24">
          <div className="container-mm">
            <SectionHeader eyebrow="Moments" title="From recent events" />
            <GalleryGrid items={shown} />
            <div className="mt-8">
              <ButtonLink to="/gallery" variant="outline">
                View full gallery
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      <BookingCta label={service.ctaLabel} />
    </>
  );
}

export function BookingCta({ label = "Book Maverick Manju" }: { label?: string }) {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 sm:py-24">
      <div className="absolute inset-0 spotlight" />
      <div className="container-mm relative text-center">
        <p className="text-[11px] font-bold tracking-[0.3em] text-primary-glow uppercase">
          Let's create some magic
        </p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] leading-tight font-bold">
          Share your date. I'll handle the wonder.
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/book">{label}</ButtonLink>
          <ButtonLink to="/contact" variant="outline">
            Contact
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
