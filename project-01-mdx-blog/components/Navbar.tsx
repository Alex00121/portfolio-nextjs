import Link from 'next/link'
import { DarkModeToggle } from './DarkModeToggle'
import { Rss } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-dark-surface
                        bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-md bg-accent flex items-center justify-center
                           text-white font-bold text-sm">A</span>
          <span className="font-semibold text-slate-900 dark:text-slate-100
                           group-hover:text-accent dark:group-hover:text-blue-400
                           transition-colors">
            Alexandre&nbsp;·&nbsp;Blog
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <Link href="/"
                className="text-slate-600 dark:text-slate-400 hover:text-accent
                           dark:hover:text-blue-400 transition-colors">
            Articles
          </Link>
          <Link href="/rss"
                className="text-slate-600 dark:text-slate-400 hover:text-accent
                           dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <Rss size={14} />
            RSS
          </Link>
        </nav>

        <DarkModeToggle />
      </div>
    </header>
  )
}
