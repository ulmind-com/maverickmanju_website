import { api } from "@/lib/api";
import { STORAGE_KEYS, emit } from "./storage";
import type { Testimonial, TestimonialInput } from "@/types";

const KEY = STORAGE_KEYS.testimonials;

export const getPublishedTestimonials = () => api.get<Testimonial[]>("/api/testimonials");

export const getTestimonials = () => api.adminGet<Testimonial[]>("/api/admin/testimonials");

export async function createTestimonial(input: TestimonialInput): Promise<Testimonial> {
  const item = await api.adminPost<Testimonial>("/api/admin/testimonials", input);
  emit(KEY);
  return item;
}

export async function updateTestimonial(
  id: string,
  patch: Partial<TestimonialInput>,
): Promise<Testimonial> {
  const item = await api.adminPatch<Testimonial>(`/api/admin/testimonials/${id}`, patch);
  emit(KEY);
  return item;
}

export async function deleteTestimonial(id: string): Promise<void> {
  await api.adminDelete(`/api/admin/testimonials/${id}`);
  emit(KEY);
}

export const TESTIMONIALS_KEY = KEY;
