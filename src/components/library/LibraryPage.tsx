"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { WorldShell } from "../shared/WorldShell";
import { CinematicFrame } from "../shared/CinematicFrame";

const RETAILERS = [
  { name: "Amazon Kindle", href: "#" },
  { name: "Audible", href: "#" },
  { name: "Takealot", href: "#" },
  { name: "Apple Books", href: "#" },
  { name: "Kobo", href: "#" },
];

export function LibraryPage() {
  const shelfImg = "/theme.jpg";
  return (
    <WorldShell
      eyebrow="The Library"
      title="A premium digital shelf of worlds."
      subtitle="Ebooks, audiobooks, and future physical editions—presented like an immersive cinematic library."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="panel p-7 sm:p-10">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
            Featured Collection
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <BookCard
              title="Ana's Crooked Teeth"
              mood="Warm • Magical • Uplifting"
              tone="children"
              coverSrc="/1000475710.jpg"
            />
            <BookCard title="Upcoming Novel (Teaser)" mood="Elegant • Mysterious • Cinematic" tone="novel" />
          </div>

          <div className="mt-8">
            <CinematicFrame
              src={shelfImg}
              alt="A luxurious library shelf in warm light"
              tone="base"
              size="section"
              overlay={
                <div className="absolute inset-0 opacity-75 [background:radial-gradient(70%_55%_at_45%_20%,rgba(255,255,255,0.58),transparent_62%),radial-gradient(70%_55%_at_70%_85%,rgba(217,168,156,0.22),transparent_62%)]" />
              }
              caption={
                <>
                  <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[rgba(46,29,24,0.62)]">
                    CINEMATIC SHELF
                  </span>
                  <span className="text-xs text-[rgba(46,29,24,0.58)]">Warm light • premium spacing • depth</span>
                </>
              }
            />
          </div>

          <div className="mt-8 rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-5 text-sm text-[color:var(--muted)]">
            Payments: Stripe + PayFast + Gumroad/LemonSqueezy compatibility are planned. This page is set up as
            an experience-first library; we’ll plug in checkout and product catalog next.
          </div>
        </div>

        <div className="panel p-7 sm:p-10">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
            Retailer Links
          </div>
          <div className="mt-6 grid gap-3">
            {RETAILERS.map((r, idx) => (
              <motion.a
                key={r.name}
                href={r.href}
                target={r.href.startsWith("http") ? "_blank" : undefined}
                rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="group flex items-center justify-between rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/70 px-5 py-4 text-[color:var(--foreground)]/80 backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/90 hover:text-[color:var(--foreground)]"
              >
                <span className="font-[var(--font-display)] text-lg">{r.name}</span>
                <span className="text-[color:var(--accent)] transition group-hover:translate-x-0.5">→</span>
              </motion.a>
            ))}
          </div>

          <div className="mt-8 text-xs text-[rgba(46,29,24,0.55)]">Manage these links in the Admin Dashboard.</div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-aurora px-6 py-3 text-center text-sm" href="/admin">
              Go to Admin
            </Link>
            <Link
              className="rounded-full border border-[rgba(46,29,24,0.14)] bg-white/70 px-6 py-3 text-center text-sm text-[color:var(--foreground)]/80 backdrop-blur-md transition hover:bg-white/90 hover:text-[color:var(--foreground)]"
              href="/inside-the-world"
            >
              Read the Journal
            </Link>
          </div>
        </div>
      </div>
    </WorldShell>
  );
}

function BookCard({
  title,
  mood,
  tone,
  coverSrc,
}: {
  title: string;
  mood: string;
  tone: "children" | "novel";
  coverSrc?: string;
}) {
  const glow =
    tone === "children"
      ? "radial-gradient(55% 50% at 50% 50%, rgba(217,168,156,0.22), transparent 70%), radial-gradient(55% 50% at 60% 60%, rgba(200,164,106,0.14), transparent 72%)"
      : "radial-gradient(55% 50% at 50% 50%, rgba(46,29,24,0.10), transparent 70%), radial-gradient(55% 50% at 60% 60%, rgba(200,164,106,0.14), transparent 72%)";

  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-6">
      <div className="absolute -inset-10 opacity-0 blur-2xl transition group-hover:opacity-100" style={{ background: glow }} />
      <div className="relative grid gap-5">
        <div>
          <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[color:var(--muted)]">
            3D BOOK MOCKUP
          </div>
          <div className="mt-2 font-[var(--font-display)] text-2xl text-[color:var(--foreground)]">{title}</div>
          <div className="mt-2 text-sm text-[color:var(--muted)]">{mood}</div>
        </div>

        <div className="relative h-44">
          {coverSrc ? (
            <div className="absolute left-1/2 top-1/2 h-40 w-[7.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px_14px_14px_10px] border border-[rgba(46,29,24,0.10)] shadow-[0_24px_70px_rgba(46,29,24,0.18)] [transform:perspective(900px)_rotateY(-8deg)]">
              <Image
                src={coverSrc}
                alt={`${title} cover`}
                fill
                sizes="120px"
                className="object-cover object-[24%_center]"
              />
            </div>
          ) : (
            <>
              <div className="absolute left-2 top-2 h-36 w-28 rounded-[14px] border border-[rgba(46,29,24,0.10)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(239,228,220,0.62))] shadow-[0_30px_90px_rgba(46,29,24,0.16)] [transform:perspective(900px)_rotateY(-18deg)]" />
              <div className="absolute left-8 top-4 h-36 w-28 rounded-[14px] border border-[rgba(46,29,24,0.10)] bg-[linear-gradient(180deg,rgba(217,168,156,0.22),rgba(255,255,255,0.60))] shadow-[0_30px_90px_rgba(46,29,24,0.14)] [transform:perspective(900px)_rotateY(-10deg)]" />
              <div className="absolute left-14 top-6 h-36 w-28 rounded-[14px] border border-[rgba(46,29,24,0.10)] bg-[linear-gradient(180deg,rgba(200,164,106,0.18),rgba(255,255,255,0.62))] shadow-[0_30px_90px_rgba(46,29,24,0.12)] [transform:perspective(900px)_rotateY(-2deg)]" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

