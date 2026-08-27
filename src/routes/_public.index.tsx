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
import type { GalleryItem, Testimonial } from "@/types";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      { title: "Maverick Manju | Magician, Emcee & Mentalist" },
      {
        name: "description",
        content:
          "Maverick Manju — stage magic, walk-around magic, mentalism and interactive Emcee entertainment for corporate events, weddings, birthdays, hotels and clubhouses.",
      },
      { property: "og:title", content: "Maverick Manju | Magician, Emcee & Mentalist" },
      {
        property: "og:description",
        content: "Magic that amazes. One event, multiple experiences — by one professional.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

/**
 * The home page previews each destination in the main nav — the USP, services,
 * packages, gallery, testimonials and booking — every one of them linking
 * through to the full page, which is left exactly as it was.
 */
function HomePage() {
  return (
    <>
      <Hero />
      <MaverickDifference />
      <RunOfShow />
      <SectionLink to="/usp" label="Why Maverick" />
      <ServicesPreview />
      <SectionLink to="/services" label="See all services" />
      <EventPackages />
      <MomentsOfMagic />
      <SectionLink to="/gallery" label="View full gallery" />
      <TestimonialGroups />
      <SectionLink to="/testimonials" label="Read all testimonials" />
      <BookingCta />
    </>
  );
}

function ServicesPreview() {
  const services = useServices();

  return (
    <section className="py-20 sm:py-24">
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

/** Closes a previewed block with a link through to the page it came from. */
function SectionLink({ to, label }: { to: string; label: string }) {
  return (
    <section className="border-t border-border py-14 text-center">
      <div className="container-mm">
        <Reveal>
          <ButtonLink to={to}>{label}</ButtonLink>
        </Reveal>
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
            alt="Maverick Manju performing magic"
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
              Magician | Emcee | Mentalist | Creator Coach
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
              Stage magic, mentalism, walk-around magic and interactive Emcee experiences — brought
              together by one professional.
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
