"use client";

import type { JournalPost } from "@/lib/types/content";
import { normalizeJournalMedia } from "@/lib/journal/media";

export function JournalEntryPreview({ draft }: { draft: Partial<JournalPost> }) {
  const media = normalizeJournalMedia({
    media: draft.media ?? [],
    gallery: draft.gallery ?? [],
    videos: draft.videos,
  });
  const words = (draft.body ?? "").trim().split(/\s+/).filter(Boolean).length;
  const title = draft.title?.trim() || "Untitled entry";
  const excerpt = draft.excerpt?.trim() || "Your excerpt will appear on the journal index.";

  return (
    <div className="rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-gradient-to-br from-white/90 to-[rgba(217,168,156,0.08)] p-5">
      <div className="font-[var(--font-cinematic)] text-[10px] tracking-[0.36em] text-[color:var(--muted)]">
        READER PREVIEW
      </div>
      <div className="mt-3 font-[var(--font-display)] text-xl leading-snug text-[color:var(--foreground)]">{title}</div>
      <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-[10px] tracking-[0.14em] text-[rgba(46,29,24,0.55)]">
        <span className="rounded-full border border-[rgba(46,29,24,0.10)] px-2 py-1">
          {(draft.category ?? "updates").toUpperCase()}
        </span>
        <span className="rounded-full border border-[rgba(46,29,24,0.10)] px-2 py-1">{words} WORDS</span>
        <span className="rounded-full border border-[rgba(46,29,24,0.10)] px-2 py-1">
          {media.filter((m) => m.kind === "image").length} PHOTOS
        </span>
        <span className="rounded-full border border-[rgba(46,29,24,0.10)] px-2 py-1">
          {media.filter((m) => m.kind === "video").length} VIDEOS
        </span>
        <span className="rounded-full border border-[rgba(46,29,24,0.10)] px-2 py-1">
          {draft.published ? "LIVE" : "DRAFT"}
        </span>
      </div>
      {media.length > 0 ? (
        <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
          {media.slice(0, 8).map((m) => (
            <div
              key={m.id}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[10px] border border-[rgba(46,29,24,0.10)] bg-white/70 text-[9px] tracking-[0.12em] text-[color:var(--muted)]"
            >
              {m.kind === "video" ? "▶" : "◻"}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
