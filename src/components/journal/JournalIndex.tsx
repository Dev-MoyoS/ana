"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { listJournalPosts } from "@/lib/firebase/journal";
import type { JournalCategory, JournalPost } from "@/lib/types/content";
import { SiteContactPanel } from "../shared/SiteContactFooter";
import { WorldShell } from "../shared/WorldShell";
import { CinematicFrame } from "../shared/CinematicFrame";
import { JournalPostCard } from "./JournalPostCard";

const CATEGORY_LABELS: Record<JournalCategory | "all", string> = {
  all: "ALL",
  "school visits": "SCHOOL VISITS",
  "tour diary": "TOUR DIARY",
  "book progress": "BOOK PROGRESS",
  updates: "UPDATES",
  inspiration: "INSPIRATION",
};

export function JournalIndex() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    let mounted = true;
    listJournalPosts()
      .then((data) => {
        if (mounted) setPosts(data);
      })
      .catch(() => {
        if (mounted) setPosts([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["all", ...Array.from(set)] as const;
  }, [posts]);

  const filtered = useMemo(() => {
    if (filter === "all") return posts;
    return posts.filter((p) => p.category === filter);
  }, [posts, filter]);

  const featured = posts.find((p) => p.featured) ?? posts[0];

  return (
    <WorldShell
      eyebrow="Inside the World"
      title="Ana's journal — schools, stories, and the road ahead."
      subtitle="Follow Ana The Author on tour: school visits, book progress, photos from the journey, and quiet notes from behind the pages."
    >
      {featured ? (
        <div className="panel relative mb-8 overflow-hidden p-7 sm:p-10">
          <div className="absolute -inset-16 opacity-60 blur-3xl [background:radial-gradient(60%_55%_at_40%_40%,rgba(217,168,156,0.22),transparent_70%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
                Featured Entry
              </div>
              <h2 className="mt-4 font-[var(--font-display)] text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-[color:var(--muted)]">{featured.excerpt}</p>
              {featured.location ? (
                <p className="mt-3 text-xs tracking-[0.28em] text-[rgba(46,29,24,0.52)]">
                  {featured.location.toUpperCase()}
                </p>
              ) : null}
              <div className="mt-7">
                <Link href={`/inside-the-world/${featured.slug}`} className="btn-luxury-primary px-8 py-3.5 text-sm">
                  Read the full entry
                </Link>
              </div>
            </div>
            <Link href={`/inside-the-world/${featured.slug}`} className="block">
              <CinematicFrame
                src={featured.coverImage}
                alt={featured.title}
                tone="children"
                size="section"
                overlay={
                  <div className="absolute inset-0 opacity-75 [background:radial-gradient(70%_55%_at_45%_20%,rgba(255,255,255,0.58),transparent_62%),radial-gradient(70%_55%_at_70%_85%,rgba(217,168,156,0.22),transparent_62%)]" />
                }
              />
            </Link>
          </div>
        </div>
      ) : null}

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
            {CATEGORY_LABELS[c as keyof typeof CATEGORY_LABELS] ?? c.toUpperCase()}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 text-sm text-[color:var(--muted)]">Loading journal entries…</div>
      ) : (
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <JournalPostCard key={p.id} post={p} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filtered.length === 0 ? (
        <div className="mt-8 rounded-[22px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-6 text-sm text-[color:var(--muted)]">
          No entries in this category yet. New posts will appear here as Ana continues the tour.
        </div>
      ) : null}

      <div className="mt-10">
        <SiteContactPanel title="Invite Ana to your school" />
      </div>
    </WorldShell>
  );
}
