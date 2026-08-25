import { defaultSettings } from "@/data/seed";
import type { SiteSettings } from "@/types";
import { STORAGE_KEYS, read, write } from "./storage";

/** BACKEND SWAP: single-row `site_settings` table. */
const KEY = STORAGE_KEYS.settings;

export async function getSettings(): Promise<SiteSettings> {
  return { ...defaultSettings, ...(await read<SiteSettings>(KEY, defaultSettings)) };
}

export async function updateSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  const next = { ...(await getSettings()), ...patch };
  await write(KEY, next);
  return next;
}

export const SETTINGS_KEY = KEY;
export { defaultSettings };
