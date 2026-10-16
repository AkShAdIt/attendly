import Link from "next/link";
import {
  CheckCheck,
  Smartphone,
  Calculator,
  UploadCloud,
  FileSpreadsheet,
  ArrowRight,
  Users,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SwipeDemo } from "@/components/landing/SwipeDemo";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f8fafc] text-[#0f172a]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Two-line confident headline & direct proposition */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Take full attendance in sixty seconds.
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
                Swipe cards for teachers, real-time credit calculations for students, and centralized roster control for college administrators.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0f172a] px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition-colors"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/login?role=teacher"
                  className="inline-flex items-center justify-center rounded-2xl bg-white border border-slate-300 px-6 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Open Teacher Portal
                </Link>
              </div>
            </div>

            {/* Right Column: Signature 3D Swipe Deck Arena */}
            <div className="lg:col-span-5 flex flex-col items-center" data-ui="swipe-deck">
              <div className="w-full">
                <SwipeDemo />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stepped Figure Tiles Section (Art Direction Blueprint 4) */}
      <section className="py-16 bg-[#f1f5f9]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Built for classroom speed.
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-xl">
              Engineered so instructors finish attendance before the lecture even begins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Tall Main Tile */}
            <div className="md:col-span-6 rounded-3xl bg-[#0f172a] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[260px]">
              <div className="text-5xl sm:text-7xl font-extrabold tracking-tight">
                60s
              </div>
              <div className="mt-8">
                <div className="text-base font-bold">Average Session Duration</div>
                <div className="text-sm text-slate-400 mt-1">
                  Complete a roster of 60 students with one thumb on mobile.
                </div>
              </div>
            </div>

            {/* Stepped Secondary Tile 1 */}
            <div className="md:col-span-3 rounded-3xl bg-emerald-600 text-white p-7 flex flex-col justify-between min-h-[220px]">
              <div className="text-4xl sm:text-5xl font-extrabold">
                100%
              </div>
              <div className="mt-6">
                <div className="text-sm font-bold">Transactional Save</div>
                <div className="text-xs text-emerald-100 mt-1">
                  Drafts separate from submitted attendance. Zero silent absences.
                </div>
              </div>
            </div>

            {/* Stepped Secondary Tile 2 */}
            <div className="md:col-span-3 rounded-3xl bg-white p-7 border border-slate-200/80 text-slate-900 flex flex-col justify-between min-h-[190px]">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600">
                0
              </div>
              <div className="mt-6">
                <div className="text-sm font-bold">Manual Spreadsheets</div>
                <div className="text-xs text-slate-500 mt-1">
                  No copy-pasting across Excel sheets or lost paper registers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Breakdown */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Four tools in one unified application.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-slate-50 p-8 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 mb-6">
                  <Smartphone className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Touch Gesture Deck
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Swipe right for Present, left for Absent. Instant undo, quick roster list view fallback, and pre-submission absentee verification.
                </p>
              </div>
              <div className="mt-6 pt-4 text-xs font-semibold text-blue-600 flex items-center">
                One-handed mobile ergonomics
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 mb-6">
                  <Calculator className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Consecutive Class Calculator
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Students calculate mathematically exact consecutive future classes required to reach college target percentages (e.g. 85%).
                </p>
              </div>
              <div className="mt-6 pt-4 text-xs font-semibold text-emerald-600 flex items-center">
                Mathematically verified projection formula
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 mb-6">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Bulk Roster Importer
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Drag and drop class roster CSV or Excel files. Flexible column mapping, row-level validation, and duplicate SRN detection.
                </p>
              </div>
              <div className="mt-6 pt-4 text-xs font-semibold text-slate-900 flex items-center">
                CSV and XLSX compatibility
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-rose-600 mb-6">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Official PDF & CSV Registers
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Download official institutional attendance registers with department headers, signed audit timestamps, and CSV injection protection.
                </p>
              </div>
              <div className="mt-6 pt-4 text-xs font-semibold text-rose-600 flex items-center">
                Sanitized against formula injection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Navigation Portals */}
      <section className="py-20 bg-[#f8fafc]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Three authorized role portals.
            </h2>
            <p className="mt-2 text-base text-slate-600">
              Isolated by Supabase PostgreSQL Row Level Security (RLS) policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-white border border-slate-200/80 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Administrator</h3>
                    <span className="text-xs text-slate-500 font-medium">Institution Scope</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Configure academic terms, assign teachers to courses, bulk import rosters, and monitor institutional attendance health.
                </p>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/login?role=admin"
                  className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Enter Admin Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200/80 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Teacher</h3>
                    <span className="text-xs text-emerald-600 font-semibold">Assigned Courses</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Start sessions for assigned classes, swipe students present or absent, review absentees, and download registers.
                </p>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/login?role=teacher"
                  className="flex items-center justify-between text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Enter Teacher Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200/80 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Student</h3>
                    <span className="text-xs text-amber-700 font-semibold">Self-View Only</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Check course-wise percentages, calculate consecutive classes needed for targets, and download transcripts.
                </p>
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/login?role=student"
                  className="flex items-center justify-between text-sm font-semibold text-amber-800 hover:text-amber-900"
                >
                  Enter Student Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mark, Built Large Footer (Art Direction Blueprint 6) */}
      <footer className="mt-auto bg-[#0f172a] text-white pt-16 pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Architectural Wordmark Construction */}
          <div className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-slate-800 select-none pb-8">
            ATTENDLY
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white">Attendly Platform</span>
              <span>•</span>
              <span>Production-Minded College Attendance Architecture</span>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-400">
              <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
              <Link href="/login?role=admin" className="hover:text-white transition-colors">Admin Setup</Link>
              <Link href="/teacher" className="hover:text-white transition-colors">Teacher Portal</Link>
              <Link href="/student" className="hover:text-white transition-colors">Student Portal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
