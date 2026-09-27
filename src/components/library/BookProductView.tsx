"use client";

import Image from "next/image";
import Link from "next/link";
import type { BookProduct } from "@/lib/types/content";
import { BookCoverShowcase } from "../shared/BookCoverShowcase";
import { ContactEmailLink } from "../shared/ContactEmailLink";
import { WorldShell } from "../shared/WorldShell";

function formatPrice(zar?: number, usd?: number) {
  const parts: string[] = [];
  if (typeof zar === "number") parts.push(`R${zar}`);
  if (typeof usd === "number") parts.push(`$${usd.toFixed(2)}`);
  return parts.join(" · ");
}

export function BookProductView({ book }: { book: BookProduct }) {
  const isAna = book.slug === "anas-crooked-teeth";

  return (
    <WorldShell
      eyebrow="The Library"
      title={book.title}
      subtitle={book.subtitle || book.mood}
    >
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          {isAna ? (
            <BookCoverShowcase size="large" />
          ) : (
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[18px] border border-[rgba(46,29,24,0.10)] shadow-[0_30px_90px_rgba(46,29,24,0.14)]">
              <Image src={book.coverImage} alt={book.title} fill className="object-cover" sizes="360px" />
            </div>
          )}

          {typeof book.progressPercent === "number" && book.status !== "published" ? (
            <div className="panel mt-5 p-5">
              <div className="flex items-center justify-between text-xs tracking-[0.24em] text-[rgba(46,29,24,0.55)]">
                <span>BOOK PROGRESS</span>
                <span>{book.progressPercent}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[rgba(46,29,24,0.08)]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,rgba(217,168,156,0.95),rgba(200,164,106,0.95))]"
                  style={{ width: `${Math.max(0, Math.min(100, book.progressPercent))}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-5">
          <div className="panel p-7 sm:p-8">
            <p className="text-base leading-8 text-[color:var(--muted)]">{book.description}</p>

            <div className="mt-8 grid gap-3">
              {book.ebook.enabled ? (
                <FormatCard
                  label="E-Book"
                  price={formatPrice(book.ebook.priceZar, book.ebook.priceUsd)}
                  href={book.ebook.checkoutUrl}
                  fallbackLabel="Digital edition — checkout link coming soon"
                />
              ) : null}
              {book.audiobook.enabled ? (
                <FormatCard
                  label="Audiobook"
                  price={formatPrice(book.audiobook.priceZar, book.audiobook.priceUsd)}
                  href={book.audiobook.checkoutUrl}
                  fallbackLabel="Audiobook — checkout link coming soon"
                />
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {book.amazonUrl ? (
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-luxury-primary px-8 py-3.5 text-center text-sm"
                >
                  Buy on Amazon
                </a>
              ) : null}
              {book.takealotUrl ? (
                <a
                  href={book.takealotUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-luxury-secondary px-8 py-3.5 text-center text-sm"
                >
                  Buy on Takealot
                </a>
              ) : null}
              <Link href="/inside-the-world" className="btn-luxury-secondary px-8 py-3.5 text-center text-sm">
                Read Ana&apos;s journal
              </Link>
            </div>

            <p className="mt-6 text-sm text-[color:var(--muted)]">
              Bulk orders for schools or events? Email{" "}
              <ContactEmailLink subject={`Book order enquiry — ${book.title}`} />.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/library" className="text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
          ← Back to the library
        </Link>
      </div>
    </WorldShell>
  );
}

function FormatCard({
  label,
  price,
  href,
  fallbackLabel,
}: {
  label: string;
  price: string;
  href?: string;
  fallbackLabel: string;
}) {
  const ready = Boolean(href);
  return (
    <div className="rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/70 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[color:var(--muted)]">
            {label.toUpperCase()}
          </div>
          <div className="mt-1 font-[var(--font-display)] text-xl text-[color:var(--foreground)]">{price || "Pricing TBC"}</div>
        </div>
        {ready ? (
          <a href={href} target="_blank" rel="noreferrer" className="btn-aurora px-5 py-2.5 text-sm">
            Buy {label}
          </a>
        ) : (
          <span className="text-xs text-[rgba(46,29,24,0.55)]">{fallbackLabel}</span>
        )}
      </div>
    </div>
  );
}
