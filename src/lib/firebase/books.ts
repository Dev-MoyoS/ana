import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { SEED_BOOKS } from "@/lib/content/seedBooks";
import type { BookProduct, BookFormatOffer } from "@/lib/types/content";
import { getFirebaseDb } from "./client";

const COLLECTION = "books";
const PUBLIC_STATUSES = ["published", "coming-soon"] as const;

export type BookListOptions = {
  includeDrafts?: boolean;
  firestoreOnly?: boolean;
};

function formatFrom(data: DocumentData | undefined): BookFormatOffer {
  return {
    enabled: Boolean(data?.enabled),
    priceZar: typeof data?.priceZar === "number" ? data.priceZar : undefined,
    priceUsd: typeof data?.priceUsd === "number" ? data.priceUsd : undefined,
    checkoutUrl: data?.checkoutUrl ? String(data.checkoutUrl) : undefined,
    sampleUrl: data?.sampleUrl ? String(data.sampleUrl) : undefined,
  };
}

function fromDoc(id: string, data: DocumentData): BookProduct {
  return {
    id,
    slug: String(data.slug ?? id),
    title: String(data.title ?? ""),
    subtitle: data.subtitle ? String(data.subtitle) : undefined,
    description: String(data.description ?? ""),
    coverImage: String(data.coverImage ?? "/theme.jpg"),
    mood: String(data.mood ?? ""),
    tone: data.tone === "novel" ? "novel" : "children",
    status: data.status === "coming-soon" || data.status === "draft" ? data.status : "published",
    progressPercent: typeof data.progressPercent === "number" ? data.progressPercent : undefined,
    ebook: formatFrom(data.ebook),
    audiobook: formatFrom(data.audiobook),
    amazonUrl: data.amazonUrl ? String(data.amazonUrl) : undefined,
    takealotUrl: data.takealotUrl ? String(data.takealotUrl) : undefined,
    updatedAt: String(data.updatedAt ?? new Date().toISOString()),
  };
}

function sortBooks(books: BookProduct[]) {
  return [...books].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

function seedBooks(options?: BookListOptions) {
  return SEED_BOOKS.filter((b) => options?.includeDrafts || b.status !== "draft");
}

function isPublicBook(book: BookProduct) {
  return book.status === "published" || book.status === "coming-soon";
}

async function fetchFirestoreBooks(options?: BookListOptions): Promise<BookProduct[]> {
  const db = getFirebaseDb();
  if (!db) return [];

  const base = collection(db, COLLECTION);

  const attempts = options?.includeDrafts
    ? [query(base, orderBy("updatedAt", "desc"))]
    : [
        query(base, where("status", "in", [...PUBLIC_STATUSES]), orderBy("updatedAt", "desc")),
        query(base, orderBy("updatedAt", "desc")),
      ];

  for (const q of attempts) {
    try {
      const snap = await getDocs(q);
      const books = snap.docs.map((d) => fromDoc(d.id, d.data()));
      if (!options?.includeDrafts) {
        return sortBooks(books.filter(isPublicBook));
      }
      return sortBooks(books);
    } catch {
      // try next query shape
    }
  }

  const snap = await getDocs(base);
  const books = snap.docs.map((d) => fromDoc(d.id, d.data()));
  return options?.includeDrafts ? sortBooks(books) : sortBooks(books.filter(isPublicBook));
}

async function findBookIdBySlug(slug: string) {
  const db = getFirebaseDb();
  if (!db) return null;
  const q = query(collection(db, COLLECTION), where("slug", "==", slug));
  const snap = await getDocs(q);
  return snap.empty ? null : snap.docs[0]!.id;
}

export async function listBooks(options?: BookListOptions) {
  const db = getFirebaseDb();
  if (!db) return seedBooks(options);

  try {
    const books = await fetchFirestoreBooks(options);
    const filtered = options?.includeDrafts ? books : books.filter(isPublicBook);

    if (options?.firestoreOnly) return sortBooks(filtered);
    if (books.length > 0) return sortBooks(filtered);

    return seedBooks(options);
  } catch {
    return seedBooks(options);
  }
}

export async function getBookBySlug(slug: string, options?: BookListOptions) {
  const db = getFirebaseDb();

  if (!db) {
    const book = SEED_BOOKS.find((b) => b.slug === slug);
    if (!book) return null;
    if (book.status === "draft" && !options?.includeDrafts) return null;
    return book;
  }

  try {
    const q = query(collection(db, COLLECTION), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const book = fromDoc(snap.docs[0]!.id, snap.docs[0]!.data());
      if (book.status === "draft" && !options?.includeDrafts) return null;
      return book;
    }

    const all = await fetchFirestoreBooks({ firestoreOnly: true, includeDrafts: true });
    if (all.length > 0 || options?.firestoreOnly) return null;
  } catch {
    // fall through to seed
  }

  const seed = SEED_BOOKS.find((b) => b.slug === slug);
  if (!seed) return null;
  if (seed.status === "draft" && !options?.includeDrafts) return null;
  return seed;
}

export async function saveBook(book: Partial<BookProduct> & Pick<BookProduct, "title" | "slug">) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not configured.");

  const now = new Date().toISOString();
  const slug = book.slug;
  const existingId = book.id ?? (await findBookIdBySlug(slug));

  const payload = {
    title: book.title,
    slug,
    subtitle: book.subtitle ?? null,
    description: book.description ?? "",
    coverImage: book.coverImage ?? "/theme.jpg",
    mood: book.mood ?? "",
    tone: book.tone ?? "children",
    status: book.status ?? "published",
    progressPercent: book.progressPercent ?? null,
    ebook: book.ebook ?? { enabled: false },
    audiobook: book.audiobook ?? { enabled: false },
    amazonUrl: book.amazonUrl ?? null,
    takealotUrl: book.takealotUrl ?? null,
    updatedAt: now,
  };

  if (existingId) {
    await setDoc(doc(db, COLLECTION, existingId), payload, { merge: true });
    return existingId;
  }

  const ref = await addDoc(collection(db, COLLECTION), payload);
  return ref.id;
}

export async function deleteBook(id: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not configured.");
  if (!id || id.startsWith("seed-")) {
    throw new Error("This book is demo content. Import or create a Firestore record before deleting.");
  }
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getBookById(id: string) {
  const db = getFirebaseDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return fromDoc(snap.id, snap.data());
}
