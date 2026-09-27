"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listBooks } from "@/lib/firebase/books";
import type { BookProduct } from "@/lib/types/content";
import { ContactEmailLink } from "../shared/ContactEmailLink";
import { SiteContactPanel } from "../shared/SiteContactFooter";
import { WorldShell } from "../shared/WorldShell";
import { CinematicFrame } from "../shared/CinematicFrame";

export function LibraryPage() {
  const shelfImg = "/theme.jpg";
  const [books, setBooks] = useState<BookProduct[]>([]);

  useEffect(() => {
    listBooks()
      .then(setBooks)
      .catch(() => setBooks([]));
  }, []);

  return (
    <WorldShell
      eyebrow="The Library"
      title="Ebooks, audiobooks, and print — beautifully shelved."
      subtitle="Purchase digital editions here, follow book progress in the journal, or buy print copies through trusted retailers like Amazon."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="panel p-7 sm:p-10">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
            Featured Collection
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {books.map((book) => (
              <Link key={book.id} href={`/library/${book.slug}`} className="block">
                <BookCard
                  title={book.title}
                  mood={book.mood}
                  tone={book.tone}
                  coverSrc={book.coverImage}
                  status={book.status}
                />
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <CinematicFrame
              src={shelfImg}
              alt="A luxurious library shelf in warm light"
              tone="base"
              size="section"
              overlay={
                <div className="absolute inset-0 opacity-75 [background:radial-gradient(70%_55%_at_45%_20%,rgba(255,255,255,0.58),transparent_62%),radial-gradient(70%_55%_at_70%_85%,rgba(217,168,156,0.22),transparent_62%)]" />
              }
              caption={
                <>
                  <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[rgba(46,29,24,0.62)]">
                    CINEMATIC SHELF
                  </span>
                  <span className="text-xs text-[rgba(46,29,24,0.58)]">Digital editions • audiobooks • print links</span>
                </>
              }
            />
          </div>

          <div className="mt-8 rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-5 text-sm text-[color:var(--muted)]">
            Ebook and audiobook checkout links can be managed in the private author studio once payment providers
            (Stripe, PayFast, Gumroad, etc.) are connected. Questions about orders or bulk school copies?{" "}
            <ContactEmailLink subject="Library / book order enquiry" />
          </div>
        </div>

        <div className="panel p-7 sm:p-10">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
            Shop & follow the journey
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Open a book page to buy the e-book or audiobook, use the Amazon button for print/Kindle, and follow Ana&apos;s
            school tour in the journal with photos from visits like Dawnview High.
          </p>

          <div className="mt-6 grid gap-3">
            <Link
              href="/library/anas-crooked-teeth"
              className="group flex items-center justify-between rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/70 px-5 py-4 transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              <span className="font-[var(--font-display)] text-lg">Ana&apos;s Crooked Teeth</span>
              <span className="text-[color:var(--accent)] transition group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/inside-the-world"
              className="group flex items-center justify-between rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/70 px-5 py-4 transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              <span className="font-[var(--font-display)] text-lg">Author&apos;s journal</span>
              <span className="text-[color:var(--accent)] transition group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-aurora px-6 py-3 text-center text-sm" href="/inside-the-world">
              Read the Journal
            </Link>
            <Link
              className="rounded-full border border-[rgba(46,29,24,0.14)] bg-white/70 px-6 py-3 text-center text-sm text-[color:var(--foreground)]/80 backdrop-blur-md transition hover:bg-white/90 hover:text-[color:var(--foreground)]"
              href="/world/children"
            >
              Explore the Book World
            </Link>
          </div>

          <div className="mt-8">
            <SiteContactPanel title="Contact" />
          </div>
        </div>
      </div>
    </WorldShell>
  );
}

function BookCard({
  title,
  mood,
  tone,
  coverSrc,
  status,
}: {
  title: string;
  mood: string;
  tone: "children" | "novel";
  coverSrc?: string;
  status?: string;
}) {
  const glow =
    tone === "children"
      ? "radial-gradient(55% 50% at 50% 50%, rgba(217,168,156,0.22), transparent 70%), radial-gradient(55% 50% at 60% 60%, rgba(200,164,106,0.14), transparent 72%)"
      : "radial-gradient(55% 50% at 50% 50%, rgba(46,29,24,0.10), transparent 70%), radial-gradient(55% 50% at 60% 60%, rgba(200,164,106,0.14), transparent 72%)";

  return (
    <div className="group relative overflow-hidden rounded-[22px] border border-[rgba(46,29,24,0.10)] bg-white/60 p-6 transition hover:-translate-y-0.5">
      <div className="absolute -inset-10 opacity-0 blur-2xl transition group-hover:opacity-100" style={{ background: glow }} />
      <div className="relative grid gap-5">
        <div>
          <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[color:var(--muted)]">
            {status === "coming-soon" ? "COMING SOON" : "AVAILABLE"}
          </div>
          <div className="mt-2 font-[var(--font-display)] text-2xl text-[color:var(--foreground)]">{title}</div>
          <div className="mt-2 text-sm text-[color:var(--muted)]">{mood}</div>
        </div>

        <div className="relative h-44">
          {coverSrc ? (
            <div className="absolute left-1/2 top-1/2 h-40 w-[7.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[10px_14px_14px_10px] border border-[rgba(46,29,24,0.10)] shadow-[0_24px_70px_rgba(46,29,24,0.18)] [transform:perspective(900px)_rotateY(-8deg)]">
              <Image
                src={coverSrc}
                alt={`${title} cover`}
                fill
                sizes="120px"
                className="object-cover object-[24%_center]"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
