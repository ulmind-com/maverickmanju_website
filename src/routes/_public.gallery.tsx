import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/site/PageHero";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/data/seed";
import { useServiceData } from "@/hooks/useServiceData";
import { GALLERY_KEY, getPublishedGalleryItems } from "@/services/galleryService";
import type { GalleryItem } from "@/types";

export const Route = createFileRoute("/_public/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Photos & Video from Maverick Manju Shows" },
      {
        name: "description",
        content:
          "Photos and video from stage magic shows, hotel brunch walk-around magic, mentalism performances and emcee events by Maverick Manju.",
      },
      { property: "og:title", content: "Gallery | Maverick Manju" },
      { property: "og:description", content: "Moments of magic — see the experience." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GalleryPage,
});

const FILTERS = [
  "All",
  "Stage Magic",
  "Walk-Around Magic",
  "Mentalism",
  "Emcee",
  "Corporate",
  "Birthday",
  "Wedding",
  "Hotel",
  "Clubhouse",
] as const;

function GalleryPage() {
  const { data: items, loading } = useServiceData<GalleryItem[]>(
    GALLERY_KEY,
    getPublishedGalleryItems,
    [],
  );
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const featured = useMemo(() => items.filter((i) => i.featured), [items]);
  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((i) => i.category === filter)),
    [items, filter],
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Moments of
            <br />
            <span className="text-primary">magic.</span>
          </>
        }
        subtitle="Images and video from recent stages, brunches, weddings and celebrations."
        image={IMAGES.heroStage}
      />

      {featured.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-mm">
            <SectionHeader eyebrow="Featured" title="Highlights" className="mb-8" />
            <GalleryGrid items={featured} />
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container-mm">
          <SectionHeader eyebrow="Full gallery" title="Browse by experience" className="mb-8" />
          <div className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`border px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors ${
                  filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse border border-border bg-card" />
              ))}
            </div>
          ) : (
            <GalleryGrid items={filtered} />
          )}
        </div>
      </section>

      <BookingCta />
    </>
  );
}
