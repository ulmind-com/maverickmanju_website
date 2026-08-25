import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { BookingForm } from "@/components/site/BookingForm";
import { PageHero } from "@/components/site/PageHero";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { IMAGES } from "@/data/seed";

export const Route = createFileRoute("/_public/book")({
  head: () => ({
    meta: [
      { title: "Book Maverick Manju | Magician & Emcee Booking Enquiry" },
      {
        name: "description",
        content:
          "Send your event date, format and audience details to book stage magic, walk-around magic, mentalism or emcee entertainment with Maverick Manju.",
      },
      { property: "og:title", content: "Book Maverick Manju" },
      { property: "og:description", content: "Let's create some magic. Share your date." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const settings = useSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Booking"
        title={
          <>
            Let's create
            <br />
            <span className="text-primary">some magic.</span>
          </>
        }
        subtitle="Share your date, event format and audience details. I'll help you choose the right entertainment experience."
        image={IMAGES.heroStage}
      />

      <section className="py-16 sm:py-20">
        <div className="container-mm grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="space-y-6">
            <div className="card-mm border-l-2 border-l-primary p-6">
              <h2 className="font-display text-xl">Best-fit formats</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Stage Magic • Walk-Around Magic • Emcee • Mentalism • Magic + Emcee
              </p>
            </div>
            <div className="card-mm p-6">
              <h2 className="font-display text-xl">Prefer to talk?</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Phone size={15} /> {settings.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(settings.defaultBookingMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-muted-foreground">
                  <CalendarCheck size={15} /> Dates confirm on a first-come basis
                </li>
              </ul>
            </div>
          </aside>

          <BookingForm />
        </div>
      </section>
    </>
  );
}
