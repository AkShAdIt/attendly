"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCheck, Building2, User, Mail, KeyRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

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
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
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
          Institution & Administrator Setup
        </p>
      </div>

      <div className="w-full max-w-lg">
        <Card className="border-slate-200 shadow-xl shadow-slate-900/5">
          <CardHeader>
            <CardTitle className="text-xl">Register Institution</CardTitle>
            <CardDescription>
              Initialize a college workspace and configure the root administrator.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 flex items-center">
                    <Building2 className="h-3.5 w-3.5 mr-1 text-slate-400" /> College Name
                  </label>
                  <Input
                    required
                    placeholder="e.g. Apex Engineering College"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    College Code
                  </label>
                  <Input
                    required
                    placeholder="e.g. AEC-01"
                    value={institutionCode}
                    onChange={(e) => setInstitutionCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center">
                  <User className="h-3.5 w-3.5 mr-1 text-slate-400" /> Administrator Full Name
                </label>
                <Input
                  required
                  placeholder="e.g. Dr. Ramesh Kumar"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center">
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
                <label className="text-xs font-semibold text-slate-700 flex items-center">
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
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Create Institution & Admin Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>

            <CardFooter className="justify-center border-t border-slate-100 pt-4 text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline ml-1">
                Sign In
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
