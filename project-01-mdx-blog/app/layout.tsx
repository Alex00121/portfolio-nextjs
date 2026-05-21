import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://alexandre-blog.dev'),
  title: {
    default: 'Alexandre — Blog',
    template: '%s | Alexandre Blog',
  },
  description: 'Articles sur le développement web moderne — React, TypeScript, CSS, et plus.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://alexandre-blog.dev',
    siteName: 'Alexandre Blog',
    images: [{ url: '/og/default.png', width: 1200, height: 630, alt: 'Alexandre Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@alex00121',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-white dark:bg-dark-bg antialiased">
        <Providers>
          <Navbar />
          <main className="fade-in">{children}</main>
          <footer className="border-t border-slate-200 dark:border-dark-surface mt-24 py-10">
            <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
              <p>© {new Date().getFullYear()} Alexandre. Tous droits réservés.</p>
              <div className="flex gap-6">
                <a href="/rss" className="hover:text-accent transition-colors">RSS</a>
                <a href="https://github.com/Alex00121" target="_blank" rel="noopener noreferrer"
                   className="hover:text-accent transition-colors">GitHub</a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
