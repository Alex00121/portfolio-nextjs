import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { getPostBySlug, getPostSlugs, extractHeadings, formatDate } from '@/lib/mdx'
import { TableOfContents } from '@/components/TableOfContents'
import { mdxComponents } from '@/components/MDXComponents'
import { Clock, Calendar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface PostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      images: [
        {
          url: post.frontmatter.ogImage ?? '/og/default.png',
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const headings = extractHeadings(post.content)

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: 'one-dark-pro',
              keepBackground: true,
            },
          ],
          rehypeSlug,
        ],
      },
    },
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400
                   hover:text-accent dark:hover:text-blue-400 transition-colors mb-10"
      >
        <ArrowLeft size={16} />
        Tous les articles
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        {/* Article */}
        <article className="min-w-0">
          {/* Header */}
          <header className="mb-10 slide-up">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.frontmatter.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={`/?tag=${tag}`}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium
                             bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300
                             border border-blue-100 dark:border-blue-900
                             hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight
                            text-slate-900 dark:text-slate-50 leading-tight mb-5">
              {post.frontmatter.title}
            </h1>

            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              {post.frontmatter.excerpt}
            </p>

            <div className="flex items-center gap-5 text-sm text-slate-400 dark:text-slate-500
                             pb-8 border-b border-slate-200 dark:border-dark-surface">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatDate(post.frontmatter.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime} min de lecture
              </span>
            </div>
          </header>

          {/* MDX content */}
          <div className="prose prose-slate dark:prose-invert max-w-none
                           prose-p:font-serif prose-p:leading-relaxed
                           prose-headings:scroll-mt-24
                           prose-code:before:content-none prose-code:after:content-none
                           fade-in">
            {content}
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-slate-200 dark:border-dark-surface">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent
                         dark:text-blue-400 hover:text-accent-hover transition-colors"
            >
              <ArrowLeft size={16} />
              Retour aux articles
            </Link>
          </div>
        </article>

        {/* Sidebar TOC */}
        <aside className="hidden lg:block">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </div>
  )
}
