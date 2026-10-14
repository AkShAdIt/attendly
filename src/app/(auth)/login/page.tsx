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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    // In phase 1, route directly to the respective portal
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link href="/" className="inline-flex items-center space-x-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/25">
            <CheckCheck className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Attendly
          </span>
        </Link>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Sign in to your college attendance portal
        </p>
      </div>

      <div className="w-full max-w-md">
        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-200/70 rounded-2xl mb-4">
          <button
            type="button"
            onClick={() => handleRoleSelect("teacher")}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              role === "teacher"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Teacher
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("student")}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              role === "student"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect("admin")}
            className={`py-2 text-xs font-semibold rounded-xl transition-all ${
              role === "admin"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Admin
          </button>
        </div>

        <Card className="border-slate-200 shadow-xl shadow-slate-900/5">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {role === "teacher" && "Teacher Sign In"}
                {role === "student" && "Student Sign In"}
                {role === "admin" && "Administrator Sign In"}
              </CardTitle>
              <Badge variant={role === "admin" ? "default" : role === "teacher" ? "present" : "draft"}>
                {role.toUpperCase()}
              </Badge>
            </div>
            <CardDescription>
              Enter your credentials to access your authorized records.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-1 text-slate-400" /> Email Address
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
                  <label className="text-xs font-semibold text-slate-700 flex items-center">
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

              <div className="pt-1">
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>

            <CardFooter className="flex-col space-y-3 pt-2 text-center text-xs text-slate-500">
              <div className="flex items-center justify-center space-x-1">
                <Shield className="h-3.5 w-3.5 text-emerald-600" />
                <span>Protected by Supabase Row Level Security</span>
              </div>
              <p>
                First time administrator?{" "}
                <Link href="/register" className="text-blue-600 font-semibold hover:underline">
                  Activate college setup
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
