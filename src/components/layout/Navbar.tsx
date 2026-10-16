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
    admin: { label: "Admin", variant: "default" as const },
    teacher: { label: "Teacher", variant: "present" as const },
    student: { label: "Student", variant: "draft" as const },
  };

  return (
    <header data-ui="site-header" className="w-full bg-[#f8fafc] border-b border-slate-200/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0f172a] text-white">
            <CheckCheck className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Attendly
          </span>
        </Link>

        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <Badge variant={roleBadges[user.role].variant}>
                {roleBadges[user.role].label}
              </Badge>
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-semibold text-slate-900 leading-tight">
                  {user.fullName}
                </span>
                {user.institutionName && (
                  <span className="text-xs text-slate-500">
                    {user.institutionName}
                  </span>
                )}
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login?role=admin"
                className="rounded-xl bg-[#0f172a] px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
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
