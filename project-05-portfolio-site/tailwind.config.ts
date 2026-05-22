import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        surface: "#0d1117",
        elevated: "#161b22",
        accent: "#22d3ee",
        "accent-dim": "#0e7490",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "float-1": "float1 8s ease-in-out infinite",
        "float-2": "float2 10s ease-in-out infinite",
        "float-3": "float3 12s ease-in-out infinite",
        "float-4": "float4 9s ease-in-out infinite",
        "float-5": "float5 11s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        typewriter: "typewriter 0.05s steps(1) forwards",
        blob: "blob 7s infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        float1: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(30px, -40px)" },
        },
        float2: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-20px, 30px)" },
        },
        float3: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(40px, 20px)" },
        },
        float4: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-30px, -25px)" },
        },
        float5: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(15px, 35px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34,211,238,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(34,211,238,0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
