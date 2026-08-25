# Running the site locally

Two repos, two processes:

| | Repo | Runs on |
| --- | --- | --- |
| Frontend | this one | http://localhost:8080 |
| Backend | [ulmind-com/maverickmanju_backend](https://github.com/ulmind-com/maverickmanju_backend) | http://localhost:8000 |

## 1. Backend

```bash
git clone https://github.com/ulmind-com/maverickmanju_backend.git
```

```bash
cd maverickmanju_backend && cp .env.example .env && uv sync && uv run uvicorn app.main:app --reload --port 8000
```

Fill in `.env` (Mongo, Cloudinary, JWT, admin) first. API docs at
<http://localhost:8000/docs>; the backend README has the full endpoint list,
the environment reference and the Render deploy steps.

## 2. Frontend

```bash
bun install && bun run dev
```

Site at <http://localhost:8080>, admin panel at <http://localhost:8080/admin>.
`.env` in this repo points the frontend at the API:

```
VITE_API_URL=http://localhost:8000
```

## Admin panel

Sign in at `/admin/login` with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from the
backend's `.env`. Those two values only seed the account on the very first
boot — change the password afterwards from **Settings → Admin password**.

| Page | Controls |
| --- | --- |
| Gallery | The single "Moments of Magic" feed — images and video together, unlimited items, title and description optional |
| Testimonials | Written or video testimonials, filed under School / Corporates / Children / Birthday Parties |
| Services & Packages | The four core performance images, plus full CRUD on the event packages |
| Bookings | Every enquiry from the public form, with status, notes and call/WhatsApp/email shortcuts |
| Settings | Contact details, socials, footer copy, admin password |

## What is dynamic

- **Gallery** — every item, from the database.
- **Testimonials** — every item, grouped under its category.
- **Services** — the copy for the four core performances stays in
  `src/data/seed.ts`; only their images are admin-managed.
- **Event packages** — every field, from the database.
- **Bookings** — submitted by the public form, read in the admin panel.
- **Site settings** — contact details and socials used across the site.

## Deploying

- **Frontend (Vercel):** set `VITE_API_URL` to the deployed API URL, e.g.
  `https://maverickmanju-api.onrender.com`.
- **Backend (Render):** see the deploy section in the backend repo's README.
  Remember to add this site's production origin to the API's `CORS_ORIGINS`.
