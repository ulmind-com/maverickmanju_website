import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { emceeContent } from "@/data/servicePages";

export const Route = createFileRoute("/_public/emcee")({
  head: () => ({
    meta: [
      { title: "Emcee & Interactive Entertainment | Maverick Manju" },
      {
        name: "description",
        content:
          "Professional hosting, ice breakers, magic-based games and crowd interaction customised to your audience, venue and event format.",
      },
      { property: "og:title", content: "Emcee & Interactive Entertainment | Maverick Manju" },
      { property: "og:description", content: "Don't just host the event. Own the energy." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: () => <ServiceDetailPage content={emceeContent} />,
});
