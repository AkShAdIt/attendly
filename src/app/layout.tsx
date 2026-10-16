import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Attendly — Fast, Mobile-First College Attendance Management",
  description: "Attendance without the spreadsheet shuffle. Swipe cards for teachers, real-time analytics for students, and centralized roster control for administrators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
