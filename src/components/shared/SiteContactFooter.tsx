import Link from "next/link";
import { mailtoAuthor } from "@/lib/site/contact";
import { ContactEmailLink } from "./ContactEmailLink";

export function SiteContactFooter({ showAdminLinks = true }: { showAdminLinks?: boolean }) {
  return (
    <footer className="relative z-10 border-t border-[rgba(46,29,24,0.10)] bg-[rgba(247,242,238,0.72)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-[color:var(--muted)] sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.34em] text-[color:var(--foreground)]/70">
            Analufuno Mudau
          </div>
          <div className="mt-1">© {new Date().getFullYear()} The World of Analufuno Mudau</div>
          <div className="mt-2 text-sm">
            Contact: <ContactEmailLink subject="Message for Ana The Author" />
          </div>
          <div className="mt-2 text-xs text-[color:var(--muted)]/80">
            Built by{" "}
            <a
              href="https://nellytechnologies.co.za/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[color:var(--foreground)]/75 underline decoration-[rgba(200,164,106,0.55)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
            >
              Nelly Technologies (Pty) Ltd
            </a>
          </div>
        </div>
        {showAdminLinks ? (
          <div className="flex flex-wrap gap-4">
            <ContactEmailLink
              subject="School visit enquiry"
              className="transition hover:text-[color:var(--foreground)]"
            >
              Book a visit
            </ContactEmailLink>
            <Link className="transition hover:text-[color:var(--foreground)]" href="/admin">
              Admin
            </Link>
            <Link className="transition hover:text-[color:var(--foreground)]" href="/library">
              Retailers
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            <ContactEmailLink
              subject="School visit enquiry"
              className="transition hover:text-[color:var(--foreground)]"
            >
              Book a visit
            </ContactEmailLink>
            <Link className="transition hover:text-[color:var(--foreground)]" href="/storyteller">
              About Ana
            </Link>
          </div>
        )}
      </div>
    </footer>
  );
}

export function SiteContactPanel({ title = "Get in touch" }: { title?: string }) {
  return (
    <div className="rounded-[18px] border border-[rgba(46,29,24,0.10)] bg-white/65 p-5 sm:p-6">
      <div className="font-[var(--font-cinematic)] text-xs tracking-[0.34em] text-[color:var(--muted)]">
        {title.toUpperCase()}
      </div>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
        For school visits, collaborations, and reader messages, email Ana directly — she reads every note when she can.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={mailtoAuthor({ subject: "Message for Ana The Author" })}
          className="btn-luxury-primary inline-flex min-h-11 items-center justify-center px-6 py-3 text-center text-sm"
        >
          Email Ana
        </a>
        <ContactEmailLink
          subject="School visit enquiry"
          className="inline-flex min-h-11 items-center text-sm text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]"
        />
      </div>
    </div>
  );
}
