import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { mentalismContent } from "@/data/servicePages";

export const Route = createFileRoute("/_public/mentalism")({
  head: () => ({
    meta: [
      { title: "Mentalist & Mentalism Shows | Maverick Manju" },
      {
        name: "description",
        content:
          "Predictions, thought reading and impossible reveals performed with theatre and restraint for corporate and private audiences.",
      },
      { property: "og:title", content: "Mentalist & Mentalism Shows | Maverick Manju" },
      {
        property: "og:description",
        content: "A sealed prediction, written before your event began.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <ServiceDetailPage content={mentalismContent} />,
});
