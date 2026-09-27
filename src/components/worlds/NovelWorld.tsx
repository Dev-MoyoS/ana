"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ContactEmailLink } from "../shared/ContactEmailLink";
import { SiteContactPanel } from "../shared/SiteContactFooter";
import { WorldShell } from "../shared/WorldShell";
import { CinematicFrame } from "../shared/CinematicFrame";

function daysUntil(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function NovelWorld() {
  const release = useMemo(() => new Date(new Date().getFullYear(), 10, 1), []);
  const [d, setD] = useState(() => daysUntil(release));
  const [egg, setEgg] = useState<string | null>(null);
  const novelImg = "/theme.jpg";

  useEffect(() => {
    const id = window.setInterval(() => setD(daysUntil(release)), 20_000);
    return () => window.clearInterval(id);
  }, [release]);

  return (
    <WorldShell
      tone="novel"
      eyebrow="Upcoming Novel World"
      title="Moonlight, fog, and a secret waiting to be named."
      subtitle="A cinematic teaser space—dramatic, elegant, mysterious. Like stepping into the first breath of a trailer."
    >
      <div className="relative overflow-hidden rounded-[26px] border border-[rgba(46,29,24,0.10)] bg-white/70 p-8 backdrop-blur-md sm:p-12">
        <div className="absolute inset-0 opacity-55 [background:radial-gradient(70%_55%_at_50%_35%,rgba(46,29,24,0.06),transparent_62%),radial-gradient(70%_65%_at_70%_80%,rgba(200,164,106,0.14),transparent_62%)]" />
        <FogLayer />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
              Teaser Synopsis
            </div>
            <h2 className="mt-5 font-[var(--font-display)] text-3xl text-[color:var(--foreground)] sm:text-5xl">
              A promise written in darkness.
            </h2>
            <p className="mt-5 max-w-2xl text-[color:var(--muted)]">
              In a city where silence is currency, a single voice begins to disrupt the night. A story of love,
              secrets, and the haunting cost of truth—told with cinematic elegance.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <TeaserPill title="Mood" copy="Elegant • Mysterious • Emotional" />
              <TeaserPill title="Atmosphere" copy="Fog • Moonlight • Silver rain" />
              <TeaserPill title="Experience" copy="Scroll-driven reveals + hidden clues" />
            </div>

            <div className="mt-10">
              <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.44em] text-[color:var(--muted)]">
                Quote Reveals
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <QuoteCard
                  onReveal={() => setEgg("You found a hidden page: “The night remembers.”")}
                  quote="“Some nights don’t end… they transform.”"
                />
                <QuoteCard
                  onReveal={() => setEgg("Easter egg unlocked: a silver feather drifts past the moon.")}
                  quote="“A secret is a story begging to be told.”"
                />
              </div>
              {egg ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/75 p-4 text-sm text-[color:var(--muted)]"
                >
                  <span className="text-[color:var(--gold)]">Hidden discovery:</span> {egg}
                </motion.div>
              ) : (
                <div className="mt-4 text-xs text-[rgba(46,29,24,0.55)]">
                  Hidden interaction: click a quote card.
                </div>
              )}
            </div>
          </div>

          <div className="panel relative overflow-hidden p-7 sm:p-8">
            <div className="absolute -inset-10 opacity-60 blur-3xl [background:radial-gradient(60%_55%_at_50%_50%,rgba(217,168,156,0.22),transparent_70%)]" />
            <div className="relative">
              <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
                Release Countdown
              </div>
              <div className="mt-5 font-[var(--font-display)] text-5xl text-[color:var(--foreground)]">
                {d}
                <span className="ml-2 text-lg text-[color:var(--muted)]">days</span>
              </div>
              <div className="mt-2 text-sm text-[color:var(--muted)]">Target date: {release.toDateString()}</div>

              <div className="mt-8">
                <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
                  Waitlist
                </div>
                <form className="mt-4 grid gap-3">
                  <input
                    className="h-11 rounded-full border border-[rgba(46,29,24,0.14)] bg-white/80 px-4 text-sm text-[color:var(--foreground)] outline-none placeholder:text-[rgba(46,29,24,0.45)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[rgba(217,168,156,0.22)]"
                    placeholder="Email address"
                    type="email"
                    required
                  />
                  <button className="btn-aurora h-11 px-6 text-sm" type="submit">
                    Join the Waitlist
                  </button>
                  <p className="text-xs text-[rgba(46,29,24,0.55)]">
                    Provider integration comes next. Until then, email Ana to join the waitlist:{" "}
                    <ContactEmailLink subject="Novel waitlist" className="text-[color:var(--foreground)]/70" />
                  </p>
                </form>
              </div>

              <div className="mt-8">
                <CinematicFrame
                  src={novelImg}
                  alt="A foggy cinematic landscape in moonlight"
                  tone="novel"
                  size="section"
                  overlay={
                    <div className="absolute inset-0 opacity-80 [background:radial-gradient(70%_55%_at_45%_20%,rgba(46,29,24,0.22),transparent_62%),radial-gradient(70%_55%_at_70%_85%,rgba(200,164,106,0.14),transparent_62%),linear-gradient(180deg,rgba(46,29,24,0.14),rgba(46,29,24,0.04))]" />
                  }
                  caption={
                    <>
                      <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[rgba(46,29,24,0.64)]">
                        CINEMATIC STILL
                      </span>
                      <span className="text-xs text-[rgba(46,29,24,0.58)]">Fog • moonlight • a promise</span>
                    </>
                  }
                />
              </div>

              <div className="mt-8 rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/70 p-4">
                <div className="text-xs tracking-[0.34em] text-[rgba(46,29,24,0.55)]">HIDDEN EASTER EGG</div>
                <button
                  type="button"
                  className="mt-3 w-full rounded-full border border-[rgba(46,29,24,0.14)] bg-white/80 px-4 py-2 text-sm text-[color:var(--foreground)]/80 transition hover:bg-white hover:text-[color:var(--foreground)]"
                  onClick={() => setEgg("You pressed the quiet button. The fog parts—just for you.")}
                >
                  Don’t press this
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <SiteContactPanel title="Questions about the novel" />
      </div>
    </WorldShell>
  );
}

function TeaserPill({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-4">
      <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[color:var(--muted)]">
        {title}
      </div>
      <div className="mt-2 text-sm text-[color:var(--ink-soft)]">{copy}</div>
    </div>
  );
}

function QuoteCard({ quote, onReveal }: { quote: string; onReveal: () => void }) {
  return (
    <button
      type="button"
      onClick={onReveal}
      className="group rounded-[20px] border border-[rgba(46,29,24,0.10)] bg-white/70 p-5 text-left backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/90"
    >
      <div className="font-[var(--font-display-2)] text-xl leading-snug text-[color:var(--foreground)]">
        {quote}
      </div>
      <div className="mt-3 text-xs tracking-[0.34em] text-[rgba(46,29,24,0.55)] transition group-hover:text-[rgba(46,29,24,0.72)]">
        REVEAL
      </div>
    </button>
  );
}

function FogLayer() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(70%_55%_at_40%_50%,rgba(46,29,24,0.06),transparent_65%)]" />
      <div className="pointer-events-none absolute -inset-20 opacity-18 blur-3xl [background:conic-gradient(from_180deg_at_50%_50%,rgba(217,168,156,0.0),rgba(217,168,156,0.12),rgba(200,164,106,0.10),rgba(217,168,156,0.0))] [animation:fogspin_22s_linear_infinite]" />
      <style jsx>{`
        @keyframes fogspin {
          0% {
            transform: rotate(0deg) translateZ(0);
          }
          100% {
            transform: rotate(360deg) translateZ(0);
          }
        }
      `}</style>
    </>
  );
}

