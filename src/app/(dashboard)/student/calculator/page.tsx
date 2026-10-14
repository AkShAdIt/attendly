"use client";

import React from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { TargetCalculator } from "@/components/student/TargetCalculator";
import { MOCK_STUDENT_USER, MOCK_INSTITUTION } from "@/lib/data/mock-store";

export default function StudentCalculatorPage() {
  return (
    <DashboardShell
      user={{
        email: MOCK_STUDENT_USER.email,
        role: "student",
        fullName: MOCK_STUDENT_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Attendance Target Calculator"
      subtitle="Plan ahead and project required consecutive classes"
    >
      <div className="max-w-xl mx-auto py-4">
        <TargetCalculator
          presentCount={49}
          totalHeld={60}
          initialTarget={85}
        />
      </div>
    </DashboardShell>
  );
}
