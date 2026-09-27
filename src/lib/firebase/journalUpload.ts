import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirebaseStorage } from "./client";

const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const MAX_VIDEO_BYTES = 80 * 1024 * 1024;

function sanitizeFilename(name: string) {
  return name.replace(/[^\w.-]+/g, "-").slice(0, 80) || "upload";
}

export type JournalUploadProgress = {
  percent: number;
  fileName: string;
};

export async function uploadJournalMediaFile(
  file: File,
  options: { entrySlug: string; onProgress?: (p: JournalUploadProgress) => void },
): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Firebase Storage is not configured.");

  const isVideo = file.type.startsWith("video/");
  const isImage = file.type.startsWith("image/");
  if (!isVideo && !isImage) {
    throw new Error("Please upload an image or video file.");
  }

  const max = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > max) {
    throw new Error(isVideo ? "Videos must be under 80 MB." : "Images must be under 12 MB.");
  }

  const slug = options.entrySlug || "draft";
  const path = `journal/${slug}/${Date.now()}-${sanitizeFilename(file.name)}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file, { contentType: file.type });

  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snap) => {
        const percent = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
        options.onProgress?.({ percent, fileName: file.name });
      },
      (err) => reject(err),
      async () => {
        try {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve(url);
        } catch (e) {
          reject(e);
        }
      },
    );
  });
}
