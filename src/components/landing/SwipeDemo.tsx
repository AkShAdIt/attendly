"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [swipeAnimation, setSwipeAnimation] = useState<"present" | "absent" | null>(null);

  // Drag interaction physics
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const currentStudent = DEMO_STUDENTS[currentIndex];
  const nextStudent = DEMO_STUDENTS[currentIndex + 1];
  const isFinished = currentIndex >= DEMO_STUDENTS.length;

  const handleDecision = (status: "present" | "absent") => {
    if (isFinished || swipeAnimation) return;
    setSwipeAnimation(status);

    setTimeout(() => {
      setHistory((prev) => [...prev, { id: currentStudent.id, status }]);
      setCurrentIndex((prev) => prev + 1);
      setSwipeAnimation(null);
      setDragOffset(0);
    }, 260);
  };

  const handleUndo = () => {
    if (currentIndex === 0 || swipeAnimation) return;
    setCurrentIndex((prev) => prev - 1);
    setHistory((prev) => prev.slice(0, -1));
    setSwipeAnimation(null);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setHistory([]);
    setSwipeAnimation(null);
    setDragOffset(0);
  };

  // Touch and mouse drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (swipeAnimation || isFinished) return;
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

    if (dragOffset > 70) {
      handleDecision("present");
    } else if (dragOffset < -70) {
      handleDecision("absent");
    } else {
      setDragOffset(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (swipeAnimation || isFinished) return;
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

    if (dragOffset > 70) {
      handleDecision("present");
    } else if (dragOffset < -70) {
      handleDecision("absent");
    } else {
      setDragOffset(0);
    }
  };

  const presentCount = history.filter((h) => h.status === "present").length;
  const absentCount = history.filter((h) => h.status === "absent").length;

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

  return (
    <div data-ui="swipe-demo" className="relative mx-auto w-full max-w-md select-none">
      
      {/* 3D Stack Stage */}
      <div className="relative flex items-center justify-center min-h-[420px] sm:min-h-[460px]">

        {/* LEFT CARD (Absent Ghost Tilted Card) */}
        <div
          data-ui="ghost-card"
          className="absolute left-1/2 -translate-x-[74%] sm:-translate-x-[70%] top-2 w-[260px] sm:w-[290px] aspect-[3/4] rounded-[32px] bg-rose-100 border-2 border-rose-200/80 -z-10 pointer-events-none p-3.5 flex flex-col justify-between transition-transform duration-200"
          style={{
            transform: `translateX(-70%) rotate(-10deg) scale(${leftGhostScale})`,
            boxShadow: "0 16px 36px -8px rgba(225, 29, 72, 0.16)", // taste-skill-ignore
            filter: "blur(0.5px)",
          }}
        >
          <div className="w-full aspect-[4/3] rounded-[22px] bg-rose-200/60 flex items-center justify-center">
            <div
              className="h-14 w-14 rounded-full bg-rose-500 text-white ring-4 ring-rose-200/80 flex items-center justify-center"
              style={{ boxShadow: "0 10px 24px rgba(244, 63, 94, 0.35)" }} // taste-skill-ignore
            >
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
          className="absolute left-1/2 -translate-x-[26%] sm:-translate-x-[30%] top-2 w-[260px] sm:w-[290px] aspect-[3/4] rounded-[32px] bg-emerald-100 border-2 border-emerald-200/80 -z-10 pointer-events-none p-3.5 flex flex-col justify-between transition-transform duration-200"
          style={{
            transform: `translateX(-30%) rotate(10deg) scale(${rightGhostScale})`,
            boxShadow: "0 16px 36px -8px rgba(16, 185, 129, 0.16)", // taste-skill-ignore
            filter: "blur(0.5px)",
          }}
        >
          <div className="w-full aspect-[4/3] rounded-[22px] bg-emerald-200/60 flex items-center justify-center">
            <div
              className="h-14 w-14 rounded-full bg-emerald-500 text-white ring-4 ring-emerald-200/80 flex items-center justify-center"
              style={{ boxShadow: "0 10px 24px rgba(16, 185, 129, 0.35)" }} // taste-skill-ignore
            >
              <Check className="h-7 w-7 stroke-[3]" />
            </div>
          </div>
          <div className="text-center pb-2 opacity-40">
            <div className="h-4 w-24 bg-emerald-300 rounded-full mx-auto" />
            <div className="h-3 w-14 bg-emerald-200 rounded-full mx-auto mt-2" />
          </div>
        </div>

        {/* Optional Next Card in Stack Peek */}
        {!isFinished && nextStudent && (
          <div
            data-ui="stack-peek"
            className="absolute z-10 w-full max-w-[285px] sm:max-w-[310px] rounded-[32px] bg-white p-3.5 sm:p-4 border border-slate-200/80 pointer-events-none"
            style={{
              transform: "translateY(12px) scale(0.94)",
              opacity: 0.8,
              filter: "blur(0.8px)",
              boxShadow: "0 12px 30px -8px rgba(15, 23, 42, 0.08)", // taste-skill-ignore
            }}
          >
            <div className="w-full aspect-[4/3] rounded-[24px] bg-slate-100 flex items-center justify-center">
              <User className="h-10 w-10 text-slate-300" />
            </div>
            <div className="pt-4 pb-2 text-center opacity-40">
              <div className="h-5 w-28 bg-slate-200 rounded-full mx-auto" />
              <div className="h-3 w-16 bg-slate-100 rounded-full mx-auto mt-2" />
            </div>
          </div>
        )}

        {/* LEFT SWIPE ACTION TRIGGER */}
        <div className="hidden sm:flex flex-col items-center absolute -left-8 lg:-left-12 z-20">
          <button
            onClick={() => handleDecision("absent")}
            className={`h-11 w-11 rounded-full border text-rose-500 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer ${
              dragOffset < -20
                ? "bg-rose-100 border-rose-300 scale-105"
                : "bg-rose-50 border-rose-200"
            }`}
            style={{ boxShadow: "0 8px 20px -4px rgba(244, 63, 94, 0.2)" }} // taste-skill-ignore
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
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative z-20 w-full max-w-[300px] sm:max-w-[330px] rounded-[32px] bg-white p-3.5 sm:p-4 border border-slate-200 select-none cursor-grab active:cursor-grabbing"
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
              className="absolute top-6 left-6 z-30 pointer-events-none flex items-center rounded-2xl bg-emerald-500 px-3 py-1 text-xs font-extrabold text-white transition-opacity duration-150"
              style={{
                opacity: presentStampOpacity,
                transform: `scale(${0.85 + 0.15 * presentStampOpacity}) rotate(-8deg)`,
                boxShadow: "0 8px 20px rgba(16, 185, 129, 0.4)", // taste-skill-ignore
              }}
            >
              <Check className="h-4 w-4 mr-1 stroke-[3]" /> PRESENT
            </div>

            <div
              className="absolute top-6 right-6 z-30 pointer-events-none flex items-center rounded-2xl bg-rose-500 px-3 py-1 text-xs font-extrabold text-white transition-opacity duration-150"
              style={{
                opacity: absentStampOpacity,
                transform: `scale(${0.85 + 0.15 * absentStampOpacity}) rotate(8deg)`,
                boxShadow: "0 8px 20px rgba(244, 63, 94, 0.4)", // taste-skill-ignore
              }}
            >
              ABSENT <X className="h-4 w-4 ml-1 stroke-[3]" />
            </div>

            {/* Empty Photo Placeholder Area */}
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden bg-slate-100 border border-slate-200/60 flex flex-col items-center justify-center text-slate-400">
              <div
                className="h-16 w-16 rounded-full bg-slate-200/80 border border-white/60 flex items-center justify-center text-slate-400"
                style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)" }} // taste-skill-ignore
              >
                <User className="h-8 w-8 text-slate-400" />
              </div>

              {/* Floating Counter Badge in Top-Right with Glass Frosting */}
              <div
                className="absolute top-3 right-3 rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-slate-700 border border-white/60"
                style={{
                  backdropFilter: "blur(8px)", // taste-skill-ignore
                  boxShadow: "0 4px 12px rgba(0,0,0,0.06)", // taste-skill-ignore
                }}
              >
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
          <div data-ui="completed-card" className="relative z-20 w-full max-w-[320px] rounded-[32px] bg-white p-6 border border-slate-200 text-center shadow-lg shadow-slate-900/5">
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
            className={`h-11 w-11 rounded-full border text-emerald-600 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center cursor-pointer ${
              dragOffset > 20
                ? "bg-emerald-100 border-emerald-300 scale-105"
                : "bg-emerald-50 border-emerald-200"
            }`}
            style={{ boxShadow: "0 8px 20px -4px rgba(16, 185, 129, 0.2)" }} // taste-skill-ignore
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
