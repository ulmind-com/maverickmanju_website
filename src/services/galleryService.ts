import { api } from "@/lib/api";
import { STORAGE_KEYS, emit } from "./storage";
import type { GalleryInput, GalleryItem } from "@/types";

const KEY = STORAGE_KEYS.gallery;

export const getPublishedGalleryItems = () => api.get<GalleryItem[]>("/api/gallery");

export const getGalleryItems = () => api.adminGet<GalleryItem[]>("/api/admin/gallery");

export async function createGalleryItem(input: GalleryInput): Promise<GalleryItem> {
  const item = await api.adminPost<GalleryItem>("/api/admin/gallery", input);
  emit(KEY);
  return item;
}

export async function updateGalleryItem(
  id: string,
  patch: Partial<GalleryInput>,
): Promise<GalleryItem> {
  const item = await api.adminPatch<GalleryItem>(`/api/admin/gallery/${id}`, patch);
  emit(KEY);
  return item;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await api.adminDelete(`/api/admin/gallery/${id}`);
  emit(KEY);
}

export const GALLERY_KEY = KEY;
