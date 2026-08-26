import { createFileRoute } from "@tanstack/react-router";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { MomentsOfMagic } from "@/components/site/sections";

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
  return (
    <>
      <MomentsOfMagic className="pt-36 pb-20 sm:pb-24" />
      <BookingCta />
    </>
  );
}
