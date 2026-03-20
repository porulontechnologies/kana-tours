# KaNa Travels and Holidays - Complete Project Documentation

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Directory Structure](#3-directory-structure)
4. [Prerequisites & Installation](#4-prerequisites--installation)
5. [Environment Configuration](#5-environment-configuration)
6. [Running Locally](#6-running-locally)
7. [Shared Packages](#7-shared-packages)
8. [API Server (apps/api)](#8-api-server-appsapi)
9. [Customer App (apps/customer)](#9-customer-app-appscustomer)
10. [Admin App (apps/admin)](#10-admin-app-appsadmin)
11. [Database Layer](#11-database-layer)
12. [Authentication Flow](#12-authentication-flow)
13. [Payment Integration](#13-payment-integration)
14. [External API Integrations](#14-external-api-integrations)
15. [API Endpoints Reference](#15-api-endpoints-reference)
16. [Implementation Status & Remaining Work](#16-implementation-status--remaining-work)
17. [Docker Deployment](#17-docker-deployment)
18. [Troubleshooting](#18-troubleshooting)

---

## 1. Project Overview

**KaNa Travels and Holidays** is a full-stack Tours & Travels web application with:

- **Customer-facing site** - Browse tours, hotels, flights, buses; book and pay online
- **Admin panel** - Manage hotels, tour packages, view bookings, analytics dashboard
- **REST API** - Express.js backend powering both frontends

### Brand Colors (extracted from logo)

| Color         | Hex       | Usage                        |
|---------------|-----------|------------------------------|
| Navy Blue     | `#1B3A5C` | Primary / Headers / CTAs     |
| Golden Amber  | `#E8A317` | Accent / Highlights / Prices |
| Sky Blue      | `#4A90D9` | Secondary / Links / Info     |
| Background    | `#F0F4F8` | Page backgrounds             |

### Tech Stack

| Layer      | Technology                                          |
|------------|-----------------------------------------------------|
| Frontend   | Next.js 14 (App Router), React 18, Tailwind CSS 3   |
| Backend    | Express.js 4, TypeScript 5                          |
| Databases  | PostgreSQL (Prisma 5) + MongoDB (Mongoose 8)        |
| Auth       | NextAuth.js 4 (Google OAuth) + JWT (API)            |
| Payments   | Razorpay SDK + PayU (hash-based)                    |
| Flights    | Amadeus SDK 9                                       |
| Buses      | Redbus API                                          |
| Monorepo   | Turborepo + pnpm workspaces                         |
| Queries    | TanStack React Query 5                              |
| Logging    | Pino (structured JSON logging)                      |
| Charts     | Recharts 2 (admin analytics)                        |
| Validation | Zod 3 (API request validation + env validation)     |

---

## 2. Architecture

```
                    +------------------+
                    |   Customer App   |  (Next.js :3000)
                    |  apps/customer   |
                    +--------+---------+
                             |
                             | HTTP / REST
                             v
+------------------+   +----+----------+   +------------------+
|   Admin App      |-->|   API Server  |<->|   PostgreSQL     |
|  apps/admin      |   |   apps/api    |   |   (Prisma ORM)   |
|  (Next.js :3001) |   | (Express:4000)|   +------------------+
+------------------+   +----+----------+
                             |
                             +------------>  MongoDB (Mongoose)
                             |               (logs, cache, reviews, analytics)
                             |
                    +--------+---------+
                    |  External APIs   |
                    | Amadeus | Redbus |
                    | Razorpay | PayU  |
                    +------------------+

Shared Packages (packages/):
  @kana/database   - Prisma client + Mongoose models
  @kana/types      - Shared TypeScript interfaces
  @kana/config     - Brand colors, constants
  @kana/ui         - Reusable React components
  @kana/tsconfig   - Shared TS configs
  @kana/eslint-config - Shared ESLint config
```

### Data Flow

1. **Customer/Admin** frontends call the **API server** via REST (`NEXT_PUBLIC_API_URL`)
2. **API server** validates requests with **Zod**, authenticates via **JWT**, and enforces **RBAC**
3. **Prisma** handles all PostgreSQL operations (users, bookings, hotels, packages, payments)
4. **Mongoose** handles MongoDB operations (activity logs, search cache, reviews, analytics)
5. **Payment flow**: Create booking (PENDING) -> Create payment order -> Verify via webhook -> Update status
6. **External APIs**: Amadeus (flights) and Redbus (buses) results are cached in MongoDB (15min TTL)

---

## 3. Directory Structure

```
Kana/
├── apps/
│   ├── admin/                          # Admin Next.js app (:3001)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (auth)/
│   │   │   │   │   ├── layout.tsx      # Auth layout (centered, no sidebar)
│   │   │   │   │   └── login/page.tsx  # Admin login page
│   │   │   │   ├── analytics/page.tsx  # Dashboard analytics
│   │   │   │   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│   │   │   │   ├── bookings/
│   │   │   │   │   ├── page.tsx        # All bookings table
│   │   │   │   │   ├── buses/page.tsx  # Bus bookings view
│   │   │   │   │   └── flights/page.tsx # Flight bookings view
│   │   │   │   ├── hotels/
│   │   │   │   │   ├── page.tsx        # Hotels list
│   │   │   │   │   ├── new/page.tsx    # Create hotel form
│   │   │   │   │   └── [id]/edit/page.tsx # Edit hotel
│   │   │   │   ├── packages/
│   │   │   │   │   ├── page.tsx        # Packages list
│   │   │   │   │   ├── new/page.tsx    # Create package form
│   │   │   │   │   └── [id]/edit/page.tsx # Edit package
│   │   │   │   ├── users/page.tsx      # User management
│   │   │   │   ├── globals.css         # Tailwind imports
│   │   │   │   ├── layout.tsx          # Root layout with sidebar
│   │   │   │   ├── page.tsx            # Dashboard home
│   │   │   │   └── providers.tsx       # Session + Query providers
│   │   │   ├── components/layout/
│   │   │   │   ├── AdminHeader.tsx     # Top header bar
│   │   │   │   └── AdminSidebar.tsx    # Side navigation
│   │   │   ├── hooks/useAdminAuth.ts   # Admin auth guard hook
│   │   │   └── lib/
│   │   │       ├── api-client.ts       # Axios instance for API
│   │   │       └── auth.ts             # NextAuth config (PrismaAdapter + admin gate)
│   │   ├── Dockerfile
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   ├── api/                            # Express.js API server (:4000)
│   │   ├── src/
│   │   │   ├── index.ts                # Server bootstrap (start + mongo connect)
│   │   │   ├── app.ts                  # Express app setup (middleware + routes)
│   │   │   ├── config/
│   │   │   │   └── env.ts              # Zod env validation
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts   # JWT authentication
│   │   │   │   ├── rbac.middleware.ts   # Role-based access control
│   │   │   │   ├── validate.middleware.ts # Zod request validation
│   │   │   │   ├── errorHandler.middleware.ts # Global error handler
│   │   │   │   └── rateLimiter.middleware.ts  # Rate limiting (100/15min general, 20/15min auth)
│   │   │   ├── controllers/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── hotel.controller.ts
│   │   │   │   ├── package.controller.ts
│   │   │   │   ├── booking.controller.ts
│   │   │   │   ├── payment.controller.ts
│   │   │   │   ├── flight.controller.ts
│   │   │   │   ├── bus.controller.ts
│   │   │   │   ├── review.controller.ts
│   │   │   │   └── user.controller.ts
│   │   │   ├── routes/
│   │   │   │   ├── index.ts            # Route aggregator
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── hotel.routes.ts
│   │   │   │   ├── package.routes.ts
│   │   │   │   ├── booking.routes.ts
│   │   │   │   ├── payment.routes.ts
│   │   │   │   ├── flight.routes.ts
│   │   │   │   ├── bus.routes.ts
│   │   │   │   ├── review.routes.ts
│   │   │   │   └── user.routes.ts
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts     # Google auth + JWT generation
│   │   │   │   ├── hotel.service.ts    # Hotel + Room CRUD
│   │   │   │   ├── package.service.ts  # Tour package CRUD
│   │   │   │   ├── booking.service.ts  # Booking lifecycle
│   │   │   │   ├── review.service.ts   # Review CRUD
│   │   │   │   ├── payment/
│   │   │   │   │   ├── payment.service.ts      # Payment abstraction layer (factory)
│   │   │   │   │   ├── razorpay.provider.ts    # Razorpay implementation
│   │   │   │   │   └── payu.provider.ts        # PayU implementation
│   │   │   │   └── external/
│   │   │   │       ├── amadeus.service.ts      # Flight search + booking (Amadeus SDK)
│   │   │   │       └── redbus.service.ts       # Bus search + booking (Redbus API)
│   │   │   ├── validators/
│   │   │   │   ├── auth.validator.ts
│   │   │   │   ├── hotel.validator.ts
│   │   │   │   ├── package.validator.ts
│   │   │   │   ├── booking.validator.ts
│   │   │   │   ├── payment.validator.ts
│   │   │   │   └── review.validator.ts
│   │   │   └── utils/
│   │   │       ├── apiResponse.ts      # Standardized response helpers
│   │   │       ├── errors.ts           # Custom error classes (AppError, NotFoundError, etc.)
│   │   │       └── logger.ts           # Pino logger (pretty in dev, JSON in prod)
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── customer/                       # Customer Next.js app (:3000)
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route
│       │   │   ├── page.tsx            # Home page (hero, search widget, popular tours)
│       │   │   ├── tours/
│       │   │   │   ├── page.tsx        # Tours listing with filters
│       │   │   │   └── [slug]/page.tsx # Tour detail (itinerary, gallery)
│       │   │   ├── hotels/
│       │   │   │   ├── page.tsx        # Hotels listing with search
│       │   │   │   └── [id]/page.tsx   # Hotel detail (rooms, amenities)
│       │   │   ├── flights/page.tsx    # Flight search + results
│       │   │   ├── buses/page.tsx      # Bus search + results
│       │   │   ├── booking/
│       │   │   │   ├── [id]/page.tsx   # Booking form
│       │   │   │   └── payment/
│       │   │   │       ├── page.tsx    # Payment selector (Razorpay/PayU + UPI)
│       │   │   │       └── success/page.tsx # Payment success confirmation
│       │   │   ├── dashboard/
│       │   │   │   ├── layout.tsx      # Dashboard sidebar layout
│       │   │   │   ├── page.tsx        # User dashboard (upcoming trips)
│       │   │   │   ├── bookings/page.tsx # Booking history
│       │   │   │   └── profile/page.tsx  # User profile
│       │   │   ├── globals.css
│       │   │   └── layout.tsx          # Root layout (Header + Footer)
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   │   ├── Header.tsx      # Navigation header with logo
│       │   │   │   └── Footer.tsx      # Site footer
│       │   │   └── reviews/
│       │   │       └── ReviewSection.tsx # Review display + submit
│       │   ├── lib/
│       │   │   ├── api-client.ts       # Axios instance
│       │   │   └── auth.ts             # NextAuth config (JWT strategy)
│       │   └── providers/
│       │       ├── AuthProvider.tsx     # SessionProvider wrapper
│       │       └── QueryProvider.tsx    # TanStack Query provider
│       ├── Dockerfile
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       └── package.json
│
├── packages/
│   ├── config/                         # @kana/config
│   │   └── src/
│   │       ├── index.ts                # Re-exports constants
│   │       └── constants.ts            # Brand colors, categories, amenities, pagination
│   │
│   ├── database/                       # @kana/database
│   │   ├── prisma/
│   │   │   └── schema.prisma           # Full PostgreSQL schema
│   │   └── src/
│   │       ├── index.ts                # Exports prisma + connectMongo + models
│   │       ├── prisma.ts               # Singleton PrismaClient
│   │       ├── mongo.ts                # MongoDB connection
│   │       └── models/
│   │           ├── index.ts            # Re-exports all models
│   │           ├── ActivityLog.ts      # Activity logging (MongoDB)
│   │           ├── Review.ts           # Reviews (MongoDB)
│   │           ├── SearchCache.ts      # Flight/bus cache (MongoDB, TTL index)
│   │           └── Analytics.ts        # Analytics events (MongoDB)
│   │
│   ├── eslint-config/                  # @kana/eslint-config
│   │   └── index.mjs
│   │
│   ├── tsconfig/                       # @kana/tsconfig
│   │   ├── base.json                   # Base TS config
│   │   ├── nextjs.json                 # Next.js specific config
│   │   └── node.json                   # Node.js (API) specific config
│   │
│   ├── types/                          # @kana/types
│   │   └── src/
│   │       ├── index.ts                # Re-exports all types
│   │       ├── user.ts                 # User, UserProfile, UserRole
│   │       ├── hotel.ts                # Hotel, Room, HotelFilters, CreateHotelInput
│   │       ├── package.ts              # TourPackage, ItineraryDay, TourPackageFilters
│   │       ├── booking.ts              # Booking, BookingStatus, BookingType, PassengerDetail
│   │       ├── payment.ts              # Payment, PaymentGateway, CreateOrderResult
│   │       ├── flight.ts               # FlightOffer, FlightSegment, FlightSearchParams
│   │       ├── bus.ts                  # BusResult, SeatLayout, Seat, BusSearchParams
│   │       └── api.ts                  # ApiResponse<T>, PaginationMeta, DashboardStats
│   │
│   └── ui/                             # @kana/ui
│       └── src/
│           ├── index.ts                # Re-exports all components
│           ├── Button.tsx              # Button with variants (primary/secondary/outline/ghost/danger)
│           ├── Input.tsx               # Form input with label + error
│           ├── Textarea.tsx            # Textarea with label + error
│           ├── Select.tsx              # Dropdown select
│           ├── DatePicker.tsx          # Date input
│           ├── Card.tsx                # Content card wrapper
│           ├── Modal.tsx               # Dialog modal
│           ├── Table.tsx               # Data table with columns
│           ├── Pagination.tsx          # Page navigation
│           ├── Badge.tsx               # Status badge (success/warning/error/info)
│           ├── Spinner.tsx             # Loading spinner
│           └── Toast.tsx               # Toast notifications
│
├── .env.example                        # Root environment template
├── docker-compose.yml                  # Docker orchestration
├── turbo.json                          # Turborepo pipeline config
├── pnpm-workspace.yaml                 # Workspace definition
├── tsconfig.json                       # Root TS config
├── package.json                        # Root scripts + devDependencies
└── k.jpeg                              # KaNa logo image
```

---

## 4. Prerequisites & Installation

### 4.1 Required Software

| Software     | Version  | Purpose                        | Download                                          |
|-------------|----------|--------------------------------|---------------------------------------------------|
| **Node.js** | >= 18.x  | JavaScript runtime             | https://nodejs.org/                               |
| **pnpm**    | >= 9.15  | Package manager (workspaces)   | `npm install -g pnpm@9`                           |
| **PostgreSQL** | >= 14 | Primary relational database    | https://www.postgresql.org/download/              |
| **MongoDB** | >= 6.0   | Secondary document database    | https://www.mongodb.com/try/download/community    |
| **Git**     | >= 2.x   | Version control                | https://git-scm.com/                              |

**Optional but recommended:**

| Software          | Purpose                          | Download                                    |
|-------------------|----------------------------------|---------------------------------------------|
| **Docker Desktop**| Run databases via containers     | https://www.docker.com/products/docker-desktop |
| **pgAdmin 4**     | PostgreSQL GUI                   | https://www.pgadmin.org/                    |
| **MongoDB Compass**| MongoDB GUI                     | https://www.mongodb.com/products/compass    |
| **Postman**       | API testing                      | https://www.postman.com/                    |

### 4.2 External Service Accounts (set up when needed)

| Service             | Purpose              | Signup URL                                            |
|---------------------|----------------------|-------------------------------------------------------|
| **Google Cloud Console** | OAuth login     | https://console.cloud.google.com/                     |
| **Razorpay**        | Payment gateway      | https://dashboard.razorpay.com/signup                 |
| **PayU**            | Alternative payments | https://payu.in/business                              |
| **Amadeus for Developers** | Flight search | https://developers.amadeus.com/                       |
| **Redbus API**      | Bus search           | Contact Redbus for API access                         |

### 4.3 Installation Steps

```bash
# 1. Clone the repository
git clone <your-repo-url> Kana
cd Kana

# 2. Install all dependencies (pnpm resolves workspace links automatically)
pnpm install

# 3. Generate Prisma client (required before first run)
pnpm db:generate

# 4. Set up environment variables (see Section 5 below)
cp .env.example .env
cp apps/customer/.env.local.example apps/customer/.env.local
cp apps/admin/.env.local.example apps/admin/.env.local
cp apps/api/.env.example apps/api/.env

# 5. Create PostgreSQL database
# Using psql:
psql -U postgres -c "CREATE DATABASE kana_travels;"

# 6. Run Prisma migrations to create all tables
pnpm db:migrate

# 7. (Optional) Seed the database with sample data
pnpm db:seed

# 8. Start all apps in development mode
pnpm dev
```

After `pnpm dev`, three servers start simultaneously:

| App      | URL                     | Purpose              |
|----------|-------------------------|----------------------|
| Customer | http://localhost:3000    | Customer website     |
| Admin    | http://localhost:3001    | Admin dashboard      |
| API      | http://localhost:4000    | REST API server      |

You can also start individual apps:

```bash
pnpm dev:customer   # Only customer app
pnpm dev:admin      # Only admin app
pnpm dev:api        # Only API server
```

---

## 5. Environment Configuration

### 5.1 Root `.env` (used by Prisma and the API)

```env
# ─── Databases ────────────────────────────────────────────
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/kana_travels
MONGODB_URI=mongodb://localhost:27017/kana_travels

# ─── Authentication ──────────────────────────────────────
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=generate_a_random_32_char_string
JWT_SECRET=generate_another_random_string_min_16_chars

# ─── Razorpay (Test Mode) ────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# ─── PayU (Test Mode) ────────────────────────────────────
PAYU_MERCHANT_KEY=your_payu_test_key
PAYU_MERCHANT_SALT=your_payu_test_salt
PAYU_BASE_URL=https://test.payu.in

# ─── Amadeus (Test/Sandbox) ──────────────────────────────
AMADEUS_CLIENT_ID=your_amadeus_client_id
AMADEUS_CLIENT_SECRET=your_amadeus_client_secret
AMADEUS_HOSTNAME=test

# ─── Redbus ──────────────────────────────────────────────
REDBUS_API_KEY=your_redbus_api_key
REDBUS_BASE_URL=https://api.redbus.in

# ─── Email (Optional) ────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### 5.2 `apps/customer/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=same_as_root_nextauth_secret
GOOGLE_CLIENT_ID=same_as_root
GOOGLE_CLIENT_SECRET=same_as_root
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

### 5.3 `apps/admin/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=same_as_root_nextauth_secret
GOOGLE_CLIENT_ID=same_as_root
GOOGLE_CLIENT_SECRET=same_as_root
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/kana_travels
```

> **Note:** The admin app uses `DATABASE_URL` directly because its NextAuth config uses `PrismaAdapter` to check the user's role during sign-in.

### 5.4 `apps/api/.env`

```env
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/kana_travels
MONGODB_URI=mongodb://localhost:27017/kana_travels
JWT_SECRET=your_jwt_secret_min_16_chars
CUSTOMER_APP_URL=http://localhost:3000
ADMIN_APP_URL=http://localhost:3001
GOOGLE_CLIENT_ID=same_as_root
GOOGLE_CLIENT_SECRET=same_as_root
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_test_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
PAYU_MERCHANT_KEY=your_payu_test_key
PAYU_MERCHANT_SALT=your_payu_test_salt
PAYU_BASE_URL=https://test.payu.in
AMADEUS_CLIENT_ID=your_amadeus_client_id
AMADEUS_CLIENT_SECRET=your_amadeus_client_secret
AMADEUS_HOSTNAME=test
REDBUS_API_KEY=your_redbus_api_key
REDBUS_BASE_URL=https://api.redbus.in
```

### 5.5 How to Get API Keys

#### Google OAuth

1. Go to https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Add Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (customer)
   - `http://localhost:3001/api/auth/callback/google` (admin)
7. Copy the **Client ID** and **Client Secret**

#### Razorpay (Test Mode)

1. Sign up at https://dashboard.razorpay.com/signup
2. Go to **Settings > API Keys**
3. Generate **Test Mode** keys
4. Copy `key_id` (starts with `rzp_test_`) and `key_secret`
5. For webhooks: **Settings > Webhooks > Add New Webhook**
   - URL: `https://your-domain/api/v1/payments/webhook/razorpay`
   - Events: `payment.authorized`, `payment.captured`, `payment.failed`

#### Amadeus (Sandbox)

1. Sign up at https://developers.amadeus.com/
2. Create an app in the dashboard
3. Copy **API Key** (client ID) and **API Secret** (client secret)
4. Use `AMADEUS_HOSTNAME=test` for sandbox mode

#### Generate Secrets

```bash
# Generate NEXTAUTH_SECRET (32+ chars)
openssl rand -base64 32

# Generate JWT_SECRET (16+ chars)
openssl rand -base64 24
```

---

## 6. Running Locally

### 6.1 Quick Start (All Services)

```bash
# Start databases (if using Docker)
docker-compose up -d postgres mongo

# Start all apps
pnpm dev
```

### 6.2 Verify Everything Works

```bash
# 1. Health check - should return { success: true, data: { status: "ok" } }
curl http://localhost:4000/api/v1/health

# 2. Customer app - open http://localhost:3000 in browser

# 3. Admin app - open http://localhost:3001 in browser
```

### 6.3 Database Management Commands

```bash
# Generate Prisma Client (after schema changes)
pnpm db:generate

# Create and run migrations
pnpm db:migrate

# Push schema directly (skip migration files - dev only)
pnpm --filter @kana/database run db:push

# Open Prisma Studio (GUI for DB)
pnpm --filter @kana/database run db:studio

# Seed sample data
pnpm db:seed
```

### 6.4 Build for Production

```bash
# Build all apps
pnpm build

# Start production servers
cd apps/api && pnpm start        # API on :4000
cd apps/customer && pnpm start   # Customer on :3000
cd apps/admin && pnpm start      # Admin on :3001
```

---

## 7. Shared Packages

### 7.1 `@kana/config` - Brand Constants

**File:** `packages/config/src/constants.ts`

Exports all shared constants used across the project:

- **`BRAND_COLORS`** - All brand color tokens (primary, accent, secondary, semantic colors)
- **`APP_NAME`** / **`APP_SHORT_NAME`** - "KaNa Travels and Holidays" / "KaNa Travels"
- **`TOUR_CATEGORIES`** - `["ADVENTURE", "LEISURE", "PILGRIMAGE", "HONEYMOON", "FAMILY", "WILDLIFE", "BEACH", "MOUNTAIN"]`
- **`ROOM_TYPES`** - `["SINGLE", "DOUBLE", "TWIN", "SUITE", "DELUXE", "PREMIUM"]`
- **`HOTEL_AMENITIES`** - 15 standard amenity options
- **`BUS_AMENITIES`** - 8 bus amenity options
- **`PAGINATION`** - `{ DEFAULT_PAGE: 1, DEFAULT_LIMIT: 10, MAX_LIMIT: 100 }`

**Usage:**

```typescript
import { BRAND_COLORS, TOUR_CATEGORIES } from "@kana/config";
```

### 7.2 `@kana/types` - Shared TypeScript Types

**File:** `packages/types/src/`

Provides all shared interfaces and type definitions. Each domain has its own file:

| File          | Key Exports                                                      |
|---------------|------------------------------------------------------------------|
| `user.ts`     | `UserRole`, `User`, `UserProfile`                                |
| `hotel.ts`    | `Hotel`, `Room`, `CreateHotelInput`, `HotelFilters`              |
| `package.ts`  | `TourPackage`, `ItineraryDay`, `TourCategory`, `TourPackageFilters` |
| `booking.ts`  | `Booking`, `BookingStatus`, `BookingType`, `PassengerDetail`, `CreateBookingInput` |
| `payment.ts`  | `Payment`, `PaymentGateway`, `PaymentMethod`, `CreateOrderResult`, `VerifyPaymentInput` |
| `flight.ts`   | `FlightOffer`, `FlightSegment`, `FlightSearchParams`, `PassengerInfo` |
| `bus.ts`      | `BusResult`, `SeatLayout`, `Seat`, `SeatRow`, `BusSearchParams`, `BusPassenger` |
| `api.ts`      | `ApiResponse<T>`, `PaginationMeta`, `DashboardStats`, `BookingSummary` |

**Usage:**

```typescript
import type { Hotel, HotelFilters, ApiResponse } from "@kana/types";
```

### 7.3 `@kana/ui` - Shared UI Components

**File:** `packages/ui/src/`

All components use Tailwind CSS classes with the brand color tokens configured in each app's `tailwind.config.ts`.

| Component      | Props                                          | Description                          |
|----------------|------------------------------------------------|--------------------------------------|
| `Button`       | `variant`, `size`, `loading`, `disabled`       | 5 variants: primary, secondary, outline, ghost, danger |
| `Input`        | `label`, `error`, `type`, standard input props | Form input with label and error msg  |
| `Textarea`     | `label`, `error`, `rows`                       | Multi-line text input                |
| `Select`       | `label`, `error`, `options[]`, `placeholder`   | Dropdown select                      |
| `DatePicker`   | `label`, `error`, `min`, `max`                 | Date input field                     |
| `Card`         | `className`, `onClick`, `children`             | Content card wrapper with shadow     |
| `Modal`        | `isOpen`, `onClose`, `title`, `children`       | Overlay dialog modal                 |
| `Table`        | `columns[]`, `data[]`, `loading`               | Data table with configurable columns |
| `Pagination`   | `page`, `totalPages`, `onPageChange`           | Page navigation controls             |
| `Badge`        | `variant`, `children`                          | Status badge (success/warning/error/info) |
| `Spinner`      | `size`, `className`                            | Loading spinner animation            |
| `Toast`        | `message`, `variant`, `onClose`                | Toast notification                   |

**Usage:**

```tsx
import { Button, Card, Table, Pagination } from "@kana/ui";

<Button variant="primary" loading={isSubmitting}>
  Book Now
</Button>
```

### 7.4 `@kana/database` - Database Layer

See [Section 11](#11-database-layer) for full details.

### 7.5 `@kana/tsconfig` - TypeScript Configs

Three shared configs that apps extend:

| Config        | Used By          | Key Settings                              |
|---------------|------------------|-------------------------------------------|
| `base.json`   | All packages     | `strict: true`, `ES2020`, `bundler` resolution |
| `nextjs.json` | Customer, Admin  | Adds `jsx: "preserve"`, Next.js plugins   |
| `node.json`   | API server       | `module: "CommonJS"`, `outDir: "dist"`    |

---

## 8. API Server (apps/api)

### 8.1 Entry Point & App Setup

**`src/index.ts`** - Server bootstrap:
1. Connects to MongoDB (gracefully - warns but doesn't crash if unavailable)
2. Starts Express on `PORT` (default: 4000)

**`src/app.ts`** - Express app configuration:
1. **Helmet** - Security headers
2. **CORS** - Allows only `CUSTOMER_APP_URL` and `ADMIN_APP_URL`
3. **Compression** - gzip response compression
4. **Body parsers** - JSON (10mb limit) + URL-encoded
5. **Cookie parser** - For token cookies
6. **Rate limiter** - 100 requests per 15 minutes per IP
7. **Health check** - `GET /api/v1/health`
8. **Routes** - All API routes under `/api/v1`
9. **Error handler** - Global error handling middleware

### 8.2 Environment Validation

**`src/config/env.ts`**

Uses Zod to validate all environment variables at startup. If required variables are missing, the server exits with a clear error message.

Required variables: `DATABASE_URL`, `JWT_SECRET` (min 16 chars)
Optional variables: All external API keys (Razorpay, Amadeus, PayU, Redbus, Google, MongoDB)

### 8.3 Middleware Stack

#### Authentication (`auth.middleware.ts`)
- Extracts JWT from `Authorization: Bearer <token>` header or `token` cookie
- Verifies JWT using `JWT_SECRET`
- Attaches `req.user = { id, email, role }` to the request
- Returns 401 if token is missing/invalid

#### RBAC (`rbac.middleware.ts`)
- `authorize(...roles: UserRole[])` - factory that returns middleware
- Checks `req.user.role` against allowed roles
- Returns 403 if role doesn't match
- Usage: `authorize("ADMIN", "SUPER_ADMIN")`

#### Validation (`validate.middleware.ts`)
- `validate(schema: ZodSchema, source: "body" | "query" | "params")`
- Validates request data against Zod schema
- Returns 422 with field-level errors if validation fails
- Replaces `req[source]` with parsed (cleaned) data on success

#### Rate Limiting (`rateLimiter.middleware.ts`)
- `apiLimiter` - 100 requests per 15 min window (applied to all `/api/` routes)
- `authLimiter` - 20 requests per 15 min window (applied to auth routes only)

#### Error Handler (`errorHandler.middleware.ts`)
- Catches all errors thrown in route handlers
- `AppError` subclasses return their `statusCode` and `message`
- Unknown errors return 500 with "Internal server error"
- All errors logged via Pino

### 8.4 Services Layer

Each service encapsulates business logic and database operations:

#### `auth.service.ts`
- `authenticateWithGoogle(googleToken)` - Verifies Google ID token via Google's tokeninfo endpoint, upserts user in PostgreSQL, returns JWT
- `generateToken(userId, email, role)` - Creates JWT with 7-day expiry
- `getUserById(userId)` - Fetches user profile

#### `hotel.service.ts`
- `createHotel(data)` - Creates hotel with auto-generated slug, checks for uniqueness
- `getHotels(filters)` - Paginated hotel listing with city/price/rating filters
- `getHotelBySlug(slug)` - Single hotel lookup by slug (includes active rooms)
- `getHotelById(id)` - Single hotel lookup by ID
- `updateHotel(id, data)` - Updates hotel, re-generates slug if name changed
- `deleteHotel(id)` - Soft delete (sets `isActive: false`)
- `addRoom(hotelId, data)` - Adds a room to a hotel
- `getHotelRooms(hotelId)` - Lists active rooms for a hotel

#### `package.service.ts`
- `createTourPackage(data)` - Creates package with slug, converts startDates to Date objects
- `getTourPackages(filters)` - Paginated listing with destination/category/price/duration filters
- `getFeaturedPackages()` - Returns up to 8 featured packages
- `getPackageBySlug(slug)` - Single package lookup
- `updateTourPackage(id, data)` - Updates package, handles slug and date conversions
- `deleteTourPackage(id)` - Soft delete

#### `booking.service.ts`
- `createBooking(data)` - Calculates total amount based on booking type:
  - **HOTEL**: `room.pricePerNight * nights * guestCount`
  - **TOUR_PACKAGE**: `(discountedPrice ?? price) * guestCount`
  - **FLIGHT/BUS**: Amount from external API (set via payment flow)
- `getBookings(params)` - Paginated listing with status/type/user filters
- `getBookingById(id)` - Full booking with user, hotel, package, payment relations
- `updateBookingStatus(id, status)` - Admin status update
- `cancelBooking(id, userId?)` - Cancel with ownership check for customers

#### `payment/payment.service.ts` - Payment Abstraction
- Defines `PaymentProvider` interface with: `createOrder()`, `verifyPayment()`, `processRefund()`
- Factory function `getPaymentProvider(gateway)` returns the correct provider
- `RazorpayProvider` - Full Razorpay SDK integration (orders, signature verification, refunds)
- `PayUProvider` - Hash-based PayU integration (SHA-512 hash generation, reverse hash verification)

#### `external/amadeus.service.ts` - Flight Search
- `searchFlights(params)` - Searches Amadeus API, normalizes response into `FlightOffer[]`, caches in MongoDB (15min TTL)
- `getFlightOffer(offerId)` - Gets specific flight offer details
- `createFlightOrder(offer, travelers)` - Creates flight booking order
- Cache key: MD5 hash of search params

#### `external/redbus.service.ts` - Bus Search
- `searchBuses(params)` - Searches Redbus API, normalizes into `BusResult[]`, caches in MongoDB (15min TTL)
- `getSeatLayout(tripId)` - Gets seat layout for a specific trip
- `blockSeat(...)` - Blocks selected seats before booking
- `bookTicket(blockKey)` - Confirms bus ticket booking

### 8.5 Validators (Zod Schemas)

Each validator file exports Zod schemas used by the `validate` middleware:

| File                     | Schemas                                                    |
|--------------------------|-----------------------------------------------------------|
| `auth.validator.ts`      | `googleAuthSchema`, `updateProfileSchema`                  |
| `hotel.validator.ts`     | `createHotelSchema`, `updateHotelSchema`, `createRoomSchema`, `hotelFilterSchema` |
| `package.validator.ts`   | `createPackageSchema`, `updatePackageSchema`, `packageFilterSchema` |
| `booking.validator.ts`   | `createBookingSchema`, `updateBookingStatusSchema`         |
| `payment.validator.ts`   | `createOrderSchema`, `verifyPaymentSchema`                 |
| `review.validator.ts`    | Review creation/update schemas                             |

### 8.6 Utility Modules

#### `utils/apiResponse.ts`
Standardized API response helpers:
- `sendSuccess(res, data, message?, statusCode?, meta?)` - Success response
- `sendError(res, message, statusCode?)` - Error response
- `buildPaginationMeta(page, limit, total)` - Calculates pagination metadata

#### `utils/errors.ts`
Custom error classes extending `AppError`:
- `NotFoundError(resource)` - 404
- `ValidationError(message)` - 422
- `UnauthorizedError(message)` - 401
- `ForbiddenError(message)` - 403
- `ConflictError(message)` - 409

#### `utils/logger.ts`
Pino logger:
- **Development**: Pretty-printed colored output, debug level
- **Production**: Structured JSON output, info level

---

## 9. Customer App (apps/customer)

### 9.1 App Structure

Built with **Next.js 14 App Router**. Key architectural decisions:

- **Server Components** by default, `"use client"` only where needed (forms, interactive elements)
- **TanStack React Query** for server-state management (`QueryProvider.tsx`)
- **NextAuth.js** with JWT strategy for session management (`AuthProvider.tsx`)
- **Axios** API client pre-configured with base URL and auth token injection (`lib/api-client.ts`)

### 9.2 Pages

| Route                     | Description                                           |
|---------------------------|-------------------------------------------------------|
| `/`                       | Home page - hero banner, search widget, popular tours, testimonials |
| `/tours`                  | Tours listing with category/price/duration filters    |
| `/tours/[slug]`           | Tour detail - itinerary, gallery, booking CTA         |
| `/hotels`                 | Hotels listing with city/price/rating search          |
| `/hotels/[id]`            | Hotel detail - rooms, amenities, booking CTA          |
| `/flights`                | Flight search form + results page                     |
| `/buses`                  | Bus search form + results page                        |
| `/booking/[id]`           | Booking form (contact details, guest info)            |
| `/booking/payment`        | Payment method selector (Razorpay/PayU + UPI toggle)  |
| `/booking/payment/success`| Payment success confirmation                          |
| `/dashboard`              | User dashboard (upcoming trips, quick stats)          |
| `/dashboard/bookings`     | User's booking history                                |
| `/dashboard/profile`      | User profile management                               |
| `/login`                  | Google OAuth login page                               |

### 9.3 Auth Configuration

**`src/lib/auth.ts`**

- **Provider:** Google OAuth
- **Strategy:** JWT (no database sessions - stateless)
- **Session lifetime:** 30 days
- **Sign-in callback:** Syncs user data with the API backend via `POST /auth/social-login`
- **JWT callback:** Attaches `userId`, `role`, `accessToken` to the token
- **Custom pages:** `/login` for sign-in and errors

### 9.4 Tailwind Theme

Brand colors are available as Tailwind utilities:

```
navy-DEFAULT (#1B3A5C)    → bg-navy, text-navy, border-navy
navy-50 through navy-900  → bg-navy-50, text-navy-900, etc.
gold-DEFAULT (#E8A317)    → bg-gold, text-gold
gold-50 through gold-900
sky-DEFAULT (#4A90D9)     → bg-sky, text-sky
sky-50 through sky-900
background (#F0F4F8)      → bg-background
```

---

## 10. Admin App (apps/admin)

### 10.1 App Structure

Also Next.js 14 App Router, but with key differences from the customer app:

- **PrismaAdapter** for NextAuth (stores sessions in PostgreSQL)
- **Admin role gate** - Only users with `ADMIN` or `SUPER_ADMIN` role in DB can sign in
- **Sidebar layout** - Persistent navigation sidebar (`AdminSidebar.tsx`) + top header (`AdminHeader.tsx`)
- **Recharts** for analytics visualizations

### 10.2 Pages

| Route                     | Description                                 |
|---------------------------|---------------------------------------------|
| `/`                       | Dashboard home - stats cards, recent bookings |
| `/login`                  | Admin login (Google OAuth, role-gated)      |
| `/hotels`                 | Hotels list table with actions              |
| `/hotels/new`             | Create new hotel form                       |
| `/hotels/[id]/edit`       | Edit existing hotel                         |
| `/packages`               | Tour packages list table                    |
| `/packages/new`           | Create package with itinerary builder       |
| `/packages/[id]/edit`     | Edit existing package                       |
| `/bookings`               | All bookings table with status filters      |
| `/bookings/flights`       | Flight bookings view                        |
| `/bookings/buses`         | Bus bookings view                           |
| `/analytics`              | Revenue charts, top destinations, stats     |
| `/users`                  | User management table                       |

### 10.3 Auth Configuration

**`src/lib/auth.ts`**

- **Adapter:** `PrismaAdapter(prisma)` - persists accounts/sessions in PostgreSQL
- **Sign-in gate:** Checks the `User.role` in the database. Rejects non-ADMIN/SUPER_ADMIN users.
- **JWT token:** Includes `userId`, `role`, `isAdmin` flag
- **Session lifetime:** 24 hours (shorter than customer for security)

### 10.4 Admin Auth Hook

**`src/hooks/useAdminAuth.ts`**

A client-side hook that:
1. Checks if the session is loaded
2. Redirects to `/login` if not authenticated
3. Redirects to `/login` if the user role is not ADMIN/SUPER_ADMIN
4. Returns `{ session, status, isAdmin }` for conditional rendering

---

## 11. Database Layer

### 11.1 PostgreSQL (Prisma)

**Schema file:** `packages/database/prisma/schema.prisma`

#### Models & Relationships

```
User ──┬── Account (OAuth accounts, 1:many)
       ├── Session (auth sessions, 1:many)
       └── Booking (user bookings, 1:many)

Hotel ──┬── Room (hotel rooms, 1:many)
        └── Booking (hotel bookings, 1:many)

TourPackage ── Booking (package bookings, 1:many)

Booking ── Payment (1:1, unique bookingId)

VerificationToken (standalone, for email verification)
```

#### Model Details

**User**
- `id` (cuid), `email` (unique), `name`, `image`, `phone`
- `role` (enum: CUSTOMER, ADMIN, SUPER_ADMIN)
- `googleId` (unique, nullable)
- Indexes: `email`, `googleId`

**Hotel**
- `name`, `slug` (unique), `description` (text), `address`, `city`, `state`, `country`
- `starRating` (1-5), `amenities[]`, `images[]`, `pricePerNight`
- `isActive` (soft delete flag)
- Indexes: `city`, `slug`, `isActive`

**Room**
- `type`, `capacity`, `pricePerNight`, `amenities[]`, `images[]`, `totalRooms`
- Belongs to Hotel (cascade delete)

**TourPackage**
- `name`, `slug` (unique), `description`, `destination`, `duration`, `nights`
- `price`, `discountedPrice`, `inclusions[]`, `exclusions[]`
- `itinerary` (JSON - array of `ItineraryDay`), `images[]`, `coverImage`
- `startDates` (DateTime array), `category`, `isFeatured`
- Indexes: `destination`, `slug`, `category`, `isActive`

**Booking**
- `bookingType` (enum: TOUR_PACKAGE, HOTEL, FLIGHT, BUS)
- `status` (enum: PENDING, CONFIRMED, CANCELLED, COMPLETED, REFUNDED)
- `totalAmount`, `currency` (default INR)
- Optional foreign keys: `hotelId`, `roomId`, `tourPackageId`, `externalRef`
- Contact info: `contactName`, `contactEmail`, `contactPhone`
- `passengerDetails` (JSON)
- Indexes: `userId`, `status`, `bookingType`, `createdAt`

**Payment**
- `bookingId` (unique 1:1 relation)
- `gateway` (RAZORPAY / PAYU), `method` (UPI/CARD/NETBANKING/WALLET)
- `gatewayOrderId`, `gatewayPaymentId`, `amount`, `status`
- `gatewayResponse` (JSON - full gateway response)
- Indexes: `gatewayOrderId`, `status`

### 11.2 MongoDB (Mongoose)

**Connection:** `packages/database/src/mongo.ts` - Singleton connection with graceful handling (warns if `MONGODB_URI` not set)

#### Models

**ActivityLog** (`packages/database/src/models/ActivityLog.ts`)
- Tracks user actions across the system
- Fields: `userId`, `action`, `resource`, `resourceId`, `metadata`, `ipAddress`, `userAgent`, `timestamp`
- Indexes: `userId`, `timestamp`

**Review** (`packages/database/src/models/Review.ts`)
- User reviews for tours and hotels
- Fields: `userId`, `targetType` (HOTEL/TOUR_PACKAGE), `targetId`, `rating` (1-5), `comment`, `createdAt`

**SearchCache** (`packages/database/src/models/SearchCache.ts`)
- Caches external API results (flights, buses) to reduce API calls
- Fields: `cacheKey` (unique MD5), `searchType` (FLIGHT/BUS/HOTEL), `params`, `results`, `expiresAt`
- TTL index on `expiresAt` - MongoDB auto-deletes expired documents

**Analytics** (`packages/database/src/models/Analytics.ts`)
- Stores analytics events and aggregations
- Fields: `event`, `date`, `data`, `aggregations` (totalBookings, totalRevenue, topDestinations, conversionRate)
- Indexes: `event`, `date`

### 11.3 Database Client Usage

**Import from `@kana/database`:**

```typescript
// Prisma client (PostgreSQL)
import { prisma } from "@kana/database";
const users = await prisma.user.findMany();

// MongoDB connection
import { connectMongo } from "@kana/database";
await connectMongo();

// Mongoose models
import { SearchCache, ActivityLog, Review, Analytics } from "@kana/database";
const cached = await SearchCache.findOne({ cacheKey: "abc123" });
```

---

## 12. Authentication Flow

### 12.1 Customer Authentication

```
Browser                  Customer App (Next.js)         API Server
  │                            │                            │
  │  Click "Sign in with       │                            │
  │  Google"                   │                            │
  │ ──────────────────────────>│                            │
  │                            │  NextAuth redirects to     │
  │                            │  Google OAuth              │
  │  <── Google consent ──────>│                            │
  │                            │                            │
  │  Google callback with      │                            │
  │  auth code                 │                            │
  │ ──────────────────────────>│                            │
  │                            │  signIn callback:          │
  │                            │  POST /auth/social-login   │
  │                            │ ──────────────────────────>│
  │                            │                            │  Upsert user in
  │                            │                            │  PostgreSQL
  │                            │  <─── user synced ─────────│
  │                            │                            │
  │                            │  JWT created with          │
  │                            │  userId, role, accessToken │
  │  <─── session cookie ─────│                            │
  │                            │                            │
  │  Subsequent requests       │                            │
  │  include session cookie    │  API calls include         │
  │ ──────────────────────────>│  Authorization: Bearer JWT │
  │                            │ ──────────────────────────>│
```

### 12.2 Admin Authentication

Same Google OAuth flow, but with additional checks:
1. `PrismaAdapter` stores the OAuth account in PostgreSQL
2. `signIn` callback queries the database for the user's role
3. **Rejects** sign-in if `role` is not `ADMIN` or `SUPER_ADMIN`
4. To make a user an admin, manually update their role in the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

Or via Prisma Studio: `pnpm --filter @kana/database run db:studio`

### 12.3 API JWT Authentication

For direct API calls (not via NextAuth), the API server uses its own JWT flow:

1. Client sends Google ID token to `POST /api/v1/auth/google`
2. API verifies with Google's tokeninfo endpoint
3. API upserts user in PostgreSQL
4. API returns a JWT (7-day expiry) signed with `JWT_SECRET`
5. Client includes JWT in `Authorization: Bearer <token>` header
6. `auth.middleware.ts` verifies and attaches `req.user`

---

## 13. Payment Integration

### 13.1 Payment Abstraction Layer

**`apps/api/src/services/payment/payment.service.ts`**

Defines a `PaymentProvider` interface:

```typescript
interface PaymentProvider {
  createOrder(amount, currency, bookingId, ...customerInfo): Promise<CreateOrderResult>;
  verifyPayment(payload): Promise<VerifyResult>;
  processRefund(paymentId, amount): Promise<RefundResult>;
}
```

Factory function: `getPaymentProvider("RAZORPAY" | "PAYU")` returns the correct implementation.

### 13.2 Razorpay Flow

```
Customer                  Frontend              API Server            Razorpay
  │                          │                      │                    │
  │  Select Razorpay         │                      │                    │
  │ ────────────────────────>│                      │                    │
  │                          │ POST /payments/      │                    │
  │                          │ create-order         │                    │
  │                          │ ────────────────────>│                    │
  │                          │                      │ orders.create()    │
  │                          │                      │ ──────────────────>│
  │                          │                      │ <── order object ──│
  │                          │                      │                    │
  │                          │ <── { gatewayOrderId,│                    │
  │                          │      keyId, amount } │                    │
  │                          │                      │                    │
  │  Razorpay checkout       │                      │                    │
  │  popup opens             │                      │                    │
  │ <────────────────────────│                      │                    │
  │                          │                      │                    │
  │  Payment completed       │                      │                    │
  │ ────────────────────────>│                      │                    │
  │                          │ POST /payments/verify│                    │
  │                          │ { razorpay_order_id, │                    │
  │                          │   razorpay_payment_id│                    │
  │                          │   razorpay_signature}│                    │
  │                          │ ────────────────────>│                    │
  │                          │                      │ HMAC SHA256 verify │
  │                          │                      │ (key_secret)       │
  │                          │                      │                    │
  │                          │                      │ Update Payment +   │
  │                          │                      │ Booking status     │
  │                          │ <── success ─────────│                    │
```

**Key implementation details:**
- Amounts are in paise (multiplied by 100) for Razorpay API
- Signature verification: `HMAC-SHA256(order_id|payment_id, key_secret)`
- Webhook: `POST /api/v1/payments/webhook/razorpay` handles async payment events

### 13.3 PayU Flow

```
Customer                  Frontend              API Server
  │                          │                      │
  │  Select PayU             │                      │
  │ ────────────────────────>│                      │
  │                          │ POST /payments/      │
  │                          │ create-order         │
  │                          │ ────────────────────>│
  │                          │                      │ Generate txnId
  │                          │                      │ Generate SHA-512 hash:
  │                          │                      │ key|txnid|amount|
  │                          │                      │ productinfo|firstname|
  │                          │                      │ email|||...|salt
  │                          │ <── { hash, txnId,   │
  │                          │      merchantKey }   │
  │                          │                      │
  │  Form POST to PayU      │                      │
  │  (test.payu.in/_payment)│                      │
  │ <────────────────────────│                      │
  │                          │                      │
  │  PayU redirects back     │                      │
  │  with response + hash    │                      │
  │ ────────────────────────>│                      │
  │                          │ POST /payments/verify│
  │                          │ ────────────────────>│
  │                          │                      │ Reverse hash verify:
  │                          │                      │ salt|status|||...|
  │                          │                      │ email|firstname|
  │                          │                      │ productinfo|amount|
  │                          │                      │ txnid|key
  │                          │ <── success ─────────│
```

**Key implementation details:**
- Uses SHA-512 hashing (not HMAC)
- Forward hash: `key|txnid|amount|productinfo|firstname|email|||||||||||salt`
- Reverse hash: `salt|status|||||||||||email|firstname|productinfo|amount|txnid|key`
- Webhook: `POST /api/v1/payments/webhook/payu`

---

## 14. External API Integrations

### 14.1 Amadeus (Flights)

**Service:** `apps/api/src/services/external/amadeus.service.ts`

| Function | Amadeus API | Description |
|----------|-------------|-------------|
| `searchFlights(params)` | `shopping.flightOffersSearch.get` | Search flights with origin, destination, dates, passengers, class |
| `getFlightOffer(offerId)` | `shopping.flightOffersSearch.get` | Get specific offer details |
| `createFlightOrder(offer, travelers)` | `booking.flightOrders.post` | Book a flight |

**Caching strategy:**
- Cache key = MD5 of search params JSON
- Stored in MongoDB `SearchCache` collection
- TTL: 15 minutes (auto-deleted via MongoDB TTL index)
- Subsequent identical searches return cached results instantly

**Response normalization:**
The raw Amadeus response is mapped to `FlightOffer[]` with:
- `airline`, `flightNumber`, `departure/arrival` (airport, terminal, time)
- `duration`, `stops` (calculated from segments count)
- `price` (amount + currency)
- `segments[]` for multi-leg flights

### 14.2 Redbus (Buses)

**Service:** `apps/api/src/services/external/redbus.service.ts`

| Function | Endpoint | Description |
|----------|----------|-------------|
| `searchBuses(params)` | `GET /v1/buses/search` | Search buses by source, destination, date |
| `getSeatLayout(tripId)` | `GET /v1/buses/{tripId}/seats` | Get seat layout for a trip |
| `blockSeat(...)` | `POST /v1/buses/{tripId}/block` | Block seats before booking |
| `bookTicket(blockKey)` | `POST /v1/buses/book` | Confirm booking with block key |

**Authentication:** `Authorization: Bearer {REDBUS_API_KEY}` header

**Same caching strategy** as flights (15min TTL in MongoDB).

---

## 15. API Endpoints Reference

Base URL: `http://localhost:4000/api/v1`

### Health

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Health check |

### Auth (`/auth`)

| Method | Endpoint | Auth | Body | Description |
|--------|----------|------|------|-------------|
| POST | `/auth/google` | No | `{ token }` | Google OAuth login |
| GET | `/auth/me` | JWT | - | Get current user profile |
| POST | `/auth/logout` | JWT | - | Logout (clears cookie) |

### Hotels (`/hotels`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/hotels` | No | List hotels (query: `city`, `minPrice`, `maxPrice`, `minRating`, `page`, `limit`) |
| GET | `/hotels/:slug` | No | Get hotel by slug |
| GET | `/hotels/:id` | No | Get hotel by ID |
| POST | `/hotels` | Admin | Create hotel |
| PATCH | `/hotels/:id` | Admin | Update hotel |
| DELETE | `/hotels/:id` | Admin | Soft-delete hotel |
| POST | `/hotels/:id/rooms` | Admin | Add room to hotel |
| GET | `/hotels/:id/rooms` | No | List rooms for hotel |

### Tour Packages (`/packages`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/packages` | No | List packages (query: `destination`, `category`, `minPrice`, `maxPrice`, `minDuration`, `maxDuration`, `page`, `limit`) |
| GET | `/packages/featured` | No | Get featured packages |
| GET | `/packages/:slug` | No | Get package by slug |
| POST | `/packages` | Admin | Create package |
| PATCH | `/packages/:id` | Admin | Update package |
| DELETE | `/packages/:id` | Admin | Soft-delete package |

### Bookings (`/bookings`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/bookings` | JWT | Create booking |
| GET | `/bookings` | Admin | List all bookings |
| GET | `/bookings/my` | JWT | List user's bookings |
| GET | `/bookings/:id` | JWT | Get booking detail |
| PATCH | `/bookings/:id/status` | Admin | Update booking status |
| POST | `/bookings/:id/cancel` | JWT | Cancel booking |

### Payments (`/payments`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/payments/create-order` | JWT | Create payment order `{ bookingId, gateway, method? }` |
| POST | `/payments/verify` | No | Verify payment `{ gateway, orderId, paymentId, signature, ... }` |
| POST | `/payments/webhook/razorpay` | No | Razorpay webhook handler |
| POST | `/payments/webhook/payu` | No | PayU webhook handler |
| GET | `/payments/:bookingId` | JWT | Get payment status |

### Flights (`/flights`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/flights/search` | No | Search flights `{ origin, destination, departureDate, adults, ... }` |
| GET | `/flights/offers/:offerId` | JWT | Get flight offer details |
| POST | `/flights/book` | JWT | Book a flight |
| GET | `/flights/bookings` | Admin | List flight bookings |

### Buses (`/buses`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/buses/search` | No | Search buses `{ source, destination, date }` |
| GET | `/buses/seats/:tripId` | No | Get seat layout |
| POST | `/buses/book` | JWT | Book bus ticket |
| GET | `/buses/bookings` | Admin | List bus bookings |

### Reviews (`/reviews`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/reviews` | JWT | Create review |
| GET | `/reviews/:targetType/:targetId` | No | Get reviews for hotel/package |
| DELETE | `/reviews/:id` | JWT/Admin | Delete review |

### Users (`/users`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users` | Admin | List all users |
| GET | `/users/:id` | Admin | Get user details |
| PATCH | `/users/:id/role` | Super Admin | Update user role |

---

## 16. Implementation Status & Remaining Work

### What's Built (Code Exists)

| Area | Status | Notes |
|------|--------|-------|
| Monorepo setup | Done | turbo.json, pnpm-workspace, root configs |
| Package configs | Done | tsconfig, eslint-config |
| Prisma schema | Done | Full schema with all models |
| Mongoose models | Done | ActivityLog, Review, SearchCache, Analytics |
| Shared types | Done | All TypeScript interfaces |
| Shared config | Done | Brand colors, constants, categories |
| Shared UI components | Done | 12 components (Button, Input, Card, Modal, Table, etc.) |
| API server setup | Done | Express app, env validation, middleware stack |
| API auth service | Done | Google OAuth + JWT |
| API hotel service | Done | Full CRUD + rooms |
| API package service | Done | Full CRUD + featured |
| API booking service | Done | Create, list, cancel, status update |
| API payment service | Done | Razorpay + PayU providers, factory pattern |
| API flight service | Done | Amadeus integration + caching |
| API bus service | Done | Redbus integration + caching |
| API routes | Done | All routes wired up |
| API validators | Done | Zod schemas for all endpoints |
| API controllers | Done | All controller handlers |
| Customer auth config | Done | NextAuth + Google OAuth |
| Admin auth config | Done | NextAuth + PrismaAdapter + admin gate |
| Customer pages | Done | All page files exist |
| Admin pages | Done | All page files exist |
| Customer layout | Done | Header, Footer components |
| Admin layout | Done | Sidebar, Header components |
| Docker setup | Done | Dockerfiles + docker-compose.yml |

### What Needs Manual Configuration / Testing

| Task | Priority | Details |
|------|----------|--------|
| Create Google Cloud OAuth credentials | High | Required for login to work |
| Create Razorpay test account | High | Required for payments |
| Set up PostgreSQL database | High | Run `pnpm db:migrate` |
| Install MongoDB | Medium | Optional - app warns but runs without it |
| Create Amadeus dev account | Medium | Required for flight search |
| Get Redbus API access | Low | Contact Redbus for API key |
| Create PayU test account | Low | Alternative payment gateway |
| Set up admin user in DB | High | Manual SQL update to set role=ADMIN |
| Seed database with sample data | Medium | Create `prisma/seed.ts` if it doesn't exist |
| Configure SMTP for email | Low | For booking confirmation emails |

### What May Need Further Development / Review

| Area | Status | Details |
|------|--------|--------|
| Customer page UI completeness | Review | Pages exist but verify all components render correctly with real data |
| Admin page UI completeness | Review | Verify all CRUD forms work end-to-end |
| Payment frontend integration | Review | Razorpay checkout.js popup + PayU form POST need frontend wiring |
| Responsive design | Review | Test mobile/tablet breakpoints |
| Error boundaries | May need | Next.js error.tsx files for graceful error handling |
| Loading states | Review | Verify loading.tsx / Suspense boundaries exist |
| SEO metadata | May need | `metadata` exports in page.tsx files |
| Image upload | May need | Multer configured in API but upload endpoints may need wiring |
| Email notifications | Not built | SMTP config exists but no email service/templates |
| Prisma seed script | May need | `prisma/seed.ts` may need sample data |
| Rate limiting tuning | Review | Current: 100/15min general, 20/15min auth |
| CORS in production | Review | Update allowed origins for production domains |

---

## 17. Docker Deployment

### 17.1 docker-compose.yml

The project includes a `docker-compose.yml` at the root for containerized deployment:

```bash
# Start all services (API + Customer + Admin + Postgres + MongoDB)
docker-compose up -d

# Start only databases
docker-compose up -d postgres mongo

# View logs
docker-compose logs -f api

# Stop all services
docker-compose down
```

### 17.2 Individual Dockerfiles

Each app (`apps/api`, `apps/customer`, `apps/admin`) has its own `Dockerfile` for independent builds.

---

## 18. Troubleshooting

### Common Issues

**`prisma generate` fails**
```bash
# Make sure you're in the right directory and DATABASE_URL is set
cd packages/database
npx prisma generate
```

**`pnpm install` fails with workspace resolution errors**
```bash
# Clear pnpm store and retry
pnpm store prune
rm -rf node_modules
pnpm install
```

**API server won't start - "Invalid environment variables"**
- Check `apps/api/.env` exists with at least `DATABASE_URL` and `JWT_SECRET` (16+ chars)
- Env validation is strict - see `apps/api/src/config/env.ts` for required vars

**NextAuth "NEXTAUTH_SECRET missing" error**
- Set `NEXTAUTH_SECRET` in both `apps/customer/.env.local` and `apps/admin/.env.local`
- Must be at least 32 characters: `openssl rand -base64 32`

**Google OAuth redirect error**
- Ensure redirect URIs in Google Cloud Console match exactly:
  - `http://localhost:3000/api/auth/callback/google`
  - `http://localhost:3001/api/auth/callback/google`

**Admin login rejected**
- Only users with `ADMIN` or `SUPER_ADMIN` role can access the admin panel
- First sign in via the customer app, then update role in DB:
  ```sql
  UPDATE "User" SET role = 'ADMIN' WHERE email = 'your@email.com';
  ```

**MongoDB connection warning**
- This is non-fatal. The API runs without MongoDB, but flight/bus caching and reviews won't work.
- Install MongoDB or use Docker: `docker run -d -p 27017:27017 mongo:7`

**Tailwind styles not applying**
- Ensure `packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}` is in the app's `tailwind.config.ts` content array (already configured)
- Run `pnpm dev` from root so Turbo watches all packages

**Port conflicts**
- Customer: 3000, Admin: 3001, API: 4000, PostgreSQL: 5432, MongoDB: 27017
- Change ports in respective configs if conflicts exist

---

*Documentation generated for KaNa Travels and Holidays monorepo. For questions, refer to the source code or raise an issue.*
