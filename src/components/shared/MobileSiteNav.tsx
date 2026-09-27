"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { mailtoAuthor } from "@/lib/site/contact";

const LINKS = [
  { href: "/world/children", label: "Children's Stories" },
  { href: "/world/novel", label: "Upcoming Novel" },
  { href: "/storyteller", label: "The Storyteller" },
  { href: "/inside-the-world", label: "Journal" },
  { href: "/library", label: "Library" },
] as const;

export function MobileSiteNav({ compactLabels = false }: { compactLabels?: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className="hidden items-center gap-5 text-sm text-[color:var(--foreground)]/70 md:flex">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="transition hover:text-[color:var(--foreground)]">
            {compactLabels ? link.label.split(" ")[0] : link.label}
          </Link>
        ))}
        <a
          href={mailtoAuthor({ subject: "Message for Ana The Author" })}
          className="transition hover:text-[color:var(--foreground)]"
        >
          {compactLabels ? "Contact" : "Contact Ana"}
        </a>
      </nav>

      <button
        type="button"
        className="mobile-nav-toggle relative z-[70] md:hidden"
        aria-expanded={open}
        aria-controls="mobile-site-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden className={open ? "mobile-nav-toggle__bar open" : "mobile-nav-toggle__bar"} />
        <span aria-hidden className={open ? "mobile-nav-toggle__bar open" : "mobile-nav-toggle__bar"} />
        <span aria-hidden className={open ? "mobile-nav-toggle__bar open" : "mobile-nav-toggle__bar"} />
      </button>

      {open ? (
        <div className="mobile-nav-overlay md:hidden" onClick={() => setOpen(false)} aria-hidden />
      ) : null}

      <div
        id="mobile-site-menu"
        className={open ? "mobile-nav-drawer open md:hidden" : "mobile-nav-drawer md:hidden"}
      >
        <div className="mobile-nav-drawer__inner">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={mailtoAuthor({ subject: "Message for Ana The Author" })}
            className="mobile-nav-link"
            onClick={() => setOpen(false)}
          >
            Contact Ana
          </a>
        </div>
      </div>
    </>
  );
}
