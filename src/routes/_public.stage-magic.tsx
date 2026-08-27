import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { stageMagicContent } from "@/data/servicePages";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/SeoSchemas";

export const Route = createFileRoute("/_public/stage-magic")({
  head: () => ({
    meta: [
      { title: "Stage Magic Show in Bangalore — Maverick Manju | Best Stage Magician" },
      {
        name: "description",
        content:
          "Experience breathtaking stage magic by Maverick Manju — the best stage magician in Bangalore. Grand illusions, audience participation, and comedy magic for corporate events, weddings, gala dinners, award nights and annual day celebrations.",
      },
      {
        name: "keywords",
        content:
          "stage magician in bangalore, stage magic show in bangalore, best magic show in bangalore, best magic show in bengaluru, magician show in bangalore, magician show in bengaluru, magic show in bangalore, magic show in bengaluru, corporate magician in bangalore, corporate magician in bengaluru, event magician in bangalore, magician for corporate events in bangalore, magician for annual function in bangalore, magician for college events in bangalore, magician for school events in bangalore, best magician in bangalore, best magician in bengaluru, top magician in bangalore, professional magician in bangalore, maverick manju magician, maverick manju bangalore",
      },
      { property: "og:title", content: "Stage Magic Show in Bangalore — Maverick Manju" },
      {
        property: "og:description",
        content:
          "A stage full of wonder. Grand illusions, comedy magic and audience participation by the best stage magician in Bangalore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/stage-magic" },
      { property: "og:image", content: "https://www.maverickmanju.in/images/hero-stage.jpg" },
      { name: "twitter:title", content: "Stage Magic Show in Bangalore — Maverick Manju" },
      {
        name: "twitter:description",
        content:
          "Grand illusions, comedy magic and audience participation for corporate events and celebrations.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/stage-magic" },
    ],
  }),
  component: () => (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.maverickmanju.in/" },
          { name: "Stage Magic", url: "https://www.maverickmanju.in/stage-magic" },
        ]}
      />
      <ServiceSchema
        serviceType="Stage Magic Show"
        description="Professional stage magic show with grand illusions, comedy magic, mentalism and audience participation for corporate events, weddings, annual days and celebrations in Bangalore."
        url="https://www.maverickmanju.in/stage-magic"
      />
      <ServiceDetailPage content={stageMagicContent} />
    </>
  ),
});
