import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Footer() {
  const settings = useSiteSettings();

  return (
    <footer className="border-t border-border bg-[#030303] pt-16 pb-8">
      <div className="container-mm grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <p className="font-display text-2xl font-bold tracking-[0.14em]">
            {settings.artistName.toUpperCase()}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{settings.tagline}</p>
          <p className="mt-4 font-script text-lg text-foreground italic">
            Magic That Amazes. Entertainment That Engages.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { href: settings.instagram, Icon: Instagram, label: "Instagram" },
              { href: settings.facebook, Icon: Facebook, label: "Facebook" },
              { href: settings.youtube, Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn
          title="Performances"
          links={[
            { to: "/stage-magic", label: "Stage Magic" },
            { to: "/walk-around-magic", label: "Walk-Around Magic" },
            { to: "/mentalism", label: "Mentalism" },
            { to: "/emcee", label: "Emcee Activities" },
            { to: "/services", label: "All Services" },
          ]}
        />

        <FooterColumn
          title="Explore"
          links={[
            { to: "/usp", label: "USP" },
            { to: "/events", label: "Events" },
            { to: "/gallery", label: "Gallery" },
            { to: "/testimonials", label: "Testimonials" },
            { to: "/about", label: "About" },
            { to: "/book", label: "Event Enquiry" },
          ]}
        />

        <div>
          <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`tel:${settings.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Phone size={14} /> {settings.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${settings.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Mail size={14} /> {settings.email}
              </a>
            </li>
            <li className="pt-1">{settings.website}</li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-primary">
                Contact page
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-mm mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground/70 sm:flex-row sm:items-center sm:justify-between">
        <p>{settings.footerCopyright}</p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.ulmind.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-[13px] font-medium text-foreground/90"
          >
            <span className="opacity-80 transition-opacity group-hover:opacity-100">
              Designed and Developed by
            </span>
            <img
              src="/images/ulmind.png"
              alt="Ulmind"
              className="h-10 w-auto object-contain transition-all group-hover:scale-105 sm:h-12"
            />
          </a>
          <Link to="/admin/login" className="transition-colors hover:text-primary">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-bold tracking-[0.2em] text-primary uppercase">{title}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="transition-colors hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
