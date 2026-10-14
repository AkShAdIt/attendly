import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with tailwind-merge to resolve conflicting Tailwind utility classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string or Date object into a readable academic date format (e.g., "14 Oct 2026").
 */
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formats attendance percentage with clean single-decimal or integer output.
 */
export function formatPercentage(val: number | null | undefined): string {
  if (val === null || val === undefined || isNaN(val)) return "N/A";
  return `${Number(val.toFixed(1))}%`;
}
