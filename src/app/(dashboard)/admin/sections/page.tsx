"use client";

import React, { useState } from "react";
import { Plus, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_ADMIN_USER,
  MOCK_INSTITUTION,
  MOCK_TEACHER_ASSIGNMENTS,
  MOCK_SECTION_A,
  MOCK_SECTION_B,
} from "@/lib/data/mock-store";

export default function AdminSectionsPage() {
  const [assignments] = useState(MOCK_TEACHER_ASSIGNMENTS);

  return (
    <DashboardShell
      user={{
        email: MOCK_ADMIN_USER.email,
        role: "admin",
        fullName: MOCK_ADMIN_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Academic Sections & Course Assignments"
      subtitle="Manage course offerings and assign instructors to specific sections"
    >
      <div className="space-y-8" data-ui="sections-overview">
        {/* Sections Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-ui="sections-grid">
          <Card className="border-slate-200 bg-white" data-ui="section-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-chillax text-base tracking-tight">{MOCK_SECTION_A.name}</CardTitle>
                <Badge variant="default">Semester 5 • CSE</Badge>
              </div>
              <CardDescription>
                20 Enrolled Students • Computer Science & Engineering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50">
                  <span>Assigned Courses:</span>
                  <span className="font-semibold text-slate-800">4 Subjects</span>
                </div>
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50">
                  <span>Lead Faculty:</span>
                  <span className="font-semibold text-slate-800">Prof. Ramesh Sharma</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white" data-ui="section-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-chillax text-base tracking-tight">{MOCK_SECTION_B.name}</CardTitle>
                <Badge variant="outline">Semester 5 • CSE</Badge>
              </div>
              <CardDescription>
                22 Enrolled Students • Computer Science & Engineering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50">
                  <span>Assigned Courses:</span>
                  <span className="font-semibold text-slate-800">4 Subjects</span>
                </div>
                <div className="flex justify-between py-1.5 px-3 rounded-lg bg-slate-50">
                  <span>Lead Faculty:</span>
                  <span className="font-semibold text-slate-800">Prof. Meera Nair</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Assignments Table */}
        <Card className="border-slate-200 bg-white" data-ui="data-table">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-chillax tracking-tight">Course Instructor Allocations</CardTitle>
              <CardDescription>
                Explicit teacher allocations enforce that faculty only mark attendance for their assigned classes.
              </CardDescription>
            </div>
            <Button size="sm" variant="outline" className="flex items-center space-x-1.5">
              <Plus className="h-4 w-4" />
              <span>Assign Faculty</span>
            </Button>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl border border-slate-200 overflow-x-auto" data-ui="table-wrapper">
              <table className="w-full text-left text-sm" data-ui="table">
                <thead data-ui="table-head" className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs font-semibold">
                  <tr>
                    <th className="p-3.5">Course Code</th>
                    <th className="p-3.5">Course Name</th>
                    <th className="p-3.5">Section</th>
                    <th className="p-3.5">Assigned Teacher</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody data-ui="table-body" className="divide-y divide-slate-100 bg-white">
                  {assignments.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 tabular-nums font-bold text-blue-600">
                        {item.subjectCode}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {item.subjectName}
                      </td>
                      <td className="p-3.5 text-slate-600">{item.sectionName}</td>
                      <td className="p-3.5 font-medium text-slate-800">
                        {item.teacherId === MOCK_ADMIN_USER.id
                          ? "Dr. K. S. Murthy"
                          : item.teacherId === "user-teacher-02"
                          ? "Prof. Meera Nair"
                          : "Prof. Ramesh Sharma"}
                      </td>
                      <td className="p-3.5 text-right">
                        <Badge variant="present" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </Badge>
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
