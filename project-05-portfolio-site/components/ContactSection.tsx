"use client";

import { useState } from "react";
import { useInView } from "react-intersection-observer";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Alex00121",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/alexandre-leblanc",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://twitter.com/alex00121",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim() || form.name.length < 2)
      errs.name = "Le nom doit contenir au moins 2 caractères.";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Adresse email invalide.";
    if (!form.subject.trim() || form.subject.length < 5)
      errs.subject = "Le sujet doit contenir au moins 5 caractères.";
    if (!form.message.trim() || form.message.length < 20)
      errs.message = "Le message doit contenir au moins 20 caractères.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const field = (
    key: keyof FormData,
    label: string,
    type: string = "text",
    placeholder: string = ""
  ) => (
    <div>
      <label className="block text-sm font-medium text-white/70 mb-2">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          rows={5}
          className={`w-full px-4 py-3 rounded-xl bg-elevated border text-white placeholder-white/30 outline-none transition-all duration-200 resize-none ${
            errors[key]
              ? "border-red-500/60 focus:border-red-500"
              : "border-white/10 focus:border-accent/60"
          }`}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl bg-elevated border text-white placeholder-white/30 outline-none transition-all duration-200 ${
            errors[key]
              ? "border-red-500/60 focus:border-red-500"
              : "border-white/10 focus:border-accent/60"
          }`}
        />
      )}
      {errors[key] && (
        <p className="text-red-400 text-xs mt-1.5">{errors[key]}</p>
      )}
    </div>
  );

  return (
    <section id="contact" className="py-24 px-6 bg-surface/30">
      <div className="max-w-5xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-accent/50" />
            <span className="text-accent text-sm font-mono tracking-widest uppercase">
              Contact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-white/50 mb-16 max-w-xl">
            Un projet en tête ? Une question ? Je suis disponible pour discuter
            de vos idées et trouver comment vous aider.
          </p>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Left: info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Me joindre directement</h3>
                <a
                  href="mailto:alexandresl342@gmail.com"
                  className="flex items-center gap-3 text-accent hover:underline text-lg font-medium"
                >
                  <span>✉️</span>
                  alexandresl342@gmail.com
                </a>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">Réseaux sociaux</h3>
                <div className="flex flex-col gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white/60 hover:text-accent transition-colors duration-200 group"
                    >
                      <span className="w-10 h-10 rounded-xl bg-elevated border border-white/10 group-hover:border-accent/30 flex items-center justify-center transition-all duration-200">
                        {s.icon}
                      </span>
                      <span className="font-medium">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-medium text-green-400">
                    Disponible
                  </span>
                </div>
                <p className="text-white/60 text-sm">
                  Ouvert aux missions freelance et aux opportunités CDI.
                  Réponse généralement sous 24h.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold mb-2">Message envoyé !</h3>
                  <p className="text-white/50">
                    Merci pour votre message. Je vous répondrai dans les
                    meilleurs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-2 gap-5">
                    {field("name", "Nom complet", "text", "Jean Dupont")}
                    {field("email", "Email", "email", "jean@exemple.fr")}
                  </div>
                  {field("subject", "Sujet", "text", "Projet web, question...")}
                  {field(
                    "message",
                    "Message",
                    "textarea",
                    "Décrivez votre projet ou votre demande..."
                  )}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-accent text-background font-bold text-lg hover:bg-accent/90 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      "Envoyer le message"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
