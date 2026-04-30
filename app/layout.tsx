import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Continuum Wellness — by Carol Ann Beasley",
  description: "A premium membership for established adults ready to build a rhythm that sustains them. Launching 2026. Join the Founding Circle.",
  openGraph: {
    title: "Continuum Wellness — by Carol Ann Beasley",
    description: "A structured membership for established adults who are functioning well on the outside — and quietly running on empty on the inside.",
    url: "https://carolannbeasley.com",
    siteName: "Continuum Wellness",
    images: [
      {
        url: "https://carolannbeasley.com/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Continuum Wellness by Carol Ann Beasley",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Continuum Wellness — by Carol Ann Beasley",
    description: "A structured membership for established adults ready to stop cycling and start belonging.",
    images: ["https://carolannbeasley.com/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-neutral-50 text-neutral-900 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}