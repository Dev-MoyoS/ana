"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16 text-center">
      <div className="font-[var(--font-cinematic)] text-xs tracking-[0.38em] text-[color:var(--muted)]">
        SOMETHING WENT WRONG
      </div>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl text-[color:var(--foreground)]">
        Let&apos;s try that again
      </h1>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
        If you were developing locally, stop the server and run{" "}
        <code className="rounded bg-white/70 px-1.5 py-0.5">npm run dev</code> to refresh the build cache.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button type="button" className="btn-luxury-primary min-h-11 px-6 py-3 text-sm" onClick={() => reset()}>
          Retry
        </button>
        <Link href="/" className="btn-luxury-secondary min-h-11 px-6 py-3 text-sm">
          Go home
        </Link>
      </div>
    </main>
  );
}
