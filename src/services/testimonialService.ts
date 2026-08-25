import { seedTestimonials } from "@/data/seed";
import type { Testimonial } from "@/types";
import { STORAGE_KEYS, read, uid, write } from "./storage";

/** BACKEND SWAP: same signatures, Supabase table `testimonials`. */
const KEY = STORAGE_KEYS.testimonials;

const sorted = (items: Testimonial[]) =>
  [...items].sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt));

export async function getTestimonials(): Promise<Testimonial[]> {
  return sorted(await read<Testimonial[]>(KEY, seedTestimonials));
}

export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  return (await getTestimonials()).filter((t) => t.status === "published");
}

export async function createTestimonial(
  input: Omit<Testimonial, "id" | "createdAt">,
): Promise<Testimonial> {
  const items = await getTestimonials();
  const item: Testimonial = { ...input, id: uid(), createdAt: new Date().toISOString() };
  await write(KEY, [...items, item]);
  return item;
}

export async function updateTestimonial(
  id: string,
  patch: Partial<Testimonial>,
): Promise<Testimonial | undefined> {
  const items = await getTestimonials();
  const next = items.map((t) => (t.id === id ? { ...t, ...patch, id: t.id } : t));
  await write(KEY, next);
  return next.find((t) => t.id === id);
}

export async function deleteTestimonial(id: string): Promise<void> {
  const items = await getTestimonials();
  await write(
    KEY,
    items.filter((t) => t.id !== id),
  );
}

export const TESTIMONIALS_KEY = KEY;
