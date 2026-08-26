import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds a wa.me link. WhatsApp only accepts the number in international form
 * with no "+", spaces or dashes, so whatever the admin typed into Settings is
 * stripped down to digits here rather than trusted as-is.
 */
export function whatsappLink(number: string, message?: string): string {
  const digits = (number ?? "").replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}

/** Strips a phone number down to what a `tel:` link accepts, keeping a leading +. */
export function telLink(number: string): string {
  const cleaned = (number ?? "").replace(/[^\d+]/g, "");
  return `tel:${cleaned}`;
}
