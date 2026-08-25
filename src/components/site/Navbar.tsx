import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/usp", label: "USP" },
  { to: "/gallery", label: "Gallery" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/book", label: "Book" },
] as const;

const MOBILE_EXTRA_LINKS = [
  { to: "/", label: "Home" },
  { to: "/stage-magic", label: "Stage Magic" },
  { to: "/walk-around-magic", label: "Walk-Around" },
  { to: "/mentalism", label: "Mentalism" },
  { to: "/emcee", label: "Emcee" },
  { to: "/events", label: "Events" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <nav className="container-mm flex h-[72px] items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Link to="/" className="font-display text-xl font-bold tracking-[0.18em] sm:text-2xl">
            MAVERICK <span className="text-primary">MANJU</span>
          </Link>
          <span className="hidden truncate text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase lg:inline">
            <span className="text-primary">|</span> Magician <span className="text-primary">|</span>{" "}
            Emcee <span className="text-primary">|</span> Creator Coach
          </span>
        </div>

        <ul className="hidden items-center gap-7 text-[12px] font-semibold tracking-[0.16em] uppercase lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="text-foreground/85 transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[72px] z-40 overflow-y-auto border-t border-border bg-background/98 spotlight backdrop-blur-xl lg:hidden">
          <ul className="container-mm flex flex-col py-4">
            {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((link) => (
              <li key={link.to} className="border-b border-border">
                <Link
                  to={link.to}
                  className="block py-4 font-display text-2xl tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: link.to === "/" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="container-mm pb-10">
            <Link
              to="/book"
              className="flex w-full items-center justify-center bg-primary px-6 py-4 text-sm font-bold tracking-[0.12em] uppercase"
            >
              Book Maverick Manju
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
