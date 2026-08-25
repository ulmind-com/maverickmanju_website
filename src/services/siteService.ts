import { api } from "@/lib/api";
import { defaultSettings } from "@/data/seed";
import { STORAGE_KEYS, emit } from "./storage";
import type { SiteSettings } from "@/types";

const KEY = STORAGE_KEYS.settings;

export async function getSettings(): Promise<SiteSettings> {
  const remote = await api.get<Partial<SiteSettings>>("/api/settings");
  // Defaults fill any key the stored document predates.
  return { ...defaultSettings, ...remote };
}

export async function updateSettings(next: SiteSettings): Promise<SiteSettings> {
  const saved = await api.adminPut<SiteSettings>("/api/admin/settings", next);
  emit(KEY);
  return { ...defaultSettings, ...saved };
}

export const SETTINGS_KEY = KEY;
export { defaultSettings };
