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
import {
  galleryUrlsFromMedia,
  normalizeJournalMedia,
  videoUrlsFromMedia,
} from "@/lib/journal/media";
import type { JournalMediaItem, JournalPost } from "@/lib/types/content";
import { slugify } from "@/lib/utils/slugify";
import { getFirebaseDb } from "./client";

const COLLECTION = "journal_posts";

export type JournalListOptions = {
  includeDrafts?: boolean;
  firestoreOnly?: boolean;
};

function parseMediaItems(raw: unknown): JournalMediaItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const url = String(row.url ?? "").trim();
      if (!url) return null;
      return {
        id: String(row.id ?? url),
        kind: row.kind === "video" ? "video" : "image",
        url,
        caption: row.caption ? String(row.caption) : undefined,
      } satisfies JournalMediaItem;
    })
    .filter(Boolean) as JournalMediaItem[];
}

function fromDoc(id: string, data: DocumentData): JournalPost {
  const gallery = Array.isArray(data.gallery) ? data.gallery.map(String) : [];
  const videos = Array.isArray(data.videos) ? data.videos.map(String) : undefined;
  const media = normalizeJournalMedia({
    media: parseMediaItems(data.media),
    gallery,
    videos,
  });

  return {
    id,
    slug: String(data.slug ?? id),
    title: String(data.title ?? ""),
    category: data.category as JournalPost["category"],
    excerpt: String(data.excerpt ?? ""),
    body: String(data.body ?? ""),
    location: data.location ? String(data.location) : undefined,
    coverImage: String(data.coverImage ?? "/theme.jpg"),
    gallery: gallery.length ? gallery : galleryUrlsFromMedia(media),
    videos: videos?.length ? videos : videoUrlsFromMedia(media),
    media,
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

async function fetchFirestorePosts(options?: JournalListOptions): Promise<JournalPost[]> {
  const db = getFirebaseDb();
  if (!db) return [];

  const base = collection(db, COLLECTION);

  const attempts = options?.includeDrafts
    ? [query(base, orderBy("createdAt", "desc"))]
    : [
        query(base, where("published", "==", true), orderBy("createdAt", "desc")),
        query(base, orderBy("createdAt", "desc")),
      ];

  for (const q of attempts) {
    try {
      const snap = await getDocs(q);
      const posts = snap.docs.map((d) => fromDoc(d.id, d.data()));
      if (!options?.includeDrafts) {
        return sortPosts(posts.filter((p) => p.published));
      }
      return sortPosts(posts);
    } catch {
      // try next query shape (missing index / rules)
    }
  }

  const snap = await getDocs(base);
  const posts = snap.docs.map((d) => fromDoc(d.id, d.data()));
  return options?.includeDrafts ? sortPosts(posts) : sortPosts(posts.filter((p) => p.published));
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
    const posts = await fetchFirestorePosts(options);
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

    const all = await fetchFirestorePosts({ firestoreOnly: true, includeDrafts: true });
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

  const media = normalizeJournalMedia({
    media: post.media ?? [],
    gallery: post.gallery ?? [],
    videos: post.videos,
  });
  const gallery = galleryUrlsFromMedia(media);
  const videos = videoUrlsFromMedia(media);

  const payload = {
    title: post.title,
    slug,
    category: post.category,
    excerpt: post.excerpt,
    body: post.body,
    location: post.location ?? null,
    coverImage: post.coverImage || gallery[0] || "/theme.jpg",
    gallery,
    videos,
    media,
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
