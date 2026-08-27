import { createFileRoute } from "@tanstack/react-router";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { ButtonLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  EventPackages,
  MaverickDifference,
  MomentsOfMagic,
  RunOfShow,
  TestimonialGroups,
} from "@/components/site/sections";
import { useServices } from "@/hooks/useServices";
import { FaqSection } from "@/components/site/FaqSection";
import { FaqSchema, BreadcrumbSchema } from "@/components/site/SeoSchemas";
import { FAQ_DATA } from "@/components/site/SeoSchemas";
import type { GalleryItem, Testimonial } from "@/types";

export const Route = createFileRoute("/_public/")(
  {
    head: () => ({
      meta: [
        {
          title: "Maverick Manju | Magician, Emcee & Mentalist",
        },
        {
          name: "description",
          content:
            "Maverick Manju is the best magician in Bangalore & Bengaluru. Professional magician for hire offering stage magic show, walk-around magic, close-up magic, mentalism show and interactive emcee hosting for corporate events, weddings, birthday parties, college events, school functions and private celebrations. Book the top magician and best emcee in Bangalore today!",
        },
        {
          name: "keywords",
          content:
            "best magician in bangalore, best magician in bengaluru, best magician near me, top magician in bangalore, top magician in bengaluru, magician in bangalore, magician in bengaluru, magician near me, professional magician in bangalore, professional magician in bengaluru, magician for hire in bangalore, magician for hire in bengaluru, magic show in bangalore, magic show in bengaluru, best magic show in bangalore, best magic show in bengaluru, magician show in bangalore, magician show in bengaluru, mentalist in bangalore, mentalist in bengaluru, best mentalist in bangalore, best mentalist in bengaluru, mentalism show in bangalore, mentalism show in bengaluru, walk around magician in bangalore, close up magician in bangalore, stage magician in bangalore, stage magic show in bangalore, corporate magician in bangalore, corporate magician in bengaluru, birthday magician in bangalore, wedding magician in bangalore, party magician in bangalore, event magician in bangalore, magician for corporate events in bangalore, magician for birthday party in bangalore, magician for wedding in bangalore, magician for private party in bangalore, magician for college events in bangalore, magician for school events in bangalore, magician for annual function in bangalore, best emcee in bangalore, best emcee in bengaluru, top emcee in bangalore, top emcee in bengaluru, emcee in bangalore, emcee in bengaluru, professional emcee in bangalore, professional emcee in bengaluru, emcee for events in bangalore, corporate emcee in bangalore, corporate emcee in bengaluru, event host in bangalore, event host in bengaluru, best event host in bangalore, best event anchor in bangalore, anchor for corporate events in bangalore, event anchor in bangalore, maverick manju, mevrick manju, mevrick, manju magician, maverick magician, maverick manju magician, maverick manju emcee, maverick manju mentalist, maverick manju bangalore, maverick manju bengaluru",
        },
        {
          property: "og:title",
          content:
            "Maverick Manju — Best Magician & Emcee in Bangalore",
        },
        {
          property: "og:description",
          content:
            "Magic that amazes. Stage magic, mentalism, walk-around magic and professional emcee entertainment — one event, multiple experiences by the top magician in Bangalore.",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:url",
          content: "https://www.maverickmanju.in/",
        },
        {
          property: "og:image",
          content:
            "https://www.maverickmanju.in/images/hero-manju-magic.jpg",
        },
        {
          name: "twitter:title",
          content:
            "Maverick Manju — Best Magician & Emcee in Bangalore",
        },
        {
          name: "twitter:description",
          content:
            "Stage magic, mentalism, walk-around magic and professional emcee entertainment for corporate events, weddings and celebrations.",
        },
      ],
      links: [
        {
          rel: "canonical",
          href: "https://www.maverickmanju.in/",
        },
      ],
    }),
    component: HomePage,
  },
);

/**
 * The home page carries every nav destination in full — the USP, services,
 * packages, gallery and testimonials — so the navbar scrolls to a section here
 * rather than opening a page of its own.
 */
function HomePage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.maverickmanju.in/" },
        ]}
      />
      <FaqSchema items={FAQ_DATA} />

      <Hero />
      <MaverickDifference id="usp" />
      <RunOfShow />
      <ServicesPreview />
      <EventPackages />
      <MomentsOfMagic id="gallery" />
      <TestimonialGroups id="testimonials" />
      <FaqSection />
      <BookingCta />
    </>
  );
}

function ServicesPreview() {
  const services = useServices();

  return (
    <section id="services" className="scroll-mt-[72px] py-20 sm:py-24">
      <div className="container-mm">
        <SectionHeader
          eyebrow="Services"
          title="The signature four"
          description="Every event has a different room, audience and run-of-show. Pick the format — or combine them."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const settings = useSiteSettings();
  const heroImage = settings.heroImageUrl || "/images/hero-manju-magic.jpg";

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 lg:pb-0">
      {/* Backdrop: pure black. The photo is shot on black, so any red wash behind
          it only muddied the cutout — the figure and the type carry the colour. */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 opacity-[0.06] hairline-grid" />

      {/* The cutout is pinned to the bottom-right of the hero, and pushed a little
          past the section edge so the photo's cropped hem is clipped away instead
          of being shown. Positioned against the section — not the copy container —
          so it reaches the true bottom of the viewport. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center lg:justify-end">
        <Reveal
          delay={0.18}
          className="relative w-full max-w-[560px] translate-y-[4%] lg:mr-[1vw] lg:w-[58vw] lg:max-w-[920px] lg:-translate-y-[11%]"
        >
          <img
            src={heroImage}
            alt="Maverick Manju — Best Magician in Bangalore performing stage magic at a corporate event"
            width={1024}
            height={682}
            fetchPriority="high"
            className="relative block w-full object-contain object-bottom"
            style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.65))" }}
          />
        </Reveal>
      </div>

      {/* Scrim: keeps the copy readable where it passes over the figure — a
          bottom-up fade on mobile, a left-to-right one once they sit side by side. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-black/55 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/75 lg:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="container-mm relative z-10 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}>
          <Reveal>
            <p className="text-[12px] font-bold tracking-[0.34em] text-primary-glow uppercase">
              Magician | Emcee | Creator Coach
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 text-[clamp(2.8rem,7vw,5.2rem)] leading-[0.9] font-bold tracking-tight">
              Magic That
              <br />
              <span className="text-primary">Amazes.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 font-script text-[clamp(1.4rem,3vw,2.1rem)] italic">
              One Event. Multiple Experiences.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Stage magic, mentalism, walk-around magic and interactive emcee entertainment —
              brought together by Maverick Manju, the top magician and emcee in Bangalore, for
              corporate events, weddings, birthdays and private celebrations.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink to="/book">Book Maverick Manju</ButtonLink>
              <ButtonLink to="/services" variant="outline">
                Explore Performances
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-10 flex flex-wrap gap-2">
              {["Stage Magic", "Walk-Around Magic", "Mentalism", "Emcee"].map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-border bg-black/50 px-4 py-2 text-[11px] tracking-[0.14em] uppercase backdrop-blur"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


