import React from "react";
import { Navbar } from "./Navbar";
import { MobileNav } from "./MobileNav";

export interface DashboardShellProps {
  user: {
    email: string;
    role: "admin" | "teacher" | "student";
    fullName: string;
    institutionName?: string;
  };
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardShell({
  user,
  title,
  subtitle,
  action,
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50/70 text-slate-900 pb-24 md:pb-12">
      <Navbar user={user} />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8 flex-1">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 mb-6 sm:mb-8 border-b border-slate-200/50">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-slate-500 font-normal">
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <div className="flex items-center space-x-2.5 sm:self-center shrink-0">
              {action}
            </div>
          )}
        </div>

        {/* Main Content Area */}
        {children}
      </main>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNav role={user.role} />
    </div>
  );
}

