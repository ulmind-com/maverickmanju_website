import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { walkAroundContent } from "@/data/servicePages";

export const Route = createFileRoute("/_public/walk-around-magic")({
  head: () => ({
    meta: [
      { title: "Walk-Around Magic by Maverick Manju | Close-Up Magician" },
      {
        name: "description",
        content:
          "Table-to-table close-up magic for star hotel brunches, receptions, networking events, weddings and private parties.",
      },
      { property: "og:title", content: "Walk-Around Magic by Maverick Manju" },
      {
        property: "og:description",
        content: "Magic doesn't always need a stage. Sometimes the magician comes to you.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <ServiceDetailPage content={walkAroundContent} />,
});
