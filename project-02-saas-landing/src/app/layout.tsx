import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlowSync — Automatisez votre workflow, décupler votre productivité",
  description:
    "FlowSync est la plateforme SaaS qui connecte vos outils, automatise vos processus et donne à votre équipe les moyens de travailler plus vite.",
  openGraph: {
    title: "FlowSync — Automatisez votre workflow",
    description:
      "La plateforme d'automatisation qui s'adapte à vos besoins.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
