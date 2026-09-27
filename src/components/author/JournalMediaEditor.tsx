"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { TOUR_PHOTO_PATHS } from "@/lib/content/tourPhotos";
import { uploadJournalMediaFile } from "@/lib/firebase/journalUpload";
import { createMediaId, isRemoteMediaUrl, resolveVideoEmbed } from "@/lib/journal/media";
import type { JournalMediaItem } from "@/lib/types/content";

type Props = {
  entrySlug: string;
  media: JournalMediaItem[];
  coverImage: string;
  onMediaChange: (media: JournalMediaItem[]) => void;
  onCoverChange: (url: string) => void;
  disabled?: boolean;
};

export function JournalMediaEditor({
  entrySlug,
  media,
  coverImage,
  onMediaChange,
  onCoverChange,
  disabled,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [uploadLabel, setUploadLabel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const slug = entrySlug || "draft";

  function patchMedia(next: JournalMediaItem[]) {
    onMediaChange(next);
    if (!coverImage && next.find((m) => m.kind === "image")?.url) {
      onCoverChange(next.find((m) => m.kind === "image")!.url);
    }
  }

  function moveItem(id: string, direction: -1 | 1) {
    const idx = media.findIndex((m) => m.id === id);
    if (idx < 0) return;
    const target = idx + direction;
    if (target < 0 || target >= media.length) return;
    const copy = [...media];
    const [item] = copy.splice(idx, 1);
    copy.splice(target, 0, item!);
    patchMedia(copy);
  }

  function removeItem(id: string) {
    patchMedia(media.filter((m) => m.id !== id));
  }

  function updateCaption(id: string, caption: string) {
    patchMedia(media.map((m) => (m.id === id ? { ...m, caption: caption || undefined } : m)));
  }

  async function onFilesSelected(files: FileList | null) {
    if (!files?.length || disabled) return;
    setError(null);
    const additions: JournalMediaItem[] = [];

    for (const file of Array.from(files)) {
      try {
        setUploadLabel(`Uploading ${file.name}…`);
        const url = await uploadJournalMediaFile(file, {
          entrySlug: slug,
          onProgress: ({ percent, fileName }) => setUploadLabel(`Uploading ${fileName} (${percent}%)`),
        });
        additions.push({
          id: createMediaId(),
          kind: file.type.startsWith("video/") ? "video" : "image",
          url,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      }
    }

    setUploadLabel(null);
    if (additions.length) patchMedia([...media, ...additions]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function addVideoLink() {
    const url = videoUrl.trim();
    if (!url) return;
    if (!resolveVideoEmbed(url) && !url.startsWith("http")) {
      setError("Paste a full YouTube, Vimeo, or video link.");
      return;
    }
    setError(null);
    patchMedia([...media, { id: createMediaId(), kind: "video", url }]);
    setVideoUrl("");
  }

  function addImagePath() {
    const url = imagePath.trim();
    if (!url) return;
    setError(null);
    patchMedia([...media, { id: createMediaId(), kind: "image", url }]);
    setImagePath("");
    if (!coverImage) onCoverChange(url);
  }

  function addTourPhotos() {
    const existing = new Set(media.map((m) => m.url));
    const extras = TOUR_PHOTO_PATHS.filter((p) => !existing.has(p)).map((url) => ({
      id: createMediaId(),
      kind: "image" as const,
      url,
    }));
    patchMedia([...media, ...extras]);
  }

  const imageCount = media.filter((m) => m.kind === "image").length;
  const videoCount = media.filter((m) => m.kind === "video").length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.32em] text-[color:var(--muted)]">
            STORY MEDIA
          </div>
          <p className="mt-1 text-xs leading-5 text-[color:var(--muted)]">
            Upload photos and videos, reorder them, and add captions — readers see a gallery on your blog.
          </p>
        </div>
        <div className="rounded-full border border-[rgba(46,29,24,0.10)] bg-white/80 px-3 py-1 text-[11px] tracking-[0.12em] text-[rgba(46,29,24,0.55)]">
          {imageCount} PHOTO{imageCount === 1 ? "" : "S"} · {videoCount} VIDEO{videoCount === 1 ? "" : "S"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={disabled}
          className="btn-luxury-secondary min-h-11 px-4 py-2 text-xs"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload from phone or laptop
        </button>
        <button type="button" disabled={disabled} className="studio-chip" onClick={addTourPhotos}>
          Dawnview tour pack
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => void onFilesSelected(e.target.files)}
        />
      </div>

      {uploadLabel ? (
        <div className="rounded-[12px] border border-[rgba(46,29,24,0.08)] bg-[rgba(217,168,156,0.12)] px-3 py-2 text-xs text-[color:var(--muted)]">
          {uploadLabel}
        </div>
      ) : null}
      {error ? <div className="text-xs text-[#9b4d4d]">{error}</div> : null}

      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          className="studio-input text-sm"
          placeholder="Paste YouTube or Vimeo link"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          disabled={disabled}
        />
        <button type="button" disabled={disabled} className="studio-chip min-h-11" onClick={addVideoLink}>
          Add video
        </button>
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          className="studio-input text-sm"
          placeholder="Or image path e.g. /IMG-….jpg"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          disabled={disabled}
        />
        <button type="button" disabled={disabled} className="studio-chip min-h-11" onClick={addImagePath}>
          Add image
        </button>
      </div>

      {media.length === 0 ? (
        <div className="rounded-[16px] border border-dashed border-[rgba(46,29,24,0.16)] bg-white/50 px-4 py-8 text-center text-sm text-[color:var(--muted)]">
          No media yet — upload a classroom moment or paste a video link to bring this entry to life.
        </div>
      ) : (
        <ul className="space-y-3">
          {media.map((item, index) => (
            <li
              key={item.id}
              className="rounded-[16px] border border-[rgba(46,29,24,0.10)] bg-white/75 p-3 sm:p-4"
            >
              <div className="flex gap-3 sm:gap-4">
                <MediaThumb item={item} />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] tracking-[0.14em] text-[rgba(46,29,24,0.55)]">
                    <span className="rounded-full bg-[rgba(46,29,24,0.06)] px-2 py-0.5">
                      {item.kind === "video" ? "VIDEO" : "PHOTO"} #{index + 1}
                    </span>
                    {coverImage === item.url ? (
                      <span className="rounded-full bg-[rgba(217,168,156,0.35)] px-2 py-0.5 text-[color:var(--foreground)]">
                        COVER
                      </span>
                    ) : null}
                  </div>
                  <input
                    className="studio-input text-sm"
                    placeholder="Caption (optional)"
                    value={item.caption ?? ""}
                    onChange={(e) => updateCaption(item.id, e.target.value)}
                    disabled={disabled}
                  />
                  <p className="truncate text-[11px] text-[rgba(46,29,24,0.45)]">{item.url}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.kind === "image" ? (
                      <button
                        type="button"
                        className="text-xs underline"
                        disabled={disabled}
                        onClick={() => onCoverChange(item.url)}
                      >
                        Set as cover
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="text-xs underline"
                      disabled={disabled || index === 0}
                      onClick={() => moveItem(item.id, -1)}
                    >
                      Move up
                    </button>
                    <button
                      type="button"
                      className="text-xs underline"
                      disabled={disabled || index === media.length - 1}
                      onClick={() => moveItem(item.id, 1)}
                    >
                      Move down
                    </button>
                    <button
                      type="button"
                      className="text-xs text-[#9b4d4d] underline"
                      disabled={disabled}
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MediaThumb({ item }: { item: JournalMediaItem }) {
  const embed = item.kind === "video" ? resolveVideoEmbed(item.url) : null;

  if (item.kind === "image") {
    if (isRemoteMediaUrl(item.url)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.url}
          alt=""
          className="h-20 w-20 shrink-0 rounded-[12px] border border-[rgba(46,29,24,0.10)] object-cover sm:h-24 sm:w-24"
        />
      );
    }
    return (
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[12px] border border-[rgba(46,29,24,0.10)] sm:h-24 sm:w-24">
        <Image src={item.url} alt="" fill sizes="96px" className="object-cover" />
      </div>
    );
  }

  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-[rgba(46,29,24,0.10)] bg-[rgba(46,29,24,0.06)] sm:h-24 sm:w-24">
      <span className="font-[var(--font-cinematic)] text-[10px] tracking-[0.2em] text-[color:var(--muted)]">
        {embed?.provider === "youtube" ? "YT" : embed?.provider === "vimeo" ? "VIMEO" : "MP4"}
      </span>
    </div>
  );
}
