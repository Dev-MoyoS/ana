"use client";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getFirebaseAuth } from "./client";
import { isAuthorEmail, isFirebaseConfigured } from "./config";

type AuthorAuthContextValue = {
  user: User | null;
  isAuthor: boolean;
  loading: boolean;
  firebaseReady: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOutAuthor: () => Promise<void>;
};

const AuthorAuthContext = createContext<AuthorAuthContextValue | null>(null);

export function AuthorAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const firebaseReady = isFirebaseConfigured();

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(
      auth,
      async (nextUser) => {
        try {
          if (nextUser && !isAuthorEmail(nextUser.email)) {
            await signOut(auth);
            setUser(null);
          } else {
            setUser(nextUser);
          }
        } catch (error) {
          console.error("Author auth state handling failed:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Author auth listener failed:", error);
        setUser(null);
        setLoading(false);
      },
    );

    return () => unsub();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Firebase is not configured.");
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
    if (!isAuthorEmail(cred.user.email)) {
      await signOut(auth);
      throw new Error("This account is not authorized for author access.");
    }
  }, []);

  const signOutAuthor = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await signOut(auth);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthor: Boolean(user && isAuthorEmail(user.email)),
      loading,
      firebaseReady,
      signIn,
      signOutAuthor,
    }),
    [user, loading, firebaseReady, signIn, signOutAuthor],
  );

  return <AuthorAuthContext.Provider value={value}>{children}</AuthorAuthContext.Provider>;
}

export function useAuthorAuth() {
  const ctx = useContext(AuthorAuthContext);
  if (!ctx) throw new Error("useAuthorAuth must be used within AuthorAuthProvider");
  return ctx;
}
