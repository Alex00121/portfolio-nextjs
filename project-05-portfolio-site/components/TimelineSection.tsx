"use client";

import { useInView } from "react-intersection-observer";

const events = [
  {
    date: "2024 — Présent",
    type: "work",
    title: "Développeur Full-Stack Freelance",
    org: "Indépendant",
    description:
      "Missions variées : création de SaaS B2B, APIs REST Django, interfaces React/Next.js. Clients dans les secteurs fintech, e-commerce et healthtech.",
    tags: ["React", "Next.js", "Django", "PostgreSQL"],
  },
  {
    date: "2022 — 2024",
    type: "work",
    title: "Développeur Frontend Senior",
    org: "TechCorp Paris",
    description:
      "Refonte complète du dashboard client en React/TypeScript. Implémentation d'un design system, réduction du LCP de 40%. Encadrement de 2 juniors.",
    tags: ["React", "TypeScript", "Storybook", "Jest"],
  },
  {
    date: "2021 — 2022",
    type: "work",
    title: "Développeur Web Junior",
    org: "Agence Digitale Nexo",
    description:
      "Développement de sites et d'applications web pour des clients PME. Stack PHP/Vue.js. Déploiement sur DigitalOcean, gestion de projets sous Jira.",
    tags: ["Vue.js", "PHP", "MySQL", "Docker"],
  },
  {
    date: "2019 — 2021",
    type: "edu",
    title: "Master Informatique — Génie Logiciel",
    org: "EPITA Paris",
    description:
      "Spécialisation en développement web et architecture logicielle. Projet de fin d'études : plateforme de gestion de projets collaborative avec React/Node.js.",
    tags: ["Algorithmique", "Architecture", "DevOps", "Agile"],
  },
  {
    date: "2016 — 2019",
    type: "edu",
    title: "Licence Informatique",
    org: "Université Paris-Saclay",
    description:
      "Fondamentaux en programmation, base de données, réseaux et systèmes d'exploitation. Premiers projets web en HTML/CSS/JS et Python.",
    tags: ["Python", "Java", "SQL", "Linux"],
  },
];

export default function TimelineSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="timeline" className="py-24 px-6 bg-surface/30">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">
              Parcours
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            Expérience & Formation
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px top-0 bottom-0 bg-gradient-to-b from-transparent via-accent/40 to-transparent" />

            <div className="space-y-12">
              {events.map((event, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={i} className="relative">
                    {/* Center dot */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 rounded-full border-2 border-accent bg-background items-center justify-center z-10">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>

                    {/* Card */}
                    <div
                      className={`md:w-[calc(50%-2rem)] ${
                        isLeft ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      <div className="card-hover p-6 rounded-2xl bg-elevated border border-white/5 hover:border-accent/20">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-mono mb-2 ${
                                event.type === "work"
                                  ? "bg-accent/15 text-accent"
                                  : "bg-violet-500/15 text-violet-400"
                              }`}
                            >
                              {event.type === "work" ? "💼 Travail" : "🎓 Formation"}
                            </span>
                            <h3 className="font-bold text-white">{event.title}</h3>
                            <p className="text-accent/80 text-sm font-medium">
                              {event.org}
                            </p>
                          </div>
                          <span className="text-xs font-mono text-white/40 whitespace-nowrap">
                            {event.date}
                          </span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-white/5 text-xs font-mono text-white/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
