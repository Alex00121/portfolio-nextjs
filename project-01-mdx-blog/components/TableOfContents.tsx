'use client'

import { useEffect, useState } from 'react'
import type { Heading } from '@/lib/mdx'
import { List } from 'lucide-react'

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headingElements = headings.map(({ id }) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      }
    )

    headingElements.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Table des matières"
      className="sticky top-24 p-4 rounded-xl border border-slate-200 dark:border-dark-surface
                  bg-white dark:bg-dark-surface text-sm"
    >
      <h2 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100
                      mb-4 text-xs uppercase tracking-widest">
        <List size={14} />
        Sommaire
      </h2>
      <ul className="space-y-1.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: heading.level === 3 ? '12px' : '0' }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`block py-0.5 transition-colors duration-150 truncate
                ${
                  activeId === heading.id
                    ? 'text-accent dark:text-blue-400 font-medium'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }
                ${heading.level === 3 ? 'text-xs' : 'text-sm'}`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
