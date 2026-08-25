import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { ButtonLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { IMAGES, services } from "@/data/seed";

export const Route = createFileRoute("/_public/services")({
  head: () => ({
    meta: [
      { title: "Services | Magician, Emcee & Mentalist — Maverick Manju" },
      {
        name: "description",
        content:
          "Stage magic, walk-around magic, mentalism, emcee hosting and full-event entertainment packages for corporate events, weddings, birthdays, hotels and clubhouses.",
      },
      { property: "og:title", content: "Services | Maverick Manju" },
      {
        property: "og:description",
        content: "Ten entertainment formats, one professional. Choose the experience for your event.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            Entertainment
            <br />
            <span className="text-primary">formats.</span>
          </>
        }
        subtitle="Every event has a different room, audience and run-of-show. Pick the format — or combine them."
        image={IMAGES.emcee}
      >
        <ButtonLink to="/book">Book Maverick Manju</ButtonLink>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader eyebrow="Core performances" title="The signature four" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {services.slice(0, 4).map((service, i) => (
        <ServicePreview key={service.slug} service={service} index={i} reverse={i % 2 === 1} />
      ))}



      <section className="border-t border-border bg-surface py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader
            eyebrow="Event packages"
            title="Formats by occasion"
            description="Content, timing and interaction adjusted for the audience and the venue."
          />
          <div className="space-y-5">
            {services.slice(4).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.04}>
                <article className="card-mm grid gap-6 p-6 md:grid-cols-[280px_1fr] hover:border-primary/50 hover:glow-red">
                  <img
                    src={s.imageUrl}
                    alt={s.title}
                    loading="lazy"
                    className="h-52 w-full border border-border object-cover md:h-full"
                  />
                  <div>
                    <h3 className="font-display text-2xl">{s.title}</h3>
                    <p className="mt-1 text-sm text-primary-glow">{s.shortDescription}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{s.fullDescription}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.highlights.map((h) => (
                        <span
                          key={h}
                          className="border border-border px-3 py-1.5 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6">
                      <ButtonLink to={s.page ?? "/book"} variant="outline">
                        {s.ctaLabel}
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
