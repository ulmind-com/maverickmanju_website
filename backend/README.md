# Maverick Manju API

FastAPI backend for the Maverick Manju website — gallery, testimonials, service
images, event packages, booking enquiries, site settings and admin auth.

- **Runtime:** Python 3.11+, managed with [uv](https://docs.astral.sh/uv/)
- **Database:** MongoDB Atlas (async driver: `pymongo.AsyncMongoClient`)
- **Media:** Cloudinary (images and video, uploaded through the API)
- **Auth:** JWT bearer tokens, bcrypt password hashing

## Run it

```bash
cd backend
cp .env.example .env   # fill in Mongo, Cloudinary and JWT values
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

Interactive docs: <http://localhost:8000/docs>

On first boot the app creates its indexes and seeds the admin account, the four
service-image records, the six starter event packages and the site settings
document. Seeding is idempotent — nothing you edit later is overwritten.

## Environment

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` / `MONGODB_DB` | Atlas connection string and database name |
| `CLOUDINARY_CLOUD_NAME` / `_API_KEY` / `_API_SECRET` | Cloudinary credentials |
| `CLOUDINARY_FOLDER` | Root folder for uploads (default `maverickmanju`) |
| `JWT_SECRET` | Signing key — generate with `openssl rand -base64 48` |
| `JWT_EXPIRE_MINUTES` | Session lifetime (default 7 days) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | Seeded on first boot only |
| `CORS_ORIGINS` | Comma-separated allowed origins |
| `CORS_ORIGIN_REGEX` | Regex for preview/production domains |
| `MAX_UPLOAD_MB` | Rejects larger uploads (default 100) |

`ADMIN_PASSWORD` only applies when the account does not exist yet. Afterwards
change it from **Admin → Settings → Admin password**.

## Endpoints

Public (no auth):

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/gallery` | Published gallery items |
| `GET` | `/api/testimonials` | Published testimonials |
| `GET` | `/api/service-images` | Images for the four core performances |
| `GET` | `/api/packages` | Published event packages |
| `GET` | `/api/settings` | Contact details and socials |
| `POST` | `/api/bookings` | Booking form submission |
| `GET` | `/api/health` | Health check (pings Mongo) |

Admin (`Authorization: Bearer <token>`):

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Exchange credentials for a token |
| `GET` | `/api/auth/me` | Current admin |
| `POST` | `/api/auth/change-password` | Rotate the password |
| `GET/POST/PATCH/DELETE` | `/api/admin/gallery[/{id}]` | Gallery CRUD |
| `GET/POST/PATCH/DELETE` | `/api/admin/testimonials[/{id}]` | Testimonial CRUD |
| `GET/POST/PATCH/DELETE` | `/api/admin/packages[/{id}]` | Event package CRUD |
| `GET/PUT` | `/api/admin/service-images[/{slug}]` | Swap a core section image |
| `GET/PATCH/DELETE` | `/api/admin/bookings[/{id}]` | Enquiry management |
| `PUT` | `/api/admin/settings` | Site settings |
| `POST` | `/api/admin/uploads` | Upload one image/video to Cloudinary |

Deleting a record also deletes its Cloudinary asset, so the media library does
not accumulate orphans.

## Collections

`gallery_items`, `testimonials`, `service_images`, `event_packages`,
`bookings`, `site_settings`, `admin_users`, `counters` (booking reference
sequence).

## Deploying

Any container or Python host works — Render, Railway, Fly.io, a VPS:

```bash
uv run uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Set every variable from the table above in the host's environment (do not ship
`.env`), add the frontend's production origin to `CORS_ORIGINS`, and point the
frontend's `VITE_API_URL` at the deployed URL.
