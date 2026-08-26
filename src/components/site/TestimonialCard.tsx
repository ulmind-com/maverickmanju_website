import { Quote } from "lucide-react";
import { useRef, useState } from "react";
import type { Testimonial } from "@/types";
import { playPreview, stopPreview } from "@/lib/video";
import { Stars } from "./primitives";
import { cn } from "@/lib/utils";

/**
 * A testimonial is either written or a video — every field except the media is
 * optional, so the card only renders the parts the admin actually filled in.
 *
 * A video keeps the proportions it was uploaded with and plays with sound on
 * hover; the controls stay, so it can also be played and scrubbed by hand.
 */
export function TestimonialCard({
  testimonial: t,
  featured = false,
}: {
  testimonial: Testimonial;
  featured?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // True only while playback was started by the hover, so a video the visitor
  // started themselves is not cut off when the pointer wanders away.
  const previewing = useRef(false);
  // Held until the browser reports the real dimensions, so the card does not
  // jump once metadata arrives.
  const [ratio, setRatio] = useState<string | undefined>(undefined);
  const meta = [t.role, t.company, t.eventType].filter(Boolean).join(" • ");
  const hasIdentity = Boolean(t.clientName || meta);

  function previewOn() {
    const video = videoRef.current;
    if (!video || !video.paused) return;
    previewing.current = true;
    void playPreview(video);
  }

  function previewOff() {
    const video = videoRef.current;
    if (!video || !previewing.current) return;
    previewing.current = false;
    stopPreview(video);
  }

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
        <video
          ref={videoRef}
          src={t.videoUrl}
          controls
          loop
          playsInline
          preload="metadata"
          onMouseEnter={previewOn}
          onMouseLeave={previewOff}
          onClick={() => {
            // Touching the controls hands the video over to the visitor.
            previewing.current = false;
          }}
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth && videoHeight) setRatio(`${videoWidth} / ${videoHeight}`);
          }}
          className={cn("block h-auto w-full border border-border", t.rating > 0 && "mt-4")}
          style={{ aspectRatio: ratio ?? "16 / 9" }}
        />
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
