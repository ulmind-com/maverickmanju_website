# Split the home page into real separate pages

Right now the site does have separate routes (`/services`, `/gallery`, `/testimonials`, `/book`, etc.), but the home page repeats almost everything: hero, USP block, services grid, four long service previews, events, gallery preview, testimonials, about preview and a booking CTA — 366 lines of one long scroll. That is why it feels like a single-page site. The USP block ("The Maverick Difference") also has no page of its own.

## What changes

1. **Home (`/`) becomes a short landing page**
   - Hero
   - A compact 4-card grid linking to Services, Gallery, Testimonials and Book
   - One short intro line about Maverick Manju + CTA
   - Nothing else: the long service previews, events strip, gallery preview, testimonial slider and about preview move off the home page.

2. **New USP page (`/why-maverick`)**
   - The "Maverick Difference" content moves here and is expanded into a proper page: page hero, the differentiator cards, a short "how a show runs" section, and a booking CTA.

3. **Services page (`/services`)**
   - Receives the detailed service previews that used to sit on the home page, above the existing links out to Stage Magic / Walk-Around / Mentalism / Emcee.

4. **Gallery, Testimonials, Book, Events, About**
   - Stay as they are; they simply become the only place that content lives.

5. **Navigation**
   - Desktop nav slims to: Home, Services, Why Maverick, Gallery, Testimonials, Events, About (with the Book button as-is). The four individual show-type pages move under Services on the page itself and stay in the mobile menu.
   - Footer link list updated to match, including the new USP page.

## Technical notes

- New route file `src/routes/_public.why-maverick.tsx` with its own `head()` metadata (title, description, og:title, og:description), following the existing `_public.*` pattern and `PageHero`.
- `MaverickDifference` and `ServicePreview` move out of `src/routes/_public.index.tsx` into reusable components under `src/components/site/` so the new USP page and `/services` can use them.
- `src/routes/_public.index.tsx` is trimmed to hero + navigation cards + CTA; existing `Reveal`/`ButtonLink` primitives reused so animations and styling stay identical.
- `NAV_LINKS` in `src/components/site/Navbar.tsx` and the footer list updated.
- No design-token, admin, or data-layer changes.
