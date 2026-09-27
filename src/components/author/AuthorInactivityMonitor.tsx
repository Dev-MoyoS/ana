"use client";

import { useEffect, useRef } from "react";
import { getAuthorIdleTimeoutMs, markAuthorIdleSignOut } from "@/lib/firebase/authorIdle";

export function AuthorInactivityMonitor({
  enabled,
  onIdleSignOut,
}: {
  enabled: boolean;
  onIdleSignOut: () => Promise<void> | void;
}) {
  const timeoutRef = useRef<number | null>(null);
  const lastMoveRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    const idleMs = getAuthorIdleTimeoutMs();

    const scheduleSignOut = () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        markAuthorIdleSignOut();
        void onIdleSignOut();
      }, idleMs);
    };

    const onActivity = () => {
      const now = Date.now();
      if (now - lastMoveRef.current < 1000) return;
      lastMoveRef.current = now;
      scheduleSignOut();
    };

    const onStrongActivity = () => {
      scheduleSignOut();
    };

    const events: Array<[string, (e: Event) => void]> = [
      ["mousedown", onStrongActivity],
      ["keydown", onStrongActivity],
      ["touchstart", onStrongActivity],
      ["scroll", onStrongActivity],
      ["click", onStrongActivity],
      ["mousemove", onActivity],
    ];

    for (const [name, handler] of events) {
      window.addEventListener(name, handler, { passive: true });
    }

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") scheduleSignOut();
    });

    scheduleSignOut();

    return () => {
      for (const [name, handler] of events) {
        window.removeEventListener(name, handler);
      }
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [enabled, onIdleSignOut]);

  return null;
}
