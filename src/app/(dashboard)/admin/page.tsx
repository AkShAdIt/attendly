"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck2,
  UploadCloud,
  Search,
  Filter,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RosterImporter, ParsedStudentRow } from "@/components/admin/RosterImporter";
import {
  MOCK_ADMIN_USER,
  MOCK_INSTITUTION,
  MOCK_STUDENTS,
  MOCK_TEACHER_USER,
  MOCK_TEACHER_2,
  MOCK_SUBJECTS,
  MOCK_SESSIONS,
} from "@/lib/data/mock-store";

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showImporter, setShowImporter] = useState(false);
  const [studentsList, setStudentsList] = useState(MOCK_STUDENTS);

  const handleImportComplete = (imported: ParsedStudentRow[]) => {
    const newItems = imported.map((imp, idx) => ({
      profile: {
        id: `user-std-${imp.srn.toLowerCase()}`,
        institutionId: MOCK_INSTITUTION.id,
        role: "student" as const,
        fullName: imp.name,
        email: imp.email,
        identifier: imp.srn,
        createdAt: new Date().toISOString(),
      },
      enrollment: {
        id: `enr-imp-${idx}-${Date.now()}`,
        institutionId: MOCK_INSTITUTION.id,
        studentId: `user-std-${imp.srn.toLowerCase()}`,
        sectionId: "sec-5a",
        rollNumber: imp.rollNumber,
        studentName: imp.name,
        identifier: imp.srn,
        email: imp.email,
      },
    }));

    setStudentsList((prev) => [...newItems, ...prev]);
  };

  const filteredStudents = studentsList.filter(
    (s) =>
      s.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.profile.identifier &&
        s.profile.identifier.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <DashboardShell
      user={{
        email: MOCK_ADMIN_USER.email,
        role: "admin",
        fullName: MOCK_ADMIN_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Administrator Overview"
      subtitle={`${MOCK_INSTITUTION.name} • Institutional Control Dashboard`}
      action={
        <Button
          onClick={() => setShowImporter(!showImporter)}
          className="flex items-center space-x-2"
        >
          <UploadCloud className="h-4 w-4" />
          <span>{showImporter ? "Close Importer" : "Import Students"}</span>
        </Button>
      }
    >
      <div className="space-y-6 sm:space-y-8" data-ui="admin-overview">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-ui="metrics-grid">
          <Card className="border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-slate-500">
                Total Enrolled
              </span>
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <GraduationCap className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                {studentsList.length} Students
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Across 2 active sections
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-slate-500">
                Active Faculty
              </span>
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                2 Teachers
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Prof. Sharma, Prof. Nair
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-slate-500">
                Subjects & Courses
              </span>
              <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                <BookOpen className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                {MOCK_SUBJECTS.length} Subjects
              </div>
              <p className="text-xs text-slate-500 mt-1">
                CSE Department • Sem 5
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200/80 bg-white shadow-xs hover:border-slate-300 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-slate-500">
                Attendance Recorded
              </span>
              <div className="h-8 w-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <CalendarCheck2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums">
                {MOCK_SESSIONS.length} Sessions
              </div>
              <p className="text-xs text-emerald-700 font-semibold mt-1">
                90.0% Institutional Avg
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Collapsible Bulk Importer */}
        {showImporter && (
          <div className="transition-opacity animate-in fade-in-50 duration-200" data-ui="importer-panel">
            <RosterImporter onImportComplete={handleImportComplete} />
          </div>
        )}

        {/* Student Directory Table */}
        <Card className="border-slate-200/80 bg-white shadow-xs" data-ui="data-table">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <CardTitle className="text-base sm:text-lg">Enrolled Student Directory</CardTitle>
              <CardDescription>
                Search, verify, and monitor student institutional profiles and section enrollments.
              </CardDescription>
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name or SRN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-9 text-xs"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="rounded-xl border border-slate-200/80 overflow-x-auto shadow-2xs" data-ui="table-wrapper">
              <table className="w-full text-left text-sm" data-ui="table">
                <thead data-ui="table-head" className="bg-slate-50/80 text-slate-600 border-b border-slate-200 text-xs font-semibold">
                  <tr>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Roll</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Identifier / SRN</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Full Name</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Section</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-wider text-right">Status</th>
                  </tr>
                </thead>
                <tbody data-ui="table-body" className="divide-y divide-slate-100 bg-white">
                  {filteredStudents.slice(0, 15).map((item) => (
                    <tr key={item.profile.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3 tabular-nums text-slate-500 font-mono text-xs">
                        {item.enrollment.rollNumber || "—"}
                      </td>
                      <td className="px-4 py-3 tabular-nums font-mono font-semibold text-slate-900 text-xs">
                        {item.profile.identifier}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {item.profile.fullName}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">
                        Section A (Sem 5)
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs font-mono">
                        {item.profile.email}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Badge variant="present">Enrolled</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 text-xs text-slate-500">
              <span>Showing {Math.min(15, filteredStudents.length)} of {filteredStudents.length} students</span>
              <span className="font-medium text-slate-400">Apex Institute of Technology</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
