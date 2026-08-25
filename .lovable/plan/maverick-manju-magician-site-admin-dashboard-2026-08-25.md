# Maverick Manju — Magician Site + Admin Dashboard

Premium black/red magician website (multi-page) with a separate admin panel, fully dynamic gallery, testimonials, and booking enquiries — all persisted in the browser, behind a swappable service layer.

## One stack note
This project runs on TanStack Start + TanStack Router (React Router is not supported here). Same result: real separate pages, real URLs, shared header/footer layout. Everything else in your spec stays as written.

## Design system
Tokens in `src/styles.css` (oklch equivalents of): red #e21b23, red2 #ff3a3a, black #050505, dark #0d0d0f, card #151518, white, muted #b9b9bf, hairline borders. Heavy condensed uppercase display type + serif italic script accents, cinematic spacing, red glow hovers, spotlight radial gradients, card/spark motifs. No extra colors, no rounded-everything, no generic gradients.

## Public pages
`/` home (hero, Maverick Difference, signature services, stage / walk-around / mentalism / emcee previews, event types, gallery preview, testimonials preview, about, booking CTA), `/services`, `/stage-magic`, `/walk-around-magic`, `/mentalism`, `/emcee`, `/events`, `/gallery`, `/testimonials`, `/about`, `/book`, `/contact`.
Sticky compact nav with BOOK CTA, full-screen mobile menu, consistent footer. Unique title/description/OG per page via route `head()`.

## Admin pages
`/admin/login`, `/admin/dashboard`, `/admin/gallery`, `/admin/testimonials`, `/admin/bookings`, `/admin/settings`. Demo-only local session (admin@maverickmanju.in / admin123, shown on the login screen and clearly labelled as demo, not real auth). Protected layout redirects to login.

## Dynamic behaviour (real, not fake)
- Gallery: admin CRUD, image vs video rendered by `item.type` (`<img>` / `<video controls>` with poster), category, featured, sort order, published/draft, layout size. Public page filters by category, featured strip, masonry grid, lightbox with keyboard next/prev, video viewer, lazy loading.
- Testimonials: admin CRUD with live preview, rating, photo, optional video, publish toggle, ordering. Public shows published only.
- Bookings: public `/book` form with all specified fields and validation → creates enquiry with reference `MM-0001`, success state + optional WhatsApp CTA. Admin list (cards on mobile), detail modal with all fields, status changes, internal notes, call/WhatsApp/email quick actions.
- Settings: artist name, contacts, socials, default booking message, footer copyright, review link — read everywhere via `siteService.getSettings()`.
- Dashboard: stat cards (enquiries, new, confirmed, testimonials, published gallery, videos, images), simple visual summaries, recent bookings/testimonials/uploads, upcoming dates.

## Technical section
- Types in `src/types/`: `GalleryItem`, `Testimonial`, `BookingEnquiry`, `EventType`, `ServiceType`, `AdminUser`, `SiteSettings` — exactly the shapes in your spec.
- Storage abstraction `src/services/storage.ts`: IndexedDB for media blobs, localStorage for records, one seed-on-first-load step from `src/data/*`. Labelled "Frontend Demo Storage" in admin UI.
- Services: `galleryService`, `testimonialService`, `bookingService`, `siteService`, `authService` — the only modules touching storage; pages/components call services only. Comments mark where Supabase/Cloudinary/S3 would slot in.
- React state kept in sync with TanStack Query (invalidate on mutation), so admin edits reflect on public pages without reload; data survives refresh.
- Shared components: Navbar, MobileMenu, Footer, Hero, SectionHeader, ServiceCard, GalleryCard, GalleryGrid, GalleryLightbox, VideoModal, TestimonialCard, TestimonialCarousel, BookingForm, BookingStatusBadge, AdminSidebar, AdminHeader, AdminTable, AdminModal, FileUploader, StatsCard, plus the admin route guard.
- Framer Motion for restrained fade/reveal/blur transitions; lucide-react icons; strict TypeScript; responsive from 360 → 1440+, admin tables collapse to cards on mobile.

## Build order
1. Tokens + layouts + nav/footer
2. Types, storage, services, seed data
3. Public pages (home → service pages → events/about/contact)
4. Gallery public + admin
5. Testimonials public + admin
6. Booking form + admin bookings
7. Dashboard, settings, auth guard
8. Responsive + SEO + route/console pass
