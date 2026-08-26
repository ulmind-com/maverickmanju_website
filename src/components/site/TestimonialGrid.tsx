import { useMemo, useState } from "react";
import type { Testimonial } from "@/types";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialLightbox } from "./TestimonialLightbox";
import { Reveal } from "./primitives";

/**
 * The testimonial list, laid out and behaving like the gallery grid: masonry
 * columns so every card keeps its own height, and clicking a video opens the
 * fullscreen viewer.
 *
 * Only the video testimonials go into the viewer — stepping through a written
 * one in a fullscreen player would land on an empty frame.
 */
export function TestimonialGrid({ items }: { items: Testimonial[] }) {
  const videos = useMemo(() => items.filter((t) => t.videoUrl), [items]);
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((t, i) => (
          <div key={t.id} className="break-inside-avoid">
            <Reveal delay={i * 0.05}>
              <TestimonialCard
                testimonial={t}
                onOpenVideo={
                  t.videoUrl ? () => setOpen(videos.findIndex((v) => v.id === t.id)) : undefined
                }
              />
            </Reveal>
          </div>
        ))}
      </div>

      {open !== null && open >= 0 && (
        <TestimonialLightbox
          items={videos}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
