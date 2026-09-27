"use client";

import type { FirebaseOptions } from "firebase/app";
import { setFirebaseRuntimeConfig } from "./client";

export type FirebaseBootstrapResult =
  | { configured: true }
  | { configured: false; missingRequired: string[]; missingRecommended: string[] };

let bootstrapPromise: Promise<FirebaseBootstrapResult> | null = null;

export function bootstrapFirebaseFromServer(): Promise<FirebaseBootstrapResult> {
  if (!bootstrapPromise) {
    bootstrapPromise = fetch("/api/public-config", { cache: "no-store" })
      .then(async (res) => {
        const data = (await res.json()) as {
          configured?: boolean;
          firebase?: FirebaseOptions;
          missingRequired?: string[];
          missingRecommended?: string[];
        };

        if (data.configured && data.firebase?.apiKey) {
          setFirebaseRuntimeConfig(data.firebase);
          return { configured: true as const };
        }

        return {
          configured: false as const,
          missingRequired: data.missingRequired ?? [],
          missingRecommended: data.missingRecommended ?? [],
        };
      })
      .catch(() => ({
        configured: false as const,
        missingRequired: [] as string[],
        missingRecommended: [] as string[],
      }));
  }

  return bootstrapPromise;
}
