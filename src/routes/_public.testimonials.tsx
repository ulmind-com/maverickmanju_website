import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { Reveal, SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/data/seed";
import { useServiceData } from "@/hooks/useServiceData";
import { TESTIMONIALS_KEY, getPublishedTestimonials } from "@/services/testimonialService";
import type { Testimonial } from "@/types";

export const Route = createFileRoute("/_public/testimonials")({
  head: () => ({
    meta: [
      { title: "Client Testimonials | Maverick Manju, Magician & Emcee" },
      {
        name: "description",
        content:
          "What corporate organisers, wedding hosts and clubhouse committees say about Maverick Manju's magic, mentalism and emcee entertainment.",
      },
      { property: "og:title", content: "Client Testimonials | Maverick Manju" },
      { property: "og:description", content: "Real reactions. Real memories." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { data: testimonials, loading } = useServiceData<Testimonial[]>(
    TESTIMONIALS_KEY,
    getPublishedTestimonials,
    [],
  );

  const featured = testimonials.filter((t) => t.featured);
  const rest = testimonials.filter((t) => !t.featured);

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title={
          <>
            Real reactions.
            <br />
            <span className="text-primary">Real memories.</span>
          </>
        }
        subtitle="Feedback from corporate organisers, hotels, clubhouses and families."
        image={IMAGES.emcee}
      />

      {featured.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="container-mm">
            <SectionHeader eyebrow="Featured" title="In their words" className="mb-8" />
            <div className="grid gap-5 lg:grid-cols-2">
              {featured.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.06}>
                  <TestimonialCard testimonial={t} featured />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-border bg-surface py-16 sm:py-20">
        <div className="container-mm">
          <SectionHeader eyebrow="All reviews" title="From recent events" className="mb-8" />
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading testimonials…</p>
          ) : rest.length === 0 && featured.length === 0 ? (
            <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No published testimonials yet.
            </p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {(rest.length ? rest : testimonials).map((t, i) => (
                <Reveal key={t.id} delay={i * 0.05}>
                  <TestimonialCard testimonial={t} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <BookingCta />
    </>
  );
}
