"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  FileText,
} from "lucide-react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MOCK_TEACHER_USER,
  MOCK_INSTITUTION,
  MOCK_TEACHER_ASSIGNMENTS,
  MOCK_SESSIONS,
} from "@/lib/data/mock-store";

export default function TeacherDashboardPage() {
  const teacherAssignments = MOCK_TEACHER_ASSIGNMENTS.filter(
    (a) => a.teacherId === MOCK_TEACHER_USER.id
  );

  return (
    <DashboardShell
      user={{
        email: MOCK_TEACHER_USER.email,
        role: "teacher",
        fullName: MOCK_TEACHER_USER.fullName,
        institutionName: MOCK_INSTITUTION.name,
      }}
      title="Teacher Dashboard"
      subtitle="Today's Academic Schedule & Attendance Sessions"
      action={
        <Link href="/teacher/session/new">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>Take Attendance</span>
          </Button>
        </Link>
      }
    >
      <div className="space-y-8" data-ui="teacher-overview">
        {/* Today's Assigned Classes Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-chillax text-lg font-bold text-slate-900 tracking-tight">
              Today's Assigned Classes
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              Fall 2026 • 20 Enrolled Students
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-ui="classes-grid">
            {teacherAssignments.map((assignment, idx) => (
              <Card
                key={assignment.id}
                className="border-slate-200 bg-white hover:border-blue-600 transition-colors flex flex-col justify-between"
                data-ui="class-card"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="tabular-nums font-bold text-xs">
                      {assignment.subjectCode}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500">
                      Period {idx + 1} • 09:00 AM
                    </span>
                  </div>
                  <CardTitle className="font-chillax text-xl mt-2 tracking-tight">
                    {assignment.subjectName}
                  </CardTitle>
                  <CardDescription>
                    {assignment.sectionName} • {assignment.departmentName}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-2">
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-xs text-slate-600 space-x-1 font-medium">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span>20 Students</span>
                    </div>

                    <Link
                      href={`/teacher/session/new?subject=${assignment.subjectId}&section=${assignment.sectionId}`}
                    >
                      <Button size="sm" className="rounded-xl">
                        Start Attendance <ArrowRight className="h-4 w-4 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Previously Submitted Sessions */}
        <Card className="border-slate-200 bg-white" data-ui="data-table">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-chillax tracking-tight">Recent Attendance Sessions</CardTitle>
              <CardDescription>
                Persisted session records with verified audit status.
              </CardDescription>
            </div>
            <Link href="/teacher/reports">
              <Button variant="outline" size="sm" className="flex items-center space-x-1.5">
                <FileText className="h-4 w-4" />
                <span>Class Reports</span>
              </Button>
            </Link>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl border border-slate-200 overflow-x-auto" data-ui="table-wrapper">
              <table className="w-full text-left text-sm" data-ui="table">
                <thead data-ui="table-head" className="bg-slate-50 text-slate-700 border-b border-slate-200 text-xs font-semibold">
                  <tr>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Course & Section</th>
                    <th className="p-3.5">Period</th>
                    <th className="p-3.5">Present / Total</th>
                    <th className="p-3.5">Attendance Rate</th>
                    <th className="p-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody data-ui="table-body" className="divide-y divide-slate-100 bg-white">
                  {MOCK_SESSIONS.map((sess) => {
                    const rate = sess.totalStudents
                      ? ((sess.totalPresent || 0) / sess.totalStudents) * 100
                      : 0;
                    return (
                      <tr key={sess.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-medium text-slate-800 tabular-nums">
                          {sess.sessionDate}
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-slate-900">
                            {sess.subjectCode}
                          </span>{" "}
                          <span className="text-slate-500">({sess.sectionName})</span>
                        </td>
                        <td className="p-3.5 text-slate-600">Period {sess.period}</td>
                        <td className="p-3.5 font-semibold text-slate-700 tabular-nums">
                          {sess.totalPresent} / {sess.totalStudents}
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-emerald-600 tabular-nums">
                            {rate.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <Badge variant="present" className="gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Submitted
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
