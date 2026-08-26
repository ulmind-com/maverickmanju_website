import { createFileRoute } from "@tanstack/react-router";
import { CalendarX2, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminButton, AdminPageHeader } from "@/components/admin/ui";
import { AvailabilityCalendar, todayKey } from "@/components/site/AvailabilityCalendar";
import { useServiceData } from "@/hooks/useServiceData";
import {
  AVAILABILITY_KEY,
  blockDate,
  getBlockedDatesAdmin,
  unblockDate,
  type BlockedDate,
} from "@/services/availabilityService";

export const Route = createFileRoute("/admin/availability")({
  head: () => ({
    meta: [
      { title: "Availability | Maverick Manju Admin" },
      { name: "description", content: "Mark the dates that are already booked." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminShell>
      <AdminAvailability />
    </AdminShell>
  ),
});

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function AdminAvailability() {
  const {
    data: blockedDates,
    loading,
    error,
  } = useServiceData<BlockedDate[]>(AVAILABILITY_KEY, getBlockedDatesAdmin, []);

  const [busyDate, setBusyDate] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const blocked = new Set(blockedDates.map((b) => b.date));
  const today = todayKey();
  const upcoming = blockedDates.filter((b) => b.date >= today);
  const past = blockedDates.filter((b) => b.date < today);

  /** One click toggles a date between booked and open. */
  async function toggle(date: string, isBlocked: boolean) {
    setBusyDate(date);
    setActionError("");
    try {
      if (isBlocked) await unblockDate(date);
      else await blockDate(date);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Could not update that date.");
    } finally {
      setBusyDate(null);
    }
  }

  async function clearPast() {
    if (!window.confirm(`Remove ${past.length} past blocked date(s)?`)) return;
    setActionError("");
    try {
      for (const entry of past) await unblockDate(entry.date);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Could not clear past dates.");
    }
  }

  return (
    <>
      <AdminPageHeader
        title="Availability"
        description="Click a date to mark it booked, click it again to free it. Booked dates are greyed out on the public booking calendar and the enquiry form refuses them."
      />

      {error && (
        <p className="mb-5 border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </p>
      )}
      {actionError && (
        <p className="mb-5 border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {actionError}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="card-mm p-6">
          <AvailabilityCalendar blocked={blocked} onToggle={toggle} busyDate={busyDate} />
          <p className="mt-4 border-t border-border pt-4 text-[11px] text-muted-foreground">
            Past dates cannot be changed. Use the arrows to plan further ahead.
          </p>
        </div>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl">
              Booked dates{" "}
              <span className="text-sm text-muted-foreground">({upcoming.length} upcoming)</span>
            </h2>
            {past.length > 0 && (
              <AdminButton variant="outline" onClick={clearPast}>
                <Trash2 size={14} /> Clear {past.length} past
              </AdminButton>
            )}
          </div>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : upcoming.length === 0 ? (
            <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No upcoming dates blocked — every date is open for enquiries.
            </p>
          ) : (
            <ul className="divide-y divide-border border border-border">
              {upcoming.map((entry) => (
                <li key={entry.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="text-sm">{formatDate(entry.date)}</p>
                    {entry.note && (
                      <p className="truncate text-xs text-muted-foreground">{entry.note}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    disabled={busyDate === entry.date}
                    onClick={() => toggle(entry.date, true)}
                    className="inline-flex shrink-0 items-center gap-2 border border-border px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] uppercase transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                  >
                    <CalendarX2 size={13} />
                    {busyDate === entry.date ? "Freeing…" : "Free up"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
