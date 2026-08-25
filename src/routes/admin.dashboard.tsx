import { Link, createFileRoute } from "@tanstack/react-router";
import {
  CalendarClock,
  CheckCircle2,
  Film,
  Image as ImageIcon,
  Inbox,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminPageHeader, BookingStatusBadge, StatsCard } from "@/components/admin/ui";
import { useServiceData } from "@/hooks/useServiceData";
import { BOOKINGS_KEY, getBookings } from "@/services/bookingService";
import { GALLERY_KEY, getGalleryItems } from "@/services/galleryService";
import { TESTIMONIALS_KEY, getTestimonials } from "@/services/testimonialService";
import type { BookingEnquiry, GalleryItem, Testimonial } from "@/types";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard | Maverick Manju Admin" },
      { name: "description", content: "Overview of enquiries, gallery and testimonials." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminShell>
      <Dashboard />
    </AdminShell>
  ),
});

function Dashboard() {
  const { data: bookings } = useServiceData<BookingEnquiry[]>(BOOKINGS_KEY, getBookings, []);
  const { data: gallery } = useServiceData<GalleryItem[]>(GALLERY_KEY, getGalleryItems, []);
  const { data: testimonials } = useServiceData<Testimonial[]>(
    TESTIMONIALS_KEY,
    getTestimonials,
    [],
  );

  const published = gallery.filter((g) => g.status === "published");
  const statusCounts = (["new", "contacted", "confirmed", "completed", "cancelled"] as const).map(
    (s) => ({ status: s, count: bookings.filter((b) => b.status === s).length }),
  );
  const maxCount = Math.max(1, ...statusCounts.map((s) => s.count));
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = [...bookings]
    .filter((b) => b.date >= today && b.status !== "cancelled")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Live counts from the frontend demo storage layer."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Total enquiries" value={bookings.length} icon={<Inbox size={18} />} accent />
        <StatsCard
          label="New enquiries"
          value={bookings.filter((b) => b.status === "new").length}
          icon={<Sparkles size={18} />}
        />
        <StatsCard
          label="Confirmed bookings"
          value={bookings.filter((b) => b.status === "confirmed").length}
          icon={<CheckCircle2 size={18} />}
        />
        <StatsCard
          label="Testimonials"
          value={testimonials.length}
          icon={<MessageSquareQuote size={18} />}
        />
        <StatsCard
          label="Published gallery items"
          value={published.length}
          icon={<ImageIcon size={18} />}
        />
        <StatsCard
          label="Videos"
          value={gallery.filter((g) => g.type === "video").length}
          icon={<Film size={18} />}
        />
        <StatsCard
          label="Images"
          value={gallery.filter((g) => g.type === "image").length}
          icon={<ImageIcon size={18} />}
        />
        <StatsCard
          label="Upcoming dates"
          value={upcoming.length}
          icon={<CalendarClock size={18} />}
        />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <Panel title="Recent enquiries" to="/admin/bookings">
          {bookings.length === 0 ? (
            <Empty text="No enquiries yet." />
          ) : (
            <ul className="divide-y divide-border">
              {bookings.slice(0, 5).map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">
                      <span className="font-display text-primary">{b.referenceNumber}</span>{" "}
                      {b.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {b.date} • {b.services.join(", ")}
                    </p>
                  </div>
                  <BookingStatusBadge status={b.status} />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Enquiries by status">
          <ul className="space-y-3">
            {statusCounts.map((s) => (
              <li key={s.status}>
                <div className="flex justify-between text-xs text-muted-foreground uppercase">
                  <span>{s.status}</span>
                  <span>{s.count}</span>
                </div>
                <div className="mt-1 h-2 bg-[#0b0b0d]">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary-glow"
                    style={{ width: `${(s.count / maxCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent gallery uploads" to="/admin/gallery">
          {gallery.length === 0 ? (
            <Empty text="No gallery items." />
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {[...gallery]
                .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                .slice(0, 8)
                .map((g) => (
                  <img
                    key={g.id}
                    src={g.thumbnailUrl || g.mediaUrl}
                    alt={g.title}
                    loading="lazy"
                    className="h-20 w-full border border-border object-cover"
                  />
                ))}
            </div>
          )}
        </Panel>

        <Panel title="Upcoming event dates">
          {upcoming.length === 0 ? (
            <Empty text="No upcoming confirmed dates." />
          ) : (
            <ul className="divide-y divide-border">
              {upcoming.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="font-display">{b.date}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {b.name} • {b.venue}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Recent testimonials" to="/admin/testimonials">
          {testimonials.length === 0 ? (
            <Empty text="No testimonials." />
          ) : (
            <ul className="divide-y divide-border">
              {testimonials.slice(0, 4).map((t) => (
                <li key={t.id} className="py-3">
                  <p className="text-sm">
                    {t.clientName}{" "}
                    <span className="text-[var(--star)]">{"★".repeat(t.rating)}</span>
                  </p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">{t.text}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}

function Panel({
  title,
  to,
  children,
}: {
  title: string;
  to?: "/admin/bookings" | "/admin/gallery" | "/admin/testimonials";
  children: React.ReactNode;
}) {
  return (
    <section className="card-mm p-5">
      <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
        <h2 className="font-display text-lg">{title}</h2>
        {to && (
          <Link to={to} className="text-[11px] tracking-[0.14em] text-primary uppercase">
            View all
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="py-6 text-center text-sm text-muted-foreground">{text}</p>;
}
