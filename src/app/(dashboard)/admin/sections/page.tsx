"use client";

import React, { useState } from "react";
import { BookOpen, Users, Plus, CheckCircle2 } from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_ADMIN_USER,
  MOCK_INSTITUTION,
  MOCK_SUBJECTS,
  MOCK_TEACHER_ASSIGNMENTS,
  MOCK_SECTION_A,
  MOCK_SECTION_B,
} from "@/lib/data/mock-store";

export default function AdminSectionsPage() {
  const [assignments, setAssignments] = useState(MOCK_TEACHER_ASSIGNMENTS);

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
      <div className="space-y-8">
        {/* Sections Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{MOCK_SECTION_A.name}</CardTitle>
                <Badge variant="default">Semester 5 • CSE</Badge>
              </div>
              <CardDescription>
                20 Enrolled Students • Computer Science & Engineering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Assigned Courses:</span>
                  <span className="font-semibold text-slate-800">4 Subjects</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Lead Faculty:</span>
                  <span className="font-semibold text-slate-800">Prof. Ramesh Sharma</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{MOCK_SECTION_B.name}</CardTitle>
                <Badge variant="outline">Semester 5 • CSE</Badge>
              </div>
              <CardDescription>
                22 Enrolled Students • Computer Science & Engineering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Assigned Courses:</span>
                  <span className="font-semibold text-slate-800">4 Subjects</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Lead Faculty:</span>
                  <span className="font-semibold text-slate-800">Prof. Meera Nair</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Assignments Table */}
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Course Instructor Allocations</CardTitle>
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
            <div className="rounded-xl border border-slate-200 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-3.5 font-semibold">Course Code</th>
                    <th className="p-3.5 font-semibold">Course Name</th>
                    <th className="p-3.5 font-semibold">Section</th>
                    <th className="p-3.5 font-semibold">Assigned Teacher</th>
                    <th className="p-3.5 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {assignments.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-3.5 font-mono font-bold text-blue-600">
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
