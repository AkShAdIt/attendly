"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SwipeAttendanceSession, StudentCardData } from "@/components/teacher/SwipeAttendanceSession";
import {
  MOCK_TEACHER_USER,
  MOCK_INSTITUTION,
  MOCK_STUDENTS,
  MOCK_SUBJECTS,
  MOCK_SECTION_A,
} from "@/lib/data/mock-store";

export default function NewAttendanceSessionPage() {
  const studentsCardData: StudentCardData[] = MOCK_STUDENTS.map((item) => ({
    id: item.profile.id,
    name: item.profile.fullName,
    srn: item.profile.identifier || "SRN-UNKNOWN",
    rollNumber: item.enrollment.rollNumber || "01",
  }));

  const [todayStr, setTodayStr] = useState("2026-10-14");

  React.useEffect(() => {
    setTodayStr(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <DashboardShell
      user={{
        email: MOCK_TEACHER_USER.email,
        role: "teacher",
        fullName: MOCK_TEACHER_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Attendance Session"
      subtitle={`${MOCK_SUBJECTS[0].code} • ${MOCK_SUBJECTS[0].name}`}
      action={
        <Link
          href="/teacher"
          className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Link>
      }
    >
      <div className="py-2">
        <SwipeAttendanceSession
          sectionName={MOCK_SECTION_A.name}
          subjectCode={MOCK_SUBJECTS[0].code}
          subjectName={MOCK_SUBJECTS[0].name}
          sessionDate={todayStr}
          period={1}
          students={studentsCardData}
        />
      </div>
    </DashboardShell>
  );
}
