"use client";

import { FormEvent, useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TOUR_PHOTO_PATHS } from "@/lib/content/tourPhotos";
import { bootstrapFirestoreContent } from "@/lib/firebase/bootstrap";
import { deleteBook, listBooks, saveBook } from "@/lib/firebase/books";
import { deleteJournalPost, listJournalPosts, saveJournalPost } from "@/lib/firebase/journal";
import { useAuthorAuth } from "@/lib/firebase/AuthorAuthContext";
import type { BookProduct, JournalCategory, JournalPost } from "@/lib/types/content";
import { slugify } from "@/lib/utils/slugify";
import { AdminSetupPanel } from "./AdminSetupPanel";

type Tab = "overview" | "journal" | "books";

const JOURNAL_CATEGORIES: JournalCategory[] = [
  "school visits",
  "tour diary",
  "book progress",
  "updates",
  "inspiration",
];

const EMPTY_JOURNAL_FORM: Partial<JournalPost> = {
  title: "",
  slug: "",
  category: "school visits",
  excerpt: "",
  body: "",
  location: "",
  coverImage: "/theme.jpg",
  gallery: [],
  published: true,
  featured: false,
};

const EMPTY_BOOK_FORM: Partial<BookProduct> = {
  title: "",
  slug: "",
  subtitle: "",
  description: "",
  coverImage: "/1000475710.jpg",
  mood: "",
  tone: "children",
  status: "published",
  progressPercent: 100,
  ebook: { enabled: true, priceZar: 149, priceUsd: 9.99, checkoutUrl: "" },
  audiobook: { enabled: true, priceZar: 199, priceUsd: 12.99, checkoutUrl: "" },
  amazonUrl: "",
  takealotUrl: "",
};

export function AuthorStudio() {
  const { isAuthor, loading, signOutAuthor, user } = useAuthorAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("overview");
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [books, setBooks] = useState<BookProduct[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [journalForm, setJournalForm] = useState<Partial<JournalPost>>(EMPTY_JOURNAL_FORM);
  const [bookForm, setBookForm] = useState<Partial<BookProduct>>(EMPTY_BOOK_FORM);

  useEffect(() => {
    if (!loading && !isAuthor) router.replace("/author/portal");
  }, [loading, isAuthor, router]);

  async function refresh() {
    const [nextPosts, nextBooks] = await Promise.all([
      listJournalPosts({ includeDrafts: true, firestoreOnly: true }),
      listBooks({ includeDrafts: true, firestoreOnly: true }),
    ]);
    setPosts(nextPosts);
    setBooks(nextBooks);
  }

  useEffect(() => {
    if (isAuthor) refresh();
  }, [isAuthor]);

  const galleryText = useMemo(
    () => (journalForm.gallery ?? []).join("\n"),
    [journalForm.gallery],
  );

  if (loading || !isAuthor) {
    return <div className="mx-auto max-w-6xl px-6 py-24 text-sm text-[color:var(--muted)]">Checking access…</div>;
  }

  async function onSaveJournal(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      const savedId = await saveJournalPost({
        id: journalForm.id,
        createdAt: journalForm.createdAt,
        slug: journalForm.slug || slugify(journalForm.title || "entry"),
        title: journalForm.title || "Untitled entry",
        category: (journalForm.category as JournalCategory) || "updates",
        excerpt: journalForm.excerpt || "",
        body: journalForm.body || "",
        location: journalForm.location || undefined,
        coverImage: journalForm.coverImage || "/theme.jpg",
        gallery: journalForm.gallery ?? [],
        published: Boolean(journalForm.published),
        featured: Boolean(journalForm.featured),
      });
      setMessage(journalForm.id ? "Journal entry updated." : "Journal entry added.");
      setJournalForm({ ...EMPTY_JOURNAL_FORM, id: undefined });
      void savedId;
      await refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not save journal entry.");
    } finally {
      setBusy(false);
    }
  }

  async function onBootstrapContent() {
    if (
      !confirm(
        "Import/update starter journal + book records in Firebase? Existing slugs will be updated (safe to run again).",
      )
    ) {
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      await bootstrapFirestoreContent();
      setMessage("Starter content imported. You can edit entries below.");
      await refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not import starter content.");
    } finally {
      setBusy(false);
    }
  }

  function addTourPhotosToGallery() {
    setJournalForm((f) => {
      const merged = new Set([...(f.gallery ?? []), ...TOUR_PHOTO_PATHS]);
      return { ...f, gallery: Array.from(merged) };
    });
  }

  async function onSaveBook(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      await saveBook({
        id: bookForm.id,
        slug: bookForm.slug || slugify(bookForm.title || "book"),
        title: bookForm.title || "Untitled book",
        subtitle: bookForm.subtitle,
        description: bookForm.description || "",
        coverImage: bookForm.coverImage || "/theme.jpg",
        mood: bookForm.mood || "",
        tone: bookForm.tone || "children",
        status: bookForm.status || "published",
        progressPercent: bookForm.progressPercent,
        ebook: bookForm.ebook || { enabled: false },
        audiobook: bookForm.audiobook || { enabled: false },
        amazonUrl: bookForm.amazonUrl,
        takealotUrl: bookForm.takealotUrl,
      });
      setMessage(bookForm.id ? "Book updated." : "Book added.");
      setBookForm({ ...EMPTY_BOOK_FORM, id: undefined });
      await refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not save book.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="author-studio-shell relative min-h-screen bg-[color:var(--background)]">
      <header className="site-header sticky top-0 z-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <div>
            <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[color:var(--muted)]">
              AUTHOR STUDIO
            </div>
            <div className="mt-1 font-[var(--font-display)] text-xl text-[color:var(--foreground)] sm:text-2xl">
              Welcome back{user?.email ? `, ${user.email.split("@")[0]}` : ""}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Link href="/inside-the-world" className="btn-luxury-secondary min-h-11 px-4 py-2.5 text-center text-xs">
              Journal
            </Link>
            <Link href="/library" className="btn-luxury-secondary min-h-11 px-4 py-2.5 text-center text-xs">
              Library
            </Link>
            <button
              type="button"
              className="btn-luxury-secondary col-span-2 min-h-11 px-4 py-2.5 text-xs sm:col-span-1"
              onClick={() => signOutAuthor()}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="hidden flex-wrap gap-2 md:flex">
          <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>
            Overview
          </TabButton>
          <TabButton active={tab === "journal"} onClick={() => setTab("journal")}>
            Journal
          </TabButton>
          <TabButton active={tab === "books"} onClick={() => setTab("books")}>
            Books
          </TabButton>
        </div>

        {message ? (
          <div className="mt-5 rounded-[14px] border border-[rgba(46,29,24,0.10)] bg-white/75 px-4 py-3 text-sm text-[color:var(--muted)]">
            {message}
          </div>
        ) : null}

        {tab === "overview" ? (
          <div className="mt-6 space-y-5 md:mt-8">
            <AdminSetupPanel />
            <div className="panel p-5 sm:p-7">
              <div className="font-[var(--font-cinematic)] text-xs tracking-[0.34em] text-[color:var(--muted)]">
                QUICK START
              </div>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                Import starter journal + book records (including Dawnview High photos), then edit prices, Amazon links,
                and checkout URLs from your phone or laptop.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  disabled={busy}
                  className="btn-luxury-primary min-h-11 px-6 py-3 text-sm"
                  onClick={onBootstrapContent}
                >
                  Import starter content
                </button>
                <button
                  type="button"
                  className="btn-luxury-secondary min-h-11 px-6 py-3 text-sm"
                  onClick={() => setTab("journal")}
                >
                  New journal entry
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {tab === "journal" ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <form className="panel space-y-4 p-6 sm:p-8" onSubmit={onSaveJournal}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-[var(--font-display)] text-lg text-[color:var(--foreground)]">
                  {journalForm.id ? "Edit journal entry" : "Add journal entry"}
                </div>
                {journalForm.id ? (
                  <button
                    type="button"
                    className="text-xs underline text-[color:var(--muted)]"
                    onClick={() => setJournalForm(EMPTY_JOURNAL_FORM)}
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>
              <StudioField label="Title">
                <input
                  className="studio-input"
                  value={journalForm.title ?? ""}
                  onChange={(e) =>
                    setJournalForm((f) => ({
                      ...f,
                      title: e.target.value,
                      slug: f.slug ? f.slug : slugify(e.target.value),
                    }))
                  }
                  required
                />
              </StudioField>
              <StudioField label="Slug">
                <input
                  className="studio-input"
                  value={journalForm.slug ?? ""}
                  onChange={(e) => setJournalForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                />
              </StudioField>
              <StudioField label="Category">
                <select
                  className="studio-input"
                  value={journalForm.category}
                  onChange={(e) => setJournalForm((f) => ({ ...f, category: e.target.value as JournalCategory }))}
                >
                  {JOURNAL_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </StudioField>
              <StudioField label="Location">
                <input
                  className="studio-input"
                  value={journalForm.location ?? ""}
                  onChange={(e) => setJournalForm((f) => ({ ...f, location: e.target.value }))}
                  placeholder="Dawnview High School"
                />
              </StudioField>
              <StudioField label="Excerpt">
                <textarea
                  className="studio-input min-h-20"
                  value={journalForm.excerpt ?? ""}
                  onChange={(e) => setJournalForm((f) => ({ ...f, excerpt: e.target.value }))}
                />
              </StudioField>
              <StudioField label="Body">
                <textarea
                  className="studio-input min-h-40"
                  value={journalForm.body ?? ""}
                  onChange={(e) => setJournalForm((f) => ({ ...f, body: e.target.value }))}
                />
              </StudioField>
              <StudioField label="Cover image path">
                <input
                  className="studio-input"
                  value={journalForm.coverImage ?? ""}
                  onChange={(e) => setJournalForm((f) => ({ ...f, coverImage: e.target.value }))}
                  placeholder="/IMG-20260818-WA0012.jpg"
                />
              </StudioField>
              <StudioField label="Gallery image paths (one per line)">
                <textarea
                  className="studio-input min-h-28"
                  value={galleryText}
                  onChange={(e) =>
                    setJournalForm((f) => ({
                      ...f,
                      gallery: e.target.value
                        .split("\n")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    }))
                  }
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="min-h-11 rounded-full border border-[rgba(46,29,24,0.12)] bg-white/75 px-4 py-2 text-xs tracking-[0.16em] text-[color:var(--muted)]"
                    onClick={addTourPhotosToGallery}
                  >
                    ADD DAWNVIEW TOUR PHOTOS
                  </button>
                  <button
                    type="button"
                    className="min-h-11 rounded-full border border-[rgba(46,29,24,0.12)] bg-white/75 px-4 py-2 text-xs tracking-[0.16em] text-[color:var(--muted)]"
                    onClick={() => setJournalForm((f) => ({ ...f, gallery: [] }))}
                  >
                    CLEAR GALLERY
                  </button>
                </div>
              </StudioField>
              <div className="flex flex-wrap gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(journalForm.published)}
                    onChange={(e) => setJournalForm((f) => ({ ...f, published: e.target.checked }))}
                  />
                  Published
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={Boolean(journalForm.featured)}
                    onChange={(e) => setJournalForm((f) => ({ ...f, featured: e.target.checked }))}
                  />
                  Featured
                </label>
              </div>
              <button type="submit" disabled={busy} className="btn-luxury-primary min-h-11 w-full px-6 py-3 text-sm sm:w-auto">
                {busy ? "Saving…" : journalForm.id ? "Update entry" : "Publish entry"}
              </button>
            </form>

            <div className="panel p-6 sm:p-8">
              <div className="font-[var(--font-cinematic)] text-xs tracking-[0.34em] text-[color:var(--muted)]">
                LIVE ENTRIES (FIREBASE)
              </div>
              <div className="mt-4 space-y-3">
                {posts.length === 0 ? (
                  <p className="text-sm text-[color:var(--muted)]">
                    No Firebase entries yet. Seed content still shows on the public journal until you publish new posts.
                  </p>
                ) : (
                  posts.map((p) => (
                    <div key={p.id} className="rounded-[16px] border border-[rgba(46,29,24,0.10)] bg-white/70 p-4">
                      <div className="font-[var(--font-display)] text-lg">{p.title}</div>
                      <div className="mt-1 text-xs text-[rgba(46,29,24,0.55)]">
                        {p.category} • {p.published ? "published" : "draft"}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="text-xs underline"
                          onClick={() => setJournalForm(p)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-xs text-[#9b4d4d] underline"
                          onClick={async () => {
                            if (!confirm("Delete this journal entry? This removes it from the public site.")) return;
                            try {
                              await deleteJournalPost(p.id);
                              if (journalForm.id === p.id) setJournalForm(EMPTY_JOURNAL_FORM);
                              setMessage("Journal entry deleted.");
                              await refresh();
                            } catch (err) {
                              setMessage(err instanceof Error ? err.message : "Could not delete entry.");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "books" ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <form className="panel space-y-4 p-6 sm:p-8" onSubmit={onSaveBook}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-[var(--font-display)] text-lg text-[color:var(--foreground)]">
                  {bookForm.id ? "Edit book" : "Add book"}
                </div>
                {bookForm.id ? (
                  <button
                    type="button"
                    className="text-xs underline text-[color:var(--muted)]"
                    onClick={() => setBookForm(EMPTY_BOOK_FORM)}
                  >
                    Cancel edit
                  </button>
                ) : null}
              </div>
              <StudioField label="Title">
                <input
                  className="studio-input"
                  value={bookForm.title ?? ""}
                  onChange={(e) =>
                    setBookForm((f) => ({
                      ...f,
                      title: e.target.value,
                      slug: f.slug ? f.slug : slugify(e.target.value),
                    }))
                  }
                  required
                />
              </StudioField>
              <StudioField label="Slug">
                <input
                  className="studio-input"
                  value={bookForm.slug ?? ""}
                  onChange={(e) => setBookForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                />
              </StudioField>
              <StudioField label="Subtitle">
                <input
                  className="studio-input"
                  value={bookForm.subtitle ?? ""}
                  onChange={(e) => setBookForm((f) => ({ ...f, subtitle: e.target.value }))}
                />
              </StudioField>
              <StudioField label="Description">
                <textarea
                  className="studio-input min-h-28"
                  value={bookForm.description ?? ""}
                  onChange={(e) => setBookForm((f) => ({ ...f, description: e.target.value }))}
                />
              </StudioField>
              <StudioField label="Cover image path">
                <input
                  className="studio-input"
                  value={bookForm.coverImage ?? ""}
                  onChange={(e) => setBookForm((f) => ({ ...f, coverImage: e.target.value }))}
                />
              </StudioField>
              <StudioField label="Status">
                <select
                  className="studio-input"
                  value={bookForm.status ?? "published"}
                  onChange={(e) =>
                    setBookForm((f) => ({
                      ...f,
                      status: e.target.value as BookProduct["status"],
                    }))
                  }
                >
                  <option value="published">published</option>
                  <option value="coming-soon">coming-soon</option>
                  <option value="draft">draft</option>
                </select>
              </StudioField>
              <StudioField label="Progress % (optional)">
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="studio-input"
                  value={bookForm.progressPercent ?? ""}
                  onChange={(e) =>
                    setBookForm((f) => ({
                      ...f,
                      progressPercent: e.target.value === "" ? undefined : Number(e.target.value),
                    }))
                  }
                />
              </StudioField>
              <div className="grid gap-4 sm:grid-cols-2">
                <StudioField label="Ebook price (ZAR)">
                  <input
                    type="number"
                    className="studio-input"
                    value={bookForm.ebook?.priceZar ?? ""}
                    onChange={(e) =>
                      setBookForm((f) => ({
                        ...f,
                        ebook: { ...f.ebook, enabled: true, priceZar: Number(e.target.value) },
                      }))
                    }
                  />
                </StudioField>
                <StudioField label="Audiobook price (ZAR)">
                  <input
                    type="number"
                    className="studio-input"
                    value={bookForm.audiobook?.priceZar ?? ""}
                    onChange={(e) =>
                      setBookForm((f) => ({
                        ...f,
                        audiobook: { ...f.audiobook, enabled: true, priceZar: Number(e.target.value) },
                      }))
                    }
                  />
                </StudioField>
              </div>
              <StudioField label="Ebook checkout URL">
                <input
                  className="studio-input"
                  value={bookForm.ebook?.checkoutUrl ?? ""}
                  onChange={(e) =>
                    setBookForm((f) => ({
                      ...f,
                      ebook: { ...f.ebook, enabled: true, checkoutUrl: e.target.value },
                    }))
                  }
                  placeholder="Stripe / PayFast / Gumroad link"
                />
              </StudioField>
              <StudioField label="Audiobook checkout URL">
                <input
                  className="studio-input"
                  value={bookForm.audiobook?.checkoutUrl ?? ""}
                  onChange={(e) =>
                    setBookForm((f) => ({
                      ...f,
                      audiobook: { ...f.audiobook, enabled: true, checkoutUrl: e.target.value },
                    }))
                  }
                />
              </StudioField>
              <StudioField label="Amazon URL">
                <input
                  className="studio-input"
                  value={bookForm.amazonUrl ?? ""}
                  onChange={(e) => setBookForm((f) => ({ ...f, amazonUrl: e.target.value }))}
                />
              </StudioField>
              <StudioField label="Takealot URL">
                <input
                  className="studio-input"
                  value={bookForm.takealotUrl ?? ""}
                  onChange={(e) => setBookForm((f) => ({ ...f, takealotUrl: e.target.value }))}
                />
              </StudioField>
              <button type="submit" disabled={busy} className="btn-luxury-primary min-h-11 w-full px-6 py-3 text-sm sm:w-auto">
                {busy ? "Saving…" : bookForm.id ? "Update book" : "Save book"}
              </button>
            </form>

            <div className="panel p-6 sm:p-8">
              <div className="font-[var(--font-cinematic)] text-xs tracking-[0.34em] text-[color:var(--muted)]">
                BOOKS (FIREBASE)
              </div>
              <div className="mt-4 space-y-3">
                {books.length === 0 ? (
                  <p className="text-sm text-[color:var(--muted)]">
                    Seed library data is shown publicly until you save book records in Firebase.
                  </p>
                ) : (
                  books.map((b) => (
                    <div key={b.id} className="rounded-[16px] border border-[rgba(46,29,24,0.10)] bg-white/70 p-4">
                      <div className="font-[var(--font-display)] text-lg">{b.title}</div>
                      <div className="mt-1 text-xs text-[rgba(46,29,24,0.55)]">{b.status}</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button type="button" className="text-xs underline" onClick={() => setBookForm(b)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="text-xs text-[#9b4d4d] underline"
                          onClick={async () => {
                            if (!confirm("Delete this book? It will be removed from the library.")) return;
                            try {
                              await deleteBook(b.id);
                              if (bookForm.id === b.id) setBookForm(EMPTY_BOOK_FORM);
                              setMessage("Book deleted.");
                              await refresh();
                            } catch (err) {
                              setMessage(err instanceof Error ? err.message : "Could not delete book.");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <nav className="author-tab-bar md:hidden" aria-label="Author studio sections">
        <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>
          Home
        </TabButton>
        <TabButton active={tab === "journal"} onClick={() => setTab("journal")}>
          Journal
        </TabButton>
        <TabButton active={tab === "books"} onClick={() => setTab("books")}>
          Books
        </TabButton>
      </nav>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "min-h-11 rounded-full px-4 py-2.5 text-xs tracking-[0.18em] sm:tracking-[0.22em]",
        active
          ? "bg-[rgba(46,29,24,0.88)] text-[color:var(--cream)]"
          : "border border-[rgba(46,29,24,0.12)] bg-white/70 text-[color:var(--muted)]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function StudioField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.22em] text-[rgba(46,29,24,0.55)]">{label.toUpperCase()}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
