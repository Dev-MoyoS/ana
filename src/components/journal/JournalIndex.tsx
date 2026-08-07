"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { WorldShell } from "../shared/WorldShell";
import { CinematicFrame } from "../shared/CinematicFrame";

type Post = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
};

const DEMO_POSTS: Post[] = [
  {
    id: "p1",
    title: "Why I write for wonder",
    category: "inspiration",
    excerpt: "A journal entry about emotion, imagination, and the quiet magic of pages.",
    date: "2026-04-12",
  },
  {
    id: "p2",
    title: "School visits: the moment stories become real",
    category: "school visits",
    excerpt: "When a classroom leans in together—storytelling turns into shared light.",
    date: "2026-03-28",
  },
  {
    id: "p3",
    title: "Behind the scenes: building the next world",
    category: "updates",
    excerpt: "Notes from the desk—drafts, revisions, and cinematic ideas for what comes next.",
    date: "2026-02-10",
  },
];

const BLOG_IMG = "/theme.jpg";

export function JournalIndex() {
  const [filter, setFilter] = useState<string>("all");
  const categories = useMemo(() => {
    const set = new Set(DEMO_POSTS.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, []);

  const posts = useMemo(() => {
    if (filter === "all") return DEMO_POSTS;
    return DEMO_POSTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <WorldShell
      eyebrow="Inside the World"
      title="A journal of light, craft, and becoming."
      subtitle="Elegant layouts, cinematic transitions, and category filtering—ready to be powered by Sanity content."
    >
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            className={[
              "rounded-full border px-4 py-2 text-xs tracking-[0.22em] backdrop-blur-md transition",
              filter === c
                ? "border-[color:var(--accent)] bg-[rgba(217,168,156,0.18)] text-[color:var(--foreground)] ring-glow"
                : "border-[rgba(46,29,24,0.14)] bg-white/70 text-[color:var(--muted)] hover:bg-white/90 hover:text-[color:var(--foreground)]",
            ].join(" ")}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {posts.map((p) => (
            <motion.article
              key={p.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group panel relative overflow-hidden p-6"
            >
              <div className="absolute -inset-10 opacity-0 blur-2xl transition group-hover:opacity-100 [background:radial-gradient(55%_50%_at_50%_50%,rgba(217,168,156,0.18),transparent_70%)]" />
              <div className="relative">
                <CinematicFrame
                  src={BLOG_IMG}
                  alt="Editorial journal imagery"
                  tone="base"
                  size="card"
                  className="mb-5"
                  overlay={
                    <div className="absolute inset-0 opacity-70 [background:radial-gradient(70%_55%_at_50%_20%,rgba(255,255,255,0.55),transparent_60%),radial-gradient(70%_55%_at_65%_85%,rgba(217,168,156,0.22),transparent_62%)]" />
                  }
                  caption={
                    <>
                      <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[rgba(46,29,24,0.58)]">
                        {p.category.toUpperCase()}
                      </span>
                      <span className="text-xs text-[rgba(46,29,24,0.55)]">{new Date(p.date).toDateString()}</span>
                    </>
                  }
                />
                <div className="text-xs tracking-[0.34em] text-[rgba(46,29,24,0.55)]">{p.category.toUpperCase()}</div>
                <h3 className="mt-3 font-[var(--font-display)] text-2xl leading-snug text-[color:var(--foreground)]">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{p.excerpt}</p>
                <div className="mt-5 text-xs text-[rgba(46,29,24,0.55)]">Read entry →</div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 rounded-[22px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-6 text-sm text-[color:var(--muted)]">
        Sanity wiring is scaffolded next. You’ll be able to manage posts/books in the CMS and have this page
        render real entries.
      </div>
    </WorldShell>
  );
}

