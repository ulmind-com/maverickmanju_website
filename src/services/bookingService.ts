import { api } from "@/lib/api";
import { STORAGE_KEYS, emit } from "./storage";
import type { BookingEnquiry, BookingInput, BookingStatus } from "@/types";

const KEY = STORAGE_KEYS.bookings;

/** Public booking form submission. The backend assigns the MM-xxxx reference. */
export async function createBooking(input: BookingInput): Promise<BookingEnquiry> {
  const booking = await api.post<BookingEnquiry>("/api/bookings", input);
  emit(KEY);
  return booking;
}

export const getBookings = () => api.adminGet<BookingEnquiry[]>("/api/admin/bookings");

export async function updateBooking(
  id: string,
  patch: { status?: BookingStatus; internalNote?: string },
): Promise<BookingEnquiry> {
  const booking = await api.adminPatch<BookingEnquiry>(`/api/admin/bookings/${id}`, patch);
  emit(KEY);
  return booking;
}

export const updateBookingStatus = (id: string, status: BookingStatus) =>
  updateBooking(id, { status });

export async function deleteBooking(id: string): Promise<void> {
  await api.adminDelete(`/api/admin/bookings/${id}`);
  emit(KEY);
}

export const BOOKINGS_KEY = KEY;
