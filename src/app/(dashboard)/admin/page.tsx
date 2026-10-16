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
      <div className="space-y-8" data-ui="admin-overview">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-ui="metrics-grid">
          <Card className="border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-600">
                Total Enrolled
              </span>
              <GraduationCap className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="font-chillax text-2xl font-bold text-slate-900 tracking-tight">
                {studentsList.length} Students
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Across 2 active sections
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-600">
                Active Faculty
              </span>
              <Users className="h-4 w-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="font-chillax text-2xl font-bold text-slate-900 tracking-tight">
                2 Teachers
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Prof. Sharma, Prof. Nair
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-600">
                Subjects & Courses
              </span>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="font-chillax text-2xl font-bold text-slate-900 tracking-tight">
                {MOCK_SUBJECTS.length} Subjects
              </div>
              <p className="text-xs text-slate-500 mt-1">
                CSE Department • Sem 5
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-semibold text-slate-600">
                Attendance Recorded
              </span>
              <CalendarCheck2 className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="font-chillax text-2xl font-bold text-slate-900 tracking-tight">
                {MOCK_SESSIONS.length} Sessions
              </div>
              <p className="text-xs text-emerald-600 font-semibold mt-1">
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
        <Card className="border-slate-200 bg-white" data-ui="data-table">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="font-chillax tracking-tight">Enrolled Student Directory</CardTitle>
              <CardDescription>
                Search, verify, and monitor student institutional profiles and section enrollments.
              </CardDescription>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name or SRN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 h-10"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl border border-slate-200 overflow-x-auto" data-ui="table-wrapper">
              <table className="w-full text-left text-sm" data-ui="table">
                <thead data-ui="table-head" className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs font-semibold">
                  <tr>
                    <th className="p-3.5">Roll</th>
                    <th className="p-3.5">Student Identifier</th>
                    <th className="p-3.5">Full Name</th>
                    <th className="p-3.5">Section</th>
                    <th className="p-3.5">Email</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody data-ui="table-body" className="divide-y divide-slate-100 bg-white">
                  {filteredStudents.slice(0, 15).map((item) => (
                    <tr key={item.profile.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 tabular-nums text-slate-500 font-medium">
                        {item.enrollment.rollNumber || "—"}
                      </td>
                      <td className="p-3.5 tabular-nums font-bold text-slate-900">
                        {item.profile.identifier}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {item.profile.fullName}
                      </td>
                      <td className="p-3.5 text-slate-600">
                        Section A (Sem 5)
                      </td>
                      <td className="p-3.5 text-slate-500 text-xs">
                        {item.profile.email}
                      </td>
                      <td className="p-3.5 text-right">
                        <Badge variant="present">Enrolled</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4 text-xs text-slate-500">
              <span>Showing {Math.min(15, filteredStudents.length)} of {filteredStudents.length} students</span>
              <span className="font-medium">Strict RLS Scope: Apex Institute of Technology</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
