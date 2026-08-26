import { Play, Quote } from "lucide-react";
import { useRef } from "react";
import type { Testimonial } from "@/types";
import { playPreview, stopPreview } from "@/lib/video";
import { Stars } from "./primitives";
import { cn } from "@/lib/utils";

/**
 * A testimonial is either written or a video — every field except the media is
 * optional, so the card only renders the parts the admin actually filled in.
 *
 * A video behaves exactly like a gallery tile: it keeps the proportions it was
 * uploaded with, plays with sound while the pointer is over it, and opens
 * fullscreen with full controls when clicked.
 */
export function TestimonialCard({
  testimonial: t,
  featured = false,
  onOpenVideo,
}: {
  testimonial: Testimonial;
  featured?: boolean;
  onOpenVideo?: (() => void) | undefined;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  function previewOn() {
    if (videoRef.current) void playPreview(videoRef.current);
  }

  function previewOff() {
    if (videoRef.current) stopPreview(videoRef.current);
  }

  const meta = [t.role, t.company, t.eventType].filter(Boolean).join(" • ");
  const hasIdentity = Boolean(t.clientName || meta);

  return (
    <article
      className={cn(
        "card-mm relative flex flex-col p-7 hover:-translate-y-1 hover:border-primary/60 hover:glow-red",
        featured && "border-t-2 border-t-primary bg-gradient-to-b from-accent/40 to-card",
      )}
    >
      {t.text && <Quote className="absolute top-6 right-6 text-primary/25" size={34} />}

      {t.rating > 0 && <Stars rating={t.rating} />}

      {t.videoUrl && (
        <button
          type="button"
          onClick={onOpenVideo}
          onMouseEnter={previewOn}
          onMouseLeave={previewOff}
          onFocus={previewOn}
          onBlur={previewOff}
          aria-label={
            t.clientName ? `Open testimonial from ${t.clientName}` : "Open video testimonial"
          }
          className={cn(
            "group relative block w-full overflow-hidden border border-border bg-surface focus:ring-2 focus:ring-primary focus:outline-none",
            t.rating > 0 && "mt-4",
          )}
        >
          <video
            ref={videoRef}
            src={t.videoUrl}
            {...(t.photoUrl ? { poster: t.photoUrl } : {})}
            loop
            playsInline
            preload="metadata"
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="block h-auto w-full"
          />
          <span className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="pointer-events-none absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-primary bg-black/70 text-primary transition-opacity duration-300 group-hover:opacity-0">
            <Play size={16} fill="currentColor" />
          </span>
        </button>
      )}

      {t.text && (
        <p
          className={cn(
            "mt-4 text-foreground/90",
            featured ? "font-script text-xl leading-relaxed italic" : "text-[15px]",
          )}
        >
          “{t.text}”
        </p>
      )}

      {hasIdentity && (
        <div
          className={cn(
            "flex items-center gap-3 border-t border-border pt-4",
            t.text ? "mt-6" : "mt-4",
          )}
        >
          {t.photoUrl ? (
            <img
              src={t.photoUrl}
              alt={t.clientName || ""}
              loading="lazy"
              className="h-11 w-11 rounded-full border border-border object-cover"
            />
          ) : t.clientName ? (
            <span className="grid h-11 w-11 place-items-center rounded-full border border-primary/50 font-display text-sm text-primary">
              {t.clientName.charAt(0)}
            </span>
          ) : null}
          <div className="min-w-0">
            {t.clientName && (
              <p className="truncate font-display text-sm tracking-wide">{t.clientName}</p>
            )}
            {meta && <p className="truncate text-xs text-muted-foreground">{meta}</p>}
          </div>
        </div>
      )}
    </article>
  );
}
