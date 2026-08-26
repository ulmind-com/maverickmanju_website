import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building2,
  Cake,
  CalendarDays,
  Camera,
  Heart,
  Home as HomeIcon,
  Hotel,
  Mail,
  MessageCircle,
  Phone,
  Quote,
  Sparkles,
  User,
  Wand2,
} from "lucide-react";
import type { ComponentType } from "react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { ServiceCard } from "@/components/site/ServiceCard";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { ButtonLink, Particles, Reveal, SectionHeader } from "@/components/site/primitives";
import { MaverickDifference } from "@/components/site/sections";
import { useServiceData } from "@/hooks/useServiceData";
import { useServices } from "@/hooks/useServices";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { IMAGES, eventTypes } from "@/data/seed";
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
    to: "/events",
    Icon: CalendarDays,
    label: "Events",
    body: "Corporates, weddings, birthdays, hotels and clubhouses.",
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
  {
    to: "/about",
    Icon: User,
    label: "About",
    body: "The story behind the magic, mentalism and the mic.",
  },
] as const;

const EVENT_ICONS: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Cake,
  Hotel,
  Home: HomeIcon,
  Heart,
  Sparkles,
};

/**
 * The home page carries a preview of every other page — services, the USP,
 * events, gallery, testimonials, about and contact — each one linking through
 * to the full page, which is left exactly as it was.
 */
function HomePage() {
  return (
    <>
      <Hero />
      <PageDirectory />
      <AboutPreview />
      <ServicesPreview />
      <MaverickDifference />
      <UspLink />
      <EventsPreview />
      <GalleryPreview />
      <TestimonialsPreview />
      <ContactPreview />
      <BookingCta />
    </>
  );
}

/** One card per page, so every section of the site is reachable from the top. */
function PageDirectory() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24">
      <div className="container-mm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

function AboutPreview() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-mm grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <img
            src={IMAGES.heroStage}
            alt="Maverick Manju on stage"
            loading="lazy"
            className="h-[380px] w-full border border-border object-cover sm:h-[480px]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionHeader
            eyebrow="Meet Maverick Manju"
            title={
              <>
                Don't just perform for people — create moments{" "}
                <span className="text-primary">with them.</span>
              </>
            }
            className="mb-6"
          />
          <div className="space-y-4 text-muted-foreground">
            <p>
              Magician, Emcee and Mentalist working across corporate events, weddings, birthdays,
              hotels and clubhouses. An audience that only watches will forget. An audience that
              participates will remember.
            </p>
            <p>
              As a creator coach I also work with performers and speakers on stage presence,
              audience control and building an act that holds a room.
            </p>
          </div>
          <blockquote className="mt-7 border-l-2 border-primary pl-5 font-script text-2xl text-foreground italic">
            Magic creates wonder. Mentalism creates curiosity. Emceeing creates participation.
          </blockquote>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink to="/about">Read the full story</ButtonLink>
            <ButtonLink to="/book" variant="outline">
              Book Maverick Manju
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const services = useServices();

  return (
    <section className="border-t border-border bg-surface py-20 sm:py-24">
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
        <div className="mt-10">
          <ButtonLink to="/services">See all services</ButtonLink>
        </div>
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

function EventsPreview() {
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24">
      <div className="container-mm">
        <SectionHeader
          eyebrow="Events"
          title="Magic for every occasion."
          description="The format changes with the room. The objective never does."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((e, i) => {
            const Icon = EVENT_ICONS[e.icon] ?? Sparkles;
            return (
              <Reveal key={e.id} delay={i * 0.05}>
                <article className="card-mm h-full p-8 hover:-translate-y-1 hover:border-primary/60 hover:glow-red">
                  <Icon size={28} className="text-primary" />
                  <h3 className="mt-4 font-display text-2xl">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10">
          <ButtonLink to="/events">Explore events</ButtonLink>
        </div>
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

function ContactPreview() {
  const s = useSiteSettings();
  const channels = [
    { Icon: Phone, label: "Phone", value: s.phone, href: `tel:${s.phone.replace(/\s/g, "")}` },
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      value: `+${s.whatsapp}`,
      href: `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(s.defaultBookingMessage)}`,
    },
    { Icon: Mail, label: "Email", value: s.email, href: `mailto:${s.email}` },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="container-mm">
        <SectionHeader eyebrow="Contact" title="Reach me here" description={s.tagline} />
        <div className="grid gap-4 sm:grid-cols-3">
          {channels.map(({ Icon, label, value, href }, i) => (
            <Reveal key={label} delay={i * 0.06}>
              <a
                href={href}
                {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                className="card-mm block h-full p-6 hover:-translate-y-1 hover:border-primary/60 hover:glow-red"
              >
                <Icon size={20} className="text-primary" />
                <p className="mt-4 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  {label}
                </p>
                <p className="mt-1 font-display text-lg break-words">{value}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink to="/contact">All contact details</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <img
        src="/images/hero-manju.png"
        alt="Maverick Manju on stage in a red jacket, smiling at the audience"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-95 md:object-[62%_center]"
        style={{ animation: "mm-slow-zoom 26s ease-in-out infinite alternate" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/25 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-[62%] bg-[radial-gradient(ellipse_at_28%_50%,rgba(0,0,0,0.62),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background/85 to-transparent" />

      <Particles />

      <div
        className="container-mm relative z-10 pt-28 pb-16"
        style={{ textShadow: "0 2px 18px rgba(0,0,0,0.75)" }}
      >
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
