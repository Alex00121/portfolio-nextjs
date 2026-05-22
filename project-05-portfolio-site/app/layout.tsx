import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    template: "%s | Alexandre Leblanc — Développeur Full-Stack",
    default: "Alexandre Leblanc — Développeur Full-Stack",
  },
  description:
    "Portfolio d'Alexandre Leblanc, développeur full-stack spécialisé en React, Next.js, TypeScript, Django et Vue.js. Découvrez mes projets et compétences.",
  keywords: [
    "développeur",
    "full-stack",
    "React",
    "Next.js",
    "TypeScript",
    "Django",
    "Vue.js",
    "portfolio",
    "Alexandre",
    "Leblanc",
  ],
  authors: [{ name: "Alexandre Leblanc", url: "https://github.com/Alex00121" }],
  creator: "Alexandre Leblanc",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: "Alexandre Leblanc — Développeur Full-Stack",
    description:
      "Portfolio d'Alexandre Leblanc, développeur full-stack spécialisé en React, Next.js, TypeScript, Django et Vue.js.",
    siteName: "Alexandre Leblanc Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Alexandre Leblanc Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandre Leblanc — Développeur Full-Stack",
    description: "Portfolio d'Alexandre Leblanc, développeur full-stack.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="bg-background text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
