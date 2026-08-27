import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { walkAroundContent } from "@/data/servicePages";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/SeoSchemas";

export const Route = createFileRoute("/_public/walk-around-magic")({
  head: () => ({
    meta: [
      {
        title:
          "Walk-Around & Close-Up Magic in Bangalore — Maverick Manju | Best Close-Up Magician",
      },
      {
        name: "description",
        content:
          "Book the best close-up magician in Bangalore. Maverick Manju's walk-around magic brings jaw-dropping card tricks, mind-reading and intimate magic directly to your guests at cocktail parties, networking events, hotel brunches and weddings.",
      },
      {
        name: "keywords",
        content:
          "walk around magician in bangalore, close up magician in bangalore, best magician near me, magician in bangalore, magician in bengaluru, party magician in bangalore, wedding magician in bangalore, magician for wedding in bangalore, magician for private party in bangalore, magician for birthday party in bangalore, birthday magician in bangalore, magician for hire in bangalore, magician for hire in bengaluru, professional magician in bangalore, best magician in bangalore, best magician in bengaluru, maverick manju magician, maverick manju bangalore",
      },
      {
        property: "og:title",
        content: "Walk-Around & Close-Up Magic — Maverick Manju, Bangalore",
      },
      {
        property: "og:description",
        content:
          "Magic doesn't always need a stage. Sometimes the magician comes to you — close-up magic at its finest.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/walk-around-magic" },
      { property: "og:image", content: "https://www.maverickmanju.in/images/walk-around.jpg" },
      {
        name: "twitter:title",
        content: "Walk-Around & Close-Up Magic — Maverick Manju, Bangalore",
      },
      {
        name: "twitter:description",
        content:
          "Close-up magic and table-to-table entertainment for cocktail parties, hotel brunches and weddings.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/walk-around-magic" },
    ],
  }),
  component: () => (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.maverickmanju.in/" },
          { name: "Walk-Around Magic", url: "https://www.maverickmanju.in/walk-around-magic" },
        ]}
      />
      <ServiceSchema
        serviceType="Walk-Around Close-Up Magic"
        description="Professional close-up and walk-around magic for cocktail parties, hotel brunches, networking events, weddings and private celebrations in Bangalore."
        url="https://www.maverickmanju.in/walk-around-magic"
      />
      <ServiceDetailPage content={walkAroundContent} />
    </>
  ),
});
