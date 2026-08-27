import { createFileRoute } from "@tanstack/react-router";
import { Building2, Cake, Heart, Home as HomeIcon, Hotel, Sparkles } from "lucide-react";
import type { ComponentType } from "react";
import { PageHero } from "@/components/site/PageHero";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { ButtonLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { IMAGES, eventTypes } from "@/data/seed";

export const Route = createFileRoute("/_public/events")({
  head: () => ({
    meta: [
      {
        title:
          "Events & Occasions — Hire Maverick Manju | Best Magician & Emcee in Bangalore",
      },
      {
        name: "description",
        content:
          "Book Maverick Manju for any event — corporate gatherings, weddings, birthday parties, hotel brunches, brand launches, product reveals, award nights, annual days and private celebrations. The top magician and emcee in Bangalore.",
      },
      {
        name: "keywords",
        content:
          "magician for corporate events in bangalore, magician for birthday party in bangalore, magician for wedding in bangalore, magician for private party in bangalore, magician for college events in bangalore, magician for school events in bangalore, magician for annual function in bangalore, corporate magician in bangalore, corporate magician in bengaluru, birthday magician in bangalore, wedding magician in bangalore, party magician in bangalore, event magician in bangalore, best magician in bangalore, best magician in bengaluru, emcee for events in bangalore, corporate emcee in bangalore, event host in bangalore, maverick manju, maverick manju bangalore",
      },
      { property: "og:title", content: "Events — Maverick Manju | Best Magician in Bangalore" },
      { property: "og:description", content: "Magic for every occasion — corporate events, weddings, birthdays and more." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/events" },
      { name: "twitter:title", content: "Events — Maverick Manju | Best Magician in Bangalore" },
      { name: "twitter:description", content: "Book the best magician and emcee for your next event in Bangalore." },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/events" },
    ],
  }),
  component: EventsPage,
});

const ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Cake,
  Hotel,
  Home: HomeIcon,
  Heart,
  Sparkles,
};

const flow = [
  {
    label: "Magic",
    title: "Creates Wonder",
    body: "Give guests a reason to stop, watch and smile.",
  },
  {
    label: "Emcee",
    title: "Creates Participation",
    body: "Keep the audience connected to the event.",
  },
  {
    label: "Mentalism",
    title: "Creates Curiosity",
    body: "Add a powerful layer of mystery and surprise.",
  },
  {
    label: "One Point",
    title: "Simple Coordination",
    body: "One professional for a seamless entertainment flow.",
  },
];

function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title={
          <>
            Magic for every
            <br />
            <span className="text-primary">occasion.</span>
          </>
        }
        subtitle="The format changes with the room. The objective never does."
        image={IMAGES.walkAround}
      >
        <ButtonLink to="/book">Plan my event</ButtonLink>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className="container-mm grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((e, i) => {
            const Icon = ICONS[e.icon] ?? Sparkles;
            return (
              <Reveal key={e.id} delay={i * 0.05}>
                <article className="card-mm h-full p-8 hover:-translate-y-1 hover:border-primary/60 hover:glow-red">
                  <Icon size={28} className="text-primary" />
                  <h2 className="mt-4 font-display text-2xl">{e.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader
            eyebrow="Your event advantage"
            title="One professional. Multiple entertainment moments."
            description="Start with walk-around magic, move into games and audience engagement, host the event, and finish with stage magic or mentalism."
          />
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {flow.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.05}>
                <div className="h-full bg-[#0d0d0f] p-8">
                  <strong className="text-[11px] tracking-[0.2em] text-primary uppercase">
                    {f.label}
                  </strong>
                  <h3 className="mt-2 font-display text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingCta />
    </>
  );
}
