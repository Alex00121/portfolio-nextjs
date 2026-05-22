"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <span className="font-bold text-lg gradient-text">AL</span>
          <span className="text-white/30 text-sm ml-4">
            © {new Date().getFullYear()} Alexandre Leblanc. Tous droits réservés.
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-white/40">
          <a href="#about" className="hover:text-accent transition-colors">
            À propos
          </a>
          <a href="#projects" className="hover:text-accent transition-colors">
            Projets
          </a>
          <a href="#contact" className="hover:text-accent transition-colors">
            Contact
          </a>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-elevated border border-white/10 text-white/50 text-sm hover:border-accent/40 hover:text-accent transition-all duration-200 active:scale-95"
          aria-label="Retour en haut"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          Haut de page
        </button>
      </div>
    </footer>
  );
}
