"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ParticleField } from "../shared/ParticleField";
import { HeroDriftingFeather } from "./HeroDriftingFeather";
import { BookCoverShowcase } from "../shared/BookCoverShowcase";
import { CinematicFrame } from "../shared/CinematicFrame";
import { ContactEmailLink } from "../shared/ContactEmailLink";
import { MobileSiteNav } from "../shared/MobileSiteNav";
import { SiteContactFooter } from "../shared/SiteContactFooter";

export function ChapterJourney() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const bg = useTransform(
    scrollYProgress,
    [0, 0.55, 1],
    [
      "radial-gradient(85% 70% at 12% 20%, rgba(217,168,156,0.18), transparent 55%), radial-gradient(70% 55% at 88% 15%, rgba(200,164,106,0.12), transparent 50%), radial-gradient(80% 60% at 50% 25%, rgba(217,168,156,0.14), transparent 60%), linear-gradient(180deg, #f7f2ee 0%, #f7f2ee 100%)",
      "radial-gradient(70% 60% at 50% 30%, rgba(200,164,106,0.12), transparent 60%), linear-gradient(180deg, #f7f2ee, #f7f2ee)",
      "radial-gradient(70% 60% at 50% 30%, rgba(46,29,24,0.06), transparent 60%), linear-gradient(180deg, #f7f2ee, #f7f2ee)",
    ]
  );

  const heroVisualParallaxY = useTransform(heroScrollProgress, [0, 1], [0, -22]);
  const imgWarm = "/file_00000000ba0871fd9204ea33873d9875.png";
  const imgPortrait = "/WhatsApp%20Image%202026-05-06%20at%2022.53.32.jpeg";
  const galleryImages = [
    {
      src: "/file_00000000da18722f8f3a30c8a8fefb27.png",
      alt: "Ana walking along the river with her mother",
      label: "RIVER WALK",
    },
    {
      src: "/file_00000000ee44722fb898f57573312f4b.png",
      alt: "Ana meeting an elephant under a starry sky",
      label: "STARLIGHT FRIEND",
    },
    {
      src: "/file_00000000f52c71f587b9bbefde70de47.png",
      alt: "A playful beaver by the river",
      label: "THE BEAVER",
    },
    {
      src: "/file_00000000f17071f59cb44745fa1723d4.png",
      alt: "Ana daydreaming by the river",
      label: "DAYDREAM",
    },
    {
      src: "/1000475710.jpg",
      alt: "Ana's Crooked Teeth — 3D book mockup",
      label: "BOOK COVER",
    },
    {
      src: "/file_000000005ff871f58f90b18e2df56e5b.png",
      alt: "A turtle waving by the river",
      label: "THE TURTLE",
    },
    {
      src: "/file_00000000297c71f58fcad3553601f48d.png",
      alt: "Ana dreaming of an elephant in a bedroom scene",
      label: "DREAMSCAPE",
    },
    {
      src: "/file_000000003260722facb2d3e61fe7b324.png",
      alt: "Ana and an elephant in a magical landscape with a rainbow",
      label: "MAGIC LANDSCAPE",
    },
    {
      src: "/file_000000001444722fb6afb40738ea6f47.png",
      alt: "Ana meeting a turtle on a sunny riverbank",
      label: "NEW FRIEND",
    },
  ] as const;

  return (
    <motion.main ref={rootRef} className="relative min-h-screen" style={{ backgroundImage: bg }}>
      {/* Particles: softer — reads as ambient dust, not decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.22] sm:opacity-[0.28]">
        <ParticleField className="absolute inset-0 h-full w-full" />
      </div>

      <header className="site-header sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            href="/"
            className="flex min-h-11 min-w-0 items-center gap-2 font-[var(--font-cinematic)] text-[10px] tracking-[0.24em] text-[color:var(--foreground)]/80 transition hover:text-[color:var(--foreground)] sm:gap-3 sm:text-xs sm:tracking-[0.32em]"
          >
            <Image
              src="/Logo.png"
              alt="Analufuno Mudau"
              width={260}
              height={80}
              priority
              className="h-9 w-auto opacity-95 sm:h-12"
            />
            <span className="hidden min-[420px]:inline md:hidden">ANALUFUNO MUDAU</span>
            <span className="hidden md:inline">THE WORLD OF ANALUFUNO MUDAU</span>
          </Link>
          <MobileSiteNav />
        </div>
      </header>

      {/* Hero: layered depth + storytelling centerpiece */}
      <section ref={heroSectionRef} className="relative z-10 overflow-hidden">
        <div className="hero-paper-grain" aria-hidden />

        {/* Midground: soft watercolor-adjacent shapes */}
        <div
          className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[rgba(217,168,156,0.14)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-[rgba(239,228,220,0.9)] blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(200,164,106,0.08),transparent_70%)] blur-2xl"
          aria-hidden
        />

        <HeroDriftingFeather />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
            {/* Foreground copy */}
            <div className="order-2 lg:order-1">
              <motion.div
                // Don’t ever hide critical hero copy pre-hydration (mobile blank-screen safety).
                initial={false}
              >
                <div className="hero-editorial-eyebrow font-[var(--font-cinematic)] text-[11px] tracking-[0.42em] text-[color:var(--muted)] sm:text-xs">
                  ANALUFUNO MUDAU
                </div>

                <h1 className="mt-8 space-y-1 sm:mt-10">
                  <span className="block font-[var(--font-display-2)] text-[clamp(1.65rem,4vw,2.35rem)] font-medium leading-[1.15] tracking-[0.02em] text-[color:var(--foreground)]/88">
                    The World of
                  </span>
                  <span className="block font-[var(--font-display)] text-[clamp(2.65rem,7vw,4.25rem)] leading-[1.02] tracking-[-0.02em] text-[color:var(--foreground)]">
                    <span className="bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent)] to-[#c49388] bg-clip-text text-transparent">
                      Analufuno Mudau
                    </span>
                  </span>
                </h1>

                <p className="mt-8 max-w-lg font-[var(--font-display-2)] text-[clamp(1.15rem,2.4vw,1.45rem)] font-normal italic leading-[1.65] text-[color:var(--foreground)]/78">
                  Stories that inspire imagination and captivate readers.
                </p>

                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[color:var(--muted)] sm:text-base">
                  Step into a calm, luminous literary space—crafted like a modern publishing house, told with the
                  warmth of a storybook.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Link
                    href="/world/children"
                    className="btn-luxury-primary px-8 py-3.5 text-center text-sm sm:text-[15px]"
                  >
                    Enter the Children’s Stories
                  </Link>
                  <Link
                    href="/world/novel"
                    className="btn-luxury-secondary px-8 py-3.5 text-center text-sm sm:text-[15px]"
                  >
                    Discover the Upcoming Novel
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Storybook centerpiece */}
            <motion.div
              className="order-1 flex justify-center lg:order-2 lg:justify-end"
              style={{ y: heroVisualParallaxY }}
            >
              <CinematicFrame
                src="/file_00000000d89c71fd854624ed99229e0a.png"
                alt="A warm family storytelling moment in sunlight"
                tone="children"
                size="hero"
                className="w-full max-w-[480px]"
                priority
                overlay={
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-70 [background:radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.62),transparent_62%),radial-gradient(70%_55%_at_65%_85%,rgba(226,182,109,0.18),transparent_62%)]" />
                    {/* subtle sparkles — storybook realism */}
                    <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(1px_1px_at_20%_25%,rgba(200,164,106,0.55),transparent_65%),radial-gradient(1px_1px_at_68%_18%,rgba(217,168,156,0.55),transparent_65%),radial-gradient(1px_1px_at_84%_42%,rgba(200,164,106,0.45),transparent_65%),radial-gradient(1px_1px_at_38%_70%,rgba(217,168,156,0.45),transparent_65%)]" />
                  </div>
                }
                caption={
                  <>
                    <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[rgba(46,29,24,0.62)]">
                      SUNLIT STORY MOMENT
                    </span>
                    <span className="text-xs text-[rgba(46,29,24,0.58)]">Joy • warmth • childhood wonder</span>
                  </>
                }
              />
            </motion.div>
          </div>

          {/* Chapters — breathing room */}
          <div className="mt-20 grid gap-5 sm:mt-24 md:grid-cols-3">
            <ChapterCard
              number="Chapter 1"
              title="A Doorway of Wonder"
              copy="A warm storybook glow—stars, lessons, laughter, and light."
              accent="rgba(217,168,156,0.35)"
              href="/world/children"
            />
            <ChapterCard
              number="Chapter 2"
              title="The Storyteller"
              copy="A desk, a lamp, and a lifetime of pages that shaped a voice."
              accent="rgba(200,164,106,0.28)"
              href="/storyteller"
            />
            <ChapterCard
              number="Chapter 3"
              title="A Shadowed Promise"
              copy="Fog and moonlight—an elegant mystery approaching the horizon."
              accent="rgba(200,164,106,0.22)"
              href="/world/novel"
            />
          </div>

          <div className="mt-14 sm:mt-16">
            <div className="story-divider">
              <div className="story-divider-mark">
                <span>CHAPTERS</span>
                <span className="text-[color:var(--gold)]">✦</span>
                <span>BEGIN</span>
              </div>
            </div>
          </div>

          {/* Visual pacing — editorial “image moments” (intentional, not a gallery) */}
          <div className="mt-16 grid gap-10 sm:mt-20 lg:mt-24 lg:grid-cols-2 lg:items-center">
            <CinematicFrame
              src={imgWarm}
              alt="Children reading in warm sunlight"
              tone="children"
              size="section"
              overlay={
                <div className="absolute inset-0 opacity-80 [background:radial-gradient(70%_55%_at_40%_20%,rgba(255,255,255,0.62),transparent_60%),radial-gradient(70%_55%_at_70%_85%,rgba(217,168,156,0.22),transparent_62%)]" />
              }
              caption={
                <>
                  <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[rgba(46,29,24,0.62)]">
                    CHILDREN’S STORY WORLD
                  </span>
                  <span className="text-xs text-[rgba(46,29,24,0.58)]">Warm light • wonder • learning</span>
                </>
              }
            />
            <div>
              <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
                A world that feels like a page
              </div>
              <h2 className="mt-5 font-[var(--font-display)] text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
                Storytelling made tangible—soft, bright, and brave.
              </h2>
              <p className="mt-4 max-w-xl text-[color:var(--muted)]">
                Cinematic moments for children, classrooms, and families—crafted with calm luxury and emotional
                warmth.
              </p>
              <div className="mt-7">
                <Link href="/world/children" className="btn-luxury-primary px-8 py-3.5 text-sm">
                  Explore the Children’s World
                </Link>
              </div>
            </div>
          </div>

          {/* Book showcase — dedicated cinematic section */}
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <div className="panel relative overflow-hidden p-8 sm:p-10">
              <div className="absolute -inset-16 opacity-65 blur-3xl [background:radial-gradient(60%_55%_at_45%_35%,rgba(226,182,109,0.22),transparent_70%),radial-gradient(60%_55%_at_70%_60%,rgba(217,168,156,0.18),transparent_70%)]" />
              <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <div>
                  <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
                    Featured Children’s Book
                  </div>
                  <h2 className="mt-5 font-[var(--font-display)] text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
                    Ana’s Crooked Teeth: The Story of a Unique Smile
                  </h2>
                  <p className="mt-4 max-w-xl text-[color:var(--muted)]">
                    Ana has always had a bright, joyful smile but when she begins to notice her crooked teeth, she
                    starts to feel different and unsure of herself. What once came naturally now feels difficult and
                    Ana slowly begins to hide the very same thing that made her shine and outstanding.
                  </p>
                  <p className="mt-4 max-w-xl text-[color:var(--muted)]">
                    On a gentle and magical journey, Ana meets a group of kind and unique animal friends who each have
                    their own special differences. Through their wisdom, she discovers that her smile is not something
                    to hide but something to celebrate.
                  </p>
                  <p className="mt-4 max-w-xl text-[color:var(--muted)]">
                    Ana’s Crooked Teeth: The Story of a Unique Smile is a heartfelt story about self-love, confidence
                    and embracing what makes you beautifully unique.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <Link href="/world/children" className="btn-luxury-primary px-8 py-3.5 text-sm">
                      Enter the Book World
                    </Link>
                    <Link href="/library" className="btn-luxury-secondary px-8 py-3.5 text-sm">
                      Explore the Library
                    </Link>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <BookCoverShowcase size="large" />
                </div>
              </div>

              <div className="relative mt-10 grid gap-4 border-t border-[rgba(46,29,24,0.08)] pt-10 sm:grid-cols-3">
                <CinematicFrame
                  src="/file_00000000ae60722f887e8a3ca5db101e.png"
                  alt="Book page: classroom moment"
                  tone="children"
                  size="card"
                  caption={
                    <>
                      <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[rgba(46,29,24,0.60)]">
                        PAGE 1
                      </span>
                      <span className="text-xs text-[rgba(46,29,24,0.56)]">Courage begins</span>
                    </>
                  }
                />
                <CinematicFrame
                  src="/file_00000000ba0871fd9204ea33873d9875.png"
                  alt="Book page: playground joy"
                  tone="children"
                  size="card"
                  caption={
                    <>
                      <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[rgba(46,29,24,0.60)]">
                        PAGE 2
                      </span>
                      <span className="text-xs text-[rgba(46,29,24,0.56)]">Joy returns</span>
                    </>
                  }
                />
                <CinematicFrame
                  src="/file_00000000d89c71fd854624ed99229e0a.png"
                  alt="Book page: family warmth"
                  tone="children"
                  size="card"
                  caption={
                    <>
                      <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[rgba(46,29,24,0.60)]">
                        PAGE 3
                      </span>
                      <span className="text-xs text-[rgba(46,29,24,0.56)]">Love stays</span>
                    </>
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:mt-18 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
                The Storyteller
              </div>
              <h2 className="mt-5 font-[var(--font-display)] text-3xl tracking-tight text-[color:var(--foreground)] sm:text-4xl">
                A life built from quiet pages.
              </h2>
              <p className="mt-4 max-w-xl text-[color:var(--muted)]">
                An editorial portrait—warm light, paper textures, and an intimate timeline of becoming.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href="/storyteller" className="btn-luxury-primary px-8 py-3.5 text-sm">
                  Enter the Desk Room
                </Link>
                <Link href="/inside-the-world" className="btn-luxury-secondary px-8 py-3.5 text-sm">
                  Read the Journal
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <CinematicFrame
                src={imgPortrait}
                alt="Analufuno Mudau — author portrait"
                tone="author"
                size="section"
                overlay={
                  <div className="absolute inset-0 opacity-75 [background:radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.56),transparent_62%),radial-gradient(70%_55%_at_65%_85%,rgba(200,164,106,0.18),transparent_62%)]" />
                }
                caption={
                  <>
                    <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.38em] text-[rgba(46,29,24,0.62)]">
                      PORTRAIT
                    </span>
                    <span className="text-xs text-[rgba(46,29,24,0.58)]">Warm light • craft • voice</span>
                  </>
                }
              />
            </div>
          </div>

          {/* Gallery — full image set */}
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <div className="story-divider">
              <div className="story-divider-mark">
                <span>GALLERY</span>
                <span className="text-[color:var(--gold)]">✦</span>
                <span>SCENES</span>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img) => (
                <CinematicFrame
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  tone="children"
                  size="card"
                  caption={
                    <>
                      <span className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[rgba(46,29,24,0.60)]">
                        {img.label}
                      </span>
                      <span className="text-xs text-[rgba(46,29,24,0.56)]">Illustration</span>
                    </>
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="panel p-8 sm:p-10">
          <div className="font-[var(--font-cinematic)] text-xs tracking-[0.44em] text-[color:var(--muted)]">
            Join the Journey
          </div>
          <div className="mt-5 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="font-[var(--font-display-2)] text-3xl leading-tight text-[color:var(--foreground)] sm:text-4xl">
                A community of readers, dreamers, and explorers.
              </h2>
              <p className="mt-3 text-[color:var(--muted)]">
                Get exclusive previews, free chapters, early access, and audiobook samples—delivered like a little
                magic in your inbox.
              </p>
            </div>
            <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                className="h-11 rounded-full border border-[rgba(46,29,24,0.14)] bg-white/70 px-4 text-sm text-[color:var(--foreground)] outline-none placeholder:text-[rgba(46,29,24,0.45)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[rgba(217,168,156,0.22)]"
                placeholder="Email address"
                type="email"
                name="email"
                required
              />
              <button className="btn-luxury-primary h-11 px-6 text-sm" type="submit">
                Subscribe
              </button>
              <p className="text-xs text-[rgba(46,29,24,0.55)] sm:col-span-2">
                Calm, elegant signups—provider integration comes next. Prefer email?{" "}
                <ContactEmailLink subject="Join Ana's reader community" className="text-[color:var(--foreground)]/70" />
              </p>
            </form>
          </div>
        </div>
      </section>

      <SiteContactFooter showAdminLinks />
    </motion.main>
  );
}

function ChapterCard({
  number,
  title,
  copy,
  accent,
  href,
}: {
  number: string;
  title: string;
  copy: string;
  accent: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group panel relative overflow-hidden p-6 transition duration-500 ease-out hover:-translate-y-1"
    >
      <div
        className="absolute -inset-10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(55% 50% at 50% 50%, ${accent}, transparent 70%)` }}
      />
      <div className="relative">
        <div className="font-[var(--font-cinematic)] text-[11px] tracking-[0.34em] text-[color:var(--muted)]">
          {number}
        </div>
        <div className="mt-3 font-[var(--font-display)] text-2xl text-[color:var(--foreground)]">{title}</div>
        <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{copy}</p>
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--accent)]">
          Enter <span className="transition duration-300 group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
}
