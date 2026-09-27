import type { JournalMediaItem, JournalPost } from "@/lib/types/content";

export function createMediaId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function normalizeJournalMedia(post: Pick<JournalPost, "media" | "gallery" | "videos">): JournalMediaItem[] {
  if (Array.isArray(post.media) && post.media.length > 0) {
    return post.media.map((item) => ({
      id: item.id || createMediaId(),
      kind: item.kind === "video" ? "video" : "image",
      url: String(item.url ?? ""),
      caption: item.caption ? String(item.caption) : undefined,
    }));
  }

  const items: JournalMediaItem[] = [];
  for (const url of post.gallery ?? []) {
    if (!url) continue;
    items.push({ id: createMediaId(), kind: "image", url });
  }
  for (const url of post.videos ?? []) {
    if (!url) continue;
    items.push({ id: createMediaId(), kind: "video", url });
  }
  return items;
}

export function galleryUrlsFromMedia(media: JournalMediaItem[]) {
  return media.filter((m) => m.kind === "image" && m.url).map((m) => m.url);
}

export function videoUrlsFromMedia(media: JournalMediaItem[]) {
  return media.filter((m) => m.kind === "video" && m.url).map((m) => m.url);
}

export type VideoEmbed = {
  embedUrl: string;
  provider: "youtube" | "vimeo" | "file";
};

export function resolveVideoEmbed(url: string): VideoEmbed | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      if (id) return { provider: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      if (id) return { provider: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
      const shorts = parsed.pathname.match(/^\/shorts\/([^/]+)/);
      if (shorts?.[1]) return { provider: "youtube", embedUrl: `https://www.youtube.com/embed/${shorts[1]}` };
    }

    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id) return { provider: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}` };
    }

    if (host === "player.vimeo.com") {
      return { provider: "vimeo", embedUrl: trimmed };
    }
  } catch {
    // not a URL — fall through to file embed
  }

  if (/\.(mp4|webm|mov)(\?|$)/i.test(trimmed) || trimmed.includes("firebasestorage.googleapis.com")) {
    return { provider: "file", embedUrl: trimmed };
  }

  return null;
}

export function isRemoteMediaUrl(url: string) {
  return /^https?:\/\//i.test(url);
}
