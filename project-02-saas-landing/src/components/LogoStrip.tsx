"use client";

import { motion } from "framer-motion";

const companies = [
  { name: "Veeva", width: 80 },
  { name: "Aircall", width: 72 },
  { name: "Doctolib", width: 88 },
  { name: "Pennylane", width: 96 },
  { name: "Spendesk", width: 84 },
  { name: "Payfit", width: 68 },
];

export default function LogoStrip() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10"
        >
          Fait confiance par des équipes dans les meilleures entreprises
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <svg
                width={company.width}
                height="28"
                viewBox={`0 0 ${company.width} 28`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-40 hover:opacity-70 transition-opacity duration-200"
              >
                <text
                  x="0"
                  y="22"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontSize="18"
                  fontWeight="700"
                  fill="#374151"
                >
                  {company.name}
                </text>
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
