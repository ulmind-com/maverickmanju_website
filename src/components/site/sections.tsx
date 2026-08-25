import { Mic2, Sparkles, Star, Wand2 } from "lucide-react";
import type { ServiceType } from "@/types";
import { ButtonLink, Reveal, SectionHeader } from "@/components/site/primitives";

export function MaverickDifference() {
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
