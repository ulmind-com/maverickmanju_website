import { Play } from "lucide-react";
import type { GalleryItem } from "@/types";
import { cn } from "@/lib/utils";

const layoutClass: Record<GalleryItem["layout"], string> = {
  small: "sm:col-span-1 row-span-1",
  medium: "sm:col-span-1 row-span-1",
  large: "sm:col-span-2 row-span-2",
  tall: "sm:col-span-1 row-span-2",
  wide: "sm:col-span-2 row-span-1",
};

export function GalleryCard({
  item,
  onOpen,
  useLayout = true,
}: {
  item: GalleryItem;
  onOpen: () => void;
  useLayout?: boolean;
}) {
  const poster = item.type === "video" ? item.thumbnailUrl || item.mediaUrl : item.mediaUrl;
  const hasCaption = Boolean(item.title || item.description);

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative overflow-hidden border border-border bg-surface text-left focus:ring-2 focus:ring-primary focus:outline-none",
        useLayout && layoutClass[item.layout],
      )}
      aria-label={item.title ? `Open ${item.title}` : `Open ${item.type}`}
    >
      {item.type === "video" && !item.thumbnailUrl ? (
        <video
          src={item.mediaUrl}
          muted
          playsInline
          preload="metadata"
          className="h-full min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <img
          src={poster}
          alt={item.title || ""}
          loading="lazy"
          className="h-full min-h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      <span
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity",
          hasCaption
            ? "bg-gradient-to-t from-black via-black/25 to-transparent opacity-80 group-hover:opacity-95"
            : "bg-black/20 opacity-0 group-hover:opacity-100",
        )}
      />
      <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:inset-ring group-hover:inset-ring-primary" />

      {item.type === "video" && (
        <span className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-primary bg-black/70 text-primary transition-transform group-hover:scale-110">
          <Play size={16} fill="currentColor" />
        </span>
      )}

      {/* Title and description are optional — an untitled item shows only the media. */}
      {hasCaption && (
        <span className="absolute inset-x-0 bottom-0 block p-5">
          {item.title && (
            <span className="block font-display text-lg leading-tight">{item.title}</span>
          )}
          {item.description && (
            <span className="mt-1 line-clamp-2 block text-xs text-muted-foreground">
              {item.description}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
