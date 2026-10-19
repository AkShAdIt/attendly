"use client";

import React, { useState, useEffect } from "react";
import { Download, X, Share, PlusSquare, Smartphone, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // 1. Check if already installed in standalone mode
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandaloneMode) {
      setIsStandalone(true);
      return;
    }

    // 2. Check dismissal preference (valid for 5 days)
    const dismissedTimestamp = localStorage.getItem("attendly_install_dismissed");
    if (dismissedTimestamp) {
      const elapsed = Date.now() - parseInt(dismissedTimestamp, 10);
      if (elapsed < 5 * 24 * 60 * 60 * 1000) {
        setIsDismissed(true);
      }
    }

    // 3. Detect iOS / iPadOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice =
      /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // 4. Capture Chromium/Android install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. Global trigger listener
    const handleOpenEvent = () => {
      setIsDismissed(false);
      setIsOpen(true);
      if (isIOSDevice) {
        setShowIOSModal(true);
      }
    };
    window.addEventListener("attendly:open-install-prompt", handleOpenEvent);

    // For iOS users who haven't dismissed, show install helper after 3 seconds
    if (isIOSDevice && !isStandaloneMode && !dismissedTimestamp) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("attendly:open-install-prompt", handleOpenEvent);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }

    if (!deferredPrompt) {
      // If triggered on desktop without native prompt available
      alert("To install Attendly, click the Install icon (💻/📱) in your browser address bar.");
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsOpen(false);
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.warn("Install prompt error:", err);
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    setIsDismissed(true);
    localStorage.setItem("attendly_install_dismissed", Date.now().toString());
  };

  // If already installed or dismissed, do not render floating banner
  if (isStandalone) return null;

  return (
    <>
      {/* FLOATING BOTTOM INSTALL BANNER */}
      {isOpen && !isDismissed && (
        <div
          data-ui="install-prompt-banner"
          className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-200/80 shadow-[0_20px_50px_rgba(37,99,235,0.18)] p-4 sm:p-5 flex items-start space-x-3.5">
            {/* App Icon */}
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
              <Download className="h-6 w-6 stroke-[2.5]" />
            </div>

            {/* Copy */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center space-x-1.5">
                <h4 className="font-chillax text-sm font-bold text-slate-900 tracking-tight">
                  Install Attendly
                </h4>
                <span className="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 flex items-center space-x-0.5">
                  <Sparkles className="h-2.5 w-2.5" />
                  <span>Fast</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                Add to your home screen for instantaneous, full-screen offline access.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-3">
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="rounded-xl px-4 py-1.5 text-xs font-bold shadow-sm shadow-blue-500/20"
                >
                  <Smartphone className="h-3.5 w-3.5 mr-1.5" />
                  Install App
                </Button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Later
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="p-1 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* iOS STEP-BY-STEP MODAL */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-chillax text-base font-bold text-slate-900">
                    Install on iPhone / iPad
                  </h3>
                  <p className="text-[11px] text-slate-400">Add to your Home Screen in 3 steps</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 pt-1 text-xs text-slate-600">
              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-6 w-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="leading-snug">
                  Tap the <strong className="text-slate-900">Share button</strong> (
                  <Share className="inline h-3.5 w-3.5 mx-0.5 text-blue-600" />
                  ) at the bottom of Safari.
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-6 w-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="leading-snug">
                  Scroll down and tap <strong className="text-slate-900">Add to Home Screen</strong> (
                  <PlusSquare className="inline h-3.5 w-3.5 mx-0.5 text-slate-700" />
                  ).
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="h-6 w-6 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="leading-snug">
                  Tap <strong className="text-blue-600">Add</strong> in the top-right corner. Attendly will appear like a native app on your home screen!
                </div>
              </div>
            </div>

            <Button
              onClick={() => setShowIOSModal(false)}
              className="w-full rounded-2xl py-2.5 font-bold"
            >
              Got it!
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export function InstallButton({ className = "" }: { className?: string }) {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const isStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(isStandaloneMode);
  }, []);

  if (isStandalone) return null;

  return (
    <button
      onClick={() => {
        window.dispatchEvent(new CustomEvent("attendly:open-install-prompt"));
      }}
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors cursor-pointer ${className}`}
      title="Install Attendly to your device"
    >
      <Download className="h-3.5 w-3.5 stroke-[2.5]" />
      <span>Install App</span>
    </button>
  );
}

