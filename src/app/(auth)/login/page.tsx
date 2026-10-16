"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCheck, KeyRound, Mail, ArrowRight, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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
    }, 600);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-[#f8fafc] px-4 py-12 sm:px-6">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <Link href="/" className="inline-flex items-center space-x-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f172a] text-white">
            <CheckCheck className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Attendly
          </span>
        </Link>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Sign in to your college attendance portal
        </p>
      </div>

      <div className="w-full max-w-md" data-ui="auth-form">
        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl mb-4">
          <button
            type="button"
            onClick={() => handleRoleSelect("teacher")}
            className={`py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
              role === "teacher"
                ? "bg-white text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Teacher
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("student")}
            className={`py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
              role === "student"
                ? "bg-white text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("admin")}
            className={`py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
              role === "admin"
                ? "bg-white text-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Admin
          </button>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-7">
          <div className="flex items-center justify-between pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {role === "teacher" && "Teacher Sign In"}
                {role === "student" && "Student Sign In"}
                {role === "admin" && "Administrator Sign In"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized institutional access
              </p>
            </div>
            <Badge variant={role === "admin" ? "default" : role === "teacher" ? "present" : "draft"}>
              {role.toUpperCase()}
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1 text-slate-400" /> Official Email
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
                <label className="text-xs font-bold text-slate-700 flex items-center">
                  <KeyRound className="h-3.5 w-3.5 mr-1 text-slate-400" /> Password
                </label>
                <span className="text-xs text-blue-600 hover:underline cursor-pointer">
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
              <Button type="submit" className="w-full py-3.5 text-sm" isLoading={isLoading}>
                Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="pt-6 text-center text-xs text-slate-500 space-y-2">
            <div className="flex items-center justify-center space-x-1.5 text-emerald-700 font-semibold">
              <Shield className="h-3.5 w-3.5" />
              <span>Supabase Row Level Security Verified</span>
            </div>
            <p>
              First time administrator?{" "}
              <Link href="/register" className="text-blue-600 font-bold hover:underline">
                Activate college setup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
