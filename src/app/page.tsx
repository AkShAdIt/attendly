import Link from "next/link";
import {
  CheckCheck,
  Smartphone,
  Calculator,
  UploadCloud,
  FileSpreadsheet,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { SwipeDemo } from "@/components/landing/SwipeDemo";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-slate-200/80 bg-linear-to-b from-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <Badge variant="default" className="mb-4 gap-1.5 py-1 px-3">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Next-Gen College Attendance Platform
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Attendance, without the{" "}
                <span className="text-blue-600 underline decoration-blue-200 decoration-wavy decoration-2">
                  spreadsheet shuffle
                </span>
                .
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Take full classroom attendance in under 60 seconds with intuitive swipe gestures. Give students crystal-clear projections and administrators unified institutional reporting.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-all active:scale-[0.98]"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/login?demo=teacher"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  Explore Teacher Portal
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/80 w-full max-w-lg">
                <div>
                  <div className="text-2xl font-bold text-slate-900">&lt; 60s</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Average Session Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-emerald-600">100%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Data Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">0 Spreadsheets</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Manual Entry</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Swipe Widget */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full">
                <SwipeDemo />
                <p className="text-center text-xs text-slate-400 mt-3 font-medium">
                  Try swiping or tapping buttons above to test the real interaction.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Pillar Grid */}
      <section className="py-20 bg-white border-b border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Engineered for Speed, Clarity, and Precision
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Every detail is tuned for one-handed mobile comfort and mathematically sound attendance accounting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Smartphone className="h-5 w-5" />
                </div>
                <CardTitle>Swipe-Based Marking</CardTitle>
                <CardDescription>
                  Swipe right for Present, left for Absent. Instant undo, quick roster fallback, and pre-submission confirmation.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Calculator className="h-5 w-5" />
                </div>
                <CardTitle>Attendance Calculator</CardTitle>
                <CardDescription>
                  Students calculate exactly how many consecutive upcoming classes they need to reach their institutional target.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:border-indigo-200 transition-colors">
              <CardHeader>
                <div className="h-11 w-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <CardTitle>CSV Roster Import</CardTitle>
                <CardDescription>
                  Bulk upload hundreds of students in seconds with custom header mapping, inline error correction, and deduplication.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="h-11 w-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <CardTitle>Instant Export Engine</CardTitle>
                <CardDescription>
                  Download official institutional PDF attendance registers or sanitized CSV sheets filtered by department and semester.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Role Navigation Portals */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Three Dedicated Experience Portals
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Strict role isolation powered by Supabase PostgreSQL Row Level Security (RLS).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Admin Card */}
            <Card className="flex flex-col justify-between border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>College Admin</CardTitle>
                    <Badge variant="default" className="mt-1">Institution Scope</Badge>
                  </div>
                </div>
                <CardDescription className="pt-2">
                  Oversee academic departments, assign instructors to courses, bulk import rosters, and review institution-wide reports.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t border-slate-100">
                <Link
                  href="/login?role=admin"
                  className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Enter Admin Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Teacher Card */}
            <Card className="flex flex-col justify-between border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>Teacher</CardTitle>
                    <Badge variant="present" className="mt-1">Assigned Classes</Badge>
                  </div>
                </div>
                <CardDescription className="pt-2">
                  View daily schedules, take attendance in seconds via swipe cards, review absentees, and manage audit logs.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t border-slate-100">
                <Link
                  href="/login?role=teacher"
                  className="flex items-center justify-between text-sm font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Enter Teacher Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Student Card */}
            <Card className="flex flex-col justify-between border-slate-200 hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>Student</CardTitle>
                    <Badge variant="draft" className="mt-1">Self-View Only</Badge>
                  </div>
                </div>
                <CardDescription className="pt-2">
                  Track overall and subject-wise percentages, test target goals with the calculator, and download transcripts.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t border-slate-100">
                <Link
                  href="/login?role=student"
                  className="flex items-center justify-between text-sm font-semibold text-amber-700 hover:text-amber-800"
                >
                  Enter Student Portal <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
              <CheckCheck className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-800">Attendly</span>
            <span className="text-xs text-slate-400 pl-2">© 2026 Attendly Platform. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 mr-1" />
              Supabase RLS Protected
            </span>
            <span>Mobile-First</span>
            <span>Zero Feature Creep</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
