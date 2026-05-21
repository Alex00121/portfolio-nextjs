"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Est-ce que je peux commencer gratuitement ?",
    answer:
      "Oui, notre plan gratuit est disponible sans carte bancaire. Il vous donne accès à 5 workflows actifs et 1 000 tâches par mois, ce qui est parfait pour démarrer et explorer la plateforme.",
  },
  {
    question: "Quelles applications FlowSync peut-il connecter ?",
    answer:
      "FlowSync supporte plus de 200 intégrations natives : Slack, HubSpot, Notion, Airtable, Google Workspace (Gmail, Drive, Sheets, Calendar), Salesforce, Jira, Trello, Shopify, Stripe et bien d'autres. Des webhooks custom sont aussi disponibles pour connecter n'importe quelle API.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Absolument. FlowSync est certifié SOC 2 Type II. Toutes les données sont chiffrées en transit (TLS 1.3) et au repos (AES-256). Nous hébergeons sur AWS eu-west (Paris) pour les clients européens, garantissant la conformité RGPD.",
  },
  {
    question: "Comment fonctionne la facturation annuelle ?",
    answer:
      "En choisissant la facturation annuelle, vous économisez 20% par rapport au tarif mensuel. Vous êtes facturé en une seule fois pour l'année. Si vous passez à un plan supérieur en cours d'année, nous calculons le prorata au jour près.",
  },
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer:
      "Oui, vous pouvez passer à un plan supérieur immédiatement — le changement est instantané. Pour un downgrade, le changement prend effet à la prochaine date de renouvellement. Il n'y a aucun frais ni pénalité.",
  },
  {
    question: "Combien de temps prend la mise en place ?",
    answer:
      "La plupart de nos clients ont leur premier workflow opérationnel en moins de 10 minutes. Nos templates prêts à l'emploi permettent de démarrer sans aucune connaissance technique. Pour les configurations plus avancées, notre équipe de succès client vous accompagne gratuitement.",
  },
  {
    question: "Proposez-vous une API pour les développeurs ?",
    answer:
      "Oui, FlowSync expose une API REST complète et des webhooks configurables. Vous pouvez déclencher des workflows programmatiquement, lire les logs d'exécution et gérer vos intégrations via l'API. Une documentation interactive (Swagger) est disponible dans votre dashboard.",
  },
  {
    question: "Quel support est inclus dans chaque plan ?",
    answer:
      "Le plan gratuit donne accès à notre documentation et communauté. Le plan Pro inclut le support par email avec réponse sous 24h. Le plan Team bénéficie d'un SLA 99,9%, du support live chat et d'un account manager dédié disponible en français.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Questions{" "}
            <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Vous ne trouvez pas votre réponse ? Contactez-nous via le chat.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
