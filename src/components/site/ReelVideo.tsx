import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { playPreview } from "@/lib/video";
import { cn } from "@/lib/utils";

/**
 * Reel-style player: no browser chrome, no scrub bar.
 *
 * It behaves the way a short vertical video does everywhere else — starts
 * silently on its own once it scrolls into view, loops, and pauses when it
 * leaves. Hovering turns the sound on and moving away turns it back off, so
 * the page never has several voices talking at once.
 *
 * The speaker button stays for touch, where there is no hover: tapping it
 * holds the sound on until it is tapped again. Tapping the frame pauses.
 *
 * Autoplay is skipped for visitors who ask for reduced motion; they get the
 * poster frame and the play button.
 */
export function ReelVideo({
  src,
  poster,
  className,
  label,
}: {
  src: string;
  poster?: string | undefined;
  className?: string | undefined;
  label?: string | undefined;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  // True once the hover turned the sound on, so leaving only silences a video
  // the hover itself unmuted.
  const hoverHasSound = useRef(false);
  // True once the visitor unmuted deliberately — that choice outlives the hover.
  const soundHeldOn = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  // Held back until the browser reports real dimensions, so the card does not
  // jump once metadata arrives.
  const [ratio, setRatio] = useState<string | undefined>(undefined);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Fires when the video reaches the middle band of the viewport. A ratio
    // threshold would never trip for a portrait reel taller than the screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  async function soundOnHover() {
    const video = ref.current;
    if (!video || soundHeldOn.current) return;
    hoverHasSound.current = true;
    // Browsers refuse unmuted playback until the page has user activation, so
    // playPreview asks for sound and falls back to silence if it is refused.
    await playPreview(video);
    setMuted(video.muted);
  }

  function soundOffHover() {
    const video = ref.current;
    if (!video || !hoverHasSound.current || soundHeldOn.current) return;
    hoverHasSound.current = false;
    video.muted = true;
    setMuted(true);
  }

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => {});
    else video.pause();
  }

  function toggleSound(event: React.MouseEvent) {
    event.stopPropagation();
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    // A deliberate unmute sticks; a deliberate mute hands control back to hover.
    soundHeldOn.current = !video.muted;
    if (!video.muted && video.paused) void video.play().catch(() => {});
  }

  return (
    <div
      className={cn("group relative overflow-hidden bg-black", className)}
      style={{ aspectRatio: ratio ?? "9 / 16" }}
      onMouseEnter={soundOnHover}
      onMouseLeave={soundOffHover}
    >
      <video
        ref={ref}
        src={src}
        {...(poster ? { poster } : {})}
        muted
        loop
        playsInline
        preload="metadata"
        controlsList="nodownload"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(e) => {
          const { videoWidth, videoHeight } = e.currentTarget;
          if (videoWidth && videoHeight) setRatio(`${videoWidth} / ${videoHeight}`);
        }}
        className="h-full w-full object-cover"
      />

      {/* Tap target covering the frame — pause and resume, nothing else. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={
          playing ? `Pause${label ? ` ${label}` : ""}` : `Play${label ? ` ${label}` : ""}`
        }
        className="absolute inset-0 grid place-items-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      >
        <span
          className={cn(
            "grid h-14 w-14 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-opacity duration-200",
            playing ? "opacity-0 group-hover:opacity-100" : "opacity-100",
          )}
        >
          {playing ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" />
          )}
        </span>
      </button>

      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
      >
        {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
      </button>
    </div>
  );
}
