"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { bootstrapFirebaseFromServer } from "./bootstrapClient";
import { isFirebaseConfigured } from "./config";

type FirebaseBootstrapState = {
  ready: boolean;
  loading: boolean;
  missingRequired: string[];
  missingRecommended: string[];
};

const FirebaseBootstrapContext = createContext<FirebaseBootstrapState>({
  ready: false,
  loading: true,
  missingRequired: [],
  missingRecommended: [],
});

export function FirebaseBootstrapProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FirebaseBootstrapState>(() => ({
    ready: isFirebaseConfigured(),
    loading: !isFirebaseConfigured(),
    missingRequired: [],
    missingRecommended: [],
  }));

  useEffect(() => {
    if (isFirebaseConfigured()) {
      setState({ ready: true, loading: false, missingRequired: [], missingRecommended: [] });
      return;
    }

    let cancelled = false;

    bootstrapFirebaseFromServer().then((result) => {
      if (cancelled) return;
      if (result.configured) {
        setState({ ready: true, loading: false, missingRequired: [], missingRecommended: [] });
        return;
      }
      setState({
        ready: false,
        loading: false,
        missingRequired: result.missingRequired,
        missingRecommended: result.missingRecommended,
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => state, [state]);

  return <FirebaseBootstrapContext.Provider value={value}>{children}</FirebaseBootstrapContext.Provider>;
}

export function useFirebaseBootstrap() {
  return useContext(FirebaseBootstrapContext);
}
