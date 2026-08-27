import { createFileRoute } from "@tanstack/react-router";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { MomentsOfMagic } from "@/components/site/sections";

export const Route = createFileRoute("/_public/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Maverick Manju Magic Show Photos & Videos | Bangalore Magician" },
      {
        name: "description",
        content:
          "See Maverick Manju in action — photos and videos from magic shows, mentalism performances and emcee events across Bangalore, Karnataka and India. Real moments from corporate events, weddings and private celebrations.",
      },
      {
        name: "keywords",
        content:
          "magic show in bangalore, magic show in bengaluru, best magic show in bangalore, best magic show in bengaluru, magician show in bangalore, magician show in bengaluru, mentalism show in bangalore, best magician in bangalore, best magician in bengaluru, best emcee in bangalore, maverick manju, maverick manju magician, maverick manju bangalore, maverick manju bengaluru",
      },
      { property: "og:title", content: "Gallery — Maverick Manju | Magic Show Photos & Videos" },
      { property: "og:description", content: "Moments of magic — see the experience from real events." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/gallery" },
      { name: "twitter:title", content: "Gallery — Maverick Manju | Magic Show Photos & Videos" },
      { name: "twitter:description", content: "See Maverick Manju in action at magic shows and events across Bangalore." },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/gallery" },
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
