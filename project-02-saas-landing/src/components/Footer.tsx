import { Zap, Twitter, Github, Linkedin } from "lucide-react";

const footerLinks = {
  Produit: [
    { label: "Fonctionnalités", href: "#features" },
    { label: "Tarifs", href: "#pricing" },
    { label: "Intégrations", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Ressources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Templates", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Communauté", href: "#" },
  ],
  Entreprise: [
    { label: "À propos", href: "#" },
    { label: "Carrières", href: "#" },
    { label: "Partenaires", href: "#" },
    { label: "Presse", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Légal: [
    { label: "Conditions d'utilisation", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "RGPD", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "Sécurité", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: Logo + links */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">FlowSync</span>
            </div>
            <p className="text-sm leading-relaxed">
              La plateforme d'automatisation des workflows pour les équipes
              modernes.
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © 2026 FlowSync SAS. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm">Tous les systèmes opérationnels</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
