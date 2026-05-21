import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import Image from 'next/image'
import { Pre } from './Pre'

export const mdxComponents: MDXComponents = {
  pre: Pre,

  h1: ({ children, ...props }) => (
    <h1
      {...props}
      className="font-sans text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50
                  mt-8 mb-4"
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className="font-sans text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50
                  mt-10 mb-4 scroll-mt-24"
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className="font-sans text-xl font-semibold text-slate-900 dark:text-slate-100
                  mt-8 mb-3 scroll-mt-24"
    >
      {children}
    </h3>
  ),

  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent dark:text-blue-400 underline underline-offset-2
                     decoration-blue-300 hover:decoration-blue-500 transition-colors"
          {...props}
        >
          {children}
        </a>
      )
    }
    return (
      <Link
        href={href ?? '#'}
        className="text-accent dark:text-blue-400 underline underline-offset-2
                   decoration-blue-300 hover:decoration-blue-500 transition-colors"
        {...props}
      >
        {children}
      </Link>
    )
  },

  img: ({ src, alt, ...props }) => (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-dark-surface
                       bg-gradient-to-br from-slate-100 to-slate-200 dark:from-dark-surface dark:to-dark-elevated">
        {src ? (
          <Image
            src={src}
            alt={alt ?? ''}
            width={800}
            height={450}
            className="w-full object-cover"
          />
        ) : (
          <div className="h-48 flex items-center justify-center text-slate-400">
            Image non disponible
          </div>
        )}
      </div>
      {alt && (
        <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      {...props}
      className="border-l-4 border-accent pl-6 my-6 italic text-slate-600 dark:text-slate-400
                  bg-blue-50/50 dark:bg-blue-950/20 py-4 pr-4 rounded-r-xl"
    >
      {children}
    </blockquote>
  ),

  table: ({ children, ...props }) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 dark:border-dark-surface">
      <table {...props} className="w-full text-sm">
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }) => (
    <th
      {...props}
      className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100
                  bg-slate-50 dark:bg-dark-surface border-b border-slate-200 dark:border-dark-elevated"
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      {...props}
      className="px-4 py-3 border-b border-slate-100 dark:border-dark-elevated
                  text-slate-700 dark:text-slate-300"
    >
      {children}
    </td>
  ),
}
