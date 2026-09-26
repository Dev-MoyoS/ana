"use client";

import Link from "next/link";
import { AdminSetupPanel } from "../author/AdminSetupPanel";

export function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <AdminSetupPanel />
      <div className="panel p-6 sm:p-10">
        <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
          Author admin
        </div>
        <div className="mt-3 font-[var(--font-display)] text-3xl text-[color:var(--foreground)]">
          Manage the site from the author studio
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
          Journal posts, book pricing, Amazon links, and tour photos are managed in the private author studio (mobile
          friendly).
        </p>
        <div className="mt-6">
          <Link href="/author/portal" className="btn-luxury-primary inline-flex min-h-11 items-center px-6 py-3 text-sm">
            Open author portal
          </Link>
        </div>
      </div>
    </div>
  );
}
