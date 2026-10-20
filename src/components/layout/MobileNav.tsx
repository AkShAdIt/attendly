"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  CheckCircle2,
  BarChart3,
  Users,
  Settings,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  role: "admin" | "teacher" | "student";
}

export function MobileNav({ role }: MobileNavProps) {
  const pathname = usePathname();

  const linksByRole = {
    admin: [
      { label: "Dashboard", href: "/admin", icon: Layers },
      { label: "Roster", href: "/admin/students", icon: Users },
      { label: "Classes", href: "/admin/sections", icon: BookOpen },
      { label: "Reports", href: "/admin/analytics", icon: BarChart3 },
    ],
    teacher: [
      { label: "Classes", href: "/teacher", icon: Layers },
      { label: "Attendance", href: "/teacher/session/new", icon: CheckCircle2 },
      { label: "Reports", href: "/teacher/reports", icon: BarChart3 },
    ],
    student: [
      { label: "Overview", href: "/student", icon: Layers },
      { label: "Calculator", href: "/student/calculator", icon: Settings },
      { label: "Reports", href: "/student/reports", icon: BarChart3 },
    ],
  };

  const currentLinks = linksByRole[role] || [];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 block border-t border-slate-200/80 bg-white/90 backdrop-blur-lg md:hidden shadow-lg shadow-slate-900/5 safe-area-pb"
    >
      <div className="flex h-16 items-center justify-around px-3 max-w-md mx-auto">
        {currentLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-150 active:scale-95",
                isActive
                  ? "text-slate-900 font-semibold"
                  : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg transition-colors",
                  isActive ? "bg-slate-100 text-slate-900" : "text-slate-400"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "stroke-[2.2]")} />
              </div>
              <span className="mt-0.5 text-[10px] leading-tight font-medium tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

