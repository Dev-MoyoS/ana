export function isFirebaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  );
}

export function getAuthorAllowlist(): string[] {
  const raw = process.env.NEXT_PUBLIC_AUTHOR_EMAILS ?? "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAuthorEmail(email: string | null | undefined) {
  if (!email) return false;
  const allow = getAuthorAllowlist();
  if (allow.length === 0) return false;
  return allow.includes(email.trim().toLowerCase());
}
