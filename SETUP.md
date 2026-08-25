# Running the site locally

Two processes: the FastAPI backend (`backend/`) and the TanStack Start
frontend (repo root).

## 1. Backend

```bash
cd backend
cp .env.example .env   # fill in Mongo, Cloudinary and JWT values
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

API docs at <http://localhost:8000/docs>. See [backend/README.md](backend/README.md)
for the full endpoint list and environment reference.

## 2. Frontend

```bash
bun install
bun run dev
```

Site at <http://localhost:8080>, admin panel at <http://localhost:8080/admin>.

`.env` in the repo root points the frontend at the API:

```
VITE_API_URL=http://localhost:8000
```

## Admin panel

Sign in at `/admin/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from
`backend/.env`. Those two values only seed the account on the very first boot —
change the password afterwards from **Settings → Admin password**.

| Page | Controls |
| --- | --- |
| Gallery | The single "Moments of Magic" feed — images and video together, unlimited items, title and description optional |
| Testimonials | Written or video testimonials, filed under School / Corporates / Children / Birthday Parties |
| Services & Packages | The four core performance images, plus full CRUD on the event packages |
| Bookings | Every enquiry from the public form, with status, notes and call/WhatsApp/email shortcuts |
| Settings | Contact details, socials, footer copy, admin password |

## What is dynamic

- **Gallery** — every item, from the database.
- **Testimonials** — every item, grouped by category.
- **Services** — the copy for the four core performances stays in
  `src/data/seed.ts`; only their images are admin-managed.
- **Event packages** — every field, from the database.
- **Bookings** — submitted by the public form, read in the admin panel.
- **Site settings** — contact details and socials used across the site.

## Deploying

- **Frontend (Vercel):** set `VITE_API_URL` to the deployed API URL.
- **Backend:** deploy `backend/` to any Python host (Render, Railway, Fly.io, a
  VPS). Set every variable from `backend/.env.example` in that host's
  environment and add the site's production origin to `CORS_ORIGINS`.

Never commit `backend/.env` — it is git-ignored and holds the database,
Cloudinary and JWT secrets.
