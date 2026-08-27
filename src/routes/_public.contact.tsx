import { createFileRoute } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Youtube,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink, SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/data/seed";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { telLink, whatsappLink } from "@/lib/utils";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact Maverick Manju — Best Magician & Emcee in Bangalore" },
      {
        name: "description",
        content:
          "Get in touch with Maverick Manju — the best magician and emcee in Bangalore. Reach out for event enquiries, date availability, collaborations and bookings via phone, WhatsApp or email.",
      },
      {
        name: "keywords",
        content:
          "maverick manju, mevrick manju, mevrick, manju magician, maverick magician, maverick manju magician, maverick manju emcee, maverick manju mentalist, maverick manju bangalore, maverick manju bengaluru, best magician in bangalore, best magician in bengaluru, magician near me, magician in bangalore, best emcee in bangalore, best emcee in bengaluru, magician for hire in bangalore, professional magician in bangalore",
      },
      { property: "og:title", content: "Contact Maverick Manju — Best Magician in Bangalore" },
      { property: "og:description", content: "Check date availability and plan your event with Maverick Manju." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.maverickmanju.in/contact" },
      { name: "twitter:title", content: "Contact Maverick Manju — Magician & Emcee in Bangalore" },
      { name: "twitter:description", content: "Get in touch to book the best magician and emcee in Bangalore." },
    ],
    links: [
      { rel: "canonical", href: "https://www.maverickmanju.in/contact" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const s = useSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Say hello.
            <br />
            <span className="text-primary">Check a date.</span>
          </>
        }
        subtitle={s.tagline}
        image={IMAGES.walkAround}
      >
        <ButtonLink to="/book">Send an enquiry</ButtonLink>
      </PageHero>

      <section className="py-16 sm:py-20">
        <div className="container-mm">
          <SectionHeader eyebrow="Direct" title="Reach me here" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ContactCard
              icon={<Phone size={20} />}
              label="Phone"
              value={s.phone}
              href={telLink(s.phone)}
            />
            <ContactCard
              icon={<MessageCircle size={20} />}
              label="WhatsApp"
              value={`+${s.whatsapp}`}
              href={whatsappLink(s.whatsapp, s.defaultBookingMessage)}
            />
            <ContactCard
              icon={<Mail size={20} />}
              label="Email"
              value={s.email}
              href={`mailto:${s.email}`}
            />
            <ContactCard
              icon={<Instagram size={20} />}
              label="Instagram"
              value="@maverickmanju"
              href={s.instagram}
            />
            <ContactCard
              icon={<Facebook size={20} />}
              label="Facebook"
              value="Maverick Manju"
              href={s.facebook}
            />
            <ContactCard
              icon={<Youtube size={20} />}
              label="YouTube"
              value="Show reels"
              href={s.youtube}
            />
            <ContactCard
              icon={<Star size={20} />}
              label="Google Reviews"
              value="Leave a review"
              href={s.googleReviewLink}
            />
            <ContactCard
              icon={<MapPin size={20} />}
              label="Based in"
              value="Bengaluru — available across India"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="card-mm h-full p-6 hover:-translate-y-1 hover:border-primary/60 hover:glow-red">
      <span className="text-primary">{icon}</span>
      <p className="mt-4 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-1 font-display text-lg break-words">{value}</p>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}
