import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Eye, Mail, MessageCircle, Phone, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminButton,
  AdminField,
  AdminModal,
  AdminPageHeader,
  BookingStatusBadge,
  adminInput,
} from "@/components/admin/ui";
import { useServiceData } from "@/hooks/useServiceData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  BOOKINGS_KEY,
  deleteBooking,
  getBookings,
  updateBooking,
  updateBookingStatus,
} from "@/services/bookingService";
import { BOOKING_STATUSES, type BookingEnquiry, type BookingStatus } from "@/types";

export const Route = createFileRoute("/admin/bookings")({
  head: () => ({
    meta: [
      { title: "Booking Enquiries | Maverick Manju Admin" },
      { name: "description", content: "Manage incoming event booking enquiries." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminShell>
      <AdminBookings />
    </AdminShell>
  ),
});

function AdminBookings() {
  const { data: bookings } = useServiceData<BookingEnquiry[]>(BOOKINGS_KEY, getBookings, []);
  const settings = useSiteSettings();
  const [openId, setOpenId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all");

  const visible = useMemo(
    () =>
      bookings.filter(
        (b) =>
          (statusFilter === "all" || b.status === statusFilter) &&
          `${b.referenceNumber} ${b.name} ${b.mobile} ${b.location} ${b.venue}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [bookings, search, statusFilter],
  );

  const active = bookings.find((b) => b.id === openId) ?? null;

  return (
    <>
      <AdminPageHeader
        title="Booking Enquiries"
        description="Every enquiry submitted through the public booking form."
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-[1fr_220px]">
        <input
          className={adminInput}
          placeholder="Search reference, name, mobile, location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={adminInput}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
        >
          <option value="all">All statuses</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto border border-border xl:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0b0b0d] text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <tr>
              {["Ref", "Name", "Mobile", "Event date", "Services", "Guests", "Venue", "Status", "Created", ""].map(
                (h) => (
                  <th key={h} className="px-3 py-3 font-bold">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {visible.map((b) => (
              <tr key={b.id} className="border-t border-border hover:bg-card/60">
                <td className="px-3 py-3 font-display text-primary">{b.referenceNumber}</td>
                <td className="px-3 py-3">{b.name}</td>
                <td className="px-3 py-3 text-muted-foreground">{b.mobile}</td>
                <td className="px-3 py-3">{b.date}</td>
                <td className="max-w-[200px] truncate px-3 py-3 text-xs text-muted-foreground">
                  {b.services.join(", ")}
                </td>
                <td className="px-3 py-3">{b.guests}</td>
                <td className="px-3 py-3 text-xs text-muted-foreground">{b.venue}</td>
                <td className="px-3 py-3">
                  <BookingStatusBadge status={b.status} />
                </td>
                <td className="px-3 py-3 text-xs text-muted-foreground">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      aria-label="View"
                      onClick={() => setOpenId(b.id)}
                      className="grid h-8 w-8 place-items-center border border-border hover:border-primary hover:text-primary"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label="Mark confirmed"
                      onClick={() => updateBookingStatus(b.id, "confirmed")}
                      className="grid h-8 w-8 place-items-center border border-border hover:border-emerald-400 hover:text-emerald-300"
                    >
                      <CheckCircle2 size={14} />
                    </button>
                    <button
                      type="button"
                      aria-label="Delete"
                      onClick={() => deleteBooking(b.id)}
                      className="grid h-8 w-8 place-items-center border border-border hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:hidden">
        {visible.map((b) => (
          <div key={b.id} className="card-mm p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-primary">{b.referenceNumber}</p>
                <p className="font-display text-lg">{b.name}</p>
                <p className="text-xs text-muted-foreground">
                  {b.date} • {b.guests} guests • {b.venue}
                </p>
              </div>
              <BookingStatusBadge status={b.status} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{b.services.join(", ")}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <AdminButton variant="outline" onClick={() => setOpenId(b.id)}>
                View
              </AdminButton>
              <AdminButton variant="outline" onClick={() => updateBookingStatus(b.id, "confirmed")}>
                Confirm
              </AdminButton>
              <AdminButton variant="danger" onClick={() => deleteBooking(b.id)}>
                Delete
              </AdminButton>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No enquiries yet. Submit the public booking form to see one here.
        </p>
      )}

      {active && (
        <AdminModal
          title={`Booking ${active.referenceNumber}`}
          onClose={() => setOpenId(null)}
          wide
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <Detail label="Client" value={active.name} />
              <Detail label="Mobile" value={active.mobile} />
              <Detail label="Email" value={active.email || "—"} />
              <Detail label="Event date" value={active.date} />
              <Detail label="Services" value={active.services.join(", ")} />
              <Detail label="Duration" value={active.duration} />
              <Detail label="Expected guests" value={String(active.guests)} />
              <Detail label="Venue type" value={active.venue} />
              <Detail label="Sound system" value={active.sound} />
              <Detail label="Location" value={active.location} />
              <Detail label="Message" value={active.message || "—"} />
              <Detail
                label="Created"
                value={new Date(active.createdAt).toLocaleString()}
              />
            </div>

            <div className="space-y-5">
              <AdminField label="Status">
                <select
                  className={adminInput}
                  value={active.status}
                  onChange={(e) =>
                    updateBookingStatus(active.id, e.target.value as BookingStatus)
                  }
                >
                  {BOOKING_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </AdminField>

              <AdminField label="Internal note">
                <textarea
                  className={`${adminInput} min-h-28`}
                  value={active.internalNote ?? ""}
                  onChange={(e) => updateBooking(active.id, { internalNote: e.target.value })}
                  placeholder="Quote sent, follow-up date, travel notes…"
                />
              </AdminField>

              <div>
                <p className="mb-2 text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  Quick actions
                </p>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${active.mobile.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase hover:border-primary hover:text-primary"
                  >
                    <Phone size={14} /> Call
                  </a>
                  <a
                    href={`https://wa.me/${active.mobile.replace(/\D/g, "")}?text=${encodeURIComponent(
                      `${settings.defaultBookingMessage} (Ref ${active.referenceNumber})`,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase hover:border-primary hover:text-primary"
                  >
                    <MessageCircle size={14} /> WhatsApp
                  </a>
                  {active.email && (
                    <a
                      href={`mailto:${active.email}?subject=${encodeURIComponent(`Your enquiry ${active.referenceNumber}`)}`}
                      className="inline-flex items-center gap-2 border border-border px-4 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase hover:border-primary hover:text-primary"
                    >
                      <Mail size={14} /> Email
                    </a>
                  )}
                </div>
              </div>

              <AdminButton
                className="w-full"
                onClick={() => updateBookingStatus(active.id, "confirmed")}
              >
                <CheckCircle2 size={14} /> Mark as confirmed
              </AdminButton>
            </div>
          </div>
        </AdminModal>
      )}
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-2">
      <p className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">{label}</p>
      <p className="mt-0.5 text-sm break-words">{value}</p>
    </div>
  );
}
