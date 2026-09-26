import { SEED_BOOKS } from "@/lib/content/seedBooks";
import { SEED_JOURNAL_POSTS } from "@/lib/content/seedJournal";
import { saveBook } from "./books";
import { saveJournalPost } from "./journal";

/** One-time helper: copy built-in seed content into Firestore for admin editing. */
export async function bootstrapFirestoreContent() {
  for (const post of SEED_JOURNAL_POSTS) {
    await saveJournalPost({
      slug: post.slug,
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      body: post.body,
      location: post.location,
      coverImage: post.coverImage,
      gallery: post.gallery,
      published: post.published,
      featured: post.featured,
      createdAt: post.createdAt,
    });
  }

  for (const book of SEED_BOOKS) {
    await saveBook({
      slug: book.slug,
      title: book.title,
      subtitle: book.subtitle,
      description: book.description,
      coverImage: book.coverImage,
      mood: book.mood,
      tone: book.tone,
      status: book.status,
      progressPercent: book.progressPercent,
      ebook: book.ebook,
      audiobook: book.audiobook,
      amazonUrl: book.amazonUrl,
      takealotUrl: book.takealotUrl,
    });
  }
}
