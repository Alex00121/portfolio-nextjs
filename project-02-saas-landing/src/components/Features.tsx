"use client";

import { motion } from "framer-motion";
import {
  Zap,
  GitBranch,
  BarChart3,
  Shield,
  Clock,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Automatisation no-code",
    description:
      "Créez des workflows complexes en quelques clics grâce à notre éditeur visuel drag & drop. Aucune compétence technique requise.",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: GitBranch,
    title: "Intégrations natives",
    description:
      "Connectez plus de 200 applications en quelques secondes : Slack, HubSpot, Notion, Airtable, Google Workspace et bien plus.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Analytics en temps réel",
    description:
      "Suivez vos performances avec des tableaux de bord personnalisables. Identifiez les goulots d'étranglement et optimisez en continu.",
    gradient: "from-pink-500 to-red-400",
  },
  {
    icon: Shield,
    title: "Sécurité enterprise",
    description:
      "SOC 2 Type II, chiffrement AES-256, SSO SAML, audit logs complets. Vos données sont protégées avec les plus hauts standards.",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Clock,
    title: "Historique & replay",
    description:
      "Rejouez n'importe quelle exécution de workflow, explorez les logs détaillés et corrigez les erreurs sans perdre de données.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Collaboration d'équipe",
    description:
      "Partagez des workflows, commentez, versionnez. Tout votre équipe reste synchronisée avec des rôles et permissions granulaires.",
    gradient: "from-green-500 to-teal-500",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Tout ce dont votre équipe
            <br />
            <span className="gradient-text">a besoin pour performer</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            FlowSync combine puissance et simplicité pour automatiser chaque
            aspect de votre activité, du marketing à l'opérationnel.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
