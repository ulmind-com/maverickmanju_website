# Nav exactly like the reference: 5 items, 5 separate pages

Match the header in the screenshot: logo on the left with the tagline beside it, and exactly five links on the right — Services, USP, Gallery, Testimonials, Book. Each one opens its own page; no scrolling sections.

## Header

- Left: `MAVERICK MANJU` (MANJU in red) followed by the divider tagline `| MAGICIAN | EMCEE | CREATOR COACH` in small uppercase red-tinted type. Tagline hides on small screens.
- Right: `SERVICES` · `USP` · `GALLERY` · `TESTIMONIALS` · `BOOK` — plain uppercase links, no filled button, active link highlighted.
- Mobile: same five links in the slide-down menu, plus the secondary pages (Stage Magic, Walk-Around, Mentalism, Emcee, Events, About, Contact) listed below them so nothing becomes unreachable.

## Pages behind the five links

| Nav item | Page |
|---|---|
| Services | `/services` (exists) |
| USP | `/usp` (rename of the current `/why-maverick`) |
| Gallery | `/gallery` (exists) |
| Testimonials | `/testimonials` (exists) |
| Book | `/book` (exists) |

Home stays at `/` as its own page: hero plus short links onward — no service/gallery/testimonial content duplicated there.

The other pages (Stage Magic, Walk-Around Magic, Mentalism, Emcee, Events, About, Contact) stay live and reachable from Services, the footer and the mobile menu — they just don't clutter the top nav.

## Technical notes

- `src/components/site/Navbar.tsx`: `NAV_LINKS` reduced to the five items; logo block gains the tagline span; the standalone Book button is removed since Book is now a nav link.
- New route file `src/routes/_public.usp.tsx` holding the current Why-Maverick page content and its own `head()` metadata; `_public.why-maverick.tsx` is removed and old `/why-maverick` links are updated (footer, home cards).
- Footer "Explore" column updated to point at `/usp`.
- No design-token, data-layer or admin changes.
