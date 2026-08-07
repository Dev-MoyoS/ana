"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { WorldShell } from "../shared/WorldShell";
import { CinematicFrame } from "../shared/CinematicFrame";

const TIMELINE = [
  {
    year: "The Spark",
    title: "A childhood of stories",
    copy: "The first worlds were built from imagination—quiet moments becoming lifelong wonder.",
  },
  {
    year: "The Craft",
    title: "Learning the language of emotion",
    copy: "Words became a lantern: guiding characters, readers, and the writer herself.",
  },
  {
    year: "The Journey",
    title: "Sharing the light",
    copy: "School visits, journals, drafts, revisions—each page a promise to inspire.",
  },
];

export function StorytellerPage() {
  const [note, setNote] = useState<string | null>(null);
  const notes = useMemo(
    () => [
      "Write what you needed to hear.",
      "Let the page breathe.",
      "A story is a hand reaching back.",
    ],
    []
  );
  const portrait = "/WhatsApp%20Image%202026-05-06%20at%2022.53.32.jpeg";
  const bio = [
    "Analufuno Mudau is an 18-year-old passionate storyteller and an aspiring poet who believes in the power of words to heal, inspire, uplift and educate.",
    "She grew up in the village and later on moved to Gauteng where she was exposed to different types of writing and literature.",
    "Her writing focuses on promoting self-confidence, emotional growth and individuality in young readers, creating meaningful stories that help children feel seen, valued and proud of who they are.",
    "Inspired by her own journey of self-acceptance and living with a crooked smile, Ana’s Crooked Teeth reflects her belief that our differences are not flaws but something truly beautiful.",
    "Analufuno enjoys quiet moments of reflection, creativity and dreaming up stories that touch the heart, especially those that bring comfort and confidence to young readers.",
    "She matriculated in 2025 and looks forward to pursuing her career beyond writing.",
    "She is a sister to an 8-year-old little girl and her deceased older brother.",
    "Analufuno is both the daughter of a woman from a royal family and a plebeian man.",
    "Through her storytelling, Analufuno hopes to encourage children everywhere to embrace their uniqueness.",
  ] as const;

  return (
    <WorldShell
      eyebrow="The Storyteller"
      title="The Storyteller"
      subtitle="A warm, intimate author portrait—sunlit, editorial, and deeply human."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="panel relative overflow-hidden p-7 sm:p-10">
          <div className="absolute -inset-16 opacity-60 blur-3xl [background:radial-gradient(60%_55%_at_50%_45%,rgba(226,182,109,0.18),transparent_70%),radial-gradient(60%_55%_at_70%_70%,rgba(217,168,156,0.16),transparent_70%)]" />
          <div className="relative">
            <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
              About the Author
            </div>

            <div className="mt-7 grid gap-8 md:grid-cols-[1fr_300px] md:items-start">
              <div className="space-y-4 text-[color:var(--muted)]">
                {bio.map((p) => (
                  <p key={p} className="leading-7">
                    {p}
                  </p>
                ))}

                <div className="pt-2">
                  <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[rgba(46,29,24,0.55)]">
                    Quiet notes
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {notes.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setNote(n)}
                        className="rounded-full border border-[rgba(46,29,24,0.14)] bg-white/70 px-4 py-2 text-xs tracking-[0.22em] text-[color:var(--muted)] transition hover:bg-white/90 hover:text-[color:var(--foreground)]"
                      >
                        tap note
                      </button>
                    ))}
                  </div>
                  {note ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/75 p-4 text-sm text-[color:var(--muted)]"
                    >
                      <span className="text-[color:var(--accent)]">Handwritten note:</span> {note}
                    </motion.div>
                  ) : (
                    <div className="mt-4 text-xs text-[rgba(46,29,24,0.55)]">Hidden interaction: tap a floating note.</div>
                  )}
                </div>
              </div>

              <CinematicFrame
                src={portrait}
                alt="Analufuno Mudau portrait in warm natural light"
                tone="author"
                size="hero"
                overlay={
                  <div className="absolute inset-0 opacity-70 [background:radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.58),transparent_62%),radial-gradient(70%_55%_at_65%_85%,rgba(226,182,109,0.16),transparent_62%)]" />
                }
                caption={
                  <>
                    <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[rgba(46,29,24,0.62)]">
                      PORTRAIT
                    </span>
                    <span className="text-xs text-[rgba(46,29,24,0.58)]">Sunlit • intimate • human</span>
                  </>
                }
              />
            </div>
          </div>
        </div>

        <div className="panel p-7 sm:p-10">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
            Timeline Journey
          </div>
          <div className="mt-6 grid gap-4">
            {TIMELINE.map((t, idx) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-5"
              >
                <div className="text-xs tracking-[0.34em] text-[rgba(46,29,24,0.55)]">{t.year}</div>
                <div className="mt-2 font-[var(--font-display)] text-xl text-[color:var(--foreground)]">{t.title}</div>
                <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{t.copy}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </WorldShell>
  );
}

