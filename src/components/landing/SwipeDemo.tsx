"use client";

import React, { useState } from "react";
import { Check, X, RotateCcw, Sparkles, User, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoStudent {
  id: string;
  name: string;
  srn: string;
  department: string;
  semester: string;
  section: string;
  status: string;
}

const DEMO_STUDENTS: DemoStudent[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    srn: "22CS1056",
    department: "Computer Science & Engineering",
    semester: "5th Sem",
    section: "Section A",
    status: "Regular",
  },
  {
    id: "2",
    name: "Diya Patel",
    srn: "22CS1057",
    department: "Computer Science & Engineering",
    semester: "5th Sem",
    section: "Section A",
    status: "Regular",
  },
  {
    id: "3",
    name: "Rohan Deshmukh",
    srn: "22CS1058",
    department: "Computer Science & Engineering",
    semester: "5th Sem",
    section: "Section A",
    status: "Regular",
  },
  {
    id: "4",
    name: "Ananya Iyer",
    srn: "22CS1059",
    department: "Computer Science & Engineering",
    semester: "5th Sem",
    section: "Section A",
    status: "Regular",
  },
  {
    id: "5",
    name: "Vikram Malhotra",
    srn: "22CS1060",
    department: "Computer Science & Engineering",
    semester: "5th Sem",
    section: "Section A",
    status: "Regular",
  },
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
    <div data-ui="swipe-demo" className="relative mx-auto w-full max-w-md select-none">
      
      {/* 3D Stack Stage */}
      <div className="relative flex items-center justify-center min-h-[420px] sm:min-h-[460px]">

        {/* LEFT CARD (Absent Ghost Tilted Card) */}
        <div
          data-ui="ghost-card"
          className="absolute left-1/2 -translate-x-[74%] sm:-translate-x-[70%] top-2 w-[260px] sm:w-[290px] aspect-[3/4] rounded-[32px] bg-rose-100 border-2 border-rose-200/60 rotate-[-10deg] scale-90 -z-10 pointer-events-none p-3.5 flex flex-col justify-between"
        >
          <div className="w-full aspect-[4/3] rounded-[22px] bg-rose-200/50 flex items-center justify-center">
            <div className="h-14 w-14 rounded-full bg-rose-500 text-white ring-4 ring-rose-200/70 flex items-center justify-center">
              <X className="h-7 w-7 stroke-[3]" />
            </div>
          </div>
          <div className="text-center pb-2 opacity-40">
            <div className="h-4 w-24 bg-rose-300 rounded-full mx-auto" />
            <div className="h-3 w-14 bg-rose-200 rounded-full mx-auto mt-2" />
          </div>
        </div>

        {/* RIGHT CARD (Present Ghost Tilted Card) */}
        <div
          data-ui="ghost-card"
          className="absolute left-1/2 -translate-x-[26%] sm:-translate-x-[30%] top-2 w-[260px] sm:w-[290px] aspect-[3/4] rounded-[32px] bg-emerald-100 border-2 border-emerald-200/60 rotate-[10deg] scale-90 -z-10 pointer-events-none p-3.5 flex flex-col justify-between"
        >
          <div className="w-full aspect-[4/3] rounded-[22px] bg-emerald-200/50 flex items-center justify-center">
            <div className="h-14 w-14 rounded-full bg-emerald-500 text-white ring-4 ring-emerald-200/70 flex items-center justify-center">
              <Check className="h-7 w-7 stroke-[3]" />
            </div>
          </div>
          <div className="text-center pb-2 opacity-40">
            <div className="h-4 w-24 bg-emerald-300 rounded-full mx-auto" />
            <div className="h-3 w-14 bg-emerald-200 rounded-full mx-auto mt-2" />
          </div>
        </div>

        {/* LEFT SWIPE ACTION TRIGGER */}
        <div className="hidden sm:flex flex-col items-center absolute -left-8 lg:-left-12 z-20">
          <button
            onClick={() => handleDecision("absent")}
            className="h-11 w-11 rounded-full bg-rose-50 border border-rose-200 text-rose-500 hover:bg-rose-100 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
            title="Swipe Left: Absent"
          >
            <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
          </button>
          <span className="mt-2 text-xs font-bold text-rose-600">Swipe Left</span>
          <span className="text-[10px] font-medium text-rose-400">Mark Absent</span>

          {/* Curved Arrow Vector pointing left */}
          <svg className="w-10 h-5 text-rose-400 mt-1" viewBox="0 0 50 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M 45 5 C 30 25, 10 20, 5 12" />
            <polyline points="2,16 5,12 11,14" />
          </svg>
        </div>

        {/* CENTER ACTIVE CARD */}
        {!isFinished ? (
          <div
            data-ui="active-card"
            className={`relative z-20 w-full max-w-[300px] sm:max-w-[330px] rounded-[32px] bg-white p-3.5 sm:p-4 border border-slate-200 transition-colors duration-200 ${
              lastAction === "present"
                ? "border-emerald-300 ring-2 ring-emerald-100"
                : lastAction === "absent"
                ? "border-rose-300 ring-2 ring-rose-100"
                : ""
            }`}
          >
            {/* Empty Photo Placeholder Area */}
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-slate-100 border border-slate-200/60 flex flex-col items-center justify-center text-slate-400">
              <div className="h-16 w-16 rounded-full bg-slate-200/80 border border-white/60 flex items-center justify-center text-slate-400">
                <User className="h-8 w-8 text-slate-400" />
              </div>

              {/* Floating Counter Badge in Top-Right */}
              <div className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-slate-700 border border-slate-200">
                {currentIndex + 1}/{DEMO_STUDENTS.length}
              </div>
            </div>

            {/* Student Info */}
            <div className="pt-4 pb-2 text-center">
              <h3 className="font-chillax text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentStudent.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 tabular-nums">
                {currentStudent.srn}
              </p>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                {currentStudent.department}
              </p>

              {/* Badges Pill Row */}
              <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 border border-blue-100/80">
                  {currentStudent.semester}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 border border-slate-200">
                  {currentStudent.section}
                </span>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 border border-emerald-100/80">
                  {currentStudent.status}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div data-ui="completed-card" className="relative z-20 w-full max-w-[320px] rounded-[32px] bg-white p-6 border border-slate-200 text-center">
            <div className="h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="h-7 w-7" />
            </div>
            <h4 className="font-chillax text-lg font-bold text-slate-900">Batch Completed!</h4>
            <p className="text-xs text-slate-500 mt-1 tabular-nums">
              {presentCount} present, {absentCount} absent.
            </p>
            <Button size="sm" variant="outline" className="mt-4 rounded-xl" onClick={handleReset}>
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Replay Demo
            </Button>
          </div>
        )}

        {/* RIGHT SWIPE ACTION TRIGGER */}
        <div className="hidden sm:flex flex-col items-center absolute -right-8 lg:-right-12 z-20">
          <button
            onClick={() => handleDecision("present")}
            className="h-11 w-11 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer"
            title="Swipe Right: Present"
          >
            <ArrowRight className="h-5 w-5 stroke-[2.5]" />
          </button>
          <span className="mt-2 text-xs font-bold text-emerald-600">Swipe Right</span>
          <span className="text-[10px] font-medium text-emerald-400">Mark Present</span>

          {/* Curved Arrow Vector pointing right */}
          <svg className="w-10 h-5 text-emerald-400 mt-1" viewBox="0 0 50 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M 5 5 C 20 25, 40 20, 45 12" />
            <polyline points="48,16 45,12 39,14" />
          </svg>
        </div>
      </div>

      {/* Pagination Dots Indicator */}
      <div className="flex items-center justify-center space-x-1.5 mt-3">
        {DEMO_STUDENTS.map((_, dotIdx) => {
          const isActive = (currentIndex % DEMO_STUDENTS.length) === dotIdx;
          return (
            <div
              key={dotIdx}
              className={`rounded-full transition-colors duration-200 ${
                isActive
                  ? "w-2.5 h-2.5 bg-blue-600"
                  : "w-1.5 h-1.5 bg-blue-200/80"
              }`}
            />
          );
        })}
      </div>

      {/* Action Buttons for Mobile */}
      {!isFinished && (
        <div className="grid grid-cols-3 gap-2.5 mt-4 max-w-xs mx-auto">
          <Button
            variant="destructive"
            className="py-3 rounded-2xl text-xs font-bold"
            onClick={() => handleDecision("absent")}
          >
            <X className="h-4 w-4 mr-1 stroke-[3]" /> Absent
          </Button>
          <Button
            variant="outline"
            disabled={currentIndex === 0}
            className="py-3 rounded-2xl text-slate-600"
            onClick={handleUndo}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="success"
            className="py-3 rounded-2xl text-xs font-bold"
            onClick={() => handleDecision("present")}
          >
            <Check className="h-4 w-4 mr-1 stroke-[3]" /> Present
          </Button>
        </div>
      )}
    </div>
  );
}
