# Hero left-side black area fix

## What's happening
Two things stack up on the left of the homepage hero:
- The source photo's own left edge is a dark, near-black audience area.
- On top of it, the hero overlay is strongest exactly there (`from-background/95`), plus a black bottom fade.

Together the left third reads as a flat black block instead of a photo.

## What changes (all in `src/routes/_public.index.tsx`, Hero component)

1. Move the visible part of the photo
   - Add `object-[65%_center]` (roughly) to the hero `<img>` so the framing pulls the lit stage and Manju further left, and the dead black edge is cropped out on wide screens.
   - On small screens use a focal point that keeps Manju in frame (`object-[70%_center]` via a responsive class).

2. Lighten the left overlay
   - Replace `from-background/95 via-background/40 to-background/10` with a much softer left wash, around `from-background/70 via-background/25 to-transparent`.
   - Reduce the bottom fade height/strength so the lower-left corner isn't solid black.

3. Keep the headline readable without a black block
   - Instead of darkening the whole left side, add a soft radial/elliptical shade behind the text column only, plus a subtle text drop-shadow on the h1 and paragraphs.

4. Unchanged
   - Same image (`/images/hero-manju.png`), 85% opacity, slow-zoom animation, particles, badges, buttons and copy.

## Verification
- Check `/` at desktop width and at the current mobile viewport.
- Confirm no flat black band on the left — photo content visible edge to edge.
- Confirm headline, subheadline and both CTA buttons stay clearly readable.
