"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getJournalPostBySlug } from "@/lib/firebase/journal";
import type { JournalPost } from "@/lib/types/content";
import { JournalPostView } from "./JournalPostView";

export function JournalSlugPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [post, setPost] = useState<JournalPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    getJournalPostBySlug(slug)
      .then((data) => {
        if (!mounted) return;
        if (!data) setMissing(true);
        else setPost(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-sm text-[color:var(--muted)]">Loading entry…</div>
    );
  }

  if (missing || !post) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="font-[var(--font-display)] text-3xl text-[color:var(--foreground)]">Entry not found</h1>
        <Link href="/inside-the-world" className="mt-4 inline-block text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
          ← Back to the journal
        </Link>
      </div>
    );
  }

  return <JournalPostView post={post} />;
}
