/**
 * Tiny pub/sub used to keep mounted components in sync with the backend.
 *
 * Every service mutation calls `emit(KEY)`, and `useServiceData(KEY, …)` re-runs
 * its loader — so an admin edit shows up on the public pages (and in other open
 * tables) without a manual refresh.
 */

const listeners = new Map<string, Set<() => void>>();

export function subscribe(key: string, fn: () => void): () => void {
  const set = listeners.get(key) ?? new Set();
  set.add(fn);
  listeners.set(key, set);
  return () => {
    set.delete(fn);
  };
}

export function emit(key: string) {
  listeners.get(key)?.forEach((fn) => fn());
}

export const STORAGE_KEYS = {
  gallery: "gallery",
  testimonials: "testimonials",
  packages: "packages",
  serviceImages: "service-images",
  bookings: "bookings",
  settings: "settings",
} as const;
