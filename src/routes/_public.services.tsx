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
      { title: "Magic, Emcee & Mentalism Services in Bangalore — Maverick Manju" },
      {
        name: "description",
        content:
          "Explore Maverick Manju's complete entertainment services — stage magic, close-up magic, mentalism and professional emcee hosting. The best magician and emcee in Bangalore for corporate events, weddings, birthdays and private parties.",
      },
      {
        name: "keywords",
        content:
          "magician for hire in bangalore, magician for hire in bengaluru, magic show in bangalore, magic show in bengaluru, best magic show in bangalore, magician show in bangalore, professional magician in bangalore, professional magician in bengaluru, best magician in bangalore, best magician in bengaluru, mentalism show in bangalore, best emcee in bangalore, professional emcee in bangalore, emcee for events in bangalore, corporate emcee in bangalore, event host in bangalore, maverick manju, maverick manju magician, maverick manju emcee",
      },
      { property: "og:title", content: "Magic, Emcee & Mentalism Services — Maverick Manju" },
      {
        property: "og:description",
        content:
          "Stage magic, walk-around magic, mentalism and professional emcee hosting — complete entertainment by the best magician in Bangalore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/services" },
      { name: "twitter:title", content: "Magic, Emcee & Mentalism Services — Maverick Manju" },
      { name: "twitter:description", content: "Complete entertainment services by the best magician and emcee in Bangalore." },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/services" },
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
