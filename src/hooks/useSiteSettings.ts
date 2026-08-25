import { defaultSettings } from "@/data/seed";
import { SETTINGS_KEY, getSettings } from "@/services/siteService";
import type { SiteSettings } from "@/types";
import { useServiceData } from "./useServiceData";

/** Every component reads contact details / socials through this hook. */
export function useSiteSettings(): SiteSettings {
  const { data } = useServiceData<SiteSettings>(SETTINGS_KEY, getSettings, defaultSettings);
  return data;
}
