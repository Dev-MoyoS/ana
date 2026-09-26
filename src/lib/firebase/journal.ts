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
import { SEED_JOURNAL_POSTS } from "@/lib/content/seedJournal";
import type { JournalPost } from "@/lib/types/content";
import { slugify } from "@/lib/utils/slugify";
import { getFirebaseDb } from "./client";

const COLLECTION = "journal_posts";

export type JournalListOptions = {
  includeDrafts?: boolean;
  /** Admin studio: never merge demo seed entries */
  firestoreOnly?: boolean;
};

function fromDoc(id: string, data: DocumentData): JournalPost {
  return {
    id,
    slug: String(data.slug ?? id),
    title: String(data.title ?? ""),
    category: data.category as JournalPost["category"],
    excerpt: String(data.excerpt ?? ""),
    body: String(data.body ?? ""),
    location: data.location ? String(data.location) : undefined,
    coverImage: String(data.coverImage ?? "/theme.jpg"),
    gallery: Array.isArray(data.gallery) ? data.gallery.map(String) : [],
    published: Boolean(data.published),
    featured: Boolean(data.featured),
    createdAt: String(data.createdAt ?? new Date().toISOString()),
    updatedAt: String(data.updatedAt ?? new Date().toISOString()),
  };
}

function sortPosts(posts: JournalPost[]) {
  return [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

function seedPosts(options?: JournalListOptions) {
  return options?.includeDrafts
    ? SEED_JOURNAL_POSTS
    : SEED_JOURNAL_POSTS.filter((p) => p.published);
}

async function fetchFirestorePosts(): Promise<JournalPost[]> {
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const ordered = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const snap = await getDocs(ordered);
    return snap.docs.map((d) => fromDoc(d.id, d.data()));
  } catch {
    const snap = await getDocs(collection(db, COLLECTION));
    return sortPosts(snap.docs.map((d) => fromDoc(d.id, d.data())));
  }
}

async function findJournalIdBySlug(slug: string) {
  const db = getFirebaseDb();
  if (!db) return null;
  const q = query(collection(db, COLLECTION), where("slug", "==", slug));
  const snap = await getDocs(q);
  return snap.empty ? null : snap.docs[0]!.id;
}

export async function listJournalPosts(options?: JournalListOptions) {
  const db = getFirebaseDb();
  if (!db) return seedPosts(options);

  try {
    const posts = await fetchFirestorePosts();
    const filtered = options?.includeDrafts ? posts : posts.filter((p) => p.published);

    if (options?.firestoreOnly) return sortPosts(filtered);
    if (posts.length > 0) return sortPosts(filtered);

    return seedPosts(options);
  } catch {
    return seedPosts(options);
  }
}

export async function getJournalPostBySlug(slug: string, options?: JournalListOptions) {
  const db = getFirebaseDb();

  if (!db) {
    const found = SEED_JOURNAL_POSTS.find((p) => p.slug === slug);
    if (!found) return null;
    if (!found.published && !options?.includeDrafts) return null;
    return found;
  }

  try {
    const q = query(collection(db, COLLECTION), where("slug", "==", slug));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const post = fromDoc(snap.docs[0]!.id, snap.docs[0]!.data());
      if (!post.published && !options?.includeDrafts) return null;
      return post;
    }

    const all = await fetchFirestorePosts();
    if (all.length > 0 || options?.firestoreOnly) return null;
  } catch {
    // fall through to seed when Firestore read fails
  }

  const seed = SEED_JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!seed) return null;
  if (!seed.published && !options?.includeDrafts) return null;
  return seed;
}

export async function saveJournalPost(
  post: Omit<JournalPost, "id" | "createdAt" | "updatedAt"> & { id?: string; createdAt?: string },
) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not configured.");

  const now = new Date().toISOString();
  const slug = post.slug || slugify(post.title);
  const existingId = post.id ?? (await findJournalIdBySlug(slug));

  const payload = {
    title: post.title,
    slug,
    category: post.category,
    excerpt: post.excerpt,
    body: post.body,
    location: post.location ?? null,
    coverImage: post.coverImage,
    gallery: post.gallery ?? [],
    published: Boolean(post.published),
    featured: Boolean(post.featured),
    updatedAt: now,
    createdAt: post.createdAt ?? now,
  };

  if (existingId) {
    await setDoc(doc(db, COLLECTION, existingId), payload, { merge: true });
    return existingId;
  }

  const ref = await addDoc(collection(db, COLLECTION), payload);
  return ref.id;
}

export async function deleteJournalPost(id: string) {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not configured.");
  if (!id || id.startsWith("seed-")) {
    throw new Error("This entry is demo content. Import or create a Firestore entry before deleting.");
  }
  await deleteDoc(doc(db, COLLECTION, id));
}

export async function getJournalPostById(id: string) {
  const db = getFirebaseDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, COLLECTION, id));
  if (!snap.exists()) return null;
  return fromDoc(snap.id, snap.data());
}
