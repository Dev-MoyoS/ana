import type { Metadata } from "next";
import "./globals.css";
import {
  Cinzel,
  Cormorant_Garamond,
  Inter,
  Manrope,
  Playfair_Display,
} from "next/font/google";
import { Providers } from "./providers";
import { IntroGate } from "@/components/experience/intro/IntroGate";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The World of Analufuno Mudau",
  description: "Stories that inspire imagination and captivate readers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[
        inter.variable,
        manrope.variable,
        playfair.variable,
        cormorant.variable,
        cinzel.variable,
        "h-full antialiased",
      ].join(" ")}
    >
      <body className="min-h-full flex flex-col">
        <div className="atmosphere" />
        <Providers>
          <IntroGate>{children}</IntroGate>
        </Providers>
      </body>
    </html>
  );
}
