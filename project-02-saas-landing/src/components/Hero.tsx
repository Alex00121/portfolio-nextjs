"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Nouveau : Intégration Slack & Teams disponible
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight"
            >
              Automatisez.
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                Collaborez.
              </span>
              <br />
              Réussissez.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg text-white/80 leading-relaxed max-w-lg"
            >
              FlowSync connecte vos outils, automatise vos workflows répétitifs
              et donne à votre équipe les super-pouvoirs dont elle a besoin pour
              livrer plus vite et mieux.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold text-lg hover:bg-gray-50 transition-all duration-200 active:scale-95 shadow-lg shadow-black/20"
              >
                Essai gratuit 14 jours
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-200"
              >
                <Play className="w-5 h-5" />
                Voir la démo
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-white/60 text-sm"
            >
              Aucune carte bancaire requise · Annulation à tout moment · Support 24/7
            </motion.p>
          </div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main dashboard window */}
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="flex-1 mx-4 h-5 bg-gray-700/50 rounded-full" />
                </div>

                {/* Dashboard content */}
                <div className="p-6">
                  {/* KPI row */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "Workflows actifs", value: "248", color: "from-indigo-500 to-purple-500" },
                      { label: "Tâches/jour", value: "1,842", color: "from-purple-500 to-pink-500" },
                      { label: "Temps économisé", value: "67h", color: "from-pink-500 to-red-400" },
                    ].map((kpi) => (
                      <div
                        key={kpi.label}
                        className="bg-gray-800/60 rounded-xl p-3 border border-white/5"
                      >
                        <div
                          className={`text-xl font-bold bg-gradient-to-r ${kpi.color} bg-clip-text text-transparent`}
                        >
                          {kpi.value}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Workflow diagram */}
                  <div className="bg-gray-800/40 rounded-xl p-4 mb-4 border border-white/5">
                    <div className="text-gray-400 text-xs mb-3">Workflow: Onboarding client</div>
                    <div className="flex items-center gap-2">
                      {[
                        { label: "Email reçu", color: "bg-indigo-500" },
                        { label: "CRM mis à jour", color: "bg-purple-500" },
                        { label: "Slack notifié", color: "bg-pink-500" },
                        { label: "Ticket créé", color: "bg-green-500" },
                      ].map((step, i) => (
                        <div key={step.label} className="flex items-center gap-2 flex-1">
                          <div className={`${step.color} rounded-lg p-2 text-white text-xs font-medium text-center flex-1`}>
                            {step.label}
                          </div>
                          {i < 3 && (
                            <div className="w-4 h-0.5 bg-gray-600 flex-shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activity list */}
                  <div className="space-y-2">
                    {[
                      { text: "Workflow Facturation déclenché", time: "Il y a 2 min", status: "success" },
                      { text: "Rapport hebdomadaire envoyé", time: "Il y a 15 min", status: "success" },
                      { text: "Synchronisation HubSpot", time: "Il y a 1h", status: "running" },
                    ].map((item) => (
                      <div
                        key={item.text}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg bg-gray-800/30"
                      >
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            item.status === "success"
                              ? "bg-green-400"
                              : "bg-yellow-400 animate-pulse"
                          }`}
                        />
                        <span className="text-white/80 text-xs flex-1">{item.text}</span>
                        <span className="text-gray-500 text-xs">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-green-500 text-white rounded-xl px-4 py-2 shadow-lg text-sm font-bold"
              >
                +340% productivité
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 20C1200 80 960 0 720 40C480 80 240 0 0 20L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
