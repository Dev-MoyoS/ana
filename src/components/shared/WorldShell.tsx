"use client";

import Link from "next/link";
import { ReactNode } from "react";
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

      <header className="relative z-10 border-b border-[rgba(46,29,24,0.10)] bg-[rgba(247,242,238,0.74)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
            ← Back to the World
          </Link>
          <div className="hidden gap-4 text-sm text-[color:var(--muted)] sm:flex">
            <Link href="/world/children" className="hover:text-[color:var(--foreground)]">
              Children
            </Link>
            <Link href="/world/novel" className="hover:text-[color:var(--foreground)]">
              Novel
            </Link>
            <Link href="/storyteller" className="hover:text-[color:var(--foreground)]">
              Storyteller
            </Link>
            <Link href="/inside-the-world" className="hover:text-[color:var(--foreground)]">
              Journal
            </Link>
            <Link href="/library" className="hover:text-[color:var(--foreground)]">
              Library
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
          {eyebrow}
        </div>
        <h1 className="mt-5 font-[var(--font-display)] text-4xl tracking-tight text-glow sm:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--muted)] sm:text-lg">{subtitle}</p>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">{children}</section>
    </main>
  );
}

