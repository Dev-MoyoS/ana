"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { MobileSiteNav } from "./MobileSiteNav";
import { ParticleField } from "./ParticleField";

export function WorldShell({
  eyebrow,
  title,
  subtitle,
  children,
  tone = "base",
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  tone?: "base" | "children" | "novel";
}) {
  const bg =
    tone === "children"
      ? "radial-gradient(70% 60% at 40% 20%, rgba(217,168,156,0.22), transparent 60%), radial-gradient(60% 50% at 70% 35%, rgba(200,164,106,0.14), transparent 62%), linear-gradient(180deg, #f7f2ee, #f7f2ee)"
      : tone === "novel"
        ? "radial-gradient(70% 60% at 55% 20%, rgba(46,29,24,0.10), transparent 60%), radial-gradient(65% 60% at 70% 60%, rgba(200,164,106,0.12), transparent 60%), linear-gradient(180deg, #f7f2ee, #f7f2ee)"
        : "radial-gradient(70% 60% at 50% 20%, rgba(217,168,156,0.16), transparent 60%), linear-gradient(180deg, #f7f2ee, #f7f2ee)";

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ backgroundImage: bg }}>
      <ParticleField className="absolute inset-0 opacity-35" />

      <header className="site-header relative z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="min-h-11 shrink-0 content-center text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
          >
            ← Home
          </Link>
          <MobileSiteNav compactLabels />
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="font-[var(--font-cinematic)] text-[10px] tracking-[0.36em] text-[color:var(--muted)] sm:text-xs sm:tracking-[0.44em]">
          {eyebrow}
        </div>
        <h1 className="mt-4 font-[var(--font-display)] text-[clamp(2rem,8vw,3.75rem)] leading-[1.05] tracking-tight text-glow sm:mt-5">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)] sm:mt-5 sm:text-lg">{subtitle}</p>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24">{children}</section>
    </main>
  );
}

