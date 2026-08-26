import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { Testimonial } from "@/types";
import { Stars } from "./primitives";

/**
 * Fullscreen viewer for video testimonials, stepping through them with the
 * arrows or ← → and closing on Esc.
 *
 * Unlike the card, this one keeps the browser's controls: at full size a
 * visitor watching a minute-long clip wants a scrub bar, and it starts with
 * sound because opening it is a deliberate act.
 */
export function TestimonialLightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: Testimonial[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const item = items[index];

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + items.length) % items.length),
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  if (!item) return null;

  const meta = [item.role, item.company, item.eventType].filter(Boolean).join(" • ");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.clientName ? `Testimonial from ${item.clientName}` : "Video testimonial"}
      className="fixed inset-0 z-[100] flex flex-col bg-black/96 backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-[0.22em] text-primary-glow uppercase">
            Client words
          </p>
          <p className="truncate font-display text-lg">{item.clientName || "Video testimonial"}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-10 w-10 shrink-0 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="absolute left-2 z-10 grid h-11 w-11 place-items-center border border-border bg-black/60 transition-colors hover:border-primary hover:text-primary sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <video
          key={item.id}
          src={item.videoUrl}
          {...(item.photoUrl ? { poster: item.photoUrl } : {})}
          controls
          autoPlay
          playsInline
          controlsList="nodownload"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className="max-h-[78vh] w-auto max-w-full border border-border bg-black"
        />

        {items.length > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="absolute right-2 z-10 grid h-11 w-11 place-items-center border border-border bg-black/60 transition-colors hover:border-primary hover:text-primary sm:right-6"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <div className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground sm:px-6">
        {item.rating > 0 && (
          <span className="mb-2 inline-block">
            <Stars rating={item.rating} />
          </span>
        )}
        {item.text && <p className="mx-auto mb-1 max-w-2xl text-foreground/85">“{item.text}”</p>}
        {meta && <p className="mb-1">{meta}</p>}
        <p>
          {index + 1} / {items.length}
          {items.length > 1 && " — use ← → to move between clips"}
        </p>
      </div>
    </div>
  );
}
