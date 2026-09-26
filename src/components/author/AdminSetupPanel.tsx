"use client";

import { getAuthorAllowlist, isFirebaseConfigured } from "@/lib/firebase/config";
import { useAuthorAuth } from "@/lib/firebase/AuthorAuthContext";

export function AdminSetupPanel() {
  const { isAuthor, firebaseReady, user } = useAuthorAuth();
  const allowlist = getAuthorAllowlist();

  const checks = [
    {
      label: "Firebase environment variables loaded",
      ok: firebaseReady || isFirebaseConfigured(),
    },
    {
      label: "Author email allowlist configured",
      ok: allowlist.length > 0,
      hint: "Set NEXT_PUBLIC_AUTHOR_EMAILS in .env.local",
    },
    {
      label: "Signed in as authorized author",
      ok: isAuthor,
      hint: user?.email ?? "Sign in at /author/portal",
    },
    {
      label: "Firestore rules deployed with your email",
      ok: allowlist.length > 0,
      hint: "Run: firebase deploy --only firestore:rules",
    },
  ];

  const readyCount = checks.filter((c) => c.ok).length;

  return (
    <div className="panel p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.34em] text-[color:var(--muted)]">
            ADMIN READINESS
          </div>
          <div className="mt-2 font-[var(--font-display)] text-2xl text-[color:var(--foreground)]">
            {readyCount}/{checks.length} setup steps complete
          </div>
        </div>
        <div
          className={[
            "rounded-full px-3 py-1 text-xs tracking-[0.18em]",
            readyCount === checks.length
              ? "bg-[rgba(200,164,106,0.22)] text-[color:var(--foreground)]"
              : "bg-white/70 text-[color:var(--muted)]",
          ].join(" ")}
        >
          {readyCount === checks.length ? "READY" : "IN PROGRESS"}
        </div>
      </div>

      <ul className="mt-5 space-y-3">
        {checks.map((check) => (
          <li
            key={check.label}
            className="rounded-[14px] border border-[rgba(46,29,24,0.10)] bg-white/65 px-4 py-3 text-sm"
          >
            <div className="flex items-start gap-3">
              <span className={check.ok ? "text-[color:var(--gold)]" : "text-[rgba(46,29,24,0.35)]"} aria-hidden>
                {check.ok ? "✓" : "○"}
              </span>
              <div>
                <div className="text-[color:var(--foreground)]">{check.label}</div>
                {!check.ok && check.hint ? (
                  <div className="mt-1 text-xs leading-5 text-[color:var(--muted)]">{check.hint}</div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
