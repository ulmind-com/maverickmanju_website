# Hero image replacement + readability overlay

## Goal
Replace the current homepage hero background with the uploaded image, keep the subject clearly visible, and make sure the headline text stays perfectly readable.

## What changes

1. Add the uploaded image to the project
   - Copy `user-uploads://image.png` to `public/images/hero-manju.png`.
   - This keeps it on the same Vercel-safe `/images/...` path pattern used by the other site images.

2. Swap the hero background only on the homepage
   - In `src/routes/_public.index.tsx`, change the `<Hero />` image `src` from `IMAGES.heroStage` to `/images/hero-manju.png`.
   - Update the `alt` text to describe the new image.

3. Lower opacity and strengthen the overlay
   - Reduce the hero image opacity to ~30-35% so it acts as a textured stage backdrop instead of competing with the text.
   - Keep the existing left-to-right dark gradient and add a subtle extra dark vignette/overlay if needed so the white headline pops.
   - Keep the slow-zoom animation.

4. Verification
   - Load `/` and confirm the new image renders with no 404.
   - Confirm the headline, subheadline, and CTA buttons remain easy to read.
