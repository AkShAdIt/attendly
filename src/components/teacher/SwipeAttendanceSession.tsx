"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  RotateCcw,
  Sparkles,
  ListFilter,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  User,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";

export interface StudentCardData {
  id: string;
  name: string;
  srn: string;
  rollNumber: string;
  semester?: number | string;
  section?: string;
  department?: string;
  statusType?: string;
  photoUrl?: string; // empty placeholder for now, to be retrieved from database later
  avatarBg?: string;
}

export type DecisionStatus = "present" | "absent";

interface SwipeAttendanceSessionProps {
  sectionName: string;
  subjectName: string;
  subjectCode: string;
  sessionDate: string;
  period: number;
  students: StudentCardData[];
  onSessionSubmitted?: (results: {
    sessionId: string;
    presentIds: string[];
    absentIds: string[];
  }) => void;
}

export function SwipeAttendanceSession({
  sectionName,
  subjectName,
  subjectCode,
  sessionDate,
  period,
  students,
  onSessionSubmitted,
}: SwipeAttendanceSessionProps) {
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"swipe" | "roster">("swipe");
  const [decisions, setDecisions] = useState<Record<string, DecisionStatus>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  // Review modal & submission state
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Swipe drag gesture physics
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const currentStudent = students[currentIndex];
  const nextStudent = students[currentIndex + 1];
  const isAllMarked = students.every((s) => decisions[s.id] !== undefined);

  const markDecision = (studentId: string, status: DecisionStatus) => {
    setDecisions((prev) => ({ ...prev, [studentId]: status }));
    setHistory((prev) => [...prev, studentId]);

    if (viewMode === "swipe" && currentIndex < students.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastStudentId = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    setDecisions((prev) => {
      const updated = { ...prev };
      delete updated[lastStudentId];
      return updated;
    });

    const studentIdx = students.findIndex((s) => s.id === lastStudentId);
    if (studentIdx !== -1) {
      setCurrentIndex(studentIdx);
    }
  };

  const handleMarkAllRemainingPresent = () => {
    const updated = { ...decisions };
    const newlyMarked: string[] = [];
    students.forEach((s) => {
      if (!updated[s.id]) {
        updated[s.id] = "present";
        newlyMarked.push(s.id);
      }
    });
    setDecisions(updated);
    setHistory((prev) => [...prev, ...newlyMarked]);
    setCurrentIndex(students.length - 1);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReviewOpen || isSuccess) return;

      if (e.key === "ArrowRight") {
        if (currentStudent) markDecision(currentStudent.id, "present");
      } else if (e.key === "ArrowLeft") {
        if (currentStudent) markDecision(currentStudent.id, "absent");
      } else if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isReviewOpen, isSuccess, currentStudent]);

  // Touch gesture listeners
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > 85 && currentStudent) {
      markDecision(currentStudent.id, "present");
    } else if (dragOffset < -85 && currentStudent) {
      markDecision(currentStudent.id, "absent");
    }
    setDragOffset(0);
  };

  // Mouse drag support for desktop simulation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > 85 && currentStudent) {
      markDecision(currentStudent.id, "present");
    } else if (dragOffset < -85 && currentStudent) {
      markDecision(currentStudent.id, "absent");
    }
    setDragOffset(0);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    const presentIds = Object.keys(decisions).filter((id) => decisions[id] === "present");
    const absentIds = Object.keys(decisions).filter((id) => decisions[id] === "absent");

    setTimeout(() => {
      setIsSubmitting(false);
      setIsReviewOpen(false);
      setIsSuccess(true);

      if (onSessionSubmitted) {
        onSessionSubmitted({
          sessionId: `sess-${Date.now()}`,
          presentIds,
          absentIds,
        });
      }
    }, 800);
  };

  const presentCount = Object.values(decisions).filter((s) => s === "present").length;
  const absentCount = Object.values(decisions).filter((s) => s === "absent").length;
  const markedCount = Object.keys(decisions).length;
  const progressPercent = (markedCount / students.length) * 100;

  // Visual card rotation & physics
  const cardRotation = (dragOffset / 22).toFixed(1);
  const cardOpacity = Math.max(0.65, 1 - Math.abs(dragOffset) / 350);

  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto p-8 text-center border-emerald-200 bg-white shadow-2xl rounded-3xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Attendance Submitted!</h2>
        <p className="mt-2 text-sm text-slate-600">
          Official attendance for <strong>{subjectCode} ({sectionName})</strong> has been persisted transactionally.
        </p>

        <div className="my-6 grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <div className="text-2xl font-bold text-emerald-600">{presentCount}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase mt-0.5">Present</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-rose-600">{absentCount}</div>
            <div className="text-xs text-slate-500 font-semibold uppercase mt-0.5">Absent</div>
          </div>
        </div>

        <Button
          className="w-full rounded-2xl py-3.5"
          onClick={() => router.push("/teacher")}
        >
          Return to Teacher Dashboard
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full space-y-5">
      {/* Session Metadata Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 leading-tight">
            {subjectCode} — {sectionName}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {sessionDate} • Period {period}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button
            onClick={() => setViewMode("swipe")}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "swipe" ? "bg-white text-blue-600 shadow-xs" : "text-slate-500"
            }`}
            title="Card Swipe View"
          >
            <CreditCard className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("roster")}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "roster" ? "bg-white text-blue-600 shadow-xs" : "text-slate-500"
            }`}
            title="Roster Checklist View"
          >
            <ListFilter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress & Live Stats Bar */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600">
            {markedCount} of {students.length} Marked ({Math.round(progressPercent)}%)
          </span>
          <div className="flex items-center space-x-2.5">
            <span className="text-emerald-600 font-bold">{presentCount} Present</span>
            <span className="text-slate-300">•</span>
            <span className="text-rose-600 font-bold">{absentCount} Absent</span>
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* SWIPE CARD DECK (MATCHING REFERENCE UI) */}
      {viewMode === "swipe" && currentStudent && (
        <div className="relative py-4 sm:py-6 overflow-hidden">
          
          {/* Main 3D Card Stage */}
          <div className="relative flex items-center justify-center min-h-[440px] sm:min-h-[480px]">

            {/* LEFT BACKGROUND CARD (Absent Representation - Rotated & Tilted) */}
            <div
              className="absolute left-1/2 -translate-x-[72%] sm:-translate-x-[68%] top-3 w-[280px] sm:w-[320px] aspect-[3/4] rounded-[32px] bg-linear-to-br from-rose-100/90 to-rose-200/70 border-2 border-rose-200/60 shadow-xl shadow-rose-900/5 rotate-[-10deg] scale-90 -z-10 transition-all pointer-events-none p-3.5 flex flex-col justify-between"
            >
              {/* Ghost Photo Placeholder */}
              <div className="w-full aspect-[4/3] rounded-[22px] bg-rose-200/50 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-rose-500 text-white shadow-xl shadow-rose-500/40 ring-4 ring-rose-200/70 flex items-center justify-center">
                  <X className="h-8 w-8 stroke-[3]" />
                </div>
              </div>

              {/* Ghost text */}
              <div className="text-center pb-2 opacity-50">
                <div className="h-4 w-28 bg-rose-300/60 rounded-full mx-auto" />
                <div className="h-3 w-16 bg-rose-200 rounded-full mx-auto mt-2" />
              </div>
            </div>

            {/* RIGHT BACKGROUND CARD (Present Representation - Rotated & Tilted) */}
            <div
              className="absolute left-1/2 -translate-x-[28%] sm:-translate-x-[32%] top-3 w-[280px] sm:w-[320px] aspect-[3/4] rounded-[32px] bg-linear-to-bl from-emerald-100/90 to-emerald-200/70 border-2 border-emerald-200/60 shadow-xl shadow-emerald-900/5 rotate-[10deg] scale-90 -z-10 transition-all pointer-events-none p-3.5 flex flex-col justify-between"
            >
              {/* Ghost Photo Placeholder */}
              <div className="w-full aspect-[4/3] rounded-[22px] bg-emerald-200/50 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/40 ring-4 ring-emerald-200/70 flex items-center justify-center">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
              </div>

              {/* Ghost text */}
              <div className="text-center pb-2 opacity-50">
                <div className="h-4 w-28 bg-emerald-300/60 rounded-full mx-auto" />
                <div className="h-3 w-16 bg-emerald-200 rounded-full mx-auto mt-2" />
              </div>
            </div>

            {/* LEFT ACTION TRIGGER (Swipe Left / Mark Absent) */}
            <div className="hidden md:flex flex-col items-center absolute left-2 lg:left-6 z-20">
              <button
                onClick={() => markDecision(currentStudent.id, "absent")}
                className="h-12 w-12 rounded-full bg-rose-50 border border-rose-200/80 text-rose-500 hover:bg-rose-100 hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-rose-500/10 cursor-pointer"
                title="Mark Absent (Arrow Left)"
              >
                <ArrowLeft className="h-5 w-5 stroke-[2.5]" />
              </button>
              <span className="mt-2 text-xs font-bold text-rose-600">Swipe Left</span>
              <span className="text-[11px] font-medium text-rose-400">Mark Absent</span>

              {/* Curved Arrow Vector pointing left */}
              <svg className="w-12 h-6 text-rose-400 mt-1" viewBox="0 0 50 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M 45 5 C 30 25, 10 20, 5 12" />
                <polyline points="2,16 5,12 11,14" />
              </svg>
            </div>

            {/* ACTIVE STUDENT CARD (Center foreground) */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative z-20 w-full max-w-[320px] sm:max-w-[350px] rounded-[32px] bg-white p-3.5 sm:p-4 shadow-[0_20px_50px_rgba(15,23,42,0.12)] border border-slate-100 select-none cursor-grab active:cursor-grabbing transition-transform duration-100 ease-out"
              style={{
                transform: `translateX(${dragOffset}px) rotate(${cardRotation}deg)`,
                opacity: cardOpacity,
              }}
            >
              {/* Visual stamp indicators on drag */}
              {dragOffset > 35 && (
                <div className="absolute top-6 left-6 z-30 flex items-center rounded-2xl bg-emerald-500 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-lg animate-in fade-in-50">
                  <Check className="h-4 w-4 mr-1 stroke-[3]" /> PRESENT
                </div>
              )}
              {dragOffset < -35 && (
                <div className="absolute top-6 right-6 z-30 flex items-center rounded-2xl bg-rose-500 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-lg animate-in fade-in-50">
                  ABSENT <X className="h-4 w-4 ml-1 stroke-[3]" />
                </div>
              )}

              {/* Photo Viewport (Empty placeholder ready for database retrieval) */}
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-linear-to-b from-slate-100 to-slate-200/90 border border-slate-200/60 flex flex-col items-center justify-center text-slate-400">
                {currentStudent.photoUrl ? (
                  <img
                    src={currentStudent.photoUrl}
                    alt={currentStudent.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-slate-200/80 border border-white/60 flex items-center justify-center text-slate-400 shadow-inner">
                      <User className="h-10 w-10 text-slate-400" />
                    </div>
                  </div>
                )}

                {/* Floating Index Counter Badge (Top Right) */}
                <div className="absolute top-3 right-3 rounded-full bg-white/80 backdrop-blur-md px-3 py-1 text-xs font-bold text-slate-700 shadow-xs border border-white/60">
                  {currentIndex + 1}/{students.length}
                </div>
              </div>

              {/* Student Identity Information */}
              <div className="pt-4 pb-2 text-center">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currentStudent.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 font-mono">
                  {currentStudent.srn}
                </p>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {currentStudent.department || "Computer Science & Engineering"}
                </p>

                {/* Metadata Pills Row (matching reference UI) */}
                <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600 border border-blue-100/80">
                    {currentStudent.semester ? `${currentStudent.semester}th Sem` : "5th Sem"}
                  </span>
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-[11px] font-semibold text-purple-600 border border-purple-100/80">
                    {currentStudent.section || sectionName}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600 border border-emerald-100/80">
                    {currentStudent.statusType || "Regular"}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT ACTION TRIGGER (Swipe Right / Mark Present) */}
            <div className="hidden md:flex flex-col items-center absolute right-2 lg:right-6 z-20">
              <button
                onClick={() => markDecision(currentStudent.id, "present")}
                className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 hover:bg-emerald-100 hover:scale-110 active:scale-95 transition-all flex items-center justify-center shadow-md shadow-emerald-500/10 cursor-pointer"
                title="Mark Present (Arrow Right)"
              >
                <ArrowRight className="h-5 w-5 stroke-[2.5]" />
              </button>
              <span className="mt-2 text-xs font-bold text-emerald-600">Swipe Right</span>
              <span className="text-[11px] font-medium text-emerald-400">Mark Present</span>

              {/* Curved Arrow Vector pointing right */}
              <svg className="w-12 h-6 text-emerald-400 mt-1" viewBox="0 0 50 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M 5 5 C 20 25, 40 20, 45 12" />
                <polyline points="48,16 45,12 39,14" />
              </svg>
            </div>
          </div>

          {/* Pagination Dots Indicator (Matching Reference Image) */}
          <div className="flex items-center justify-center space-x-1.5 mt-4">
            {Array.from({ length: Math.min(5, students.length) }).map((_, dotIdx) => {
              const isActive = (currentIndex % 5) === dotIdx;
              return (
                <div
                  key={dotIdx}
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-blue-600 shadow-xs"
                      : "w-1.5 h-1.5 bg-blue-200/80"
                  }`}
                />
              );
            })}
          </div>

          {/* Mobile Thumb Action Buttons */}
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto mt-5 px-2">
            <Button
              variant="destructive"
              size="lg"
              className="py-3.5 rounded-2xl text-sm font-bold shadow-md shadow-rose-600/15"
              onClick={() => markDecision(currentStudent.id, "absent")}
            >
              <X className="h-4 w-4 mr-1 stroke-[3]" /> Absent
            </Button>
            <Button
              variant="outline"
              size="lg"
              disabled={history.length === 0}
              className="py-3.5 rounded-2xl text-slate-600"
              onClick={handleUndo}
              title="Undo last action"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="success"
              size="lg"
              className="py-3.5 rounded-2xl text-sm font-bold shadow-md shadow-emerald-600/15"
              onClick={() => markDecision(currentStudent.id, "present")}
            >
              <Check className="h-4 w-4 mr-1 stroke-[3]" /> Present
            </Button>
          </div>
        </div>
      )}

      {/* QUICK ROSTER MODE */}
      {viewMode === "roster" && (
        <Card className="border-slate-200 shadow-sm rounded-2xl">
          <CardHeader className="py-3 px-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Roster View</CardTitle>
              <button
                onClick={handleMarkAllRemainingPresent}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Mark Unmarked as Present
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[380px] overflow-y-auto divide-y divide-slate-100">
            {students.map((s) => {
              const status = decisions[s.id];
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono text-slate-400 w-5">
                      {s.rollNumber}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {s.name}
                      </h4>
                      <span className="text-xs font-mono text-slate-500">{s.srn}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => markDecision(s.id, "absent")}
                      className={`h-9 px-3 rounded-xl text-xs font-bold transition-all ${
                        status === "absent"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-rose-50"
                      }`}
                    >
                      A
                    </button>
                    <button
                      onClick={() => markDecision(s.id, "present")}
                      className={`h-9 px-3 rounded-xl text-xs font-bold transition-all ${
                        status === "present"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50"
                      }`}
                    >
                      P
                    </button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Review & Final Submit Trigger */}
      <div className="pt-2 max-w-sm mx-auto">
        <Button
          className="w-full py-4 text-base rounded-2xl shadow-lg shadow-blue-600/20"
          disabled={!isAllMarked}
          onClick={() => setIsReviewOpen(true)}
        >
          {isAllMarked ? (
            <>
              Review & Submit Attendance
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            `Mark ${students.length - markedCount} Remaining Students to Submit`
          )}
        </Button>
      </div>

      {/* Pre-Submission Review Modal */}
      <Dialog
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        title="Confirm Attendance Submission"
        description={`Review final counts for ${subjectCode} (${sectionName})`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div>
              <div className="text-3xl font-extrabold text-emerald-600">{presentCount}</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-0.5">Present</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-rose-600">{absentCount}</div>
              <div className="text-xs font-bold text-slate-500 uppercase mt-0.5">Absent</div>
            </div>
          </div>

          {absentCount > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3.5">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
                Absentees List ({absentCount})
              </span>
              <ul className="mt-2 text-xs text-rose-700 space-y-1">
                {students
                  .filter((s) => decisions[s.id] === "absent")
                  .map((s) => (
                    <li key={s.id} className="font-medium">
                      • {s.name} ({s.srn})
                    </li>
                  ))}
              </ul>
            </div>
          )}

          <div className="flex items-center space-x-2 p-3 rounded-xl bg-blue-50 text-blue-700 text-xs">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Submission commits records atomically to PostgreSQL.</span>
          </div>

          <div className="flex items-center space-x-3 pt-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl"
              onClick={() => setIsReviewOpen(false)}
            >
              Change
            </Button>
            <Button
              variant="default"
              className="flex-1 rounded-xl"
              isLoading={isSubmitting}
              onClick={handleFinalSubmit}
            >
              Confirm & Submit
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
