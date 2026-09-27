## The World of Analufuno Mudau

An immersive cinematic interactive author website built with **Next.js 15 App Router**, **TypeScript**, **TailwindCSS v4**, **Framer Motion**, **GSAP**, **Lenis smooth scrolling**, **React Three Fiber**, and **Sanity CMS**.

## Getting Started

### 1) Install and run the website

```bash
npm run dev
```

Open `http://localhost:3000`.

### 2) Environment variables

Copy `.env.example` to `.env.local` and fill in:

- **Sanity**: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- **Firebase** (journal, books, private author login): see `.env.example`

### 3) Firebase (journal + author studio)

1. Create a Firebase project and enable **Authentication (Email/Password)** and **Firestore**.
2. Add the Firebase web app keys to `.env.local` (see `.env.example`).
3. Set `NEXT_PUBLIC_AUTHOR_EMAILS` to the author email(s) allowed to sign in.
4. Update `firestore.rules` author email list to match, then deploy rules:

```bash
firebase deploy --only firestore:rules
```

5. Create the author user in Firebase Authentication (same email as the allowlist).
6. Sign in at **`/author/portal`** (private — not linked in public navigation).
7. Manage journal entries and book formats in **`/author/studio`**.

### Production (Vercel — mudaubooks.co.za)

If `/author/portal` shows “Firebase is not configured”, the live site was built **without** Firebase env vars.

1. Vercel → your project → **Settings → Environment Variables**.
2. Copy every `NEXT_PUBLIC_FIREBASE_*`, `NEXT_PUBLIC_AUTHOR_*`, and `NEXT_PUBLIC_CONTACT_EMAIL` value from your local `.env.local` (see `.env.example` for names).
3. Apply to **Production** (and Preview if you use it).
4. **Redeploy** the latest deployment (Deployments → … → Redeploy). Changing env vars alone is not enough for `NEXT_PUBLIC_*` — you need a new build.
5. Run `firebase deploy --only firestore:rules,storage` so Ana’s account can write journal media and posts.

Public pages:

- Journal: `/inside-the-world` and `/inside-the-world/[slug]`
- Book shop: `/library` and `/library/[slug]`

### 4) Run Sanity Studio (CMS)

```bash
npm run sanity:dev
```

Studio runs at `http://localhost:3333`.

## Project structure (high-level)

- `src/app/`: App Router routes (`/`, `/world/*`, `/storyteller`, `/inside-the-world`, `/library`, `/admin`)
- `src/components/`: cinematic UI + world experiences
- `src/lib/sanity/`: Sanity client + queries
- `sanity/`: Sanity schema types
- `sanity.config.ts`: Studio config

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
