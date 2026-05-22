"use client";

import { useInView } from "react-intersection-observer";

const skillGroups = [
  {
    category: "Frontend",
    color: "#22d3ee",
    skills: [
      { name: "React", icon: "⚛️", level: 95 },
      { name: "Next.js", icon: "▲", level: 90 },
      { name: "Vue.js", icon: "💚", level: 85 },
      { name: "TypeScript", icon: "🔷", level: 90 },
      { name: "Tailwind CSS", icon: "🎨", level: 95 },
      { name: "Framer Motion", icon: "🎞️", level: 80 },
    ],
  },
  {
    category: "Backend",
    color: "#a78bfa",
    skills: [
      { name: "Django", icon: "🐍", level: 85 },
      { name: "Node.js", icon: "🟢", level: 80 },
      { name: "PHP", icon: "🐘", level: 75 },
      { name: "PostgreSQL", icon: "🐘", level: 80 },
      { name: "SQLite", icon: "💾", level: 85 },
      { name: "REST APIs", icon: "🔌", level: 90 },
    ],
  },
  {
    category: "Outils",
    color: "#f472b6",
    skills: [
      { name: "Git / GitHub", icon: "🐙", level: 90 },
      { name: "Docker", icon: "🐳", level: 75 },
      { name: "Figma", icon: "🎨", level: 70 },
      { name: "VS Code", icon: "💻", level: 95 },
      { name: "Linux", icon: "🐧", level: 80 },
      { name: "CI/CD", icon: "⚙️", level: 75 },
    ],
  },
];

const techTags = [
  "React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS",
  "Django", "Node.js", "PHP", "PostgreSQL", "SQLite",
  "Git", "Docker", "REST API", "GraphQL", "Prisma",
  "Framer Motion", "D3.js", "Recharts", "Zustand", "Pinia",
];

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 px-6 bg-surface/30">
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
              Compétences
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Mon stack technique
          </h2>
          <p className="text-white/50 mb-16 max-w-xl">
            Les technologies que j'utilise au quotidien pour créer des
            applications web robustes et performantes.
          </p>

          {/* Skill groups */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {skillGroups.map((group) => (
              <div
                key={group.category}
                className="p-6 rounded-2xl bg-elevated border border-white/5 hover:border-white/10 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: group.color }}
                  />
                  <h3
                    className="font-bold text-lg"
                    style={{ color: group.color }}
                  >
                    {group.category}
                  </h3>
                </div>
                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="flex items-center gap-2 text-sm font-medium text-white/80">
                          <span>{skill.icon}</span>
                          {skill.name}
                        </span>
                        <span
                          className="text-xs font-mono"
                          style={{ color: group.color }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: inView ? `${skill.level}%` : "0%",
                            background: `linear-gradient(to right, ${group.color}88, ${group.color})`,
                            transitionDelay: "300ms",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech tag cloud */}
          <div>
            <h3 className="text-sm text-white/40 uppercase tracking-widest font-mono mb-6">
              Toutes mes technos
            </h3>
            <div className="flex flex-wrap gap-3">
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-lg bg-elevated border border-white/10 text-sm text-white/70 hover:border-accent/40 hover:text-accent transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
