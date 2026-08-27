import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { MaverickDifference, RunOfShow } from "@/components/site/sections";
import { BookingCta } from "@/components/site/ServiceDetailPage";
import { ButtonLink } from "@/components/site/primitives";
import { IMAGES } from "@/data/seed";

export const Route = createFileRoute("/_public/usp")({
  head: () => ({
    meta: [
      { title: "Why Maverick Manju — Best Magician & Emcee in Bangalore | The Difference" },
      {
        name: "description",
        content:
          "Discover why Maverick Manju is the best choice for your event. One professional — magician, emcee and mentalist — delivering complete entertainment in Bangalore. Why hire two entertainers when one does both?",
      },
      {
        name: "keywords",
        content:
          "best magician in bangalore, best magician in bengaluru, top magician in bangalore, top magician in bengaluru, magician in bangalore, professional magician in bangalore, best emcee in bangalore, best emcee in bengaluru, top emcee in bangalore, professional emcee in bangalore, event host in bangalore, best event host in bangalore, maverick manju, maverick manju magician, maverick manju emcee, maverick manju mentalist, maverick manju bangalore",
      },
      { property: "og:title", content: "Why Maverick Manju — Best Magician & Emcee in Bangalore" },
      {
        property: "og:description",
        content:
          "Why hire two entertainers when one professional does both? The Maverick difference, explained.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/usp" },
      { name: "twitter:title", content: "Why Maverick Manju — The Maverick Difference" },
      { name: "twitter:description", content: "One professional — magician, emcee and mentalist — complete entertainment in Bangalore." },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/usp" },
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
        subtitle="Magic creates wonder. Mentalism creates curiosity. Emceeing creates participation. You get all three — coordinated by one person, with 100% ROI to the customer."
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
