"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { consumeAuthorIdleSignOutMessage } from "@/lib/firebase/authorIdle";
import { useAuthorAuth } from "@/lib/firebase/AuthorAuthContext";

export function AuthorPortal() {
  const { signIn, isAuthor, loading, firebaseReady } = useAuthorAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [idleNotice, setIdleNotice] = useState<string | null>(null);

  useEffect(() => {
    setIdleNotice(consumeAuthorIdleSignOutMessage());
  }, []);

  useEffect(() => {
    if (!loading && isAuthor) router.replace("/author/studio");
  }, [loading, isAuthor, router]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      router.replace("/author/studio");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[color:var(--background)]">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background:radial-gradient(60%_55%_at_50%_20%,rgba(217,168,156,0.16),transparent_70%),radial-gradient(50%_45%_at_80%_70%,rgba(200,164,106,0.10),transparent_72%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12 pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-16">
        <div className="panel p-6 sm:p-8">
          <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.42em] text-[color:var(--muted)]">
            PRIVATE AUTHOR ACCESS
          </div>
          <h1 className="mt-4 font-[var(--font-display)] text-3xl text-[color:var(--foreground)]">Author portal</h1>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            Sign in to manage journal entries, book formats, retailer links, and tour updates. This area is not listed
            in the public site navigation. Sessions sign out automatically after inactivity.
          </p>

          {idleNotice ? (
            <div className="mt-4 rounded-[14px] border border-[rgba(46,29,24,0.10)] bg-white/75 px-4 py-3 text-sm text-[color:var(--muted)]">
              {idleNotice}
            </div>
          ) : null}

          {!firebaseReady ? (
            <div className="mt-6 rounded-[16px] border border-[rgba(46,29,24,0.10)] bg-white/70 p-4 text-sm text-[color:var(--muted)]">
              Firebase is not configured yet. Add your Firebase environment variables, deploy Firestore rules, and create
              the author account in Firebase Authentication.
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <label className="block">
                <span className="text-xs tracking-[0.22em] text-[rgba(46,29,24,0.55)]">EMAIL</span>
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="studio-input mt-2 text-base sm:text-sm"
                />
              </label>
              <label className="block">
                <span className="text-xs tracking-[0.22em] text-[rgba(46,29,24,0.55)]">PASSWORD</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="studio-input mt-2 text-base sm:text-sm"
                />
              </label>

              {error ? <p className="text-sm text-[#9b4d4d]">{error}</p> : null}

              <button type="submit" disabled={submitting} className="btn-luxury-primary min-h-11 w-full px-6 py-3.5 text-sm">
                {submitting ? "Signing in…" : "Enter studio"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
