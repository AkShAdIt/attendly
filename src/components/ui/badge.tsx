import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "present" | "absent" | "draft" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-blue-50 text-blue-700 border-blue-200",
    secondary: "bg-slate-100 text-slate-700 border-slate-200",
    present: "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold",
    absent: "bg-rose-50 text-rose-700 border-rose-200 font-semibold",
    draft: "bg-amber-50 text-amber-700 border-amber-200 font-medium",
    outline: "text-slate-700 border-slate-200",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
