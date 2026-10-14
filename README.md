# Attendly

**Attendly** is a college attendance management platform engineered around one core principle:
**Make classroom attendance as fast and intuitive as swiping through cards, while providing teachers, students, and administrators with reliable records and reports.**

---

## 🚀 Key Features

- **📱 Mobile-First Swipe Attendance:** Touch-based swipe cards for teachers (Swipe Right = Present, Swipe Left = Absent) with instant Undo and rapid Roster view fallback.
- **🛡️ Strict Attendance Data Rules:** Unmarked cards are never saved as absent. Attendance is committed transactionally only upon teacher confirmation.
- **📊 Real-Time Student Analytics:** Visual breakdown by course, zero-state safeguards ("No sessions held" vs false 0%), and a mathematical **Consecutive Class Target Calculator**.
- **📁 Resilient Bulk Roster Import:** CSV and Excel (.xlsx) roster ingestion with drag-and-drop, column header auto-detection, row-level validation, and duplicate SRN detection.
- **📄 Institutional Reports:** One-click generation of official PDF attendance registers and sanitized CSV exports (protected against CSV formula injection).
- **🔒 Multi-Tenant Security:** Institutional boundary isolation enforced by Supabase PostgreSQL Row Level Security (RLS) policies.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router, Server Components by default)
- **Language:** TypeScript (Strict mode enabled)
- **Styling:** Tailwind CSS + Lucide Icons
- **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS)
- **Validation:** Zod + React Hook Form
- **Spreadsheets:** PapaParse (CSV) + SheetJS (XLSX)
- **Visuals:** Recharts
- **PDF Generation:** jsPDF + jsPDF-AutoTable
- **Testing:** Node.js native test runner

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node 20 & 24)
- npm 9+

### 2. Installation
```bash
git clone <repository-url>
cd attendly
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Configure your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-for-admin-only"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
NEXT_PUBLIC_DEFAULT_TARGET_ATTENDANCE="85"
```

### 4. Database Setup
Apply the PostgreSQL migration script in Supabase SQL editor or via Supabase CLI:
```bash
# Migration file located at:
supabase/migrations/001_initial_schema.sql
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) to view the application.

---

## 🧪 Verification & Testing

Run the automated test suite:
```bash
npm run test
```

Run TypeScript strict checks:
```bash
npm run typecheck
```

Build for production:
```bash
npm run build
```

---

## 📂 Project Structure

```
attendly/
├── docs/                     # Product, Architecture, DB, Security & Progress docs
│   ├── PRODUCT_SPEC.md
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── SECURITY.md
│   ├── DEPLOYMENT.md
│   └── PROGRESS.md
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (auth)/           # /login and /register
│   │   ├── (dashboard)/
│   │   │   ├── admin/        # Administrator portal & analytics
│   │   │   ├── teacher/      # Teacher dashboard & swipe session
│   │   │   └── student/      # Student portal & target calculator
│   │   ├── globals.css       # Tailwind tokens and swipe card transitions
│   │   └── page.tsx          # Public marketing page with interactive demo
│   ├── components/
│   │   ├── admin/            # Bulk Roster CSV/XLSX Importer
│   │   ├── attendance/       # Swipe attendance deck & modal
│   │   ├── layout/           # Navbar, MobileNav, DashboardShell
│   │   ├── student/          # Target calculator widget
│   │   └── ui/               # Reusable Button, Card, Badge, Dialog, etc.
│   ├── lib/
│   │   ├── attendance.ts     # Attendance calculation mathematics
│   │   ├── env.ts            # Runtime environment validation
│   │   ├── export.ts         # CSV & PDF generation and sanitization
│   │   ├── utils.ts          # Utility classes & formatters
│   │   └── data/             # Realistic college seed store for instant demo
│   └── types/                # Database and application types
├── supabase/
│   └── migrations/           # 001_initial_schema.sql (PostgreSQL + RLS)
├── tests/                    # Automated unit tests
├── TASKS.md                  # Comprehensive phased task checklist
└── README.md
```

---

## 🔒 Security & Zero Feature Creep Policy
This application strictly adheres to the Attendly zero-feature-creep policy: deterministic, synchronous database operations; no bloated microservices; no background cron workers; no third-party OAuth tracking; and full client sanitization against CSV formula injection.
