import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { MaverickDifference } from "@/components/site/sections";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { ButtonLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/data/seed";

export const Route = createFileRoute("/_public/usp")({
  head: () => ({
    meta: [
      { title: "Why Maverick Manju | One Artist, Complete Entertainment" },
      {
        name: "description",
        content:
          "Magic, mentalism and emcee hosting from one professional — one point of coordination, one seamless run-of-show, and an audience that participates instead of watching.",
      },
      { property: "og:title", content: "Why Maverick Manju" },
      {
        property: "og:description",
        content:
          "Why hire two entertainers when one professional does both? The Maverick difference, explained.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WhyMaverickPage,
});

const RUN_OF_SHOW = [
  {
    step: "01",
    title: "Pre-event briefing",
    body: "We map the audience, the venue, the timings and the moments that matter to you — sponsors, cake cutting, awards, product reveal.",
  },
  {
    step: "02",
    title: "Guest arrival",
    body: "Walk-around magic works the room while guests settle in, so the energy is already up before the stage lights come on.",
  },
  {
    step: "03",
    title: "Main performance",
    body: "Stage magic and mentalism built for the whole room, with volunteers pulled from your own audience.",
  },
  {
    step: "04",
    title: "Hosting & wrap-up",
    body: "Emcee segments, games and announcements keep the run-of-show tight from first cue to last.",
  },
];

function WhyMaverickPage() {
  return (
    <>
      <PageHero
        eyebrow="The Maverick Difference"
        title={
          <>
            One artist.
            <br />
            <span className="text-primary">Complete entertainment.</span>
          </>
        }
        subtitle="Magic creates wonder. Mentalism creates curiosity. Emceeing creates participation. You get all three — coordinated by one person."
        image={IMAGES.mentalism}
      >
        <ButtonLink to="/book">Book Maverick Manju</ButtonLink>
        <ButtonLink to="/services" variant="outline">
          See all services
        </ButtonLink>
      </PageHero>

      <MaverickDifference />

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

      <BookingCta />
    </>
  );
}
