import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Services, USP, Gallery and Testimonials scroll to their section on the home
 * page rather than opening a page of their own — the home page already carries
 * each of them in full. Book stays a real page because it is a form.
 */
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/", hash: "services", label: "Services" },
  { to: "/", hash: "usp", label: "USP" },
  { to: "/", hash: "gallery", label: "Gallery" },
  { to: "/", hash: "testimonials", label: "Testimonials" },
  { to: "/book", label: "Book" },
] as const;

const MOBILE_EXTRA_LINKS = [
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
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <nav className="container-mm flex h-[72px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link to="/" className="font-display text-xl font-bold tracking-[0.18em] sm:text-2xl">
              MAVERICK <span className="text-primary">MANJU</span>
            </Link>
            <span className="hidden truncate text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase lg:inline">
              <span className="text-primary">|</span> Magician{" "}
              <span className="text-primary">|</span> Emcee <span className="text-primary">|</span>{" "}
              Mentalist <span className="text-primary">|</span> Creator Coach
            </span>
          </div>

          <ul className="hidden items-center gap-7 text-[12px] font-semibold tracking-[0.16em] uppercase lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  {...("hash" in link ? { hash: link.hash } : {})}
                  className="text-foreground/85 transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: link.to === "/", includeHash: true }}
                  {...(link.to === "/" && !("hash" in link)
                    ? { onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) }
                    : {})}
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
      </header>

      {/* Rendered outside <header> on purpose: the header's backdrop-blur makes it
          the containing block for fixed descendants, so a panel nested inside it
          measured against the 72px bar instead of the viewport and collapsed to
          a 1px sliver. */}
      {open && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto border-t border-border bg-background spotlight lg:hidden">
          <ul className="container-mm flex flex-col py-4">
            {[...NAV_LINKS, ...MOBILE_EXTRA_LINKS].map((link) => (
              <li key={link.label} className="border-b border-border">
                <Link
                  to={link.to}
                  {...("hash" in link ? { hash: link.hash } : {})}
                  className="block py-4 font-display text-2xl tracking-wide text-muted-foreground transition-colors hover:text-primary"
                  activeProps={{ className: "text-foreground" }}
                  activeOptions={{ exact: link.to === "/", includeHash: true }}
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
    </>
  );
}
