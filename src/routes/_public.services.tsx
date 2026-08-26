import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { EventPackages, ServicePreview } from "@/components/site/sections";
import { ButtonLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { useServices } from "@/hooks/useServices";

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
        content:
          "Ten entertainment formats, one professional. Choose the experience for your event.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  // Copy is fixed; the section images come from the admin panel.
  const services = useServices();

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
        {...(services[3] ? { image: services[3].imageUrl } : {})}
      >
        <ButtonLink to="/book">Book Maverick Manju</ButtonLink>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader eyebrow="Core performances" title="The signature four" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {services.map((service, i) => (
        <ServicePreview key={service.slug} service={service} index={i} reverse={i % 2 === 1} />
      ))}

      <EventPackages />

      <BookingCta />
    </>
  );
}
