"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { JournalPost } from "@/lib/types/content";
import { CinematicFrame } from "../shared/CinematicFrame";

export function JournalPostCard({ post }: { post: JournalPost }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group panel relative overflow-hidden p-6"
    >
      <div className="absolute -inset-10 opacity-0 blur-2xl transition group-hover:opacity-100 [background:radial-gradient(55%_50%_at_50%_50%,rgba(217,168,156,0.18),transparent_70%)]" />
      <div className="relative">
        <Link href={`/inside-the-world/${post.slug}`} className="block">
          <CinematicFrame
            src={post.coverImage}
            alt={post.title}
            tone="base"
            size="card"
            className="mb-5"
            overlay={
              <div className="absolute inset-0 opacity-70 [background:radial-gradient(70%_55%_at_50%_20%,rgba(255,255,255,0.55),transparent_60%),radial-gradient(70%_55%_at_65%_85%,rgba(217,168,156,0.22),transparent_62%)]" />
            }
            caption={
              <>
                <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[rgba(46,29,24,0.58)]">
                  {post.category.toUpperCase()}
                </span>
                <span className="text-xs text-[rgba(46,29,24,0.55)]">
                  {new Date(post.createdAt).toDateString()}
                </span>
              </>
            }
          />
          {post.location ? (
            <div className="text-xs tracking-[0.28em] text-[rgba(46,29,24,0.50)]">{post.location.toUpperCase()}</div>
          ) : null}
          <h3 className="mt-3 font-[var(--font-display)] text-2xl leading-snug text-[color:var(--foreground)]">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{post.excerpt}</p>
          <div className="mt-5 text-xs text-[rgba(46,29,24,0.55)]">Read entry →</div>
        </Link>
      </div>
    </motion.article>
  );
}
