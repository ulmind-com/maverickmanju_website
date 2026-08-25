import type { BookingEnquiry, BookingInput, BookingStatus } from "@/types";
import { STORAGE_KEYS, read, uid, write } from "./storage";

/** BACKEND SWAP: same signatures, Supabase table `booking_enquiries`. */
const KEY = STORAGE_KEYS.bookings;

const byNewest = (items: BookingEnquiry[]) =>
  [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export async function getBookings(): Promise<BookingEnquiry[]> {
  return byNewest(await read<BookingEnquiry[]>(KEY, []));
}

export async function getBooking(id: string): Promise<BookingEnquiry | undefined> {
  return (await getBookings()).find((b) => b.id === id);
}

function nextReference(existing: BookingEnquiry[]): string {
  const highest = existing.reduce((max, b) => {
    const n = Number(b.referenceNumber.replace(/\D/g, ""));
    return Number.isFinite(n) && n > max ? n : max;
  }, 0);
  return `MM-${String(highest + 1).padStart(4, "0")}`;
}

export async function createBooking(input: BookingInput): Promise<BookingEnquiry> {
  const items = await getBookings();
  const booking: BookingEnquiry = {
    ...input,
    id: uid(),
    referenceNumber: nextReference(items),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  await write(KEY, [...items, booking]);
  return booking;
}

export async function updateBooking(
  id: string,
  patch: Partial<BookingEnquiry>,
): Promise<BookingEnquiry | undefined> {
  const items = await getBookings();
  const next = items.map((b) => (b.id === id ? { ...b, ...patch, id: b.id } : b));
  await write(KEY, next);
  return next.find((b) => b.id === id);
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  return updateBooking(id, { status });
}

export async function deleteBooking(id: string): Promise<void> {
  const items = await getBookings();
  await write(
    KEY,
    items.filter((b) => b.id !== id),
  );
}

export const BOOKINGS_KEY = KEY;
