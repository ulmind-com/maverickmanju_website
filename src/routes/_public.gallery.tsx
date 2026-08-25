import { createFileRoute } from "@tanstack/react-router";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { Particles, SectionHeader } from "@/components/site/primitives";
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

/**
 * One gallery section. Images and video live together in a single admin-ordered
 * feed — there is no fixed limit on how many items can be published.
 */
function GalleryPage() {
  const {
    data: items,
    loading,
    error,
  } = useServiceData<GalleryItem[]>(GALLERY_KEY, getPublishedGalleryItems, []);

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 sm:pb-24">
        <div className="absolute inset-0 spotlight" />
        <Particles count={10} />
        <div className="container-mm relative">
          <SectionHeader
            eyebrow="Gallery"
            title="Moments of Magic"
            description="Don't just take my word for it. See the experience."
          />

          {loading ? (
            <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse border border-border bg-card" />
              ))}
            </div>
          ) : error ? (
            <p className="border border-dashed border-destructive/50 p-10 text-center text-sm text-destructive">
              {error}
            </p>
          ) : (
            <GalleryGrid items={items} />
          )}
        </div>
      </section>

      <BookingCta />
    </>
  );
}
