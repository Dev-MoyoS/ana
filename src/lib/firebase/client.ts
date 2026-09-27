import { initializeApp, getApps, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { isFirebaseConfigured } from "./config";

const buildTimeFirebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let runtimeFirebaseConfig: FirebaseOptions | null = null;

/** Set after /api/public-config (Netlify runtime env). */
export function setFirebaseRuntimeConfig(config: FirebaseOptions) {
  runtimeFirebaseConfig = config;
  app = null;
  auth = null;
  db = null;
  storage = null;
}

function resolveFirebaseConfig(): FirebaseOptions | null {
  if (runtimeFirebaseConfig?.apiKey) return runtimeFirebaseConfig;
  if (isFirebaseConfigured()) return buildTimeFirebaseConfig;
  return null;
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

export function getFirebaseApp() {
  const firebaseConfig = resolveFirebaseConfig();
  if (!firebaseConfig?.apiKey) return null;
  if (!app) {
    try {
      app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      return null;
    }
  }
  return app;
}

export function getFirebaseAuth() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!auth) auth = getAuth(firebaseApp);
  return auth;
}

export function getFirebaseDb() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!db) db = getFirestore(firebaseApp);
  return db;
}

export function getFirebaseStorage() {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!storage) storage = getStorage(firebaseApp);
  return storage;
}
