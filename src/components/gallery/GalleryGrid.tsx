import { useState } from "react";
import type { GalleryItem } from "@/types";
import { GalleryCard } from "./GalleryCard";
import { GalleryLightbox } from "./GalleryLightbox";

export function GalleryGrid({
  items,
  useLayout = true,
}: {
  items: GalleryItem[];
  useLayout?: boolean;
}) {
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
      <div className="grid auto-rows-[220px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <GalleryCard
            key={item.id}
            item={item}
            useLayout={useLayout}
            onOpen={() => setOpen(i)}
          />
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
