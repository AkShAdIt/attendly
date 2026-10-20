"use client";

import React, { useState, useSyncExternalStore } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  AlertTriangle,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Data: Session-by-Session Attendance Trends
const sessionTrendData = [
  { date: "Oct 02", rate: 94.2, present: 19, absent: 1, period: "P1" },
  { date: "Oct 04", rate: 89.5, present: 18, absent: 2, period: "P2" },
  { date: "Oct 06", rate: 92.0, present: 18, absent: 2, period: "P1" },
  { date: "Oct 08", rate: 85.0, present: 17, absent: 3, period: "P3" },
  { date: "Oct 09", rate: 79.0, present: 15, absent: 5, period: "P2" }, // Rainy day slump
  { date: "Oct 11", rate: 90.5, present: 18, absent: 2, period: "P1" },
  { date: "Oct 13", rate: 95.0, present: 19, absent: 1, period: "P2" },
  { date: "Oct 14", rate: 90.0, present: 18, absent: 2, period: "P1" },
];

// Data: Section Comparison with Present vs Absent
const sectionComparisonData = [
  { section: "CS501 (Sec A)", present: 36, absent: 4, rate: 90.0, enrolled: 40 },
  { section: "CS502 (Sec B)", present: 34, absent: 6, rate: 85.0, enrolled: 40 },
  { section: "CS503 (Sec A)", present: 31, absent: 9, rate: 77.5, enrolled: 40 },
  { section: "CS504 (Sec C)", present: 37, absent: 3, rate: 92.5, enrolled: 40 },
];

// Data: Cohort Risk Tier Distribution
const cohortRiskData = [
  { name: "Safe (≥ 85%)", value: 112, color: "#10b981", pct: "70%" },
  { name: "Watchlist (75-84%)", value: 34, color: "#f59e0b", pct: "21%" },
  { name: "Critical (< 75%)", value: 14, color: "#f43f5e", pct: "9%" },
];

// Data: Day-of-the-Week Attendance Patterns
const dayOfWeekData = [
  { day: "Monday", rate: 92.4, color: "#3b82f6" },
  { day: "Tuesday", rate: 94.0, color: "#3b82f6" },
  { day: "Wednesday", rate: 89.8, color: "#3b82f6" },
  { day: "Thursday", rate: 91.2, color: "#3b82f6" },
  { day: "Friday", rate: 82.5, color: "#f43f5e" }, // Friday afternoon drop
];

const emptySubscribe = () => () => {};

export function TeacherAnalyticsVisuals() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [activeTab, setActiveTab] = useState<"trends" | "sections" | "cohorts">("trends");

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-80 rounded-3xl bg-slate-100 animate-pulse" />
        <div className="lg:col-span-4 h-80 rounded-3xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6" data-ui="teacher-analytics-visuals">
      {/* Visual Analytics Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-chillax text-base font-bold text-slate-900 tracking-tight">
              Class Attendance Analytics & Visual Intelligence
            </h3>
            <p className="text-xs text-slate-500">
              Interactive attendance velocity, section breakdowns, and student risk triage.
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab("trends")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "trends"
                ? "bg-white text-blue-600 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Velocity Trend
          </button>
          <button
            onClick={() => setActiveTab("sections")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "sections"
                ? "bg-white text-blue-600 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Section Comparison
          </button>
          <button
            onClick={() => setActiveTab("cohorts")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "cohorts"
                ? "bg-white text-blue-600 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Risk Triage
          </button>
        </div>
      </div>

      {/* PRIMARY CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Chart Canvas (8 Columns) */}
        <Card className="lg:col-span-8 border-slate-200/80 bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-chillax text-base tracking-tight flex items-center space-x-2">
                  <span>
                    {activeTab === "trends"
                      ? "Session Attendance Velocity (Last 14 Days)"
                      : activeTab === "sections"
                      ? "Course & Section Comparative Performance"
                      : "Cohort Risk Triage Distribution"}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  {activeTab === "trends"
                    ? "Session-by-session attendance percentages. 85% requirement baseline indicated in amber."
                    : activeTab === "sections"
                    ? "Present vs Absent volume comparison across enrolled sections."
                    : "Breakdown of students requiring academic counselor check-ins."}
                </CardDescription>
              </div>

              <Badge variant="outline" className="text-xs font-bold bg-slate-50">
                Fall 2026
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="pt-3 pb-5">
            {activeTab === "trends" && (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sessionTrendData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="teacherTrendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop stopColor="#3b82f6" stopOpacity={0.35} />
                        <stop stopColor="#3b82f6" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="date"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[60, 100]}
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-xl text-xs space-y-1">
                              <p className="font-bold text-slate-900">
                                {data.date} • {data.period}
                              </p>
                              <div className="flex items-center space-x-2 text-blue-600 font-extrabold text-sm">
                                <span>{data.rate}% Attendance</span>
                              </div>
                              <div className="flex items-center space-x-3 text-slate-500 pt-1 text-[11px] font-medium border-t border-slate-100">
                                <span className="text-emerald-600 font-bold">{data.present} Present</span>
                                <span className="text-rose-600 font-bold">{data.absent} Absent</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      y={85}
                      stroke="#f59e0b"
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: "85% Requirement",
                        position: "insideTopRight",
                        fill: "#d97706",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="#2563eb"
                      strokeWidth={2.8}
                      fillOpacity={1}
                      fill="url(#teacherTrendGrad)"
                      activeDot={{ r: 6, fill: "#1d4ed8", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === "sections" && (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectionComparisonData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="section"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 shadow-xl text-xs space-y-1">
                              <p className="font-bold text-slate-900">{data.section}</p>
                              <p className="text-blue-600 font-bold">
                                Attendance Rate: {data.rate}%
                              </p>
                              <div className="flex items-center space-x-3 text-[11px] pt-1 border-t border-slate-100">
                                <span className="text-emerald-600 font-semibold">
                                  {data.present} Present
                                </span>
                                <span className="text-rose-600 font-semibold">
                                  {data.absent} Absent
                                </span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      align="right"
                      wrapperStyle={{ paddingBottom: 10, fontSize: 11 }}
                    />
                    <Bar dataKey="present" name="Present Students" fill="#10b981" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="absent" name="Absent Students" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === "cohorts" && (
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-slate-200 shadow-lg text-xs">
                              <span className="font-bold text-slate-900">{data.name}</span>
                              <div className="text-slate-600 mt-0.5">
                                {data.value} Students ({data.pct})
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
                    <Pie
                      data={cohortRiskData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                    >
                      {cohortRiskData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Secondary Insight: Day-of-Week Attendance Intelligence (4 Columns) */}
        <Card className="lg:col-span-4 border-slate-200/80 bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="font-chillax text-base tracking-tight">
                Weekday Dropoff Pattern
              </CardTitle>
              <Calendar className="h-4 w-4 text-slate-400" />
            </div>
            <CardDescription className="text-xs text-slate-500">
              Aggregated attendance rates by lecture weekday.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            <div className="space-y-3">
              {dayOfWeekData.map((item) => (
                <div key={item.day} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700">{item.day}</span>
                    <span
                      className={`tabular-nums font-bold ${
                        item.rate >= 85 ? "text-slate-900" : "text-rose-600"
                      }`}
                    >
                      {item.rate}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.rate >= 85
                          ? "bg-gradient-to-r from-blue-600 to-indigo-500"
                          : "bg-gradient-to-r from-rose-500 to-amber-500"
                      }`}
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Diagnostic Callout */}
            <div className="rounded-2xl p-3 bg-amber-50/80 border border-amber-200/70 text-amber-900 flex items-start space-x-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold">Noticeable Friday Slump:</span> Attendance drops by <strong>9.9%</strong> on Friday afternoons. Consider rescheduling critical lab quizzes to mid-week.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
