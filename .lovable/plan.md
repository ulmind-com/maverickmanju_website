# Hero left-side darkness fix

## Goal
Reduce the heavy dark overlay on the left half of the homepage hero so Maverick Manju and the stage are clearly visible, while keeping the headline, subheadline, and CTA buttons readable.

## What changes

1. Lighten the left-to-right gradient overlay
   - In `src/routes/_public.index.tsx`, change the gradient from `from-background/95 via-background/40 to-background/10` to a lighter left side.
   - Use roughly `from-background/75 via-background/30 to-transparent` so the left ~40% is only softly darkened and the right side stays mostly clear.

2. Keep text contrast where it matters
   - The headline sits in the left third of the hero; the lighter gradient still needs enough darkness behind white text.
   - Add a narrow, stronger text-shadow or a small localized dark vignette behind the text container only if readability drops after lightening.

3. Preserve existing behavior
   - Keep the hero image (`/images/hero-manju.png`), opacity (`85%`), slow-zoom animation, and bottom fade.
   - Keep the `Particles` effect and the pill badges unchanged.

## Verification
- Load `/` on desktop and mobile.
- Confirm the left side of the photo is no longer overly black/dark.
- Confirm the headline, subheadline, and both CTA buttons still have strong contrast and are easy to read.
