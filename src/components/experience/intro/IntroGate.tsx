"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { IntroSequence } from "./IntroSequence";

const STORAGE_KEY = "ana:introSeen:v1";

export function IntroGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const introAlreadySeen = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  }, []);

  useEffect(() => {
    setReady(true);
    setShowIntro(!introAlreadySeen);
  }, [introAlreadySeen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (showIntro) document.documentElement.classList.add("intro-lock");
    else document.documentElement.classList.remove("intro-lock");
    return () => document.documentElement.classList.remove("intro-lock");
  }, [showIntro]);

  const handleIntroComplete = useCallback(() => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setShowIntro(false);
  }, []);

  // Safety: if the intro animation fails to run (e.g. GSAP blocked),
  // never leave users on a blank screen.
  useEffect(() => {
    if (!ready || !showIntro) return;
    const id = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
      setShowIntro(false);
    }, 8000);
    return () => window.clearTimeout(id);
  }, [ready, showIntro]);

  return (
    <>
      <div className="relative z-10 flex min-h-screen flex-col">{children}</div>

      <AnimatePresence>
        {ready && showIntro ? (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeInOut" } }}
          >
            <IntroSequence onComplete={handleIntroComplete} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

