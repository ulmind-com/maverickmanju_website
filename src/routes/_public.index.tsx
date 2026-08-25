import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  Cake,
  Heart,
  Home as HomeIcon,
  Hotel,
  Mic2,
  Sparkles,
  Star,
  Wand2,
} from "lucide-react";
import type { ComponentType } from "react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ServiceCard } from "@/components/site/ServiceCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import {
  ButtonLink,
  Particles,
  Reveal,
  SectionHeader,
} from "@/components/site/primitives";
import { IMAGES, eventTypes, services } from "@/data/seed";
import { useServiceData } from "@/hooks/useServiceData";
import { GALLERY_KEY, getPublishedGalleryItems } from "@/services/galleryService";
import { TESTIMONIALS_KEY, getPublishedTestimonials } from "@/services/testimonialService";
import type { GalleryItem, ServiceType, Testimonial } from "@/types";

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

const ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Cake,
  Hotel,
  Home: HomeIcon,
  Heart,
  Sparkles,
};

function HomePage() {
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

  return (
    <>
      <Hero />
      <MaverickDifference />

      <section className="py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader
            eyebrow="Signature Services"
            title="Entertainment built around your audience."
            description="From intimate brunches to large corporate stages, the format changes — the objective doesn't: make people participate, laugh and remember."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink to="/services" variant="outline">
              All services
            </ButtonLink>
          </div>
        </div>
      </section>

      {services.slice(0, 4).map((service, i) => (
        <ServicePreview key={service.slug} service={service} index={i} reverse={i % 2 === 1} />
      ))}

      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader
            eyebrow="Events"
            title="Magic for every occasion."
            description="One performer, formats tuned to the room, the age group and the run-of-show."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventTypes.map((e, i) => {
              const Icon = ICONS[e.icon] ?? Sparkles;
              return (
                <Reveal key={e.id} delay={i * 0.05}>
                  <div className="card-mm h-full bg-gradient-to-br from-card to-background p-7 hover:-translate-y-1 hover:border-primary/60 hover:glow-red">
                    <Icon size={26} className="text-primary" />
                    <h3 className="mt-4 font-display text-xl">{e.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10">
            <ButtonLink to="/events" variant="outline">
              Explore events
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader
            eyebrow="Moments of Magic"
            title="Don't just take my word for it."
            description="Photos and video from recent stages, brunches and celebrations."
          />
          <GalleryGrid items={gallery.slice(0, 5)} />
          <div className="mt-10">
            <ButtonLink to="/gallery" variant="outline">
              Open the gallery
            </ButtonLink>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="border-t border-border bg-surface py-20 sm:py-24">
          <div className="container-mm">
            <SectionHeader
              eyebrow="Client Testimonials"
              title="Real reactions. Real memories."
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.slice(0, 3).map((t, i) => (
                <Reveal key={t.id} delay={i * 0.06}>
                  <TestimonialCard testimonial={t} featured={t.featured} />
                </Reveal>
              ))}
            </div>
            <div className="mt-10">
              <ButtonLink to="/testimonials" variant="outline">
                Read all testimonials
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      <AboutPreview />
      <BookingCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <img
        src={IMAGES.heroStage}
        alt="Maverick Manju performing stage magic under a red spotlight"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
        style={{ animation: "mm-slow-zoom 26s ease-in-out infinite alternate" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.96)_0%,rgba(0,0,0,.76)_45%,rgba(0,0,0,.3)_100%)]" />
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

function MaverickDifference() {
  const cards = [
    {
      Icon: Wand2,
      title: "Stage Performance",
      body: "High-energy magic and mentalism designed for the whole audience.",
    },
    {
      Icon: Star,
      title: "Client Experience",
      body: "Real reactions, real memories and moments worth sharing.",
    },
    {
      Icon: Mic2,
      title: "Emcee Activities",
      body: "Games, interaction and energy that get people involved.",
    },
    {
      Icon: Sparkles,
      title: "Walk-Around Magic",
      body: "Close-up magic that comes directly to your guests.",
    },
  ];

  return (
    <section className="border-y border-border bg-gradient-to-b from-[#090909] to-[#111] py-20 sm:py-24">
      <div className="container-mm">
        <SectionHeader
          eyebrow="The Maverick Difference"
          title="Why hire two entertainers when one professional does both?"
          description="Magic creates wonder. Emcee activities create participation. Together they create a complete entertainment experience — with one point of coordination for the client."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="card-mm h-full border-t-2 border-t-primary p-7 hover:-translate-y-1 hover:glow-red">
                <Icon size={28} className="text-primary" />
                <h3 className="mt-4 font-display text-lg">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicePreview({
  service,
  index,
  reverse,
}: {
  service: ServiceType;
  index: number;
  reverse: boolean;
}) {
  return (
    <section className={index % 2 === 1 ? "bg-surface py-20 sm:py-24" : "py-20 sm:py-24"}>
      <div className="container-mm grid items-center gap-12 lg:grid-cols-2">
        <Reveal className={reverse ? "lg:order-2" : ""}>
          <img
            src={service.imageUrl}
            alt={service.title}
            loading="lazy"
            className="h-[380px] w-full border border-border object-cover shadow-[0_20px_70px_rgba(0,0,0,.5)] sm:h-[520px]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
            0{index + 1} • {service.title}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] leading-tight font-bold">
            {service.shortDescription}
          </h2>
          <p className="mt-4 text-muted-foreground">{service.fullDescription}</p>
          <ul className="my-7 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {service.highlights.map((h) => (
              <li
                key={h}
                className="border-b border-border py-2.5 text-sm text-muted-foreground before:mr-2 before:text-primary before:content-['✦']"
              >
                {h}
              </li>
            ))}
          </ul>
          <ButtonLink to={service.page ?? "/book"}>{service.ctaLabel}</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <div className="container-mm grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <img
            src={IMAGES.mentalism}
            alt="Portrait of Maverick Manju"
            loading="lazy"
            className="h-[460px] w-full border border-border object-cover"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-[11px] font-bold tracking-[0.3em] text-primary uppercase">
            Meet Maverick Manju
          </p>
          <h2 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-none font-bold">
            More than a magician.
          </h2>
          <p className="mt-5 text-muted-foreground">
            I am Maverick Manju — Magician, Emcee and Mentalist. My approach to entertainment is
            simple: don't just perform for people, create moments with them.
          </p>
          <blockquote className="my-7 border-l-2 border-primary pl-5 font-script text-2xl italic">
            Magic creates wonder. Mentalism creates curiosity. Emceeing creates participation.
          </blockquote>
          <ButtonLink to="/about" variant="outline">
            Read the full story
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
