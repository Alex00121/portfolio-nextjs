"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Prêt à automatiser
            <br />
            votre équipe ?
          </h2>
          <p className="mt-6 text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
            Rejoignez plus de 4 200 équipes qui utilisent FlowSync pour gagner
            des heures chaque semaine. Essai gratuit 14 jours, sans carte.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 inline-flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-xl font-semibold text-lg"
            >
              <span>🎉</span>
              Parfait ! Vérifiez votre boîte mail.
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                disabled={status === "loading"}
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all duration-200 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="px-8 py-4 rounded-xl bg-white text-indigo-600 font-bold text-base hover:bg-gray-100 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Envoi…
                  </>
                ) : (
                  <>
                    Commencer l'essai
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="mt-4 text-white/50 text-sm">
            Aucune carte requise · Annulation en 1 clic · Support en français
          </p>
        </motion.div>
      </div>
    </section>
  );
}
