# 🎓 Attendly

> **Next-Generation Academic Attendance Management & Visual Analytics Platform**  
> *Engineered to transform daily roll calls into an intuitive, high-speed swipe experience while providing students, educators, and administrators with real-time actionable analytics.*

---

## 🌟 Highlights

- **⚡ Fluid 3D Swipe Deck:** Touch-driven, physics-backed card gestures (Swipe Right = Present, Swipe Left = Absent) with ambient glow indicators, transition locking, and instant Undo.
- **📈 Advanced Educational Analytics:** Interactive Recharts visualizers for session velocity curves, section-by-section comparative volume, weekday slump patterns, and cohort risk triage.
- **🎯 Student Target Projection Calculator:** Live mathematical calculator ($\lceil \frac{R \cdot T - P}{1 - R} \rceil$) projecting consecutive classes needed to hit 75% or 85% attendance targets.
- **🛡️ Strict Data Integrity:** Unmarked cards are never registered as absent. Sessions are committed transactionally only upon deliberate teacher review.
- **📁 Resilient Multi-Format Roster Ingestion:** Drag-and-drop CSV and Excel (.xlsx) roster parser with column header auto-detection, duplicate SRN deduplication, and row-level error reporting.
- **📄 Audit-Ready Institutional Exports:** One-click PDF attendance registers and formula-injection-sanitized CSV gradebook downloads.
- **🔒 Multi-Tenant Institutional Boundary Isolation:** Complete row-level isolation via Supabase PostgreSQL Row Level Security (RLS) policies.

---

## 🧭 System Architecture & Portals

Attendly provides tailored workspaces engineered for each campus stakeholder:

```
                               ┌──────────────────────────┐
                               │   Attendly Platform      │
                               └─────────────┬────────────┘
                                             │
             ┌───────────────────────────────┼──────────────────────────────┐
             ▼                               ▼                              ▼
    ┌─────────────────┐             ┌─────────────────┐            ┌─────────────────┐
    │  Admin Portal   │             │ Teacher Portal  │            │ Student Portal  │
    │  (/admin)       │             │ (/teacher)      │            │ (/student)      │
    ├─────────────────┤             ├─────────────────┤            ├─────────────────┤
    │ • Department/   │             │ • 3D Swipe Deck │            │ • Course Cards  │
    │   Section Setup │             │ • Roster Toggle │            │ • Target Calc   │
    │ • Roster Import │             │ • Velocity Curve│            │ • 6-Wk Velocity │
    │ • Cohort Triage │             │ • Section Comps │            │ • Absence Log   │
    │ • Audit Exports │             │ • Weekday Slump │            │ • Transcript PDF│
    └─────────────────┘             └─────────────────┘            └─────────────────┘
```

### 1. 🧑‍🏫 Teacher Workspace (`/teacher`)
- **Interactive Stack Deck:** Rapid card swipe mode with keyboard arrow support (`← Absent`, `→ Present`, `Backspace Undo`).
- **Roster Checklist Fallback:** One-click toggle between 3D swipe deck and high-density tabular checklist.
- **Velocity & Dropoff Visuals:**
  - **Session Velocity:** Smooth spline curve tracking session attendance rates over time against the 85% requirement baseline.
  - **Section Volume Comparison:** Grouped bar chart comparing present vs. absent headcounts across assigned courses.
  - **Cohort Risk Triage:** Donut visual categorizing students into Safe ($\ge 85\%$), Watchlist ($75\%-84\%$), and Critical ($<75\%$) tiers.
  - **Weekday Slump Diagnostic:** Highlights attendance drops on specific days (e.g. Friday afternoon dropoffs).

### 2. 👨‍🎓 Student Portal (`/student`)
- **Status Dashboard:** Course-wise percentage cards with dynamic warning badges for at-risk courses ($<75\%$).
- **Course Standing Visualizer:** Bar chart comparing attendance in every course against institutional 75% and 85% thresholds.
- **6-Week Recovery Velocity:** Tracks week-over-week attendance velocity to encourage upward academic momentum.
- **Consecutive Class Target Calculator:** Computes exact consecutive classes required to reach custom target percentages (60% to 95%).
- **Personal Transcript Export:** Downloadable PDF report with official verification metadata.

### 3. 🏛️ Administrator Hub (`/admin`)
- **Institutional Health Dashboard:** Real-time metrics for campus enrollment, faculty assignments, and today's aggregate attendance.
- **Bulk Roster Importer:** Drag-and-drop CSV/Excel parser with schema validation, preview grids, and conflict warnings.
- **Audit Analytics & Reporting:** Cohort filtering by threshold (75%, 80%, 85%) with instant PDF/CSV export generation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Server Components by default) |
| **Language** | TypeScript (Strict mode enabled) |
| **Styling** | Tailwind CSS v4 + Lucide Icons |
| **Data Visualization** | Recharts (ResponsiveContainer, AreaChart, BarChart, PieChart) |
| **Database & Auth** | Supabase PostgreSQL with Row Level Security (RLS) |
| **Validation** | Zod + React Hook Form |
| **File Processing** | PapaParse (CSV) + SheetJS (XLSX) |
| **Report Generation** | jsPDF + jsPDF-AutoTable |
| **Testing** | Node.js Native Test Runner (`node --test`) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or later (recommended Node 20+)
- **npm** 9+ or **pnpm** / **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/AkShAdIt/attendly.git
cd attendly
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the required environment variables:
```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-for-admin-only"
NEXT_PUBLIC_APP_URL="http://localhost:3001"
NEXT_PUBLIC_DEFAULT_TARGET_ATTENDANCE="85"
```

### 4. Database Setup
Execute the initial schema migration script in your Supabase SQL Editor:
```bash
# Migration script located at:
supabase/migrations/001_initial_schema.sql
```

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🧪 Testing & Quality Gates

Run the automated test suite covering attendance calculation mathematics, boundary cases, and CSV injection sanitization:
```bash
# Run unit tests
npm test

# Run strict TypeScript compilation check
npm run typecheck

# Build production bundle
npm run build
```

---

## 📊 Core Calculation Formulas

### 1. Attendance Percentage
$$\text{Attendance Rate} = \begin{cases} 
\text{null} & \text{if } \text{Total Held} = 0 \\
\frac{\text{Present Count}}{\text{Total Held}} \times 100 & \text{if } \text{Total Held} > 0 
\end{cases}$$

### 2. Consecutive Classes Needed for Target $R$
$$\text{Classes Required} = \left\lceil \frac{R \cdot T - P}{1 - R} \right\rceil$$
*Where $R$ is target rate (e.g., $0.85$), $T$ is total classes held, and $P$ is present classes.*

---

## 🔒 Security & Data Integrity

- **Row Level Security (RLS):** Institutional and role boundary separation prevents students from viewing peer records or cross-tenant leakage.
- **CSV Formula Injection Sanitization:** Spreadsheet cells starting with `=`, `+`, `-`, or `@` are safely prefixed with single quotes `'` during export.
- **Atomic Commits:** Session submissions execute with database-level uniqueness constraints preventing duplicate sessions or student attendance marks.

---

## 📄 License
MIT License. Created by [AkShAdIt](https://github.com/AkShAdIt).
