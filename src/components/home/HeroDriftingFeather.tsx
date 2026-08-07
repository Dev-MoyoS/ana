"use client";

import { motion } from "framer-motion";

/** Signature storytelling mark: a single quill feather, slow poetic drift. */
export function HeroDriftingFeather() {
  return (
    <motion.div
      className="pointer-events-none absolute right-[4%] top-[18%] z-[2] hidden w-14 opacity-[0.55] sm:block lg:right-[8%] lg:top-[22%] lg:w-16"
      aria-hidden
      initial={{ opacity: 0, rotate: -8 }}
      animate={{ opacity: 0.55, rotate: [-8, 4, -6] }}
      transition={{ opacity: { duration: 1.2, delay: 0.6 }, rotate: { duration: 16, repeat: Infinity, ease: "easeInOut" } }}
    >
      <motion.svg
        viewBox="0 0 48 120"
        className="h-auto w-full text-[rgba(217,168,156,0.85)] drop-shadow-[0_4px_12px_rgba(200,164,106,0.2)]"
        animate={{ x: [0, 10, -6, 0], y: [0, 14, 6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          fill="currentColor"
          d="M24 4c-2 8-8 22-14 38-4 12-6 24-6 36 0 14 4 26 10 34 2 2 4 4 6 4s4-2 6-4c6-8 10-20 10-34 0-12-2-24-6-36C30 26 26 12 24 4z"
          opacity="0.35"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          d="M24 8v88M20 24c4 2 8 2 12 0M18 40c6 3 12 3 18 0M16 56c8 4 16 4 24 0M14 72c10 5 20 5 30 0"
        />
        <path
          fill="currentColor"
          d="M22 108l4 8 4-8c-1-2-3-3-4-3s-3 1-4 3z"
          opacity="0.5"
        />
      </motion.svg>
    </motion.div>
  );
}
