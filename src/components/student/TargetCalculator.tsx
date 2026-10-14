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
    <Card className="border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">Consecutive Attendance Calculator</CardTitle>
              <CardDescription>
                Project future classes required to reach your target percentage.
              </CardDescription>
            </div>
          </div>
          <Badge variant={projection.isAlreadyAchieved ? "present" : "draft"}>
            Target: {target}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Target Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Minimum Attendance Target</span>
            <span className="text-sm font-bold text-blue-600">{target}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="95"
            step="1"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>60%</span>
            <span>75% (Standard)</span>
            <span>85% (College Req)</span>
            <span>95% (Honors)</span>
          </div>
        </div>

        {/* Calculation Result Callout */}
        <div
          className={`p-5 rounded-2xl border transition-all ${
            projection.isAlreadyAchieved
              ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
              : projection.canAchieve
              ? "bg-amber-50/70 border-amber-200 text-amber-900"
              : "bg-rose-50/70 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-start space-x-3">
            {projection.isAlreadyAchieved ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            ) : projection.canAchieve ? (
              <Sparkles className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <h4 className="text-sm font-bold">
                {projection.isAlreadyAchieved
                  ? "Target Goal Achieved!"
                  : `Need ${projection.classesNeeded} Consecutive Classes`}
              </h4>
              <p className="mt-1 text-xs opacity-90 leading-relaxed">
                {projection.message}
              </p>

              {!projection.isAlreadyAchieved && projection.canAchieve && (
                <div className="mt-3 text-xs font-mono font-medium pt-2 border-t border-amber-200/80">
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
