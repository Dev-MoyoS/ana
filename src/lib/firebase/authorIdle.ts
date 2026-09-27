export const AUTHOR_IDLE_SIGNOUT_KEY = "author:idle-signout";

export function getAuthorIdleTimeoutMs() {
  const minutes = Number(process.env.NEXT_PUBLIC_AUTHOR_IDLE_MINUTES ?? "20");
  if (!Number.isFinite(minutes) || minutes <= 0) return 20 * 60 * 1000;
  return minutes * 60 * 1000;
}

export function markAuthorIdleSignOut() {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(AUTHOR_IDLE_SIGNOUT_KEY, "1");
}

export function consumeAuthorIdleSignOutMessage() {
  if (typeof window === "undefined") return null;
  const flagged = window.sessionStorage.getItem(AUTHOR_IDLE_SIGNOUT_KEY);
  if (!flagged) return null;
  window.sessionStorage.removeItem(AUTHOR_IDLE_SIGNOUT_KEY);
  return "You were signed out after a period of inactivity.";
}
