"use client";

import { useInView } from "react-intersection-observer";

const posts = [
  {
    slug: "react-hooks-avances",
    title: "Les hooks React avancés que vous devriez connaître",
    date: "12 mai 2025",
    readTime: "8 min",
    tags: ["React", "TypeScript", "Performance"],
    excerpt:
      "useMemo, useCallback, useRef, useReducer — ces hooks vont au-delà de useState et useEffect. Découvrez quand et comment les utiliser pour optimiser vos composants React.",
    gradient: "from-sky-500/20 to-cyan-500/10",
    accent: "#22d3ee",
  },
  {
    slug: "nextjs-server-components",
    title: "Server Components Next.js : guide pratique 2025",
    date: "28 avril 2025",
    readTime: "12 min",
    tags: ["Next.js", "React", "Architecture"],
    excerpt:
      "Les React Server Components changent fondamentalement la manière de penser les applications Next.js. Tour d'horizon complet : quoi rendre côté serveur, quoi garder côté client, et comment gérer les données.",
    gradient: "from-violet-500/20 to-purple-500/10",
    accent: "#a78bfa",
  },
];

export default function BlogSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">
              Blog
            </span>
          </div>
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Derniers articles
            </h2>
            <a
              href="#"
              className="text-sm text-accent hover:underline hidden md:block"
            >
              Tous les articles →
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className={`card-hover rounded-2xl bg-gradient-to-br ${post.gradient} border border-white/5 hover:border-white/15 overflow-hidden group`}
              >
                <div className="p-8">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-mono"
                        style={{
                          backgroundColor: `${post.accent}20`,
                          color: post.accent,
                          border: `1px solid ${post.accent}30`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-bold mb-3 leading-tight group-hover:text-white transition-colors"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/50 text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime} de lecture</span>
                    </div>
                    <a
                      href="#"
                      className="text-sm font-medium transition-colors"
                      style={{ color: post.accent }}
                    >
                      Lire →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <a href="#" className="text-sm text-accent hover:underline">
              Tous les articles →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
