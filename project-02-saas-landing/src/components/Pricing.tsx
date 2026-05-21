"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Gratuit",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Parfait pour démarrer et tester FlowSync.",
    features: [
      "5 workflows actifs",
      "1 000 tâches/mois",
      "3 intégrations",
      "Historique 7 jours",
      "Support communauté",
    ],
    cta: "Commencer gratuitement",
    ctaStyle: "border border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600",
    popular: false,
  },
  {
    name: "Pro",
    monthlyPrice: 49,
    yearlyPrice: 39,
    description: "Pour les équipes qui veulent accélérer.",
    features: [
      "Workflows illimités",
      "50 000 tâches/mois",
      "50+ intégrations",
      "Historique 90 jours",
      "Analytics avancés",
      "Webhooks custom",
      "Support prioritaire",
    ],
    cta: "Commencer l'essai Pro",
    ctaStyle: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90",
    popular: true,
  },
  {
    name: "Team",
    monthlyPrice: 129,
    yearlyPrice: 103,
    description: "Pour les organisations qui ont besoin de puissance.",
    features: [
      "Workflows & tâches illimités",
      "200+ intégrations",
      "Historique 1 an",
      "SSO SAML",
      "Audit logs",
      "Rôles personnalisés",
      "SLA 99.9%",
      "Account manager dédié",
    ],
    cta: "Contacter les ventes",
    ctaStyle: "border border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600",
    popular: false,
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-4">
            Tarifs
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Un plan pour{" "}
            <span className="gradient-text">chaque ambition</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Commencez gratuitement. Passez à la vitesse supérieure quand vous
            en avez besoin. Aucun engagement.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white rounded-xl p-1.5 border border-gray-200 shadow-sm">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                !yearly
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                yearly
                  ? "bg-indigo-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Annuel
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 border flex flex-col ${
                plan.popular
                  ? "border-indigo-500 shadow-xl shadow-indigo-100"
                  : "border-gray-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className="text-5xl font-extrabold text-gray-900">
                    {yearly ? plan.yearlyPrice : plan.monthlyPrice}€
                  </span>
                  {plan.monthlyPrice > 0 && (
                    <span className="text-gray-500 mb-2">/mois</span>
                  )}
                </div>
                {yearly && plan.monthlyPrice > 0 && (
                  <p className="text-sm text-green-600 mt-1 font-medium">
                    Économisez{" "}
                    {(plan.monthlyPrice - plan.yearlyPrice) * 12}€/an
                  </p>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`block text-center py-3 px-6 rounded-xl font-semibold transition-all duration-200 active:scale-95 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
