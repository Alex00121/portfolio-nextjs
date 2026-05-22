"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    title: "Weather Dashboard",
    description:
      "Dashboard météo avec géolocalisation, prévisions sur 7 jours, graphique horaire Recharts et mode sombre. Utilise l'API Open-Meteo.",
    gradient: "from-sky-500 to-blue-600",
    tech: ["React", "TypeScript", "Recharts", "Tailwind"],
    github: "https://github.com/Alex00121/portfolio-react/tree/main/project-01-weather-dashboard",
    live: "#",
    category: "React",
  },
  {
    title: "Movie Search App",
    description:
      "Application de recherche de films avec l'API TMDB. Pagination, favoris persistants, modal de détails et système de notation coloré.",
    gradient: "from-red-600 to-pink-700",
    tech: ["React", "TMDB API", "localStorage", "Tailwind"],
    github: "https://github.com/Alex00121/portfolio-react/tree/main/project-02-movie-search",
    live: "#",
    category: "React",
  },
  {
    title: "Finance Tracker",
    description:
      "Tableau de bord financier complet avec KPIs, graphiques Chart.js, gestion de budget par catégorie et export CSV. Pinia + localStorage.",
    gradient: "from-emerald-500 to-teal-600",
    tech: ["Vue.js", "Pinia", "Chart.js", "Tailwind"],
    github: "https://github.com/Alex00121/portfolio-vue/tree/main/project-02-finance-tracker",
    live: "#",
    category: "Vue",
  },
  {
    title: "SaaS Landing Page",
    description:
      "Landing page SaaS moderne avec hero animé, pricing avec toggle mensuel/annuel, FAQ accordion, témoignages et formulaire d'inscription.",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    tech: ["Next.js", "Framer Motion", "Tailwind"],
    github: "https://github.com/Alex00121/portfolio-nextjs/tree/main/project-02-saas-landing",
    live: "#",
    category: "Next.js",
  },
  {
    title: "Blog API Django",
    description:
      "API REST complète pour un blog avec JWT, catégories, tags, commentaires, pagination et recherche. Documentation Swagger intégrée.",
    gradient: "from-yellow-500 to-orange-600",
    tech: ["Django", "DRF", "JWT", "PostgreSQL"],
    github: "https://github.com/Alex00121/portfolio-django/tree/main/project-01-blog-api",
    live: "#",
    category: "Django",
  },
  {
    title: "Realtime Chat",
    description:
      "Application de chat temps réel full-stack avec Socket.io, salles multiples, indicateur de frappe et historique des messages SQLite.",
    gradient: "from-violet-500 to-purple-700",
    tech: ["React", "Node.js", "Socket.io", "SQLite"],
    github: "https://github.com/Alex00121/portfolio-fullstack/tree/main/project-01-realtime-chat",
    live: "#",
    category: "Full-Stack",
  },
];

const categories = ["Tous", "React", "Vue", "Next.js", "Django", "Full-Stack"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const filtered =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6">
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
              Projets
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Ce que j'ai construit
          </h2>
          <p className="text-white/50 mb-10 max-w-xl">
            Une sélection de projets tirés de mon portfolio — des apps React aux
            APIs Django en passant par le temps réel.
          </p>

          {/* Category filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 ${
                  activeCategory === cat
                    ? "bg-accent text-background"
                    : "bg-elevated border border-white/10 text-white/60 hover:border-accent/40 hover:text-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={project.title}
                className="card-hover group rounded-2xl bg-surface border border-white/5 hover:border-accent/20 overflow-hidden"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Gradient thumbnail */}
                <div
                  className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-extrabold text-white/20 tracking-tight">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 flex items-center justify-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/30 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      className="px-4 py-2 rounded-lg bg-accent/80 backdrop-blur-sm text-background text-sm font-medium hover:bg-accent transition-colors"
                    >
                      Démo
                    </a>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 rounded-md bg-elevated text-xs font-mono text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/Alex00121"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white/70 hover:border-accent/50 hover:text-accent transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Voir tous mes projets sur GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
