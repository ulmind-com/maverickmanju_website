import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Quote, Sparkles, Wand2 } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { ButtonLink, Particles, Reveal, SectionHeader } from "@/components/site/primitives";
import { EventPackages, MaverickDifference, ServicePreview } from "@/components/site/sections";
import { useServiceData } from "@/hooks/useServiceData";
import { useServices } from "@/hooks/useServices";
import { GALLERY_KEY, getPublishedGalleryItems } from "@/services/galleryService";
import { TESTIMONIALS_KEY, getPublishedTestimonials } from "@/services/testimonialService";
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

/**
 * The home page carries a preview of each destination in the main nav —
 * services, the USP, gallery, testimonials and booking — every one of them
 * linking through to the full page, which is left exactly as it was.
 */
function HomePage() {
  return (
    <>
      <Hero />
      <PageDirectory />
      <ServicesPreview />
      <ServiceDetails />
      <EventPackages />
      <ServicesLink />
      <MaverickDifference />
      <UspLink />
      <GalleryPreview />
      <TestimonialsPreview />
      <BookingCta />
    </>
  );
}

/** One card per page, so every section of the site is reachable from the top. */
function PageDirectory() {
  return (
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

/** The same alternating image/copy sections the services page runs through. */
function ServiceDetails() {
  const services = useServices();
  return (
    <>
      {services.map((service, i) => (
        <ServicePreview key={service.slug} service={service} index={i} reverse={i % 2 === 1} />
      ))}
    </>
  );
}

function ServicesLink() {
  return (
    <section className="border-t border-border py-14 text-center">
      <div className="container-mm">
        <Reveal>
          <ButtonLink to="/services">See all services</ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/** MaverickDifference sits above this — the link hands the visitor the full USP page. */
function UspLink() {
  return (
    <section className="py-14 text-center">
      <div className="container-mm">
        <Reveal>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            One artist, one point of coordination, a complete show — from the pre-event briefing to
            the last announcement.
          </p>
          <div className="mt-7">
            <ButtonLink to="/usp">Why Maverick</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const { data: items, loading } = useServiceData<GalleryItem[]>(
    GALLERY_KEY,
    getPublishedGalleryItems,
    [],
  );
  const shown = items.slice(0, 6);

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 spotlight" />
      <Particles count={10} />
      <div className="container-mm relative">
        <SectionHeader
          eyebrow="Gallery"
          title="Moments of Magic"
          description="Don't just take my word for it. See the experience."
        />
        {loading ? (
          <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse break-inside-avoid border border-border bg-card"
                style={{ height: [220, 300, 260, 340, 240, 300][i] }}
              />
            ))}
          </div>
        ) : shown.length === 0 ? null : (
          <GalleryGrid items={shown} />
        )}
        <div className="mt-10">
          <ButtonLink to="/gallery">View full gallery</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function TestimonialsPreview() {
  const { data: testimonials } = useServiceData<Testimonial[]>(
    TESTIMONIALS_KEY,
    getPublishedTestimonials,
    [],
  );
  const shown = testimonials.slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24">
      <div className="container-mm">
        <SectionHeader
          eyebrow="Testimonials"
          title="Client Testimonials"
          description="Real reactions. Real memories."
        />
        <div className="grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink to="/testimonials">Read all testimonials</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      {/* Backdrop: a red spotlight wash, a faint grid and drifting particles. */}
      <div className="absolute inset-0 spotlight" />
      <div className="absolute inset-0 opacity-[0.06] hairline-grid" />
      <div
        className="absolute top-1/2 right-[-10%] hidden h-[78vh] w-[62vw] -translate-y-1/2 lg:block"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--primary) 34%, transparent), transparent 68%)",
        }}
      />
      <Particles />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

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

        <Reveal delay={0.18} className="relative">
          {/* Glow disc sits behind the cutout so the figure lifts off the
              background. Round and blurred, so it has no edge of its own. */}
          <span
            className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 42%, transparent), transparent 65%)",
            }}
          />
          <img
            src="/images/hero-falcon.webp"
            alt="Maverick Manju in a green blazer holding a jewelled golden falcon sceptre"
            width={1280}
            height={1460}
            fetchPriority="high"
            className="relative mx-auto w-full max-w-[300px] object-contain sm:max-w-[420px] lg:max-w-[560px]"
            style={{
              filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.65))",
              animation: "mm-hero-float 7s ease-in-out infinite alternate",
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}
