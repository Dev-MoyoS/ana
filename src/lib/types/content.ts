export type JournalCategory =
  | "school visits"
  | "tour diary"
  | "book progress"
  | "updates"
  | "inspiration";

export type JournalMediaKind = "image" | "video";

/** Ordered images and videos for a journal entry (author-managed). */
export type JournalMediaItem = {
  id: string;
  kind: JournalMediaKind;
  url: string;
  caption?: string;
};

export type JournalPost = {
  id: string;
  slug: string;
  title: string;
  category: JournalCategory;
  excerpt: string;
  body: string;
  location?: string;
  coverImage: string;
  /** @deprecated Derived from `media` on save; kept for older clients. */
  gallery: string[];
  /** @deprecated Use `media` with kind video. */
  videos?: string[];
  media: JournalMediaItem[];
  published: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BookFormatOffer = {
  enabled: boolean;
  priceZar?: number;
  priceUsd?: number;
  checkoutUrl?: string;
  sampleUrl?: string;
};

export type BookProduct = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  coverImage: string;
  mood: string;
  tone: "children" | "novel";
  status: "published" | "coming-soon" | "draft";
  progressPercent?: number;
  ebook: BookFormatOffer;
  audiobook: BookFormatOffer;
  amazonUrl?: string;
  takealotUrl?: string;
  updatedAt: string;
};
