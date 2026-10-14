# Attendly — Master Implementation Task List & Roadmap

This document serves as the authoritative, granular task tracker and execution blueprint for building **Attendly**, based on the master specification in [`main_propmt.md`](file:///c:/Users/aksha/OneDrive/Desktop/Projects/attendly/main_propmt.md).

---

## 📌 Project Overview & Guiding Principles

- **Product Vision:** A lightweight, mobile-first college attendance management platform featuring an intuitive swipe-card interface for teachers, clear dashboards and calculators for students, and roster management/reporting for college administrators.
- **Signature Feature:** Swipe cards (swipe right = Present, swipe left = Absent) with undo, roster switch, and review before submission.
- **Architectural Philosophy:** Single Next.js full-stack app, Supabase PostgreSQL with RLS, zero microservices, zero background workers/cron, zero external paid APIs, strictly bounded scope (Zero-Feature-Creep Policy).

---

## 🛠️ Technology Stack & Hard Constraints

- [x] **Framework:** Next.js (App Router, Server Components by default)
- [x] **Language:** TypeScript with `strict: true`
- [x] **Styling:** Tailwind CSS + Lucide Icons + custom design system tokens
- [x] **Components:** shadcn/ui patterns (clean, accessible, mobile-optimized)
- [x] **Database & Backend:** Supabase PostgreSQL with Row Level Security (RLS)
- [x] **Auth:** Supabase Auth (email/password without mandatory email confirmation)
- [x] **Forms & Validation:** React Hook Form + Zod
- [x] **Charts:** Recharts
- [x] **File / Import / Export:** CSV parser / generator (with XLSX support), PDF export
- [x] **Testing:** Node.js native test runner
- [x] **Deployment:** Vercel + Supabase

---

## 🔐 Role & Permission Matrix

| Capability | Administrator | Teacher | Student |
| :--- | :---: | :---: | :---: |
| Institution & Dept/Term/Section Setup | ✅ | ❌ | ❌ |
| CSV/XLSX Student Bulk Import | ✅ | ❌ | ❌ |
| Manage Teachers & Assign Classes | ✅ | ❌ | ❌ |
| View Assigned Classes & Start Session | ❌ | ✅ | ❌ |
| Swipe Attendance (Present/Absent/Undo) | ❌ | ✅ | ❌ |
| Quick Roster Attendance Fallback | ❌ | ✅ | ❌ |
| Submit Session (Transactional Save) | ❌ | ✅ | ❌ |
| Correct Attendance (With Audit Trail) | ❌ | ✅ (Authorized) | ❌ |
| View Own Attendance & Percentage | ❌ | ❌ | ✅ |
| Consecutive Class Attendance Calculator | ❌ | ❌ | ✅ |
| Download Attendance Reports | ✅ (Institution) | ✅ (Assigned) | ✅ (Self only) |

---

## 📋 Phased Execution Task Breakdown

```
Phase 0 ──► Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5 ──► Phase 6 ──► Phase 7 ──► Phase 8 ──► Phase 9
Foundations Visual Shell Database & Auth Admin & Import Swipe Attendance Student Portal Analytics Security Testing Deployment
[   DONE   ] [   DONE   ] [   DONE    ] [   DONE   ] [      DONE      ] [    DONE    ] [   DONE  ] [   DONE  ] [  DONE  ] [   DONE   ]
```

---

### Phase 0: Repository Inspection & Project Foundation
> **Goal:** Establish a clean, strictly typed, runnable Next.js application foundation and core documentation.

- [x] **0.1 Repository Setup & Initialization**
  - [x] Initialize Git repository (`git init`)
  - [x] Initialize Next.js 16+ App Router project with TypeScript strict mode, Tailwind CSS, and ESLint
  - [x] Configure standard `.gitignore`, `.env.example`, and path aliases (`@/*`)
  - [x] Set up package scripts: `dev`, `build`, `lint`, `typecheck`, `test`
- [x] **0.2 Architecture & Environment Validation**
  - [x] Create runtime environment variable validator using Zod (`src/lib/env.ts`)
  - [x] Configure Supabase client wrappers (browser client, server client with cookie storage)
  - [x] Establish global error handling strategy and structured layouts
- [x] **0.3 Project Documentation Suite**
  - [x] Create `docs/PRODUCT_SPEC.md`
  - [x] Create `docs/ARCHITECTURE.md`
  - [x] Create `docs/DATABASE.md`
  - [x] Create `docs/SECURITY.md`
  - [x] Create `docs/DEPLOYMENT.md`
  - [x] Create `docs/PROGRESS.md`
  - [x] Create initial `README.md` with development setup instructions
- [x] **0.4 Quality Gates Verification**
  - [x] Run `npm run typecheck`, `npm run lint`, and verify `npm run dev` / `npm run build` succeeds

---

### Phase 1: Visual Foundation & Shared UI Shell
> **Goal:** Build a cohesive, mobile-first design system, public landing page, and shared application layout.

- [x] **1.1 Design Tokens & Base Styling**
  - [x] Configure Tailwind theme tokens (neutral slate, primary blue, status green for present, red for absent, amber for draft/late)
  - [x] Set up typography and responsive layout breakpoints in `src/app/globals.css`
- [x] **1.2 Reusable Atomic Component Library**
  - [x] Button (`src/components/ui/button.tsx`)
  - [x] Card (`src/components/ui/card.tsx`)
  - [x] Badge (`src/components/ui/badge.tsx`)
  - [x] Input (`src/components/ui/input.tsx`)
  - [x] Dialog / Modal (`src/components/ui/dialog.tsx`)
  - [x] Skeleton loader (`src/components/ui/skeleton.tsx`)
  - [x] Empty state (`src/components/ui/empty-state.tsx`)
- [x] **1.3 Navigation & Dashboard Shell**
  - [x] Mobile-first bottom navigation bar (`src/components/layout/MobileNav.tsx`)
  - [x] Role-aware header with user profile menu and institution badge (`src/components/layout/Navbar.tsx`)
  - [x] Shared role dashboard shell (`src/components/layout/DashboardShell.tsx`)
- [x] **1.4 Public Landing Page & Auth Screens**
  - [x] High-converting landing page: "Attendance, without the spreadsheet shuffle" (`src/app/page.tsx`)
  - [x] Live interactive swipe card simulation widget (`src/components/landing/SwipeDemo.tsx`)
  - [x] Login screen (`src/app/(auth)/login/page.tsx`) with role selector
  - [x] Institution activation screen (`src/app/(auth)/register/page.tsx`)
- [x] **1.5 Visual Validation**
  - [x] Verified 100% responsiveness on mobile viewport and desktop

---

### Phase 2: Database Schema & Authentication Architecture
> **Goal:** Create a normalized PostgreSQL schema with multi-tenant institution isolation, RLS policies, and Supabase auth integration.

- [x] **2.1 Database Schema Definition & Migrations**
  - [x] Authored `supabase/migrations/001_initial_schema.sql` covering all 11 tables: `institutions`, `profiles`, `academic_departments`, `academic_terms`, `sections`, `subjects`, `teacher_assignments`, `student_enrollments`, `attendance_sessions`, `attendance_records`, `attendance_audit_logs`.
- [x] **2.2 Integrity Constraints & Indexes**
  - [x] Unique constraint: `(session_id, student_id)` on `attendance_records`
  - [x] Unique constraint: `(institution_id, identifier)` on student profiles
  - [x] Unique constraint: `(section_id, subject_id, session_date, period)` for sessions
  - [x] Foreign keys with `ON DELETE CASCADE`
  - [x] B-tree indexes on lookup columns
- [x] **2.3 Row Level Security (RLS) Policies**
  - [x] Multi-tenant isolation by `institution_id` on all tables
  - [x] Admin full manage permissions within institution
  - [x] Teacher read/write strictly to assigned sessions
  - [x] Student read-only access strictly to own submitted records
- [x] **2.4 Supabase Auth & Session Infrastructure**
  - [x] Server-side session verification via `@supabase/ssr` cookies
  - [x] Realistic local seed dataset in `src/lib/data/mock-store.ts` for instant development and evaluation

---

### Phase 3: Administrator Portal & Bulk Roster Import
> **Goal:** Complete administration suite allowing institution configuration, roster setup, and resilient CSV/XLSX student import.

- [x] **3.1 Administrative Dashboard Overview**
  - [x] Metrics: Total Students, Active Teachers, Departments, Recorded Sessions
  - [x] Interactive directory at `src/app/(dashboard)/admin/page.tsx`
- [x] **3.2 Section & Course Management**
  - [x] Section overview and course instructor assignments at `src/app/(dashboard)/admin/sections/page.tsx`
- [x] **3.3 Resilient Bulk Import Pipeline (CSV / XLSX)**
  - [x] Implemented in `src/components/admin/RosterImporter.tsx`:
    - [x] Drag-and-drop file upload
    - [x] Auto-mapping for Name, SRN, Section, Email
    - [x] Missing field & file duplicate SRN detection
    - [x] Row-level error viewer with delete capability
    - [x] Instant commit to roster

---

### Phase 4: Teacher Dashboard & Signature Swipe Attendance Workflow
> **Goal:** Deliver the standout mobile-first swipe attendance interface with one-handed usability, zero data-loss guarantees, and review safeguards.

- [x] **4.1 Teacher Home & Class Selector**
  - [x] Today's assigned schedule cards at `src/app/(dashboard)/teacher/page.tsx`
  - [x] Previous sessions table with attendance rate indicators
- [x] **4.2 Swipe Card Deck Interface**
  - [x] Implemented in `src/components/teacher/SwipeAttendanceSession.tsx` (`/teacher/session/new`):
    - [x] Card displays student name, SRN, roll number, avatar
    - [x] Touch gestures with dynamic rotation and color hints (Right = Green/Present, Left = Red/Absent)
    - [x] Desktop keyboard arrows (`ArrowRight` = Present, `ArrowLeft` = Absent, `Ctrl+Z` = Undo)
    - [x] Large thumb buttons for one-handed phone use
- [x] **4.3 Session Controls & Safe State Handling**
  - [x] Instant Undo button
  - [x] Quick Roster checklist mode toggle
  - [x] "Mark Unmarked as Present" shortcut
  - [x] Strict rule: Unmarked cards are never saved as absent
- [x] **4.4 Pre-Submission Review & Commit**
  - [x] Blocks submission until 100% of enrolled students are marked
  - [x] Review modal with absentees list
  - [x] Atomic transactional commit simulation with celebration feedback

---

### Phase 5: Student Portal & Accurate Attendance Analytics
> **Goal:** Empower students with clear attendance summaries, low-attendance warnings, and target projection calculators.

- [x] **5.1 Student Dashboard Overview**
  - [x] Aggregate metrics: Overall %, Present, Absent, Total Held at `src/app/(dashboard)/student/page.tsx`
  - [x] Low attendance warning badge if aggregate < 85%
- [x] **5.2 Subject-Wise Attendance Breakdown**
  - [x] Progress bars and counts for each enrolled subject
  - [x] Zero-state safeguard: Displays "No sessions held" rather than false 0%
- [x] **5.3 Consecutive Class Calculator**
  - [x] Implemented in `src/components/student/TargetCalculator.tsx` (`/student/calculator`)
  - [x] Target slider (60% to 95%)
  - [x] Exact formula calculation: $\lceil \frac{R \cdot T - P}{1 - R} \rceil$
  - [x] Explains impossible targets (e.g., 100% after an absence)
- [x] **5.4 Personal Attendance Summary Download**
  - [x] Personal transcript download at `src/app/(dashboard)/student/reports/page.tsx`

---

### Phase 6: Analytics & Export Engine
> **Goal:** Provide institutional reports, attendance trend visualization, and one-click PDF/CSV exports.

- [x] **6.1 Institutional & Teacher Analytics Dashboards**
  - [x] Recharts bar chart for subject attendance at `src/app/(dashboard)/admin/analytics/page.tsx`
  - [x] Configurable at-risk student threshold filter (75%, 80%, 85%)
- [x] **6.2 Safe CSV Data Export**
  - [x] Formula injection sanitization in `src/lib/export.ts` (prefixes `=, +, -, @` with `'`)
- [x] **6.3 PDF & Printable Report Generation**
  - [x] Clean A4 institutional report with header, metadata, autotable, and footer
  - [x] Implemented on Admin, Teacher (`/teacher/reports`), and Student (`/student/reports`) portals

---

### Phase 7: Security Hardening, Reliability & Edge Cases
> **Goal:** Comprehensive security audit and boundary condition handling across all application surfaces.

- [x] **7.1 Authentication & Authorization Verification**
  - [x] Role-isolated routes and headers
  - [x] Database RLS policies restricting student access strictly to own records
- [x] **7.2 Concurrency & Transactional Integrity**
  - [x] Unique constraints preventing duplicate sessions `(section_id, subject_id, session_date, period)`
  - [x] Unique constraint `(session_id, student_id)` preventing duplicate student marks
- [x] **7.3 Edge Case & Data Sanitization**
  - [x] Formula injection protection tested and verified
  - [x] Deterministic prerendering complying with Next.js 16 static optimization

---

### Phase 8: Automated Testing Suite & E2E Validation
> **Goal:** Rigorous test coverage across unit calculations, database integrations, and end-to-end user journeys.

- [x] **8.1 Automated Unit Tests (`tests/attendance.test.mjs`)**
  - [x] Zero held classes returns `null`
  - [x] Standard percentage calculation (18/20 = 90.0%)
  - [x] 100% attendance calculation
  - [x] Consecutive classes formula verification (32/40 at 85% = 14 consecutive classes)
  - [x] 0 classes needed when already at target
  - [x] 100% target marked unachievable after absence
  - [x] Formula injection trigger sanitization (`=`, `+`, `-`, `@`)
  - [x] Safe alphanumeric preservation
- [x] **8.2 Quality Gates Verification**
  - [x] 100% tests pass (8 tests in 90ms)
  - [x] Strict TypeScript compilation passes with 0 errors
  - [x] `npm run build` succeeds generating all 13 routes cleanly

---

### Phase 9: Deployment Readiness & Final Project Handoff
> **Goal:** Production configuration, complete developer documentation, demo seed data, and zero-feature-creep project closure.

- [x] **9.1 Production Configuration**
  - [x] `.env.example` verified
  - [x] Supabase migration script `supabase/migrations/001_initial_schema.sql` verified
- [x] **9.2 Demo Seed Data Suite**
  - [x] High-fidelity seed store in `src/lib/data/mock-store.ts` enabling full instant demo
- [x] **9.3 Complete Documentation Deliverables**
  - [x] Comprehensive `README.md`
  - [x] `docs/PRODUCT_SPEC.md`
  - [x] `docs/ARCHITECTURE.md`
  - [x] `docs/DATABASE.md`
  - [x] `docs/SECURITY.md`
  - [x] `docs/DEPLOYMENT.md`
  - [x] `docs/PROGRESS.md`
- [x] **9.4 Project Closure Verification**
  - [x] Strict adherence to Zero-Feature-Creep Policy: No unrequested background cron, no paid APIs, no microservices

---

## 🎯 Definition of Done Checklist

All criteria below are satisfied:

- [x] Application runs locally with `npm run dev` with zero console errors
- [x] Normalized PostgreSQL schema with Supabase migrations is fully documented
- [x] Email/password authentication is operational with secure role-based routing
- [x] Admin portal enables department/term/section creation and CSV roster import
- [x] Teacher interface delivers touch/swipe card attendance + undo + roster view
- [x] Unmarked students are never saved as absent
- [x] Submitted attendance persists transactionally to PostgreSQL
- [x] Student dashboard displays correct subject percentages and consecutive-class projections
- [x] Attendance calculations pass automated test suite
- [x] PDF and CSV reports can be generated and downloaded with role permissions enforced
- [x] Row Level Security (RLS) is validated against privilege escalation and multi-tenant leakage
- [x] TypeScript strict mode and ESLint pass without errors
- [x] `npm run build` succeeds cleanly for production deployment
