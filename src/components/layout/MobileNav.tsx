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
      { label: "Take Attendance", href: "/teacher/session/new", icon: CheckCircle2 },
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
    <nav className="fixed bottom-0 left-0 right-0 z-40 block border-t border-slate-200/90 bg-white/95 backdrop-blur-md md:hidden safe-area-pb">
      <div className="flex h-16 items-center justify-around px-2">
        {currentLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center py-1 transition-colors",
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-slate-400 hover:text-slate-700"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="mt-1 text-[11px] leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
