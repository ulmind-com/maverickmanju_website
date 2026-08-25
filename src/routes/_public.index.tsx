import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Quote, Sparkles, Wand2 } from "lucide-react";
import { ButtonLink, Particles, Reveal } from "@/components/site/primitives";
import { IMAGES } from "@/data/seed";
import heroManju from "@/assets/hero-manju.png.asset.json";

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

const DESTINATIONS = [
  {
    to: "/services",
    Icon: Wand2,
    label: "Services",
    body: "Stage magic, walk-around magic, mentalism and emcee formats.",
  },
  {
    to: "/usp",
    Icon: Sparkles,
    label: "USP",
    body: "One artist, one point of coordination, a complete show.",
  },
  {
    to: "/gallery",
    Icon: Camera,
    label: "Gallery",
    body: "Photos and video from recent stages and celebrations.",
  },
  {
    to: "/testimonials",
    Icon: Quote,
    label: "Testimonials",
    body: "What hosts, brides and event managers say afterwards.",
  },
] as const;

function HomePage() {
  return (
    <>
      <Hero />

      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container-mm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DESTINATIONS.map(({ to, Icon, label, body }, i) => (
              <Reveal key={to} delay={i * 0.06}>
                <Link
                  to={to}
                  className="card-mm block h-full border-t-2 border-t-primary p-7 transition-all hover:-translate-y-1 hover:border-primary/60 hover:glow-red"
                >
                  <Icon size={28} className="text-primary" />
                  <h2 className="mt-4 font-display text-xl">{label}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                  <span className="mt-5 inline-block text-[11px] font-bold tracking-[0.18em] text-primary uppercase">
                    Open →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-mm max-w-3xl text-center">
          <Reveal>
            <p className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
              Meet Maverick Manju
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-tight font-bold">
              Don't just perform for people — create moments{" "}
              <span className="text-primary">with them.</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              Magician, Emcee and Mentalist working across corporate events, weddings, birthdays,
              hotels and clubhouses.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/book">Book Maverick Manju</ButtonLink>
              <ButtonLink to="/about" variant="outline">
                Read the full story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <img
        src={heroManju.url}
        alt="Maverick Manju on stage in a red jacket, smiling at the audience"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        style={{ animation: "mm-slow-zoom 26s ease-in-out infinite alternate" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.96)_0%,rgba(0,0,0,.78)_45%,rgba(0,0,0,.45)_100%)]" />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
      <Particles />

      <div className="container-mm relative z-10 pt-28 pb-16">
        <Reveal>
          <p className="text-[12px] font-bold tracking-[0.34em] text-primary-glow uppercase">
            Magician | Emcee | Mentalist | Creator Coach
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-4xl text-[clamp(3rem,9vw,7rem)] leading-[0.86] font-bold tracking-tight">
            Magic That
            <br />
            <span className="text-primary">Amazes.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-4 font-script text-[clamp(1.4rem,3vw,2.3rem)] italic">
            One Event. Multiple Experiences.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
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
    </section>
  );
}
