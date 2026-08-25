import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Star, Youtube } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ButtonLink, SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/data/seed";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact Maverick Manju | Magician, Emcee & Mentalist" },
      {
        name: "description",
        content:
          "Call, WhatsApp or email Maverick Manju to check date availability for magic, mentalism and emcee entertainment at your event.",
      },
      { property: "og:title", content: "Contact Maverick Manju" },
      { property: "og:description", content: "Check date availability and plan your event." },
      { property: "og:type", content: "website" },
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
              href={`tel:${s.phone.replace(/\s/g, "")}`}
            />
            <ContactCard
              icon={<MessageCircle size={20} />}
              label="WhatsApp"
              value={`+${s.whatsapp}`}
              href={`https://wa.me/${s.whatsapp}?text=${encodeURIComponent(s.defaultBookingMessage)}`}
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
