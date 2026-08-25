import { api } from "@/lib/api";
import { STORAGE_KEYS, emit } from "./storage";
import type { EventPackage, EventPackageInput } from "@/types";

/** Event packages — the "Formats by occasion" cards on /services. */
const KEY = STORAGE_KEYS.packages;

export const getPublishedPackages = () => api.get<EventPackage[]>("/api/packages");

export const getPackages = () => api.adminGet<EventPackage[]>("/api/admin/packages");

export async function createPackage(input: EventPackageInput): Promise<EventPackage> {
  const item = await api.adminPost<EventPackage>("/api/admin/packages", input);
  emit(KEY);
  return item;
}

export async function updatePackage(
  id: string,
  patch: Partial<EventPackageInput>,
): Promise<EventPackage> {
  const item = await api.adminPatch<EventPackage>(`/api/admin/packages/${id}`, patch);
  emit(KEY);
  return item;
}

export async function deletePackage(id: string): Promise<void> {
  await api.adminDelete(`/api/admin/packages/${id}`);
  emit(KEY);
}

export const PACKAGES_KEY = KEY;
