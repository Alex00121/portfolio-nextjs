import { Suspense } from 'react'
import { getAllPosts, getAllTags } from '@/lib/mdx'
import { PostCard } from '@/components/PostCard'
import { TagFilter } from '@/components/TagFilter'
import { BookOpen } from 'lucide-react'

interface HomeProps {
  searchParams: { tag?: string | string[] }
}

export default function HomePage({ searchParams }: HomeProps) {
  const rawTag = searchParams.tag
  const activeTag = Array.isArray(rawTag) ? rawTag[0] : (rawTag ?? null)
  const allPosts = getAllPosts()
  const allTags = getAllTags()

  const filteredPosts = activeTag
    ? allPosts.filter((p) => p.frontmatter.tags?.includes(activeTag))
    : allPosts

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="mb-14 slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600
                           flex items-center justify-center shadow-lg shadow-blue-500/30">
            <BookOpen size={20} className="text-white" />
          </div>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
            Développement web
          </span>
        </div>
        <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight
                        text-slate-900 dark:text-slate-50 leading-tight mb-4">
          Articles &amp; tutoriels
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
          Explorations approfondies autour de React, TypeScript, CSS et l&apos;architecture
          frontend moderne. Écrits pour les développeurs qui aiment comprendre le pourquoi.
        </p>
      </div>

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="mb-10">
          <Suspense fallback={<div className="h-8 animate-pulse rounded-lg bg-slate-100 dark:bg-dark-surface" />}>
            <TagFilter tags={allTags} activeTag={activeTag} />
          </Suspense>
        </div>
      )}

      {/* Posts list */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">Aucun article pour ce filtre.</p>
          <p className="text-sm mt-1">Essayez un autre tag ou{' '}
            <a href="/" className="text-accent underline">affichez tout</a>.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <p className="mt-12 text-center text-sm text-slate-400 dark:text-slate-500">
        {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
        {activeTag ? ` sur #${activeTag}` : ' au total'}
      </p>
    </div>
  )
}
