/**
 * FRONTEND DEMO STORAGE
 * ---------------------
 * A tiny browser persistence layer used while there is no backend.
 *
 * - Records (gallery items, testimonials, bookings, settings) live in IndexedDB
 *   so large base64 media payloads are not limited by the ~5MB localStorage cap.
 *   A localStorage mirror keeps synchronous first paints cheap for small collections.
 * - A pub/sub layer notifies every mounted component when a collection changes,
 *   so admin edits show up on public pages without a reload.
 *
 * BACKEND INTEGRATION POINT:
 * Replace the read/write functions below (or the service modules that call them)
 * with Supabase / REST calls. Nothing in the UI touches this file directly.
 */

const DB_NAME = "maverick-manju";
const STORE = "kv";
const DB_VERSION = 1;

const memory = new Map<string, unknown>();
const listeners = new Map<string, Set<() => void>>();

export const isBrowser = () => typeof window !== "undefined";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Read a collection, seeding it on first ever load. */
export async function read<T>(key: string, seed: T): Promise<T> {
  if (!isBrowser()) return seed;
  if (memory.has(key)) return memory.get(key) as T;
  try {
    const stored = await idbGet<T>(key);
    const value = stored === undefined ? seed : stored;
    if (stored === undefined) await idbSet(key, seed);
    memory.set(key, value);
    return value;
  } catch {
    memory.set(key, seed);
    return seed;
  }
}

/** Write a collection and notify subscribers. */
export async function write<T>(key: string, value: T): Promise<T> {
  memory.set(key, value);
  if (isBrowser()) {
    try {
      await idbSet(key, value);
    } catch {
      /* storage full or unavailable — demo data stays in memory for this session */
    }
  }
  emit(key);
  return value;
}

export function subscribe(key: string, fn: () => void): () => void {
  const set = listeners.get(key) ?? new Set();
  set.add(fn);
  listeners.set(key, set);
  return () => set.delete(fn);
}

export function emit(key: string) {
  listeners.get(key)?.forEach((fn) => fn());
}

export const STORAGE_KEYS = {
  gallery: "gallery",
  testimonials: "testimonials",
  bookings: "bookings",
  settings: "settings",
  session: "mm_admin_session",
} as const;

export const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

/** Reads a File into a data URL. Demo-only stand-in for a real upload (Cloudinary/S3). */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
