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

### 3) Run Sanity Studio (CMS)

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
