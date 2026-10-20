import Link from "next/link";
import { CheckCheck, LogOut, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InstallButton } from "@/components/ui/InstallPrompt";

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
    teacher: { label: "Faculty", variant: "present" as const },
    student: { label: "Student", variant: "accent" as const },
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header
      data-ui="site-header"
      className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-all"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center space-x-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs shadow-slate-900/20 transition-transform group-hover:scale-105">
            <CheckCheck className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Attendly
          </span>
        </Link>

        <div className="flex items-center space-x-3">
          <InstallButton />
          {user ? (
            <div className="flex items-center space-x-3">
              <Badge variant={roleBadges[user.role].variant}>
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                {roleBadges[user.role].label}
              </Badge>

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200/80">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                  {getInitials(user.fullName)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 leading-tight">
                    {user.fullName}
                  </span>
                  {user.institutionName && (
                    <span className="text-[11px] text-slate-500 leading-none mt-0.5">
                      {user.institutionName}
                    </span>
                  )}
                </div>
              </div>

              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Sign Out"
                  aria-label="Sign Out"
                  className="rounded-xl border border-slate-200/80 p-2 text-slate-500 hover:bg-slate-100/80 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login?role=admin"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 shadow-xs shadow-slate-900/10 transition-colors"
              >
                <span>Admin Setup</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

