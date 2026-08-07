"use client";

import { motion } from "framer-motion";

/** Refined editorial storybook centerpiece — watercolor-adjacent gradients, soft light from the spine, no cartoon styling. */
export function HeroStorybookVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[min(100%,420px)] lg:max-w-[480px]">
      {/* Ambient glow from the “pages” */}
      <div
        className="pointer-events-none absolute -inset-8 rounded-[50%] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 55%, rgba(217, 168, 156, 0.35), transparent 70%), radial-gradient(50% 40% at 45% 45%, rgba(200, 164, 106, 0.22), transparent 65%)",
        }}
      />

      {/* Mid: soft storytelling shapes */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-6 top-1/4 h-32 w-32 rounded-full bg-[rgba(217,168,156,0.12)] blur-2xl"
        animate={{ x: [0, 6, 0], y: [0, -4, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-4 bottom-1/4 h-40 w-40 rounded-full bg-[rgba(200,164,106,0.10)] blur-2xl"
        animate={{ x: [0, -8, 0], y: [0, 6, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative"
        // Keep visible even if hydration/motion fails.
        initial={false}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="relative drop-shadow-[0_28px_60px_rgba(46,29,24,0.12)]"
        >
          <svg
            viewBox="0 0 400 320"
            className="h-auto w-full"
            role="img"
            aria-label="An open storybook with soft light rising from the pages"
          >
            <defs>
              <linearGradient id="hb-cover" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#efe4dc" />
                <stop offset="55%" stopColor="#f7f2ee" />
                <stop offset="100%" stopColor="#e8ddd4" />
              </linearGradient>
              <linearGradient id="hb-pageL" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffdfb" />
                <stop offset="100%" stopColor="#f3ebe4" />
              </linearGradient>
              <linearGradient id="hb-pageR" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fffdfb" />
                <stop offset="100%" stopColor="#efe6df" />
              </linearGradient>
              <radialGradient id="hb-glow" cx="50%" cy="65%" r="55%">
                <stop offset="0%" stopColor="rgba(217,168,156,0.45)" />
                <stop offset="45%" stopColor="rgba(200,164,106,0.18)" />
                <stop offset="100%" stopColor="rgba(247,242,238,0)" />
              </radialGradient>
              <filter id="hb-soft" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Book base / shadow */}
            <ellipse cx="200" cy="278" rx="118" ry="14" fill="rgba(46,29,24,0.06)" />

            {/* Back cover */}
            <path
              d="M 72 88 C 72 76 84 68 98 68 L 302 68 C 316 68 328 76 328 88 L 328 248 C 328 260 316 268 302 268 L 98 268 C 84 268 72 260 72 248 Z"
              fill="url(#hb-cover)"
              stroke="rgba(200,164,106,0.35)"
              strokeWidth="1"
            />

            {/* Left page */}
            <path
              d="M 198 78 L 108 82 C 96 83 88 92 88 104 L 88 238 C 88 250 98 260 112 260 L 198 254 Z"
              fill="url(#hb-pageL)"
              stroke="rgba(46,29,24,0.08)"
              strokeWidth="0.8"
              filter="url(#hb-soft)"
            />
            {/* Right page */}
            <path
              d="M 202 78 L 292 82 C 304 83 312 92 312 104 L 312 238 C 312 250 302 260 288 260 L 202 254 Z"
              fill="url(#hb-pageR)"
              stroke="rgba(46,29,24,0.08)"
              strokeWidth="0.8"
              filter="url(#hb-soft)"
            />

            {/* Spine / gutter light */}
            <path
              d="M 196 76 L 204 76 L 204 256 L 196 256 Z"
              fill="rgba(200,164,106,0.15)"
            />
            <ellipse cx="200" cy="210" rx="62" ry="78" fill="url(#hb-glow)" />

            {/* Elegant ink lines suggesting text — not literal type */}
            <g opacity="0.22" stroke="#2e1d18" strokeWidth="0.6" strokeLinecap="round">
              <path d="M 118 118 H 178" />
              <path d="M 118 132 H 172" />
              <path d="M 118 146 H 176" />
              <path d="M 222 118 H 282" />
              <path d="M 222 132 H 276" />
              <path d="M 222 146 H 280" />
            </g>

            {/* Subtle gold edge */}
            <path
              d="M 72 88 C 72 76 84 68 98 68 L 302 68 C 316 68 328 76 328 88"
              fill="none"
              stroke="rgba(200,164,106,0.4)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Paper motes — meaningful: rising from the page spread */}
      <PaperMotes />
      <SparkleField />
    </div>
  );
}

function PaperMotes() {
  const motes = [
    { left: "18%", delay: 0, duration: 9 },
    { left: "42%", delay: 1.2, duration: 11 },
    { left: "58%", delay: 2.4, duration: 10 },
    { left: "78%", delay: 0.8, duration: 12 },
    { left: "33%", delay: 3, duration: 10.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible">
      {motes.map((m, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[28%] h-1 w-2 rounded-full bg-[rgba(200,164,106,0.35)] opacity-0 shadow-[0_0_8px_rgba(217,168,156,0.4)]"
          style={{ left: m.left }}
          animate={{
            y: [0, -140],
            x: [0, (i % 2 === 0 ? 1 : -1) * 12],
            opacity: [0, 0.55, 0],
            scale: [0.8, 1, 0.6],
          }}
          transition={{
            duration: m.duration,
            repeat: Infinity,
            ease: "easeOut",
            delay: m.delay,
          }}
        />
      ))}
    </div>
  );
}

function SparkleField() {
  const stars = [
    { top: "12%", left: "8%", s: 0.6, d: 0 },
    { top: "22%", left: "88%", s: 0.5, d: 1.1 },
    { top: "8%", left: "52%", s: 0.45, d: 2 },
    { top: "38%", left: "4%", s: 0.4, d: 0.6 },
    { top: "18%", left: "72%", s: 0.5, d: 1.8 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((st, i) => (
        <motion.span
          key={i}
          className="absolute text-[color:var(--gold)]"
          style={{ top: st.top, left: st.left, fontSize: `${10 * st.s}px` }}
          animate={{ opacity: [0.2, 0.85, 0.2], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: st.d }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}
