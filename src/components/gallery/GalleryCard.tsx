import { Play } from "lucide-react";
import { useRef, useState } from "react";
import type { GalleryItem } from "@/types";
import { playPreview, stopPreview } from "@/lib/video";
import { cn } from "@/lib/utils";

/**
 * One gallery tile. The media keeps the proportions it was uploaded with — the
 * tile is as tall as the file is, never cropped to a fixed box — and a video
 * plays with sound while the pointer is over it. Clicking still opens the
 * lightbox, where it plays with full controls.
 */
export function GalleryCard({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Held until the browser reports the real dimensions, so the tile does not
  // jump once metadata arrives.
  const [ratio, setRatio] = useState<string | undefined>(undefined);
  const hasCaption = Boolean(item.title || item.description);
  const isVideo = item.type === "video";

  function previewOn() {
    if (videoRef.current) void playPreview(videoRef.current);
  }

  function previewOff() {
    if (videoRef.current) stopPreview(videoRef.current);
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={isVideo ? previewOn : undefined}
      onMouseLeave={isVideo ? previewOff : undefined}
      onFocus={isVideo ? previewOn : undefined}
      onBlur={isVideo ? previewOff : undefined}
      className="group relative block w-full overflow-hidden border border-border bg-surface text-left focus:ring-2 focus:ring-primary focus:outline-none"
      aria-label={item.title ? `Open ${item.title}` : `Open ${item.type}`}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={item.mediaUrl}
          {...(item.thumbnailUrl ? { poster: item.thumbnailUrl } : {})}
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth && videoHeight) setRatio(`${videoWidth} / ${videoHeight}`);
          }}
          className="block h-auto w-full transition-transform duration-700 group-hover:scale-105"
          style={{ aspectRatio: ratio ?? "16 / 9" }}
        />
      ) : (
        <img
          src={item.mediaUrl}
          alt={item.title || ""}
          loading="lazy"
          className="block h-auto w-full transition-transform duration-700 group-hover:scale-105"
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

      {isVideo && (
        <span className="pointer-events-none absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-primary bg-black/70 text-primary transition-opacity duration-300 group-hover:opacity-0">
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
