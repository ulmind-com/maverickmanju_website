import { api } from "@/lib/api";
import { STORAGE_KEYS, emit } from "./storage";

/** A date the artist is already booked on. Plain YYYY-MM-DD, no timezone maths. */
export interface BlockedDate {
  id: string;
  date: string;
  note: string;
  createdAt: string;
}

const KEY = STORAGE_KEYS.availability;

/** Public: the blocked dates only — internal notes stay admin-side. */
export async function getBlockedDates(): Promise<string[]> {
  const { dates } = await api.get<{ dates: string[] }>("/api/availability");
  return dates;
}

export const getBlockedDatesAdmin = () => api.adminGet<BlockedDate[]>("/api/admin/availability");

export async function blockDate(date: string, note = ""): Promise<BlockedDate> {
  const blocked = await api.adminPost<BlockedDate>("/api/admin/availability", { date, note });
  emit(KEY);
  return blocked;
}

export async function unblockDate(date: string): Promise<void> {
  await api.adminDelete(`/api/admin/availability/${date}`);
  emit(KEY);
}

export const AVAILABILITY_KEY = KEY;
