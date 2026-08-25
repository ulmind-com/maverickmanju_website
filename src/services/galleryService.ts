import { seedGallery } from "@/data/seed";
import type { GalleryItem } from "@/types";
import { STORAGE_KEYS, read, uid, write } from "./storage";

/**
 * Gallery data access. The UI only ever calls these functions.
 * BACKEND SWAP: replace the read/write calls with Supabase queries; signatures stay identical.
 */
const KEY = STORAGE_KEYS.gallery;

const sorted = (items: GalleryItem[]) =>
  [...items].sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt));

export async function getGalleryItems(): Promise<GalleryItem[]> {
  return sorted(await read<GalleryItem[]>(KEY, seedGallery));
}

export async function getPublishedGalleryItems(): Promise<GalleryItem[]> {
  return (await getGalleryItems()).filter((i) => i.status === "published");
}

export async function getGalleryItem(id: string): Promise<GalleryItem | undefined> {
  return (await getGalleryItems()).find((i) => i.id === id);
}

export async function createGalleryItem(
  input: Omit<GalleryItem, "id" | "createdAt">,
): Promise<GalleryItem> {
  const items = await getGalleryItems();
  const item: GalleryItem = { ...input, id: uid(), createdAt: new Date().toISOString() };
  await write(KEY, [...items, item]);
  return item;
}

export async function updateGalleryItem(
  id: string,
  patch: Partial<GalleryItem>,
): Promise<GalleryItem | undefined> {
  const items = await getGalleryItems();
  const next = items.map((i) => (i.id === id ? { ...i, ...patch, id: i.id } : i));
  await write(KEY, next);
  return next.find((i) => i.id === id);
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const items = await getGalleryItems();
  await write(
    KEY,
    items.filter((i) => i.id !== id),
  );
}

export const GALLERY_KEY = KEY;
