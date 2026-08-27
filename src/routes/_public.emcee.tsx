import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { emceeContent } from "@/data/servicePages";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/SeoSchemas";

export const Route = createFileRoute("/_public/emcee")({
  head: () => ({
    meta: [
      {
        title:
          "Best Emcee in Bangalore — Maverick Manju | Professional Event Host & Anchor",
      },
      {
        name: "description",
        content:
          "Hire the best emcee in Bangalore. Maverick Manju is a top professional event host offering interactive games, ice-breakers, magic-based activities and high-energy hosting for corporate events, weddings, awards ceremonies, team-building events and brand launches.",
      },
      {
        name: "keywords",
        content:
          "best emcee in bangalore, best emcee in bengaluru, top emcee in bangalore, top emcee in bengaluru, emcee in bangalore, emcee in bengaluru, professional emcee in bangalore, professional emcee in bengaluru, emcee for events in bangalore, corporate emcee in bangalore, corporate emcee in bengaluru, event host in bangalore, event host in bengaluru, best event host in bangalore, best event anchor in bangalore, anchor for corporate events in bangalore, event anchor in bangalore, best magician in bangalore, best magician in bengaluru, maverick manju emcee, maverick manju bangalore, maverick manju bengaluru",
      },
      {
        property: "og:title",
        content: "Best Emcee in Bangalore — Maverick Manju | Professional Event Host",
      },
      {
        property: "og:description",
        content:
          "Don't just host the event. Own the energy. Professional emcee and event hosting by the best emcee in Bangalore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/emcee" },
      { property: "og:image", content: "https://www.maverickmanju.in/images/emcee.jpg" },
      { name: "twitter:title", content: "Best Emcee in Bangalore — Maverick Manju" },
      {
        name: "twitter:description",
        content:
          "Professional emcee hosting with interactive games, ice-breakers and high-energy entertainment for corporate events and weddings.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/emcee" },
    ],
  }),
  component: () => (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.maverickmanju.in/" },
          { name: "Emcee", url: "https://www.maverickmanju.in/emcee" },
        ]}
      />
      <ServiceSchema
        serviceType="Professional Emcee & Event Hosting"
        description="Professional emcee hosting with interactive games, ice-breakers, crowd engagement and magic-based activities for corporate events, weddings and celebrations in Bangalore."
        url="https://www.maverickmanju.in/emcee"
      />
      <ServiceDetailPage content={emceeContent} />
    </>
  ),
});
