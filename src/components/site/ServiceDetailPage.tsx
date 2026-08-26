import { Check } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { TestimonialGrid } from "@/components/site/TestimonialGrid";
import { useServiceData } from "@/hooks/useServiceData";
import { useService } from "@/hooks/useServices";
import { GALLERY_KEY, getPublishedGalleryItems } from "@/services/galleryService";
import { TESTIMONIALS_KEY, getPublishedTestimonials } from "@/services/testimonialService";
import type { GalleryCategory, GalleryItem, Testimonial } from "@/types";
import { PageHero } from "./PageHero";
import { ButtonLink, Reveal, SectionHeader } from "./primitives";

/**
 * Which gallery heading each service page pulls its "recent events" from, so a
 * visitor on /stage-magic sees stage work rather than the whole feed.
 *
 * Mentalism has no gallery category of its own — the gallery is filed under
 * Stage Magic, Emcee and Walk Around — so it falls back to the newest items
 * instead of rendering an empty section.
 */
const GALLERY_CATEGORY_BY_SLUG: Record<string, GalleryCategory> = {
  "stage-magic": "Stage Magic",
  "walk-around-magic": "Walk Around",
  emcee: "Emcee",
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
  const { data: testimonials } = useServiceData<Testimonial[]>(
    TESTIMONIALS_KEY,
    getPublishedTestimonials,
    [],
  );

  const category = GALLERY_CATEGORY_BY_SLUG[content.slug];
  // A page with its own category shows everything filed under it. An unmapped
  // one (mentalism) is borrowing the general feed, so it stays a short preview.
  // A mapped category that happens to be empty hides the section rather than
  // filling it with another service's work.
  const shown = (
    category ? gallery.filter((g) => g.category === category) : gallery.slice(0, 3)
  ).map((g) => ({ ...g, layout: "medium" as const }));

  return (
    <>
      <PageHero
        eyebrow={content.eyebrow}
        title={content.headline}
        subtitle={content.intro}
        image={service.imageUrl}
      >
        <ButtonLink to="/book">{service.ctaLabel}</ButtonLink>
        <ButtonLink to="/gallery" variant="outline">
          See The Experience
        </ButtonLink>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="container-mm grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={service.imageUrl}
              alt={service.title}
              loading="lazy"
              className="w-full max-h-[520px] border border-border object-contain bg-black"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader
              eyebrow="The Experience"
              title={service.title}
              description={service.fullDescription}
              className="mb-8"
            />
            <ul className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 border-b border-border py-3 text-sm text-muted-foreground"
                >
                  <span className="text-primary">✦</span>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader eyebrow="Why it works" title="Built around your audience" />
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {content.why.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="h-full bg-[#0d0d0f] p-8">
                  <p className="font-display text-xs tracking-[0.2em] text-primary">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-xl">{w.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-mm grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="What's included" title="In the booking" className="mb-6" />
            <ul className="space-y-3">
              {content.included.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader eyebrow="Suitable events" title="Where it fits" className="mb-6" />
            <div className="flex flex-wrap gap-2">
              {content.suitableFor.map((s) => (
                <span
                  key={s}
                  className="border border-border px-3.5 py-2 text-xs tracking-[0.1em] text-muted-foreground uppercase"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="card-mm mt-8 border-l-2 border-l-primary p-6">
              <h3 className="font-display text-lg">Audience Interaction</h3>
              <p className="mt-2 text-sm text-muted-foreground">{content.interaction}</p>
            </div>
          </div>
        </div>
      </section>

      {shown.length > 0 && (
        <section className="border-t border-border bg-surface py-20 sm:py-24">
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

      {testimonials.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="container-mm">
            <SectionHeader eyebrow="Client words" title="Real reactions" />
            <TestimonialGrid items={testimonials.slice(0, 3)} />
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
