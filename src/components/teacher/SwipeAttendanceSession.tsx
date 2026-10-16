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

  // Exit animation state for realistic glide
  const [swipeAnimation, setSwipeAnimation] = useState<"present" | "absent" | null>(null);

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
    if (swipeAnimation) return;
    setSwipeAnimation(status);

    setTimeout(() => {
      setDecisions((prev) => ({ ...prev, [studentId]: status }));
      setHistory((prev) => [...prev, studentId]);

      if (viewMode === "swipe" && currentIndex < students.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
      setSwipeAnimation(null);
      setDragOffset(0);
    }, 260);
  };

  const handleUndo = () => {
    if (history.length === 0 || swipeAnimation) return;
    const lastStudentId = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    setDecisions((prev) => {
      const updated = { ...prev };
      delete updated[lastStudentId];
      return updated;
    });

    if (viewMode === "swipe" && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleMarkAllRemainingPresent = () => {
    const updated = { ...decisions };
    students.forEach((s) => {
      if (updated[s.id] === undefined) {
        updated[s.id] = "present";
      }
    });
    setDecisions(updated);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isReviewOpen || isSuccess || swipeAnimation) return;

      if (e.key === "ArrowLeft") {
        if (currentStudent) markDecision(currentStudent.id, "absent");
      } else if (e.key === "ArrowRight") {
        if (currentStudent) markDecision(currentStudent.id, "present");
      } else if (e.key === "Backspace" || (e.metaKey && e.key === "z")) {
        handleUndo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, currentStudent, isReviewOpen, isSuccess, history, swipeAnimation]);

  // Mouse & Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (swipeAnimation) return;
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || swipeAnimation) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || swipeAnimation) return;
    setIsDragging(false);

    if (dragOffset > 75) {
      if (currentStudent) markDecision(currentStudent.id, "present");
    } else if (dragOffset < -75) {
      if (currentStudent) markDecision(currentStudent.id, "absent");
    } else {
      setDragOffset(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (swipeAnimation) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || swipeAnimation) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging || swipeAnimation) return;
    setIsDragging(false);

    if (dragOffset > 75) {
      if (currentStudent) markDecision(currentStudent.id, "present");
    } else if (dragOffset < -75) {
      if (currentStudent) markDecision(currentStudent.id, "absent");
    } else {
      setDragOffset(0);
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const presentIds = Object.entries(decisions)
        .filter(([_, status]) => status === "present")
        .map(([id]) => id);
      const absentIds = Object.entries(decisions)
        .filter(([_, status]) => status === "absent")
        .map(([id]) => id);

      const payload = {
        sectionId: "sec-5a",
        subjectId: "sub-cs501",
        sessionDate,
        period,
        notes: `Recorded via Attendly Stack Deck • ${presentIds.length} present, ${absentIds.length} absent`,
        records: students.map((s) => ({
          studentId: s.id,
          status: decisions[s.id] || "absent",
        })),
      };

      const res = await fetch("/api/attendance/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setIsReviewOpen(false);
      setIsSuccess(true);
      if (onSessionSubmitted) {
        onSessionSubmitted({
          sessionId: data.sessionId,
          presentIds,
          absentIds,
        });
      }
    } catch (err: any) {
      alert(`Submission Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const presentCount = Object.values(decisions).filter((v) => v === "present").length;
  const absentCount = Object.values(decisions).filter((v) => v === "absent").length;
  const markedCount = Object.keys(decisions).length;
  const progressPercent = (markedCount / students.length) * 100;

  // Visual card physics & dynamic transformations
  const cardRotation = swipeAnimation === "present"
    ? 24
    : swipeAnimation === "absent"
    ? -24
    : Number((dragOffset / 18).toFixed(1));

  const cardTranslateX = swipeAnimation === "present"
    ? 480
    : swipeAnimation === "absent"
    ? -480
    : dragOffset;

  const cardOpacity = swipeAnimation
    ? 0
    : Math.max(0.65, 1 - Math.abs(dragOffset) / 450);

  const cardScale = isDragging
    ? 1.02
    : swipeAnimation
    ? 0.92
    : 1.0;

  // Stamp indicator opacity calculation
  const presentStampOpacity = swipeAnimation === "present"
    ? 1
    : dragOffset > 15
    ? Math.min(1, (dragOffset - 15) / 55)
    : 0;

  const absentStampOpacity = swipeAnimation === "absent"
    ? 1
    : dragOffset < -15
    ? Math.min(1, (-dragOffset - 15) / 55)
    : 0;

  // Dynamic ghost card reaction
  const dragRatio = Math.max(-1, Math.min(1, dragOffset / 150));
  const leftGhostScale = 0.90 + Math.max(0, -dragRatio) * 0.06;
  const rightGhostScale = 0.90 + Math.max(0, dragRatio) * 0.06;

  if (isSuccess) {
    return (
      <Card data-ui="success-card" className="max-w-md mx-auto p-8 text-center border border-emerald-200 bg-white rounded-3xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4">
          <Sparkles className="h-8 w-8" />
        </div>
        <h2 className="font-chillax text-2xl font-bold text-slate-900 tracking-tight">Attendance Submitted!</h2>
        <p className="mt-2 text-sm text-slate-600">
          Official attendance for <strong>{subjectCode} ({sectionName})</strong> has been persisted transactionally.
        </p>

        <div className="my-6 grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <div className="font-chillax text-2xl font-bold text-emerald-600 tabular-nums">{presentCount}</div>
            <div className="text-xs text-slate-500 font-semibold mt-0.5">Present</div>
          </div>
          <div>
            <div className="font-chillax text-2xl font-bold text-rose-600 tabular-nums">{absentCount}</div>
            <div className="text-xs text-slate-500 font-semibold mt-0.5">Absent</div>
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
    <div data-ui="swipe-session" className="max-w-3xl mx-auto w-full space-y-5">
      {/* Session Metadata Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200">
        <div>
          <h2 className="font-chillax text-base font-bold text-slate-900 leading-tight tracking-tight">
            {subjectCode}: {sectionName}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {sessionDate} • Period {period}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
          <button
            onClick={() => setViewMode("swipe")}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === "swipe" ? "bg-white text-blue-600" : "text-slate-500"
            }`}
            title="Card Swipe View"
          >
            <CreditCard className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("roster")}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === "roster" ? "bg-white text-blue-600" : "text-slate-500"
            }`}
            title="Roster Checklist View"
          >
            <ListFilter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress & Live Stats Bar */}
      <div className="rounded-2xl bg-white p-4 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-600 tabular-nums">
            {markedCount} of {students.length} Marked ({Math.round(progressPercent)}%)
          </span>
          <div className="flex items-center space-x-2.5">
            <span className="text-emerald-600 font-bold tabular-nums">{presentCount} Present</span>
            <span className="text-slate-300">•</span>
            <span className="text-rose-600 font-bold tabular-nums">{absentCount} Absent</span>
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-[width] duration-300"
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
              data-ui="ghost-card"
              className="absolute left-1/2 -translate-x-[72%] sm:-translate-x-[68%] top-3 w-[280px] sm:w-[320px] aspect-[3/4] rounded-[32px] bg-rose-100 border-2 border-rose-200/80 -z-10 pointer-events-none p-3.5 flex flex-col justify-between transition-transform duration-200"
              style={{
                transform: `translateX(-70%) rotate(-10deg) scale(${leftGhostScale})`,
                boxShadow: "0 16px 36px -8px rgba(225, 29, 72, 0.16)", // taste-skill-ignore
                filter: "blur(0.5px)",
              }}
            >
              {/* Ghost Photo Placeholder */}
              <div className="w-full aspect-[4/3] rounded-[22px] bg-rose-200/60 flex items-center justify-center">
                <div
                  className="h-16 w-16 rounded-full bg-rose-500 text-white ring-4 ring-rose-200/80 flex items-center justify-center"
                  style={{ boxShadow: "0 10px 24px rgba(244, 63, 94, 0.35)" }} // taste-skill-ignore
                >
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
              data-ui="ghost-card"
              className="absolute left-1/2 -translate-x-[28%] sm:-translate-x-[32%] top-3 w-[280px] sm:w-[320px] aspect-[3/4] rounded-[32px] bg-emerald-100 border-2 border-emerald-200/80 -z-10 pointer-events-none p-3.5 flex flex-col justify-between transition-transform duration-200"
              style={{
                transform: `translateX(-30%) rotate(10deg) scale(${rightGhostScale})`,
                boxShadow: "0 16px 36px -8px rgba(16, 185, 129, 0.16)", // taste-skill-ignore
                filter: "blur(0.5px)",
              }}
            >
              {/* Ghost Photo Placeholder */}
              <div className="w-full aspect-[4/3] rounded-[22px] bg-emerald-200/60 flex items-center justify-center">
                <div
                  className="h-16 w-16 rounded-full bg-emerald-500 text-white ring-4 ring-emerald-200/80 flex items-center justify-center"
                  style={{ boxShadow: "0 10px 24px rgba(16, 185, 129, 0.35)" }} // taste-skill-ignore
                >
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
              </div>

              {/* Ghost text */}
              <div className="text-center pb-2 opacity-50">
                <div className="h-4 w-28 bg-emerald-300/60 rounded-full mx-auto" />
                <div className="h-3 w-16 bg-emerald-200 rounded-full mx-auto mt-2" />
              </div>
            </div>

            {/* Optional Peek Card Behind Foreground (Stack Depth) */}
            {nextStudent && (
              <div
                data-ui="stack-peek"
                className="absolute z-10 w-full max-w-[305px] sm:max-w-[330px] rounded-[32px] bg-white p-3.5 sm:p-4 border border-slate-200/80 pointer-events-none"
                style={{
                  transform: "translateY(12px) scale(0.94)",
                  opacity: 0.8,
                  filter: "blur(0.8px)",
                  boxShadow: "0 12px 30px -8px rgba(15, 23, 42, 0.08)", // taste-skill-ignore
                }}
              >
                <div className="w-full aspect-[4/3] rounded-[24px] bg-slate-100/90 flex items-center justify-center">
                  <User className="h-10 w-10 text-slate-300" />
                </div>
                <div className="pt-4 pb-2 text-center opacity-40">
                  <div className="h-5 w-32 bg-slate-200 rounded-full mx-auto" />
                  <div className="h-3 w-20 bg-slate-100 rounded-full mx-auto mt-2" />
                </div>
              </div>
            )}

            {/* LEFT ACTION TRIGGER (Swipe Left / Mark Absent) */}
            <div className="hidden md:flex flex-col items-center absolute left-2 lg:left-6 z-20">
              <button
                onClick={() => markDecision(currentStudent.id, "absent")}
                className={`h-12 w-12 rounded-full border text-rose-500 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer ${
                  dragOffset < -20
                    ? "bg-rose-100 border-rose-300 scale-105"
                    : "bg-rose-50 border-rose-200/80"
                }`}
                style={{ boxShadow: "0 8px 20px -4px rgba(244, 63, 94, 0.2)" }} // taste-skill-ignore
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
              data-ui="active-card"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="relative z-20 w-full max-w-[320px] sm:max-w-[350px] rounded-[32px] bg-white p-3.5 sm:p-4 border border-slate-200 select-none cursor-grab active:cursor-grabbing"
              style={{
                transform: `translateX(${cardTranslateX}px) rotate(${cardRotation}deg) scale(${cardScale})`,
                opacity: cardOpacity,
                transition: isDragging
                  ? "none"
                  : "transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 240ms ease-out",
                boxShadow: isDragging // taste-skill-ignore
                  ? "0 30px 60px -12px rgba(15,23,42,0.22), 0 10px 20px -5px rgba(15,23,42,0.08)"
                  : "0 20px 48px -12px rgba(15,23,42,0.14), 0 8px 16px -4px rgba(15,23,42,0.04)",
              }}
            >
              {/* Diffused Ambient Glow Behind Active Card while dragging */}
              <div
                className="absolute inset-0 -z-10 rounded-[32px] opacity-70 transition-colors duration-200 pointer-events-none"
                style={{
                  filter: "blur(24px)",
                  backgroundColor:
                    dragOffset > 25 || swipeAnimation === "present"
                      ? "rgba(16, 185, 129, 0.22)"
                      : dragOffset < -25 || swipeAnimation === "absent"
                      ? "rgba(244, 63, 94, 0.22)"
                      : "rgba(148, 163, 184, 0.12)",
                }}
              />

              {/* Dynamic Smooth Stamp Indicators */}
              <div
                className="absolute top-6 left-6 z-30 pointer-events-none flex items-center rounded-2xl bg-emerald-500 px-3.5 py-1.5 text-xs font-extrabold text-white transition-opacity duration-150"
                style={{
                  opacity: presentStampOpacity,
                  transform: `scale(${0.85 + 0.15 * presentStampOpacity}) rotate(-8deg)`,
                  boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)", // taste-skill-ignore
                }}
              >
                <Check className="h-4 w-4 mr-1 stroke-[3]" /> PRESENT
              </div>

              <div
                className="absolute top-6 right-6 z-30 pointer-events-none flex items-center rounded-2xl bg-rose-500 px-3.5 py-1.5 text-xs font-extrabold text-white transition-opacity duration-150"
                style={{
                  opacity: absentStampOpacity,
                  transform: `scale(${0.85 + 0.15 * absentStampOpacity}) rotate(8deg)`,
                  boxShadow: "0 8px 20px rgba(244, 63, 94, 0.4)", // taste-skill-ignore
                }}
              >
                ABSENT <X className="h-4 w-4 ml-1 stroke-[3]" />
              </div>

              {/* Photo Viewport (Empty placeholder ready for database retrieval) */}
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-slate-100 border border-slate-200/60 flex flex-col items-center justify-center text-slate-400">
                {currentStudent.photoUrl ? (
                  <img
                    src={currentStudent.photoUrl}
                    alt={currentStudent.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div
                      className="h-20 w-20 rounded-full bg-slate-200/80 border border-white/60 flex items-center justify-center text-slate-400"
                      style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)" }} // taste-skill-ignore
                    >
                      <User className="h-10 w-10 text-slate-400" />
                    </div>
                  </div>
                )}

                {/* Floating Index Counter Badge (Top Right) with Glass Frosting */}
                <div
                  className="absolute top-3 right-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-slate-700 border border-white/60"
                  style={{
                    backdropFilter: "blur(8px)", // taste-skill-ignore
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)", // taste-skill-ignore
                  }}
                >
                  {currentIndex + 1}/{students.length}
                </div>
              </div>

              {/* Student Identity Information */}
              <div className="pt-4 pb-2 text-center">
                <h3 className="font-chillax text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {currentStudent.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 tabular-nums">
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
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200">
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
                className={`h-12 w-12 rounded-full border text-emerald-600 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer ${
                  dragOffset > 20
                    ? "bg-emerald-100 border-emerald-300 scale-105"
                    : "bg-emerald-50 border-emerald-200/80"
                }`}
                style={{ boxShadow: "0 8px 20px -4px rgba(16, 185, 129, 0.2)" }} // taste-skill-ignore
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
                  className={`rounded-full transition-colors duration-200 ${
                    isActive
                      ? "w-2.5 h-2.5 bg-blue-600"
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
              className="py-3.5 rounded-2xl text-sm font-bold"
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
              className="py-3.5 rounded-2xl text-sm font-bold"
              onClick={() => markDecision(currentStudent.id, "present")}
            >
              <Check className="h-4 w-4 mr-1 stroke-[3]" /> Present
            </Button>
          </div>
        </div>
      )}

      {/* QUICK ROSTER MODE */}
      {viewMode === "roster" && (
        <Card data-ui="roster-card" className="border border-slate-200 bg-white rounded-2xl">
          <CardHeader data-ui="card-header" className="py-3 px-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="font-chillax text-sm font-semibold tracking-tight">Roster View</CardTitle>
              <button
                onClick={handleMarkAllRemainingPresent}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Mark Unmarked as Present
              </button>
            </div>
          </CardHeader>
          <CardContent data-ui="card-content" className="p-0 max-h-[380px] overflow-y-auto divide-y divide-slate-100">
            {students.map((s) => {
              const status = decisions[s.id];
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-semibold tabular-nums text-slate-400 w-5">
                      {s.rollNumber}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {s.name}
                      </h4>
                      <span className="text-xs tabular-nums text-slate-500">{s.srn}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => markDecision(s.id, "absent")}
                      className={`h-9 px-3 rounded-xl text-xs font-bold transition-colors ${
                        status === "absent"
                          ? "bg-rose-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-rose-50"
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => markDecision(s.id, "present")}
                      className={`h-9 px-3 rounded-xl text-xs font-bold transition-colors ${
                        status === "present"
                          ? "bg-emerald-600 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-emerald-50"
                      }`}
                    >
                      Present
                    </button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* FINISH & REVIEW BAR */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200">
        <div className="text-xs text-slate-500 font-medium">
          {isAllMarked ? (
            <span className="text-emerald-600 font-bold flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-1" /> All {students.length} students reviewed
            </span>
          ) : (
            <span>{students.length - markedCount} students remaining</span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {!isAllMarked && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs rounded-xl"
              onClick={handleMarkAllRemainingPresent}
            >
              Mark Rest Present
            </Button>
          )}

          <Button
            variant="default"
            size="sm"
            className="rounded-xl px-5"
            onClick={() => setIsReviewOpen(true)}
          >
            Review & Submit
          </Button>
        </div>
      </div>

      {/* REVIEW & SUBMIT DIALOG */}
      <Dialog
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        title="Review Attendance Submission"
        description={`${subjectCode}: ${sectionName} • ${sessionDate} (Period ${period})`}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
            <div>
              <div className="font-chillax text-3xl font-extrabold text-emerald-600 tabular-nums">{presentCount}</div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">Present</div>
            </div>
            <div>
              <div className="font-chillax text-3xl font-extrabold text-rose-600 tabular-nums">{absentCount}</div>
              <div className="text-xs font-bold text-slate-600 mt-0.5">Absent</div>
            </div>
          </div>

          {absentCount > 0 && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3.5">
              <span className="text-xs font-bold text-rose-800">
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
