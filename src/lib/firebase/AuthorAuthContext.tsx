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
import { AuthorInactivityMonitor } from "@/components/author/AuthorInactivityMonitor";
import { getFirebaseAuth } from "./client";
import { isAuthorAccount, isFirebaseConfigured } from "./config";

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
          if (nextUser && !isAuthorAccount(nextUser)) {
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
    if (!isAuthorAccount(cred.user)) {
      await signOut(auth);
      throw new Error("This account is not authorized for author access.");
    }
  }, []);

  const signOutAuthor = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;
    await signOut(auth);
  }, []);

  const isAuthor = Boolean(user && isAuthorAccount(user));

  const value = useMemo(
    () => ({
      user,
      isAuthor,
      loading,
      firebaseReady,
      signIn,
      signOutAuthor,
    }),
    [user, isAuthor, loading, firebaseReady, signIn, signOutAuthor],
  );

  return (
    <AuthorAuthContext.Provider value={value}>
      <AuthorInactivityMonitor enabled={isAuthor} onIdleSignOut={signOutAuthor} />
      {children}
    </AuthorAuthContext.Provider>
  );
}

export function useAuthorAuth() {
  const ctx = useContext(AuthorAuthContext);
  if (!ctx) throw new Error("useAuthorAuth must be used within AuthorAuthProvider");
  return ctx;
}
