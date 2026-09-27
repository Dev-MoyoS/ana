/** Public contact email for Ana The Author (school visits, press, general enquiries). */
export const AUTHOR_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "analufunomudau@gmail.com";

export function mailtoAuthor(options?: { subject?: string; body?: string }) {
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);
  const query = params.toString();
  return `mailto:${AUTHOR_CONTACT_EMAIL}${query ? `?${query}` : ""}`;
}
