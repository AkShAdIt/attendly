import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Attendly — Fast, Mobile-First College Attendance Management",
  description: "Attendance, without the spreadsheet shuffle. Swipe cards for teachers, real-time analytics for students, and centralized roster control for administrators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
