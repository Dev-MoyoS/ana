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

export function getAuthorUidAllowlist(): string[] {
  const raw = process.env.NEXT_PUBLIC_AUTHOR_UIDS ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export function isAuthorEmail(email: string | null | undefined) {
  if (!email) return false;
  const allow = getAuthorAllowlist();
  if (allow.length === 0) return false;
  return allow.includes(email.trim().toLowerCase());
}

export function isAuthorUid(uid: string | null | undefined) {
  if (!uid) return false;
  const allow = getAuthorUidAllowlist();
  if (allow.length === 0) return false;
  return allow.includes(uid.trim());
}

export function isAuthorAccount(user: { uid: string; email: string | null } | null | undefined) {
  if (!user) return false;
  const emails = getAuthorAllowlist();
  const uids = getAuthorUidAllowlist();
  if (emails.length === 0 && uids.length === 0) return false;
  if (isAuthorUid(user.uid)) return true;
  return isAuthorEmail(user.email);
}
