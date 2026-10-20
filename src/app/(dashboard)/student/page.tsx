"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Download,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TargetCalculator } from "@/components/student/TargetCalculator";
import { StudentAnalyticsVisuals } from "@/components/student/StudentAnalyticsVisuals";
import {
  MOCK_STUDENT_USER,
  MOCK_INSTITUTION,
  MOCK_SUBJECTS,
} from "@/lib/data/mock-store";
import { calculateAttendancePercentage } from "@/lib/attendance";

export default function StudentDashboardPage() {
  // Student: Aarav Sharma (ENG22CS001)
  // Subject breakdown for CS501, CS502, CS503, CS504
  const subjectsData = [
    {
      subject: MOCK_SUBJECTS[0], // CS501
      totalHeld: 24,
      present: 20,
      absent: 4,
    },
    {
      subject: MOCK_SUBJECTS[1], // CS502
      totalHeld: 20,
      present: 18,
      absent: 2,
    },
    {
      subject: MOCK_SUBJECTS[2], // CS503
      totalHeld: 16,
      present: 11,
      absent: 5, // 68.75% -> Below 75% warning
    },
    {
      subject: MOCK_SUBJECTS[3], // CS504
      totalHeld: 0,
      present: 0,
      absent: 0, // Zero classes held -> "No attendance recorded"
    },
  ];

  const totalHeldAll = subjectsData.reduce((acc, curr) => acc + curr.totalHeld, 0);
  const totalPresentAll = subjectsData.reduce((acc, curr) => acc + curr.present, 0);
  const totalAbsentAll = subjectsData.reduce((acc, curr) => acc + curr.absent, 0);

  const overallPercentage = calculateAttendancePercentage(totalPresentAll, totalHeldAll);
  const isOverallAtRisk = overallPercentage !== null && overallPercentage < 85;

  return (
    <DashboardShell
      user={{
        email: MOCK_STUDENT_USER.email,
        role: "student",
        fullName: MOCK_STUDENT_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Student Attendance Portal"
      subtitle={`SRN: ${MOCK_STUDENT_USER.identifier} • Computer Science (Sem 5, Section A)`}
      action={
        <Link href="/student/reports">
          <Button variant="outline" size="sm" className="flex items-center space-x-1.5">
            <Download className="h-4 w-4" />
            <span>Attendance Transcript</span>
          </Button>
        </Link>
      }
    >
      <div className="space-y-6 sm:space-y-8" data-ui="student-overview">
        {/* At Risk Warning Banner */}
        {isOverallAtRisk && (
          <div className="flex items-start sm:items-center space-x-3.5 p-4 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-950 text-xs sm:text-sm shadow-2xs">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div className="leading-relaxed">
              <span className="font-semibold text-amber-900">Attendance Advisory: </span>
              Your cumulative attendance is at{" "}
              <strong className="font-bold text-amber-950 tabular-nums">{overallPercentage?.toFixed(1)}%</strong>, below the recommended 85% college minimum. Use the projection calculator below to plan recovery classes.
            </div>
          </div>
        )}

        {/* Aggregate Metric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-ui="metrics-grid">
          <Card className="border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-slate-500">
                Overall Attendance
              </span>
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <GraduationCap className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                {overallPercentage !== null ? `${overallPercentage.toFixed(1)}%` : "N/A"}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                College requirement: 85%
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-slate-500">
                Classes Attended
              </span>
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-emerald-600 tracking-tight tabular-nums">
                {totalPresentAll}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Present sessions logged
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-slate-500">
                Classes Missed
              </span>
              <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <XCircle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-rose-600 tracking-tight tabular-nums">
                {totalAbsentAll}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Absences logged
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-slate-500">
                Total Sessions Held
              </span>
              <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <CalendarCheck className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
                {totalHeldAll}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Completed class sessions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Visual Analytics & Attendance Velocity */}
        <StudentAnalyticsVisuals
          subjects={subjectsData.map((s) => ({
            code: s.subject.code,
            name: s.subject.name,
            present: s.present,
            totalHeld: s.totalHeld,
            pct: calculateAttendancePercentage(s.present, s.totalHeld),
          }))}
          overallPct={overallPercentage}
          totalPresent={totalPresentAll}
          totalAbsent={totalAbsentAll}
          totalHeld={totalHeldAll}
        />

        {/* Course-Wise Attendance Breakdown */}
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 tracking-tight">
            Course-Wise Attendance Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-ui="courses-grid">
            {subjectsData.map((item) => {
              const pct = calculateAttendancePercentage(item.present, item.totalHeld);
              const isLow = pct !== null && pct < 75;

              return (
                <Card
                  key={item.subject.id}
                  className={`border bg-white shadow-xs transition-all ${
                    isLow ? "border-rose-300 shadow-rose-900/5" : "border-slate-200/80 hover:border-slate-300"
                  }`}
                  data-ui="subject-card"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="tabular-nums font-mono font-semibold text-xs bg-slate-50">
                        {item.subject.code}
                      </Badge>
                      {pct !== null ? (
                        <Badge variant={pct >= 85 ? "present" : isLow ? "absent" : "draft"}>
                          {pct.toFixed(1)}%
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-400">
                          No sessions held
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base sm:text-lg mt-2 tracking-tight">
                      {item.subject.name}
                    </CardTitle>
                    <CardDescription>
                      {item.subject.credits} Credits • Computer Science
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {item.totalHeld > 0 ? (
                      <div className="space-y-2.5">
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full transition-[width] duration-300 ${
                              (pct || 0) >= 85
                                ? "bg-emerald-600"
                                : (pct || 0) >= 75
                                ? "bg-amber-500"
                                : "bg-rose-600"
                            }`}
                            style={{ width: `${pct || 0}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                          <span className="text-emerald-700 font-semibold tabular-nums">
                            {item.present} Present
                          </span>
                          <span className="text-rose-700 font-semibold tabular-nums">
                            {item.absent} Absent
                          </span>
                          <span className="text-slate-400 tabular-nums">
                            {item.totalHeld} Total
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-400 font-medium py-2">
                        No attendance recorded yet for this semester.
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Projection Calculator */}
        <div data-ui="calculator-section">
          <TargetCalculator
            presentCount={totalPresentAll}
            totalHeld={totalHeldAll}
            initialTarget={85}
          />
        </div>
      </div>
    </DashboardShell>
  );
}
