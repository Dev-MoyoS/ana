"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { AuthorAuthProvider } from "@/lib/firebase/AuthorAuthContext";
import { FirebaseBootstrapProvider } from "@/lib/firebase/FirebaseBootstrapContext";
import { getFirebaseAnalytics } from "@/lib/firebase/analytics";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    getFirebaseAnalytics().catch(() => {
      // Analytics is optional; ignore unsupported environments (SSR, blockers, etc.)
    });
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      touchMultiplier: 1.0,
      wheelMultiplier: 0.9,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
      lenis.destroy();
    };
  }, []);

  return (
    <FirebaseBootstrapProvider>
      <AuthorAuthProvider>{children}</AuthorAuthProvider>
    </FirebaseBootstrapProvider>
  );
}

