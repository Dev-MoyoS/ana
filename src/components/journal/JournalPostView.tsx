"use client";

import Link from "next/link";
import type { JournalPost } from "@/lib/types/content";
import { SiteContactPanel } from "../shared/SiteContactFooter";
import { WorldShell } from "../shared/WorldShell";
import { CinematicFrame } from "../shared/CinematicFrame";
import { JournalMediaGallery } from "./JournalMediaGallery";

export function JournalPostView({ post }: { post: JournalPost }) {
  const paragraphs = post.body.split(/\n\n+/).filter(Boolean);

  return (
    <WorldShell
      eyebrow="Author's Journal"
      title={post.title}
      subtitle={post.excerpt}
    >
      <div className="mb-8 flex flex-wrap items-center gap-3 text-xs tracking-[0.28em] text-[rgba(46,29,24,0.55)]">
        <span className="rounded-full border border-[rgba(46,29,24,0.12)] bg-white/70 px-3 py-1">
          {post.category.toUpperCase()}
        </span>
        <span>{new Date(post.createdAt).toDateString()}</span>
        {post.location ? <span>{post.location}</span> : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start xl:gap-10">
        <article className="panel p-7 sm:p-10">
          <div className="prose-journal space-y-5 text-[color:var(--muted)]">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-8">
                {p}
              </p>
            ))}
          </div>
        </article>

        <div className="space-y-5">
          <CinematicFrame
            src={post.coverImage}
            alt={post.title}
            tone="children"
            size="section"
            priority
          />

          <JournalMediaGallery post={post} />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
        <Link
          href="/inside-the-world"
          className="text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
        >
          ← Back to the journal
        </Link>
        <SiteContactPanel title="School visits & messages" />
      </div>
    </WorldShell>
  );
}
