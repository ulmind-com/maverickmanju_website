import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { Reveal, SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/data/seed";

export const Route = createFileRoute("/_public/about")({
  head: () => ({
    meta: [
      { title: "About Maverick Manju | Magician, Emcee, Mentalist & Creator Coach" },
      {
        name: "description",
        content:
          "Maverick Manju is a magician, emcee, mentalist and creator coach who builds entertainment around audience participation rather than performance alone.",
      },
      { property: "og:title", content: "About Maverick Manju" },
      { property: "og:description", content: "More than a magician." },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  { title: "Magic", body: "Creates wonder — a reason to stop, watch and smile." },
  { title: "Mentalism", body: "Creates curiosity — the questions that follow people home." },
  { title: "Emceeing", body: "Creates participation — the audience becomes the show." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            More than a
            <br />
            <span className="text-primary">magician.</span>
          </>
        }
        subtitle="Magician | Emcee | Mentalist | Creator Coach"
        image={IMAGES.mentalism}
      />

      <section className="py-20 sm:py-24">
        <div className="container-mm grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <img
              src={IMAGES.heroStage}
              alt="Maverick Manju on stage"
              loading="lazy"
              className="h-[480px] w-full border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeader
              eyebrow="The story"
              title="Don't just perform for people. Create moments with them."
              className="mb-6"
            />
            <div className="space-y-4 text-muted-foreground">
              <p>
                I am Maverick Manju — Magician, Emcee and Mentalist. My approach to entertainment is
                simple: an audience that only watches will forget. An audience that participates
                will remember.
              </p>
              <p>
                Whether I'm on a stage in front of hundreds, performing close-up magic at a luxury
                hotel brunch, engaging a corporate audience or turning a birthday into a full
                experience, the objective stays the same — make people experience the magic.
              </p>
              <p>
                As a creator coach I also work with performers and speakers on stage presence,
                audience control and building an act that holds a room.
              </p>
            </div>
            <blockquote className="mt-7 border-l-2 border-primary pl-5 font-script text-2xl text-foreground italic">
              Magic creates wonder. Mentalism creates curiosity. Emceeing creates participation.
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-20 sm:py-24">
        <div className="container-mm">
          <SectionHeader eyebrow="The approach" title="Three forces, one show" />
          <div className="grid gap-px border border-border bg-border sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="h-full bg-[#0d0d0f] p-8">
                  <p className="font-display text-xs tracking-[0.22em] text-primary">0{i + 1}</p>
                  <h3 className="mt-3 font-display text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
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
