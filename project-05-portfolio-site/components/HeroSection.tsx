"use client";

import { useEffect, useState } from "react";

const roles = ["développeur", "builder", "créateur", "passionné"];

const particles = [
  { w: 4, h: 4, top: "15%", left: "10%", cls: "particle-1", opacity: 0.6 },
  { w: 3, h: 3, top: "25%", left: "80%", cls: "particle-2", opacity: 0.4 },
  { w: 5, h: 5, top: "60%", left: "5%", cls: "particle-3", opacity: 0.3 },
  { w: 3, h: 3, top: "70%", left: "90%", cls: "particle-4", opacity: 0.5 },
  { w: 4, h: 4, top: "40%", left: "95%", cls: "particle-5", opacity: 0.4 },
  { w: 2, h: 2, top: "80%", left: "30%", cls: "particle-6", opacity: 0.6 },
  { w: 3, h: 3, top: "10%", left: "55%", cls: "particle-7", opacity: 0.3 },
  { w: 5, h: 5, top: "50%", left: "75%", cls: "particle-8", opacity: 0.2 },
  { w: 2, h: 2, top: "35%", left: "20%", cls: "particle-1", opacity: 0.5 },
  { w: 4, h: 4, top: "85%", left: "65%", cls: "particle-2", opacity: 0.35 },
  { w: 3, h: 3, top: "20%", left: "40%", cls: "particle-3", opacity: 0.25 },
  { w: 2, h: 2, top: "75%", left: "15%", cls: "particle-4", opacity: 0.45 },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];

    if (typing) {
      if (charIndex < current.length) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (charIndex > 0) {
        const t = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [charIndex, typing, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient blob background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="blob absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #22d3ee, transparent)",
            top: "20%",
            left: "15%",
            filter: "blur(60px)",
          }}
        />
        <div
          className="blob absolute w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #a78bfa, transparent)",
            bottom: "20%",
            right: "15%",
            filter: "blur(60px)",
            animationDelay: "2s",
          }}
        />
        <div
          className="blob absolute w-64 h-64 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #f472b6, transparent)",
            top: "55%",
            left: "50%",
            filter: "blur(60px)",
            animationDelay: "4s",
          }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full bg-accent ${p.cls}`}
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            top: p.top,
            left: p.left,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Disponible pour de nouveaux projets
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Salut, je suis{" "}
          <span className="gradient-text">Alexandre</span>
        </h1>

        <p className="text-2xl md:text-3xl text-white/70 font-light mb-8 h-10">
          <span className="font-semibold text-white">{displayed}</span>
          <span className="typewriter-cursor" />
        </p>

        <p className="text-lg text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
          Je construis des expériences web modernes et performantes. Passionné
          par le code propre, les interfaces soignées et les architectures
          évolutives.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="px-8 py-4 rounded-xl bg-accent text-background font-bold text-lg hover:bg-accent/90 transition-all duration-200 active:scale-95 glow-cyan"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl border border-white/20 text-white font-medium text-lg hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-all duration-200 active:scale-95"
          >
            Me contacter
          </a>
        </div>

        <div className="mt-20 flex justify-center gap-12 text-center">
          {[
            { value: "32+", label: "Projets réalisés" },
            { value: "5+", label: "Technologies maîtrisées" },
            { value: "3 ans", label: "D'expérience" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-3xl font-extrabold gradient-text">
                {stat.value}
              </div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
