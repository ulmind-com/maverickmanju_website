import { createFileRoute } from "@tanstack/react-router";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { TestimonialGroups } from "@/components/site/sections";

export const Route = createFileRoute("/_public/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials & Reviews — Maverick Manju | Best Magician in Bangalore" },
      {
        name: "description",
        content:
          "Read what clients say about Maverick Manju — Bangalore's best magician, emcee and mentalist. Real reviews from corporate events, weddings, birthday parties and private celebrations across India.",
      },
      {
        name: "keywords",
        content:
          "best magician in bangalore, best magician in bengaluru, top magician in bangalore, best emcee in bangalore, best emcee in bengaluru, best mentalist in bangalore, maverick manju, mevrick manju, maverick manju magician, maverick manju emcee, maverick manju mentalist, maverick manju bangalore, maverick manju bengaluru, magician in bangalore, professional magician in bangalore",
      },
      { property: "og:title", content: "Testimonials — Maverick Manju | Best Magician in Bangalore" },
      { property: "og:description", content: "Real reactions. Real memories. See what clients say about Maverick Manju." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/testimonials" },
      { name: "twitter:title", content: "Testimonials — Maverick Manju | Best Magician in Bangalore" },
      { name: "twitter:description", content: "Read real client reviews about the best magician and emcee in Bangalore." },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/testimonials" },
    ],
  }),
  component: TestimonialsPage,
});

/**
 * Written and video testimonials, grouped under the four categories the admin
 * assigns. A category with nothing published in it is not rendered at all.
 */
function TestimonialsPage() {
  return (
    <>
      <TestimonialGroups className="pt-36 pb-20 sm:pb-24" />
      <BookingCta />
    </>
  );
}
