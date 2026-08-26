/**
 * Domain types for the Maverick Manju site.
 * Field names match the JSON returned by the FastAPI backend exactly.
 */

export type MediaType = "image" | "video";
export type PublishStatus = "published" | "draft";
export type GalleryLayout = "small" | "medium" | "large" | "tall" | "wide";

export const GALLERY_LAYOUTS: GalleryLayout[] = ["small", "medium", "large", "tall", "wide"];

/** The headings gallery items are grouped under on the public page, in display order. */
export const GALLERY_CATEGORIES = ["Stage Magic", "Emcee", "Walk Around"] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

/** One image or video in the "Moments of Magic" gallery. Title and description are optional. */
export interface GalleryItem {
  id: string;
  type: MediaType;
  category: GalleryCategory;
  title: string;
  description: string;
  mediaUrl: string;
  thumbnailUrl: string;
  publicId: string;
  thumbnailPublicId: string;
  layout: GalleryLayout;
  status: PublishStatus;
  sortOrder: number;
  createdAt: string;
}

export type GalleryInput = Omit<GalleryItem, "id" | "createdAt">;

/**
 * A testimonial is either written (text + optional photo) or a video.
 * Every descriptive field is optional so a bare video can stand on its own.
 */
export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  role: string;
  eventType: string;
  rating: number;
  text: string;
  photoUrl: string;
  videoUrl: string;
  publicId: string;
  photoPublicId: string;
  status: PublishStatus;
  sortOrder: number;
  createdAt: string;
}

export type TestimonialInput = Omit<Testimonial, "id" | "createdAt">;

/** One of the four core performance sections on /services — only the image is editable. */
export interface ServiceImage {
  id: string;
  slug: string;
  label: string;
  title: string;
  imageUrl: string;
  publicId: string;
  sortOrder: number;
}

/** An "Event package" card under Formats by occasion — fully admin managed. */
export interface EventPackage {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  imageUrl: string;
  publicId: string;
  ctaLabel: string;
  ctaLink: string;
  status: PublishStatus;
  sortOrder: number;
  createdAt: string;
}

export type EventPackageInput = Omit<EventPackage, "id" | "createdAt">;

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
  email: string;
  date: string;
  services: string[];
  duration: string;
  guests: number;
  venue: string;
  sound: string;
  location: string;
  message: string;
  status: BookingStatus;
  internalNote: string;
  createdAt: string;
}

export type BookingInput = Omit<
  BookingEnquiry,
  "id" | "referenceNumber" | "status" | "createdAt" | "internalNote"
>;

/** Static content for the four core performances; the image is merged in from the API. */
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
  heroImageUrl: string;
  heroImagePublicId: string;
}
