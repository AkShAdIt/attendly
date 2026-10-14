"use client";

import React, { useState } from "react";
import { Check, X, RotateCcw, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DemoStudent {
  id: string;
  name: string;
  srn: string;
  avatarBg: string;
}

const DEMO_STUDENTS: DemoStudent[] = [
  { id: "1", name: "Aarav Sharma", srn: "ENG22CS001", avatarBg: "bg-blue-600" },
  { id: "2", name: "Diya Patel", srn: "ENG22CS002", avatarBg: "bg-indigo-600" },
  { id: "3", name: "Rohan Deshmukh", srn: "ENG22CS003", avatarBg: "bg-emerald-600" },
  { id: "4", name: "Ananya Iyer", srn: "ENG22CS004", avatarBg: "bg-amber-600" },
  { id: "5", name: "Vikram Malhotra", srn: "ENG22CS005", avatarBg: "bg-purple-600" },
];

export function SwipeDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<Array<{ id: string; status: "present" | "absent" }>>([]);
  const [lastAction, setLastAction] = useState<"present" | "absent" | null>(null);

  const currentStudent = DEMO_STUDENTS[currentIndex];
  const isFinished = currentIndex >= DEMO_STUDENTS.length;

  const handleDecision = (status: "present" | "absent") => {
    if (isFinished) return;
    setLastAction(status);
    setHistory((prev) => [...prev, { id: currentStudent.id, status }]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
    setHistory((prev) => prev.slice(0, -1));
    setLastAction(null);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setHistory([]);
    setLastAction(null);
  };

  const presentCount = history.filter((h) => h.status === "present").length;
  const absentCount = history.filter((h) => h.status === "absent").length;

  return (
    <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-slate-200/90 bg-white p-5 shadow-2xl shadow-blue-900/10 transition-all">
      {/* Phone Header Indicator */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">Interactive Demo</span>
        </div>
        <span className="text-xs font-medium text-slate-400">
          CS301 • Section A
        </span>
      </div>

      {/* Progress Counter */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>Student {Math.min(currentIndex + 1, DEMO_STUDENTS.length)} of {DEMO_STUDENTS.length}</span>
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-emerald-600">{presentCount} Present</span>
          <span>•</span>
          <span className="font-semibold text-rose-600">{absentCount} Absent</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${(currentIndex / DEMO_STUDENTS.length) * 100}%` }}
        />
      </div>

      {/* Card Arena */}
      <div className="relative my-4 flex h-64 items-center justify-center">
        {!isFinished ? (
          <div
            className={`w-full h-full rounded-2xl border border-slate-200/90 bg-slate-50/70 p-5 flex flex-col items-center justify-between shadow-sm transition-all duration-200 ${
              lastAction === "present"
                ? "border-emerald-300 bg-emerald-50/30"
                : lastAction === "absent"
                ? "border-rose-300 bg-rose-50/30"
                : ""
            }`}
          >
            <div className="flex w-full justify-between items-start">
              <Badge variant="outline" className="text-slate-500 font-mono">
                {currentStudent.srn}
              </Badge>
              <span className="text-xs text-slate-400 font-medium">Roll #{currentIndex + 1}</span>
            </div>

            <div className="flex flex-col items-center my-auto">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-md mb-3 ${currentStudent.avatarBg}`}
              >
                {currentStudent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h4 className="text-lg font-bold text-slate-800 text-center">
                {currentStudent.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">Computer Science & Engineering</p>
            </div>

            <div className="flex w-full justify-between text-[11px] font-medium text-slate-400">
              <span className="text-rose-500 flex items-center">
                <X className="w-3 h-3 mr-0.5" /> Swipe Left (Absent)
              </span>
              <span className="text-emerald-600 flex items-center">
                Swipe Right (Present) <Check className="w-3 h-3 ml-0.5" />
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-2">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800">Attendance Completed!</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-[220px]">
              {presentCount} present, {absentCount} absent. Ready for instant atomic submission.
            </p>
            <Button size="sm" variant="outline" className="mt-4" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Replay Demo
            </Button>
          </div>
        )}
      </div>

      {/* Decision Buttons (for touch & click simulation) */}
      {!isFinished ? (
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="destructive"
            className="flex items-center justify-center py-3"
            onClick={() => handleDecision("absent")}
          >
            <X className="h-4 w-4 mr-1" /> Absent
          </Button>
          <Button
            variant="outline"
            disabled={currentIndex === 0}
            className="flex items-center justify-center"
            onClick={handleUndo}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="success"
            className="flex items-center justify-center py-3"
            onClick={() => handleDecision("present")}
          >
            <Check className="h-4 w-4 mr-1" /> Present
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <Button className="w-full" variant="default" onClick={handleReset}>
            <UserCheck className="h-4 w-4 mr-2" /> Start Another Class
          </Button>
        </div>
      )}
    </div>
  );
}
