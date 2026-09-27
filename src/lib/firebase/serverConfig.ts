import type { FirebaseOptions } from "firebase/app";
import { getMissingFirebaseEnvKeys, getRecommendedFirebaseEnvKeysMissing } from "./config";

export function getFirebasePublicConfigFromEnv(): FirebaseOptions | null {
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.trim();
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.trim();
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID?.trim();
  if (!apiKey || !authDomain || !projectId || !appId) return null;

  return {
    apiKey,
    authDomain,
    projectId,
    appId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.trim(),
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?.trim(),
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?.trim(),
  };
}

export function getFirebaseConfigStatus() {
  const missingRequired = getMissingFirebaseEnvKeys();
  const missingRecommended = getRecommendedFirebaseEnvKeysMissing();
  const firebase = getFirebasePublicConfigFromEnv();
  return {
    configured: Boolean(firebase),
    missingRequired,
    missingRecommended,
    firebase,
  };
}
