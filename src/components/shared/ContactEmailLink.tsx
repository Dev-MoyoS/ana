import type { ReactNode } from "react";
import { AUTHOR_CONTACT_EMAIL, mailtoAuthor } from "@/lib/site/contact";

type Props = {
  className?: string;
  subject?: string;
  body?: string;
  /** Show the address as link text; default is the email. */
  children?: ReactNode;
};

export function ContactEmailLink({ className, subject, body, children }: Props) {
  return (
    <a
      href={mailtoAuthor({ subject, body })}
      className={
        className ??
        "font-medium text-[color:var(--foreground)]/85 underline decoration-[rgba(200,164,106,0.55)] underline-offset-4 transition hover:text-[color:var(--foreground)]"
      }
    >
      {children ?? AUTHOR_CONTACT_EMAIL}
    </a>
  );
}
