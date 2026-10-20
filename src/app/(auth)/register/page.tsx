"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCheck, Building2, User, Mail, KeyRound, ArrowRight, ShieldCheck } from "lucide-react";
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
    }, 500);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center bg-slate-50/80 px-4 py-12 sm:px-6 relative overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-60" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

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
          Institution & Administrator Onboarding
        </p>
      </div>

      <div className="relative z-10 w-full max-w-lg" data-ui="auth-form">
        <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs shadow-slate-900/5">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Register Institution</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Initialize a college workspace and configure the root administrator.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700 flex items-center">
                  <Building2 className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> College Name
                </label>
                <Input
                  required
                  placeholder="Apex Engineering College"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
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
              <label className="text-xs font-medium text-slate-700 flex items-center">
                <User className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> Administrator Full Name
              </label>
              <Input
                required
                placeholder="Dr. Ramesh Kumar"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-700 flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> Official Admin Email
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
              <label className="text-xs font-medium text-slate-700 flex items-center">
                <KeyRound className="h-3.5 w-3.5 mr-1.5 text-slate-400" /> Master Password
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
              <Button type="submit" className="w-full h-11 text-sm font-semibold" isLoading={isLoading}>
                Create Institution & Admin Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center space-x-1 text-slate-500 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Multi-tenant Isolation</span>
            </div>
            <div>
              Already configured?{" "}
              <Link href="/login" className="text-slate-900 font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

