import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "present" | "absent" | "draft" | "outline" | "accent";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "border border-slate-200/90 bg-slate-100/80 text-slate-800 font-medium",
    secondary:
      "border border-slate-200/60 bg-slate-100/50 text-slate-600 font-medium",
    present:
      "border border-emerald-200/90 bg-emerald-50 text-emerald-800 font-semibold shadow-2xs shadow-emerald-900/5",
    absent:
      "border border-rose-200/90 bg-rose-50 text-rose-800 font-semibold shadow-2xs shadow-rose-900/5",
    draft:
      "border border-amber-200/90 bg-amber-50 text-amber-900 font-semibold shadow-2xs shadow-amber-900/5",
    outline:
      "border border-slate-200 bg-white text-slate-700 font-medium",
    accent:
      "border border-blue-200 bg-blue-50 text-blue-800 font-semibold shadow-2xs shadow-blue-900/5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs tracking-tight transition-colors select-none",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

