# Maverick Manju's Stagecraft

Build a complete, premium, production-style **multi-page magician website for “Maverick Manju”** with a separate **Admin Dashboard**.

This is NOT a single landing page.

The website must have:

* Multiple separate frontend pages
* Separate admin pages
* Fully responsive design
* Dynamic Gallery
* Dynamic Testimonials
* Dynamic Booking Enquiries
* Dynamic content management from the Admin Panel
* TypeScript throughout
* Clean component architecture
* Frontend-only implementation for now
* No existing backend available

IMPORTANT: The website should be architected so that all dynamic features work on the frontend using a **mock/local persistence layer (localStorage or IndexedDB)** for now. Do NOT hardcode dynamic content directly inside page components. Create reusable data/service layers so a real backend or Supabase/API can be connected later without rebuilding the UI.

==================================================

1. BRAND / VISUAL DIRECTION
   ==================================================

Brand:
MAVERICK MANJU

Positioning:
Magician | Emcee | Mentalist | Creator Coach

Core feeling:
Magic
Mystery
Luxury
Entertainment
Energy
Audience Interaction
Professionalism
Stage Presence

The visual identity MUST retain the same visual direction as the provided reference HTML.

DO NOT change the overall theme.

Use:

* Deep black background
* Dark charcoal cards
* Strong red accent
* White typography
* Subtle grey secondary text
* Thin borders
* Premium cinematic spacing
* High contrast
* Strong typography
* Slight dramatic gradients
* Subtle glow effects
* Elegant transitions

Primary palette:

* Red: #e21b23
* Secondary red: #ff3a3a
* Black: #050505
* Dark: #0d0d0f
* Card: #151518
* White: #ffffff
* Muted: #b9b9bf

Do NOT introduce unrelated colors.

The website should feel like:
A premium magician's official website + entertainment portfolio + booking platform.

It must NOT feel like:

* A generic SaaS website
* A generic AI-generated template
* A restaurant website
* A basic portfolio
* A normal corporate website

The magician personality should be visible throughout the UI.

Use subtle magic-inspired visual details:

* Playing card motifs
* Star/spark particles
* Elegant spotlight gradients
* Subtle red glow
* Stage-inspired lighting
* Mystery-inspired sections
* Cinematic hover effects

Keep these subtle and premium. Do not make the website cartoonish.

==================================================
2. TECH STACK
=============

Use:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Modern reusable component architecture
* Lucide React or similar icon library
* Framer Motion for animations where useful

Use TypeScript strictly.

Create a clean architecture such as:

src/
components/
pages/
admin/
layouts/
data/
services/
hooks/
types/
utils/
assets/

Do not put everything into one file.

Create proper TypeScript interfaces/types for:

GalleryItem
Testimonial
BookingEnquiry
EventType
ServiceType
AdminUser
SiteSettings

==================================================
3. IMPORTANT DYNAMIC ARCHITECTURE
=================================

There is NO existing backend.

Therefore implement a frontend data layer.

Create:

services/galleryService.ts
services/testimonialService.ts
services/bookingService.ts
services/siteService.ts

These services should initially use localStorage or IndexedDB.

The UI should never directly manipulate localStorage from random components.

For example:

galleryService:

* getGalleryItems()
* getGalleryItem(id)
* createGalleryItem()
* updateGalleryItem()
* deleteGalleryItem()

testimonialService:

* getTestimonials()
* createTestimonial()
* updateTestimonial()
* deleteTestimonial()

bookingService:

* getBookings()
* getBooking(id)
* createBooking()
* updateBookingStatus()
* deleteBooking()

This way, later we can replace the service implementation with Supabase/API calls without changing page components.

==================================================
4. MAIN WEBSITE MUST BE MULTI-PAGE
==================================

Do NOT make everything one scrolling landing page.

Use React Router.

Create these separate pages:

/                         Home
/services                 Services
/stage-magic              Stage Magic
/walk-around-magic        Walk-Around Magic
/mentalism                Mentalism
/emcee                    Emcee & Interactive Entertainment
/events                   Events
/gallery                  Gallery
/testimonials             Testimonials
/about                    About Maverick Manju
/book                     Booking
/contact                  Contact

Each route must be a proper independent page.

The website navigation should work between all pages.

Header should be consistent across pages.

Footer should be consistent across pages.

==================================================
5. HOME PAGE
============

Create a premium hero section based on the provided reference design.

Hero copy:

MAVERICK MANJU

MAGIC THAT AMAZES.

One Event. Multiple Experiences.

Stage magic, mentalism, walk-around magic and interactive Emcee experiences brought together by one professional.

Primary CTA:
Book Maverick Manju

Secondary CTA:
Explore Performances

Hero background should support a large cinematic magician/event image or video.

Include subtle animations:

* Fade-in
* Slow image movement
* Text reveal
* Red glow
* Floating magic particles

Do NOT overanimate.

Home sections:

1. Hero
2. Maverick Difference
3. Signature Services
4. Stage Magic Preview
5. Walk-Around Magic Preview
6. Mentalism Preview
7. Emcee Preview
8. Event Types
9. Gallery Preview
10. Testimonials Preview
11. About Maverick Manju
12. Booking CTA
13. Footer

All cards and gallery previews should link to their dedicated pages.

==================================================
6. SERVICES PAGE
================

Create a dedicated Services page.

Show:

Stage Magic
Walk-Around Magic
Mentalism
Emcee
Magic + Emcee
Corporate Entertainment
Birthday Entertainment
Wedding Entertainment
Hotel / Brunch Entertainment
Clubhouse Entertainment

Each service should have:

* Image/video
* Title
* Short description
* Full description
* Highlights
* CTA

Design should remain consistent with the black + red theme.

==================================================
7. INDIVIDUAL SERVICE PAGES
===========================

Create separate pages:

/stage-magic
/walk-around-magic
/mentalism
/emcee

Each page should contain:

Hero
Service introduction
Why this experience works
What is included
Suitable events
Audience interaction
Gallery preview
Testimonials
Booking CTA

Use premium visual storytelling.

==================================================
8. GALLERY MUST BE FULLY DYNAMIC
================================

This is extremely important.

The Gallery page MUST NOT use hardcoded gallery cards.

Create a dynamic gallery system.

The Admin Panel should allow admin to:

* Add image
* Add video
* Edit item
* Delete item
* Change title
* Change description
* Select category
* Set featured
* Change display order
* Enable/disable item

Gallery item structure:

id
type: "image" | "video"
title
description
mediaUrl
thumbnailUrl
category
featured
sortOrder
createdAt
status

Categories:

Stage Magic
Walk-Around Magic
Mentalism
Emcee
Corporate
Birthday
Wedding
Hotel
Clubhouse
Other

IMPORTANT BEHAVIOUR:

If Admin uploads/adds an IMAGE:
The public Gallery should render it as an image.

If Admin uploads/adds a VIDEO:
The public Gallery should render it as a video.

Do NOT render every item as an image.

Render according to item.type.

Image: <img />

Video: <video controls />

Support video thumbnail/poster.

Create a beautiful masonry-style / editorial gallery layout.

Allow different visual sizes:

* Large
* Medium
* Small
* Tall
* Wide

Based on sort order and layout metadata.

The public gallery should immediately reflect admin changes.

Use local persistence so refresh does not destroy content.

==================================================
9. GALLERY ADMIN PANEL
======================

Create:

/admin
/admin/login
/admin/dashboard
/admin/gallery
/admin/testimonials
/admin/bookings
/admin/settings

Admin Gallery page must have:

Header:
Gallery Management

Actions:

* Add Image
* Add Video

Table/grid showing:

Thumbnail
Type
Title
Category
Featured
Status
Order
Created
Actions

Actions:
Edit
Delete
Preview
Toggle Featured
Toggle Status

Add Gallery modal/page should contain:

Title
Description
Media Type
Upload Image / Video
Thumbnail
Category
Featured
Sort Order
Status

Since there is no backend:

When selecting a local file, create a browser-compatible preview and persist it using a suitable frontend approach.

Use localStorage only where practical.
For larger files, use IndexedDB/browser storage abstraction.

Do not pretend that files are uploaded to a real server.

Show:
“Frontend Demo Storage”

Make the code structured so storage can later be replaced by Cloudinary/Supabase/S3/API.

==================================================
10. PUBLIC GALLERY PAGE
=======================

The Gallery page should load data from:

galleryService.getGalleryItems()

Do not hardcode gallery cards.

Features:

* Filter by category
* All
* Stage Magic
* Walk-Around
* Mentalism
* Emcee
* Corporate
* Birthday
* Wedding
* Hotel
* Clubhouse

Add:

* Featured gallery section
* Grid/masonry gallery
* Fullscreen lightbox
* Video modal
* Image zoom
* Keyboard navigation
* Next/Previous
* Smooth transitions

Videos should open in a premium video viewer.

==================================================
11. TESTIMONIALS MUST BE FULLY DYNAMIC
======================================

Public Testimonials page must be completely dynamic.

Admin can:

* Add testimonial
* Edit testimonial
* Delete testimonial
* Publish/unpublish testimonial
* Set rating
* Set featured
* Add client name
* Add company
* Add event type
* Add profile image
* Add testimonial text
* Add optional video testimonial
* Change order

Testimonial structure:

id
clientName
company
role
eventType
rating
text
photoUrl
videoUrl
featured
status
sortOrder
createdAt

Public testimonials should ONLY render published testimonials.

Create:

* Testimonial grid
* Featured testimonial
* Rating display
* Client photo
* Video testimonial support
* Optional carousel
* Dedicated testimonials page

Do not use the sample testimonials as permanent static data.

==================================================
12. TESTIMONIAL ADMIN PAGE
==========================

/admin/testimonials

Create a polished management interface.

Features:

Search
Filter
Sort
Add
Edit
Delete
Publish / Unpublish
Featured toggle

Form:

Client Name
Company
Role
Event Type
Rating
Testimonial
Photo
Video
Featured
Status
Display Order

Show live preview before saving.

==================================================
13. BOOKING MUST BE FULLY DYNAMIC
=================================

Create a complete booking/enquiry system.

Public page:

/book

Booking form should contain:

Name *
Mobile *
Email
Event Date *
Services *
Duration *
Expected Guests *
Venue Type *
Sound System + Microphone *
Event Location *
Event Message

Services:
Stage Performance
Walk-Around Magic
Emcee Activities
Magic + Emcee
Mentalism

Duration:
30 Minutes
60 Minutes
90 Minutes
2 Hours
Other

Venue:
Clubhouse
Party Hall
Corporate House / Office
Star Hotel
Restaurant / Brunch Venue
Wedding Venue
Outdoor Venue
Other

Sound:
Yes
No
Not Sure

On submit:

1. Validate form
2. Create booking enquiry using bookingService.createBooking()
3. Save enquiry to local storage / IndexedDB
4. Show success message
5. Show enquiry reference number
6. Reset form
7. Optional WhatsApp CTA after successful submission

DO NOT rely only on a WhatsApp redirect.

The actual booking must exist inside the admin dashboard.

==================================================
14. BOOKING ADMIN DASHBOARD
===========================

Create:

/admin/bookings

Admin should be able to see every enquiry.

Dashboard table:

Booking ID
Name
Mobile
Email
Event Date
Services
Duration
Guests
Venue
Sound
Location
Status
Created At

Booking status:

New
Contacted
Confirmed
Completed
Cancelled

Admin actions:

View
Edit
Change Status
Delete
Mark as Confirmed
Add Internal Note

Booking detail page/modal should show ALL information.

Example:

Booking #MM-0001

Client
Contact
Event information
Selected services
Guests
Venue
Sound system
Location
Message
Status
Created date
Internal notes

Create quick actions:

Call
WhatsApp
Email

Use appropriate icons.

==================================================
15. ADMIN DASHBOARD
===================

Create a premium admin dashboard.

Route:

/admin/dashboard

Dashboard cards:

Total Enquiries
New Enquiries
Confirmed Bookings
Testimonials
Published Gallery Items
Videos
Images

Add charts or simple visual summaries where appropriate.

Recent bookings table.

Recent testimonials.

Recent gallery uploads.

Upcoming event dates.

Use the same brand identity:
black + red + white.

But the admin UI can be slightly more functional and compact while keeping the same visual language.

==================================================
16. ADMIN LOGIN
===============

Create an Admin Login screen.

Frontend-only demo authentication.

Use a simple local admin session mechanism.

Demo credentials can be clearly displayed in development mode.

Example:
Email: [admin@maverickmanju.in](mailto:admin@maverickmanju.in)
Password: admin123

DO NOT claim this is secure production authentication.

Use protected routes for:

/admin/*
except /admin/login

Create:
AdminAuthContext

Store demo session in localStorage.

Structure this so Firebase/Supabase authentication can be added later.

==================================================
17. ADMIN SETTINGS
==================

Create:

/admin/settings

Settings should include:

Artist Name
Tagline
Phone
WhatsApp
Email
Instagram
Facebook
YouTube
Website
Default Booking Message
Footer Copyright
Google Review Link

Allow editing.

Public pages should read settings through:

siteService.getSettings()

Do not hardcode contact details across multiple components.

==================================================
18. PUBLIC NAVIGATION
=====================

Desktop navigation:

HOME
SERVICES
STAGE MAGIC
WALK-AROUND
MENTALISM
EMCEE
EVENTS
GALLERY
TESTIMONIALS
ABOUT
BOOK

Use a premium compact navigation.

CTA:
BOOK MAVERICK MANJU

Mobile:

Hamburger menu
Full-screen / slide-in navigation

Must work perfectly on mobile.

==================================================
19. FOOTER
==========

Footer should include:

MAVERICK MANJU

Magician | Emcee | Mentalist | Creator Coach

Magic That Amazes.
Entertainment That Engages.

Navigation links
Services
Gallery
Testimonials
Booking
Social links
Contact information

Copyright:
© 2026 Maverick Manju. All Rights Reserved.

==================================================
20. MAGIC-INSPIRED UX
=====================

Add subtle premium effects.

Examples:

Hovering cards reveal a red light glow.

Gallery cards can have subtle zoom.

Section transitions can use:

* blur fade
* spotlight
* opacity
* slide

Buttons can have:

* red glow
* slight elevation
* smooth transition

Use animations carefully.

Do not make the site visually noisy.

==================================================
21. RESPONSIVE DESIGN
=====================

The website must be fully responsive.

Desktop:
1440+
1200
1024

Tablet:
768
900

Mobile:
390
375
360

Pay special attention to:

Hero typography
Navigation
Gallery layout
Admin tables
Booking form
Video cards
Testimonials
Buttons

Admin tables should become mobile cards instead of creating horizontal overflow wherever possible.

==================================================
22. SEO
=======

Each page should have unique:

Title
Meta description
Open Graph metadata where applicable

Examples:

Maverick Manju | Magician, Emcee & Mentalist

Stage Magic by Maverick Manju

Walk-Around Magic by Maverick Manju

Mentalist & Mentalism Shows | Maverick Manju

Emcee & Interactive Entertainment | Maverick Manju

Magician for Corporate Events, Birthdays & Weddings

Create semantic HTML.

Use proper heading hierarchy.

Add meaningful alt text.

==================================================
23. PERFORMANCE
===============

Optimize images.

Lazy load gallery media.

Do not load every video immediately.

Use responsive images.

Use poster/thumbnail for videos.

Avoid unnecessary re-renders.

Use React keys properly.

Keep component structure clean.

==================================================
24. DATA MODEL EXAMPLES
=======================

Use TypeScript interfaces.

Example:

GalleryItem:

{
id: string;
type: "image" | "video";
title: string;
description?: string;
mediaUrl: string;
thumbnailUrl?: string;
category: string;
featured: boolean;
status: "published" | "draft";
sortOrder: number;
createdAt: string;
}

Testimonial:

{
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
status: "published" | "draft";
sortOrder: number;
createdAt: string;
}

BookingEnquiry:

{
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
status: "new" | "contacted" | "confirmed" | "completed" | "cancelled";
internalNote?: string;
createdAt: string;
}

==================================================
25. IMPORTANT: NO FAKE DYNAMIC BEHAVIOUR
========================================

Do NOT create buttons that only visually pretend to work.

When Admin adds a gallery item:
It must appear on public Gallery.

When Admin edits a gallery item:
Public Gallery must update.

When Admin deletes a gallery item:
It must disappear from public Gallery.

When Admin publishes a testimonial:
It must appear on public Testimonials.

When Admin unpublishes:
It must disappear.

When a user submits the booking form:
The enquiry must appear in Admin Bookings.

When admin changes booking status:
The admin UI must persist that status.

When page refreshes:
Data must still exist.

When navigating between pages:
Data must stay synchronized through the service layer.

==================================================
26. IMPORTANT: FRONTEND-ONLY LIMITATION
=======================================

There is no backend.

Therefore:

DO NOT claim that the app has real server-side authentication.

DO NOT claim that uploaded files are stored on a cloud server.

DO NOT create fake API URLs.

Use frontend demo persistence.

Add clear comments in the code explaining where real backend integration should happen later.

Recommended future integrations:

Supabase
Cloudinary
S3
Firebase

But DO NOT implement those unless necessary.

The project should be backend-ready.

==================================================
27. DEMO DATA
=============

Provide tasteful demo data so the website looks complete on first load.

Use realistic placeholder content for:

Gallery
Testimonials
Services
Events

However:

The architecture must treat these as seed/demo data.

Once the admin changes them, the dynamic data should be used.

Do not permanently hardcode them in JSX.

==================================================
28. VISUAL QUALITY
==================

The final site should look significantly better than the supplied reference HTML while retaining its core visual identity.

Think:

Premium magician
High-end entertainment brand
Luxury event performer
Cinematic stage experience
Modern portfolio
Professional booking platform

Use large cinematic imagery.

Use strong typography.

Use dramatic black/red contrast.

Use generous spacing.

Use premium card composition.

Do not use generic gradients everywhere.

Do not overuse rounded cards.

Avoid the typical “AI website” appearance.

==================================================
29. FILE / COMPONENT QUALITY
============================

Create reusable components such as:

Navbar
Footer
Hero
SectionHeader
ServiceCard
GalleryCard
GalleryGrid
GalleryLightbox
VideoModal
TestimonialCard
TestimonialCarousel
BookingForm
BookingStatusBadge
AdminSidebar
AdminHeader
AdminTable
AdminModal
FileUploader
StatsCard
ProtectedRoute

Do not duplicate similar UI code.

==================================================
30. ROUTING STRUCTURE
=====================

Public:

/
/services
/stage-magic
/walk-around-magic
/mentalism
/emcee
/events
/gallery
/testimonials
/about
/book
/contact

Admin:

/admin/login
/admin/dashboard
/admin/gallery
/admin/testimonials
/admin/bookings
/admin/settings

==================================================
31. FINAL QUALITY CHECK
=======================

Before finishing, verify:

* Every route works
* No broken links
* No console errors
* Mobile navigation works
* Gallery filtering works
* Gallery image/video rendering works
* Gallery CRUD works
* Testimonials CRUD works
* Booking submission works
* Booking appears inside Admin
* Booking status persists
* Admin authentication works in demo mode
* Protected admin routes work
* Data persists after refresh
* Responsive layout works
* All buttons have real functionality
* No important content is unnecessarily hardcoded
* TypeScript has no avoidable errors
* Components are reusable
* Public website feels premium
* Admin dashboard feels professional

==================================================
32. MOST IMPORTANT DESIGN RULE
==============================

The website must preserve the provided Maverick Manju black/red magician identity.

Do NOT redesign it into another style.

Enhance it.

Make it feel like:

“An elite magician’s official digital experience.”

The website should communicate:

MAGIC
MYSTERY
ENERGY
PROFESSIONALISM
AUDIENCE INTERACTION
PREMIUM ENTERTAINMENT

Build the complete frontend end-to-end with the above architecture and functionality.


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Maverick Manju — Magician, Emcee and Mentalist. Stage magic, walk-around magic, corporate entertainment, birthday entertainment and interactive Emcee experiences.">
<title>Maverick Manju | Magician • Emcee • Mentalist</title>
<style>
:root{
  --red:#e21b23; --red2:#ff3a3a; --black:#050505; --dark:#0d0d0f;
  --card:#151518; --white:#fff; --muted:#b9b9bf; --line:rgba(255,255,255,.12);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:Arial,Helvetica,sans-serif;background:var(--black);color:var(--white);line-height:1.6}
a{text-decoration:none;color:inherit}
.container{width:min(1180px,92%);margin:auto}
.nav{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(0,0,0,.86);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.nav-inner{height:76px;display:flex;align-items:center;justify-content:space-between}
.logo{font-size:25px;font-weight:900;letter-spacing:2px}.logo span{color:var(--red)}
.nav-links{display:flex;gap:24px;font-size:13px;text-transform:uppercase;letter-spacing:1px}
.nav-links a:hover{color:var(--red)}
.btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 22px;border:1px solid var(--red);background:var(--red);color:#fff;font-weight:800;text-transform:uppercase;letter-spacing:.7px;border-radius:4px;transition:.25s}
.btn:hover{background:#fff;color:#000;border-color:#fff;transform:translateY(-2px)}
.btn.alt{background:transparent}
.hero{min-height:100vh;display:flex;align-items:center;position:relative;overflow:hidden;background:
linear-gradient(90deg,rgba(0,0,0,.96) 0%,rgba(0,0,0,.74) 45%,rgba(0,0,0,.30) 100%),
url('assets/brand-banner.png') center/cover no-repeat}
.hero:after{content:"";position:absolute;inset:auto 0 0;height:180px;background:linear-gradient(transparent,var(--black))}
.hero-content{padding-top:100px;max-width:720px;position:relative;z-index:2}
.kicker{color:var(--red2);font-weight:900;letter-spacing:4px;text-transform:uppercase;font-size:14px;margin-bottom:15px}
h1{font-size:clamp(52px,8vw,100px);line-height:.9;letter-spacing:-4px;text-transform:uppercase}
.hero h1 span{color:var(--red)}
.script{font-size:clamp(24px,3vw,38px);font-style:italic;font-family:Georgia,serif;margin:16px 0}
.hero p{font-size:20px;color:#ddd;max-width:650px;margin:22px 0 30px}
.hero-buttons{display:flex;gap:12px;flex-wrap:wrap}
.badges{display:flex;flex-wrap:wrap;gap:10px;margin-top:35px}
.badge{border:1px solid var(--line);padding:8px 12px;border-radius:999px;background:rgba(0,0,0,.45);font-size:12px;text-transform:uppercase;letter-spacing:1px}
section{padding:100px 0}
.section-head{max-width:760px;margin-bottom:45px}
.section-head .eyebrow{color:var(--red2);font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:900}
.section-head h2{font-size:clamp(34px,5vw,60px);line-height:1.02;margin:10px 0 15px}
.section-head p{color:var(--muted);font-size:17px}
.usp{background:linear-gradient(180deg,#090909,#111)}
.usp-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.usp-card{padding:28px;background:var(--card);border:1px solid var(--line);border-top:3px solid var(--red)}
.usp-icon{font-size:32px;margin-bottom:15px}.usp-card h3{font-size:18px;margin-bottom:7px}.usp-card p{font-size:14px;color:var(--muted)}
.split{display:grid;grid-template-columns:1fr 1fr;gap:55px;align-items:center}
.photo{width:100%;height:560px;object-fit:cover;border-radius:8px;border:1px solid var(--line);box-shadow:0 20px 70px rgba(0,0,0,.45)}
.copy h3{font-size:42px;line-height:1.05;margin-bottom:15px}.copy p{color:var(--muted);font-size:17px;margin-bottom:22px}
.list{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:20px 0 28px}.list div{padding:10px 0;border-bottom:1px solid var(--line);font-size:14px}.list div:before{content:"✦";color:var(--red);margin-right:8px}
.dark{background:#0b0b0d}.red-panel{background:radial-gradient(circle at 75% 20%,rgba(226,27,35,.28),transparent 40%),#090909}
.advantage{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}
.adv{background:#0d0d0f;padding:30px}.adv strong{display:block;color:var(--red);font-size:12px;letter-spacing:2px;text-transform:uppercase;margin-bottom:9px}.adv h3{font-size:22px}.adv p{color:var(--muted);font-size:14px;margin-top:8px}
.events{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.event{min-height:190px;padding:28px;border:1px solid var(--line);background:linear-gradient(135deg,#151518,#090909);border-radius:7px}.event h3{font-size:22px}.event p{color:var(--muted);font-size:14px;margin-top:7px}
.gallery{display:grid;grid-template-columns:1.2fr .8fr .8fr;grid-auto-rows:260px;gap:12px}.gallery img{width:100%;height:100%;object-fit:cover;border-radius:7px;border:1px solid var(--line)}.gallery .tall{grid-row:span 2}.gallery .wide{grid-column:span 2}
.testimonials{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.quote{background:#111114;border:1px solid var(--line);padding:28px;border-radius:7px}.stars{color:#ffd34d;letter-spacing:3px}.quote p{font-size:16px;margin:15px 0;color:#eee}.quote small{color:#999}
.about{display:grid;grid-template-columns:.85fr 1.15fr;gap:50px;align-items:center}.about img{width:100%;max-height:600px;object-fit:cover;border-radius:8px}.about h2{font-size:52px;line-height:1}.about p{color:var(--muted);font-size:17px;margin:18px 0}.quote-line{border-left:3px solid var(--red);padding-left:18px;font-size:24px;font-family:Georgia,serif;font-style:italic;margin:25px 0}
.booking{background:linear-gradient(135deg,#130608,#090909)}
.form-wrap{display:grid;grid-template-columns:.8fr 1.2fr;gap:45px;align-items:start}
.form-card{background:#111114;border:1px solid var(--line);padding:30px;border-radius:8px}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.field{display:flex;flex-direction:column;gap:7px}.field.full{grid-column:1/-1}
label{font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#ccc;font-weight:800}
input,select,textarea{background:#09090b;border:1px solid #333;color:#fff;padding:13px;border-radius:4px;font:inherit;outline:none}
input:focus,select:focus,textarea:focus{border-color:var(--red)}
textarea{min-height:110px;resize:vertical}.checkrow{display:flex;gap:10px;flex-wrap:wrap}.check{display:flex;align-items:center;gap:7px;background:#09090b;border:1px solid #333;padding:9px 11px;border-radius:4px;font-size:12px}.check input{accent-color:var(--red)}
footer{padding:55px 0 25px;border-top:1px solid var(--line);background:#030303}.footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:30px}.footer h3{font-size:14px;text-transform:uppercase;letter-spacing:2px;color:var(--red);margin-bottom:12px}.footer p,.footer a{color:#aaa;font-size:14px}.copyright{margin-top:35px;padding-top:20px;border-top:1px solid var(--line);color:#666;font-size:12px}
.mobile{display:none}
@media(max-width:900px){
.nav-links{display:none}.mobile{display:block}.usp-grid,.advantage{grid-template-columns:1fr 1fr}.split,.about,.form-wrap{grid-template-columns:1fr}.events,.testimonials{grid-template-columns:1fr}.gallery{grid-template-columns:1fr 1fr;grid-auto-rows:220px}.gallery .wide{grid-column:span 2}.photo{height:430px}.footer-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){.logo em{display:block;margin-left:0!important;font-size:8px!important;margin-top:2px}
section{padding:72px 0}.usp-grid,.advantage,.form-grid,.gallery{grid-template-columns:1fr}.gallery .wide{grid-column:span 1}.gallery .tall{grid-row:span 1}.footer-grid{grid-template-columns:1fr}h1{letter-spacing:-2px}.hero{background-position:62% center}.hero p{font-size:17px}.photo{height:390px}
}





MAVERICK MANJU | MAGICIAN | EMCEE | CREATOR COACH


    ServicesUSPGalleryTestimonialsBook

BOOK





Magician | Emcee | Creator Coach

Magic That
Amazes.

One Event. Multiple Experiences.

One Event. Multiple Experiences.

  Stage magic, mentalism, walk-around magic and interactive Emcee activities — brought together by one professional.

Book Maverick ManjuExplore Performances

Stage MagicWalk-Around MagicMentalismEmcee





The Maverick Difference

Why hire two entertainers when one professional can do both?

Magic creates wonder. Emcee activities create participation. Together they create a complete entertainment experience — with seamless flow and one point of coordination for the client.

🎩

Stage Performance

High-energy magic and mentalism designed for the whole audience.

⭐

Client Testimonials

Real experiences, real reactions and memories worth sharing.

🎤

Emcee Activities

Games, interaction and energy that get people involved.

🃏

Walk-Around Magic

Close-up magic that comes directly to your guests.





Signature Experience

Entertainment built around your audience.

From intimate brunches to large corporate stages, the format changes — the objective doesn't: make people participate, laugh and remember.





01 • Stage Magic

A stage full of wonder. An audience full of reactions.

A professional stage experience combining magic, comedy, audience participation and mentalism. Designed for corporate events, annual days, award nights, conferences, clubhouses, weddings and celebrations.

Stage Magic

Mentalism

Audience Participation

Interactive Comedy

Corporate Entertainment

Customized Segments

Book Stage Magic





02 • Walk-Around Magic

Magic doesn't always need a stage.

Sometimes the magician comes to you. Walk-around magic is ideal for star-hotel brunches, networking events, weddings, receptions, private parties and clubhouse gatherings.

Close-Up Magic

Table-to-Table Magic

Networking Entertainment

Brunch Experiences

Mentalism

Guest Interaction

Book Walk-Around





Your Event Advantage

One professional. Multiple entertainment moments.

Start with walk-around magic, move into games and audience engagement, host the event and finish with stage magic or mentalism — depending on your event format.

Magic

Creates Wonder

Give guests a reason to stop, watch and smile.

Emcee

Creates Participation

Keep the audience connected to the event.

Mentalism

Creates Curiosity

Add a powerful layer of mystery and surprise.

One Point

Simple Coordination

One professional for a seamless entertainment flow.





03 • Emcee & Interactive Entertainment

Don't just host the event. Own the energy.

Interactive games, ice breakers, magic-based games, audience participation and professional hosting — customized for the age group, event and venue.

Birthday Games

Corporate Engagement

Ice Breakers

Family Activities

Magic-Based Games

Crowd Interaction

Plan My Event





Events

Magic for every occasion.

🏢 Corporate

Annual days, conferences, award nights, employee engagement, dealer meets and celebrations.

🎂 Birthdays

Magic, games, mentalism and Emcee activities for memorable birthday entertainment.

🏨 Star Hotels

Walk-around magic and mentalism designed for brunches, networking and guest experiences.

🏡 Clubhouses

All-age entertainment that brings children, parents and seniors into the experience.

💍 Weddings

Interactive guest entertainment between ceremonies, meals and celebrations.

🎉 Private Events

Customized entertainment built around your audience, venue and occasion.





Moments of Magic

Don't just take my word for it. See the experience.





Client Testimonials

Real reactions. Real memories.

Replace the sample cards below with your Google reviews, WhatsApp testimonials and video testimonials as you collect them.

★★★★★

“Add an authentic client testimonial here about the performance, audience reaction and professionalism.”

— Client Name • Company / Event

★★★★★

“Add a testimonial specifically mentioning the Magic + Emcee combination and audience engagement.”

— Client Name • Corporate Event

★★★★★

“Add a birthday, clubhouse or hotel event testimonial describing the guest experience.”

— Client Name • Private Event





Meet Maverick Manju

More than a magician.

I am Maverick Manju — Magician, Emcee and Mentalist.

My approach to entertainment is simple: don't just perform for people. Create moments with them.

Magic creates wonder. Mentalism creates curiosity. Emceeing creates participation.

Whether I'm on a stage in front of hundreds, performing close-up magic at a luxury hotel brunch, engaging a corporate audience or turning a birthday into a fun-filled experience, the objective remains the same: make people experience the magic.





Book Maverick Manju

Let's create some magic.

Share your date, event format and audience details. I'll help you choose the right entertainment experience.

Best-fit formats

Stage Magic • Walk-Around Magic • Emcee • Mentalism • Magic + Emcee


Name *

Mobile *

Email@example.com"></div>

Magic Date *

What are you looking for? *

 Stage Performance Walk-Around Magic Emcee Activities Magic + Emcee Mentalism

Duration *Select30 Minutes60 Minutes90 Minutes2 HoursOther

Expected Guests *

Venue Type *SelectClubhouseParty HallCorporate House / OfficeStar HotelRestaurant / Brunch VenueWedding VenueOutdoor VenueOther

Bluetooth Speaker + Microphone Available? *SelectYesNoNot Sure

Event Location *

Tell me about your event

Send Enquiry

Thank you! Your enquiry details are ready to send. Connect this form to your email/CRM before publishing.








MAVERICK MANJU

Magician | Emcee | Creator Coach

Magic That Amazes. Entertainment That Engages.

Performances

Stage Magic

Walk-Around Magic

Mentalism

Emcee Activities

Book

Event Enquiry

maverickmanju.in

@maverickmanju





© 2026 Maverick Manju. All Rights Reserved.





bhai besi al fal token khabi na jei tuku dorkar sei tuku use koris

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://manju-magic-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d6d8dd67-9e4d-47af-8419-d30681477caa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
