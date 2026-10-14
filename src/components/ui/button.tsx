import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "success";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20",
      secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200",
      destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-500/20",
      outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
      ghost: "text-slate-700 hover:bg-slate-100",
      success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-500/20",
    };

    const sizes = {
      default: "h-11 px-5 py-2.5 text-sm",
      sm: "h-9 px-3.5 text-xs rounded-lg",
      lg: "h-13 px-8 text-base rounded-2xl",
      icon: "h-11 w-11 p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
