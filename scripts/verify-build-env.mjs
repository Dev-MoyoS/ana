const required = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

if (!process.env.NETLIFY) {
  process.exit(0);
}

const missing = required.filter((key) => !String(process.env[key] ?? "").trim());
if (missing.length) {
  console.warn(
    "[verify-build-env] Missing during Netlify build (runtime API may still work if set for functions):",
    missing.join(", "),
  );
}
