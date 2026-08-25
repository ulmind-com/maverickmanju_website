import { api } from "@/lib/api";
import { STORAGE_KEYS, emit } from "./storage";
import type { ServiceImage } from "@/types";

/** The images behind the four core performance sections on /services. */
const KEY = STORAGE_KEYS.serviceImages;

export const getServiceImages = () => api.get<ServiceImage[]>("/api/service-images");

export async function setServiceImage(
  slug: string,
  imageUrl: string,
  publicId = "",
): Promise<ServiceImage> {
  const item = await api.adminPut<ServiceImage>(`/api/admin/service-images/${slug}`, {
    imageUrl,
    publicId,
  });
  emit(KEY);
  return item;
}

export const SERVICE_IMAGES_KEY = KEY;
