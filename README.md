# KaNa Travels & Holidays

A full-stack travel booking platform — tour packages, hotels, flights, and buses — built as a **pnpm + Turborepo monorepo**.

---

## What's Inside

| App / Package | Path | Port | Description |
|---|---|---|---|
| Customer site | `apps/customer` | **3000** | Public-facing booking site |
| Admin panel | `apps/admin` | **3001** | Manage packages, hotels, bookings, users |
| Agent portal | `apps/agent` | **3002** | Agent-specific booking tools |
| REST API | `apps/api` | **4000** | Express backend powering all three frontends |
| `@kana/database` | `packages/database` | — | Prisma (PostgreSQL) + Mongoose (MongoDB) |
| `@kana/types` | `packages/types` | — | Shared TypeScript interfaces |
| `@kana/config` | `packages/config` | — | Brand constants |

---

## Prerequisites

Install these before doing anything else.

| Tool | Minimum version | Install |
|---|---|---|
| Node.js | 18.x | https://nodejs.org |
| pnpm | 8.x | `npm install -g pnpm` |
| PostgreSQL | 15+ | https://www.postgresql.org/download/ |
| MongoDB | 6+ | https://www.mongodb.com/try/download/community |

> **Tip — skip local DB setup:** run `docker compose up postgres mongodb -d` to get both databases running in Docker with zero configuration (requires [Docker Desktop](https://www.docker.com/products/docker-desktop/)).

---

## 1 — Clone & Install

```bash
git clone <your-repo-url> Kana
cd Kana
pnpm install
```

This installs dependencies for every app and shared package in one command.

---

## 2 — Create Environment Files

Each app needs its own `.env` file. **Copy the examples and fill in your values.**

### 2a — API (`apps/api/.env`)

```bash
cp apps/api/.env.example apps/api/.env
```

Open `apps/api/.env` and fill in:

```env
# ── Server ──────────────────────────────────────────────────
PORT=4000
NODE_ENV=development

# ── Databases ───────────────────────────────────────────────
# PostgreSQL — main data store
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/kana_travels

# MongoDB — logs, reviews, analytics cache (optional for dev)
MONGODB_URI=mongodb://localhost:27017/kana_travels

# ── Auth ────────────────────────────────────────────────────
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_jwt_secret_min_32_chars

# ── Google OAuth (optional for dev) ─────────────────────────
# See Section 6 for how to get these
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ── Amadeus Flight API (optional for dev) ───────────────────
# Free test account at: https://developers.amadeus.com
AMADEUS_CLIENT_ID=
AMADEUS_CLIENT_SECRET=
AMADEUS_HOSTNAME=test

# ── Payment Gateways (optional for dev) ─────────────────────
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
PAYU_MERCHANT_KEY=
PAYU_MERCHANT_SALT=
PAYU_BASE_URL=https://test.payu.in

# ── Redbus Bus API (optional) ────────────────────────────────
REDBUS_API_KEY=
REDBUS_BASE_URL=https://api.redbus.in

# ── CORS ────────────────────────────────────────────────────
CUSTOMER_APP_URL=http://localhost:3000
ADMIN_APP_URL=http://localhost:3001
```

---

### 2b — Customer App (`apps/customer/.env.local`)

```bash
cp apps/customer/.env.local.example apps/customer/.env.local
```

```env
# ── API ─────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# ── NextAuth ────────────────────────────────────────────────
NEXTAUTH_URL=http://localhost:3000
# Same value you used for JWT_SECRET, or generate a new one
NEXTAUTH_SECRET=your_nextauth_secret_min_32_chars

# ── Google OAuth (optional) ──────────────────────────────────
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ── Payments (optional) ──────────────────────────────────────
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_PAYU_MERCHANT_KEY=
```

---

### 2c — Admin App (`apps/admin/.env.local`)

```bash
cp apps/admin/.env.local.example apps/admin/.env.local
```

```env
# ── API ─────────────────────────────────────────────────────
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1

# ── NextAuth ────────────────────────────────────────────────
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_nextauth_secret_min_32_chars

# ── Google OAuth (optional) ──────────────────────────────────
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ── Database (used by NextAuth PrismaAdapter) ────────────────
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/kana_travels
```

---

## 3 — Set Up the Database

### 3a — Create the PostgreSQL database

If you're using a local PostgreSQL installation:

```bash
psql -U postgres -c "CREATE DATABASE kana_travels;"
# If you want a dedicated user:
psql -U postgres -c "CREATE USER kana WITH PASSWORD 'kana_secret';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE kana_travels TO kana;"
```

If you're using **Docker** (easiest):

```bash
docker compose up postgres -d
# DATABASE_URL for this setup:
# postgresql://kana:kana_secret@localhost:5432/kana_travels
```

### 3b — Run Prisma migrations

```bash
cd packages/database
pnpm prisma migrate dev --name init
pnpm prisma generate
cd ../..
```

This creates all tables and generates the Prisma client.

### 3c — MongoDB (optional)

MongoDB is used for activity logs, reviews, and analytics cache. The API starts fine without it — you'll just see a warning.

Start with Docker:

```bash
docker compose up mongodb -d
```

Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier) and set `MONGODB_URI` to your Atlas connection string.

---

## 4 — Create the First Admin User

The admin panel requires a user with the `ADMIN` or `SUPER_ADMIN` role. After running migrations, insert one via Prisma Studio or the API:

**Option A — Prisma Studio (GUI)**
```bash
cd packages/database
pnpm prisma studio
# Open http://localhost:5555
# Go to the User table → Add record → set role to ADMIN
```

**Option B — Register then promote via SQL**

1. Start the API (`pnpm dev` in step 5)
2. Register normally via `POST /api/v1/auth/register` or the customer site signup
3. Then promote the user in the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
```

---

## 5 — Start the Apps

### All apps at once (recommended)

```bash
pnpm dev
```

Turborepo starts all apps in parallel. Wait until you see:
```
API server running on http://localhost:4000
customer  ready on http://localhost:3000
admin     ready on http://localhost:3001
```

### Individual apps

```bash
# API only
pnpm --filter api dev

# Customer only
pnpm --filter customer dev

# Admin only
pnpm --filter admin dev
```

---

## 6 — External Service Setup

These are **optional for local development** but required for full functionality.

### Google OAuth (for "Sign in with Google")

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Add Authorised redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (customer)
   - `http://localhost:3001/api/auth/callback/google` (admin)
7. Copy the **Client ID** and **Client Secret** into:
   - `apps/api/.env` → `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
   - `apps/customer/.env.local` → same keys
   - `apps/admin/.env.local` → same keys

---

### Amadeus Flight Search

1. Sign up for a free test account at [developers.amadeus.com](https://developers.amadeus.com)
2. Create a new app — you'll get a **Client ID** and **Client Secret**
3. Add to `apps/api/.env`:
   ```env
   AMADEUS_CLIENT_ID=your_client_id
   AMADEUS_CLIENT_SECRET=your_client_secret
   AMADEUS_HOSTNAME=test   # use 'production' for live data
   ```

The flight search and airport autocomplete features will return live data once this is configured.

---

### Razorpay Payments

1. Sign up at [razorpay.com](https://razorpay.com) and get test API keys from the dashboard
2. Add to `apps/api/.env`:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```
3. Add to `apps/customer/.env.local`:
   ```env
   NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
   ```

---

## 7 — Docker (Full Stack)

To run everything — databases, API, and frontends — in Docker:

```bash
# Copy and fill in the root .env file first
cp .env.example .env
# Edit .env with your secrets (JWT_SECRET, NEXTAUTH_SECRET, etc.)

docker compose up --build
```

Services:

| Service | URL |
|---|---|
| Customer | http://localhost:3000 |
| Admin | http://localhost:3001 |
| API | http://localhost:4000 |
| PostgreSQL | localhost:5432 |
| MongoDB | localhost:27017 |

To stop:
```bash
docker compose down
```

To reset databases:
```bash
docker compose down -v   # removes volumes (all data)
```

---

## 8 — Common Scripts

Run from the **repo root** unless noted.

```bash
pnpm dev                        # Start all apps in dev mode
pnpm build                      # Build all apps
pnpm lint                       # Lint all apps

# Database
cd packages/database
pnpm prisma migrate dev         # Create and apply a new migration
pnpm prisma migrate reset       # Reset DB and re-run all migrations (⚠ deletes data)
pnpm prisma generate            # Regenerate Prisma client after schema changes
pnpm prisma studio              # Open Prisma GUI at http://localhost:5555
```

---

## 9 — Project URLs (local)

| URL | Description |
|---|---|
| http://localhost:3000 | Customer booking site |
| http://localhost:3001 | Admin panel |
| http://localhost:3002 | Agent portal |
| http://localhost:4000/api/v1 | REST API base URL |
| http://localhost:4000/api/v1/health | API health check |
| http://localhost:5555 | Prisma Studio (when running) |

---

## 10 — First Steps After Setup

1. **Open the admin panel** at http://localhost:3001 and log in with your admin account
2. Go to **Customization** → fill in your company name, contact details, and hero banner text
3. Go to **Tour Packages → New** and create your first package (mark it as **Featured** to appear on the homepage)
4. Go to **Hotels → New** and add a hotel with rooms
5. Go to **Testimonials** and add a few customer reviews — they'll appear on the homepage
6. Open the **Customer site** at http://localhost:3000 to see it live

---

## 11 — Troubleshooting

**`pnpm install` fails**
- Make sure you're using Node.js 18+: `node --version`
- Try deleting `node_modules` and `pnpm-lock.yaml` then re-running `pnpm install`

**`prisma migrate dev` fails with "connection refused"**
- PostgreSQL isn't running. Start it with `docker compose up postgres -d` or your system service manager
- Double-check `DATABASE_URL` in `apps/api/.env` — the user, password, host, and database name must all match

**API starts but returns 500 errors**
- Check the API logs in the terminal — errors are printed in JSON by Pino
- Make sure `DATABASE_URL` and `JWT_SECRET` are set in `apps/api/.env`
- Run `pnpm prisma generate` inside `packages/database` if you see "PrismaClient is not generated"

**Customer app can't reach the API**
- Make sure `NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1` is set in `apps/customer/.env.local`
- Make sure the API is running on port 4000

**Google Sign-In gives "redirect_uri_mismatch"**
- The redirect URI in Google Cloud Console must exactly match. Add:
  `http://localhost:3000/api/auth/callback/google`

**Admin panel redirects to login after Google sign-in**
- The user's role must be `ADMIN` or `SUPER_ADMIN` in the database. See [Section 4](#4--create-the-first-admin-user)

**Flight search returns no results**
- `AMADEUS_CLIENT_ID` and `AMADEUS_CLIENT_SECRET` must be set in `apps/api/.env`
- The Amadeus test environment has limited routes — try major routes (e.g. DEL → BOM)

---

## 12 — Tech Stack Reference

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS 3 |
| Backend | Express.js 4, TypeScript 5 |
| Primary DB | PostgreSQL 15 via Prisma ORM |
| Secondary DB | MongoDB 6 via Mongoose |
| Auth | NextAuth.js 4 (Credentials + Google OAuth) + JWT |
| Monorepo | Turborepo + pnpm workspaces |
| Flights | Amadeus SDK |
| Payments | Razorpay + PayU |
| State / Cache | TanStack Query v5 |
