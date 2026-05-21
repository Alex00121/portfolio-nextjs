"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Plug, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MousePointerClick,
    title: "Créez votre premier workflow",
    description:
      "Choisissez parmi 50+ templates prêts à l'emploi ou partez d'une feuille blanche. Notre éditeur visuel vous guide à chaque étape.",
    color: "from-indigo-500 to-purple-500",
    details: ["Templates métier", "Éditeur drag & drop", "Conditions & filtres"],
  },
  {
    number: "02",
    icon: Plug,
    title: "Connectez vos applications",
    description:
      "Branchez vos outils favoris en un clic. FlowSync gère l'authentification OAuth et maintient les connexions actives pour vous.",
    color: "from-purple-500 to-pink-500",
    details: ["200+ intégrations", "OAuth sécurisé", "Webhooks custom"],
  },
  {
    number: "03",
    icon: Rocket,
    title: "Lancez et optimisez",
    description:
      "Activez vos workflows et regardez votre productivité décoller. Analysez les performances en temps réel et affinez automatiquement.",
    color: "from-pink-500 to-red-400",
    details: ["Monitoring temps réel", "Alertes intelligentes", "Rapports hebdomadaires"],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            Comment ça marche
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Opérationnel en{" "}
            <span className="gradient-text">moins de 10 minutes</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Pas de configuration complexe, pas d'équipe technique nécessaire.
            Lancez votre premier workflow dès aujourd'hui.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-20 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30" />

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Step number */}
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="relative mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg shadow-indigo-200`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center lg:text-left">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-center lg:text-left mb-5">
                      {step.description}
                    </p>

                    <ul className="space-y-2 w-full">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`}
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
