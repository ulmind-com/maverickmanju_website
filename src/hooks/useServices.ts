import { useMemo } from "react";
import { services as staticServices } from "@/data/seed";
import { SERVICE_IMAGES_KEY, getServiceImages } from "@/services/serviceImageService";
import type { ServiceImage, ServiceType } from "@/types";
import { useServiceData } from "./useServiceData";

/**
 * The four core performances. Copy stays in `src/data/seed.ts`; only the image
 * is admin managed, so it is merged in from `/api/service-images`.
 */
export function useServices(): ServiceType[] {
  const { data: images } = useServiceData<ServiceImage[]>(SERVICE_IMAGES_KEY, getServiceImages, []);

  return useMemo(() => {
    const bySlug = new Map(images.map((i) => [i.slug, i.imageUrl]));
    return staticServices.map((service) => ({
      ...service,
      imageUrl: bySlug.get(service.slug) || service.imageUrl,
    }));
  }, [images]);
}

/** Single service by slug, with its admin-managed image already applied. */
export function useService(slug: string): ServiceType | undefined {
  const all = useServices();
  return all.find((s) => s.slug === slug);
}
