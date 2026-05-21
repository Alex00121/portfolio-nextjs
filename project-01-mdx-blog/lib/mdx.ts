import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export interface PostFrontmatter {
  title: string
  date: string
  tags: string[]
  description: string
  excerpt: string
  ogImage?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readingTime: number
}

export interface Heading {
  id: string
  text: string
  level: number
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
    readingTime,
  }
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => p !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Heading[] = []
  const seenIds = new Map<string, number>()
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/`[^`]+`/g, '').trim()
    const baseId = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const count = seenIds.get(baseId) ?? 0
    seenIds.set(baseId, count + 1)
    const id = count === 0 ? baseId : `${baseId}-${count}`

    headings.push({ id, text, level })
  }

  return headings
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach((p) => p.frontmatter.tags?.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
