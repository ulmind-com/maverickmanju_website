import { Mic2, Sparkles, Star, Wand2 } from "lucide-react";
import { useMemo } from "react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { TestimonialGrid } from "@/components/site/TestimonialGrid";
import {
  GALLERY_CATEGORIES,
  type EventPackage,
  type GalleryCategory,
  type GalleryItem,
  type ServiceType,
  type Testimonial,
} from "@/types";
import { useServiceData } from "@/hooks/useServiceData";
import { GALLERY_KEY, getPublishedGalleryItems } from "@/services/galleryService";
import { PACKAGES_KEY, getPublishedPackages } from "@/services/packageService";
import { TESTIMONIALS_KEY, getPublishedTestimonials } from "@/services/testimonialService";
import { ButtonLink, Particles, Reveal, SectionHeader } from "@/components/site/primitives";

export function MaverickDifference({ id }: { id?: string } = {}) {
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
    <section
      {...(id ? { id } : {})}
      className="scroll-mt-[72px] border-y border-border bg-gradient-to-b from-[#090909] to-[#111] py-20 sm:py-24"
    >
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

export function ServicePreview({
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
            className="w-full max-h-[520px] border border-border object-contain bg-black shadow-[0_20px_70px_rgba(0,0,0,.5)]"
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

/** Admin-managed packages, shown on both the services page and the home page. */
export function EventPackages() {
  const { data: packages, loading } = useServiceData<EventPackage[]>(
    PACKAGES_KEY,
    getPublishedPackages,
    [],
  );

  return (
    <section className="border-t border-border bg-surface py-20 sm:py-24">
      <div className="container-mm">
        <SectionHeader
          eyebrow="Event packages"
          title="Formats by occasion"
          description="Content, timing and interaction adjusted for the audience and the venue."
        />
        {loading ? (
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse border border-border bg-card" />
            ))}
          </div>
        ) : packages.length === 0 ? (
          <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No event packages published yet.
          </p>
        ) : (
          <div className="space-y-5">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <article className="card-mm grid gap-6 p-6 md:grid-cols-[280px_1fr] hover:border-primary/50 hover:glow-red">
                  {p.imageUrl && (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      loading="lazy"
                      className="h-52 w-full border border-border object-contain bg-black md:h-full"
                    />
                  )}
                  <div>
                    <h3 className="font-display text-2xl">{p.title}</h3>
                    {p.shortDescription && (
                      <p className="mt-1 text-sm text-primary-glow">{p.shortDescription}</p>
                    )}
                    {p.fullDescription && (
                      <p className="mt-3 text-sm text-muted-foreground">{p.fullDescription}</p>
                    )}
                    {p.highlights.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.highlights.map((h) => (
                          <span
                            key={h}
                            className="border border-border px-3 py-1.5 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-6">
                      <ButtonLink to={p.ctaLink || "/book"} variant="outline">
                        {p.ctaLabel || "Enquire Now"}
                      </ButtonLink>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Two halves rather than four steps — the briefing and the arrival are one
 * stretch of work, and so are the performance and the wrap-up. The wording is
 * the same as before, cut to what a client actually needs to read.
 */
const RUN_OF_SHOW = [
  {
    step: "01",
    title: "Briefing & guest arrival",
    body: "A pre-event dialogue sets the detail of the event, your expectations and everything needed in advance. On the day, emcee engagement and walk-around magic keep guests engaged as they settle in, so the energy is up before the stage lights come on.",
  },
  {
    step: "02",
    title: "Performance & wrap-up",
    body: "Stage magic and mentalism built for the whole room, with volunteers pulled from your own audience. Maverick Manju then keeps the flow controlled to the finish — cake cutting, and opening the floor for dance and dinner.",
  },
];

/** The run-of-show, on the USP page and the home page. */
export function RunOfShow() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-mm">
        <SectionHeader
          eyebrow="How a show runs"
          title="A run-of-show that stays on time."
          description="From the first guest arriving to the last announcement, every segment is planned with your event team."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {RUN_OF_SHOW.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.06}>
              <div className="card-mm h-full p-7 hover:-translate-y-1 hover:border-primary/60 hover:glow-red">
                <p className="font-display text-3xl text-primary">{s.step}</p>
                <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The published gallery feed, on the gallery page and the home page. */
export function MomentsOfMagic({
  className = "py-20 sm:py-24",
  id,
}: {
  className?: string;
  id?: string;
}) {
  const {
    data: items,
    loading,
    error,
  } = useServiceData<GalleryItem[]>(GALLERY_KEY, getPublishedGalleryItems, []);

  const groups = useMemo(
    () =>
      GALLERY_CATEGORIES.map((category) => ({
        category,
        items: items.filter((i) => (i.category ?? "Stage Magic") === category),
      })).filter((group) => group.items.length > 0),
    [items],
  );

  return (
    <section
      {...(id ? { id } : {})}
      className={`relative scroll-mt-[72px] overflow-hidden ${className}`}
    >
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
        ) : error ? (
          <p className="border border-dashed border-destructive/50 p-10 text-center text-sm text-destructive">
            {error}
          </p>
        ) : groups.length === 0 ? (
          <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No gallery items published yet.
          </p>
        ) : (
          <div className="space-y-16">
            {groups.map(({ category, items: groupItems }) => (
              <CategoryGroup
                key={category}
                category={category}
                count={groupItems.length}
                noun="item"
              >
                <GalleryGrid items={groupItems} />
              </CategoryGroup>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Published testimonials under the four categories the admin assigns. A
 * category with nothing published in it is not rendered at all.
 */
export function TestimonialGroups({
  className = "py-20 sm:py-24",
  id,
}: {
  className?: string;
  id?: string;
}) {
  const {
    data: testimonials,
    loading,
    error,
  } = useServiceData<Testimonial[]>(TESTIMONIALS_KEY, getPublishedTestimonials, []);

  return (
    <section
      {...(id ? { id } : {})}
      className={`relative scroll-mt-[72px] overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 spotlight" />
      <Particles count={10} />
      <div className="container-mm relative">
        <SectionHeader
          eyebrow="Testimonials"
          title="Client Testimonials"
          description="Real reactions. Real memories."
        />
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse border border-border bg-card" />
            ))}
          </div>
        ) : error ? (
          <p className="border border-dashed border-destructive/50 p-10 text-center text-sm text-destructive">
            {error}
          </p>
        ) : testimonials.length === 0 ? (
          <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No published testimonials yet.
          </p>
        ) : (
          <TestimonialGrid items={testimonials} />
        )}
      </div>
    </section>
  );
}

/** Section heading for one category group, with a rule and a count on the right. */
function CategoryGroup({
  category,
  count,
  noun,
  children,
}: {
  category: GalleryCategory;
  count: number;
  noun: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-7 flex items-center gap-4">
        <h3 className="font-display text-2xl whitespace-nowrap sm:text-3xl">{category}</h3>
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          {count} {count === 1 ? noun : `${noun}s`}
        </span>
      </div>
      {children}
    </div>
  );
}
