import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { Particles, Reveal, SectionHeader } from "@/components/site/primitives";
import { useServiceData } from "@/hooks/useServiceData";
import { TESTIMONIALS_KEY, getPublishedTestimonials } from "@/services/testimonialService";
import { TESTIMONIAL_CATEGORIES, type Testimonial, type TestimonialCategory } from "@/types";

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
  const {
    data: testimonials,
    loading,
    error,
  } = useServiceData<Testimonial[]>(TESTIMONIALS_KEY, getPublishedTestimonials, []);

  const groups = useMemo(
    () =>
      TESTIMONIAL_CATEGORIES.map((category) => ({
        category,
        items: testimonials.filter((t) => (t.category ?? "Corporates") === category),
      })).filter((group) => group.items.length > 0),
    [testimonials],
  );

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 sm:pb-24">
        <div className="absolute inset-0 spotlight" />
        <Particles count={10} />
        <div className="container-mm relative">
          <SectionHeader
            eyebrow="Testimonials"
            title="Client Testimonials"
            description="Real reactions. Real memories."
          />

          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 animate-pulse border border-border bg-card" />
              ))}
            </div>
          ) : error ? (
            <p className="border border-dashed border-destructive/50 p-10 text-center text-sm text-destructive">
              {error}
            </p>
          ) : groups.length === 0 ? (
            <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No published testimonials yet.
            </p>
          ) : (
            <div className="space-y-16">
              {groups.map(({ category, items }) => (
                <CategoryGroup key={category} category={category} items={items} />
              ))}
            </div>
          )}
        </div>
      </section>

      <BookingCta />
    </>
  );
}

function CategoryGroup({
  category,
  items,
}: {
  category: TestimonialCategory;
  items: Testimonial[];
}) {
  return (
    <div>
      <div className="mb-7 flex items-center gap-4">
        <h3 className="font-display text-2xl whitespace-nowrap sm:text-3xl">{category}</h3>
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          {items.length} {items.length === 1 ? "review" : "reviews"}
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t, i) => (
          <Reveal key={t.id} delay={i * 0.05}>
            <TestimonialCard testimonial={t} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
