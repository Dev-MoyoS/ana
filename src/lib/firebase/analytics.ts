import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirebaseApp } from "./client";

let analytics: Analytics | null = null;

export async function getFirebaseAnalytics() {
  if (typeof window === "undefined") return null;
  if (analytics) return analytics;

  const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;
  if (!measurementId) return null;

  const app = getFirebaseApp();
  if (!app) return null;

  const supported = await isSupported();
  if (!supported) return null;

  analytics = getAnalytics(app);
  return analytics;
}
