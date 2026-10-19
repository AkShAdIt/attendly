import type { Metadata, Viewport } from "next";
import "./globals.css";
import { InstallPrompt } from "@/components/ui/InstallPrompt";

export const metadata: Metadata = {
  title: "Attendly — Fast, Mobile-First College Attendance Management",
  description: "Attendance without the spreadsheet shuffle. Swipe cards for teachers, real-time analytics for students, and centralized roster control for administrators.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Attendly",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-[#0f172a] antialiased font-sans">
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
