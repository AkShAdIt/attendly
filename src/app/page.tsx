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
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SwipeDemo } from "@/components/landing/SwipeDemo";
import { InstallButton } from "@/components/ui/InstallPrompt";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/70 text-slate-900 selection:bg-slate-900 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Ambient subtle background textures */}
        <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-60" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Direct proposition & launch pill */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-2xs backdrop-blur-xs mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-slate-900">Attendly 2.0</span>
                <span className="text-slate-300">•</span>
                <span>Mobile-First College Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Take full attendance in sixty seconds.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Swipe cards for teachers, real-time credit calculations for students, and centralized roster control for college administrators.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 shadow-sm shadow-slate-900/10 transition-all active:scale-[0.98]"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/login?role=teacher"
                  className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200/90 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-2xs shadow-slate-900/5 transition-all active:scale-[0.98]"
                >
                  Faculty Portal
                </Link>
                <InstallButton className="px-4 py-3 text-xs sm:text-sm rounded-xl font-semibold" />
              </div>

              <div className="mt-8 flex items-center gap-6 pt-6 border-t border-slate-200/60 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>RLS Security</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span>60s Full Roster Flow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Touch Swipes</span>
                </div>
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

      {/* Stepped Figure Tiles Section */}
      <section className="py-16 bg-slate-100/70 border-y border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Built for classroom speed.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl leading-normal">
              Engineered so instructors finish attendance before the lecture even begins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* Tall Main Tile */}
            <div className="md:col-span-6 rounded-2xl bg-slate-900 text-white p-7 sm:p-9 flex flex-col justify-between min-h-[240px] shadow-sm shadow-slate-900/10">
              <div className="text-5xl sm:text-7xl font-extrabold tracking-tight tabular-nums">
                60s
              </div>
              <div className="mt-6">
                <div className="text-base font-semibold">Average Session Duration</div>
                <div className="text-xs sm:text-sm text-slate-400 mt-1 leading-normal">
                  Complete a roster of 60 students with one thumb on mobile.
                </div>
              </div>
            </div>

            {/* Stepped Secondary Tile 1 */}
            <div className="md:col-span-3 rounded-2xl bg-emerald-600 text-white p-6 sm:p-7 flex flex-col justify-between min-h-[200px] shadow-sm shadow-emerald-900/10">
              <div className="text-4xl sm:text-5xl font-extrabold tabular-nums">
                100%
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold">Transactional Save</div>
                <div className="text-xs text-emerald-100 mt-1 leading-normal">
                  Drafts separate from submitted attendance. Zero silent absences.
                </div>
              </div>
            </div>

            {/* Stepped Secondary Tile 2 */}
            <div className="md:col-span-3 rounded-2xl bg-white p-6 sm:p-7 border border-slate-200/80 text-slate-900 flex flex-col justify-between min-h-[200px] shadow-2xs">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 tabular-nums">
                0
              </div>
              <div className="mt-4">
                <div className="text-sm font-semibold">Manual Spreadsheets</div>
                <div className="text-xs text-slate-500 mt-1 leading-normal">
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
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
              Four tools in one unified application.
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Purpose-built tools designed for the modern collegiate workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7 flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-xs">
              <div>
                <div className="h-11 w-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-blue-600 mb-5 shadow-2xs">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  Touch Gesture Deck
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Swipe right for Present, left for Absent. Instant undo, quick roster list view fallback, and pre-submission absentee verification.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-blue-600 flex items-center">
                One-handed mobile ergonomics
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7 flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-xs">
              <div>
                <div className="h-11 w-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-emerald-600 mb-5 shadow-2xs">
                  <Calculator className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  Consecutive Class Calculator
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Students calculate mathematically exact consecutive future classes required to reach college target percentages (e.g. 85%).
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-emerald-600 flex items-center">
                Mathematically verified projection formula
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7 flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-xs">
              <div>
                <div className="h-11 w-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-900 mb-5 shadow-2xs">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  Bulk Roster Importer
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Drag and drop class roster CSV or Excel files. Flexible column mapping, row-level validation, and duplicate SRN detection.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-slate-900 flex items-center">
                CSV and XLSX compatibility
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-7 flex flex-col justify-between transition-all hover:border-slate-300 hover:shadow-xs">
              <div>
                <div className="h-11 w-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-rose-600 mb-5 shadow-2xs">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  Official PDF & CSV Registers
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Download official institutional attendance registers with department headers, signed audit timestamps, and CSV injection protection.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 text-xs font-semibold text-rose-600 flex items-center">
                Sanitized against formula injection
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Navigation Portals */}
      <section className="py-20 bg-slate-50/70 border-t border-slate-200/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Three authorized role portals.
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Isolated by Supabase PostgreSQL Row Level Security (RLS) policies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white border border-slate-200/80 p-7 flex flex-col justify-between shadow-2xs transition-all hover:border-slate-300">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-slate-900">Administrator</h3>
                    <span className="text-[11px] text-slate-500 font-medium">Institution Scope</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Configure academic terms, assign teachers to courses, bulk import rosters, and monitor institutional attendance health.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/login?role=admin"
                  className="flex items-center justify-between text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  <span>Enter Admin Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-7 flex flex-col justify-between shadow-2xs transition-all hover:border-slate-300">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-slate-900">Faculty</h3>
                    <span className="text-[11px] text-emerald-700 font-semibold">Assigned Courses</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Start sessions for assigned classes, swipe students present or absent, review absentees, and download registers.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/login?role=teacher"
                  className="flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  <span>Enter Faculty Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200/80 p-7 flex flex-col justify-between shadow-2xs transition-all hover:border-slate-300">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-slate-900">Student</h3>
                    <span className="text-[11px] text-blue-700 font-semibold">Self-View Only</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Check course-wise percentages, calculate consecutive classes needed for targets, and download transcripts.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/login?role=student"
                  className="flex items-center justify-between text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-800"
                >
                  <span>Enter Student Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Mark, Built Large Footer */}
      <footer className="mt-auto bg-slate-900 text-white pt-16 pb-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-slate-800/80 select-none pb-8 border-b border-slate-800">
            ATTENDLY
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white">Attendly</span>
              <span>•</span>
              <span>Production College Attendance Architecture</span>
            </div>

            <div className="flex items-center space-x-6 text-xs text-slate-400">
              <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
              <Link href="/login?role=admin" className="hover:text-white transition-colors">Admin Setup</Link>
              <Link href="/teacher" className="hover:text-white transition-colors">Faculty Portal</Link>
              <Link href="/student" className="hover:text-white transition-colors">Student Portal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

