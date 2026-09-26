"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookBySlug } from "@/lib/firebase/books";
import type { BookProduct } from "@/lib/types/content";
import { BookProductView } from "./BookProductView";

export function BookSlugPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const [book, setBook] = useState<BookProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    getBookBySlug(slug)
      .then((data) => {
        if (mounted) setBook(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return <div className="mx-auto max-w-6xl px-6 py-24 text-sm text-[color:var(--muted)]">Loading book…</div>;
  }

  if (!book) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="font-[var(--font-display)] text-3xl">Book not found</h1>
        <Link href="/library" className="mt-4 inline-block text-sm text-[color:var(--muted)]">
          ← Back to library
        </Link>
      </div>
    );
  }

  return <BookProductView book={book} />;
}
