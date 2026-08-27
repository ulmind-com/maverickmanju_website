import { createFileRoute } from "@tanstack/react-router";
import { ServiceDetailPage } from "@/components/site/ServiceDetailPage";
import { mentalismContent } from "@/data/servicePages";
import { BreadcrumbSchema, ServiceSchema } from "@/components/site/SeoSchemas";

export const Route = createFileRoute("/_public/mentalism")({
  head: () => ({
    meta: [
      { title: "Mentalism & Mind Reading Show in Bangalore — Maverick Manju | Best Mentalist" },
      {
        name: "description",
        content:
          "Book the best mentalist in Bangalore. Maverick Manju performs incredible mind reading, predictions, psychological illusions and sealed envelope reveals that will leave your audience stunned. Perfect for corporate events, private shows and brand experiences.",
      },
      {
        name: "keywords",
        content:
          "mentalist in bangalore, mentalist in bengaluru, best mentalist in bangalore, best mentalist in bengaluru, mentalism show in bangalore, mentalism show in bengaluru, best magician in bangalore, best magician in bengaluru, professional magician in bangalore, magician in bangalore, magic show in bangalore, corporate magician in bangalore, magician for corporate events in bangalore, maverick manju mentalist, maverick manju bangalore, maverick manju bengaluru",
      },
      {
        property: "og:title",
        content: "Mentalism & Mind Reading Show — Maverick Manju, Bangalore",
      },
      {
        property: "og:description",
        content:
          "Predictions, thought reading and impossible reveals — mentalism by the best mentalist in Bangalore.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/mentalism" },
      { property: "og:image", content: "https://www.maverickmanju.in/images/mentalism.jpg" },
      { name: "twitter:title", content: "Mentalism & Mind Reading Show — Maverick Manju" },
      {
        name: "twitter:description",
        content:
          "Mind reading, predictions and impossible reveals by the best mentalist in Bangalore.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/mentalism" },
    ],
  }),
  component: () => (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.maverickmanju.in/" },
          { name: "Mentalism", url: "https://www.maverickmanju.in/mentalism" },
        ]}
      />
      <ServiceSchema
        serviceType="Mentalism & Mind Reading Show"
        description="Professional mentalism and mind reading performance with predictions, thought reading and sealed envelope reveals for corporate events and private shows in Bangalore."
        url="https://www.maverickmanju.in/mentalism"
      />
      <ServiceDetailPage content={mentalismContent} />
    </>
  ),
});
