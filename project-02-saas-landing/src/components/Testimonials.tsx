"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Mercier",
    role: "Head of Operations",
    company: "Doctolib",
    avatar: "SM",
    avatarColor: "from-indigo-500 to-purple-500",
    quote:
      "FlowSync a transformé notre onboarding clients. Ce qui prenait 3 heures manuellement s'exécute maintenant automatiquement en 4 minutes. Incroyable ROI dès le premier mois.",
    stars: 5,
  },
  {
    name: "Thomas Bénard",
    role: "CTO",
    company: "Pennylane",
    avatar: "TB",
    avatarColor: "from-purple-500 to-pink-500",
    quote:
      "L'intégration avec notre stack existante (HubSpot, Notion, Slack) s'est faite en moins d'une heure. L'équipe est autonome, sans intervention IT. C'est exactement ce qu'on cherchait.",
    stars: 5,
  },
  {
    name: "Clara Fontaine",
    role: "Marketing Director",
    company: "Spendesk",
    avatar: "CF",
    avatarColor: "from-pink-500 to-red-400",
    quote:
      "Nous avons automatisé 80% de nos campagnes de nurturing. Résultat : +40% de MQL qualifiés et l'équipe se concentre enfin sur des tâches à haute valeur ajoutée.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            Témoignages
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Ils nous font{" "}
            <span className="gradient-text">confiance</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Des centaines d'équipes utilisent FlowSync chaque jour pour
            automatiser leurs processus et gagner en efficacité.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                "{t.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-gray-500 text-sm">
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { value: "4 200+", label: "équipes actives" },
            { value: "98%", label: "satisfaction client" },
            { value: "340M", label: "tâches automatisées" },
            { value: "4.9/5", label: "note moyenne" },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="text-3xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
