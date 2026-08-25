# Vercel-safe images + no favicon

## Goal
All site images must render reliably on the production deploy, and the browser tab should show no custom icon.

## What changes

1. Move images to `public/`
   - Copy `hero-stage.jpg`, `walk-around.jpg`, `mentalism.jpg`, `emcee.jpg` from `src/assets/` into `public/images/`.
   - Keep the originals in `src/assets` deleted to avoid duplicates.

2. Reference them by stable URL
   - In `src/data/seed.ts`, replace the four ES imports with plain string paths (`/images/hero-stage.jpg`, etc.).
   - Everything else (services, gallery seed, service pages) already consumes those same variables, so no other file needs edits.
   - This also fixes a real production bug: seeded gallery/service data saved in browser storage keeps a build-hashed asset URL that stops resolving after a redeploy. Plain `/images/...` paths survive every deploy.

3. Remove the favicon
   - Delete `public/favicon.ico`.
   - Remove the `{ rel: "icon", ... }` entry from `head().links` in `src/routes/__root.tsx` so no icon is requested.

## Verification
- Load `/`, `/services`, `/gallery`, and a service page and confirm every image loads with no 404s in the network log.
- Confirm no favicon request/404 remains.
