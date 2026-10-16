"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCheck, Building2, User, Mail, KeyRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [institutionName, setInstitutionName] = useState("");
  const [institutionCode, setInstitutionCode] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-[#f8fafc] px-4 py-12 sm:px-6">
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
          Institution & Administrator Setup
        </p>
      </div>

      <div className="w-full max-w-lg" data-ui="auth-form">
        <div className="rounded-3xl bg-white border border-slate-200 p-8">
          <div className="pb-4">
            <h2 className="text-xl font-bold text-slate-900">Register Institution</h2>
            <p className="text-xs text-slate-500 mt-1">
              Initialize a college workspace and configure the root administrator.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex items-center">
                  <Building2 className="h-3.5 w-3.5 mr-1 text-slate-400" /> College Name
                </label>
                <Input
                  required
                  placeholder="Apex Engineering College"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  College Code
                </label>
                <Input
                  required
                  placeholder="AEC-01"
                  value={institutionCode}
                  onChange={(e) => setInstitutionCode(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                <User className="h-3.5 w-3.5 mr-1 text-slate-400" /> Administrator Full Name
              </label>
              <Input
                required
                placeholder="Dr. Ramesh Kumar"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1 text-slate-400" /> Official Admin Email
              </label>
              <Input
                type="email"
                required
                placeholder="admin@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                <KeyRound className="h-3.5 w-3.5 mr-1 text-slate-400" /> Master Password
              </label>
              <Input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full py-3.5" isLoading={isLoading}>
                Create Institution & Admin Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="pt-6 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 font-bold hover:underline ml-1">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
