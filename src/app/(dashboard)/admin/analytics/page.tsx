"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  AlertTriangle,
  Filter,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { downloadCsv, downloadPdfReport } from "@/lib/export";
import {
  MOCK_ADMIN_USER,
  MOCK_INSTITUTION,
  MOCK_STUDENTS,
} from "@/lib/data/mock-store";

export default function AdminAnalyticsPage() {
  const [threshold, setThreshold] = useState(75);

  const subjectChartData = [
    { code: "CS501", name: "Distributed Systems", attendance: 90.0 },
    { code: "CS502", name: "Computer Networks", attendance: 92.5 },
    { code: "CS503", name: "Cloud Computing", attendance: 68.8 },
    { code: "CS504", name: "ML Foundations", attendance: 88.0 },
  ];

  // At risk students list (simulated)
  const atRiskStudents = [
    { name: "Tanvi Agarwal", srn: "ENG22CS018", section: "Section A", rate: 71.2, missed: 8 },
    { name: "Varun Shetty", srn: "ENG22CS020", section: "Section A", rate: 64.0, missed: 11 },
    { name: "Eshaan Gupta", srn: "ENG22CS005", section: "Section A", rate: 73.5, missed: 7 },
  ];

  const handleExportCsv = () => {
    const headers = ["Student Name", "SRN", "Section", "Attendance %", "Classes Missed"];
    const rows = atRiskStudents.map((s) => [s.name, s.srn, s.section, `${s.rate}%`, s.missed]);
    downloadCsv("institutional_attendance_ledger", headers, rows);
  };

  const handleExportPdf = () => {
    downloadPdfReport({
      title: "INSTITUTIONAL ATTENDANCE HEALTH REPORT",
      institutionName: MOCK_INSTITUTION.name,
      metadata: {
        Department: "Computer Science & Engineering",
        Semester: "5th Semester",
        Date: new Date().toLocaleDateString(),
        Status: "Official Institution Copy",
      },
      headers: ["Student Name", "SRN", "Section", "Attendance Rate", "Absences"],
      data: atRiskStudents.map((s) => [s.name, s.srn, s.section, `${s.rate}%`, s.missed]),
      filename: "official_attendance_report",
    });
  };

  return (
    <DashboardShell
      user={{
        email: MOCK_ADMIN_USER.email,
        role: "admin",
        fullName: MOCK_ADMIN_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Institutional Analytics & Reporting"
      subtitle="Cohort attendance trends, at-risk threshold alerts, and report exports"
      action={
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="flex items-center space-x-1.5">
            <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
            <span>Export CSV</span>
          </Button>
          <Button variant="default" size="sm" onClick={handleExportPdf} className="flex items-center space-x-1.5">
            <FileText className="h-4 w-4" />
            <span>Generate Official PDF</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Subject Attendance Distribution Bar Chart */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Subject Attendance Performance</CardTitle>
                <CardDescription>
                  Average percentage of classes attended across 5th Semester courses.
                </CardDescription>
              </div>
              <Badge variant="present">Fall 2026</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="code" tick={{ fontSize: 12, fill: "#64748b" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#64748b" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#e2e8f0",
                      borderRadius: "0.75rem",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="attendance" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* At Risk Cohort Table */}
        <Card className="border-slate-200">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <CardTitle>Students Below Required Threshold (&lt; {threshold}%)</CardTitle>
                <CardDescription>
                  Cohorts needing immediate counseling or mandatory recovery sessions.
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-500">Threshold:</span>
              <select
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value={75}>75% (Standard Exam Eligibility)</option>
                <option value={80}>80% (Warning Level)</option>
                <option value={85}>85% (College Target)</option>
              </select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl border border-slate-200 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 font-semibold">Student Name</th>
                    <th className="p-3.5 font-semibold">SRN</th>
                    <th className="p-3.5 font-semibold">Section</th>
                    <th className="p-3.5 font-semibold">Classes Missed</th>
                    <th className="p-3.5 font-semibold text-right">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {atRiskStudents.map((s) => (
                    <tr key={s.srn} className="hover:bg-slate-50">
                      <td className="p-3.5 font-bold text-slate-900">{s.name}</td>
                      <td className="p-3.5 font-mono text-slate-600">{s.srn}</td>
                      <td className="p-3.5 text-slate-600">{s.section}</td>
                      <td className="p-3.5 font-semibold text-rose-600">
                        {s.missed} sessions
                      </td>
                      <td className="p-3.5 text-right">
                        <Badge variant="absent">{s.rate}%</Badge>
                      </td>
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
