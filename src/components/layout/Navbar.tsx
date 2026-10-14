import Link from "next/link";
import { CheckCheck, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface NavbarProps {
  user?: {
    email: string;
    role: "admin" | "teacher" | "student";
    fullName: string;
    institutionName?: string;
  } | null;
  onLogout?: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const roleBadges = {
    admin: { label: "Administrator", variant: "default" as const },
    teacher: { label: "Teacher", variant: "present" as const },
    student: { label: "Student", variant: "draft" as const },
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/25">
            <CheckCheck className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Attendly
            </span>
            <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
              Attendance Made Fast
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <Badge variant={roleBadges[user.role].variant}>
                {roleBadges[user.role].label}
              </Badge>
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-semibold text-slate-800 leading-tight">
                  {user.fullName}
                </span>
                {user.institutionName && (
                  <span className="text-xs text-slate-400">
                    {user.institutionName}
                  </span>
                )}
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login?role=admin"
                className="hidden sm:inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition-all"
              >
                Admin Setup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
