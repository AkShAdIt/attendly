"use client";

import React from "react";
import { FileText, FileSpreadsheet, ShieldCheck } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadCsv, downloadPdfReport } from "@/lib/export";
import { MOCK_STUDENT_USER, MOCK_INSTITUTION } from "@/lib/data/mock-store";

export default function StudentReportsPage() {
  const studentRecords = [
    { code: "CS501", name: "Distributed Systems", held: 24, attended: 20, pct: "83.3%" },
    { code: "CS502", name: "Computer Networks", held: 20, attended: 18, pct: "90.0%" },
    { code: "CS503", name: "Cloud Computing", held: 16, attended: 11, pct: "68.8%" },
    { code: "CS504", name: "ML Foundations", held: 0, attended: 0, pct: "No sessions held" },
  ];

  const handleExportPdf = () => {
    downloadPdfReport({
      title: "INDIVIDUAL STUDENT ATTENDANCE TRANSCRIPT",
      institutionName: MOCK_INSTITUTION.name,
      metadata: {
        "Student Name": MOCK_STUDENT_USER.fullName,
        "Student SRN": MOCK_STUDENT_USER.identifier || "ENG22CS001",
        "Department": "Computer Science & Engineering",
        "Term": "Fall 2026 Semester",
        "Generated Date": new Date().toLocaleDateString(),
      },
      headers: ["Course Code", "Course Name", "Sessions Held", "Sessions Attended", "Attendance Rate"],
      data: studentRecords.map((r) => [r.code, r.name, r.held, r.attended, r.pct]),
      filename: `attendance_transcript_${MOCK_STUDENT_USER.identifier}`,
    });
  };

  const handleExportCsv = () => {
    const headers = ["Course Code", "Course Name", "Sessions Held", "Sessions Attended", "Attendance Rate"];
    const rows = studentRecords.map((r) => [r.code, r.name, r.held, r.attended, r.pct]);
    downloadCsv(`attendance_transcript_${MOCK_STUDENT_USER.identifier}`, headers, rows);
  };

  return (
    <DashboardShell
      user={{
        email: MOCK_STUDENT_USER.email,
        role: "student",
        fullName: MOCK_STUDENT_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Personal Attendance Transcript"
      subtitle="Download official date-stamped records of your academic attendance"
    >
      <div className="max-w-3xl space-y-6" data-ui="student-reports">
        <Card className="border-slate-200 bg-white" data-ui="data-table">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-chillax tracking-tight">Official Academic Record</CardTitle>
                <CardDescription>
                  Verified attendance ledger for student {MOCK_STUDENT_USER.fullName} ({MOCK_STUDENT_USER.identifier})
                </CardDescription>
              </div>
              <div className="flex items-center text-xs text-emerald-600 font-semibold space-x-1">
                <ShieldCheck className="h-4 w-4" />
                <span>Verified</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-xl border border-slate-200 overflow-x-auto" data-ui="table-wrapper">
              <table className="w-full text-left text-sm" data-ui="table">
                <thead data-ui="table-head" className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs font-semibold">
                  <tr>
                    <th className="p-3">Course</th>
                    <th className="p-3">Held</th>
                    <th className="p-3">Attended</th>
                    <th className="p-3 text-right">Percentage</th>
                  </tr>
                </thead>
                <tbody data-ui="table-body" className="divide-y divide-slate-100 bg-white">
                  {studentRecords.map((rec) => (
                    <tr key={rec.code} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3">
                        <span className="font-bold text-slate-900">{rec.code}</span>{" "}
                        <span className="text-slate-500">({rec.name})</span>
                      </td>
                      <td className="p-3 tabular-nums text-slate-600">{rec.held}</td>
                      <td className="p-3 tabular-nums text-slate-600">{rec.attended}</td>
                      <td className="p-3 text-right font-semibold text-slate-900 tabular-nums">
                        {rec.pct}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={handleExportPdf} className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Download PDF Transcript</span>
              </Button>
              <Button variant="outline" onClick={handleExportCsv} className="flex items-center space-x-2">
                <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                <span>Download CSV Ledger</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
