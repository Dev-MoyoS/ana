export type JournalCategory =
  | "school visits"
  | "tour diary"
  | "book progress"
  | "updates"
  | "inspiration";

export type JournalPost = {
  id: string;
  slug: string;
  title: string;
  category: JournalCategory;
  excerpt: string;
  body: string;
  location?: string;
  coverImage: string;
  gallery: string[];
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
