import type { Metadata } from "next";
import { Inter, Instrument_Serif, Mochiy_Pop_One, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Anime mode only. The browser fetches it lazily, when something first uses it.
const mochiy = Mochiy_Pop_One({
  variable: "--font-mochiy",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// TODO: replace with the real domain once deployed, this drives canonical + OG URLs.
const siteUrl = "https://krishpatil.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Krish Patil: Content × Research × Technology",
  description:
    "Krish Patil is a Mumbai-based content researcher and strategist exploring the intersection of content, research, technology and AI.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Krish Patil: Content × Research × Technology",
    description:
      "Krish Patil is a Mumbai-based content researcher and strategist exploring the intersection of content, research, technology and AI.",
    url: siteUrl,
    siteName: "Krish Patil",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Krish Patil: Content × Research × Technology",
    description:
      "Mumbai-based content researcher and strategist working across content, research, technology and AI.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${mochiy.variable}`}>
      <body>
        <a
          href="#main"
          className="meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
