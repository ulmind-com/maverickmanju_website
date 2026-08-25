import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  CalendarCheck,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareQuote,
  Settings,
  Wand2,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const NAV = [
  { to: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { to: "/admin/gallery", label: "Gallery", Icon: Images },
  { to: "/admin/testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { to: "/admin/bookings", label: "Bookings", Icon: CalendarCheck },
  { to: "/admin/settings", label: "Settings", Icon: Settings },
] as const;

/**
 * Protected admin layout. Demo-only guard: it checks the local session and
 * redirects to /admin/login when absent. This is NOT server-side protection.
 */
export function AdminShell({ children }: { children: ReactNode }) {
  const { user, ready, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) navigate({ to: "/admin/login" });
  }, [ready, user, navigate]);

  useEffect(() => setOpen(false), [pathname]);

  if (!ready || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        Checking session…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-[#0b0b0d] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[68px] items-center justify-between border-b border-border px-5">
          <Link to="/" className="font-display text-sm tracking-[0.18em]">
            MAVERICK<span className="text-primary">.MANJU</span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-muted-foreground lg:hidden"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="p-3">
          <p className="px-2 py-2 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Management
          </p>
          <ul className="space-y-1">
            {NAV.map(({ to, label, Icon }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                  activeProps={{
                    className: "border-l-2 border-primary bg-card text-foreground",
                  }}
                >
                  <Icon size={16} /> {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-border pt-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Wand2 size={16} /> View website
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut();
                navigate({ to: "/admin/login" });
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
          <p className="mt-6 border border-dashed border-border p-3 text-[10px] leading-relaxed text-muted-foreground/70">
            Frontend Demo Storage — content lives in this browser only. No server, no real
            authentication.
          </p>
        </nav>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center border border-border lg:hidden"
          >
            <Menu size={18} />
          </button>
          <p className="hidden text-[11px] tracking-[0.2em] text-muted-foreground uppercase sm:block">
            Admin Panel
          </p>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">{user.email}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-primary font-display text-xs text-primary">
              {user.name.charAt(0)}
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
