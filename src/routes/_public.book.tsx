import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { AvailabilityCalendar } from "@/components/site/AvailabilityCalendar";
import { BookingForm } from "@/components/site/BookingForm";
import { PageHero } from "@/components/site/PageHero";
import { useServiceData } from "@/hooks/useServiceData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { telLink, whatsappLink } from "@/lib/utils";
import { AVAILABILITY_KEY, getBlockedDates } from "@/services/availabilityService";
import { IMAGES } from "@/data/seed";

export const Route = createFileRoute("/_public/book")({
  head: () => ({
    meta: [
      {
        title:
          "Book Maverick Manju — Best Magician & Emcee in Bangalore | Event Enquiry",
      },
      {
        name: "description",
        content:
          "Book Maverick Manju for your next event. Fill in the enquiry form to hire the best magician, emcee and mentalist in Bangalore for corporate events, weddings, birthdays, hotel events and private parties.",
      },
      {
        name: "keywords",
        content:
          "magician for hire in bangalore, magician for hire in bengaluru, best magician in bangalore, best magician in bengaluru, best magician near me, magician near me, professional magician in bangalore, best emcee in bangalore, best emcee in bengaluru, professional emcee in bangalore, best mentalist in bangalore, maverick manju, mevrick manju, maverick manju magician, maverick manju emcee, maverick manju mentalist, maverick manju bangalore, maverick manju bengaluru",
      },
      { property: "og:title", content: "Book Maverick Manju — Best Magician & Emcee in Bangalore" },
      { property: "og:description", content: "Let's create some magic. Share your date and book the best magician in Bangalore." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/book" },
      { name: "twitter:title", content: "Book Maverick Manju — Best Magician in Bangalore" },
      { name: "twitter:description", content: "Book the best magician and emcee in Bangalore for your next event." },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/book" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const settings = useSiteSettings();
  const { data: blockedDates } = useServiceData<string[]>(AVAILABILITY_KEY, getBlockedDates, []);

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
            <div className="card-mm p-6">
              <h2 className="font-display text-xl">Prefer to talk?</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={telLink(settings.phone)}
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Phone size={15} /> {settings.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink(settings.whatsapp, settings.defaultBookingMessage)}
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

              {/* Live availability, so a guest can see the open dates before filling
                  anything in. The form and the API both re-check on submit. */}
              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  Availability
                </p>
                <AvailabilityCalendar blocked={new Set(blockedDates)} />
              </div>
            </div>
          </aside>

          <BookingForm />
        </div>
      </section>
    </>
  );
}
