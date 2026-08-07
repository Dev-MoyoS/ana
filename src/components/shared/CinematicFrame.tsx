"use client";

import Image, { type ImageProps } from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type Tone = "base" | "children" | "author" | "novel";
type Size = "hero" | "section" | "card";

export function CinematicFrame({
  src,
  alt,
  tone = "base",
  size = "section",
  priority,
  className,
  overlay,
  caption,
}: {
  src: ImageProps["src"];
  alt: string;
  tone?: Tone;
  size?: Size;
  priority?: boolean;
  className?: string;
  overlay?: ReactNode;
  caption?: ReactNode;
}) {
  const toneClass =
    tone === "children"
      ? "cinematic-frame--children"
      : tone === "author"
        ? "cinematic-frame--author"
        : tone === "novel"
          ? "cinematic-frame--novel"
          : "cinematic-frame--base";

  const sizeClass =
    size === "hero" ? "cinematic-frame--hero" : size === "card" ? "cinematic-frame--card" : "cinematic-frame--section";

  return (
    <motion.figure
      className={["cinematic-frame", toneClass, sizeClass, className].filter(Boolean).join(" ")}
      // Never hide essential imagery pre-hydration. Motion should enhance, not gate visibility.
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
    >
      <div className="cinematic-frame__bg" aria-hidden />
      <div className="cinematic-frame__grain" aria-hidden />

      <div className="cinematic-frame__media">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={
            size === "card"
              ? "(max-width: 768px) 100vw, 360px"
              : size === "hero"
                ? "(max-width: 1024px) 92vw, 520px"
                : "(max-width: 1024px) 92vw, 640px"
          }
          className="cinematic-frame__img"
        />
        {overlay ? <div className="cinematic-frame__overlay">{overlay}</div> : null}
        <div className="cinematic-frame__sheen" aria-hidden />
      </div>

      {caption ? <figcaption className="cinematic-frame__caption">{caption}</figcaption> : null}
    </motion.figure>
  );
}

