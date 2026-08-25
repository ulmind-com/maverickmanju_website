import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { GalleryItem } from "@/types";

interface Props {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Fullscreen viewer: images zoom, videos play in a premium player. Keyboard: ← → Esc */
export function GalleryLightbox({ items, index, onClose, onIndexChange }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const item = items[index];

  const go = useCallback(
    (delta: number) => {
      setZoomed(false);
      onIndexChange((index + delta + items.length) % items.length);
    },
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex flex-col bg-black/96 backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-[10px] font-bold tracking-[0.22em] text-primary-glow uppercase">
            {item.category}
          </p>
          <p className="truncate font-display text-lg">{item.title}</p>
        </div>
        <div className="flex items-center gap-2">
          {item.type === "image" && (
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              className="grid h-10 w-10 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
            >
              {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-auto p-4 sm:p-8">
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-2 z-10 grid h-11 w-11 place-items-center border border-border bg-black/60 transition-colors hover:border-primary hover:text-primary sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {item.type === "video" ? (
          <video
            key={item.id}
            src={item.mediaUrl}
            poster={item.thumbnailUrl}
            controls
            autoPlay
            playsInline
            className="max-h-[75vh] w-full max-w-5xl border border-border bg-black"
          />
        ) : (
          <img
            key={item.id}
            src={item.mediaUrl}
            alt={item.title}
            onClick={() => setZoomed((z) => !z)}
            className={
              zoomed
                ? "max-w-none cursor-zoom-out object-contain"
                : "max-h-[75vh] max-w-full cursor-zoom-in object-contain"
            }
            style={zoomed ? { height: "150vh" } : undefined}
          />
        )}

        {items.length > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-2 z-10 grid h-11 w-11 place-items-center border border-border bg-black/60 transition-colors hover:border-primary hover:text-primary sm:right-6"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <div className="border-t border-border px-4 py-3 text-center text-xs text-muted-foreground sm:px-6">
        {item.description && <p className="mb-1">{item.description}</p>}
        <p>
          {index + 1} / {items.length} — use ← → to navigate
        </p>
      </div>
    </div>
  );
}
