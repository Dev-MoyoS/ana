"use client";

export function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <div className="panel p-7 sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
              Admin Dashboard
            </div>
            <div className="mt-3 font-[var(--font-display)] text-3xl text-[color:var(--foreground)]">
              Coming soon.
            </div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">
              Firebase is removed for now. We’ll reintroduce auth + secure management when you’re ready.
            </div>
          </div>
          <div className="rounded-full border border-[rgba(46,29,24,0.14)] bg-white/70 px-6 py-3 text-sm text-[color:var(--muted)]">
            Author-only
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard
          title="Books"
          copy="Upload ebooks/audiobooks, manage prices, and connect checkout providers. (Planned)"
        />
        <AdminCard
          title="Blog / Journal"
          copy="Manage posts via Sanity Studio, then feature them here."
        />
        <AdminCard
          title="Retailer links"
          copy="Update Amazon/Audible/Takealot/Apple Books/Kobo links. (Planned)"
        />
        <AdminCard
          title="Newsletter subscribers"
          copy="View signups and export lists (provider integration planned)."
        />
      </div>
    </div>
  );
}

function AdminCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="panel p-7">
      <div className="font-[var(--font-display)] text-2xl text-[color:var(--foreground)]">{title}</div>
      <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{copy}</div>
      <button
        type="button"
        className="mt-6 btn-aurora px-6 py-3 text-sm"
        onClick={() => {
          // Placeholder until CRUD wiring is added.
        }}
      >
        Open
      </button>
    </div>
  );
}

