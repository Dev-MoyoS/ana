"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { BookCoverShowcase } from "../shared/BookCoverShowcase";
import { WorldShell } from "../shared/WorldShell";
import { CinematicFrame } from "../shared/CinematicFrame";

const PAGES = [
  {
    title: "Page One",
    line: "A warm light dances across the paper… and a brave little thought wakes up.",
    glow: "rgba(200,164,106,0.20)",
  },
  {
    title: "Page Two",
    line: "Stars drift like playful commas—each one teaching courage, kindness, and wonder.",
    glow: "rgba(217,168,156,0.22)",
  },
  {
    title: "Page Three",
    line: "And somewhere between laughter and learning… a new world becomes home.",
    glow: "rgba(46,29,24,0.08)",
  },
];

export function ChildrenWorld() {
  const [page, setPage] = useState(0);
  const quote = useMemo(() => PAGES[page], [page]);
  const bookPages = [
    "/file_00000000ae60722f887e8a3ca5db101e.png",
    "/file_00000000ba0871fd9204ea33873d9875.png",
    "/file_00000000d89c71fd854624ed99229e0a.png",
  ] as const;

  return (
    <WorldShell
      tone="children"
      eyebrow="Children’s Story World"
      title="A storybook you can step inside."
      subtitle="Warm, magical, uplifting—where pages turn with gentle motion, stars hide tiny wisdom, and imagination feels real."
    >
      <div className="panel relative mb-6 overflow-hidden p-7 sm:p-10">
        <div className="absolute -inset-16 opacity-60 blur-3xl [background:radial-gradient(60%_55%_at_50%_45%,rgba(226,182,109,0.24),transparent_70%),radial-gradient(60%_55%_at_70%_60%,rgba(217,168,156,0.18),transparent_70%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
              The Book
            </div>
            <h2 className="mt-5 font-[var(--font-display)] text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
              Ana&apos;s Crooked Teeth
            </h2>
            <p className="mt-2 font-[var(--font-display-2)] text-lg italic text-[color:var(--muted)]">
              The Story of a Unique Smile
            </p>
            <p className="mt-4 max-w-xl text-[color:var(--muted)]">
              Written by Analufuno Mudau — a heartfelt story about self-love, confidence, and embracing what makes
              you beautifully unique. Tap the book to flip between front and back, or view the full jacket spread.
            </p>
          </div>
          <BookCoverShowcase size="large" />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="panel relative overflow-hidden p-7 sm:p-10">
          <div
            className="absolute -inset-12 blur-3xl opacity-60"
            style={{
              background: `radial-gradient(60% 55% at 50% 40%, ${quote.glow}, transparent 70%)`,
            }}
          />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
                Cinematic Interactive Preview
              </div>
              <div className="text-xs text-[rgba(46,29,24,0.55)]">
                {page + 1}/{PAGES.length}
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_280px]">
              <div>
                <div className="font-[var(--font-display)] text-3xl text-[color:var(--foreground)]">
                  {quote.title}
                </div>
                <p className="mt-3 max-w-xl text-[color:var(--muted)]">{quote.line}</p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    className="btn-aurora px-6 py-3 text-sm"
                    type="button"
                    onClick={() => setPage((p) => (p - 1 + PAGES.length) % PAGES.length)}
                  >
                    Turn Back
                  </button>
                  <button
                    className="rounded-full border border-[rgba(46,29,24,0.14)] bg-white/70 px-6 py-3 text-sm text-[color:var(--foreground)]/80 backdrop-blur-md transition hover:bg-white/90 hover:text-[color:var(--foreground)]"
                    type="button"
                    onClick={() => setPage((p) => (p + 1) % PAGES.length)}
                  >
                    Turn Page
                  </button>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  <MiniValue title="Imagination" copy="Builds creative confidence and curiosity." />
                  <MiniValue title="Language" copy="Supports vocabulary, reading rhythm, and expression." />
                  <MiniValue title="Heart" copy="Gentle emotional lessons that stay." />
                </div>
              </div>

              <div className="relative">
                <motion.div
                  key={page}
                  initial={{ rotateY: 14, opacity: 0, y: 8 }}
                  animate={{ rotateY: 0, opacity: 1, y: 0 }}
                  exit={{ rotateY: -14, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative aspect-[3/4] w-full overflow-hidden rounded-[22px] border border-[rgba(46,29,24,0.10)] bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(239,228,220,0.72))] shadow-[0_40px_120px_rgba(46,29,24,0.14)]"
                >
                  <div className="absolute inset-0 opacity-70 [background:radial-gradient(70%_55%_at_50%_25%,rgba(217,168,156,0.20),transparent_60%),radial-gradient(65%_55%_at_30%_70%,rgba(200,164,106,0.14),transparent_60%)]" />
                  <div className="absolute inset-0 grid place-items-center p-6">
                    <div className="text-center">
                      <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[color:var(--muted)]">
                        SAMPLE PAGE
                      </div>
                      <div className="mt-3 font-[var(--font-display)] text-2xl text-[color:var(--foreground)]">
                        {quote.title}
                      </div>
                      <div className="mt-3 text-sm text-[color:var(--muted)]">
                        Tap stars to reveal hidden quotes.
                      </div>
                    </div>
                  </div>
                </motion.div>

                <StarRow />
              </div>
            </div>
          </div>
        </div>

        <div className="panel relative overflow-hidden p-7 sm:p-10">
          <div className="absolute -inset-16 opacity-60 blur-3xl [background:radial-gradient(60%_55%_at_50%_45%,rgba(217,168,156,0.22),transparent_70%)]" />
          <div className="relative">
            <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
              From the Book
            </div>
            <div className="mt-5 font-[var(--font-display-2)] text-3xl text-[color:var(--foreground)]">
              Page moments—warm, cinematic, and kind.
            </div>
            <p className="mt-3 text-[color:var(--muted)]">
              A gentle visual rhythm that supports the story’s heart: confidence, self-love, and celebrating what
              makes you unique.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {bookPages.map((src, i) => (
                <CinematicFrame
                  key={src}
                  src={src}
                  alt={`Ana’s Crooked Teeth — illustrated page ${i + 1}`}
                  tone="children"
                  size="card"
                  overlay={
                    <div className="absolute inset-0 opacity-70 [background:radial-gradient(70%_55%_at_45%_20%,rgba(255,255,255,0.58),transparent_62%),radial-gradient(70%_55%_at_70%_85%,rgba(217,168,156,0.18),transparent_62%)]" />
                  }
                  caption={
                    <>
                      <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[rgba(46,29,24,0.60)]">
                        PAGE {i + 1}
                      </span>
                      <span className="text-xs text-[rgba(46,29,24,0.56)]">A moment of becoming</span>
                    </>
                  }
                />
              ))}
            </div>
          </div>
        </div>

        <div className="panel p-7 sm:p-10">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
            For Schools
          </div>
          <div className="mt-5 font-[var(--font-display-2)] text-3xl text-[color:var(--foreground)]">
            Premium learning—wrapped in wonder.
          </div>
          <p className="mt-3 text-[color:var(--muted)]">
            Curriculum-friendly storytelling designed to uplift classrooms: reading impact, discussion prompts,
            and printable teacher resources.
          </p>

          <div className="mt-7">
            <CinematicFrame
              src={bookPages[0]}
              alt="Children reading in warm light"
              tone="children"
              size="section"
              overlay={
                <div className="absolute inset-0 opacity-75 [background:radial-gradient(70%_55%_at_40%_20%,rgba(255,255,255,0.62),transparent_60%),radial-gradient(70%_55%_at_70%_85%,rgba(217,168,156,0.22),transparent_62%)]" />
              }
              caption={
                <>
                  <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[rgba(46,29,24,0.62)]">
                    STORY MOMENT
                  </span>
                  <span className="text-xs text-[rgba(46,29,24,0.58)]">Warm classrooms • wonder • reading light</span>
                </>
              }
            />
          </div>

          <div className="mt-7 grid gap-4">
            <SchoolPoint title="Educational value" copy="Themes that support empathy, curiosity, and confidence." />
            <SchoolPoint title="Curriculum support" copy="Reading comprehension, vocabulary, and reflection." />
            <SchoolPoint title="Teacher resources" copy="Downloadable prompts and activity sheets (dashboard-managed)." />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button className="btn-aurora px-6 py-3 text-sm" type="button">
              Download Teacher Pack
            </button>
            <button
              className="rounded-full border border-[rgba(46,29,24,0.14)] bg-white/70 px-6 py-3 text-sm text-[color:var(--foreground)]/80 backdrop-blur-md transition hover:bg-white/90 hover:text-[color:var(--foreground)]"
              type="button"
            >
              Book a School Visit
            </button>
          </div>

          <p className="mt-3 text-xs text-[rgba(46,29,24,0.55)]">Next: connect downloads + contact workflow.</p>
        </div>
      </div>
    </WorldShell>
  );
}

function MiniValue({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-4">
      <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[color:var(--muted)]">
        {title}
      </div>
      <div className="mt-2 text-sm text-[color:var(--ink-soft)]">{copy}</div>
    </div>
  );
}

function SchoolPoint({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-4">
      <div className="font-[var(--font-display)] text-lg text-[color:var(--foreground)]">{title}</div>
      <div className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{copy}</div>
    </div>
  );
}

function StarRow() {
  const [message, setMessage] = useState<string | null>(null);
  const quotes = [
    "A little wonder is a big beginning.",
    "Kindness is a light you can carry.",
    "Every page teaches the heart.",
  ];
  return (
    <div className="mt-4">
      <div className="flex items-center justify-center gap-3">
        {quotes.map((q, idx) => (
          <button
            key={idx}
            type="button"
            className="h-10 w-10 rounded-full border border-[rgba(46,29,24,0.12)] bg-white/70 text-[color:var(--gold)] backdrop-blur-md transition hover:scale-[1.03] hover:border-[rgba(200,164,106,0.38)] hover:bg-white/90"
            onClick={() => setMessage(q)}
            aria-label="Reveal a hidden quote"
          >
            ✦
          </button>
        ))}
      </div>
      {message ? (
        <div className="mt-3 text-center text-sm text-[color:var(--muted)]">
          <span className="text-[color:var(--gold)]">“</span>
          {message}
          <span className="text-[color:var(--gold)]">”</span>
        </div>
      ) : (
        <div className="mt-3 text-center text-xs text-[rgba(46,29,24,0.55)]">
          Hidden interaction: click a star.
        </div>
      )}
    </div>
  );
}

