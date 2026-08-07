"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const MOCKUP_SRC = "/1000475710.jpg";
const SPREAD_SRC = "/1000475709.jpg";

export function BookCoverShowcase({
  showSpread = true,
  size = "default",
}: {
  showSpread?: boolean;
  size?: "default" | "large";
}) {
  const [flipped, setFlipped] = useState(false);
  const [view, setView] = useState<"mockup" | "spread">("mockup");

  const bookSize =
    size === "large"
      ? "w-full max-w-[min(100%,380px)] sm:max-w-[420px]"
      : "w-full max-w-[min(100%,300px)] sm:max-w-[340px]";

  return (
    <div className="book-showcase">
      {showSpread ? (
        <div className="mb-5 flex justify-center gap-2">
          <ViewTab active={view === "mockup"} onClick={() => setView("mockup")}>
            3D Mockup
          </ViewTab>
          <ViewTab active={view === "spread"} onClick={() => setView("spread")}>
            Full Jacket
          </ViewTab>
        </div>
      ) : null}

      {view === "mockup" ? (
        <div className="flex flex-col items-center">
          <div className={`book-showcase__stage ${bookSize}`}>
            <div
              className="book-showcase__glow"
              aria-hidden
              style={{ opacity: flipped ? 0.55 : 0.85 }}
            />

            <motion.button
              type="button"
              className="book-showcase__flip"
              onClick={() => setFlipped((f) => !f)}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              aria-label={flipped ? "Show front cover" : "Show back cover"}
            >
              <div className="book-showcase__face book-showcase__face--front">
                <Image
                  src={MOCKUP_SRC}
                  alt="Ana's Crooked Teeth — front cover"
                  fill
                  sizes="(max-width: 640px) 80vw, 340px"
                  className="book-showcase__crop book-showcase__crop--front"
                  priority
                />
                <div className="book-showcase__spine" aria-hidden />
                <div className="book-showcase__sheen" aria-hidden />
              </div>

              <div className="book-showcase__face book-showcase__face--back">
                <Image
                  src={MOCKUP_SRC}
                  alt="Ana's Crooked Teeth — back cover"
                  fill
                  sizes="(max-width: 640px) 80vw, 340px"
                  className="book-showcase__crop book-showcase__crop--back"
                />
                <div className="book-showcase__sheen" aria-hidden />
              </div>
            </motion.button>

            <div className="book-showcase__shadow" aria-hidden />
          </div>

          <p className="mt-5 text-center text-xs tracking-wide text-[rgba(46,29,24,0.52)]">
            <span className="font-[var(--font-cinematic)] tracking-[0.28em]">
              {flipped ? "BACK COVER" : "FRONT COVER"}
            </span>
            <span className="mx-2 text-[rgba(46,29,24,0.28)]">·</span>
            Tap to flip
          </p>
        </div>
      ) : (
        <motion.div
          className="book-showcase__spread-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="book-showcase__spread">
            <Image
              src={SPREAD_SRC}
              alt="Ana's Crooked Teeth — full book jacket spread showing front cover, spine, and back cover"
              fill
              sizes="(max-width: 1024px) 92vw, 720px"
              className="book-showcase__spread-img"
              priority
            />
            <div className="book-showcase__spread-sheen" aria-hidden />
          </div>
          <p className="mt-4 text-center text-xs text-[rgba(46,29,24,0.52)]">
            <span className="font-[var(--font-cinematic)] tracking-[0.28em]">FULL JACKET SPREAD</span>
            <span className="mx-2 text-[rgba(46,29,24,0.28)]">·</span>
            Back · Spine · Front
          </p>
        </motion.div>
      )}
    </div>
  );
}

function ViewTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-1.5 text-[11px] font-[var(--font-cinematic)] tracking-[0.22em] transition",
        active
          ? "bg-[rgba(46,29,24,0.88)] text-[color:var(--cream)] shadow-[0_8px_24px_rgba(46,29,24,0.14)]"
          : "border border-[rgba(46,29,24,0.12)] bg-white/60 text-[rgba(46,29,24,0.58)] hover:bg-white/90 hover:text-[color:var(--foreground)]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
