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
    default: "bg-slate-100 text-slate-800 font-semibold",
    secondary: "bg-slate-200/70 text-slate-700",
    present: "bg-emerald-50 text-emerald-700 font-bold",
    absent: "bg-rose-50 text-rose-700 font-bold",
    draft: "bg-amber-50 text-amber-800 font-semibold",
    outline: "border border-slate-300 text-slate-700",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
