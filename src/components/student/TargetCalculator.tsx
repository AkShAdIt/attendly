"use client";

import React, { useState } from "react";
import { Calculator, Sparkles, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculateConsecutiveClassesNeeded } from "@/lib/attendance";

interface TargetCalculatorProps {
  presentCount: number;
  totalHeld: number;
  initialTarget?: number;
}

export function TargetCalculator({
  presentCount,
  totalHeld,
  initialTarget = 85,
}: TargetCalculatorProps) {
  const [target, setTarget] = useState(initialTarget);

  const projection = calculateConsecutiveClassesNeeded(
    presentCount,
    totalHeld,
    target
  );

  return (
    <Card className="border-slate-200/80 bg-white shadow-xs">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-2xs">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg">Consecutive Attendance Calculator</CardTitle>
              <CardDescription>
                Project future classes required to reach your target percentage.
              </CardDescription>
            </div>
          </div>
          <Badge variant={projection.isAlreadyAchieved ? "present" : "draft"} className="self-start sm:self-auto">
            Target: {target}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Target Slider */}
        <div className="space-y-2.5 p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Minimum Attendance Target</span>
            <span className="text-sm font-bold text-slate-900 tabular-nums">{target}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="95"
            step="1"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>60%</span>
            <span className="text-slate-600 font-medium">75% (Min)</span>
            <span className="text-blue-700 font-semibold">85% (College Req)</span>
            <span>95% (Honors)</span>
          </div>
        </div>

        {/* Calculation Result Callout */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            projection.isAlreadyAchieved
              ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
              : projection.canAchieve
              ? "bg-amber-50/80 border-amber-200 text-amber-950"
              : "bg-rose-50/80 border-rose-200 text-rose-950"
          }`}
        >
          <div className="flex items-start space-x-3">
            {projection.isAlreadyAchieved ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : projection.canAchieve ? (
              <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <h4 className="text-sm font-bold tracking-tight">
                {projection.isAlreadyAchieved
                  ? "Target Goal Achieved!"
                  : `Need ${projection.classesNeeded} Consecutive Classes`}
              </h4>
              <p className="mt-1 text-xs sm:text-sm opacity-90 leading-relaxed">
                {projection.message}
              </p>

              {!projection.isAlreadyAchieved && projection.canAchieve && (
                <div className="mt-3 text-xs font-mono font-medium pt-2.5 border-t border-amber-200/70 text-amber-900">
                  Formula: ({presentCount} present + {projection.classesNeeded} future) / ({totalHeld} total + {projection.classesNeeded} future) = {target}%
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

