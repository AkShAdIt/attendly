"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCheck, KeyRound, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"teacher" | "student" | "admin">("teacher");
  const [email, setEmail] = useState("prof.sharma@college.edu");
  const [password, setPassword] = useState("TeacherPass123!");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRoleSelect = (selectedRole: "teacher" | "student" | "admin") => {
    setRole(selectedRole);
    setErrorMessage(null);
    if (selectedRole === "teacher") {
      setEmail("prof.sharma@college.edu");
      setPassword("TeacherPass123!");
    } else if (selectedRole === "student") {
      setEmail("aarav.eng22@college.edu");
      setPassword("StudentPass123!");
    } else {
      setEmail("admin@college.edu");
      setPassword("AdminPass123!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      setIsLoading(false);
      if (role === "admin") {
        router.push("/admin");
      } else if (role === "teacher") {
        router.push("/teacher");
      } else {
        router.push("/student");
      }
    }, 500);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-slate-50/80 px-4 py-12 sm:px-6 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-60" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md text-center mb-6 sm:mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2.5 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md shadow-slate-900/10">
            <CheckCheck className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            Attendly
          </span>
        </Link>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 font-normal">
          Fast, verified college attendance portal
        </p>
      </div>

      <div className="relative z-10 w-full max-w-md" data-ui="auth-form">
        {/* Role Selector Tabs (Segmented Control) */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-200/60 rounded-xl mb-3 border border-slate-200/60 shadow-2xs">
          <button
            type="button"
            onClick={() => handleRoleSelect("teacher")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              role === "teacher"
                ? "bg-white text-slate-900 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Faculty
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("student")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              role === "student"
                ? "bg-white text-slate-900 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("admin")}
            className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              role === "admin"
                ? "bg-white text-slate-900 shadow-xs shadow-slate-900/5"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Admin
          </button>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs shadow-slate-900/5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                {role === "teacher" && "Faculty Sign In"}
                {role === "student" && "Student Sign In"}
                {role === "admin" && "Administrator Sign In"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized institutional access
              </p>
            </div>
            <Badge variant={role === "admin" ? "default" : role === "teacher" ? "present" : "accent"}>
              {role.toUpperCase()}
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> College Email
              </label>
              <Input
                type="email"
                required
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-slate-700 flex items-center">
                  <KeyRound className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> Password
                </label>
                <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <Input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full h-11 text-sm font-semibold" isLoading={isLoading}>
                Sign In as {role === "teacher" ? "Faculty" : role.charAt(0).toUpperCase() + role.slice(1)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="pt-5 mt-5 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
            <div className="flex items-center justify-center space-x-1.5 text-slate-500 font-medium text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Row Level Security (RLS) Protected</span>
            </div>
            <p>
              First time administrator?{" "}
              <Link href="/register" className="text-slate-900 font-semibold hover:underline">
                Activate college setup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

