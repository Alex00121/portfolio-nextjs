"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Comment ça marche", href: "#how-it-works" },
  { label: "Tarifs", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span
              className={`font-bold text-xl ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              FlowSync
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-indigo-500 ${
                  scrolled ? "text-gray-600" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#"
              className={`text-sm font-medium transition-colors ${
                scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/90 hover:text-white"
              }`}
            >
              Se connecter
            </a>
            <a
              href="#pricing"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-all duration-200 active:scale-95"
            >
              Commencer gratuitement
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`md:hidden p-2 rounded-lg ${
              scrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 font-medium py-2 hover:text-indigo-500 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMenuOpen(false)}
                className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold text-center"
              >
                Commencer gratuitement
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
