"use client";

import React, { useState, useEffect } from "react";
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
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Target,
  Clock,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StudentVisualsProps {
  subjects: Array<{
    code: string;
    name: string;
    present: number;
    totalHeld: number;
    pct: number | null;
  }>;
  overallPct: number | null;
  totalPresent: number;
  totalAbsent: number;
  totalHeld: number;
}

// 6-Week Attendance Trajectory Data
const weeklyTrajectoryData = [
  { week: "Wk 1", rate: 91.6, present: 11, total: 12 },
  { week: "Wk 2", rate: 87.5, present: 14, total: 16 },
  { week: "Wk 3", rate: 78.5, present: 11, total: 14 }, // illness week dip
  { week: "Wk 4", rate: 81.2, present: 13, total: 16 },
  { week: "Wk 5", rate: 84.0, present: 16, total: 19 },
  { week: "Wk 6", rate: 86.8, present: 17, total: 20 }, // recovering
];

export function StudentAnalyticsVisuals({
  subjects,
  overallPct,
  totalPresent,
  totalAbsent,
  totalHeld,
}: StudentVisualsProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"comparison" | "trend">("comparison");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-80 rounded-3xl bg-slate-100 animate-pulse" />
        <div className="lg:col-span-4 h-80 rounded-3xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  // Format subjects for recharts
  const subjectChartData = subjects
    .filter((s) => s.totalHeld > 0 && s.pct !== null)
    .map((s) => ({
      code: s.code,
      name: s.name,
      rate: Number(s.pct?.toFixed(1)),
      present: s.present,
      absent: s.totalHeld - s.present,
      total: s.totalHeld,
      fill:
        (s.pct || 0) >= 85
          ? "#10b981"
          : (s.pct || 0) >= 75
          ? "#f59e0b"
          : "#f43f5e",
    }));

  const compositionData = [
    { name: "Classes Attended", value: totalPresent, color: "#10b981" },
    { name: "Classes Missed", value: totalAbsent, color: "#f43f5e" },
  ];

  return (
    <div className="space-y-6" data-ui="student-analytics-visuals">
      {/* Visual Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-chillax text-base font-bold text-slate-900 tracking-tight">
              Personal Attendance Analytics & Performance Trajectory
            </h3>
            <p className="text-xs text-slate-500">
              Interactive course standing against 85% requirement and weekly recovery curve.
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "comparison"
                ? "bg-white text-indigo-600 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Subject Standing
          </button>
          <button
            onClick={() => setActiveTab("trend")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "trend"
                ? "bg-white text-indigo-600 shadow-xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            6-Week Velocity
          </button>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Subject Chart (8 Columns) */}
        <Card className="lg:col-span-8 border-slate-200/80 bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-chillax text-base tracking-tight">
                  {activeTab === "comparison"
                    ? "Course Attendance vs 85% College Requirement"
                    : "6-Week Attendance Recovery Trajectory"}
                </CardTitle>
                <CardDescription className="text-xs text-slate-500 mt-0.5">
                  {activeTab === "comparison"
                    ? "Green indicates compliant status (≥ 85%), Amber is borderline (75-84%), Red is critical (< 75%)."
                    : "Track your week-over-week attendance velocity and upward recovery trend."}
                </CardDescription>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                Overall: {overallPct !== null ? `${overallPct.toFixed(1)}%` : "N/A"}
              </span>
            </div>
          </CardHeader>

          <CardContent className="pt-3 pb-5">
            {activeTab === "comparison" ? (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={subjectChartData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="code"
                      tick={{ fontSize: 11, fill: "#64748b" }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
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
                                {data.code}: {data.name}
                              </p>
                              <p className="text-indigo-600 font-extrabold text-sm">
                                {data.rate}% Attendance
                              </p>
                              <div className="flex items-center space-x-3 text-slate-500 pt-1 text-[11px] font-medium border-t border-slate-100">
                                <span className="text-emerald-600 font-bold">{data.present} Present</span>
                                <span className="text-rose-600 font-bold">{data.absent} Absent</span>
                                <span>{data.total} Total</span>
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
                        value: "85% Requirement Threshold",
                        position: "insideTopRight",
                        fill: "#d97706",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <ReferenceLine
                      y={75}
                      stroke="#f43f5e"
                      strokeDasharray="3 3"
                      strokeWidth={1}
                      label={{
                        value: "75% Strict Minimum",
                        position: "insideBottomRight",
                        fill: "#e11d48",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <Bar dataKey="rate" name="Attendance %" radius={[6, 6, 0, 0]}>
                      {subjectChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyTrajectoryData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="studentTrendGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop stopColor="#6366f1" stopOpacity={0.35} />
                        <stop stopColor="#6366f1" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="week"
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
                              <p className="font-bold text-slate-900">{data.week}</p>
                              <p className="text-indigo-600 font-extrabold text-sm">
                                {data.rate}% Attendance
                              </p>
                              <p className="text-slate-500 text-[11px] pt-1 border-t border-slate-100">
                                {data.present} of {data.total} lectures attended
                              </p>
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
                        value: "85% Target Line",
                        position: "insideTopRight",
                        fill: "#d97706",
                        fontSize: 10,
                        fontWeight: 600,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="rate"
                      stroke="#6366f1"
                      strokeWidth={2.8}
                      fillOpacity={1}
                      fill="url(#studentTrendGrad)"
                      activeDot={{ r: 6, fill: "#4f46e5", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Aggregate Ratio Donut Chart (4 Columns) */}
        <Card className="lg:col-span-4 border-slate-200/80 bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="font-chillax text-base tracking-tight">
              Attendance Distribution
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Total class attendance ratio across all registered subjects.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-2">
            {/* Center Donut Graphic */}
            <div className="relative h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl border border-slate-200 shadow-md text-xs">
                            <span className="font-bold text-slate-900">{data.name}: </span>
                            <span className="font-extrabold">{data.value} classes</span>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={compositionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                  >
                    {compositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute flex flex-col items-center pointer-events-none">
                <span className="font-chillax text-xl font-extrabold text-slate-900 tabular-nums">
                  {overallPct !== null ? `${overallPct.toFixed(1)}%` : "0%"}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">Total Score</span>
              </div>
            </div>

            {/* Breakdown Legend */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-600 font-medium">Present Lectures</span>
                </span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {totalPresent} classes ({totalHeld > 0 ? ((totalPresent / totalHeld) * 100).toFixed(0) : 0}%)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center space-x-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="text-slate-600 font-medium">Missed Lectures</span>
                </span>
                <span className="font-bold text-slate-900 tabular-nums">
                  {totalAbsent} classes ({totalHeld > 0 ? ((totalAbsent / totalHeld) * 100).toFixed(0) : 0}%)
                </span>
              </div>
            </div>

            {/* Motivational Status Badge */}
            <div className="rounded-2xl p-3 bg-indigo-50/80 border border-indigo-100 text-indigo-900 flex items-center space-x-2 text-xs">
              <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
              <span>
                {overallPct && overallPct >= 85
                  ? "Outstanding! You are safely above the college examination requirement."
                  : "Keep attending upcoming sessions to return to the 85% safe zone!"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
