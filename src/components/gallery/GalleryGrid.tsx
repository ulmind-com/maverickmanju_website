import { useState } from "react";
import type { GalleryItem } from "@/types";
import { GalleryCard } from "./GalleryCard";
import { GalleryLightbox } from "./GalleryLightbox";

/**
 * Masonry columns rather than a fixed-height grid: every image and video keeps
 * the shape it was uploaded with, so a portrait clip stays portrait and a wide
 * one stays wide instead of being cropped into a uniform tile.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        No gallery items here yet.
      </p>
    );
  }

  return (
    <>
      <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
        {items.map((item, i) => (
          <div key={item.id} className="break-inside-avoid">
            <GalleryCard item={item} onOpen={() => setOpen(i)} />
          </div>
        ))}
      </div>
      {open !== null && (
        <GalleryLightbox
          items={items}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
