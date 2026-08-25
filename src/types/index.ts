/**
 * Domain types for the Maverick Manju site.
 * These are storage-agnostic: the same shapes will be returned by a real
 * backend (Supabase / API) once the service layer is swapped out.
 */

export type MediaType = "image" | "video";
export type PublishStatus = "published" | "draft";
export type GalleryLayout = "small" | "medium" | "large" | "tall" | "wide";

export const GALLERY_CATEGORIES = [
  "Stage Magic",
  "Walk-Around Magic",
  "Mentalism",
  "Emcee",
  "Corporate",
  "Birthday",
  "Wedding",
  "Hotel",
  "Clubhouse",
  "Other",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem {
  id: string;
  type: MediaType;
  title: string;
  description?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  category: GalleryCategory;
  featured: boolean;
  status: PublishStatus;
  layout: GalleryLayout;
  sortOrder: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  role?: string;
  eventType?: string;
  rating: number;
  text: string;
  photoUrl?: string;
  videoUrl?: string;
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
  createdAt: string;
}

export type BookingStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";

export const BOOKING_STATUSES: BookingStatus[] = [
  "new",
  "contacted",
  "confirmed",
  "completed",
  "cancelled",
];

export interface BookingEnquiry {
  id: string;
  referenceNumber: string;
  name: string;
  mobile: string;
  email?: string;
  date: string;
  services: string[];
  duration: string;
  guests: number;
  venue: string;
  sound: string;
  location: string;
  message?: string;
  status: BookingStatus;
  internalNote?: string;
  createdAt: string;
}

export type BookingInput = Omit<
  BookingEnquiry,
  "id" | "referenceNumber" | "status" | "createdAt" | "internalNote"
>;

export interface ServiceType {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  imageUrl: string;
  page?: string;
  ctaLabel: string;
}

export interface EventType {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

export interface SiteSettings {
  artistName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
  website: string;
  defaultBookingMessage: string;
  footerCopyright: string;
  googleReviewLink: string;
}
