"use client";

import { useInView } from "react-intersection-observer";

const facts = [
  { icon: "🌍", label: "Basé à", value: "Paris, France" },
  { icon: "🎓", label: "Formation", value: "Master Informatique — EPITA" },
  { icon: "💼", label: "Disponibilité", value: "Freelance & CDI" },
  { icon: "🌐", label: "Langues", value: "Français, Anglais, Espagnol" },
  { icon: "☕", label: "Carburant", value: "Café noir, double espresso" },
  { icon: "🎮", label: "Hobbies", value: "Gaming, Photographie, Randonnée" },
];

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-24 px-6">
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
              À propos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-16">
            Qui suis-je ?
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Photo + bio */}
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                {/* Gradient avatar */}
                <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-accent via-violet-500 to-pink-500 flex items-center justify-center text-3xl font-extrabold text-background shadow-xl glow-cyan">
                  AL
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Alexandre Leblanc</h3>
                  <p className="text-accent text-sm font-mono">
                    Développeur Full-Stack
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-white/50">
                    <span>📍</span>
                    <span>Paris, France</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Développeur full-stack avec plus de 3 ans d'expérience, je
                  conçois et réalise des applications web modernes de A à Z.
                  Mon expertise couvre aussi bien le frontend (React, Next.js,
                  Vue.js) que le backend (Django, Node.js, PHP).
                </p>
                <p>
                  Diplômé de l'EPITA, j'ai travaillé sur des projets variés :
                  SaaS, e-commerce, APIs REST, dashboards analytics. J'accorde
                  une attention particulière à la performance, à
                  l'accessibilité et à l'expérience utilisateur.
                </p>
                <p>
                  En dehors du code, je pratique la photographie urbaine et la
                  randonnée. Ces activités nourrissent ma créativité et mon
                  sens du détail.
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://github.com/Alex00121"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-elevated border border-white/10 text-white/70 text-sm hover:border-accent/50 hover:text-accent transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href="mailto:alexandresl342@gmail.com"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent text-sm hover:bg-accent/20 transition-all duration-200"
                >
                  ✉️ Email
                </a>
              </div>
            </div>

            {/* Fun facts grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="card-hover p-5 rounded-2xl bg-surface border border-white/5 hover:border-accent/20"
                >
                  <div className="text-2xl mb-3">{fact.icon}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-mono mb-1">
                    {fact.label}
                  </div>
                  <div className="font-semibold text-white">{fact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
