# Attendly — Architecture & Technical Design

## 1. High-Level Architecture

Attendly is designed as a unified, single-repository full-stack Next.js application utilizing the App Router and Supabase PostgreSQL.

```
┌─────────────────────────────────────────────────────────────┐
│                      Next.js 14+ App                        │
│                                                             │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │    Server Actions     │       │    Server Components  │  │
│  │  (Auth, Mutations,    │       │   (Secure Data Fetch, │  │
│  │   Validation, Audit)  │       │    Role Layouts)      │  │
│  └───────────┬───────────┘       └───────────┬───────────┘  │
│              │                               │              │
│  ┌───────────▼───────────────────────────────▼───────────┐  │
│  │           Supabase Server Client (@supabase/ssr)       │  │
│  │              (Cookie-based session & auth)            │  │
│  └───────────────────────────┬───────────────────────────┘  │
└──────────────────────────────┼──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Supabase PostgreSQL 15+                     │
│  - Row Level Security (RLS) on all tables                   │
│  - Multi-tenant isolation by institution_id                 │
│  - Atomic attendance submissions & audit triggers           │
└─────────────────────────────────────────────────────────────┘
```

## 2. Directory Structure

```
src/
├── app/
│   ├── (auth)/             # Login, register, auth callback
│   ├── (dashboard)/        # Role-based protected portals
│   │   ├── admin/          # Administrator portal
│   │   ├── teacher/        # Teacher dashboard & swipe session
│   │   └── student/        # Student dashboard & calculator
│   ├── api/                # Webhooks and export handlers
│   ├── globals.css         # Tailwind tokens & base styles
│   ├── layout.tsx          # Root HTML & toast provider
│   └── page.tsx            # Public product landing page
├── components/
│   ├── ui/                 # Atomic UI (Button, Card, Modal, etc.)
│   ├── layout/             # Topbar, MobileBottomNav, Sidebar
│   ├── attendance/         # SwipeCard, QuickRoster, ReviewModal
│   └── import/             # CSV/XLSX uploader and mapper
├── lib/
│   ├── supabase/           # Server, Client, Middleware Supabase SDK
│   ├── env.ts              # Zod environment variable validator
│   ├── utils.ts            # Class name merger & formatters
│   ├── attendance.ts       # Attendance calculations & formulas
│   └── export.ts           # CSV/PDF sanitizers & formatters
└── types/
    └── database.ts         # Supabase TypeScript schema definitions
```

## 3. Key Design Decisions

1. **No External Background Workers:** Everything runs synchronously and deterministically on user interaction. Attendance submission commits in a single PostgreSQL transaction.
2. **Server-Side Validation:** All mutations are validated via Zod schemas in Next.js Server Actions with role verification before contacting Supabase.
3. **Cookie-Based Auth:** Session tokens are stored in secure, HTTP-only cookies managed via `@supabase/ssr`, preventing token theft via XSS.
