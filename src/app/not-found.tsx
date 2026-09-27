import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16 text-center">
      <div className="font-[var(--font-cinematic)] text-xs tracking-[0.38em] text-[color:var(--muted)]">
        PAGE NOT FOUND
      </div>
      <h1 className="mt-4 font-[var(--font-display)] text-3xl text-[color:var(--foreground)]">
        This chapter isn&apos;t written yet
      </h1>
      <p className="mt-3 text-sm text-[color:var(--muted)]">
        The page you requested doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="btn-luxury-primary mx-auto mt-8 min-h-11 px-6 py-3 text-sm">
        Return home
      </Link>
    </main>
  );
}
