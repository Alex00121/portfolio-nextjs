import { getAllPosts } from '@/lib/mdx'

const BASE_URL = 'https://alexandre-blog.dev'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts()

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${BASE_URL}/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/${post.slug}</guid>
      <description>${escapeXml(post.frontmatter.excerpt)}</description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      ${(post.frontmatter.tags ?? []).map((t) => `<category>${escapeXml(t)}</category>`).join('\n      ')}
    </item>`
    )
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Alexandre — Blog</title>
    <link>${BASE_URL}</link>
    <description>Articles sur le développement web moderne — React, TypeScript, CSS.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss" rel="self" type="application/rss+xml"/>
    <copyright>© ${new Date().getFullYear()} Alexandre</copyright>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
