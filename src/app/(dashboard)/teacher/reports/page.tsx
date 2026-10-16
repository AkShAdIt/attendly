"use client";

import React from "react";
import { FileText, FileSpreadsheet } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadCsv, downloadPdfReport } from "@/lib/export";
import {
  MOCK_TEACHER_USER,
  MOCK_INSTITUTION,
  MOCK_STUDENTS,
  MOCK_SECTION_A,
} from "@/lib/data/mock-store";

export default function TeacherReportsPage() {
  const rosterData = MOCK_STUDENTS.map((item, idx) => {
    // deterministic present/total for this course
    const held = 24;
    const attended = 18 + (idx % 6);
    const rate = ((attended / held) * 100).toFixed(1);
    return {
      srn: item.profile.identifier || "",
      name: item.profile.fullName,
      held,
      attended,
      rate: `${rate}%`,
    };
  });

  const handleExportCsv = () => {
    const headers = ["Student SRN", "Student Name", "Sessions Held", "Sessions Attended", "Attendance Rate"];
    const rows = rosterData.map((r) => [r.srn, r.name, r.held, r.attended, r.rate]);
    downloadCsv("class_attendance_register_CS501", headers, rows);
  };

  const handleExportPdf = () => {
    downloadPdfReport({
      title: "CLASS ATTENDANCE REGISTER",
      institutionName: MOCK_INSTITUTION.name,
      metadata: {
        Course: "CS501: Distributed Systems",
        Instructor: MOCK_TEACHER_USER.fullName,
        Section: MOCK_SECTION_A.name,
        Date: new Date().toLocaleDateString(),
      },
      headers: ["SRN", "Student Name", "Held", "Attended", "Rate"],
      data: rosterData.map((r) => [r.srn, r.name, r.held, r.attended, r.rate]),
      filename: "class_register_CS501",
    });
  };

  return (
    <DashboardShell
      user={{
        email: MOCK_TEACHER_USER.email,
        role: "teacher",
        fullName: MOCK_TEACHER_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Class Attendance Registers"
      subtitle="Export complete class attendance registers for your assigned courses"
    >
      <div className="space-y-6" data-ui="teacher-reports">
        <Card className="border-slate-200 bg-white" data-ui="data-table">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="font-chillax tracking-tight">CS501: Distributed Systems (Section A)</CardTitle>
              <CardDescription>
                Semester 5 • 24 Completed Sessions • 20 Enrolled Students
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleExportCsv} className="flex items-center space-x-1.5">
                <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                <span>Export CSV</span>
              </Button>
              <Button variant="default" size="sm" onClick={handleExportPdf} className="flex items-center space-x-1.5">
                <FileText className="h-4 w-4" />
                <span>Export PDF</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl border border-slate-200 overflow-x-auto" data-ui="table-wrapper">
              <table className="w-full text-left text-sm" data-ui="table">
                <thead data-ui="table-head" className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs font-semibold">
                  <tr>
                    <th className="p-3">SRN</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Sessions Held</th>
                    <th className="p-3">Attended</th>
                    <th className="p-3 text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody data-ui="table-body" className="divide-y divide-slate-100 bg-white">
                  {rosterData.map((r) => (
                    <tr key={r.srn} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 tabular-nums font-bold text-slate-900">{r.srn}</td>
                      <td className="p-3 font-semibold text-slate-800">{r.name}</td>
                      <td className="p-3 tabular-nums text-slate-600">{r.held}</td>
                      <td className="p-3 tabular-nums text-slate-600">{r.attended}</td>
                      <td className="p-3 text-right font-bold text-emerald-600 tabular-nums">{r.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
