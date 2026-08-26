import { createFileRoute } from "@tanstack/react-router";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { TestimonialGroups } from "@/components/site/sections";

export const Route = createFileRoute("/_public/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials | Maverick Manju, Magician & Emcee" },
      {
        name: "description",
        content:
          "What schools, corporates, children's events and birthday party hosts say about Maverick Manju's magic, mentalism and emcee entertainment.",
      },
      { property: "og:title", content: "Client Testimonials | Maverick Manju" },
      { property: "og:description", content: "Real reactions. Real memories." },
      { property: "og:type", content: "website" },
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
