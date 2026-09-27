"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { isRemoteMediaUrl, normalizeJournalMedia, resolveVideoEmbed } from "@/lib/journal/media";
import type { JournalPost } from "@/lib/types/content";

export function JournalMediaGallery({ post }: { post: JournalPost }) {
  const media = useMemo(() => normalizeJournalMedia(post), [post]);
  const images = media.filter((m) => m.kind === "image");
  const videos = media.filter((m) => m.kind === "video");
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (images.length === 0 && videos.length === 0) return null;

  return (
    <div className="space-y-6">
      {videos.length > 0 ? (
        <div className="panel p-5 sm:p-6">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.38em] text-[color:var(--muted)]">
            Moments on film
          </div>
          <div className="mt-4 space-y-4">
            {videos.map((item) => {
              const embed = resolveVideoEmbed(item.url);
              if (!embed) return null;
              return (
                <div key={item.id} className="overflow-hidden rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-black/5">
                  {embed.provider === "file" ? (
                    <video controls playsInline className="aspect-video w-full bg-black" src={embed.embedUrl} />
                  ) : (
                    <iframe
                      title={item.caption || "Journal video"}
                      src={embed.embedUrl}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  {item.caption ? (
                    <p className="px-4 py-3 text-sm text-[color:var(--muted)]">{item.caption}</p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {images.length > 0 ? (
        <div className="panel p-5 sm:p-6">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.38em] text-[color:var(--muted)]">
            From the visit
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {images.map((item, idx) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-[16px] border border-[rgba(46,29,24,0.10)] text-left"
                onClick={() => setLightbox(idx)}
              >
                <GalleryImage src={item.url} alt={item.caption || ""} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(46,29,24,0.45)] via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                {item.caption ? (
                  <span className="pointer-events-none absolute bottom-2 left-2 right-2 text-[11px] leading-snug text-white opacity-0 transition group-hover:opacity-100">
                    {item.caption}
                  </span>
                ) : null}
              </motion.button>
            ))}
          </div>
        </div>
      ) : null}

      <AnimatePresence>
        {lightbox !== null && images[lightbox] ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(24,16,14,0.88)] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-4xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <GalleryImage
                src={images[lightbox]!.url}
                alt={images[lightbox]!.caption || post.title}
                className="max-h-[80vh] w-auto max-w-full rounded-[12px] object-contain"
                fillMode={false}
              />
              {images[lightbox]!.caption ? (
                <p className="mt-3 text-center text-sm text-white/85">{images[lightbox]!.caption}</p>
              ) : null}
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  className="rounded-full border border-white/30 px-4 py-2 text-xs tracking-[0.16em] text-white"
                  onClick={() => setLightbox((i) => (i === null || i <= 0 ? i : i - 1))}
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/30 px-4 py-2 text-xs tracking-[0.16em] text-white"
                  onClick={() =>
                    setLightbox((i) => (i === null || i >= images.length - 1 ? i : i + 1))
                  }
                >
                  Next
                </button>
                <button
                  type="button"
                  className="rounded-full bg-white/15 px-4 py-2 text-xs tracking-[0.16em] text-white"
                  onClick={() => setLightbox(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function GalleryImage({
  src,
  alt,
  className,
  fillMode = true,
}: {
  src: string;
  alt: string;
  className?: string;
  fillMode?: boolean;
}) {
  if (isRemoteMediaUrl(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className ?? "h-full w-full object-cover"} />;
  }

  if (!fillMode) {
    return (
      <div className="relative">
        <Image src={src} alt={alt} width={1200} height={1500} className={className} />
      </div>
    );
  }

  return (
    <Image src={src} alt={alt} fill sizes="(max-width:768px) 45vw, 220px" className={className ?? "object-cover"} />
  );
}
