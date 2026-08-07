"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const bookRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"loading" | "book" | "fade">("loading");

  useEffect(() => {
    const root = rootRef.current;
    const book = bookRef.current;
    if (!root || !book) return;

    const ctx = gsap.context(() => {
      gsap.set(".intro-copy", { opacity: 0, y: 10 });
      gsap.set(".intro-sub", { opacity: 0, y: 12 });
      gsap.set(".book", { opacity: 0, scale: 0.94, y: 12 });
      gsap.set(".book-cover-left", { rotateY: 0 });
      gsap.set(".book-cover-right", { rotateY: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      tl.to(".intro-copy", { opacity: 1, y: 0, duration: 1.4 }, 0.2)
        .to(".intro-sub", { opacity: 1, y: 0, duration: 1.1 }, 0.65)
        .to({}, { duration: 0.6 })
        .add(() => setPhase("book"))
        .to(".intro-copy", { opacity: 0, y: -10, duration: 0.6 }, ">")
        .to(".intro-sub", { opacity: 0, y: -10, duration: 0.6 }, "<0.05")
        .to(".book", { opacity: 1, scale: 1, y: 0, duration: 0.9 }, ">-0.1")
        .to(".book-cover-left", { rotateY: -145, duration: 1.5, ease: "power3.inOut" }, ">0.2")
        .to(".book-cover-right", { rotateY: 145, duration: 1.5, ease: "power3.inOut" }, "<")
        .to(".book-glow", { opacity: 1, duration: 1.0 }, "<0.2")
        .to({}, { duration: 0.35 })
        .add(() => setPhase("fade"))
        .to(".intro-fade", { opacity: 0, duration: 1.1, ease: "power2.inOut" })
        .add(() => onComplete());

      return tl;
    }, root);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="intro-fade relative h-full w-full overflow-hidden bg-[radial-gradient(80%_60%_at_50%_28%,rgba(217,168,156,0.26),transparent_60%),radial-gradient(60%_50%_at_20%_20%,rgba(200,164,106,0.14),transparent_55%),linear-gradient(180deg,#f7f2ee,#f7f2ee)]"
    >
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(120%_80%_at_50%_20%,rgba(255,255,255,0.85),rgba(247,242,238,1)_58%)]" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background:radial-gradient(60%_50%_at_50%_50%,rgba(217,168,156,0.26),transparent_70%)]" />

        <div className="relative mx-auto w-full max-w-3xl px-6">
          <div className="intro-copy text-center font-[var(--font-display)] text-3xl tracking-tight text-[color:var(--foreground)] sm:text-5xl">
            Every story begins with a page…
          </div>
          <div className="intro-sub mt-4 text-center text-sm tracking-[0.24em] text-[color:var(--muted)] sm:text-base">
            The World of <span className="text-[color:var(--accent)]">Analufuno Mudau</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={bookRef}
          className="book relative mt-20 h-[180px] w-[320px] [perspective:1200px] sm:h-[220px] sm:w-[420px]"
          aria-hidden={phase !== "book"}
        >
          <div className="book-glow absolute -inset-10 opacity-0 blur-2xl [background:radial-gradient(60%_45%_at_50%_50%,rgba(217,168,156,0.34),transparent_70%)]" />

          <div className="absolute inset-0 rounded-[22px] border border-[rgba(46,29,24,0.10)] bg-white/70 backdrop-blur-md" />

          <div className="absolute inset-0 flex items-stretch justify-between">
            <div className="relative h-full w-1/2 [transform-style:preserve-3d]">
              <div className="book-cover-left absolute inset-0 origin-left rounded-l-[22px] border border-[rgba(46,29,24,0.10)] bg-[linear-gradient(180deg,rgba(217,168,156,0.24),rgba(255,255,255,0.55))] shadow-[0_40px_120px_rgba(46,29,24,0.18)] [transform:rotateY(0deg)]" />
            </div>
            <div className="relative h-full w-1/2 [transform-style:preserve-3d]">
              <div className="book-cover-right absolute inset-0 origin-right rounded-r-[22px] border border-[rgba(46,29,24,0.10)] bg-[linear-gradient(180deg,rgba(200,164,106,0.16),rgba(255,255,255,0.55))] shadow-[0_40px_120px_rgba(46,29,24,0.18)] [transform:rotateY(0deg)]" />
            </div>
          </div>

          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "book" ? 1 : 0 }}
              transition={{ duration: 0.6 }}
              className="text-center font-[var(--font-cinematic)] text-xs tracking-[0.34em] text-[color:var(--muted)]"
            >
              ENTER
            </motion.div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-[rgba(46,29,24,0.14)] bg-white/70 px-5 py-2 text-xs tracking-[0.22em] text-[color:var(--muted)] backdrop-blur-md transition hover:bg-white/90 hover:text-[color:var(--foreground)]"
        onClick={onComplete}
      >
        SKIP
      </button>
    </div>
  );
}

