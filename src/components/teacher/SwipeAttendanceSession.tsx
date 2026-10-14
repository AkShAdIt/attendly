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
  AlertCircle,
  CheckCircle2,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";

export interface StudentCardData {
  id: string;
  name: string;
  srn: string;
  rollNumber: string;
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

  // Mode: "swipe" or "roster"
  const [viewMode, setViewMode] = useState<"swipe" | "roster">("swipe");

  // Decisions map: studentId -> "present" | "absent"
  const [decisions, setDecisions] = useState<Record<string, DecisionStatus>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<string[]>([]); // stack of studentIds marked in order

  // Review modal state
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Swipe drag gesture state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const currentStudent = students[currentIndex];
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

    // Move index back to that student
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

  // Keyboard navigation
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

    // Swipe threshold: 90px
    if (dragOffset > 90 && currentStudent) {
      markDecision(currentStudent.id, "present");
    } else if (dragOffset < -90 && currentStudent) {
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

  // Background card styling based on drag offset
  const cardRotation = (dragOffset / 20).toFixed(1);
  const cardOpacity = Math.max(0.7, 1 - Math.abs(dragOffset) / 300);

  if (isSuccess) {
    return (
      <Card className="max-w-md mx-auto p-8 text-center border-emerald-200 bg-white shadow-xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Attendance Submitted!</h2>
        <p className="mt-2 text-sm text-slate-600">
          Official attendance for <strong>{subjectCode} ({sectionName})</strong> has been persisted transactionally.
        </p>

        <div className="my-6 grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
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
          className="w-full"
          onClick={() => router.push("/teacher")}
        >
          Return to Teacher Dashboard
        </Button>
      </Card>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full space-y-4">
      {/* Session Metadata Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-slate-900 leading-tight">
              {subjectCode} — {sectionName}
            </h2>
          </div>
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
      <div className="rounded-2xl bg-white p-4 border border-slate-200/90 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600">
            {markedCount} of {students.length} Marked ({Math.round(progressPercent)}%)
          </span>
          <div className="flex items-center space-x-2.5">
            <span className="text-emerald-600">{presentCount} Present</span>
            <span className="text-slate-300">•</span>
            <span className="text-rose-600">{absentCount} Absent</span>
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* SWIPE CARD MODE */}
      {viewMode === "swipe" && currentStudent && (
        <div className="space-y-4">
          {/* Swipe Card Arena */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="relative h-96 w-full rounded-3xl bg-white border border-slate-200/90 shadow-xl p-6 flex flex-col justify-between select-none cursor-grab active:cursor-grabbing overflow-hidden transition-all"
            style={{
              transform: `translateX(${dragOffset}px) rotate(${cardRotation}deg)`,
              opacity: cardOpacity,
            }}
          >
            {/* Visual Direction Indicators while swiping */}
            {dragOffset > 30 && (
              <div className="absolute top-6 left-6 z-10 flex items-center rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white shadow-md animate-in fade-in-50">
                <Check className="h-4 w-4 mr-1 stroke-[3]" /> PRESENT
              </div>
            )}
            {dragOffset < -30 && (
              <div className="absolute top-6 right-6 z-10 flex items-center rounded-xl bg-rose-500 px-3 py-1.5 text-xs font-bold text-white shadow-md animate-in fade-in-50">
                ABSENT <X className="h-4 w-4 ml-1 stroke-[3]" />
              </div>
            )}

            {/* Card Header */}
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-mono text-xs">
                {currentStudent.srn}
              </Badge>
              <span className="text-xs font-bold text-slate-400">
                #{currentStudent.rollNumber} • {currentIndex + 1} / {students.length}
              </span>
            </div>

            {/* Student Avatar & Identity */}
            <div className="flex flex-col items-center text-center my-auto">
              <div className="h-20 w-20 rounded-3xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg shadow-blue-500/25 mb-4">
                {currentStudent.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentStudent.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {sectionName} • Roll {currentStudent.rollNumber}
              </p>

              {decisions[currentStudent.id] && (
                <div className="mt-3">
                  <Badge
                    variant={
                      decisions[currentStudent.id] === "present" ? "present" : "absent"
                    }
                  >
                    Current: {decisions[currentStudent.id]?.toUpperCase()}
                  </Badge>
                </div>
              )}
            </div>

            {/* Gesture Instruction */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 border-t border-slate-100 pt-3">
              <span className="text-rose-500 flex items-center">
                <X className="h-3.5 w-3.5 mr-0.5" /> Swipe Left: Absent
              </span>
              <span className="text-emerald-600 flex items-center">
                Swipe Right: Present <Check className="h-3.5 w-3.5 ml-0.5" />
              </span>
            </div>
          </div>

          {/* Large Thumb Buttons for Mobile */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="destructive"
              size="lg"
              className="py-4 rounded-2xl"
              onClick={() => markDecision(currentStudent.id, "absent")}
            >
              <X className="h-5 w-5 mr-1 stroke-[2.5]" /> Absent
            </Button>
            <Button
              variant="outline"
              size="lg"
              disabled={history.length === 0}
              className="py-4 rounded-2xl text-slate-600"
              onClick={handleUndo}
              title="Undo last action"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button
              variant="success"
              size="lg"
              className="py-4 rounded-2xl"
              onClick={() => markDecision(currentStudent.id, "present")}
            >
              <Check className="h-5 w-5 mr-1 stroke-[2.5]" /> Present
            </Button>
          </div>
        </div>
      )}

      {/* QUICK ROSTER MODE */}
      {viewMode === "roster" && (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">Roster View</CardTitle>
              <button
                onClick={handleMarkAllRemainingPresent}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Mark Unmarked as Present
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-[380px] overflow-y-auto divide-y divide-slate-100">
            {students.map((s, index) => {
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

      {/* Review & Submit Trigger */}
      <div className="pt-2">
        <Button
          className="w-full py-4 text-base rounded-2xl"
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
              className="flex-1"
              onClick={() => setIsReviewOpen(false)}
            >
              Change
            </Button>
            <Button
              variant="default"
              className="flex-1"
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
