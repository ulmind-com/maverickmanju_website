import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

/** Local YYYY-MM-DD. Deliberately not toISOString(), which shifts to UTC. */
export function toDateKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export const todayKey = () => toDateKey(new Date());

interface Cell {
  key: string;
  day: number;
  isPast: boolean;
  isBlocked: boolean;
  isToday: boolean;
}

/**
 * Month grid showing which dates are open and which are already booked.
 *
 * Read-only on the public booking page; pass `onToggle` to make every cell
 * clickable, which is how the admin blocks and frees dates.
 */
export function AvailabilityCalendar({
  blocked,
  onToggle,
  selected,
  className,
  busyDate,
}: {
  blocked: Set<string>;
  onToggle?: ((date: string, isBlocked: boolean) => void) | undefined;
  selected?: string | undefined;
  className?: string | undefined;
  busyDate?: string | null | undefined;
}) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = todayKey();

  const { cells, label, leadingBlanks } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: Cell[] = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const key = toDateKey(new Date(year, month, day));
      return {
        key,
        day,
        isPast: key < today,
        isBlocked: blocked.has(key),
        isToday: key === today,
      };
    });

    return {
      cells,
      leadingBlanks: new Date(year, month, 1).getDay(),
      label: cursor.toLocaleString("en-GB", { month: "long", year: "numeric" }),
    };
  }, [cursor, blocked, today]);

  const shiftMonth = (delta: number) =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));

  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => shiftMonth(-1)}
          className="grid h-8 w-8 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft size={15} />
        </button>
        <p className="font-display text-sm tracking-[0.12em] uppercase">{label}</p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => shiftMonth(1)}
          className="grid h-8 w-8 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((d, i) => (
          <span
            key={i}
            aria-hidden
            className="grid h-7 place-items-center text-[10px] font-bold tracking-[0.1em] text-muted-foreground/60 uppercase"
          >
            {d}
          </span>
        ))}

        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <span key={`blank-${i}`} />
        ))}

        {cells.map((cell) => {
          const interactive = Boolean(onToggle) && !cell.isPast;
          const isSelected = selected === cell.key;
          const label = `${cell.key}${cell.isBlocked ? " — booked" : " — available"}`;

          return (
            <button
              key={cell.key}
              type="button"
              disabled={!interactive || busyDate === cell.key}
              aria-label={label}
              title={label}
              aria-pressed={onToggle ? cell.isBlocked : undefined}
              onClick={() => onToggle?.(cell.key, cell.isBlocked)}
              className={cn(
                "grid h-9 place-items-center border text-xs transition-colors",
                cell.isPast
                  ? "border-transparent text-muted-foreground/25"
                  : cell.isBlocked
                    ? "border-destructive/50 bg-destructive/15 text-destructive line-through"
                    : "border-border text-foreground/85",
                interactive && "cursor-pointer hover:border-primary hover:text-primary",
                !interactive && "cursor-default",
                cell.isToday && !cell.isBlocked && "border-primary text-primary",
                isSelected && "ring-1 ring-primary",
                busyDate === cell.key && "opacity-50",
              )}
            >
              {cell.day}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 border border-border" /> Available
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 border border-destructive/50 bg-destructive/15" />{" "}
          Booked
        </span>
      </div>
    </div>
  );
}
