import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { stageMagicContent } from "@/data/servicePages";

export const Route = createFileRoute("/_public/stage-magic")({
  head: () => ({
    meta: [
      { title: "Stage Magic by Maverick Manju | Corporate & Event Stage Shows" },
      {
        name: "description",
        content:
          "A professional stage magic show combining magic, comedy, mentalism and audience participation for annual days, award nights, conferences and celebrations.",
      },
      { property: "og:title", content: "Stage Magic by Maverick Manju" },
      {
        property: "og:description",
        content: "A stage full of wonder. An audience full of reactions.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <ServiceDetailPage content={stageMagicContent} />,
});
