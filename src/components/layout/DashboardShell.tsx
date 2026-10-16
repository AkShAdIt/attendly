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
    <div className="min-h-[100dvh] flex flex-col bg-[#f8fafc] text-[#0f172a] pb-20 md:pb-8">
      <Navbar user={user} />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-6 sm:pt-8 flex-1">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500 font-medium">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex items-center space-x-3">{action}</div>}
        </div>

        {/* Main Content Area */}
        {children}
      </main>

      {/* Mobile Sticky Bottom Navigation */}
      <MobileNav role={user.role} />
    </div>
  );
}
