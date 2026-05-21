import Link from 'next/link'
import { Clock, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/mdx'
import type { Post } from '@/lib/mdx'

export function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter, readingTime } = post

  return (
    <article className="group rounded-2xl border border-slate-200 dark:border-dark-surface
                         bg-white dark:bg-dark-surface p-6
                         hover:shadow-lg hover:-translate-y-1 hover:border-blue-300
                         dark:hover:border-blue-800
                         transition-all duration-200">
      <Link href={`/${slug}`} className="block">
        <div className="flex flex-wrap gap-2 mb-3">
          {frontmatter.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium
                         bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300
                         border border-blue-100 dark:border-blue-900"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h2 className="font-bold text-xl text-slate-900 dark:text-slate-100 leading-snug
                        group-hover:text-accent dark:group-hover:text-blue-400
                        transition-colors mb-3">
          {frontmatter.title}
        </h2>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm
                       line-clamp-2 mb-4">
          {frontmatter.excerpt}
        </p>

        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {formatDate(frontmatter.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} />
            {readingTime} min de lecture
          </span>
        </div>
      </Link>
    </article>
  )
}
