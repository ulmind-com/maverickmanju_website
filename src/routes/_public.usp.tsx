import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { MaverickDifference, RunOfShow } from "@/components/site/sections";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { ButtonLink } from "@/components/site/primitives";
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

      <RunOfShow />

      <BookingCta />
    </>
  );
}
