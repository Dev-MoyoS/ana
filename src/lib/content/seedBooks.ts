import type { BookProduct } from "@/lib/types/content";

export const SEED_BOOKS: BookProduct[] = [
  {
    id: "seed-anas-crooked-teeth",
    slug: "anas-crooked-teeth",
    title: "Ana's Crooked Teeth",
    subtitle: "The Story of a Unique Smile",
    description:
      "Ana has always had a bright, joyful smile — but when she begins to notice her crooked teeth, she starts to feel unsure. On a gentle, magical journey with kind animal friends, she learns that her smile is not something to hide, but something to celebrate.",
    coverImage: "/1000475710.jpg",
    mood: "Warm • Magical • Uplifting",
    tone: "children",
    status: "published",
    progressPercent: 100,
    ebook: {
      enabled: true,
      priceZar: 149,
      priceUsd: 9.99,
      checkoutUrl: "",
    },
    audiobook: {
      enabled: true,
      priceZar: 199,
      priceUsd: 12.99,
      checkoutUrl: "",
    },
    amazonUrl: "https://www.amazon.com",
    takealotUrl: "",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "seed-upcoming-novel",
    slug: "upcoming-novel",
    title: "Upcoming Novel",
    subtitle: "Teaser — in development",
    description: "A cinematic literary world is taking shape. Follow the journal for progress notes and early previews.",
    coverImage: "/theme.jpg",
    mood: "Elegant • Mysterious • Cinematic",
    tone: "novel",
    status: "coming-soon",
    progressPercent: 24,
    ebook: { enabled: false },
    audiobook: { enabled: false },
    updatedAt: new Date().toISOString(),
  },
];
