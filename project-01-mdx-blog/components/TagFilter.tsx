'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Tag } from 'lucide-react'

interface TagFilterProps {
  tags: string[]
  activeTag: string | null
}

export function TagFilter({ tags, activeTag }: TagFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleTag(tag: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (activeTag === tag) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mr-1">
        <Tag size={14} />
        Filtrer :
      </span>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTag(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
            active:scale-95
            ${
              activeTag === tag
                ? 'bg-accent text-white shadow-sm shadow-blue-500/30'
                : 'bg-slate-100 dark:bg-dark-surface text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-elevated'
            }`}
        >
          #{tag}
        </button>
      ))}
      {activeTag && (
        <button
          onClick={() => router.push('/')}
          className="px-3 py-1 rounded-full text-sm font-medium text-slate-500
                     hover:text-slate-700 dark:hover:text-slate-200
                     underline underline-offset-2 transition-colors"
        >
          Tout afficher
        </button>
      )}
    </div>
  )
}
