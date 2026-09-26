import type { JournalPost } from "@/lib/types/content";

const dawnviewGallery = [
  "/IMG_20260811_161826.jpg",
  "/IMG-20260818-WA0012.jpg",
  "/IMG-20260818-WA0018.jpg",
  "/IMG-20260818-WA0024.jpg",
  "/IMG-20260818-WA0027.jpg",
  "/IMG-20260818-WA0028.jpg",
  "/IMG-20260818-WA0029.jpg",
] as const;

export const SEED_JOURNAL_POSTS: JournalPost[] = [
  {
    id: "seed-dawnview-high",
    slug: "returning-to-dawnview-high",
    title: "Returning to Dawnview High — where the journey began",
    category: "school visits",
    excerpt:
      "Ana The Author came home to Dawnview High with copies of Ana's Crooked Teeth — sharing courage, laughter, and the message that every smile tells a story.",
    body: `There is something sacred about walking back through the gates of the school that shaped you.

Dawnview High welcomed me not as a guest, but as family — students, teachers, and friends gathered with open hearts as we celebrated Ana's Crooked Teeth: The Story of a Unique Smile.

We spoke about confidence, kindness, and the beauty of being different. I signed books, listened to brave questions, and watched young readers see themselves in Ana's crooked, joyful smile.

This is only the beginning. More schools, more towns, and more stories are ahead — and I will keep journaling every step here, with photos and updates from the road.

If you'd like a school visit, reach out through the website. Let's keep building a world where children feel seen, valued, and proud of who they are.`,
    location: "Dawnview High School",
    coverImage: "/IMG-20260818-WA0012.jpg",
    gallery: [...dawnviewGallery],
    published: true,
    featured: true,
    createdAt: "2026-08-18T12:00:00.000Z",
    updatedAt: "2026-08-18T12:00:00.000Z",
  },
  {
    id: "seed-tour-diary",
    slug: "the-school-tour-begins",
    title: "The school tour begins — notes from the road",
    category: "tour diary",
    excerpt:
      "A living diary of visits, signings, and the quiet moments between — as Ana The Author tours schools and communities.",
    body: `Every stop on this tour adds a new chapter — not only to my work, but to the community we're building together around brave storytelling.

I'll post photos, reflections, and progress updates here as we travel. Check back often for new entries from classrooms, libraries, and the places where imagination comes alive.`,
    location: "On tour",
    coverImage: "/IMG_20260811_161826.jpg",
    gallery: ["/IMG_20260811_161826.jpg", "/IMG-20260818-WA0029.jpg"],
    published: true,
    featured: false,
    createdAt: "2026-08-11T10:00:00.000Z",
    updatedAt: "2026-08-11T10:00:00.000Z",
  },
  {
    id: "seed-book-progress",
    slug: "anas-crooked-teeth-on-shelves",
    title: "Ana's Crooked Teeth — from manuscript to hands",
    category: "book progress",
    excerpt:
      "Holding the first printed copies reminded me why this story exists: to help children celebrate the features that make them uniquely beautiful.",
    body: `The book is out in the world — and every copy feels like a small lantern of hope.

Digital editions (ebook and audiobook) will be available here on the site, with print and retailer links for readers who prefer Amazon and local partners.

Thank you for following this journey. More updates on formats, pricing, and new releases will appear in this journal and on the Library page.`,
    location: "South Africa",
    coverImage: "/1000475710.jpg",
    gallery: ["/1000475710.jpg", "/1000475709.jpg"],
    published: true,
    featured: false,
    createdAt: "2026-08-07T09:00:00.000Z",
    updatedAt: "2026-08-07T09:00:00.000Z",
  },
];
